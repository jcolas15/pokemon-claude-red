// node tools/rendermap.js MapName [out.png] [scale]
const H = require('./headless.js');
const ctx = H.loadGame(); const G = ctx.G; G.boot();
const name = process.argv[2] || 'PalletTown';
const out = process.argv[3] || '/tmp/map.png';
const t0 = Date.now();
const m = G.maps.getMap(name);
const R = G.mapRender.build(m);
const comp = R.s.clone(); comp.blit(R.up, 0, 0);
H.savePNG(comp, out, +(process.argv[4] || 2));
console.log('built', name, R.W, R.H, (Date.now() - t0) + 'ms');
