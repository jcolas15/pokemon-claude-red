// Gen 3 additions played under the game's Gen 1 rules (docs/gen3-integration-plan.md, Phase 1): Gen 3 attacks mapped
// onto effects the engine already has, and the items that replace trade and beauty evolutions. Species come in Phase 2.
import { game } from '../global';

type Move = { id: string; num: number; name: string; effect: string; power: number; type: string; acc: number; pp: number; highCrit?: boolean };
type Item = { id: string; name: string; price: number; evo?: boolean };
const D = game().DATA as { moves: Record<string, Move>; moveList: string[]; items: Record<string, Item> };

// [id, Gen 3 index, name, Gen 1 effect, power, type, accuracy, pp, high critical-hit ratio]; stats from pokeemerald
// src/data/battle_moves.h. Gen 1 has no self-boost, accuracy-drop or recoil-on-self side effects, so moves built on
// those (Meteor Mash, Muddy Water, Overheat, Psycho Boost) are plain hits; Doom Desire hits at once.
const MOVES: [string, number, string, string, number, string, number, number, boolean?][] = [
  // two Gen 2 attacks that Hoenn lines depend on (Bagon and Altaria; Barboach's only early attack)
  ['MUD_SLAP', 189, 'MUD-SLAP', 'NO_ADDITIONAL', 20, 'GROUND', 100, 10],
  ['DRAGONBREATH', 225, 'DRAGONBREATH', 'PARALYZE_SIDE2', 60, 'DRAGON', 100, 20],
  ['HEAT_WAVE', 257, 'HEAT WAVE', 'BURN_SIDE1', 100, 'FIRE', 90, 10],
  ['LUSTER_PURGE', 295, 'LUSTER PURGE', 'SPECIAL_DOWN_SIDE', 70, 'PSYCHIC_TYPE', 100, 5],
  ['MIST_BALL', 296, 'MIST BALL', 'SPECIAL_DOWN_SIDE', 70, 'PSYCHIC_TYPE', 100, 5],
  ['BLAZE_KICK', 299, 'BLAZE KICK', 'BURN_SIDE1', 85, 'FIRE', 90, 10, true],
  ['NEEDLE_ARM', 302, 'NEEDLE ARM', 'FLINCH_SIDE2', 60, 'GRASS', 100, 15],
  ['HYPER_VOICE', 304, 'HYPER VOICE', 'NO_ADDITIONAL', 90, 'NORMAL', 100, 10],
  ['CRUSH_CLAW', 306, 'CRUSH CLAW', 'DEFENSE_DOWN_SIDE', 75, 'NORMAL', 95, 10],
  ['METEOR_MASH', 309, 'METEOR MASH', 'NO_ADDITIONAL', 100, 'STEEL', 85, 10],
  ['ASTONISH', 310, 'ASTONISH', 'FLINCH_SIDE2', 30, 'GHOST', 100, 15],
  ['AIR_CUTTER', 314, 'AIR CUTTER', 'NO_ADDITIONAL', 55, 'FLYING', 95, 25, true],
  ['OVERHEAT', 315, 'OVERHEAT', 'NO_ADDITIONAL', 140, 'FIRE', 90, 5],
  ['ROCK_TOMB', 317, 'ROCK TOMB', 'SPEED_DOWN_SIDE', 50, 'ROCK', 80, 10],
  ['SIGNAL_BEAM', 324, 'SIGNAL BEAM', 'CONFUSION_SIDE', 75, 'BUG', 100, 15],
  ['SHADOW_PUNCH', 325, 'SHADOW PUNCH', 'SWIFT', 60, 'GHOST', 100, 20],
  ['SKY_UPPERCUT', 327, 'SKY UPPERCUT', 'NO_ADDITIONAL', 85, 'FIGHTING', 90, 15],
  ['MUDDY_WATER', 330, 'MUDDY WATER', 'NO_ADDITIONAL', 95, 'WATER', 85, 10],
  ['BULLET_SEED', 331, 'BULLET SEED', 'TWO_TO_FIVE_ATTACKS', 10, 'GRASS', 100, 30],
  ['AERIAL_ACE', 332, 'AERIAL ACE', 'SWIFT', 60, 'FLYING', 100, 20],
  ['ICICLE_SPEAR', 333, 'ICICLE SPEAR', 'TWO_TO_FIVE_ATTACKS', 10, 'ICE', 100, 30],
  ['DRAGON_CLAW', 337, 'DRAGON CLAW', 'NO_ADDITIONAL', 80, 'DRAGON', 100, 15],
  ['MUD_SHOT', 341, 'MUD SHOT', 'SPEED_DOWN_SIDE', 55, 'GROUND', 95, 15],
  ['POISON_TAIL', 342, 'POISON TAIL', 'POISON_SIDE1', 50, 'POISON', 100, 25, true],
  ['MAGICAL_LEAF', 345, 'MAGICAL LEAF', 'SWIFT', 60, 'GRASS', 100, 20],
  ['LEAF_BLADE', 348, 'LEAF BLADE', 'NO_ADDITIONAL', 70, 'GRASS', 100, 15, true],
  ['ROCK_BLAST', 350, 'ROCK BLAST', 'TWO_TO_FIVE_ATTACKS', 25, 'ROCK', 80, 10],
  ['SHOCK_WAVE', 351, 'SHOCK WAVE', 'SWIFT', 60, 'ELECTRIC', 100, 20],
  ['WATER_PULSE', 352, 'WATER PULSE', 'CONFUSION_SIDE', 60, 'WATER', 100, 20],
  ['DOOM_DESIRE', 353, 'DOOM DESIRE', 'NO_ADDITIONAL', 120, 'STEEL', 85, 5],
  ['PSYCHO_BOOST', 354, 'PSYCHO BOOST', 'NO_ADDITIONAL', 140, 'PSYCHIC_TYPE', 90, 5],
];
for (const [id, num, name, effect, power, type, acc, pp, highCrit] of MOVES) {
  D.moves[id] = { id, num, name, effect, power, type, acc, pp, ...(highCrit ? { highCrit } : {}) };
  D.moveList.push(id);
}

// used on a POKéMON from the bag, like the stones: Clamperl's trade items, and Feebas's Beauty Scale (no beauty stat)
for (const [id, name] of [['DEEP_SEA_TOOTH', 'DEEPSEATOOTH'], ['DEEP_SEA_SCALE', 'DEEPSEASCALE'], ['BEAUTY_SCALE', 'BEAUTY SCALE']]) {
  D.items[id] = { id, name, price: 0, evo: true };
}
