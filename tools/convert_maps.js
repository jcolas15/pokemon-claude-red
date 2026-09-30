// Converts map layout/event data from the pokered disassembly into src/engine/data/maps.js.
// Only structural data is extracted (layouts, collision ids, warps, objects); no graphics.
'use strict';
const fs = require('fs'), path = require('path');
const P = process.argv[2] || path.join(process.env.POKERED || '', '');
const OUT = path.join(__dirname, '..', 'src', 'engine', 'data');
const rd = f => fs.readFileSync(path.join(P, f), 'utf8');
const rdb = f => fs.readFileSync(path.join(P, f));
const num = s => { s = String(s).trim(); if (s.startsWith('$')) return parseInt(s.slice(1), 16); return parseInt(s, 10); };

// map sizes (blocks)
const sizes = {}, constOrder = [];
for (const line of rd('constants/map_constants.asm').split('\n')) {
  const m = line.match(/^\s*map_const (\w+),\s*(\d+),\s*(\d+)/);
  if (m) { sizes[m[1]] = [+m[2], +m[3]]; constOrder.push(m[1]); }
}
// blk file per map label
const blkFile = {};
for (const m of rd('maps.asm').matchAll(/(\w+)_Blocks:\s*INCBIN "maps\/(\w+)\.blk"/g)) blkFile[m[1]] = m[2];
// also handle stacked labels:  A_Blocks:\nB_Blocks: INCBIN
{
  const lines = rd('maps.asm').split('\n'); let pend = [];
  for (const l of lines) {
    const m = l.match(/^(\w+)_Blocks:(.*)$/);
    if (!m) { pend = []; continue; }
    pend.push(m[1]);
    const inc = m[2].match(/INCBIN "maps\/(\w+)\.blk"/);
    if (inc) { for (const p of pend) blkFile[p] = inc[1]; pend = []; }
  }
}

const TSFILE = { OVERWORLD: 'overworld', REDS_HOUSE_1: 'reds_house', REDS_HOUSE_2: 'reds_house', MART: 'pokecenter', POKECENTER: 'pokecenter', FOREST: 'forest', DOJO: 'gym', GYM: 'gym', HOUSE: 'house', FOREST_GATE: 'gate', MUSEUM: 'gate', GATE: 'gate', UNDERGROUND: 'underground', SHIP: 'ship', SHIP_PORT: 'ship_port', CEMETERY: 'cemetery', INTERIOR: 'interior', CAVERN: 'cavern', LOBBY: 'lobby', MANSION: 'mansion', LAB: 'lab', CLUB: 'club', FACILITY: 'facility', PLATEAU: 'plateau' };
const TSCAMEL = { OVERWORLD: 'Overworld', REDS_HOUSE_1: 'RedsHouse1', REDS_HOUSE_2: 'RedsHouse2', MART: 'Mart', POKECENTER: 'Pokecenter', FOREST: 'Forest', DOJO: 'Dojo', GYM: 'Gym', HOUSE: 'House', FOREST_GATE: 'ForestGate', MUSEUM: 'Museum', GATE: 'Gate', UNDERGROUND: 'Underground', SHIP: 'Ship', SHIP_PORT: 'ShipPort', CEMETERY: 'Cemetery', INTERIOR: 'Interior', CAVERN: 'Cavern', LOBBY: 'Lobby', MANSION: 'Mansion', LAB: 'Lab', CLUB: 'Club', FACILITY: 'Facility', PLATEAU: 'Plateau' };

// headers
const headers = {};
for (const f of fs.readdirSync(path.join(P, 'data/maps/headers'))) {
  const t = rd('data/maps/headers/' + f);
  const m = t.match(/map_header (\w+), (\w+), (\w+)/); if (!m) continue;
  const conns = {};
  for (const c of t.matchAll(/connection (\w+), (\w+), (\w+), (-?\d+)/g)) conns[c[1]] = { map: c[2], off: +c[4] };
  headers[m[1]] = { name: m[1], cnst: m[2], ts: m[3], conns };
}
const constToName = {};
// unused "Copy" maps reuse the original map constant; never let them shadow the real map
for (const h of Object.values(headers)) if (!constToName[h.cnst] || /Copy$/.test(constToName[h.cnst])) constToName[h.cnst] = h.name;

