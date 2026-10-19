// Converts the Gen 3 species (#252-386) from the pokeemerald decompilation into src/engine/data/gen3.ts, in Gen 3's own
// terms (split Special, Gen 3 evolution kinds). Move names are matched to this game's ids where the move exists here
// (pokeemerald spells SOLARBEAM as SOLAR_BEAM, PSYCHIC as PSYCHIC); src/engine/data/gen3_rules.ts maps the rest and
// applies Gen 1 rules at load time.
// usage: node tools/convert_gen3.js [path to pokeemerald] [--report]   (default vendor/pokeemerald, git-ignored)
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2), report = args.includes('--report');
const P = path.resolve(args.find(a => !a.startsWith('--')) || path.join(ROOT, 'vendor', 'pokeemerald'));
const rd = f => fs.readFileSync(path.join(P, f), 'utf8');

// national dex order, Treecko to Deoxys
const nat = [...rd('include/constants/pokedex.h').matchAll(/^\s*NATIONAL_DEX_(\w+),/gm)].map(m => m[1]);
const ids = nat.slice(nat.indexOf('TREECKO'), nat.indexOf('DEOXYS') + 1);
if (ids.length !== 135) throw new Error('expected 135 Gen 3 species, got ' + ids.length);
const dexOf = {}; ids.forEach((id, i) => { dexOf[id] = 252 + i; });

