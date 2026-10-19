// Mashing buttons in battle must not flee by accident: B no longer jumps to RUN, a tap on RUN only points at it, and the
// menu never reopens on RUN after a run that didn't work.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the battle menu does not land on RUN by accident', () => {
  const { G } = loadGame();
  const I = G.input.injected;
  const scene = () => G.engine.scenes.find(s => s.constructor.name === 'BattleScene');
  const step = (n = 5) => { for (let j = 0; j < n; j++) G.engine.step(); };
  const tap = k => { I[k] = true; G.engine.step(); I[k] = false; step(4); };
  const until = (cond, frames = 3000) => { for (let f = 0; f < frames && !cond(); f++) G.engine.step(); return cond(); };
  const inMenu = () => scene() && scene().menu && scene().menu.kind === 'action';

  G.state.party = [new G.Mon('PIKACHU', 30)];
  G.spawnScript(G.startTrainerBattle('YOUNGSTER', 1));
  check(until(inMenu), 'battle reaches the action menu');
  for (let i = 0; i < 4; i++) tap('b');
  check(inMenu() && scene().menu.sel === 0, 'B leaves the cursor on FIGHT');

  I.pointer = { x: 186 + 8 + 58 + 12, y: 136 + 6 + 15 + 5, click: true }; G.engine.step(); I.pointer = null; step();
  check(inMenu() && scene().menu.sel === 3, 'a tap on RUN points at it without choosing it');

  tap('a');
  check(until(inMenu), 'trying to run from a trainer fails and the menu comes back');
  check(scene().menu.sel === 0, 'the menu reopens on FIGHT, not RUN');
});