// tileset tables
function parseByteList(txt) { return txt.split(',').map(s => s.trim()).filter(s => s && s !== '-1').map(num); }
const collTxt = rd('data/tilesets/collision_tile_ids.asm');
const passable = {};
{
  let labels = [];
  for (const l of collTxt.split('\n')) {
    const m = l.match(/^(\w+)_Coll::/); if (m) { labels.push(m[1]); continue; }
    const c = l.match(/coll_tiles\s*(.*)$/);
    if (c) { const ids = c[1].trim() ? parseByteList(c[1]) : []; for (const lb of labels) passable[lb] = ids; labels = []; }
  }
}
const tsHeaders = {};
for (const m of rd('data/tilesets/tileset_headers.asm').matchAll(/tileset (\w+),\s*([-$\w]+),\s*([-$\w]+),\s*([-$\w]+),\s*([-$\w]+),\s*(\w+)/g)) {
  tsHeaders[m[1]] = { counters: [m[2], m[3], m[4]].filter(x => x !== '-1').map(num), grass: m[5] === '-1' ? -1 : num(m[5]), anim: m[6] };
}
function parseTileTable(file, macro) {
  // returns { TilesetCamel: [ids] } using label groups
  const out = {}; let labels = [];
  for (const l of rd(file).split('\n')) {
    const m = l.match(/^\.(\w+?)(?:Door|Warp)?TileIDs:/); if (m) { labels.push(m[1]); continue; }
    const d = l.match(new RegExp('^\\s*(?:' + macro + '|db)\\s+(.*)$'));
    if (d && labels.length) {
      const ids = parseByteList(d[1].split(';')[0]);
      for (const lb of labels) out[lb] = (out[lb] || []).concat(ids);
      if (l.includes(macro)) labels = [];
    }
  }
  return out;
}
const doorTiles = parseTileTable('data/tilesets/door_tile_ids.asm', 'door_tiles');
const warpTiles = parseTileTable('data/tilesets/warp_tile_ids.asm', 'warp_tiles');
const ledges = [];
for (const m of rd('data/tilesets/ledge_tiles.asm').matchAll(/db SPRITE_FACING_(\w+),\s*(\$\w+),\s*(\$\w+)/g)) ledges.push([m[1].toLowerCase(), num(m[2]), num(m[3])]);
const pairColl = { land: [], water: [] };
{
  let mode = null;
  for (const l of rd('data/tilesets/pair_collision_tile_ids.asm').split('\n')) {
    if (l.includes('Land')) mode = 'land'; if (l.includes('Water')) mode = 'water';
    const m = l.match(/db (\w+), (\$\w+), (\$\w+)/); if (m && mode) pairColl[mode].push([TSFILE[m[1]] ? m[1] : m[1], num(m[2]), num(m[3])]);
  }
}
const spinnerTxt = rd('data/tilesets/spinner_tiles.asm');
const bookshelfTxt = rd('data/tilesets/bookshelf_tile_ids.asm');
const bookshelves = [];
for (const m of bookshelfTxt.matchAll(/bookshelf_tile (\w+),\s*(\$\w+),\s*(\w+)/g)) bookshelves.push([m[1], num(m[2]), m[3]]);
const warpCarpet = rd('data/tilesets/warp_carpet_tile_ids.asm');
const waterTilesets = rd('data/tilesets/water_tilesets.asm').match(/db ([A-Z_, ]+)/g).join(',').replace(/db /g, '').split(',').map(s => s.trim()).filter(s => s && s !== '-1');

// block sets
const bst = {};
for (const f of new Set(Object.values(TSFILE))) bst[f] = rdb('gfx/blocksets/' + f + '.bst');

