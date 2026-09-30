// @ts-nocheck (plain JS moved into a module; typed file by file, see docs/nextjs-migration.md)
import { game } from '../global';

const G = game();

// Where the Gen 2 species live in Kanto (docs/gen2-integration-plan.md, Phase 4): wild slots, fishing, trainer teams
// and in-game trades. Red's encounter rates and level slots stay as they are; a Gen 2 species takes over a slot and
// keeps its level, so the common slots (0-2) keep each route's Gen 1 staples. Gifts, items and legendaries: src/engine/scripts/gen2.js.
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

// gym leaders: one type-matching Gen 2 POKéMON, slotted in before the ace (the ace keeps the leader's TM move).
// Brock's Sudowoodo trades Rock Throw for Low Kick: with it, a Charmander start almost never beat him (Phase 7 sims).
const GYM = { BROCK: [0, 10, 'SUDOWOODO', ['LOW_KICK', 'MIMIC', 'DOUBLE_TEAM', 'SCREECH']], MISTY: [0, 19, 'MARILL'], LT_SURGE: [0, 21, 'FLAAFFY'], ERIKA: [0, 28, 'JUMPLUFF'],
  KOGA: [0, 38, 'ARIADOS'], SABRINA: [0, 40, 'XATU'], BLAINE: [0, 44, 'MAGCARGO'], GIOVANNI: [2, 44, 'GLIGAR'] };
for (const [cls, [team, lv, sp, moves]] of Object.entries(GYM)) {
  const t = D.parties[cls][team]; t.splice(t.length - 1, 0, moves ? [lv, sp, moves] : [lv, sp]);
}

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

// gym trainers: every one carries at least one Gen 2 POKéMON of the gym's type. An off-type one from the class themes
// above becomes on-type; a team without one gets one added before its last POKéMON
const GYM_TRAINERS = { PewterGym: ['ROCK', 'SUDOWOODO'], CeruleanGym: ['WATER', 'MARILL', 'WOOPER', 'CHINCHOU', 'REMORAID'],
  VermilionGym: ['ELECTRIC', 'MAREEP', 'CHINCHOU'], CeladonGym: ['GRASS', 'HOPPIP', 'SUNKERN'], FuchsiaGym: ['POISON', 'SPINARAK', 'QWILFISH'],
  SaffronGym: ['PSYCHIC_TYPE', 'NATU', 'GIRAFARIG'], CinnabarGym: ['FIRE', 'SLUGMA', 'HOUNDOUR'], ViridianGym: ['GROUND', 'PHANPY', 'WOOPER', 'GLIGAR', 'SWINUB'] };
const gen2 = sp => D.species[sp].dex > 151;
for (const [map, [type, ...pool]] of Object.entries(GYM_TRAINERS)) G.MAPDATA.maps[map].objs.filter(o => o.trainer && !(o.trainer.cls in GYM))
  .forEach((o, k) => {
    const t = D.parties[o.trainer.cls][o.trainer.n - 1];
    if (t.some(([, sp]) => gen2(sp) && D.species[sp].types.includes(type))) return;
    const off = t.findIndex(([, sp]) => gen2(sp)), base = pool[k % pool.length];
    if (off >= 0) { t[off] = [t[off][0], stageAt(base, t[off][0])]; return; }
    const lv = t[t.length - 1][0];
    if (t.length < 6) t.splice(t.length - 1, 0, [lv, stageAt(base, lv)]); else t[t.length >> 1] = [lv, stageAt(base, lv)];
  });

// rival: one Gen 2 POKéMON in every fight from Route 22 on, growing with him; his starter stays the ace
for (const [cls, from, lv, sp] of [['RIVAL1', 3, 8, 'SENTRET'], ['RIVAL1', 6, 16, 'FURRET'], ['RIVAL2', 0, 18, 'FURRET'], ['RIVAL2', 3, 23, 'HERACROSS']])
  for (let i = from; i < from + 3; i++) { const t = D.parties[cls][i]; t.splice(t.length - 1, 0, [lv, sp]); }

// Elite Four 2, after the first HALL OF FAME: the Gen 2 Elite Four (pokecrystal data/trainers/parties.asm) 20 levels up,
// with their Gen 2 movesets where this game has the move (src/engine/game/battleflow.js tops up the rest)
const up = team => team.map(([lv, sp, ...moves]) => [lv + 20, sp, moves]);
D.trainerClasses.WILL = { id: 'WILL', name: 'WILL', money: 9900 };
D.trainerClasses.KAREN = { id: 'KAREN', name: 'KAREN', money: 9900 };
D.parties.WILL = [up([[40, 'XATU', 'QUICK_ATTACK', 'FUTURE_SIGHT', 'CONFUSE_RAY', 'PSYCHIC_M'], [41, 'JYNX', 'DOUBLESLAP', 'LOVELY_KISS', 'ICE_PUNCH', 'PSYCHIC_M'],
  [41, 'EXEGGUTOR', 'REFLECT', 'LEECH_SEED', 'EGG_BOMB', 'PSYCHIC_M'], [41, 'SLOWBRO', 'CURSE', 'AMNESIA', 'BODY_SLAM', 'PSYCHIC_M'], [42, 'XATU', 'QUICK_ATTACK', 'FUTURE_SIGHT', 'CONFUSE_RAY', 'PSYCHIC_M']])];
D.parties.KOGA.push(up([[40, 'ARIADOS', 'DOUBLE_TEAM', 'SPIDER_WEB', 'BATON_PASS', 'GIGA_DRAIN'], [41, 'VENOMOTH', 'SUPERSONIC', 'GUST', 'PSYCHIC_M', 'TOXIC'],
  [43, 'FORRETRESS', 'PROTECT', 'SWIFT', 'EXPLOSION', 'SPIKES'], [42, 'MUK', 'MINIMIZE', 'ACID_ARMOR', 'SLUDGE_BOMB', 'TOXIC'], [44, 'CROBAT', 'DOUBLE_TEAM', 'QUICK_ATTACK', 'WING_ATTACK', 'TOXIC']]));
