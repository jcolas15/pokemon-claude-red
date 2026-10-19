// Learning a fifth move shows each move's type, power, accuracy and PP beside the "forget which move?" list.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the forget-a-move list shows move details', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  const I = G.input.injected, step = n => { for (let i = 0; i < n; i++) G.engine.step(); };
  const tap = k => { I[k] = true; step(1); I[k] = false; step(5); };
  const top = () => G.engine.scenes[G.engine.scenes.length - 1];
  const m = new G.Mon('PIKACHU', 30); m.moves = []; for (const id of ['THUNDERSHOCK', 'QUICK_ATTACK', 'THUNDER_WAVE', 'GROWL']) m.addMove(id);
  G.state.party = [m];
  const task = G.spawnScript(G.learnMoveFlow(m, 'THUNDERBOLT', null));
  for (let i = 0; i < 900 && !(top() instanceof G.ui.Menu && top().items.length === 4); i++) { I.a = i % 4 === 0; step(1); }
  I.a = false;
  const info = G.engine.scenes.find(s => s.constructor.name === 'MoveInfo');
  check(!!info && info.mv === 'THUNDERBOLT', 'a move details panel sits beside the list');
  tap('down'); tap('down'); tap('down');
  check(info.sel === 3, 'it follows the highlighted move');
  tap('a');
  for (let i = 0; i < 900 && !task.done; i++) { I.a = i % 4 === 0; step(1); }
  check(task.done && m.moves.map(x => x.id).join() === 'THUNDERSHOCK,QUICK_ATTACK,THUNDER_WAVE,THUNDERBOLT', 'Growl is forgotten for Thunderbolt');
  check(!G.engine.scenes.some(s => s.constructor.name === 'MoveInfo'), 'the panel closes afterwards');
});
