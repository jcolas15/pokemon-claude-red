// Where the Gen 2 species live in Kanto (docs/gen2-integration-plan.md, Phase 4): wild slots, fishing, trainer teams
// and in-game trades. Red's encounter rates and level slots stay as they are; a Gen 2 species takes over a slot and
// keeps its level, so the common slots (0-2) keep each route's Gen 1 staples. Gifts, items and legendaries: src/scripts/gen2.js.
(function (G) {
  'use strict';
  const D = G.DATA;

  // map constant -> { grass | water: { slot index: species } }
  const WILD = {
    ROUTE_1: { grass: { 4: 'SENTRET', 6: 'HOOTHOOT', 8: 'SENTRET' } },
    ROUTE_2: { grass: { 5: 'LEDYBA', 8: 'SPINARAK', 9: 'PINECO' } },
    ROUTE_22: { grass: { 6: 'MAREEP', 8: 'SENTRET' } },
    VIRIDIAN_FOREST: { grass: { 4: 'LEDYBA', 5: 'SPINARAK' } },
    ROUTE_3: { grass: { 3: 'HOPPIP', 6: 'MAREEP' } },
    ROUTE_4: { grass: { 4: 'SUNKERN', 8: 'AIPOM' } },
    ROUTE_24: { grass: { 4: 'MARILL', 7: 'NATU' } },
    ROUTE_25: { grass: { 4: 'MARILL', 6: 'SUNKERN', 8: 'PINECO' } },
    ROUTE_5: { grass: { 3: 'SNUBBULL', 6: 'NATU' } },
    ROUTE_6: { grass: { 4: 'WOOPER', 8: 'SNUBBULL' } },
    ROUTE_7: { grass: { 6: 'HOUNDOUR', 7: 'MURKROW' } },
    ROUTE_8: { grass: { 6: 'SNUBBULL', 8: 'HOUNDOUR' } },
    ROUTE_9: { grass: { 5: 'PHANPY', 8: 'SUDOWOODO' } },
    ROUTE_10: { grass: { 5: 'PHANPY', 8: 'MAREEP' } },
    ROUTE_11: { grass: { 3: 'SUNKERN', 8: 'WOOPER' } },
    ROCK_TUNNEL_1F: { grass: { 8: 'DUNSPARCE' } },
    DIGLETTS_CAVE: { grass: { 7: 'DUNSPARCE' } },
    POKEMON_TOWER_3F: { grass: { 7: 'MISDREAVUS' } },
    POKEMON_TOWER_5F: { grass: { 7: 'MISDREAVUS' } },
    ROUTE_12: { grass: { 3: 'YANMA', 8: 'SKIPLOOM' } },
    ROUTE_13: { grass: { 3: 'YANMA', 8: 'STANTLER' } },
    ROUTE_14: { grass: { 3: 'STANTLER', 8: 'MILTANK' } },
    ROUTE_15: { grass: { 3: 'MILTANK', 8: 'NOCTOWL' } },
    ROUTE_16: { grass: { 5: 'SMEARGLE', 8: 'FURRET' } },
    ROUTE_17: { grass: { 3: 'FURRET', 8: 'GLIGAR' } },
    ROUTE_18: { grass: { 3: 'FURRET', 8: 'MURKROW' } },
    SAFARI_ZONE_EAST: { grass: { 7: 'TEDDIURSA' } },
    SAFARI_ZONE_NORTH: { grass: { 7: 'GIRAFARIG' } },
    SAFARI_ZONE_WEST: { grass: { 7: 'URSARING' } },
    SAFARI_ZONE_CENTER: { grass: { 7: 'HERACROSS' } },
    POWER_PLANT: { grass: { 3: 'FLAAFFY', 6: 'AMPHAROS' } },
    SEAFOAM_ISLANDS_1F: { grass: { 7: 'SWINUB' } },
    SEAFOAM_ISLANDS_B1F: { grass: { 7: 'DELIBIRD' } },
    SEAFOAM_ISLANDS_B2F: { grass: { 6: 'SNEASEL' } },
    SEAFOAM_ISLANDS_B3F: { grass: { 7: 'SHUCKLE' } },
    SEAFOAM_ISLANDS_B4F: { grass: { 7: 'SWINUB' } },
    ROUTE_19: { water: { 6: 'CORSOLA', 8: 'MANTINE' } },
    ROUTE_20: { water: { 6: 'CORSOLA', 8: 'MANTINE' } },
    ROUTE_21: { grass: { 3: 'NOCTOWL', 8: 'JUMPLUFF' }, water: { 7: 'CORSOLA' } },
    POKEMON_MANSION_1F: { grass: { 7: 'SLUGMA' } },
    POKEMON_MANSION_2F: { grass: { 7: 'SLUGMA' } },
    POKEMON_MANSION_3F: { grass: { 8: 'HOUNDOOM' } },
    POKEMON_MANSION_B1F: { grass: { 7: 'SLUGMA' } },
    ROUTE_23: { grass: { 3: 'SKARMORY', 8: 'GLIGAR' } },
    VICTORY_ROAD_1F: { grass: { 6: 'GLIGAR' } },
    VICTORY_ROAD_2F: { grass: { 8: 'SKARMORY' } },
    VICTORY_ROAD_3F: { grass: { 9: 'PUPITAR' } },
    CERULEAN_CAVE_1F: { grass: { 6: 'WOBBUFFET', 9: 'LARVITAR' } },
    CERULEAN_CAVE_2F: { grass: { 7: 'UNOWN' } },
  };
  for (const [cnst, kinds] of Object.entries(WILD)) for (const [kind, slots] of Object.entries(kinds)) {
    const mons = D.wild[cnst][kind].mons;
    for (const [i, sp] of Object.entries(slots)) mons[i] = [mons[i][0], sp];
  }
  // Super Rod: each spot picks at random from its list, at the list's level
  const ROD = { CHINCHOU: ['ROUTE_19', 'ROUTE_20', 'ROUTE_21', 'CINNABAR_ISLAND'], REMORAID: ['ROUTE_12', 'ROUTE_13', 'ROUTE_17', 'ROUTE_18'],
    QWILFISH: ['ROUTE_12', 'ROUTE_13', 'VERMILION_CITY', 'VERMILION_DOCK'] };
  for (const [sp, spots] of Object.entries(ROD)) for (const k of spots) D.superRod[k].push([15, sp]);

  // the stage a species has reached by this level, following level evolutions only
  function stageAt(sp, lv) {
    for (let e; (e = D.species[sp].evos.find(x => x.type === 'level' && lv >= x.level));) sp = e.to;
    return sp;
  }

  // gym leaders: one type-matching Gen 2 POKéMON, slotted in before the ace (the ace keeps the leader's TM move)
  const GYM = { BROCK: [0, 12, 'SUDOWOODO'], MISTY: [0, 19, 'MARILL'], LT_SURGE: [0, 21, 'FLAAFFY'], ERIKA: [0, 28, 'JUMPLUFF'],
    KOGA: [0, 38, 'ARIADOS'], SABRINA: [0, 40, 'XATU'], BLAINE: [0, 44, 'MAGCARGO'], GIOVANNI: [2, 44, 'GLIGAR'] };
  for (const [cls, [team, lv, sp]] of Object.entries(GYM)) { const t = D.parties[cls][team]; t.splice(t.length - 1, 0, [lv, sp]); }

  // rival: HERACROSS joins at Silph Co. and takes RHYHORN's place from the second Route 22 fight on (his starter stays the ace)
  for (let i = 6; i <= 8; i++) { const t = D.parties.RIVAL2[i]; t.splice(t.length - 1, 0, [38, 'HERACROSS']); }
  for (const [cls, from, to] of [['RIVAL2', 9, 11], ['RIVAL3', 0, 2]]) for (let i = from; i <= to; i++)
    for (const m of D.parties[cls][i]) if (m[1] === 'RHYHORN' || m[1] === 'RHYDON') m[1] = 'HERACROSS';

  // route trainers: every third team of these classes swaps its middle POKéMON for a Gen 2 one that fits the class
  const THEME = {
    YOUNGSTER: ['SENTRET', 'AIPOM', 'SUNKERN'], BUG_CATCHER: ['LEDYBA', 'SPINARAK', 'PINECO', 'YANMA'], LASS: ['MAREEP', 'SNUBBULL', 'HOPPIP', 'MARILL'],
    JR_TRAINER_M: ['SENTRET', 'MAREEP', 'WOOPER'], JR_TRAINER_F: ['HOPPIP', 'SNUBBULL', 'MAREEP'], HIKER: ['SUDOWOODO', 'PHANPY', 'DUNSPARCE'],
    SWIMMER: ['CHINCHOU', 'REMORAID', 'MARILL', 'QWILFISH'], FISHER: ['REMORAID', 'CHINCHOU', 'QWILFISH', 'WOOPER'], SAILOR: ['QWILFISH', 'WOOPER'],
    BIRD_KEEPER: ['HOOTHOOT', 'MURKROW'], PSYCHIC_TR: ['NATU', 'GIRAFARIG'], CHANNELER: ['MISDREAVUS'], ROCKET: ['HOUNDOUR', 'MURKROW', 'SNEASEL'],
    BIKER: ['HOUNDOUR', 'SLUGMA'], BURGLAR: ['SNEASEL', 'HOUNDOUR', 'SLUGMA'], CUE_BALL: ['TEDDIURSA'], BEAUTY: ['SUNKERN', 'MILTANK'],
    GENTLEMAN: ['SNUBBULL', 'STANTLER'], POKEMANIAC: ['SLUGMA', 'PHANPY', 'WOOPER'], ENGINEER: ['MAREEP', 'CHINCHOU'], SUPER_NERD: ['MAREEP', 'PHANPY'],
    GAMBLER: ['AIPOM', 'GIRAFARIG'], COOLTRAINER_M: ['SKARMORY', 'HERACROSS', 'GLIGAR'], COOLTRAINER_F: ['MANTINE', 'SKARMORY', 'GIRAFARIG'],
  };
  for (const [cls, pool] of Object.entries(THEME)) (D.parties[cls] || []).forEach((t, n) => {
    if (n % 3 !== 0 || !t.length) return;
    const i = t.length >> 1, lv = t[i][0];
    t[i] = [lv, stageAt(pool[(n / 3) % pool.length], lv)];
  });

  // in-game trades for the babies that hatch from eggs in Gen 2 (NPCs wired up in src/scripts/gen2.js)
  G.GEN2_TRADES = {};
  for (const [key, give, get, nick] of [['smoochum', 'JIGGLYPUFF', 'SMOOCHUM', 'LIPPY'], ['elekid', 'VOLTORB', 'ELEKID', 'SPARKY'], ['magby', 'GROWLITHE', 'MAGBY', 'EMBER']]) {
    G.GEN2_TRADES[key] = D.trades.length;
    D.trades.push({ give, get, nick, dialog: 'TRADE_DIALOGSET_CASUAL' });
  }
})(window.G);
