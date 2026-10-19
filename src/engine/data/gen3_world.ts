// Where the Gen 3 species live in Kanto (docs/gen3-integration-plan.md, Phase 4): wild areas (mixed with Gen 2 so each
// generation gets about a third), fishing, gym leaders, gym trainers, the rival and route trainers, and the Hoenn Elite
// Four (Phase 5). Gifts, fossils, items and legendaries: src/engine/scripts/gen3.ts.
import { game } from '../global';

type Slot = [number, string, ...unknown[]];
type Table = { rate: number; mons: [number, string][] };
type Species = { dex: number; types: string[]; evos?: { to: string; type: string; level?: number }[] };
const G = game();
const D = G.DATA as {
  wild: Record<string, { grass: Table; water: Table }>; superRod: Record<string, [number, string][]>;
  parties: Record<string, Slot[][]>; species: Record<string, Species>;
  trainerClasses: Record<string, { id: string; name: string; money: number }>;
};
const stageAt = G.stageAt as (sp: string, lv: number) => string;
const mixWild = G.mixWild as (mons: [number, string][], pools: string[][]) => void;
const WILD2 = G.WILD_GEN2 as Record<string, string[] | { grass?: string[]; water?: string[] }>;
const gen = (sp: string) => { const d = D.species[sp].dex; return d <= 151 ? 1 : d <= 251 ? 2 : 3; };

