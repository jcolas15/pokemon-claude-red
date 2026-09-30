// @ts-nocheck (plain JS moved into a module; typed file by file, see docs/nextjs-migration.md)
import { game } from '../global';

const G = game();

// Roaming legendaries (Gen 2's beasts) under Gen 1 rules. Each roamer hops to a nearby route whenever you change maps,
// can take the place of a wild encounter on its route, and flees whenever it gets to act, so sleep, freeze, full
// paralysis, flinching and WRAP-style trapping are how you pin one down. Its HP and status carry over between meetings;
// once caught or knocked out it is gone. Released by the story (docs/gen2-integration-plan.md, Phase 4).
const rnd = n => Math.floor(Math.random() * n);
const ENCOUNTER_ODDS = 4; // 1 in 4 wild encounters on the roamer's route
const list = () => (G.state.roamers = G.state.roamers || []);

function hasGrass(name) {
  const m = G.MAPDATA.maps[name], w = m && G.DATA.wild[m.cnst];
  return !!(w && w.grass && w.grass.rate && w.grass.mons.length);
}
// grass routes one step away, looking through towns (Route 1 -> Viridian City -> Route 2 / Route 22)
function routesNear(name) {
  const conns = n => (G.MAPDATA.maps[n] && G.MAPDATA.maps[n].conns) || {}, out = new Set();
  for (const c of Object.values(conns(name))) {
    if (hasGrass(c.map)) out.add(c.map);
    else for (const c2 of Object.values(conns(c.map))) if (c2.map !== name && hasGrass(c2.map)) out.add(c2.map);
  }
  return [...out];
}

G.roamers = {
  release(species, level, route) {
    list().push({ mon: new G.Mon(species, level, { ot: 'WILD' }).toJSON(), map: route, seen: false });
  },
  step() {
    for (const r of list()) { const near = routesNear(r.map); if (near.length) r.map = near[rnd(near.length)]; }
  },
  // the roamer that takes over this wild encounter, if any
  encounter(mapName) {
    const r = list().find(x => x.map === mapName);
    return r && rnd(ENCOUNTER_ODDS) === 0 ? r : null;
  },
  seen() { return list().filter(r => r.seen); },
  *battle(r) {
    const m = G.Mon.from(r.mon);
    r.seen = true;
    const res = yield* G.startWildBattle(m.species, m.level, { enemyMon: m, roamer: true, music: 'legendary' });
    const all = list(), i = all.indexOf(r);
    if (res === 'caught' || m.hp <= 0) { if (i >= 0) all.splice(i, 1); }
    else r.mon = m.toJSON();
    return res;
  },
  routesNear,
};
