// Bundle the playable game into dist/ for static hosting (Cloudflare Pages, GitHub Pages, any web server):
// index.html + src/ only, plus preview.png (the title screen at 4x) for link previews on Reddit/Discord/etc.
// usage: [CF_BEACON_TOKEN=<token>] node tools/build_dist.js [https://your.site/]   (the URL makes og:image absolute, which some scrapers need)
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./headless.js');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
const site = process.argv[2] ? process.argv[2].replace(/\/?$/, '/') : '';
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace('content="preview.png"', 'content="' + site + 'preview.png"');
// Cloudflare Web Analytics (cookieless): CF_BEACON_TOKEN=<site token> adds the beacon script. Not needed when the
// site is proxied by Cloudflare with automatic Web Analytics switched on for the zone (the edge injects it then).
const beacon = process.env.CF_BEACON_TOKEN;
if (beacon) {
  if (!/^[0-9a-f]{32}$/i.test(beacon)) { console.error('CF_BEACON_TOKEN should be the 32-character site token'); process.exit(1); }
  html = html.replace('</head>', `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${beacon}"}'></script>\n</head>`);
}
// every script link carries a hash of its contents, so caches (Cloudflare keeps .js for hours) can never serve an
// old file after a deploy, while unchanged files stay cached
html = html.replace(/<script src="(src\/[^"?]+\.js)"><\/script>/g, (m, f) => {
  const h = require('crypto').createHash('sha1').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 10);
  return `<script src="${f}?v=${h}"></script>`;
});
fs.writeFileSync(path.join(OUT, 'index.html'), html);
fs.cpSync(path.join(ROOT, 'src'), path.join(OUT, 'src'), { recursive: true });
// link preview: the title screen after its intro settles
const G = H.loadGame({ search: '' }).G; G.boot();
while (G.engine.scenes.length) G.engine.pop();
G.titleScreen(); H.runFrames(G, 45);
H.shot(G, path.join(OUT, 'preview.png'), 4);
let bytes = 0; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); const st = fs.statSync(p); if (st.isDirectory()) walk(p); else bytes += st.size; } })(OUT);
console.log('dist/ ready:', (bytes / 1048576).toFixed(2) + ' MB (index.html, src/, preview.png)');
