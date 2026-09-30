// Builds src/generated/guide-data.json for the /guide page by loading the game headlessly, so every team, move,
// encounter rate and Gen 2 placement the guide shows comes from this build. Runs before `next dev` and `next build`.
'use strict';
const fs = require('fs'), path = require('path');
const G = require('./headless.js').loadGame({ search: '' }).G;
G.boot();
const D = G.DATA;

const typeName = t => (t === 'PSYCHIC_TYPE' ? 'PSYCHIC' : t);
const sp = id => D.species[id];
const isGen2 = id => sp(id).dex > 151;
const mon = m => ({ name: sp(m.species).name, level: m.level, types: sp(m.species).types.map(typeName), moves: m.moves.map(x => D.moves[x.id].name), gen2: isGen2(m.species) });
const party = (cls, n) => G.makeTrainerParty(cls, n).map(mon);
const ATTACK_TYPES = [...new Set(D.typeChart.map(([a]) => a))].filter(t => t !== 'BIRD');
// attacking types that hit at least half the team for double damage or more, most members first
function weakTo(cls, n) {
  const team = G.makeTrainerParty(cls, n);
  return ATTACK_TYPES.map(t => [t, team.filter(m => G.typeMult(t, sp(m.species).types) >= 2).length])
    .filter(([, c]) => c * 2 >= team.length).sort((a, b) => b[1] - a[1]).map(([t]) => typeName(t));
}
const trainer = (cls, n) => ({ team: party(cls, n), weakTo: weakTo(cls, n) });

// the rival's team slot for each of your starters: Bulbasaur, Charmander, Squirtle (pallet.js RIVAL_PICK)
const byStarter = (cls, base) => [base + 3, base + 1, base + 2].map(n => party(cls, n));
const rival = [['Oak\'s lab', 'After you pick a starter', 'RIVAL1', 0], ['Route 22', 'Optional, before Brock', 'RIVAL1', 3],
  ['Cerulean City', 'North bridge, before Misty', 'RIVAL1', 6], ['S.S. Anne', 'Before Lt. Surge', 'RIVAL2', 0],
  ['Pokémon Tower', 'Lavender, 2F', 'RIVAL2', 3], ['Silph Co.', '7F, before Giovanni', 'RIVAL2', 6],
  ['Route 22', 'After the 8th badge', 'RIVAL2', 9], ['Champion', 'Indigo Plateau', 'RIVAL3', 0]]
  .map(([where, when, cls, base]) => ({ where, when, teams: byStarter(cls, base) }));

// wild encounters by place; floors of one cave merge, keeping each species' best odds and full level range
const display = {};
for (const [name, m] of Object.entries(G.MAPDATA.maps)) if (m.cnst) display[m.cnst] = G.mapDisplayName(G.maps.getMap(name));
const wild = {};
for (const [cnst, w] of Object.entries(D.wild)) for (const kind of ['grass', 'water']) {
  const t = w[kind]; if (!t.rate) continue;
  const place = display[cnst] || cnst, here = {};
  t.mons.forEach(([lv, id], i) => {
    const a = here[id] || (here[id] = { pct: 0, lo: lv, hi: lv });
    a.pct += D.slotChances[i] / 256 * 100; a.lo = Math.min(a.lo, lv); a.hi = Math.max(a.hi, lv);
  });
  const into = ((wild[place] = wild[place] || {})[kind] = wild[place][kind] || {});
  for (const [id, a] of Object.entries(here)) {
    const b = into[id] || (into[id] = { pct: 0, lo: a.lo, hi: a.hi });
    b.pct = Math.max(b.pct, a.pct); b.lo = Math.min(b.lo, a.lo); b.hi = Math.max(b.hi, a.hi);
  }
}
for (const kinds of Object.values(wild)) for (const kind of Object.keys(kinds))
  kinds[kind] = Object.entries(kinds[kind]).sort((a, b) => b[1].pct - a[1].pct)
    .map(([id, a]) => ({ name: sp(id).name, levels: a.lo === a.hi ? String(a.lo) : a.lo + '-' + a.hi, pct: Math.round(a.pct), gen2: isGen2(id) }));
const superRod = {};
for (const [cnst, list] of Object.entries(D.superRod)) {
  const place = display[cnst] || cnst;
  superRod[place] = [...new Set((superRod[place] || []).concat(list.map(([, id]) => sp(id).name)))];
}

