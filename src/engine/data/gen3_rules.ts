// Turns the raw Gen 3 species (src/engine/data/gen3.ts) into this game's rules (docs/gen3-integration-plan.md): one
// Special stat, the existing moves plus src/engine/data/gen3_core.ts's additions, Gen 1 TMs, and item or level
// evolutions in place of trade, happiness and beauty. Then adds them to G.DATA and the Pokédex order.
import { game } from '../global';

type RawEvo = { kind: string; level?: number; item?: string; to: string };
type Raw = {
  id: string; name: string; dex: number; hp: number; atk: number; def: number; spd: number; spa: number; sdf: number;
  types: string[]; catchRate: number; baseExp: number; growth: string; tmhm: string[]; evos: RawEvo[]; learn: [number, string][];
  cat: string; ht: [number, number]; wt: number;
};
type Evo = { type: string; to: string; level?: number; item?: string; parity?: number; extra?: string };
type Species = Omit<Raw, 'spa' | 'sdf' | 'evos' | 'learn'> & {
  spc: number; moves1: string[]; learn: [number, string][]; evos: Evo[]; ability?: string; fixedHp?: number;
};
const G = game();
const D = G.DATA as { species: Record<string, Species>; moves: Record<string, unknown>; dexOrder: string[]; tmMoves: string[]; hmMoves: string[] };
const RAW = (G.GEN3_RAW as { species: Record<string, Raw> }).species;

// Special = average of Sp. Atk and Sp. Def, unless that erases what the POKéMON is for (none needed so far)
const SPECIAL: Record<string, number> = {};

// Gen 2-3 moves this game doesn't have: the nearest move here, or null to drop it (weather, PROTECT, BATON PASS…)
const MOVE: Record<string, string | null> = {
  SCARY_FACE: 'LEER', CHARM: 'GROWL', SAFEGUARD: 'MIST', FUTURE_SIGHT: 'PSYCHIC_M', ENCORE: 'DISABLE', SPITE: 'DISABLE',
  SANDSTORM: 'SAND_ATTACK', SYNTHESIS: 'RECOVER', MOONLIGHT: 'RECOVER', MORNING_SUN: 'RECOVER',
  SLACK_OFF: 'RECOVER', SWALLOW: 'RECOVER', WISH: 'SOFTBOILED', ROLLOUT: 'ROCK_THROW', RAPID_SPIN: 'TACKLE',
  FALSE_SWIPE: 'CUT', MIRROR_COAT: 'COUNTER', HIDDEN_POWER: 'PSYWAVE', SWEET_KISS: 'SUPERSONIC', FLATTER: 'SUPERSONIC',
  COTTON_SPORE: 'STRING_SHOT', ASSIST: 'METRONOME', NATURE_POWER: 'SWIFT', WEATHER_BALL: 'SWIFT',
  // stat moves become their Gen 1 cousins
  HOWL: 'MEDITATE', BULK_UP: 'MEDITATE', IRON_DEFENSE: 'ACID_ARMOR', COSMIC_POWER: 'BARRIER', STOCKPILE: 'DEFENSE_CURL',
  CALM_MIND: 'GROWTH', TAIL_GLOW: 'GROWTH', BELLY_DRUM: 'SWORDS_DANCE', DRAGON_DANCE: 'AGILITY', METAL_SOUND: 'SCREECH',
  TICKLE: 'TAIL_WHIP', GRASS_WHISTLE: 'SLEEP_POWDER', TEETER_DANCE: 'CONFUSE_RAY', WILL_O_WISP: 'CONFUSE_RAY',
  // attacks become the nearest attack of the same type
  UPROAR: 'HEADBUTT', COVET: 'TACKLE', FAKE_OUT: 'QUICK_ATTACK', EXTREME_SPEED: 'QUICK_ATTACK', SMELLING_SALT: 'HEADBUTT',
  SPIT_UP: 'BODY_SLAM', ENDEAVOR: 'SUPER_FANG', KNOCK_OFF: 'PURSUIT', THIEF: 'PURSUIT', FURY_CUTTER: 'TWINEEDLE',
  SILVER_WIND: 'SIGNAL_BEAM', WHIRLPOOL: 'CLAMP', WATER_SPOUT: 'HYDRO_PUMP', ERUPTION: 'FIRE_BLAST', MAGNITUDE: 'BONE_CLUB',
  SAND_TOMB: 'MUD_SHOT', SHEER_COLD: 'BLIZZARD', ICY_WIND: 'AURORA_BEAM', ICE_BALL: 'POWDER_SNOW', ARM_THRUST: 'DOUBLE_KICK',
  VITAL_THROW: 'KARATE_CHOP', MACH_PUNCH: 'KARATE_CHOP', SUPERPOWER: 'SUBMISSION', DYNAMIC_PUNCH: 'SUBMISSION',
  FOCUS_PUNCH: 'SUBMISSION', EXTRASENSORY: 'PSYBEAM', POISON_FANG: 'ACID', BOUNCE: 'FLY', OUTRAGE: 'THRASH',
  PROTECT: null, DETECT: null, ENDURE: null, MUD_SPORT: null, WATER_SPORT: null, ODOR_SLEUTH: null, FORESIGHT: null,
  CURSE: null, SWAGGER: null, TAUNT: null, TORMENT: null, FLAIL: null, REVERSAL: null, SWEET_SCENT: null, YAWN: null,
  HELPING_HAND: null, SNORE: null, SLEEP_TALK: null, MIND_READER: null, LOCK_ON: null, BATON_PASS: null, INGRAIN: null,
  REFRESH: null, HAIL: null, RAIN_DANCE: null, SUNNY_DAY: null, ATTRACT: null, PSYCH_UP: null, CHARGE: null, IMPRISON: null,
  GRUDGE: null, MEAN_LOOK: null, BLOCK: null, PERISH_SONG: null, HEAL_BELL: null, AROMATHERAPY: null, FAKE_TEARS: null,
  MAGIC_COAT: null, SPIKES: null, SNATCH: null, DESTINY_BOND: null, MEMENTO: null,
};
// happiness becomes a level; beauty and trade items become items used from the bag
const HAPPY_LEVEL: Record<string, number> = { AZURILL: 15 };
// Gen 3's two extra growth curves, as the nearest of this game's four
const GROWTH: Record<string, string> = { ERRATIC: 'FAST', FLUCTUATING: 'SLOW' };
// the only abilities this game keeps (docs/gen3-integration-plan.md, "Exceptions")
const EXTRA: Record<string, Partial<Species>> = { SLAKING: { ability: 'TRUANT' }, SHEDINJA: { ability: 'WONDER_GUARD', fixedHp: 1 } };

