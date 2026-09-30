// Balance check: fights each gym leader, Elite Four member and rival with a typical Gen 1 team, a greedy player (best
// expected-damage move, no items) and all three starters. Compares the Gen 1-only ("vanilla") leader and Gen 2 swaps.
// Usage: node tools/gymsim.js [runs per starter, default 20] [class prefix, e.g. BROCK or RIVAL]
// PATCH='{"BROCK":{"SUDOWOODO":[10,["LOW_KICK","MIMIC"]]}}' tries a trainer level/moveset without editing the game.
'use strict';
const G = require('./headless.js').loadGame({ search: '?map=Route1&x=10&y=20' }).G; G.boot();
G.noEncounters = true; G.autoBattleText = true; G.state.options.battleAnim = false;
const D = G.DATA, N = +(process.argv[2] || 20), only = process.argv[3];
const PATCH = process.env.PATCH ? JSON.parse(process.env.PATCH) : {};
const types = sp => D.species[sp].types;
const score = (att, mv, def) => {
  const m = D.moves[mv.id]; if (!m || !m.power) return 0;
  return m.power * (types(att.species).includes(m.type) ? 1.5 : 1) * G.typeMult(m.type, types(def.species)) * (m.acc || 100) / 100;
};
const makeParty = G.makeTrainerParty;
function trainerParty(cls, n, vanilla) {
  const party = makeParty(cls, n);
  for (const m of party) if (PATCH[cls] && PATCH[cls][m.species]) {
    const [lv, moves] = [].concat(PATCH[cls][m.species]), nm = new G.Mon(m.species, lv);
    if (moves) { nm.moves = []; for (const id of moves) nm.addMove(id); }
    Object.assign(m, nm);
  }
  return vanilla ? party.filter(m => D.species[m.species].dex <= 151) : party;
}
function fight(cls, n, team, vanilla) {
  G.makeTrainerParty = (c, k) => trainerParty(c, k, vanilla);
  G.state.party = team.map(([sp, lv]) => new G.Mon(sp, lv)); G.state.bag = [];
  const task = G.spawnScript(G.startTrainerBattle(cls, n));
  for (let f = 0; f < 80000 && !task.done; f++) {
    const top = G.engine.scenes[G.engine.scenes.length - 1];
    G.input.injected.a = f % 3 === 0;
    if (top && top.constructor.name === 'PartyScreen') {
      // after a faint send the first healthy one; decline the optional switch when the foe changes
      top.sel = top.o.forced ? Math.max(0, G.state.party.findIndex(m => m.hp > 0)) : G.state.party.length;
    }
    if (top && top.menu && top.menu.kind === 'moves' && top.b) {
      const b = top.b, me = b.mon(b.p), foe = b.mon(b.e), v = b.p.v;
      let best = -1;
      b.moveList(b.p).forEach((mv, i) => {
        const s = mv.pp <= 0 || (v && v.disabled && v.disabled.move === mv.id) ? -1 : score(me, mv, foe) + 0.01;
        if (s > best) { best = s; top.menu.sel = i; }
      });
    }
    G.engine.step();
  }
  G.makeTrainerParty = makeParty;
  if (!task.done) { G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0; return { r: 'stuck' }; }
  const hp = G.state.party.reduce((a, m) => a + m.hp, 0) / G.state.party.reduce((a, m) => a + m.maxhp, 0);
  return { r: task.value, hp, ko: G.state.party.filter(m => m.hp <= 0).length };
}

