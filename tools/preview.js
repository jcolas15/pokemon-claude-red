// Renders public/preview.png, the title screen at 4x, used as the link-preview image (og:image) by src/app/layout.tsx.
// usage: pnpm preview:image
'use strict';
const path = require('path');
const H = require('./headless.js');
const G = H.loadGame({ search: '' }).G; G.boot();
while (G.engine.scenes.length) G.engine.pop();
G.titleScreen(); H.runFrames(G, 45);
const out = path.join(__dirname, '..', 'public', 'preview.png');
require('fs').mkdirSync(path.dirname(out), { recursive: true });
H.shot(G, out, 4);
console.log('wrote', path.relative(process.cwd(), out));
