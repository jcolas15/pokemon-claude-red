// Touch portrait shows a taller overworld (src/engine/core/gfx.ts view): the map and the player fill the whole
// frame, and every other scene (text boxes, menus, battles) draws in the 320x180 band at the bottom.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the overworld fills a taller frame and other scenes use the bottom band', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  const { Surface, view, setViewHeight } = G.gfx;
  const run = n => { for (let i = 0; i < n; i++) G.engine.step(); };
  run(30);
  try {
    setViewHeight(480);
    check(view.h === 480 && view.band === 300, 'a 480-row view puts the 180-row band at row 300');
    const frame = new Surface(320, view.h);
    const render = () => { G.engine.draw(frame); return frame.data.slice(); };
    const withPlayer = render();
    G.ow.player.hidden = true; const withoutPlayer = render(); G.ow.player.hidden = false;
    const [, cy] = G.ow.camera(), py = G.ow.player.py - cy;
    let changed = 0;
    for (let i = 0; i < withPlayer.length; i++) if (withPlayer[i] !== withoutPlayer[i]) changed++;
    check(py > 180 && changed > 50, `the player is drawn below the old 180-row limit (row ${py}, ${changed} pixels)`);

    // a text box row is nearly one fill colour; a row of map is not
    const uniform = (px, row) => { const n = {}; for (let x = 40; x < 280; x++) { const c = px[row * 320 + x]; n[c] = (n[c] || 0) + 1; } return Math.max(...Object.values(n)) / 240; };
    G.spawnScript(G.say('Hello there.')); run(40);
    const talk = render(), boxRow = view.band + 168;
    check(uniform(talk, boxRow) > 0.8 && uniform(talk, 168) < 0.8, `the text box draws in the bottom band (row ${boxRow}: ${uniform(talk, boxRow).toFixed(2)}, row 168: ${uniform(talk, 168).toFixed(2)})`);
  } finally {
    setViewHeight(180);
  }
});

it('screen-fixed overlays stay off the zoomed map layer', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  for (let i = 0; i < 30; i++) G.engine.step();
  const map = new G.gfx.Surface(320, 180), hud = new G.gfx.Surface(320, 180);
  let drawnOn = null;
  G.ow.fx.push({ hud: true, draw(s) { drawnOn = s; return true; } });
  G.ow.showBanner();
  G.ow.hudOnTop = true; G.ow.draw(map); G.ow.hudOnTop = false;
  check(drawnOn === null, 'a hud overlay (money window, Safari counter) is not drawn into the map layer');
  G.ow.drawHud(hud);
  check(drawnOn === hud && G.ow.banner, 'hud overlays and the map-name banner draw on the unzoomed layer');
});
