// Draws the home-screen / browser icons from the game's own sprite: src/app/apple-icon.png (180x180, iOS home screen)
// and src/app/icon.png (192x192). Next.js links both automatically. Usage: node tools/app-icon.js [SPECIES]
'use strict';
const path = require('path');
const H = require('./headless.js');
const G = H.loadGame().G;
G.boot();
const species = (process.argv[2] || 'SQUIRTLE').toUpperCase();
const { Surface, hex } = G.gfx;

function icon(size) {
  const s = new Surface(size, size);
  s.clear(hex('#1c2b4a'));
  const c = size / 2;
  s.ellipseBlend(c, c + 2, size * 0.46, size * 0.46, hex('#3a5f9a'), 0.55);
  s.ellipseBlend(c, c + 2, size * 0.34, size * 0.34, hex('#7fb3e8'), 0.35);
  const spr = G.pokeSprite(species, 'front');
  s.ellipseBlend(c, c + 27, 20, 5, hex('#0e1628'), 0.45);
  s.blit(spr, Math.round(c - spr.w / 2), Math.round(c - spr.h / 2) - 2);
  return s;
}
const out = path.join(__dirname, '..', 'src', 'app');
H.savePNG(icon(90), path.join(out, 'apple-icon.png'), 2);
H.savePNG(icon(96), path.join(out, 'icon.png'), 2);
console.log('icons:', species, '-> src/app/apple-icon.png (180x180), src/app/icon.png (192x192)');
