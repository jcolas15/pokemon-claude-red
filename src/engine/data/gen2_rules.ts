// @ts-nocheck (plain JS moved into a module; typed file by file, see docs/nextjs-migration.md)
import { game } from '../global';

const G = game();

// Turns the raw Gen 2 species (src/engine/data/gen2.js) into Gen 1 rules (docs/gen2-integration-plan.md): one Special stat,
// Gen 1 moves plus src/engine/data/gen2_core.js's additions, Gen 1 TMs, and item or level evolutions in place of trade and
// happiness. Then adds them to G.DATA and to the Pokédex order, and gives Gen 1 species their Gen 2 evolutions.
const D = G.DATA, RAW = G.GEN2_RAW;

// Special = average of Sp. Atk and Sp. Def, except where that erases what the POKéMON is for
const SPECIAL = { BLISSEY: 135, SHUCKLE: 230 };

// Gen 2 moves with no Gen 1 counterpart: the nearest Gen 1 move, or null to drop it (weather, PROTECT, BATON PASS…)
const MOVE = {
  SAFEGUARD: 'MIST', SCARY_FACE: 'LEER', SKETCH: 'MIMIC', SYNTHESIS: 'RECOVER', MORNING_SUN: 'RECOVER', MOONLIGHT: 'RECOVER',
  MILK_DRINK: 'SOFTBOILED', CHARM: 'GROWL', SWEET_KISS: 'SUPERSONIC', COTTON_SPORE: 'STRING_SHOT', SANDSTORM: 'SAND_ATTACK',
  FUTURE_SIGHT: 'PSYCHIC_M', ROLLOUT: 'ROCK_THROW', ENCORE: 'DISABLE', SPITE: 'DISABLE', RAPID_SPIN: 'TACKLE',
  TRIPLE_KICK: 'DOUBLE_KICK', FALSE_SWIPE: 'CUT', MIRROR_COAT: 'COUNTER', CONVERSION2: 'CONVERSION', HIDDEN_POWER: 'PSYWAVE',
  PRESENT: 'METRONOME', // a random gift either way
  RAIN_DANCE: null, SUNNY_DAY: null, BATON_PASS: null, MEAN_LOOK: null, SPIDER_WEB: null, FLAIL: null, REVERSAL: null,
  PERISH_SONG: null, ENDURE: null, DETECT: null, PROTECT: null, FORESIGHT: null, SPIKES: null, SWAGGER: null, SNORE: null,
  LOCK_ON: null, HEAL_BELL: null, SWEET_SCENT: null, PSYCH_UP: null, CURSE: null, PAIN_SPLIT: null, DESTINY_BOND: null,
  BEAT_UP: null,
};
// happiness evolutions become level-ups; Espeon and Umbreon come from stones on Eevee
const HAPPY_LEVEL = { PICHU: 15, CLEFFA: 15, IGGLYBUFF: 15, TOGEPI: 15, GOLBAT: 40, CHANSEY: 45 };
const TIME_STONE = { MORNDAY: 'SUN_STONE', NITE: 'MOON_STONE' };

const tms = new Set(D.tmMoves.concat(D.hmMoves));
const moveOf = m => (m in MOVE ? MOVE[m] : D.moves[m] ? m : null);
function evo(e, from) {
  switch (e.kind) {
    case 'LEVEL': return { type: 'level', level: e.level, to: e.to };
    case 'ITEM': return { type: 'item', item: e.item, to: e.to };
    case 'TRADE': return e.item ? { type: 'item', item: e.item, to: e.to } : { type: 'trade', to: e.to };
    case 'STAT': return { type: 'stat', level: e.level, cmp: e.cmp, to: e.to };
    case 'HAPPINESS':
      if (TIME_STONE[e.when]) return { type: 'item', item: TIME_STONE[e.when], to: e.to };
      if (!HAPPY_LEVEL[from]) throw new Error('no level set for ' + from + "'s happiness evolution");
      return { type: 'level', level: HAPPY_LEVEL[from], to: e.to };
  }
  throw new Error('unknown evolution kind ' + e.kind);
}

for (const r of Object.values(RAW.species)) {
  const seen = new Set(), moves1 = [], learn = [];
  for (const [lv, m0] of r.learn) {
    const m = moveOf(m0); if (!m || seen.has(m)) continue;
    seen.add(m);
    if (lv <= 1) moves1.push(m); else learn.push([lv, m]);
  }
  D.species[r.id] = {
    id: r.id, name: r.name, hp: r.hp, atk: r.atk, def: r.def, spd: r.spd,
    spc: SPECIAL[r.id] || Math.round((r.spa + r.sdf) / 2),
    types: r.types, catchRate: r.catchRate, baseExp: r.baseExp,
    moves1: moves1.slice(-4), growth: r.growth,
    tmhm: r.tmhm.filter(m => tms.has(m)),
    evos: r.evos.map(e => evo(e, r.id)), learn,
    dex: r.dex, cat: r.cat, ht: r.ht, wt: r.wt,
  };
  D.dexOrder[r.dex] = r.id;
}
for (const [from, list] of Object.entries(RAW.gen1Evos)) for (const e of list) D.species[from].evos.push(evo(e, from));
delete G.GEN2_RAW;