// Gen 3 species per area, most common first and the rare one last (same rules as the Gen 2 lists in gen2_world.ts)
const WILD3: Record<string, string[] | { grass?: string[]; water?: string[] }> = {
  ROUTE_1: ['ZIGZAGOON', 'POOCHYENA'], ROUTE_22: ['POOCHYENA', 'TAILLOW'], ROUTE_2: ['WURMPLE', 'TAILLOW', 'SLAKOTH'],
  VIRIDIAN_FOREST: ['WURMPLE', 'SHROOMISH', 'NINCADA'], ROUTE_3: ['TAILLOW', 'WHISMUR', 'SKITTY'],
  MT_MOON_1F: ['ARON', 'MAKUHITA', 'LUNATONE'], MT_MOON_B1F: ['NOSEPASS', 'ARON', 'LUNATONE'], MT_MOON_B2F: ['ARON', 'NOSEPASS', 'SOLROCK'],
  ROUTE_4: ['WHISMUR', 'SKITTY', 'LOTAD'], ROUTE_24: ['LOTAD', 'SURSKIT', 'RALTS'], ROUTE_25: ['SEEDOT', 'WINGULL', 'RALTS'],
  ROUTE_5: ['ELECTRIKE', 'SPINDA', 'PLUSLE'], ROUTE_6: ['ELECTRIKE', 'LOTAD', 'MINUN'], ROUTE_11: ['SPOINK', 'ELECTRIKE', 'GULPIN'],
  DIGLETTS_CAVE: ['TRAPINCH', 'BALTOY', 'NINCADA'], ROUTE_9: ['NUMEL', 'ZIGZAGOON', 'TRAPINCH'], ROUTE_10: ['ELECTRIKE', 'NUMEL', 'PLUSLE'],
  ROCK_TUNNEL_1F: ['ARON', 'MAKUHITA', 'SABLEYE'], ROCK_TUNNEL_B1F: ['MAKUHITA', 'ARON', 'MAWILE'],
  ROUTE_7: ['POOCHYENA', 'SPOINK', 'KECLEON'], ROUTE_8: ['SKITTY', 'SPOINK', 'KECLEON'],
  POKEMON_TOWER_3F: ['SHUPPET', 'DUSKULL'], POKEMON_TOWER_4F: ['SHUPPET', 'DUSKULL'], POKEMON_TOWER_5F: ['SHUPPET', 'DUSKULL'],
  POKEMON_TOWER_6F: ['DUSKULL', 'SHUPPET'], POKEMON_TOWER_7F: ['DUSKULL', 'SHUPPET'],
  POWER_PLANT: ['ELECTRIKE', 'MINUN', 'PLUSLE'],
  ROUTE_12: ['LOTAD', 'ROSELIA', 'SURSKIT'], ROUTE_13: ['ROSELIA', 'SEEDOT', 'TROPIUS'], ROUTE_14: ['SEEDOT', 'CASTFORM', 'TROPIUS'],
  ROUTE_15: ['ILLUMISE', 'VOLBEAT', 'KECLEON'], ROUTE_16: ['ZIGZAGOON', 'TAILLOW', 'SPINDA'], ROUTE_17: ['SWABLU', 'ZANGOOSE', 'SEVIPER'],
  ROUTE_18: ['SWABLU', 'SEVIPER', 'ZANGOOSE'],
  SAFARI_ZONE_EAST: ['SURSKIT', 'TROPIUS', 'ZANGOOSE'], SAFARI_ZONE_NORTH: ['TRAPINCH', 'CACNEA', 'SEVIPER'],
  SAFARI_ZONE_WEST: ['ROSELIA', 'CACNEA', 'ABSOL'], SAFARI_ZONE_CENTER: ['TROPIUS', 'GULPIN', 'ABSOL'],
  SEAFOAM_ISLANDS_1F: ['SPHEAL', 'SNORUNT'], SEAFOAM_ISLANDS_B1F: ['SNORUNT', 'SPHEAL'], SEAFOAM_ISLANDS_B2F: ['SPHEAL', 'SNORUNT'],
  SEAFOAM_ISLANDS_B3F: ['SPHEAL', 'SNORUNT'], SEAFOAM_ISLANDS_B4F: ['SNORUNT', 'SPHEAL'],
  POKEMON_MANSION_1F: ['NUMEL', 'TORKOAL', 'SHUPPET'], POKEMON_MANSION_2F: ['TORKOAL', 'NUMEL', 'SHUPPET'],
  POKEMON_MANSION_3F: ['NUMEL', 'TORKOAL', 'SHUPPET'], POKEMON_MANSION_B1F: ['TORKOAL', 'NUMEL', 'SHUPPET'],
  ROUTE_21: { grass: ['TAILLOW', 'SWABLU', 'TROPIUS'], water: ['WINGULL', 'CARVANHA', 'WAILMER', 'LUVDISC'] },
  ROUTE_19: { water: ['WINGULL', 'WAILMER', 'CARVANHA', 'RELICANTH'] }, ROUTE_20: { water: ['WAILMER', 'CARVANHA', 'WINGULL', 'LUVDISC'] },
  ROUTE_23: ['ARON', 'ABSOL', 'BAGON'], VICTORY_ROAD_1F: ['ARON', 'MAKUHITA', 'BAGON'], VICTORY_ROAD_2F: ['MEDITITE', 'ARON', 'BELDUM'],
  VICTORY_ROAD_3F: ['ARON', 'MEDITITE', 'BAGON'], CERULEAN_CAVE_1F: ['ABSOL', 'CHIMECHO', 'SABLEYE'],
  CERULEAN_CAVE_2F: ['MEDITITE', 'ABSOL', 'SABLEYE'], CERULEAN_CAVE_B1F: ['MAWILE', 'CHIMECHO', 'BELDUM'],
};
const byKind = (spec?: string[] | { grass?: string[]; water?: string[] }) => (Array.isArray(spec) ? { grass: spec } : spec || {});
for (const cnst of new Set([...Object.keys(WILD2), ...Object.keys(WILD3)])) {
  const two: Record<string, string[] | undefined> = byKind(WILD2[cnst]), three: Record<string, string[] | undefined> = byKind(WILD3[cnst]);
  for (const kind of ['grass', 'water'] as const) {
    const pools = [two[kind], three[kind]].filter((p): p is string[] => !!p);
    if (pools.length) mixWild(D.wild[cnst][kind].mons, pools);
  }
}
// Gen 3 has no breeding, so the pseudo-legendaries' first stages get rare early spots (their later areas are too high)
(G.WILD_PINS as unknown[]).push(['ROCK_TUNNEL_1F', 'grass', 9, 'BAGON'], ['ROCK_TUNNEL_B1F', 'grass', 9, 'BELDUM']);
for (const [cnst, kind, i, sp] of G.WILD_PINS as [string, 'grass' | 'water', number, string][]) D.wild[cnst][kind].mons[i] = [D.wild[cnst][kind].mons[i][0], sp];

