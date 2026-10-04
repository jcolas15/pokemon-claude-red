// Grass encounters go through the glitch module's copy of Red's wild-data RAM (src/engine/game/glitches.ts). Gen 2
// species have no Gen 1 index and once read back as 'M; they must come out as themselves, and about half the wild
// should be Gen 2 (src/engine/data/gen2_world.ts).
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('grass encounters give real Gen 2 POKéMON, never glitches', () => {
  const { G, D } = loadGame();
  let got = null;
  G.startWildBattle = (sp, lv) => { got = [sp, lv]; return (function* () {})(); };
  const rollOn = (mapName, n) => {
    const map = G.maps.getMap(mapName); G.glitch.onMapLoad(map);
    let spot = null;
    for (let y = 0; y < map.h && !spot; y++) for (let x = 0; x < map.w && !spot; x++) {
      const q = map.quad(x, y) || [];
      if (map.ts.grass >= 0 && q[3] === map.ts.grass && q[2] === map.ts.grass) spot = [x, y];
    }
    if (!spot) spot = [map.w - 1, map.h - 1]; // caves and buildings have no grass tiles: encounters happen anywhere
    const seen = {};
    for (let i = 0; i < n; i++) { got = null; G.state.repel = 0; G.noEncounters = false; if (G.encounters.check(map, spot[0], spot[1]) && got) seen[got[0]] = (seen[got[0]] || 0) + 1; }
    return seen;
  };
  const glitches = [], gen2 = new Set(); let maps = 0;
  for (const [name, m] of Object.entries(G.MAPDATA.maps)) {
    const w = m.cnst && D.wild[m.cnst];
    if (!w || !w.grass || !w.grass.rate || !w.grass.mons.some(([, sp]) => D.species[sp].dex > 151)) continue;
    maps++;
    for (const sp of Object.keys(rollOn(name, 3000))) {
      if (!D.species[sp] || D.species[sp].glitch) glitches.push(name + ':' + sp);
      else if (D.species[sp].dex > 151) gen2.add(sp);
    }
  }
  check(maps > 40, `grass maps with Gen 2 slots exercised: ${maps}`);
  check(!glitches.length, 'no glitch POKéMON from ordinary grass: ' + glitches.slice(0, 6).join(', '));
  check(gen2.has('SENTRET') && gen2.has('HOOTHOOT') && gen2.size > 40, `Gen 2 species appear as themselves (${gen2.size} met)`);
  check(G.glitch.speciesFor(0) === 'GLITCH_00', "byte $00 is still 'M for the old man glitch");

  const pct = D.slotChances.map(c => (c / 256) * 100);
  const shares = [];
  for (const w of Object.values(D.wild)) for (const k of ['grass', 'water']) {
    if (w[k] && w[k].rate) shares.push(w[k].mons.reduce((a, [, sp], i) => a + (D.species[sp].dex > 151 ? pct[i] : 0), 0));
  }
  const avg = shares.reduce((a, b) => a + b, 0) / shares.length;
  check(avg > 45 && avg < 55, `about half of wild encounters are Gen 2 (${avg.toFixed(0)}%)`);
});
