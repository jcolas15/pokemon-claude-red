// @ts-nocheck (plain JS moved into a module; typed file by file, see docs/nextjs-migration.md)
import { game } from '../global';

const G = game();

// Gen 2 additions played under Gen 1 rules (docs/gen2-integration-plan.md): the DARK and STEEL types, a few Gen 2
// attacks mapped onto effects the Gen 1 engine already has, and the evolution items. Gen 2 species come later.
const D = G.DATA;

// every Gen 2 matchup involving DARK or STEEL (pokecrystal data/types/type_matchups.asm); all other pairs stay Gen 1
const H = 0.5;
D.typeChart.push(
  ['NORMAL', 'STEEL', H], ['FIRE', 'STEEL', 2], ['GRASS', 'STEEL', H], ['ICE', 'STEEL', H],
  ['FIGHTING', 'DARK', 2], ['FIGHTING', 'STEEL', 2], ['POISON', 'STEEL', 0], ['GROUND', 'STEEL', 2], ['FLYING', 'STEEL', H],
  ['PSYCHIC_TYPE', 'DARK', 0], ['PSYCHIC_TYPE', 'STEEL', H], ['BUG', 'DARK', 2], ['BUG', 'STEEL', H], ['ROCK', 'STEEL', H],
  ['GHOST', 'DARK', H], ['GHOST', 'STEEL', H], ['DRAGON', 'STEEL', H],
  ['DARK', 'FIGHTING', H], ['DARK', 'PSYCHIC_TYPE', 2], ['DARK', 'GHOST', 2], ['DARK', 'DARK', H], ['DARK', 'STEEL', H],
  ['STEEL', 'FIRE', H], ['STEEL', 'WATER', H], ['STEEL', 'ELECTRIC', H], ['STEEL', 'ICE', 2], ['STEEL', 'ROCK', 2], ['STEEL', 'STEEL', H]);

// [id, Gen 2 index, name, Gen 1 effect, power, type, accuracy, pp]; stats from pokecrystal data/moves/moves.asm.
// Gen 1 has no "raise your own stat" or "lower accuracy" side effect, so STEEL WING, METAL CLAW, ANCIENTPOWER and
// OCTAZOOKA are plain hits.
const MOVES = [
  ['FLAME_WHEEL', 172, 'FLAME WHEEL', 'BURN_SIDE1', 60, 'FIRE', 100, 25],
  ['AEROBLAST', 177, 'AEROBLAST', 'NO_ADDITIONAL', 100, 'FLYING', 95, 5],
  ['POWDER_SNOW', 181, 'POWDER SNOW', 'FREEZE_SIDE1', 40, 'ICE', 100, 25],
  ['FAINT_ATTACK', 185, 'FAINT ATTACK', 'SWIFT', 60, 'DARK', 100, 20],
  ['SLUDGE_BOMB', 188, 'SLUDGE BOMB', 'POISON_SIDE2', 90, 'POISON', 100, 10],
  ['OCTAZOOKA', 190, 'OCTAZOOKA', 'NO_ADDITIONAL', 65, 'WATER', 85, 10],
  ['ZAP_CANNON', 192, 'ZAP CANNON', 'PARALYZE_SIDE2', 100, 'ELECTRIC', 50, 5],
  ['GIGA_DRAIN', 202, 'GIGA DRAIN', 'DRAIN_HP', 60, 'GRASS', 100, 5],
  ['SPARK', 209, 'SPARK', 'PARALYZE_SIDE2', 65, 'ELECTRIC', 100, 20],
  ['STEEL_WING', 211, 'STEEL WING', 'NO_ADDITIONAL', 70, 'STEEL', 90, 25],
  ['SACRED_FIRE', 221, 'SACRED FIRE', 'BURN_SIDE2', 100, 'FIRE', 95, 5],
  ['MEGAHORN', 224, 'MEGAHORN', 'NO_ADDITIONAL', 120, 'BUG', 85, 10],
  ['PURSUIT', 228, 'PURSUIT', 'NO_ADDITIONAL', 40, 'DARK', 100, 20],
  ['IRON_TAIL', 231, 'IRON TAIL', 'DEFENSE_DOWN_SIDE', 100, 'STEEL', 75, 15],
  ['METAL_CLAW', 232, 'METAL CLAW', 'NO_ADDITIONAL', 50, 'STEEL', 95, 35],
  ['CROSS_CHOP', 238, 'CROSS CHOP', 'NO_ADDITIONAL', 100, 'FIGHTING', 80, 5],
  ['TWISTER', 239, 'TWISTER', 'FLINCH_SIDE1', 40, 'DRAGON', 100, 20],
  ['CRUNCH', 242, 'CRUNCH', 'SPECIAL_DOWN_SIDE', 80, 'DARK', 100, 15],
  ['ANCIENTPOWER', 246, 'ANCIENTPOWER', 'NO_ADDITIONAL', 60, 'ROCK', 100, 5],
  ['SHADOW_BALL', 247, 'SHADOW BALL', 'SPECIAL_DOWN_SIDE', 80, 'GHOST', 100, 15],
];
for (const [id, num, name, effect, power, type, acc, pp] of MOVES) {
  D.moves[id] = { id, num, name, effect, power, type, acc, pp };
  D.moveList.push(id);
}

// evolution items: used on a POKéMON from the bag, like the stones (trade and happiness evolutions become item uses)
for (const [id, name, price] of [['SUN_STONE', 'SUN STONE', 2100], ['METAL_COAT', 'METAL COAT', 0], ['KINGS_ROCK', "KING'S ROCK", 0],
  ['DRAGON_SCALE', 'DRAGON SCALE', 0], ['UP_GRADE', 'UP-GRADE', 0]]) D.items[id] = { id, name, price };
D.marts.CeladonMart4FClerkText.push('SUN_STONE');