// one-off POKéMON standing on the map (Gen 1 legendaries, Snorlax-style statics come from scripts, Gen 2 from gen2.js)
const statics = {};
for (const [name, m] of Object.entries(G.MAPDATA.maps)) for (const o of m.objs) if (o.mon && !/^GEN2_/.test(o.id)) {
  const k = o.mon.species + ':' + o.mon.level + ':' + name;
  statics[k] = statics[k] || { name: sp(o.mon.species).name, level: o.mon.level, where: G.mapDisplayName(G.maps.getMap(name)), count: 0 };
  statics[k].count++;
}

// every evolution that involves a Gen 2 POKéMON, in Pokédex order of the one evolving
const evolutions = [];
for (const id of D.dexOrder.slice(1)) for (const e of sp(id).evos) {
  if (!isGen2(id) && !isGen2(e.to)) continue;
  const how = e.type === 'level' ? 'Lv ' + e.level : e.type === 'item' ? D.items[e.item].name
    : e.type === 'stat' ? 'Lv ' + e.level + ', ' + ({ 1: 'Attack > Defense', '-1': 'Attack < Defense', 0: 'Attack = Defense' })[e.cmp] : 'trade';
  evolutions.push({ from: sp(id).name, to: sp(e.to).name, how, item: e.type === 'item' });
}

const EFFECT = { NO_ADDITIONAL: '', SWIFT: 'never misses', BURN_SIDE1: 'may burn', BURN_SIDE2: 'may burn', FREEZE_SIDE1: 'may freeze',
  PARALYZE_SIDE2: 'may paralyze', POISON_SIDE2: 'may poison', DRAIN_HP: 'drains HP', FLINCH_SIDE1: 'may flinch',
  DEFENSE_DOWN_SIDE: 'may lower Defense', SPECIAL_DOWN_SIDE: 'may lower Special' };
const HIGH_CRIT = new Set(['CROSS_CHOP', 'AEROBLAST']);
const newMoves = Object.values(D.moves).filter(m => m.num > 165).sort((a, b) => a.num - b.num)
  .map(m => ({ name: m.name, type: typeName(m.type), power: m.power, acc: m.acc, pp: m.pp, effect: [EFFECT[m.effect], HIGH_CRIT.has(m.id) ? 'high critical-hit ratio' : ''].filter(Boolean).join(', ') }));

const g = G.GEN2_GUIDE;
const out = {
  counts: { gen1: 151, gen2: D.dexOrder.length - 152, maps: Object.keys(G.MAPDATA.maps).length },
  gyms: Object.fromEntries([['BROCK', 1], ['MISTY', 1], ['LT_SURGE', 1], ['ERIKA', 1], ['KOGA', 1], ['SABRINA', 1], ['BLAINE', 1], ['GIOVANNI', 3]]
    .map(([cls, n]) => [cls, trainer(cls, n)])),
  eliteFour: Object.fromEntries(['LORELEI', 'BRUNO', 'AGATHA', 'LANCE'].map(cls => [cls, trainer(cls, 1)])),
  champion: [3, 1, 2].map(n => trainer('RIVAL3', n)),
  // the second run after the first HALL OF FAME (G.E4_2): the room order is Will, Koga, Bruno, Karen, then Champion Lance
  eliteFour2: Object.fromEntries(Object.values(G.E4_2).map(r => [r.cls, trainer(r.cls, r.n)])),
  rival,
  wild, goodRod: D.goodRod.map(([lv, id]) => ({ name: sp(id).name, level: lv })), superRod,
  trades: D.trades.map(t => ({ give: sp(t.give).name, get: sp(t.get).name, nick: t.nick, gen2: isGen2(t.get) })),
  statics: Object.values(statics),
  towerPrizes: G.TOWER_PRIZES.map(([id, bp]) => ({ item: D.items[id].name, bp })),
  gen2: {
    gifts: g.gifts.map(x => Object.assign({}, x, { species: x.species.map(id => sp(id).name) })),
    trades: g.trades.map(t => ({ give: sp(t.give).name, get: sp(t.get).name, nick: t.nick, where: t.where })),
    items: g.items.map(x => Object.assign({}, x, { item: D.items[x.item].name })),
    legends: g.legends.map(x => Object.assign({}, x, { species: sp(x.species).name, types: sp(x.species).types.map(typeName) })),
    evolutions, newMoves,
  },
};
const file = path.join(__dirname, '..', 'src', 'generated', 'guide-data.json');
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(out, null, 1));
console.log('guide data:', path.relative(process.cwd(), file), (fs.statSync(file).size / 1024).toFixed(0) + ' KB');