const STARTERS = { B: ['BULBASAUR', 'IVYSAUR', 'VENUSAUR'], C: ['CHARMANDER', 'CHARMELEON', 'CHARIZARD'], S: ['SQUIRTLE', 'WARTORTLE', 'BLASTOISE'] };
const RIVAL_SLOT = { B: 3, C: 1, S: 2 }; // the rival's team index offset for your starter (pallet.js RIVAL_PICK)
const stage = lv => (lv >= 36 ? 2 : lv >= 16 ? 1 : 0);
// [class, party index (1-based for leaders, base index for rivals), starter level, rest of the team, Gen 2 swaps {label: [slot, [species, level]]}]
const FIGHTS = [
  ['BROCK', 1, 13, [['PIDGEY', 11], ['RATTATA', 11], ['NIDORAN_M', 11]], { MAREEP: [2, ['MAREEP', 11]], HOPPIP: [2, ['HOPPIP', 11]] }],
  ['MISTY', 1, 21, [['PIDGEOTTO', 19], ['NIDORINO', 19], ['ODDISH', 18]], { SKIPLOOM: [2, ['SKIPLOOM', 19]], FLAAFFY: [2, ['FLAAFFY', 19]] }],
  ['LT_SURGE', 1, 24, [['PIDGEOTTO', 22], ['NIDORINO', 22], ['DIGLETT', 22]], { QUAGSIRE: [2, ['QUAGSIRE', 22]], AZUMARILL: [2, ['AZUMARILL', 22]] }],
  ['ERIKA', 1, 30, [['PIDGEOTTO', 28], ['NIDOKING', 28], ['GROWLITHE', 27]], { HOUNDOOM: [2, ['HOUNDOOM', 27]], YANMA: [2, ['YANMA', 27]] }],
  ['KOGA', 1, 42, [['PIDGEOT', 40], ['NIDOKING', 40], ['DUGTRIO', 38]], { DONPHAN: [2, ['DONPHAN', 38]], FORRETRESS: [2, ['FORRETRESS', 38]] }],
  ['SABRINA', 1, 43, [['PIDGEOT', 41], ['NIDOKING', 41], ['JOLTEON', 40]], { UMBREON: [2, ['UMBREON', 40]], HOUNDOOM: [2, ['HOUNDOOM', 40]], FORRETRESS: [2, ['FORRETRESS', 40]] }],
  ['BLAINE', 1, 46, [['PIDGEOT', 44], ['NIDOKING', 44], ['DUGTRIO', 42]], { QUAGSIRE: [2, ['QUAGSIRE', 42]], STEELIX: [2, ['STEELIX', 42]] }],
  ['GIOVANNI', 3, 49, [['PIDGEOT', 47], ['NIDOKING', 46], ['LAPRAS', 45]], { SKARMORY: [2, ['SKARMORY', 45]] }],
  ['LORELEI', 1, 56, [['PIDGEOT', 52], ['NIDOKING', 52], ['JOLTEON', 52]], { STEELIX: [0, ['STEELIX', 52]], SKARMORY: [0, ['SKARMORY', 52]] }],
  ['BRUNO', 1, 56, [['PIDGEOT', 52], ['NIDOKING', 52], ['JOLTEON', 52]], { STEELIX: [0, ['STEELIX', 52]], SKARMORY: [0, ['SKARMORY', 52]] }],
  ['AGATHA', 1, 56, [['PIDGEOT', 52], ['NIDOKING', 52], ['JOLTEON', 52]], { UMBREON: [2, ['UMBREON', 52]], STEELIX: [0, ['STEELIX', 52]] }],
  ['LANCE', 1, 58, [['PIDGEOT', 54], ['NIDOKING', 54], ['JOLTEON', 54]], { STEELIX: [0, ['STEELIX', 54]], SKARMORY: [0, ['SKARMORY', 54]] }],
  ['RIVAL1', 3, 10, [['PIDGEY', 8], ['RATTATA', 8]], {}],
  ['RIVAL1', 6, 19, [['PIDGEOTTO', 17], ['NIDORINO', 17], ['ODDISH', 16]], {}],
  ['RIVAL2', 0, 22, [['PIDGEOTTO', 19], ['NIDORINO', 19], ['DIGLETT', 18]], {}],
  ['RIVAL2', 3, 27, [['PIDGEOTTO', 25], ['NIDOKING', 25], ['GROWLITHE', 24]], {}],
  ['RIVAL2', 6, 42, [['PIDGEOT', 40], ['NIDOKING', 40], ['JOLTEON', 38]], { UMBREON: [2, ['UMBREON', 38]] }],
  ['RIVAL2', 9, 50, [['PIDGEOT', 48], ['NIDOKING', 48], ['LAPRAS', 46]], {}],
];
const pct = x => Math.round(x * 100) + '%';
for (const [cls, n, slv, rest, swaps] of FIGHTS) {
  if (only && !cls.startsWith(only)) continue;
  const rival = /^RIVAL/.test(cls);
  const variants = [['gen1 team', rest, false], ['gen1 team vs vanilla', rest, true]]
    .concat(Object.entries(swaps).map(([k, [i, m]]) => ['swap in ' + k, rest.map((x, j) => (j === i ? m : x)), false]));
  for (const [label, team, vanilla] of variants) {
    let w = 0, hp = 0, ko = 0, stuck = 0; const by = {};
    for (const [k, line] of Object.entries(STARTERS)) {
      by[k] = 0;
      for (let r = 0; r < N; r++) {
        const res = fight(cls, rival ? n + RIVAL_SLOT[k] : n, [[line[stage(slv)], slv], ...team], vanilla);
        if (res.r === 'win') { w++; by[k]++; hp += res.hp; ko += res.ko; } else if (res.r === 'stuck') stuck++;
      }
    }
    const t = N * 3;
    console.log((rival ? cls + '#' + n : cls).padEnd(9), label.padEnd(22), 'win', pct(w / t).padStart(4),
      ' B/C/S', Object.values(by).map(x => pct(x / N)).join('/').padEnd(14), 'on a win: hp', w ? pct(hp / w) : '-', 'fainted', w ? (ko / w).toFixed(1) : '-',
      stuck ? ' stuck ' + stuck : '');
  }
}