// unique quads per tileset file
const quads = {}, quadIdx = {};
function quadOf(tf, b, cx, cy) {
  const B = bst[tf];
  const q = [0, 1, 2, 3].map(k => B[b * 16 + (cy * 2 + (k >> 1)) * 4 + cx * 2 + (k & 1)] || 0);
  const key = q.join(',');
  quadIdx[tf] = quadIdx[tf] || {}; quads[tf] = quads[tf] || [];
  if (!(key in quadIdx[tf])) { quadIdx[tf][key] = quads[tf].length; quads[tf].push(q); }
  return quadIdx[tf][key];
}

// text pointer tables & trainer headers from scripts
function scriptInfo(name) {
  const f = path.join(P, 'scripts', name + '.asm');
  if (!fs.existsSync(f)) return { textLabels: {}, trainerHeaders: {} };
  const t = fs.readFileSync(f, 'utf8');
  const textLabels = {};
  for (const m of t.matchAll(/dw_const (\w+),\s+(TEXT_\w+)/g)) textLabels[m[2]] = m[1];
  const headersByLabel = {};
  for (const m of t.matchAll(/(\w+TrainerHeader\w*):\s*\n\s*trainer (\w+),\s*(\d+),\s*(\w+),\s*(\w+),\s*(\w+)/g))
    headersByLabel[m[1]] = { flag: m[2], range: +m[3], battle: m[4], end: m[5], after: m[6] };
  // label -> header via "Label:\n\ttext_asm\n\tld hl, Header"
  const trainerHeaders = {};
  for (const m of t.matchAll(/(\w+):\s*\n\s*text_asm\s*\n\s*ld hl, (\w+)/g)) if (headersByLabel[m[2]]) trainerHeaders[m[1]] = headersByLabel[m[2]];
  return { textLabels, trainerHeaders, headersByLabel };
}

// hidden events
const hidden = {};
{
  let cur = null;
  for (const l of rd('data/events/hidden_events.asm').split('\n')) {
    const m = l.match(/hidden_events_for (\w+)/); if (m) { cur = m[1]; hidden[cur] = []; continue; }
    const h = l.match(/^\s*(hidden_\w+)\s+(\d+),\s*(\d+),\s*(\w+)(?:,\s*(\w+))?/);
    if (h && cur) hidden[cur].push({ kind: h[1], x: +h[2], y: +h[3], fn: h[4], arg: h[5] || null });
  }
}
// toggleable objects
const toggles = {};
{
  let cur = null;
  for (const l of rd('data/maps/toggleable_objects.asm').split('\n')) {
    const m = l.match(/toggleable_objects_for (\w+)/); if (m) { cur = m[1]; toggles[cur] = {}; continue; }
    const t = l.match(/toggle_object_state (\w+),\s*(ON|OFF)/); if (t && cur) toggles[cur][t[1]] = t[2] === 'ON';
  }
}

