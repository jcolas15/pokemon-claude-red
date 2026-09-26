// node tools/monsheet.js out.png [SPECIES ...]  -> front/back/icon sheet
const H = require('./headless.js');
const G = H.loadGame().G;
const out = process.argv[2];
let names = process.argv.slice(3); if (!names.length) names = Object.keys(G.MONDEFS);
const cols = Math.min(names.length, 4), rows = Math.ceil(names.length / cols);
const S = new G.gfx.Surface(cols * 172, rows * 72);
S.clear(G.gfx.hex('#dfe8d8'));
names.forEach((n, i) => {
  const x = (i % cols) * 172, y = Math.floor(i / cols) * 72;
  S.rect(x + 2, y + 2, 66, 66, G.gfx.hex('#f4f8f0'));
  S.blit(G.pokeSprite(n, 'front'), x + 3, y + 3);
  S.blit(G.pokeSprite(n, 'back'), x + 70, y + 3);
  S.blit(G.pokeSprite(n, 'front', 32), x + 136, y + 3);
});
H.savePNG(S, out, +(process.argv.includes('--x2') ? 2 : 3));
