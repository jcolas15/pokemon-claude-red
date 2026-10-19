// Gen 3 in Kanto (docs/gen3-integration-plan.md, Phase 4; src/engine/data/gen3_world.ts, src/engine/scripts/gen3.ts):
// every species obtainable, a third of the wild each, trainer teams, gifts, fossils and hidden items.
import { describe, it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

describe('Gen 3 world', () => {
  const { G, D } = loadGame();
  const gen = sp => (D.species[sp].dex <= 151 ? 1 : D.species[sp].dex <= 251 ? 2 : 3);

  it('every Gen 3 species can be had', () => {
    const from = {}; const add = (sp, how) => (from[sp] = from[sp] || new Set()).add(how);
    for (const w of Object.values(D.wild)) for (const k of ['grass', 'water']) if (w[k].rate) for (const [, sp] of w[k].mons) add(sp, 'wild');
    for (const l of Object.values(D.superRod)) for (const [, sp] of l) add(sp, 'rod');
    for (const g of G.GEN3_GUIDE.gifts) for (const sp of g.species) add(sp, 'gift');
    for (const [, sp] of G.FOSSILS) add(sp, 'fossil');
    for (const l of G.GEN3_GUIDE.legends) add(l.species, 'legendary');
    for (let changed = true; changed;) {
      changed = false;
      for (const [sp, d] of Object.entries(D.species)) if (from[sp]) for (const e of d.evos || []) {
        for (const to of [e.to, e.extra].filter(Boolean)) if (!from[to]) { changed = true; add(to, 'evolution'); }
      }
    }
    const missing = D.dexOrder.slice(252).filter(sp => !from[sp]);
    check(!missing.length, 'all 135 Gen 3 species obtainable; missing: ' + missing.join(', '));
  });

  it('about a third of the wild is each generation', () => {
    const pct = D.slotChances.map(c => (c / 256) * 100), tot = [0, 0, 0, 0]; let n = 0;
    for (const w of Object.values(D.wild)) for (const k of ['grass', 'water']) if (w[k].rate) { n++; w[k].mons.forEach(([, sp], i) => { tot[gen(sp)] += pct[i]; }); }
    const [, g1, g2, g3] = tot.map(x => x / n);
    check(g2 > 25 && g2 < 40 && g3 > 25 && g3 < 40 && g1 > 28, `Gen 1/2/3 share ${g1.toFixed(0)}/${g2.toFixed(0)}/${g3.toFixed(0)}%`);
  });

  it('trainers carry Gen 3 POKéMON without losing aces or Gen 2 additions', () => {
    const big = []; for (const [cls, teams] of Object.entries(D.parties)) teams.forEach((t, k) => { if (t.length > 6) big.push(cls + '#' + (k + 1)); });
    check(!big.length, 'every team has at most 6 POKéMON: ' + big.join(', '));
    const TYPE = { BROCK: 'ROCK', MISTY: 'WATER', LT_SURGE: 'ELECTRIC', ERIKA: 'GRASS', KOGA: 'POISON', SABRINA: 'PSYCHIC_TYPE', BLAINE: 'FIRE', GIOVANNI: 'GROUND' };
    const leaderTeam = c => D.parties[c][c === 'GIOVANNI' ? 2 : 0];
    check(Object.entries(TYPE).every(([c, t]) => leaderTeam(c).some(([, sp]) => gen(sp) === 3 && D.species[sp].types.includes(t))), 'all 8 gym leaders field a Gen 3 POKéMON of their type');
    check(Object.keys(TYPE).every(c => leaderTeam(c).some(([, sp]) => gen(sp) === 2)), 'gym leaders keep their Gen 2 POKéMON');
    check(['ONIX', 'STARMIE', 'RAICHU', 'VILEPLUME', 'WEEZING', 'ALAKAZAM', 'ARCANINE', 'RHYDON'].every((ace, i) => leaderTeam(Object.keys(TYPE)[i]).slice(-1)[0][1] === ace), 'leader aces unchanged');
    const GYMTYPE = { PewterGym: 'ROCK', CeruleanGym: 'WATER', VermilionGym: 'ELECTRIC', CeladonGym: 'GRASS', FuchsiaGym: 'POISON', SaffronGym: 'PSYCHIC_TYPE', CinnabarGym: 'FIRE', ViridianGym: 'GROUND' };
    const missing = [];
    for (const [map, type] of Object.entries(GYMTYPE)) for (const o of G.MAPDATA.maps[map].objs.filter(o => o.trainer && !(o.trainer.cls in TYPE))) {
      const t = D.parties[o.trainer.cls][o.trainer.n - 1];
      if (!t.some(([, sp]) => gen(sp) === 3 && D.species[sp].types.includes(type))) missing.push(map + ' ' + o.trainer.cls + '#' + o.trainer.n);
    }
    check(!missing.length, 'every gym trainer has a Gen 3 POKéMON of the gym type: ' + missing.join(', '));
    const rival = [['RIVAL1', 3, 9], ['RIVAL2', 0, 12], ['RIVAL3', 0, 3]].flatMap(([c, a, b]) => D.parties[c].slice(a, b));
    check(rival.every(t => t.some(([, sp]) => /TREECKO|GROVYLE|SCEPTILE|TORCHIC|COMBUSKEN|BLAZIKEN|MUDKIP|MARSHTOMP|SWAMPERT/.test(sp))), 'the rival has a Hoenn starter in every fight from Route 22 on');
    check(D.parties.RIVAL3.every(t => t.some(([, sp]) => sp === 'ALAKAZAM')), "the rival's Champion teams keep Alakazam");
  });

  function talk(map, id) {
    G.ow.load(map, 1, 1, 'down');
    const a = G.ow.actors.find(x => x.obj && x.obj.id === id) || { obj: G.maps.getMap(map).objs.find(o => o.id === id) };
    return drive(G, G.spawnScript(G.talkTo(a)));
  }
  const has = sp => G.state.party.concat(G.state.boxes.flat()).some(m => m.species === sp);
  const reset = () => { G.state.party = [new G.Mon('PIDGEY', 20)]; };

  it('gifts, fossils and hidden items', () => {
    reset(); talk('Route11Gate2F', 'ROUTE11GATE2F_OAKS_AIDE');
    check(!has('TREECKO'), 'no Hoenn starter before the Thunder Badge');
    G.state.badges.push('THUNDERBADGE'); reset(); talk('Route11Gate2F', 'ROUTE11GATE2F_OAKS_AIDE');
    check(has('TREECKO') && G.flag('GEN3_GOT_HOENN_STARTER'), "Oak's aide gives a Hoenn starter after the Thunder Badge");
    reset(); talk('Route11Gate2F', 'ROUTE11GATE2F_OAKS_AIDE'); check(!has('TREECKO'), 'only one');
    for (const [map, id, sp] of [['CeruleanPokecenter', 'CERULEANPOKECENTER_GENTLEMAN', 'AZURILL'], ['LavenderPokecenter', 'LAVENDERPOKECENTER_LITTLE_GIRL', 'WYNAUT']]) {
      reset(); talk(map, id); const got = has(sp); reset(); talk(map, id);
      check(got && !has(sp), sp + ' gift works once');
    }
    for (const [map, item] of [['MtMoonB2F', 'ROOT_FOSSIL'], ['MtMoonB2F', 'CLAW_FOSSIL'], ['SeafoamIslandsB1F', 'DEEP_SEA_TOOTH'], ['SeafoamIslandsB2F', 'DEEP_SEA_SCALE'], ['Route12SuperRodHouse', 'BEAUTY_SCALE']]) {
      G.ow.load(map, 1, 1, 'down'); const before = G.bag.count(item);
      const h = G.ow.map.hidden.find(x => x.arg === item); drive(G, G.spawnScript(G.hiddenEvent(h, 'up')));
      check(G.bag.count(item) === before + 1, item + ' hidden in ' + map);
    }
    check(G.FOSSILS.some(([it, sp]) => it === 'ROOT_FOSSIL' && sp === 'LILEEP') && G.FOSSILS.some(([it, sp]) => it === 'CLAW_FOSSIL' && sp === 'ANORITH'), 'the Cinnabar Lab revives the Root and Claw Fossils');
  });
});
