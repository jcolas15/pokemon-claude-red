// Bundle the playable game into dist/ for static hosting (Cloudflare Pages, GitHub Pages, any web server):
// index.html + src/ only, plus preview.png (the title screen at 4x) for link previews on Reddit/Discord/etc.
// usage: node tools/build_dist.js [https://your.site/]   (the URL makes og:image absolute, which some scrapers need)
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./headless.js');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
const site = process.argv[2] ? process.argv[2].replace(/\/?$/, '/') : '';
fs.writeFileSync(path.join(OUT, 'index.html'), fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace('content="preview.png"', 'content="' + site + 'preview.png"'));
fs.cpSync(path.join(ROOT, 'src'), path.join(OUT, 'src'), { recursive: true });
// link preview: the title screen after its intro settles
const G = H.loadGame({ search: '' }).G; G.boot();
while (G.engine.scenes.length) G.engine.pop();
G.titleScreen(); H.runFrames(G, 45);
H.shot(G, path.join(OUT, 'preview.png'), 4);
let bytes = 0; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); const st = fs.statSync(p); if (st.isDirectory()) walk(p); else bytes += st.size; } })(OUT);
console.log('dist/ ready:', (bytes / 1048576).toFixed(2) + ' MB (index.html, src/, preview.png)');