// Super Rod: each spot picks at random from its list
const ROD: [string, number, string[]][] = [
  ['CORPHISH', 15, ['CERULEAN_CITY', 'VERMILION_CITY', 'VERMILION_DOCK', 'ROUTE_24', 'ROUTE_25']],
  ['BARBOACH', 15, ['VIRIDIAN_CITY', 'CELADON_CITY', 'ROUTE_6', 'ROUTE_11', 'ROUTE_22', 'ROUTE_23']],
  ['CARVANHA', 20, ['PALLET_TOWN', 'FUCHSIA_CITY', 'ROUTE_19', 'ROUTE_20', 'ROUTE_21']],
  ['WAILMER', 20, ['ROUTE_19', 'ROUTE_20', 'ROUTE_21', 'CINNABAR_ISLAND']],
  ['LUVDISC', 20, ['ROUTE_19', 'ROUTE_20']],
  ['FEEBAS', 15, ['ROUTE_12', 'ROUTE_13']],
  ['CLAMPERL', 25, ['SEAFOAM_ISLANDS_B3F', 'SEAFOAM_ISLANDS_B4F', 'CINNABAR_ISLAND']],
  ['RELICANTH', 30, ['SEAFOAM_ISLANDS_B4F']],
];
for (const [sp, lv, spots] of ROD) for (const k of spots) D.superRod[k].push([lv, sp]);

// gym leaders: one Gen 3 POKéMON of the gym's type before the ace. A full team swaps out a Gen 1 non-ace, preferring
// one that shares the newcomer's type (the rival's Arcanine makes way for Blaziken, not his Alakazam)
const GYM: Record<string, [number, number, string]> = {
  BROCK: [0, 11, 'NOSEPASS'], MISTY: [0, 19, 'CORPHISH'], LT_SURGE: [0, 21, 'ELECTRIKE'], ERIKA: [0, 28, 'ROSELIA'],
  KOGA: [0, 38, 'SEVIPER'], SABRINA: [0, 34, 'GRUMPIG'], BLAINE: [0, 44, 'TORKOAL'], GIOVANNI: [2, 45, 'FLYGON'],
};
// adds sp before the ace; a full team, or a `replace` one (leaders and the rival, so the fight stays near its Gen 1+2
// difficulty, Phase 7), swaps out a Gen 1 non-ace instead, preferring one that shares a type, and never above its level
// the level a species can first exist at (its level evolution), so a lowered addition never undercuts it
const evolvesAt = (sp: string) => Math.max(0, ...Object.values(D.species).flatMap(d => (d.evos || []).filter(e => e.to === sp && e.type === 'level').map(e => e.level || 0)));
function addTo(team: Slot[], lv: number, sp: string, replace = false, keep?: RegExp, lag = 0, drop = 0) {
  const shares = (m: Slot) => D.species[m[1]].types.some(t => D.species[sp].types.includes(t));
  const swap = team.slice(0, -1).map((m, i) => [m, i] as const).filter(([m]) => gen(m[1]) === 1 && !keep?.test(m[1]))
    .sort((a, b) => Number(shares(b[0])) - Number(shares(a[0])) || a[0][0] - b[0][0])[0];
  if ((replace || team.length >= 6) && swap) { const at = Math.max(Math.min(lv, swap[0][0]) - drop, evolvesAt(sp)); team[swap[1]] = [at, stageAt(sp, at - lag)]; return; }
  if (team.length < 6) team.splice(team.length - 1, 0, [lv, stageAt(sp, lv - lag)]);
}
for (const [cls, [team, lv, sp]] of Object.entries(GYM)) addTo(D.parties[cls][team], lv, sp, true);

