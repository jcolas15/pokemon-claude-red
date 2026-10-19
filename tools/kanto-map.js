// Renders the detailed Kanto map (src/engine/game/regionmap.ts) to public/kanto-map.png. It takes about half a minute,
// so it isn't part of every build: run `pnpm map` after changing outdoor maps or terrain art, and commit the image.
'use strict';
const path = require('path');
const H = require('./headless.js');
const { G } = H.loadGame({ search: '?map=PalletTown&x=5&y=6' }); G.boot();
const t0 = Date.now(), img = G.regionMap.render(4), file = path.join(H.ROOT, 'public', 'kanto-map.png');
H.savePNG(img, file, 1);
console.log('kanto map:', path.relative(process.cwd(), file), img.w + 'x' + img.h, ((Date.now() - t0) / 1000).toFixed(0) + 's');
