// Integration fuzz: visit every map, talk to every NPC / read every sign with auto-answered prompts,
// play out any resulting battles, and report script errors or hangs.
// usage: node tools/talkfuzz.js [mapFilterRegex] [--flags=all|none]
'use strict';
const H = require('./headless.js');
const filter = new RegExp(process.argv[2] || '.');
const allFlags = process.argv.includes('--flags=all');
const ctx = H.loadGame({ search: '?map=PalletTown&x=5&y=8' });
const G = ctx.G; G.boot();
G.noEncounters = true; G.autoBattleText = true; G.state.options.battleAnim = false;
const errs = []; const origErr = console.error;
console.error = (...a) => errs.push(a.map(x => (x && x.stack) ? x.stack.split('\n').slice(0, 3).join(' | ') : String(x)).join(' ').slice(0, 400));
function strongParty() {
  const m = new G.Mon('MEWTWO', 100); m.moves = []; ['SURF', 'PSYCHIC_M', 'RECOVER', 'ICE_BEAM'].forEach(x => m.addMove(x));
  G.state.party = [m, new G.Mon('DRAGONITE', 100)];
}
function resetState() {
  G.state.flags = {}; G.state.toggles = {}; G.state.money = 999999; G.state.bag = [];
  ['POKE_BALL', 'POTION', 'FRESH_WATER', 'SODA_POP', 'LEMONADE', 'POKE_DOLL', 'NUGGET'].forEach(i => G.bag.add(i, 10));
  if (allFlags) {
    for (const k of ['EVENT_GOT_POKEDEX', 'EVENT_OAK_GOT_PARCEL', 'EVENT_BEAT_BROCK', 'EVENT_BEAT_MISTY', 'EVENT_BEAT_LT_SURGE', 'EVENT_BEAT_ERIKA']) G.setFlag(k);
    G.state.badges = ['BOULDERBADGE', 'CASCADEBADGE', 'THUNDERBADGE', 'RAINBOWBADGE', 'SOULBADGE', 'MARSHBADGE', 'VOLCANOBADGE', 'EARTHBADGE'];
    ['S_S_TICKET', 'SILPH_SCOPE', 'POKE_FLUTE', 'CARD_KEY', 'LIFT_KEY', 'SECRET_KEY', 'COIN_CASE', 'GOLD_TEETH', 'BICYCLE'].forEach(i => G.bag.add(i, 1));
  } else G.state.badges = [];
  strongParty();
}
function runTask(task, maxFrames) {
  let f = 0;
  const answers = [true, false];
  for (; f < maxFrames && !task.done; f++) {
    const sc = G.engine.scenes, top = sc[sc.length - 1], nm = top && top.constructor.name;
    const inj = G.input.injected; inj.a = inj.b = inj.down = inj.up = false;
    if (nm === 'Menu') { if (String(top.items[0]) === 'YES' && f % 40 < 20) { if (!answers[f % 2]) top.sel = 1; } inj.a = f % 4 === 0; }
    else if (nm === 'PartyScreen') { inj.a = f % 6 === 0; if (f % 60 === 30) inj.b = true; }
    else if (nm === 'BagScreen' || nm === 'Summary' || nm === 'ShareScene' || nm === 'Quiz') inj.b = f % 5 === 0;
    else if (top && top.menu && top.menu.kind === 'moves') { top.menu.sel = 0; inj.a = f % 3 === 0; }
    else if (top && /Title|Object|OakIntro/.test(nm) && f % 30 === 0) { inj.b = true; inj.a = true; }
    else inj.a = f % 3 === 0;
    G.engine.step();
  }
  return task.done;
}
const maps = Object.keys(G.MAPDATA.maps).filter(n => filter.test(n)).sort();
let talks = 0, hangs = [], scriptedMaps = 0;
for (const name of maps) {
  resetState();
  try {
    G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0;
    G.ow.locks = 0; G.ow.surfing = false; G.ow.biking = false;
    G.ow.load(name, 0, 0, 'down');
    runTask({ done: false, get done_() { return false; } }, 1); // let enter() scripts start
    // run any enter scripts to completion
    for (let i = 0; i < 3000 && (G.scriptRunning > 0); i++) { G.input.injected.a = i % 3 === 0; G.engine.step(); }
  } catch (e) { errs.push('load ' + name + ': ' + e.message); continue; }
  if (G.MAPSCRIPTS[name]) scriptedMaps++;
  const m = G.ow.map;
  const targets = [];
  for (const a of G.ow.actors.slice()) targets.push({ kind: 'actor', a });
  for (const s of m.signs) targets.push({ kind: 'sign', s });
  for (const t of targets) {
    const tx = t.kind === 'actor' ? t.a.x : t.s.x, ty = t.kind === 'actor' ? t.a.y : t.s.y;
    // stand below (or beside) the target, facing it
    const spots = [[0, 1, 'up'], [0, -1, 'down'], [-1, 0, 'right'], [1, 0, 'left']];
    let placed = false;
    for (const [dx, dy, dir] of spots) { const x = tx + dx, y = ty + dy; if (m.passable(x, y) && !G.ow.actorAt(x, y)) { Object.assign(G.ow.player, { x, y, dir, moving: false }); placed = true; break; } }
    if (!placed) continue;
    talks++;
    const gen = t.kind === 'actor' ? G.talkTo(t.a) : G.readSign(t.s);
    const task = G.spawnScript(gen, 'fuzz:' + name);
    const ok = runTask(task, 25000);
    if (!ok) {
      const top = G.engine.scenes[G.engine.scenes.length - 1];
      hangs.push(name + ':' + (t.kind === 'actor' ? t.a.obj.id : t.s.text) + ' top=' + (top && top.constructor.name));
      G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0;
    }
    if (G.ow.map.name !== name) { try { G.ow.load(name, 0, 0, 'down'); } catch (e) {} }
    strongParty();
  }
}
console.error = origErr;
console.log('maps', maps.length, 'scripted', scriptedMaps, 'interactions', talks);
console.log('hangs', hangs.length); hangs.slice(0, 30).forEach(h => console.log('  ' + h));
const uniq = [...new Set(errs)];
console.log('errors', uniq.length); uniq.slice(0, 40).forEach(e => console.log('  ' + e));
