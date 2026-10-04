// The 251 Pokédex: list length, Oak's ratings, the diploma, milestone cards and the silhouette quiz pool.
import { it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

it('the Pokédex runs to 251', () => {
  const { G, D } = loadGame('?map=PalletTown&x=5&y=6');
  const said = []; const origSay = G.say; G.say = function* (t) { said.push(String(t)); yield* origSay.call(this, t); };
  const own = n => { G.state.dex.caught = {}; G.state.dex.seen = {}; D.dexOrder.slice(1, n + 1).forEach(sp => { G.state.dex.caught[sp] = 1; G.state.dex.seen[sp] = 1; }); };
  check(D.dexOrder.length - 1 === 251, 'Pokédex order has 251 entries (last: ' + D.dexOrder[251] + ')');
  for (const [n, want] of [[5, 'lots to do'], [145, 'authority'], [160, 'JOHTO'], [210, 'Over 200'], [250, 'handful'], [251, 'entirely complete']]) {
    own(n); said.length = 0; drive(G, G.spawnScript(G.oakRating(true)), 20000);
    check(said.some(s => s.includes(want)), `Oak's rating at ${n} owned: "${want}"`);
  }
  const designer = () => {
    said.length = 0; G.ow.load('CeladonMansion3F', 1, 1, 'down');
    const a = G.ow.actors.find(x => x.obj.id === 'CELADONMANSION3F_GAME_DESIGNER'); drive(G, G.spawnScript(G.talkTo(a)), 3000);
    return said.join(' | ');
  };
  own(251); delete G.state.dex.caught.MEW; delete G.state.dex.caught.CELEBI; delete G.state.dex.caught.LUGIA;
  const noDip = designer();
  own(251); delete G.state.dex.caught.MEW; delete G.state.dex.caught.CELEBI;
  check(noDip !== designer(), 'diploma needs all 249 (missing LUGIA: no diploma; missing only MEW and CELEBI: diploma)');
  G.state.achievements = []; own(174); G.dexCaught(D.dexOrder[175]);
  check((G.state.achievements || []).some(a => a.id === 'dex_175'), 'catching #175 earns a Pokédex milestone card');
  const withArt = Object.keys(D.species).filter(sp => D.species[sp].dex >= 1 && G.hasMonArt(sp));
  check(withArt.length === 251, 'quiz pool is all 251 POKéMON');
});
