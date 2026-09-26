// Fuzz the battle engine: random species/levels/movesets, auto-input, report exceptions and stuck battles.
const H = require('./headless.js');
const G = H.loadGame({ search: '?map=Route1&x=10&y=20' }).G; G.boot();
G.noEncounters = true; G.autoBattleText = true;
G.state.options.battleAnim = false;
const species = Object.keys(G.DATA.species), moves = G.DATA.moveList.filter(m => m !== 'STRUGGLE');
const pick = a => a[Math.floor(Math.random() * a.length)];
let errors = [], stuck = 0, results = {};
const origErr = console.error; const errs = []; console.error = (...a) => errs.push(a.join(' ').slice(0, 300));
const N = +(process.argv[2] || 60);
for (let n = 0; n < N; n++) {
  const mk = () => { const m = new G.Mon(pick(species), 5 + Math.floor(Math.random() * 60)); m.moves = []; while (m.moves.length < 4) m.addMove(pick(moves)); return m; };
  G.state.party = [mk(), mk(), mk()];
  G.state.bag = [{ id: 'POTION', n: 5 }, { id: 'POKE_BALL', n: 5 }];
  const wild = Math.random() < 0.5;
  const task = G.spawnScript(wild ? G.startWildBattle(pick(species), 5 + Math.floor(Math.random() * 60)) : G.startTrainerBattle(pick(Object.keys(G.DATA.parties).filter(k => G.DATA.parties[k].length)), 1));
  let f = 0;
  for (; f < 60000 && !task.done; f++) {
    const top = G.engine.scenes[G.engine.scenes.length - 1];
    G.input.injected.a = f % 3 === 0; G.input.injected.b = false;
    if (top && top.constructor.name === 'PartyScreen') { G.input.injected.down = f % 6 === 0; }
    else G.input.injected.down = false;
    if (top && top.menu && top.menu.kind === 'moves' && top.b) {
      const ml = top.b.moveList(top.b.p), v = top.b.p.v;
      const ok = ml.map((x, i) => i).filter(i => ml[i].pp > 0 && !(v.disabled && v.disabled.move === ml[i].id));
      if (ok.length) top.menu.sel = ok[Math.floor(Math.random() * ok.length)];
    }
    G.engine.step();
  }
  if (!task.done) { stuck++; const sc = G.engine.scenes.find(s => s.constructor.name === 'BattleScene'); const b = sc && sc.b;
    errors.push('stuck battle ' + n + ' top=' + G.engine.scenes[G.engine.scenes.length-1].constructor.name + ' menu=' + (sc && sc.menu ? sc.menu.kind : '-') + ' box=' + (sc && sc.box ? JSON.stringify(sc.box.lines) : '') + (b ? ' P=' + b.mon(b.p).species + ':' + b.mon(b.p).hp + ' ' + b.mon(b.p).moves.map(x => x.id + ':' + x.pp).join('|') + ' E=' + b.mon(b.e).species + ':' + b.mon(b.e).hp + ' ' + b.moveList(b.e).map(x => x.id + ':' + x.pp).join('|') + ' turn=' + b.turn : '')); G.engine.scenes.length = 1; G.engine.tasks.length = 0; G.scriptRunning = 0; G.ow.locks = 0; }
  results[task.value] = (results[task.value] || 0) + 1;
}
console.error = origErr;
console.log('battles', N, 'results', JSON.stringify(results), 'stuck', stuck);
console.log('errors:', [...new Set(errs)].slice(0, 20).join('\n'));
console.log(errors.slice(0, 10).join('\n'));