const names = Object.fromEntries([...rd('src/data/text/species_names.h').matchAll(/\[SPECIES_(\w+)\] = _\("([^"]*)"\)/g)].map(m => [m[1], m[2]]));
// `[SPECIES_X] = <body>` blocks in a table: the text up to the next entry
function table(file, key) {
  const src = rd(file), out = {}, re = new RegExp('\\[' + key + '_(\\w+)\\]\\s*=', 'g');
  const hits = [...src.matchAll(re)];
  hits.forEach((m, i) => { out[m[1]] = src.slice(m.index + m[0].length, i + 1 < hits.length ? hits[i + 1].index : src.length); });
  return out;
}
const info = table('src/data/pokemon/species_info.h', 'SPECIES');
const tmhm = table('src/data/pokemon/tmhm_learnsets.h', 'SPECIES');
const evolution = table('src/data/pokemon/evolution.h', 'SPECIES');
const dexEntries = table('src/data/pokemon/pokedex_entries.h', 'NATIONAL_DEX');
const learnPtr = Object.fromEntries([...rd('src/data/pokemon/level_up_learnset_pointers.h').matchAll(/\[SPECIES_(\w+)\] = (\w+),/g)].map(m => [m[1], m[2]]));
const learnSrc = rd('src/data/pokemon/level_up_learnsets.h');
const learnsets = {};
for (const m of learnSrc.matchAll(/static const u16 (\w+)\[\] = \{([\s\S]*?)\};/g)) learnsets[m[1]] = [...m[2].matchAll(/LEVEL_UP_MOVE\(\s*(\d+),\s*MOVE_(\w+)\)/g)].map(x => [+x[1], x[2]]);

// this game's move ids, so pokeemerald's spellings can be matched
const G0 = require('./headless.js').loadGame({ search: '' }).G; G0.boot();
const known = {}; for (const id of Object.keys(G0.DATA.moves)) known[id.replace(/_/g, '')] = id;
const SPELLING = { PSYCHIC: 'PSYCHIC_M' };
const moveId = m => SPELLING[m] || known[m.replace(/_/g, '')] || m;

const TYPE = t => (t === 'PSYCHIC' ? 'PSYCHIC_TYPE' : t);
const num = (body, field) => { const m = body.match(new RegExp('\\.' + field + '\\s*=\\s*(\\d+)')); if (!m) throw new Error('no ' + field); return +m[1]; };
const species = {}, unknownMoves = {};
for (const id of ids) {
  const b = info[id]; if (!b) throw new Error('no species_info for ' + id);
  const types = [...new Set([...b.match(/\.types = \{([^}]*)\}/)[1].matchAll(/TYPE_(\w+)/g)].map(m => TYPE(m[1])))];
  const evos = [];
  for (const e of (evolution[id] || '').matchAll(/\{\s*EVO_(\w+),\s*(\w+),\s*SPECIES_(\w+)\s*\}/g)) {
    const [, kind, param, to] = e;
    evos.push(/^\d+$/.test(param) ? { kind, level: +param, to } : { kind, item: param.replace(/^ITEM_/, ''), to });
  }
  const learn = (learnsets[learnPtr[id]] || []).map(([lv, m]) => [lv, moveId(m)]);
  const tm = [...(tmhm[id] || '').matchAll(/\.(\w+) = TRUE/g)].map(m => moveId(m[1]));
  for (const [, m] of learn) if (!G0.DATA.moves[m]) (unknownMoves[m] = unknownMoves[m] || []).push(id);
  const d = dexEntries[id] || '';
  const cat = (d.match(/\.categoryName = _\("([^"]*)"\)/) || [])[1];
  const inches = Math.round(num(d, 'height') * 3.937), lbs10 = Math.round(num(d, 'weight') * 2.2046);
  species[id] = {
    id, name: names[id], dex: dexOf[id],
    hp: num(b, 'baseHP'), atk: num(b, 'baseAttack'), def: num(b, 'baseDefense'), spd: num(b, 'baseSpeed'),
    spa: num(b, 'baseSpAttack'), sdf: num(b, 'baseSpDefense'), types,
    catchRate: num(b, 'catchRate'), baseExp: num(b, 'expYield'), growth: b.match(/\.growthRate = GROWTH_(\w+)/)[1],
    tmhm: tm, evos, learn, cat, ht: [Math.floor(inches / 12), inches % 12], wt: lbs10,
  };
}

if (report) {
  const rows = Object.entries(unknownMoves).sort((a, b) => b[1].length - a[1].length);
  console.log(rows.length + ' learnset moves this game does not have (move: how many species learn it):');
  console.log(rows.map(([m, l]) => m + ':' + l.length).join('  '));
  const kinds = new Set(Object.values(species).flatMap(s => s.evos.map(e => e.kind)));
  console.log('evolution kinds:', [...kinds].join(', '), '| growth rates:', [...new Set(Object.values(species).map(s => s.growth))].join(', '));
  process.exit(0);
}

const out = '// Generated by tools/convert_gen3.js from the pokeemerald decompilation. Gen 3 species #252-386 in Gen 3\'s own terms;\n' +
  '// src/engine/data/gen3_rules.ts turns them into this game\'s rules at load time. Do not edit by hand.\n' +
  'import { game } from \'../global\';\n\n' +
  'game().GEN3_RAW = ' + JSON.stringify({ species }) + ';\n';
fs.writeFileSync(path.join(ROOT, 'src', 'engine', 'data', 'gen3.ts'), out);
console.log('src/engine/data/gen3.ts:', Object.keys(species).length, 'species,', (out.length / 1024).toFixed(1) + ' KB');

// lint what the game actually loads once src/engine/data/gen3_rules.ts has applied this game's rules
const G = require('./headless.js').loadGame({ search: '' }).G; G.boot();
const D = G.DATA, problems = [];
const TYPES = new Set(D.typeChart.flatMap(([a, d]) => [a, d]));
// no attacking move by Lv 10 in Gen 3 either: babies that only Splash, the Magikarp-likes, and the defensive cocoons
const NO_EARLY_ATTACK = new Set(['AZURILL', 'WYNAUT', 'FEEBAS', 'SILCOON', 'CASCOON', 'BELDUM', 'SPINDA', 'SHEDINJA', 'NINJASK', 'KECLEON', 'SPOINK', 'CHIMECHO', 'METANG', 'METAGROSS']);
for (const id of Object.keys(species)) {
  const s = D.species[id], lv10 = s.moves1.concat(s.learn.filter(([l]) => l <= 10).map(([, m]) => m));
  if (!s.moves1.length) problems.push(id + ': no starting moves');
  const attacks = m => D.moves[m].power > 0 || ['SPECIAL_DAMAGE', 'SUPER_FANG', 'BIDE'].includes(D.moves[m].effect) || m === 'METRONOME';
  if (!NO_EARLY_ATTACK.has(id) && !lv10.some(attacks)) problems.push(id + ': no attacking move by Lv 10 (' + lv10.join(', ') + ')');
  for (const t of s.types) if (!TYPES.has(t)) problems.push(id + ': unknown type ' + t);
  for (const e of s.evos) {
    if (!D.species[e.to]) problems.push(id + ': evolves into unknown ' + e.to);
    if (e.item && !D.items[e.item]) problems.push(id + ': evolution item ' + e.item + ' missing');
  }
  if (!['FAST', 'MEDIUM_FAST', 'MEDIUM_SLOW', 'SLOW'].includes(s.growth)) problems.push(id + ': unknown growth rate ' + s.growth);
  if (s.name.length > 10) problems.push(id + ': name longer than 10 characters');
  if (D.dexOrder[s.dex] !== id) problems.push(id + ': not at #' + s.dex + ' in the Pokédex order');
}
if (problems.length) { console.error('lint failed:\n  ' + problems.join('\n  ')); process.exit(1); }
console.log('lint: all', Object.keys(species).length, 'species have starting moves, an early attack, known types, valid evolutions and growth rates');
