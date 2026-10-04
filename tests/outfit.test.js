// START > OUTFIT reopens the character customizer: YES keeps the new look, NO puts the old one back.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the outfit can be changed from the START menu', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  const I = G.input.injected, top = () => G.engine.scenes[G.engine.scenes.length - 1];
  const tap = (k, n = 1) => { for (let i = 0; i < n; i++) { I[k] = true; G.engine.step(); I[k] = false; for (let j = 0; j < 6; j++) G.engine.step(); } };
  const settle = n => { for (let i = 0; i < n; i++) G.engine.step(); };
  const J = l => JSON.stringify(l);
  G.state.look = Object.assign({}, G.DEFAULT_LOOK); G.applyLook(G.state.look);
  const start = J(G.state.look);

  const round = keep => {
    tap('start'); settle(12);
    const before = (G.flag('EVENT_GOT_POKEDEX') ? 1 : 0) + (G.state.party.length ? 1 : 0);
    tap('down', before + 2); tap('a'); // ITEM, name, then OUTFIT
    check(top().constructor.name === 'Customizer', 'OUTFIT opens the customizer');
    tap('down', 3); tap('right'); // change a colour
    tap('start'); settle(30); // DONE
    if (!keep) tap('down');
    tap('a'); settle(30);
    tap('b', 3);
  };
  round(true);
  const kept = J(G.state.look);
  check(kept !== start, 'YES keeps the new look');
  round(false);
  check(J(G.state.look) === kept, 'NO puts the previous look back');
  check(Object.entries(G.lookDef(G.state.look)).every(([k, v]) => J(G.CAST.red[k]) === J(v)), 'the player sprite matches the saved look');
});