const maps = {};
for (const name of Object.keys(headers).sort()) {
  const h = headers[name];
  if (!sizes[h.cnst]) continue;
  const [bw, bh] = sizes[h.cnst];
  const bf = blkFile[name] || name;
  const blkPath = path.join(P, 'maps', bf + '.blk');
  if (!fs.existsSync(blkPath)) { console.warn('no blk', name); continue; }
  const blk = fs.readFileSync(blkPath);
  const tf = TSFILE[h.ts];
  const w = bw * 2, hh = bh * 2, cells = new Array(w * hh);
  for (let by = 0; by < bh; by++) for (let bx = 0; bx < bw; bx++) {
    const b = blk[by * bw + bx];
    for (let cy = 0; cy < 2; cy++) for (let cx = 0; cx < 2; cx++) cells[(by * 2 + cy) * w + bx * 2 + cx] = quadOf(tf, b, cx, cy);
  }
  // objects
  const ot = rd('data/maps/objects/' + name + '.asm');
  const border = num(ot.match(/db (\$\w+) ; border block/)[1]);
  const borderQuads = [0, 1, 2, 3].map(k => quadOf(tf, border, k & 1, k >> 1));
  const warps = [...ot.matchAll(/warp_event\s+(\d+),\s*(\d+),\s*(\w+),\s*(\d+)/g)].map(m => ({ x: +m[1], y: +m[2], to: m[3] === 'LAST_MAP' ? 'LAST_MAP' : (constToName[m[3]] || m[3]), warp: +m[4] - 1 }));
  const signs = [...ot.matchAll(/bg_event\s+(\d+),\s*(\d+),\s*(\w+)/g)].map(m => ({ x: +m[1], y: +m[2], text: m[3] }));
  const objConsts = [...ot.matchAll(/const_export (\w+)/g)].map(m => m[1]);
  const si = scriptInfo(name);
  const objs = [...ot.matchAll(/object_event\s+(\d+),\s*(\d+),\s*(\w+),\s*(\w+),\s*(\w+),\s*(\w+)(?:,\s*(\w+))?(?:,\s*(\w+))?/g)].map((m, i) => {
    const o = { id: objConsts[i] || null, x: +m[1], y: +m[2], sprite: m[3].replace('SPRITE_', '').toLowerCase(), move: m[4], dir: m[5], text: m[6] };
    if (m[8] !== undefined) {
      if (m[7].startsWith('OPP_')) o.trainer = { cls: m[7].replace('OPP_', ''), n: +m[8] };
      else o.mon = { species: m[7], level: +m[8] };
    } else if (m[7] !== undefined) o.item = m[7];
    const lbl = si.textLabels[o.text];
    if (lbl) { o.textLabel = lbl; if (si.trainerHeaders[lbl]) o.th = si.trainerHeaders[lbl]; }
    if (toggles[h.cnst] && o.id && o.id in toggles[h.cnst]) o.shown = toggles[h.cnst][o.id];
    return o;
  });
  const sgn = signs.map(s => { const lbl = si.textLabels[s.text]; if (lbl) s.textLabel = lbl; return s; });
  maps[name] = {
    cnst: h.cnst, ts: tf, tsc: TSCAMEL[h.ts], w, h: hh, cells, border: borderQuads, conns: h.conns,
    warps, signs: sgn, objs, hidden: hidden[h.cnst] || [],
  };
}
// connections: convert to cell offsets
for (const m of Object.values(maps)) {
  const c = {};
  for (const [dir, v] of Object.entries(m.conns)) {
    const t = maps[v.map]; if (!t) continue;
    let ox, oy;
    if (dir === 'north') { ox = 2 * v.off; oy = -t.h; }
    else if (dir === 'south') { ox = 2 * v.off; oy = m.h; }
    else if (dir === 'west') { ox = -t.w; oy = 2 * v.off; }
    else { ox = m.w; oy = 2 * v.off; }
    c[dir] = { map: v.map, ox, oy };
  }
  m.conns = c;
}
// tileset metadata keyed by tileset file (shared tilesets combine)
const tilesets = {};
for (const [cnst, tf] of Object.entries(TSFILE)) {
  const camel = TSCAMEL[cnst];
  tilesets[camel] = {
    file: tf, pass: passable[camel] || [], grass: (tsHeaders[camel] || {}).grass, counters: (tsHeaders[camel] || {}).counters || [],
    anim: (tsHeaders[camel] || {}).anim, doors: doorTiles[camel] || [], warps: warpTiles[camel] || [], water: waterTilesets.includes(cnst),
  };
}
const outObj = { tilesets, quads, ledges, pairColl, bookshelves, maps };
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'maps.ts'), '// @ts-nocheck (plain JS moved into a module; typed file by file, see docs/nextjs-migration.md)\nimport { game } from \'../global\';\n\nconst G = game();\n\n// Generated by tools/convert_maps.js from pokered structural map data.\nG.MAPDATA=' + JSON.stringify(outObj) + ';\n');
console.log('maps', Object.keys(maps).length, 'quads', Object.values(quads).reduce((a, q) => a + q.length, 0));
console.log(spinnerTxt.length, warpCarpet.length);
