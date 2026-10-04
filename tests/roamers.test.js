// Raikou, Entei and Suicune (src/engine/game/roamers.ts): where they roam, how often they appear, fleeing, saving.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('roaming legendaries behave as in Gen 2', () => {
  const { G, D } = loadGame();
  const R = G.roamers;
  const hasGrass = n => { const m = G.MAPDATA.maps[n], w = m && D.wild[m.cnst]; return !!(w && w.grass.rate && w.grass.mons.length); };
  const routes = Object.keys(G.MAPDATA.maps).filter(n => G.MAPDATA.maps[n].conns && Object.keys(G.MAPDATA.maps[n].conns).length && hasGrass(n));
  check(!routes.filter(n => !R.routesNear(n).length).length, 'every outdoor grass map has a neighbouring route to roam to');

  G.state.roamers = []; R.release('ZAPDOS', 50, 'Route1');
  const r = G.state.roamers[0];
  let off = 0; for (let i = 0; i < 3000; i++) { R.step(); if (!hasGrass(r.map)) off++; }
  check(off === 0, 'roamer only ever sits on grass routes (3000 hops)');

  r.map = 'Route1'; G.ow.load('Route2', 5, 5, 'down');
  check(r.map !== 'Route1', 'changing maps moves the roamer');

  r.map = 'Route1'; let hits = 0; for (let i = 0; i < 4000; i++) if (R.encounter('Route1')) hits++;
  check(hits > 850 && hits < 1150, `takes over about 1 in 4 wild encounters on its route (${hits}/4000)`);
  check(!R.encounter('Route3'), 'no roamer encounter on other routes');

  const drive = task => {
    for (let f = 0; f < 40000 && !task.done; f++) {
      const top = G.engine.scenes[G.engine.scenes.length - 1];
      G.input.injected.a = f % 3 === 0; if (top && top.menu && top.menu.kind === 'moves') top.menu.sel = 0;
      G.engine.step();
    }
    return task;
  };
  const hero = new G.Mon('MEWTWO', 70); hero.moves = []; hero.addMove('SWIFT'); G.state.party = [hero];
  r.mon = new G.Mon('ZAPDOS', 50, { ot: 'WILD' }).toJSON(); r.seen = false;
  const hp0 = r.mon.hp;
  let t = drive(G.spawnScript(R.battle(r)));
  check(t.done && t.value === 'fled', `roamer flees when it gets to act (${t.value})`);
  check(G.state.roamers.length === 1 && r.mon.hp < hp0 && r.mon.hp > 0, `its lost HP carries over (${hp0} -> ${r.mon.hp})`);
  check(r.seen === true && R.seen().length === 1, 'marked as seen for the Town Map');

  const big = new G.Mon('MEWTWO', 100); big.moves = []; big.addMove('PSYCHIC_M'); G.state.party = [big];
  r.mon.status = 'SLP'; r.mon.sleep = 7;
  t = drive(G.spawnScript(R.battle(r)));
  check(t.value !== 'fled', `a sleeping roamer cannot flee (${t.value})`);
  check(G.state.roamers.length === 0, 'a knocked-out roamer is gone for good');

  R.release('MOLTRES', 50, 'Route12'); G.state.roamers[0].seen = true;
  G.saveGame(); const back = G.loadSave();
  check(back && back.roamers && back.roamers[0].map === 'Route12' && back.roamers[0].mon.species === 'MOLTRES', 'roamers survive save and load');
});
