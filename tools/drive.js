// Smart headless driver helpers
// Headless test driver for story scripts. Usage: const T = require('./tools/drive.js').make('?map=PewterCity&x=10&y=10');
//   T.walk('UULR'), T.press('a'), T.settle([true,false]) answers YES/NO prompts in order, T.shot('name') -> PNG in $SHOTS dir
const H = require('./headless.js');
const SP = (process.env.SHOTS || '/tmp') + '/';
function make(search) {
  const G = H.loadGame({ search }).G; G.boot();
  G.noEncounters = true;
  G.autoBattleText = true;
  const log = [];
  const origSay = G.say;
  G.say = function* (t, o) { log.push(G.fmt(String(G.TEXT[t] || t)).replace(/\f/g, ' / ').slice(0, 110)); yield* origSay(t, o); };
  const top = () => G.engine.scenes[G.engine.scenes.length - 1];
  const press = (b, f) => { G.input.injected[b] = true; H.runFrames(G, 2); G.input.injected[b] = false; H.runFrames(G, f || 4); };
  const hold = (b, f) => { G.input.injected[b] = true; H.runFrames(G, f); G.input.injected[b] = false; H.runFrames(G, 2); };
  // advance dialogue; answer YES/NO menus with `yes`; stop when no script/text is active
  function settle(yes, max) {
    for (let i = 0; i < (max || 2000); i++) {
      const t = top(), name = t && t.constructor.name;
      if (name === 'Menu') {
        const items = t.items.map(String);
        if (items[0] === 'YES') { const y = Array.isArray(yes) ? (yes.length ? yes.shift() : false) : yes; if (!y) press('down', 2); press('a', 4); continue; }
        press('a', 4); continue;
      }
      if (name === 'TextBox' || name === 'BattleScene' || name === 'EvoScene' || name === 'Summary') { press('a', 3); continue; }
      if (G.scriptRunning > 0 || G.ow.locks > 0 || G.ow.player.moving) { H.runFrames(G, 2); continue; }
      return i;
    }
    return -1;
  }
  const walk = (dirs) => { for (const c of dirs) { const d = { U: 'up', D: 'down', L: 'left', R: 'right' }[c]; const p = G.ow.player; if (p.dir !== d) { hold(d, 3); H.runFrames(G, 4); } hold(d, 15); H.runFrames(G, 3); settle(false, 600); } };
  const shot = name => H.shot(G, SP + name + '.png', 2);
  return { G, H, log, press, hold, settle, walk, shot, top };
}
module.exports = { make, SP };
