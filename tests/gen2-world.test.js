// Gen 2 in Kanto (src/engine/data/gen2_world.ts, src/engine/scripts/gen2.ts): every species obtainable, sane levels,
// trainer teams, gifts, trades, hidden items and the post-game. The checks share one game and run in order.
import { describe, it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

describe('Gen 2 world', () => {
  const { G, D } = loadGame();
  const g2 = D.dexOrder.slice(152);
  const isG2 = sp => D.species[sp] && D.species[sp].dex > 151;

  it('every species is obtainable at a sane level', () => {
    const from = {}; const add = (sp, how) => (from[sp] = from[sp] || new Set()).add(how);
    for (const w of Object.values(D.wild)) for (const k of ['grass', 'water']) for (const [, sp] of w[k].mons) add(sp, 'wild');
    for (const l of Object.values(D.superRod)) for (const [, sp] of l) add(sp, 'rod');
    for (const sp of ['CHIKORITA', 'CYNDAQUIL', 'TOTODILE', 'TOGEPI', 'TYROGUE', 'PICHU', 'IGGLYBUFF', 'CLEFFA']) add(sp, 'gift');
    for (const t of D.trades) add(t.get, 'trade');
    for (const sp of D.dexOrder.slice(1, 152)) add(sp, 'gen1');
    for (const sp of ['LUGIA', 'HO_OH', 'CELEBI', 'RAIKOU', 'ENTEI', 'SUICUNE']) add(sp, 'legend');
    for (let changed = true; changed;) {
      changed = false;
      for (const [sp, d] of Object.entries(D.species)) if (from[sp]) for (const e of d.evos || []) if (!from[e.to]) { changed = true; add(e.to, 'evolution'); }
    }
    const missing = g2.filter(sp => !from[sp]);
    check(!missing.length, 'all 100 Gen 2 species obtainable; missing: ' + missing.join(', '));

    const minLv = {};
    for (const d of Object.values(D.species)) for (const e of d.evos || []) if (e.type === 'level') minLv[e.to] = Math.min(minLv[e.to] || 999, e.level);
    const low = [];
    for (const [c, w] of Object.entries(D.wild)) for (const k of ['grass', 'water']) for (const [lv, sp] of w[k].mons) if (isG2(sp) && minLv[sp] > lv) low.push(c + ' ' + sp + ' Lv' + lv);
    for (const [cls, teams] of Object.entries(D.parties)) teams.forEach((t, n) => t.forEach(([lv, sp]) => { if (isG2(sp) && minLv[sp] > lv) low.push(cls + '#' + (n + 1) + ' ' + sp + ' Lv' + lv); }));
    check(!low.length, 'no evolved Gen 2 POKéMON below its evolution level (wild and trainers): ' + low.slice(0, 6).join('; '));
  });

  it('trainer teams mix in Gen 2 without losing the leaders\' aces', () => {
    const big = []; for (const [cls, teams] of Object.entries(D.parties)) teams.forEach((t, n) => { if (t.length > 6) big.push(cls + '#' + (n + 1)); });
    check(!big.length, 'every trainer team has at most 6 POKéMON: ' + big.join(', '));
    check(['BROCK', 'MISTY', 'LT_SURGE', 'ERIKA', 'KOGA', 'SABRINA', 'BLAINE'].every(c => D.parties[c][0].some(([, sp]) => isG2(sp))) && D.parties.GIOVANNI[2].some(([, sp]) => sp === 'GLIGAR'), 'all 8 gym leaders field a Gen 2 POKéMON');
    check(['BROCK', 'MISTY', 'LT_SURGE', 'ERIKA', 'KOGA', 'SABRINA', 'BLAINE'].every(c => { const t = G.makeTrainerParty(c, 1); return !isG2(t[t.length - 1].species); }), "gym leaders' ace is still their Gen 1 POKéMON (keeps the TM move)");
    check(['LORELEI', 'BRUNO', 'AGATHA', 'LANCE'].every(c => D.parties[c][0].every(([, sp]) => !isG2(sp))), 'Elite Four 1 unchanged');

    const GYMTYPE = { PewterGym: 'ROCK', CeruleanGym: 'WATER', VermilionGym: 'ELECTRIC', CeladonGym: 'GRASS', FuchsiaGym: 'POISON', SaffronGym: 'PSYCHIC_TYPE', CinnabarGym: 'FIRE', ViridianGym: 'GROUND' };
    const LEADERS = ['BROCK', 'MISTY', 'LT_SURGE', 'ERIKA', 'KOGA', 'SABRINA', 'BLAINE', 'GIOVANNI'];
    const missingGym = [];
    for (const [map, type] of Object.entries(GYMTYPE)) for (const o of G.MAPDATA.maps[map].objs.filter(o => o.trainer && !LEADERS.includes(o.trainer.cls))) {
      const t = D.parties[o.trainer.cls][o.trainer.n - 1];
      if (!t.some(([, sp]) => isG2(sp) && D.species[sp].types.includes(type))) missingGym.push(map + ' ' + o.trainer.cls + '#' + o.trainer.n);
    }
    check(!missingGym.length, 'every gym trainer has a Gen 2 POKéMON of the gym type: ' + missingGym.join(', '));
    const rivalFights = [['RIVAL1', 3, 9], ['RIVAL2', 0, 12], ['RIVAL3', 0, 3]].flatMap(([c, a, b]) => D.parties[c].slice(a, b));
    check(rivalFights.every(t => t.some(([, sp]) => isG2(sp))), `every rival fight from Route 22 on has a Gen 2 POKéMON (${rivalFights.length} teams)`);
    check(rivalFights.every(t => /SQUIRTLE|WARTORTLE|BLASTOISE|BULBASAUR|IVYSAUR|VENUSAUR|CHARMANDER|CHARMELEON|CHARIZARD/.test(t[t.length - 1][1])), "the rival's starter is still last in every fight");
    check(D.parties.BROCK[0].slice(-1)[0][1] === 'ONIX' && D.parties.MISTY[0].slice(-1)[0][1] === 'STARMIE' && D.parties.GIOVANNI[2].slice(-1)[0][1] === 'RHYDON', 'leader aces unchanged (Onix, Starmie, Rhydon…)');
  });

  // talk to an NPC as the game would, auto-pressing A (YES / first option)
  function talk(map, id) {
    G.ow.load(map, 1, 1, 'down');
    const a = G.ow.actors.find(x => x.obj && x.obj.id === id) || { obj: G.maps.getMap(map).objs.find(o => o.id === id) };
    return drive(G, G.spawnScript(G.talkTo(a)));
  }
  const has = sp => G.state.party.concat(G.state.boxes.flat()).some(m => m.species === sp);
  const reset = () => { G.state.party = [new G.Mon('PIDGEY', 20)]; };

  it('gifts, trades and evolution items', () => {
    reset(); G.setFlag('EVENT_GOT_SS_TICKET'); talk('BillsHouse', 'BILLSHOUSE_BILL1');
    check(has('CHIKORITA') && G.flag('GEN2_GOT_JOHTO_STARTER'), 'Bill gives a Johto starter after the S.S. Ticket');
    const n0 = G.state.party.length; talk('BillsHouse', 'BILLSHOUSE_BILL1'); check(G.state.party.length === n0, 'Bill only gives one');
    for (const [map, id, sp, pre] of [['Daycare', 'DAYCARE_GENTLEMAN', 'TOGEPI'], ['PokemonFanClub', 'POKEMONFANCLUB_PIKACHU_FAN', 'PICHU'],
      ['PewterPokecenter', 'PEWTERPOKECENTER_GENTLEMAN', 'IGGLYBUFF'], ['MtMoonPokecenter', 'MTMOONPOKECENTER_GENTLEMAN', 'CLEFFA'],
      ['FightingDojo', 'FIGHTINGDOJO_KARATE_MASTER', 'TYROGUE', 'EVENT_DEFEATED_FIGHTING_DOJO']]) {
      reset();
      if (pre) { talk(map, id); check(!has(sp), sp + ' is not given before its condition'); G.setFlag(pre); }
      talk(map, id); const got = has(sp); reset(); talk(map, id);
      check(got && !has(sp), sp + ' gift works once, then the NPC goes back to normal');
    }
    for (const [map, id, give, get] of [['CeruleanTradeHouse', 'CERULEANTRADEHOUSE_GRANNY', 'JIGGLYPUFF', 'SMOOCHUM'], ['VermilionPokecenter', 'VERMILIONPOKECENTER_SAILOR', 'VOLTORB', 'ELEKID'],
      ['CinnabarLabTradeRoom', 'CINNABARLABTRADEROOM_SUPER_NERD', 'GROWLITHE', 'MAGBY']]) {
      G.state.party = [new G.Mon(give, 20)]; talk(map, id);
      check(G.state.party[0].species === get, give + ' -> ' + get + ' trade');
    }
    G.state.bag = [];
    talk('SaffronPokecenter', 'SAFFRONPOKECENTER_GENTLEMAN'); check(!G.bag.count('UP_GRADE'), 'no UP-GRADE before Silph Co. is freed');
    G.setFlag('EVENT_BEAT_SILPH_CO_GIOVANNI'); talk('SaffronPokecenter', 'SAFFRONPOKECENTER_GENTLEMAN'); talk('SaffronPokecenter', 'SAFFRONPOKECENTER_GENTLEMAN');
    check(G.bag.count('UP_GRADE') === 1, 'UP-GRADE from the Saffron POKéMON CENTER gentleman, once');
    for (const [map, item] of [['PowerPlant', 'METAL_COAT'], ['VictoryRoad2F', 'METAL_COAT'], ['SSAnneB1FRooms', 'KINGS_ROCK'], ['SeafoamIslandsB3F', 'KINGS_ROCK'], ['SeafoamIslandsB4F', 'DRAGON_SCALE']]) {
      G.ow.load(map, 1, 1, 'down'); const before = G.bag.count(item);
      const h = G.ow.map.hidden.find(x => x.arg === item); drive(G, G.spawnScript(G.hiddenEvent(h, 'up')));
      check(G.bag.count(item) === before + 1, item + ' hidden in ' + map);
    }
  });

  it('the post-game releases the beasts and legendaries', () => {
    G.state.roamers = []; G.ow.load('PalletTown', 5, 6, 'down');
    for (const f of G.stepHooks) f(G.state);
    check(!G.state.roamers.length && !G.S.isShown('GEN2_LUGIA', 'SeafoamIslandsB4F'), 'nothing post-game before the first HALL OF FAME');
    G.setFlag('EVENT_BEAT_CHAMPION'); for (const f of G.stepHooks) f(G.state); for (const f of G.stepHooks) f(G.state);
    check(G.state.roamers.map(r => r.mon.species).join() === 'RAIKOU,ENTEI,SUICUNE', 'the first HALL OF FAME releases RAIKOU, ENTEI and SUICUNE (once)');
    check(['SeafoamIslandsB4F:GEN2_LUGIA', 'PokemonTower7F:GEN2_HO_OH', 'ViridianForest:GEN2_CELEBI'].every(k => { const [m, id] = k.split(':'); return G.S.isShown(id, m); }), 'LUGIA, HO-OH and CELEBI appear');
    G.state.party = [new G.Mon('MEWTWO', 100)]; G.state.party[0].moves = []; G.state.party[0].addMove('PSYCHIC_M');
    G.ow.load('ViridianForest', 1, 1, 'down'); const cel = G.ow.actors.find(a => a.obj.id === 'GEN2_CELEBI');
    const r = drive(G, G.spawnScript(G.talkTo(cel)), 60000);
    check(cel && r.done && !G.S.isShown('GEN2_CELEBI', 'ViridianForest'), 'CELEBI battle runs and it is gone afterwards');
  });
});
