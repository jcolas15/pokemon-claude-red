// node tools/charsheet.js out.png name1 name2 ...
const H = require('./headless.js');
const G = H.loadGame().G;
const out = process.argv[2];
let names = process.argv.slice(3); if (!names.length) names = Object.keys(G.CAST).filter(n => !G.CAST[n].creature && !G.CAST[n].object);
const cols = 12, S = new G.gfx.Surface(cols * 18 + 4, names.length * 26 + 4);
S.clear(G.PAL.grass[4]);
names.forEach((n, i) => {
  const fr = G.chars.makeCharacter(G.CAST[n]);
  let k = 0;
  for (const d of ['down', 'up', 'left', 'right']) for (let f = 0; f < 3; f++) { S.blit(fr[d][f], 2 + k * 18, 2 + i * 26); k++; }
});
H.savePNG(S, out, 4);
