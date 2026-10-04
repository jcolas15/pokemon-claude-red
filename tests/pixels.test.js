// Renders a fixed set of scenes with Math.random seeded and compares a hash of each frame. A changed hash means the
// game draws differently; if the change is intended, update EXPECTED with the new values from the failure message.
import { createHash } from 'node:crypto';
import { it, expect } from 'vitest';
import { headless as H } from './helpers.js';

const EXPECTED = {
  pallet: '9060facc6390',
  forest: '992c895442d5',
  'cerulean-night': 'd3b1656719c2',
  battle: 'a0d3fad7d138',
  townmap: 'fa60b459d5c6',
  title: '820048cf6526',
};

it('renders the reference scenes pixel-for-pixel', () => {
  let seed = 1;
  const random = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const realRandom = Math.random;
  Math.random = random;
  try {
    const ctx = H.loadGame({ search: '?map=PalletTown&x=5&y=6' }), G = ctx.G;
    ctx.Math.random = random; G.boot();
    G.noEncounters = true; G.forceHour = 12;
    const got = {};
    const snap = n => { got[n] = createHash('sha1').update(Buffer.from(G.gfx.screen.data.buffer)).digest('hex').slice(0, 12); };
    H.runFrames(G, 30); snap('pallet');
    G.ow.load('ViridianForest', 17, 45, 'up'); H.runFrames(G, 30); snap('forest');
    G.ow.load('CeruleanCity', 20, 20, 'down'); G.forceHour = 22; H.runFrames(G, 30); snap('cerulean-night'); G.forceHour = 12;
    G.state.party = [new G.Mon('CHARIZARD', 50)]; G.spawnScript(G.startWildBattle('BLASTOISE', 50)); H.runFrames(G, 240); snap('battle');
    while (G.engine.scenes.length > 1) G.engine.pop();
    G.spawnScript(G.showTownMap()); H.runFrames(G, 10); snap('townmap');
    while (G.engine.scenes.length) G.engine.pop(); G.titleScreen(); H.runFrames(G, 60); snap('title');
    expect(got).toEqual(EXPECTED);
  } finally {
    Math.random = realRandom;
  }
});
