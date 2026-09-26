// Walk the warp graph tracking the last outdoor map; flags LAST_MAP exits that don't lead back where they came from.
// usage: node tools/warpcheck.js
// that land on a warp which doesn't lead back into the map being exited.
const H = require('./headless.js');
const G = H.loadGame({ search: '?map=PalletTown&x=5&y=8' }).G; G.boot();
G.noEncounters = true;
const seen = new Set(), queue = [['PalletTown', 'PalletTown', 'start']], bad = [];
function enter(name, last) {
  G.state.lastOutdoor = last;
  G.engine.tasks.length = 0; G.scriptRunning = 0;
  try { G.ow.load(name, 0, 0, 'down'); } catch (e) { return null; }
  G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0;
  return G.state.lastOutdoor;
}
let n = 0;
while (queue.length) {
  const [name, last, via] = queue.shift();
  const key = name + '|' + last; if (seen.has(key)) continue; seen.add(key);
  const lo = enter(name, last); if (lo == null) continue;
  const m = G.ow.map; n++;
  m.warps.forEach((w, i) => {
    if (w.to === 'SOCIAL_RETURN') return; // SOCIAL ZONE exit returns to the POKéMON CENTER you came from
    let to = w.to; const isLast = to === 'LAST_MAP'; if (isLast) to = lo;
    const dm = G.MAPDATA.maps[to]; if (!dm) { bad.push(`${name}#${i} → missing ${to} (via ${via})`); return; }
    const dw = dm.warps[w.warp];
    if (!dw) bad.push(`${name}#${i} → ${to} has no warp ${w.warp} (via ${via})`);
    else if (isLast && dw.to !== name && dw.to !== 'LAST_MAP') bad.push(`${name}#${i} LAST_MAP=${to}: lands on ${to}.warp${w.warp} which leads to ${dw.to} (via ${via})`);
    queue.push([to, lo, via + ' > ' + name]);
  });
  if (m.outdoor) for (const d in m.conns) queue.push([m.conns[d].map, lo, via + ' > ' + name]);
}
console.log('states', n, 'issues', bad.length);
const uniq = [...new Set(bad.map(b => b.replace(/ \(via.*/, '')))];
uniq.slice(0, 40).forEach(u => { const full = bad.find(b => b.startsWith(u)); console.log(' ', full.length > 260 ? full.slice(0, 120) + ' ... ' + full.slice(-130) : full); });
