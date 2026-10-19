// SELECT in the battle move menu swaps two moves (as in Red), and the new order stays after the battle.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('SELECT reorders moves mid-battle', () => {
  const { G } = loadGame();
  const I = G.input.injected;
  const scene = () => G.engine.scenes.find(s => s.constructor.name === 'BattleScene');
  const tap = k => { I[k] = true; G.engine.step(); I[k] = false; for (let j = 0; j < 4; j++) G.engine.step(); };
  const until = (cond, frames = 3000) => { for (let f = 0; f < frames && !cond(); f++) G.engine.step(); return cond(); };

  const mon = new G.Mon('PIKACHU', 30); mon.moves = []; for (const id of ['THUNDERSHOCK', 'QUICK_ATTACK', 'THUNDER_WAVE', 'GROWL']) mon.addMove(id);
  mon.moves[0].pp = 7;
  G.state.party = [mon];
  const task = G.spawnScript(G.startWildBattle('RATTATA', 3));
  check(until(() => scene() && scene().menu && scene().menu.kind === 'action'), 'battle reaches the action menu');
  tap('a'); // FIGHT
  check(scene().menu && scene().menu.kind === 'moves', 'FIGHT opens the move menu');

  tap('select'); tap('right'); tap('select');
  check(mon.moves.map(m => m.id).join() === 'QUICK_ATTACK,THUNDERSHOCK,THUNDER_WAVE,GROWL', 'SELECT, right, SELECT swaps the first two moves');
  check(mon.moves[1].id === 'THUNDERSHOCK' && mon.moves[1].pp === 7, 'PP travels with its move');
  check(scene().menu.swap === -1, 'the mark clears after a swap');

  tap('select'); tap('b');
  check(scene().menu && scene().menu.kind === 'moves' && scene().menu.swap === -1, 'B first cancels a marked move instead of leaving the menu');

  for (let f = 0; f < 40000 && !task.done; f++) { I.a = f % 3 === 0; const m = scene() && scene().menu; if (m && m.kind === 'moves') m.sel = 0; G.engine.step(); }
  check(task.done && mon.moves[0].id === 'QUICK_ATTACK', 'the new order stays after the battle');

  const b = { p: { v: { mimic: { slot: 2 }, transformed: null } }, moveList: () => mon.moves };
  G.Battle.prototype.swapMoves.call(b, b.p, 2, 3);
  check(b.p.v.mimic.slot === 3, 'a Mimic slot follows its move when swapped');
});
