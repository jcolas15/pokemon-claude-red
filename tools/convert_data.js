// Converts species/move/item/trainer/wild data from the pokered disassembly into src/data/pokedata.js
'use strict';
const fs = require('fs'), path = require('path');
const P = process.argv[2];
const rd = f => fs.readFileSync(path.join(P, f), 'utf8');
const num = s => { s = String(s).trim(); return s.startsWith('$') ? parseInt(s.slice(1), 16) : parseInt(s, 10); };
const strip = l => l.split(';')[0].trim();

// ---- pokemon constants (internal order) ----
const monConsts = [];
for (const l of rd('constants/pokemon_constants.asm').split('\n')) { if (/^\s*const_skip/.test(l)) { monConsts.push('_SKIP'); continue; } const m = l.match(/^\s*const (\w+)/); if (m) monConsts.push(m[1]); }
const internal = monConsts.slice(1); // skip NO_MON
const names = [...rd('data/pokemon/names.asm').matchAll(/dname "([^"]*)"/g)].map(m => m[1]);
const nameOf = {}; internal.forEach((c, i) => { nameOf[c] = names[i]; });

// ---- base stats ----
const species = {};
const dexOrder = [null];
for (const f of fs.readdirSync(path.join(P, 'data/pokemon/base_stats'))) {
  const t = rd('data/pokemon/base_stats/' + f);
  const dex = t.match(/db DEX_(\w+)/)[1];
  const st = t.match(/db\s+(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\s*\n\s*;\s*hp/);
  const types = t.match(/db (\w+), (\w+) ; type/);
  const cr = +t.match(/db (\d+) ; catch rate/)[1], be = +t.match(/db (\d+) ; base exp/)[1];
  const lv1 = t.match(/db (\w+), (\w+), (\w+), (\w+) ; level 1 learnset/).slice(1).filter(x => x !== 'NO_MOVE');
  const growth = t.match(/db (GROWTH_\w+)/)[1].replace('GROWTH_', '');
  const tm = t.match(/tmhm([\s\S]*?); end/);
  const tmhm = tm ? tm[1].replace(/\\/g, ' ').split(/[\s,]+/).filter(Boolean) : [];
  species[dex] = { id: dex, name: nameOf[dex] || dex, hp: +st[1], atk: +st[2], def: +st[3], spd: +st[4], spc: +st[5], types: types[1] === types[2] ? [types[1]] : [types[1], types[2]], catchRate: cr, baseExp: be, moves1: lv1, growth, tmhm, evos: [], learn: [] };
}
// dex numbers from dex_order (internal order -> DEX_x)
const dexList = [...rd('data/pokemon/dex_order.asm').matchAll(/db (DEX_\w+|0)/g)].map(m => m[1]);
const dexConsts = [];
for (const l of rd('constants/pokedex_constants.asm').split('\n')) { const m = l.match(/^\s*const (DEX_\w+)/); if (m) dexConsts.push(m[1]); }
for (const c of Object.keys(species)) { const n = dexConsts.indexOf('DEX_' + c) + 1; species[c].dex = n; dexOrder[n] = c; }
// ---- evolutions & learnsets ----
const evTxt = rd('data/pokemon/evos_moves.asm');
const evPtrs = [...evTxt.matchAll(/dw (\w+)EvosMoves/g)].map(m => m[1]);
evPtrs.forEach((lbl, i) => {
  const c = internal[i]; if (!species[c]) return;
  const blk = evTxt.split(new RegExp('^' + lbl + 'EvosMoves:', 'm'))[1].split(/^\w+EvosMoves:/m)[0];
  const [evPart, lrnPart] = blk.split('; Learnset');
  for (const m of evPart.matchAll(/db EVOLVE_(\w+), ([^\n]+)/g)) {
    const a = m[2].split(',').map(s => s.trim());
    if (m[1] === 'LEVEL') species[c].evos.push({ type: 'level', level: +a[0], to: a[1] });
    else if (m[1] === 'ITEM') species[c].evos.push({ type: 'item', item: a[0], to: a[2] });
    else if (m[1] === 'TRADE') species[c].evos.push({ type: 'trade', to: a[1] });
  }
  for (const m of (lrnPart || '').matchAll(/db (\d+), (\w+)/g)) species[c].learn.push([+m[1], m[2]]);
});
// ---- dex entries (category/height/weight only) ----
const deTxt = rd('data/pokemon/dex_entries.asm');
for (const m of deTxt.matchAll(/(\w+)DexEntry:\s*\n\s*db "([^@"]*)@?"\s*\n\s*db (\d+),\s*(\d+)\s*\n\s*dw (\d+)/g)) {
  const c = Object.keys(species).find(k => species[k].name.replace(/[^A-Z]/gi, '').toLowerCase() === m[1].toLowerCase() || k.replace(/_/g, '').toLowerCase() === m[1].toLowerCase());
  if (c) { species[c].cat = m[2]; species[c].ht = [+m[3], +m[4]]; species[c].wt = +m[5]; }
}
// ---- moves ----
const moveNames = [...rd('data/moves/names.asm').matchAll(/li "([^"]*)"/g)].map(m => m[1]);
const moves = {}, moveList = [];
[...rd('data/moves/moves.asm').matchAll(/move (\w+),\s*(\w+),\s*(\d+),\s*(\w+),\s*(\d+),\s*(\d+)/g)].forEach((m, i) => {
  moves[m[1]] = { id: m[1], num: i + 1, name: moveNames[i], effect: m[2].replace('_EFFECT', ''), power: +m[3], type: m[4], acc: +m[5], pp: +m[6] };
  moveList.push(m[1]);
});
// ---- types ----
const typeTxt = rd('data/types/type_matchups.asm');
const MULT = { SUPER_EFFECTIVE: 2, NOT_VERY_EFFECTIVE: 0.5, NO_EFFECT: 0 };
const typeChart = [...typeTxt.matchAll(/db (\w+),\s+(\w+),\s+(\w+)/g)].map(m => [m[1], m[2], MULT[m[3]]]);
// ---- items ----
const itemConsts = [];
for (const l of rd('constants/item_constants.asm').split('\n')) {
  const m = l.match(/^\s*const (\w+)/); if (m) itemConsts.push(m[1]);
}
const itemNames = [...rd('data/items/names.asm').matchAll(/li "([^"]*)"/g)].map(m => m[1]);
const prices = [...rd('data/items/prices.asm').matchAll(/bcd3 (\d+)/g)].map(m => +m[1]);
const items = {};
itemConsts.slice(1).forEach((c, i) => { if (itemNames[i] !== undefined) items[c] = { id: c, name: itemNames[i], price: prices[i] || 0 }; });
const tmMoves = [...rd('constants/item_constants.asm').matchAll(/add_tm (\w+)/g)].map(m => m[1]);
const hmMoves = [...rd('constants/item_constants.asm').matchAll(/add_hm (\w+)/g)].map(m => m[1]);
const tmPrices = [...rd('data/items/tm_prices.asm').matchAll(/nybble (\d+)/g)].map(m => +m[1] * 1000);
tmMoves.forEach((mv, i) => { const id = 'TM_' + mv; items[id] = { id, name: 'TM' + String(i + 1).padStart(2, '0'), price: tmPrices[i] || 0, move: mv, tm: i + 1 }; });
hmMoves.forEach((mv, i) => { const id = 'HM_' + mv; items[id] = { id, name: 'HM' + String(i + 1).padStart(2, '0'), price: 0, move: mv, hm: i + 1 }; });
const keyItems = [];
{ const t = rd('data/items/key_items.asm'); for (const m of t.matchAll(/dbit (\w+) ; (\w+)/g)) if (m[1] === 'TRUE') keyItems.push(m[2]); }
const marts = {};
for (const m of rd('data/items/marts.asm').matchAll(/(\w+)::\s*\n\s*script_mart ([^\n]+)/g)) marts[m[1]] = m[2].split(',').map(s => s.trim());
// ---- trainers ----
const tClass = [];
for (const l of rd('constants/trainer_constants.asm').split('\n')) { const m = l.match(/^\s*trainer_const (\w+)/); if (m) tClass.push(m[1]); }
const tNames = [...rd('data/trainers/names.asm').matchAll(/li "([^"]*)"/g)].map(m => m[1]);
const tMoney = [...rd('data/trainers/pic_pointers_money.asm').matchAll(/pic_money \w+,\s*(\d+)/g)].map(m => +m[1]);
const trainerClasses = {};
tClass.slice(1).forEach((c, i) => { trainerClasses[c] = { id: c, name: tNames[i], money: tMoney[i] }; });
const partiesTxt = rd('data/trainers/parties.asm');
const dataPtrs = [...partiesTxt.matchAll(/dw (\w+)Data/g)].map(m => m[1]);
const parties = {};
dataPtrs.forEach((lbl, i) => {
  const c = tClass[i + 1]; if (!c) return;
  const sec = partiesTxt.split(new RegExp('^' + lbl + 'Data:', 'm'))[1]; if (!sec) return;
  const body = sec.split(/^\w+Data:/m)[0];
  parties[c] = [];
  for (const l of body.split('\n')) {
    const m = strip(l).match(/^db (.*)$/); if (!m) continue;
    const a = m[1].split(',').map(s => s.trim()).filter(Boolean);
    const party = [];
    if (a[0] === '$FF') { for (let k = 1; k + 1 < a.length; k += 2) if (a[k] !== '0') party.push([+a[k], a[k + 1]]); }
    else { const lv = +a[0]; for (let k = 1; k < a.length; k++) if (a[k] !== '0') party.push([lv, a[k]]); }
    parties[c].push(party);
  }
});
const sm = rd('data/trainers/special_moves.asm');
const loneMoves = [...sm.split('TeamMoves')[0].matchAll(/db (\d+), (\w+)/g)].map(m => [+m[1], m[2]]);
const teamMoves = [...sm.split('TeamMoves')[1].matchAll(/db (\w+),\s+(\w+)/g)].map(m => [m[1], m[2]]);
// ---- wild ----
// WildDataPointers is indexed by map id (only the first entries carry a comment), so pair it with map_constants order
const mapConsts = [...rd('constants/map_constants.asm').matchAll(/^\s*map_const (\w+)/gm)].map(m => m[1]);
const wildPtr = [...rd('data/wild/grass_water.asm').matchAll(/^\s*dw (\w+)/gm)].map((m, i) => [m[1], mapConsts[i]]);
const wildLabels = {};
for (const f of fs.readdirSync(path.join(P, 'data/wild/maps'))) {
  const t = rd('data/wild/maps/' + f).replace(/IF DEF\(_BLUE\)[\s\S]*?ENDC/g, '').replace(/IF DEF\(_RED\)|ENDC/g, ''); // Red version tables
  for (const blk of t.split(/^(?=\w+WildMons:)/m)) {
    const lm = blk.match(/^(\w+)WildMons:/); if (!lm) continue;
    const g = blk.match(/def_grass_wildmons (\d+)([\s\S]*?)end_grass_wildmons/), w = blk.match(/def_water_wildmons (\d+)([\s\S]*?)end_water_wildmons/);
    const parse = x => x ? { rate: +x[1], mons: [...x[2].matchAll(/db\s+(\d+),\s*(\w+)/g)].map(m => [+m[1], m[2]]) } : null;
    wildLabels[lm[1] + 'WildMons'] = { grass: parse(g), water: parse(w) };
  }
}
const wild = {};
for (const [lbl, cnst] of wildPtr) if (wildLabels[lbl]) wild[cnst] = wildLabels[lbl];
const goodRod = [...rd('data/wild/good_rod.asm').matchAll(/db (\d+), (\w+)/g)].map(m => [+m[1], m[2]]);
const srTxt = rd('data/wild/super_rod.asm');
const groups = {};
for (const m of srTxt.matchAll(/\.(Group\d+):\s*\n\s*db (\d+)\s*\n((?:\s*db \d+, \w+\s*\n)+)/g)) groups[m[1]] = [...m[3].matchAll(/db (\d+), (\w+)/g)].map(x => [+x[1], x[2]]);
const superRod = {};
for (const m of srTxt.matchAll(/dbw (\w+),\s+\.(Group\d+)/g)) superRod[m[1]] = groups[m[2]];
const trades = [...rd('data/events/trades.asm').matchAll(/npctrade (\w+),\s+(\w+),\s+(\w+),\s+"([^"]*)"/g)].map(m => ({ give: m[1], get: m[2], dialog: m[3], nick: m[4] }));
const slotChances = [...rd('data/wild/probabilities.asm').matchAll(/wild_chance\s+(\d+)/g)].map(m => +m[1]);
const growthRates = {};

const out = { species, dexOrder, moves, moveList, typeChart, items, tmMoves, hmMoves, keyItems, marts, trainerClasses, parties, loneMoves, teamMoves, wild, goodRod, superRod, trades, slotChances };
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'pokedata.js'), '// Generated by tools/convert_data.js from pokered game data tables.\nG.DATA=' + JSON.stringify(out) + ';\n');
console.log('species', Object.keys(species).length, 'moves', moveList.length, 'items', Object.keys(items).length, 'classes', Object.keys(trainerClasses).length, 'wild', Object.keys(wild).length, 'trades', trades.length);
console.log(JSON.stringify(species.BULBASAUR), JSON.stringify(species.EEVEE.evos), JSON.stringify(parties.BROCK), JSON.stringify(wild.ROUTE_1));
console.log(Object.keys(species).filter(k => !species[k].cat));
