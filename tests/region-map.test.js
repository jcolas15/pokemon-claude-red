// The detailed Kanto map (src/engine/game/regionmap.ts): names and markers come from the game data, indoor places sit at
// their outdoor door, and START → MAP opens a viewer that zooms and closes.
import { it } from 'vitest';
import { existsSync } from 'node:fs';
import { loadGame, check } from './helpers.js';

it('the Kanto map knows every town, gym and legendary, and the viewer works', () => {
  const { G } = loadGame('?map=CeruleanCity&x=18&y=20');
  const R = G.regionMap, pl = R.places(), mk = R.markers();
  const towns = ['PALLET TOWN', 'VIRIDIAN CITY', 'PEWTER CITY', 'CERULEAN CITY', 'VERMILION CITY', 'LAVENDER TOWN', 'CELADON CITY', 'FUCHSIA CITY', 'SAFFRON CITY', 'CINNABAR ISLAND', 'INDIGO PLATEAU'];
  check(towns.every(t => pl.some(p => p.name === t && p.kind === 'town')), 'every town and city is labelled');
  check(mk.filter(m => m.kind === 'gym').length === 8, 'all 8 gyms are marked');
  check(['ZAPDOS', 'MEWTWO', 'LUGIA', 'KYOGRE', 'RAYQUAZA', 'DEOXYS'].every(n => mk.some(m => m.kind === 'legend' && m.label.startsWith(G.speciesName(n)))), 'legendaries are marked, Gen 1 to 3');
  const doors = R.entrances(), deep = R.worldPos('MtMoonB2F', 5, 5);
  check(deep && ['MtMoon1F', 'MtMoonB1F'].some(n => doors[n] && doors[n][0] === deep[0] && doors[n][1] === deep[1]), 'a place deep in Mt. Moon sits at a Mt. Moon door');
  check(existsSync(new URL('../public/kanto-map.png', import.meta.url)), 'the rendered map image is in public/ (pnpm map)');

  const ext = R.extents(); G.regionMapImage = new G.gfx.Surface(ext.w * 4, ext.h * 4);
  G.state.party = [new G.Mon('PIKACHU', 5)];
  const I = G.input.injected, step = n => { for (let i = 0; i < n; i++) G.engine.step(); };
  const tap = k => { I[k] = true; step(1); I[k] = false; step(4); };
  G.openStartMenu(); step(10);
  const menu = () => G.engine.scenes[G.engine.scenes.length - 1];
  check(menu().items && menu().items.includes('MAP'), 'START has a MAP entry');
  menu().sel = menu().items.indexOf('MAP'); tap('a'); step(3);
  const viewer = menu();
  check(viewer && viewer.opaque && !viewer.done, 'MAP opens the map viewer');
  tap('a'); tap('b'); tap('b'); tap('b'); tap('b');
  check(viewer.done, 'zooming out past the whole-region view closes it');
});