D.parties.BRUNO.push(up([[42, 'HITMONTOP', 'PURSUIT', 'QUICK_ATTACK', 'DIG', 'DETECT'], [42, 'HITMONLEE', 'SWAGGER', 'DOUBLE_KICK', 'HI_JUMP_KICK', 'FORESIGHT'],
  [42, 'HITMONCHAN', 'THUNDERPUNCH', 'ICE_PUNCH', 'FIRE_PUNCH', 'MACH_PUNCH'], [43, 'ONIX', 'BIND', 'EARTHQUAKE', 'SANDSTORM', 'ROCK_SLIDE'], [46, 'MACHAMP', 'ROCK_SLIDE', 'FORESIGHT', 'VITAL_THROW', 'CROSS_CHOP']]));
D.parties.KAREN = [up([[42, 'UMBREON', 'SAND_ATTACK', 'CONFUSE_RAY', 'FAINT_ATTACK', 'MEAN_LOOK'], [42, 'VILEPLUME', 'STUN_SPORE', 'ACID', 'MOONLIGHT', 'PETAL_DANCE'],
  [45, 'GENGAR', 'LICK', 'SPITE', 'CURSE', 'DESTINY_BOND'], [44, 'MURKROW', 'QUICK_ATTACK', 'WHIRLWIND', 'PURSUIT', 'FAINT_ATTACK'], [47, 'HOUNDOOM', 'ROAR', 'PURSUIT', 'FLAMETHROWER', 'CRUNCH']])];
D.parties.LANCE.push(up([[44, 'GYARADOS', 'FLAIL', 'RAIN_DANCE', 'SURF', 'HYPER_BEAM'], [47, 'DRAGONITE', 'THUNDER_WAVE', 'TWISTER', 'THUNDER', 'HYPER_BEAM'],
  [47, 'DRAGONITE', 'THUNDER_WAVE', 'TWISTER', 'BLIZZARD', 'HYPER_BEAM'], [46, 'AERODACTYL', 'WING_ATTACK', 'ANCIENTPOWER', 'ROCK_SLIDE', 'HYPER_BEAM'],
  [46, 'CHARIZARD', 'FLAMETHROWER', 'WING_ATTACK', 'SLASH', 'HYPER_BEAM'], [50, 'DRAGONITE', 'FIRE_BLAST', 'SAFEGUARD', 'OUTRAGE', 'HYPER_BEAM']]));
// who stands in each room on the second run, and what they say (src/engine/scripts/late.js)
const E4_TEXT = {
  WILL: ['Welcome to the POKéMON LEAGUE. I am WILL.\fI trained my PSYCHIC POKéMON far from here, where the league is harder still.\fYour mind will not stay your own for long!', 'I... cannot believe it. My foresight failed me.', 'Go on. The next room belongs to a ninja you already know.'],
  KOGA: ['Fwahahaha! You remember me from FUCHSIA? Here, as one of the ELITE FOUR, I hold nothing back.\fPoison and confusion will be your undoing!', 'Hmm! You have not merely grown... you have mastered it.', 'Go. Face the strength that waits beyond this door.'],
  BRUNO: ['We meet again! Since our last battle I have trained harder than ever.\fMy fighters have learned new tricks. Hoo hah!', 'I lost again?! You are something else.', 'Karen is next. She is stronger than all of us.'],
  KAREN: ['I am KAREN of the ELITE FOUR.\fThey say there are no strong or weak POKéMON, only strong or weak trainers.\fLet me see which you are.', 'Well done. I like your style.', 'The CHAMPION is waiting. Win or lose, give him your best.'],
  LANCE: ["So you've made it this far. I am LANCE, and for this rematch I stand as CHAMPION.\fI have waited for a trainer who could beat the ELITE FOUR twice.\fShow me that your team is worthy!", 'It is over... You have earned the title a second time.', 'Walk with pride. The HALL OF FAME awaits you.'],
};
for (const [cls, [battle, end, after]] of Object.entries(E4_TEXT)) Object.assign(G.TEXT, { ['E4_2_' + cls + '_BATTLE']: battle, ['E4_2_' + cls + '_END']: end, ['E4_2_' + cls + '_AFTER']: after });
const run2 = (cls, sprite) => ({ cls, n: D.parties[cls].length, sprite, battle: 'E4_2_' + cls + '_BATTLE', end: 'E4_2_' + cls + '_END', after: 'E4_2_' + cls + '_AFTER' });
G.E4_2 = { LoreleisRoom: run2('WILL', 'will'), BrunosRoom: run2('KOGA', 'koga'), AgathasRoom: run2('BRUNO', 'bruno'), LancesRoom: run2('KAREN', 'karen'), ChampionsRoom: run2('LANCE', 'lance') };

// in-game trades for the babies that hatch from eggs in Gen 2 (NPCs wired up in src/engine/scripts/gen2.js)
G.GEN2_TRADES = {};
for (const [key, give, get, nick] of [['smoochum', 'JIGGLYPUFF', 'SMOOCHUM', 'LIPPY'], ['elekid', 'VOLTORB', 'ELEKID', 'SPARKY'], ['magby', 'GROWLITHE', 'MAGBY', 'EMBER']]) {
  G.GEN2_TRADES[key] = D.trades.length;
  D.trades.push({ give, get, nick, dialog: 'TRADE_DIALOGSET_CASUAL' });
}
