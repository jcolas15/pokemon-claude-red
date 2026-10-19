// Gen 3 Phase 1 (docs/gen3-integration-plan.md): Truant, Wonder Guard, Shedinja's 1 HP, Wurmple's fixed branch,
// Nincada's extra Shedinja, the Gen 3 evolution items and moves. Real Gen 3 species arrive in Phase 2, so these use
// test species built from existing ones with the Gen 3 flags.
import { describe, it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

describe('Gen 3 mechanics', () => {
  const { G, D } = loadGame();
  const make = (id, from, extra) => { D.species[id] = Object.assign({}, D.species[from], { id, name: id.replace('TEST_', '') }, extra); };
  make('TEST_SLAKING', 'SNORLAX', { ability: 'TRUANT' });
  make('TEST_SHEDINJA', 'HAUNTER', { types: ['BUG', 'GHOST'], ability: 'WONDER_GUARD', fixedHp: 1, evos: [] });
  make('TEST_NINJASK', 'BEEDRILL', { evos: [] });
  make('TEST_NINCADA', 'WEEDLE', { evos: [{ type: 'level', level: 20, to: 'TEST_NINJASK', extra: 'TEST_SHEDINJA' }] });
  make('TEST_SILCOON', 'METAPOD', { evos: [] }); make('TEST_CASCOON', 'KAKUNA', { evos: [] });
  make('TEST_WURMPLE', 'CATERPIE', { evos: [{ type: 'dv', level: 7, parity: 0, to: 'TEST_SILCOON' }, { type: 'dv', level: 7, parity: 1, to: 'TEST_CASCOON' }] });
  make('TEST_HUNTAIL', 'SEADRA', { evos: [] });
  make('TEST_CLAMPERL', 'SHELLDER', { evos: [{ type: 'item', item: 'DEEP_SEA_TOOTH', to: 'TEST_HUNTAIL' }] });

  const battleWith = (mon, wild, lv, frames = 20000, stopWhen) => {
    G.state.party = [mon];
    const task = G.spawnScript(G.startWildBattle(wild, lv));
    for (let f = 0; f < frames && !task.done && !(stopWhen && stopWhen()); f++) {
      const top = G.engine.scenes[G.engine.scenes.length - 1];
      G.input.injected.a = f % 3 === 0; if (top && top.menu && top.menu.kind === 'moves') top.menu.sel = 0;
      G.engine.step();
    }
    G.input.injected.a = false;
    if (!task.done) { G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0; }
    return task;
  };

  it('Truant: Slaking acts the turn it comes in, then every other turn', () => {
    const turns = [], doMove = G.Battle.prototype.doMove, exec = G.Battle.prototype.executeMove;
    G.Battle.prototype.doMove = function* (side, id) { if (side.isPlayer) turns.push('turn'); yield* doMove.call(this, side, id); };
    G.Battle.prototype.executeMove = function* (side, md) { if (side.isPlayer) turns.push('act'); yield* exec.call(this, side, md); };
    try {
      const slaking = new G.Mon('TEST_SLAKING', 50); slaking.moves = []; slaking.addMove('GROWL');
      battleWith(slaking, 'CHANSEY', 50, 30000, () => turns.filter(t => t === 'turn').length >= 6);
    } finally { G.Battle.prototype.doMove = doMove; G.Battle.prototype.executeMove = exec; }
    const acted = []; turns.forEach((t, i) => { if (t === 'turn') acted.push(turns[i + 1] === 'act'); });
    check(acted.length >= 6, `six turns played (${acted.length})`);
    check(acted.slice(0, 6).join() === 'true,false,true,false,true,false', 'acts, loafs, acts, loafs… (' + acted.slice(0, 6).join() + ')');
  });

  it('Wonder Guard: only super-effective hits land on Shedinja, and it has 1 HP', () => {
    check(new G.Mon('TEST_SHEDINJA', 50).maxhp === 1 && new G.Mon('TEST_SHEDINJA', 5).maxhp === 1, 'Shedinja always has 1 HP');
    const striker = move => { const m = new G.Mon('MEWTWO', 70); m.moves = []; m.addMove(move); return m; };
    const battles = [], run = G.Battle.prototype.run;
    G.Battle.prototype.run = function* (ui) { battles.push(this); return yield* run.call(this, ui); };
    try {
      battleWith(striker('WATER_GUN'), 'TEST_SHEDINJA', 30, 6000);
      const b = battles[0];
      check(b && b.mon(b.e).hp === 1, 'a neutral Water Gun is blocked (Shedinja still at 1 HP)');
      const t = battleWith(striker('EMBER'), 'TEST_SHEDINJA', 30);
      check(t.done && t.value === 'win', `a super-effective Ember knocks it out (${t.value})`);
    } finally { G.Battle.prototype.run = run; }
  });

  it('Wurmple always takes the branch its DVs pick', () => {
    const even = new G.Mon('TEST_WURMPLE', 7, { dvs: { atk: 4, def: 8, spd: 8, spc: 8 } });
    const odd = new G.Mon('TEST_WURMPLE', 7, { dvs: { atk: 5, def: 8, spd: 8, spc: 8 } });
    check(even.evoByLevel() === 'TEST_SILCOON' && odd.evoByLevel() === 'TEST_CASCOON', 'even Attack DV -> Silcoon, odd -> Cascoon');
    check(new G.Mon('TEST_WURMPLE', 6, { dvs: { atk: 4, def: 8, spd: 8, spc: 8 } }).evoByLevel() === null, 'not before Lv 7');
  });

  it('Nincada becomes Ninjask, and a Shedinja appears if the party has room', () => {
    const nincada = new G.Mon('TEST_NINCADA', 20); nincada.moves = []; nincada.addMove('SCRATCH'); nincada.addMove('HARDEN');
    G.state.party = [nincada];
    drive(G, G.spawnScript(G.evolve(nincada, 'TEST_NINJASK', true)), 20000);
    const shell = G.state.party[1];
    check(nincada.species === 'TEST_NINJASK', 'Nincada evolved into Ninjask');
    check(shell && shell.species === 'TEST_SHEDINJA' && shell.level === 20 && shell.moves.map(m => m.id).join() === 'SCRATCH,HARDEN' && shell.maxhp === 1, 'a Lv 20 Shedinja with the same moves joins the party');
    const full = new G.Mon('TEST_NINCADA', 20);
    G.state.party = [full, ...Array.from({ length: 5 }, () => new G.Mon('RATTATA', 5))];
    drive(G, G.spawnScript(G.evolve(full, 'TEST_NINJASK', true)), 20000);
    check(G.state.party.length === 6 && !G.state.party.some(m => m.species === 'TEST_SHEDINJA'), 'no Shedinja with a full party');
  });

  it('Gen 3 evolution items and moves exist', () => {
    check(['DEEP_SEA_TOOTH', 'DEEP_SEA_SCALE', 'BEAUTY_SCALE'].every(id => D.items[id] && D.items[id].evo), 'Deep Sea Tooth/Scale and Beauty Scale are evolution items');
    const clamperl = new G.Mon('TEST_CLAMPERL', 30); G.state.party = [clamperl];
    drive(G, G.spawnScript(G.applyItemToMon('DEEP_SEA_TOOTH', clamperl, t => G.say(t), null)), 20000);
    check(clamperl.species === 'TEST_HUNTAIL', 'Clamperl + DEEPSEATOOTH -> Huntail');
    const gen3 = Object.values(D.moves).filter(m => m.num > 251);
    check(gen3.length >= 25 && gen3.every(m => D.moveList.includes(m.id) && G.typeMult(m.type, ['NORMAL']) >= 0 && m.pp > 0 && m.power > 0), `${gen3.length} Gen 3 attacks with valid data`);
    check(['LEAF_BLADE', 'BLAZE_KICK', 'AIR_CUTTER', 'POISON_TAIL'].every(id => D.moves[id].highCrit), 'Leaf Blade, Blaze Kick, Air Cutter and Poison Tail have a high critical-hit ratio');
  });
});