// gym trainers: every one carries a Gen 3 POKéMON of the gym's type (Gen 1 members make room on full teams)
const GYM_TRAINERS: Record<string, [string, ...string[]]> = {
  PewterGym: ['ROCK', 'NOSEPASS', 'LUNATONE'], CeruleanGym: ['WATER', 'CORPHISH', 'WAILMER', 'LOTAD'],
  VermilionGym: ['ELECTRIC', 'ELECTRIKE', 'PLUSLE', 'MINUN'], CeladonGym: ['GRASS', 'ROSELIA', 'SEEDOT', 'SHROOMISH', 'LOTAD'],
  FuchsiaGym: ['POISON', 'GULPIN', 'SEVIPER', 'ROSELIA'], SaffronGym: ['PSYCHIC_TYPE', 'SPOINK', 'RALTS', 'MEDITITE'],
  CinnabarGym: ['FIRE', 'NUMEL', 'TORKOAL'], ViridianGym: ['GROUND', 'TRAPINCH', 'BARBOACH', 'NUMEL'],
};
const objs = (G.MAPDATA as { maps: Record<string, { objs: { trainer?: { cls: string; n: number } }[] }> }).maps;
for (const [map, [type, ...pool]] of Object.entries(GYM_TRAINERS)) objs[map].objs.filter(o => o.trainer && !(o.trainer.cls in GYM)).forEach((o, k) => {
  const team = D.parties[o.trainer!.cls][o.trainer!.n - 1];
  if (team.some(([, sp]) => gen(sp) === 3 && D.species[sp].types.includes(type))) return;
  const lv = team[team.length - 1][0], sp = stageAt(pool[k % pool.length], lv);
  if (!D.species[sp].types.includes(type)) return;
  addTo(team, lv, sp);
});

// rival: a Hoenn starter that covers his Kanto starter's weakness, in every fight from Route 22 on. Before the League it
// takes a Kanto member's place 3 levels down and evolves 10 levels late, so each fight stays near its Gen 1+2 difficulty
const COVER: [RegExp, string][] = [[/SQUIRTLE|WARTORTLE|BLASTOISE/, 'TORCHIC'], [/BULBASAUR|IVYSAUR|VENUSAUR/, 'MUDKIP'], [/CHARMANDER|CHARMELEON|CHARIZARD/, 'TREECKO']];
for (const [cls, from, to] of [['RIVAL1', 3, 9], ['RIVAL2', 0, 12], ['RIVAL3', 0, 3]] as const) for (let i = from; i < to; i++) {
  const team = D.parties[cls][i], ace = team[team.length - 1], pick = COVER.find(([re]) => re.test(ace[1]));
  if (pick) addTo(team, team.length > 1 ? team[team.length - 2][0] : ace[0] - 2, pick[1], true, /PIDGE|ABRA|KADABRA|ALAKAZAM/, ...(cls === 'RIVAL3' ? [0, 0] : [10, 3]));
}

// route trainers: every third team of these classes (offset from the Gen 2 picks) swaps its middle POKéMON for a Gen 3 one
const THEME: Record<string, string[]> = {
  YOUNGSTER: ['ZIGZAGOON', 'POOCHYENA', 'TAILLOW'], BUG_CATCHER: ['WURMPLE', 'NINCADA', 'SURSKIT'], LASS: ['SKITTY', 'SWABLU', 'PLUSLE', 'MINUN'],
  JR_TRAINER_M: ['ZIGZAGOON', 'MAKUHITA', 'ELECTRIKE'], JR_TRAINER_F: ['SKITTY', 'ROSELIA', 'SWABLU'], HIKER: ['ARON', 'NOSEPASS', 'NUMEL', 'MAKUHITA'],
  SWIMMER: ['WINGULL', 'CARVANHA', 'LUVDISC', 'WAILMER'], FISHER: ['BARBOACH', 'CORPHISH', 'CARVANHA'], SAILOR: ['WINGULL', 'MAKUHITA', 'CORPHISH'],
  BIRD_KEEPER: ['TAILLOW', 'SWABLU', 'WINGULL'], PSYCHIC_TR: ['SPOINK', 'RALTS', 'MEDITITE'], CHANNELER: ['SHUPPET', 'DUSKULL'],
  ROCKET: ['POOCHYENA', 'CARVANHA', 'SEVIPER'], BIKER: ['GULPIN', 'SEVIPER', 'NUMEL'], BURGLAR: ['NUMEL', 'SABLEYE', 'POOCHYENA'],
  CUE_BALL: ['MAKUHITA', 'MEDITITE'], BEAUTY: ['SKITTY', 'ROSELIA', 'LUVDISC'], GENTLEMAN: ['SKITTY', 'ZANGOOSE'],
  POKEMANIAC: ['SPINDA', 'KECLEON', 'TRAPINCH'], ENGINEER: ['ELECTRIKE', 'PLUSLE', 'BALTOY'], SUPER_NERD: ['BALTOY', 'NUMEL', 'SOLROCK'],
  GAMBLER: ['SPINDA', 'SKITTY', 'MAWILE'], COOLTRAINER_M: ['ABSOL', 'TRAPINCH', 'ARON'], COOLTRAINER_F: ['SWABLU', 'RALTS', 'ABSOL'],
};
for (const [cls, pool] of Object.entries(THEME)) (D.parties[cls] || []).forEach((t, n) => {
  if (n % 3 !== 1 || t.length < 2) return;
  const i = t.length >> 1;
  if (gen(t[i][1]) !== 1) return;
  t[i] = [t[i][0], stageAt(pool[((n - 1) / 3) % pool.length], t[i][0])];
});