const tms = new Set(D.tmMoves.concat(D.hmMoves));
const moveOf = (m: string) => (m in MOVE ? MOVE[m] : D.moves[m] ? m : null);
function evo(e: RawEvo, from: string): Evo | null {
  switch (e.kind) {
    case 'LEVEL': return { type: 'level', level: e.level, to: e.to };
    case 'ITEM': case 'TRADE_ITEM': return { type: 'item', item: e.item, to: e.to };
    case 'BEAUTY': return { type: 'item', item: 'BEAUTY_SCALE', to: e.to };
    case 'LEVEL_SILCOON': return { type: 'dv', level: e.level, parity: 0, to: e.to };
    case 'LEVEL_CASCOON': return { type: 'dv', level: e.level, parity: 1, to: e.to };
    case 'LEVEL_NINJASK': return { type: 'level', level: e.level, to: e.to, extra: 'SHEDINJA' };
    case 'LEVEL_SHEDINJA': return null; // the free Shedinja rides on the Ninjask evolution above
    case 'FRIENDSHIP':
      if (!HAPPY_LEVEL[from]) throw new Error('no level set for ' + from + "'s happiness evolution");
      return { type: 'level', level: HAPPY_LEVEL[from], to: e.to };
  }
  throw new Error('unknown evolution kind ' + e.kind);
}

for (const r of Object.values(RAW)) {
  const seen = new Set<string>(), moves1: string[] = [], learn: [number, string][] = [];
  for (const [lv, m0] of r.learn) {
    const m = moveOf(m0); if (!m || seen.has(m)) continue;
    seen.add(m);
    if (lv <= 1) moves1.push(m); else learn.push([lv, m]);
  }
  D.species[r.id] = {
    id: r.id, name: r.name, hp: r.hp, atk: r.atk, def: r.def, spd: r.spd,
    spc: SPECIAL[r.id] || Math.round((r.spa + r.sdf) / 2),
    types: r.types, catchRate: r.catchRate, baseExp: r.baseExp,
    moves1: moves1.slice(-4), growth: GROWTH[r.growth] || r.growth,
    tmhm: r.tmhm.filter(m => tms.has(m)),
    evos: r.evos.map(e => evo(e, r.id)).filter((e): e is Evo => !!e), learn,
    dex: r.dex, cat: r.cat, ht: r.ht, wt: r.wt,
    ...EXTRA[r.id],
  };
  D.dexOrder[r.dex] = r.id;
}
delete G.GEN3_RAW;
