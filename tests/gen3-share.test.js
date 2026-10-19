// Gen 3 POKéMON in everything that leaves the device (docs/gen3-integration-plan.md, Phase 6): a full save fits the cloud
// row and passes import validation, team and trade links carry them intact (Shedinja keeps its 1 HP), and the Battle
// Tower draws Gen 3 opponents but never the Hoenn legendaries.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('Gen 3 POKéMON survive the cloud, links and the Battle Tower', () => {
  const { ctx, G, D } = loadGame();
  const g3 = D.dexOrder.slice(252);
  G.state.party = ['SHEDINJA', 'SLAKING', 'DEOXYS', 'METAGROSS', 'MILOTIC', 'RAYQUAZA'].map(sp => new G.Mon(sp, 70));
  G.state.boxes = Array.from({ length: 12 }, (_, i) => Array.from({ length: 20 }, (_, k) => new G.Mon(g3[(i * 20 + k) % g3.length], 100)));
  for (const sp of g3) { G.state.dex.seen[sp] = true; G.state.dex.caught[sp] = true; }
  check(G.saveGame(), 'a save with all 12 boxes full of Gen 3 POKéMON writes');
  const raw = ctx.localStorage.getItem('pkmn_pixel_red_save');
  check(Buffer.byteLength(raw) <= 524288, `it fits the cloud save row's 512 KB limit (${(Buffer.byteLength(raw) / 1024).toFixed(0)} KB)`);
  check(G.saveTransfer.validSave(JSON.parse(raw)), 'it passes the cloud and backup import validation');

  const friend = G.socialParse(G.teamLink(G.state.party));
  check(friend && friend.type === 'team' && friend.friend.team.map(m => m.species).join() === 'SHEDINJA,SLAKING,DEOXYS,METAGROSS,MILOTIC,RAYQUAZA', 'a team link carries six Gen 3 POKéMON');
  check(G.Mon.from(friend.friend.team[0]).maxhp === 1, 'Shedinja arrives with 1 HP');

  const shed = G.state.party[0]; shed.nick = 'HUSK';
  const offer = G.socialParse(G.socialTradeLink('trade', 'abc123', shed));
  const got = offer && G.Mon.from(offer.offer.mon);
  check(got && got.species === 'SHEDINJA' && got.level === 70 && got.maxhp === 1 && got.nick === 'HUSK', 'a trade offer keeps species, level, nickname and the 1 HP');
  const back = G.socialParse(G.socialTradeLink('tradeback', 'abc123', G.state.party[1]));
  check(back && back.type === 'reply' && G.Mon.from(back.reply.mon).species === 'SLAKING', 'a trade reply carries a Gen 3 POKéMON back');

  const LEGENDS = new Set(['REGIROCK', 'REGICE', 'REGISTEEL', 'LATIAS', 'LATIOS', 'KYOGRE', 'GROUDON', 'RAYQUAZA', 'JIRACHI', 'DEOXYS']);
  const met = new Set();
  for (let i = 0; i < 300; i++) for (const m of G.towerTrainer(i % 30).party) met.add(m.species);
  const gen3 = [...met].filter(sp => D.species[sp].dex > 251);
  check(gen3.length > 10, `Battle Tower trainers use Gen 3 POKéMON (${gen3.length} met)`);
  check(!gen3.some(sp => LEGENDS.has(sp)), 'but never the Hoenn legendaries');
});