// Elite Four 3, after the Gen 2 rematch: the Hoenn Elite Four and Champion Steven (pokeemerald's first-run teams; Steven's
// from Ruby and Sapphire) 22 levels up, with their movesets where this game has the move or a close stand-in
const E4_3: Record<string, [string, Slot[]]> = {
  SIDNEY: ['SIDNEY', [[46, 'MIGHTYENA', ['ROAR', 'DOUBLE_EDGE', 'SAND_ATTACK', 'CRUNCH']], [48, 'SHIFTRY', ['DOUBLE_TEAM', 'RAZOR_LEAF', 'FAINT_ATTACK', 'SWIFT']],
    [46, 'CACTURNE', ['LEECH_SEED', 'FAINT_ATTACK', 'NEEDLE_ARM', 'PIN_MISSILE']], [48, 'CRAWDAUNT', ['SURF', 'SWORDS_DANCE', 'STRENGTH', 'CRABHAMMER']],
    [49, 'ABSOL', ['AERIAL_ACE', 'ROCK_SLIDE', 'SWORDS_DANCE', 'SLASH']]]],
  PHOEBE: ['PHOEBE', [[48, 'DUSCLOPS', ['SHADOW_PUNCH', 'CONFUSE_RAY', 'NIGHT_SHADE', 'PSYCHIC_M']], [49, 'BANETTE', ['SHADOW_BALL', 'PSYCHIC_M', 'THUNDERBOLT', 'FAINT_ATTACK']],
    [50, 'SABLEYE', ['SHADOW_BALL', 'DOUBLE_TEAM', 'NIGHT_SHADE', 'FAINT_ATTACK']], [49, 'BANETTE', ['SHADOW_BALL', 'PSYCHIC_M', 'THUNDERBOLT', 'CONFUSE_RAY']],
    [51, 'DUSCLOPS', ['SHADOW_BALL', 'ICE_BEAM', 'ROCK_SLIDE', 'EARTHQUAKE']]]],
  GLACIA: ['GLACIA', [[50, 'SEALEO', ['BODY_SLAM', 'AURORA_BEAM', 'BLIZZARD', 'REST']], [50, 'GLALIE', ['LIGHT_SCREEN', 'CRUNCH', 'ICE_BEAM', 'HEADBUTT']],
    [52, 'SEALEO', ['BODY_SLAM', 'SURF', 'BLIZZARD', 'REST']], [52, 'GLALIE', ['CRUNCH', 'ICE_BEAM', 'EARTHQUAKE', 'SHADOW_BALL']],
    [53, 'WALREIN', ['SURF', 'BODY_SLAM', 'ICE_BEAM', 'BLIZZARD']]]],
  DRAKE: ['DRAKE', [[52, 'SHELGON', ['ROCK_TOMB', 'DRAGON_CLAW', 'DOUBLE_EDGE', 'CRUNCH']], [54, 'ALTARIA', ['DRAGON_CLAW', 'EARTHQUAKE', 'AERIAL_ACE', 'AGILITY']],
    [53, 'FLYGON', ['FLAMETHROWER', 'DRAGONBREATH', 'CRUNCH', 'EARTHQUAKE']], [53, 'KINGDRA', ['SURF', 'DRAGONBREATH', 'ICE_BEAM', 'AGILITY']],
    [55, 'SALAMENCE', ['FLAMETHROWER', 'DRAGON_CLAW', 'ROCK_SLIDE', 'CRUNCH']]]],
  STEVEN: ['STEVEN', [[57, 'SKARMORY', ['TOXIC', 'AERIAL_ACE', 'STEEL_WING', 'AGILITY']], [55, 'CLAYDOL', ['REFLECT', 'LIGHT_SCREEN', 'ANCIENTPOWER', 'EARTHQUAKE']],
    [56, 'AGGRON', ['THUNDER', 'EARTHQUAKE', 'SOLARBEAM', 'DRAGON_CLAW']], [56, 'CRADILY', ['GIGA_DRAIN', 'ANCIENTPOWER', 'CONFUSE_RAY', 'RECOVER']],
    [56, 'ARMALDO', ['WATER_PULSE', 'ANCIENTPOWER', 'AERIAL_ACE', 'SLASH']], [58, 'METAGROSS', ['EARTHQUAKE', 'PSYCHIC_M', 'METEOR_MASH', 'SHADOW_BALL']]]],
};
for (const [cls, [name, team]] of Object.entries(E4_3)) {
  D.trainerClasses[cls] = { id: cls, name, money: 9900 };
  D.parties[cls] = [team.map(([lv, sp, moves]) => [lv + 22, sp, moves])];
}
const E4_3_TEXT: Record<string, [string, string, string]> = {
  SIDNEY: ["I'm SIDNEY of the HOENN ELITE FOUR. I came a long way for this.\fYou look like a trainer who won't back down. Good. Let's make it a fight worth remembering!", "Well, how do you like that? I lost!", "Go on, the next room's waiting. Don't let up now."],
  PHOEBE: ["I'm PHOEBE. I trained on a mountain where spirits gather, and my GHOST POKéMON came with me.\fLet's see if you can even touch them!", "Oh, darn. I've gone and lost.", "There's an even colder room ahead. Bundle up!"],
  GLACIA: ["I am GLACIA. I came all this way to find a trainer who could warm my heart.\fBut I'm afraid you'll only find ice here.", "You and your POKéMON... how hot your spirits burn!", "The last of us waits beyond. He is the strongest of us four."],
  DRAKE: ["I am DRAKE, the last of the HOENN ELITE FOUR.\fDRAGON POKéMON answer only to a trainer with the strength to command them.\fDo you know what that takes?", "Superb, it should be said.", "The CHAMPION is waiting for you. He has been for some time."],
  STEVEN: ["I'm STEVEN. I came from HOENN to see the trainer KANTO talks about.\fYou've beaten the ELITE FOUR three times now. I want to see that strength for myself.\fCome! Show me everything you and your POKéMON have!", "I, the CHAMPION, fall in defeat... Kudos to you.", "Your POKéMON have truly earned their place in the HALL OF FAME."],
};
const TEXT = G.TEXT as Record<string, string>;
for (const [cls, [battle, end, after]] of Object.entries(E4_3_TEXT)) Object.assign(TEXT, { ['E4_3_' + cls + '_BATTLE']: battle, ['E4_3_' + cls + '_END']: end, ['E4_3_' + cls + '_AFTER']: after });
const run3 = (cls: string) => ({ cls, n: 1, sprite: cls.toLowerCase(), flag: 'GEN3_BEAT_E4_3', battle: 'E4_3_' + cls + '_BATTLE', end: 'E4_3_' + cls + '_END', after: 'E4_3_' + cls + '_AFTER' });
G.E4_3 = { LoreleisRoom: run3('SIDNEY'), BrunosRoom: run3('PHOEBE'), AgathasRoom: run3('GLACIA'), LancesRoom: run3('DRAKE'), ChampionsRoom: run3('STEVEN') };
