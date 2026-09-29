// Trigger every map step/enter script on every walkable cell under random story-flag profiles.
// usage: node -r ./tools/pathaudit.js tools/stepfuzz.js [mapRegex] [profiles=6] [runsPerMap=4]
const H = require('./headless.js');
const G = H.loadGame({ search: '?map=PalletTown&x=5&y=8' }).G; G.boot();
G.noEncounters = true; G.autoBattleText = true; G.state.options.battleAnim = false;
const errs = []; console.error = (...a) => errs.push(a.map(x => (x && x.stack) ? x.stack.split('\n').slice(0, 2).join(' | ') : String(x)).join(' ').slice(0, 300));
const filter = new RegExp(process.argv[2] || '.');
const PROFILES = +(process.argv[3] || 6), PER = +(process.argv[4] || 4);
let seed = 12345; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
function party() { const m = new G.Mon('MEWTWO', 100); m.moves = []; ['SURF', 'PSYCHIC_M', 'THUNDERBOLT', 'ICE_BEAM'].forEach(x => m.addMove(x)); G.state.party = [m, new G.Mon('DRAGONITE', 100)]; }
const ITEMS = ['POKE_BALL', 'POTION', 'FRESH_WATER', 'SODA_POP', 'LEMONADE', 'POKE_DOLL', 'S_S_TICKET', 'SILPH_SCOPE', 'POKE_FLUTE', 'CARD_KEY', 'LIFT_KEY', 'SECRET_KEY', 'COIN_CASE', 'GOLD_TEETH', 'BICYCLE', 'OAKS_PARCEL', 'POKEDEX'];
const BADGES = ['BOULDERBADGE', 'CASCADEBADGE', 'THUNDERBADGE', 'RAINBOWBADGE', 'SOULBADGE', 'MARSHBADGE', 'VOLCANOBADGE', 'EARTHBADGE'];
function applyProfile(flags, p) {
  G.state.flags = {}; G.state.toggles = {}; G.state.money = 99999; G.state.bag = []; G.state.starter = 'CHARMANDER'; G.state.rival = 'BLUE';
  for (const f of flags) if (p.all || (p.none ? false : rnd() < 0.5)) G.setFlag(f);
  G.state.badges = p.all ? BADGES.slice() : p.none ? [] : BADGES.filter(() => rnd() < 0.5);
  for (const i of ITEMS) if (p.all || (!p.none && rnd() < 0.5)) G.bag.add(i, 1);
  party();
}
function runTask(task, max) {
  for (let f = 0; f < max && !task.done; f++) {
    const sc = G.engine.scenes, top = sc[sc.length - 1], nm = top && top.constructor.name, inj = G.input.injected;
    inj.a = inj.b = false;
    if (nm === 'Menu') { if (String(top.items[0]) === 'YES' && rnd() < 0.5) top.sel = 1; inj.a = f % 4 === 0; }
    else if (nm === 'PartyScreen') { inj.a = f % 6 === 0; if (f % 60 === 30) inj.b = true; }
    else if (nm === 'BagScreen' || nm === 'Summary') inj.b = f % 5 === 0;
    else if (top && top.menu && top.menu.kind === 'moves') { top.menu.sel = 0; inj.a = f % 3 === 0; }
    else inj.a = f % 3 === 0;
    G.engine.step();
  }
  return task.done;
}
function reset() { G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0; G.ow.surfing = false; G.ow.biking = false; }
const MS = G.MAPSCRIPTS; let runs = 0; const hangs = [];
for (const name of Object.keys(MS).filter(n => filter.test(n) && G.MAPDATA.maps[n]).sort()) {
  const ms = MS[name]; if (!ms.step && !ms.enter) continue;
  const src = String(ms.step || '') + String(ms.enter || '');
  const flags = [...new Set(src.match(/EVENT_\w+/g) || [])];
  for (let pi = 0; pi < PROFILES; pi++) {
    const prof = pi === 0 ? { none: true } : pi === 1 ? { all: true } : {};
    applyProfile(flags, prof); const snap = JSON.stringify({ f: G.state.flags, b: G.state.badges, bag: G.state.bag });
    const restore = () => { const s = JSON.parse(snap); G.state.flags = s.f; G.state.badges = s.b; G.state.bag = s.bag; G.state.toggles = {}; party(); };
    reset();
    try { G.ow.load(name, 0, 0, 'down'); } catch (e) { errs.push('load ' + name + ' ' + e.message); continue; }
    runTask({ done: false }, 1); for (let i = 0; i < 4000 && G.scriptRunning > 0; i++) { G.input.injected.a = i % 3 === 0; G.engine.step(); }
    if (!ms.step) continue;
    let fired = 0;
    const m = G.MAPDATA.maps[name];
    for (let y = 0; y < G.ow.map.h && fired < PER; y++) for (let x = 0; x < G.ow.map.w && fired < PER; x++) {
      if (G.ow.map.name !== name) { restore(); reset(); G.ow.load(name, 0, 0, 'down'); }
      if (!G.ow.map.passable(x, y) || G.ow.actorAt(x, y)) continue;
      Object.assign(G.ow.player, { x, y, dir: ['up', 'down', 'left', 'right'][(x + y) % 4], moving: false });
      let gen; try { gen = ms.step.call(ms, x, y); } catch (e) { errs.push(name + ' step ' + e.message); continue; }
      if (!gen) continue;
      fired++; runs++;
      const task = G.spawnScript(gen, 'step:' + name);
      if (!runTask(task, 20000)) { hangs.push(name + ' @' + x + ',' + y + ' top=' + G.engine.scenes[G.engine.scenes.length - 1].constructor.name); }
      restore(); reset(); G.ow.load(name, 0, 0, 'down');
    }
  }
}
console.log('runs', runs, 'hangs', hangs.length); hangs.slice(0, 20).forEach(h => console.log('  ' + h));
const u = [...new Set(errs)]; console.log('errors', u.length); u.slice(0, 20).forEach(e => console.log('  ' + e));
