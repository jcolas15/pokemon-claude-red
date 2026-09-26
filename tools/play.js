// Scripted headless playthrough: node tools/play.js "map=PalletTown&x=5&y=8" outprefix "R8 U4 A shot ..."
const H = require('./headless.js');
const ctx = H.loadGame({ search: '?' + (process.argv[2] || '') });
const G = ctx.G; G.boot();
const pre = process.argv[3] || '/tmp/shot';
const cmds = (process.argv[4] || 'shot').split(/\s+/);
let n = 0;
const map = { U: 'up', D: 'down', L: 'left', R: 'right' };
for (const c of cmds) {
  if (!c) continue;
  if (c === 'shot') { H.shot(G, pre + '_' + (n++) + '.png', 2); continue; }
  if (c.startsWith('w')) { H.runFrames(G, +c.slice(1)); continue; }
  if (c === 'A' || c === 'B' || c === 'S') { H.tap(G, c === 'A' ? 'a' : c === 'B' ? 'b' : 'start', 20); continue; }
  const m = c.match(/^([UDLR])(\d+)(r?)$/);
  if (m) { const btns = [map[m[1]]]; if (m[3]) btns.push('b'); H.hold(G, btns, (m[3] ? 8 : 16) * +m[2] + 1); H.runFrames(G, 20); continue; }
  if (c.startsWith('eval:')) { console.log(eval(c.slice(5))); continue; }
}
console.log('player', G.ow.map.name, G.ow.player.x, G.ow.player.y);
