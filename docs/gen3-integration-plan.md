# Gen 3 Pokémon in Claude Red — implementation plan

Adds the 135 Hoenn Pokémon (#252–386) to Kanto the way [Gen 2 went in](gen2-integration-plan.md): under the game's
current Gen 1-style rules, one Pokédex to 386, mixed into the wild and trainer teams, plus a third post-game Elite Four.
The decisions below were confirmed with the owner on 2026-10-17.

## Decisions (confirmed)

| Topic | Decision |
|---|---|
| Rules | The current rules: Gen 1 formulas, one Special stat, no abilities, natures, held-item battle effects, weather or double battles |
| Exceptions | **Slaking keeps Truant** (acts every other turn) and **Shedinja keeps Wonder Guard** (only super-effective hits land). Nothing else gets an ability |
| Types | No new types (Gen 3 has none). Gen 3 typings use the existing Dark and Steel |
| Species | **All 135**, legendaries and mythicals included |
| Pokédex | **One 386-entry dex** |
| Wild | **Thirds:** about a third each of Gen 1, Gen 2 and Gen 3 in every area; slot 0 keeps the area's Gen 1 staple |
| Trainers | Same pattern as Gen 2: each gym leader adds one Gen 3 Pokémon of the gym type and keeps the ace; every gym trainer carries one; the rival adds one per fight; route trainers mix them in by theme. A full team (6) swaps a non-ace Gen 1 member |
| Starters | **Gift:** Oak's aide in Vermilion offers Treecko, Torchic or Mudkip after the Thunder Badge |
| Other specials | Babies (Azurill, Wynaut) are NPC gifts; Lileep and Anorith join the Mt. Moon fossil choice; trade evolutions become items you use |
| Elite Four 3 | **After beating the Gen 2 rematch:** Sidney → Phoebe → Glacia → Drake → **Champion Steven**, levels above the Gen 2 rematch |
| Post-game legendaries | After the third Hall of Fame: Kyogre, Groudon, Rayquaza, Regirock, Regice, Registeel, Latias, Latios, Jirachi, Deoxys |
| Art | All 135 drawn in the game's pixel style, in batches in the order players meet them, legendaries last. Placeholder sprite until drawn; each joins the silhouette quiz when its drawing lands |
| Delivery | Each phase is deployed when it lands, so it can be played on the phone right away |

## Out of scope

Abilities (beyond Slaking and Shedinja), natures, double battles, contests, weather, held-item battle effects, Hoenn
maps or story, Gen 4 and later, and new types.

## Assumptions to confirm or change

These follow from the decisions above. Each can be changed cheaply before its phase starts.

1. **Special stat:** `spc = round((SpA + SpD) / 2)`, the Gen 2 formula, with hand overrides where the average breaks a
   Pokémon's role (likely candidates: Shuckle-style walls, Deoxys, Wailord). Reviewed in Phase 2.
2. **Shedinja's HP is always 1**, as in Gen 3. The Gen 1 HP formula would otherwise give it about 20.
3. **Moves:** the current move list plus about 20 Gen 3 attacking moves that only need effect handlers the engine
   already has, so the main lines have their signature attacks. Candidates include Shadow Ball's Gen 3 neighbours
   (Shadow Punch: never misses), Water Pulse, Leaf Blade (high crit), Blaze Kick (high crit, may burn), Sky Uppercut,
   Aerial Ace (never misses), Shock Wave (never misses), Muddy Water, Mud Shot, Rock Tomb, Dragon Claw, Meteor Mash,
   Bullet Seed, Icicle Spear, Signal Beam, Psycho Boost, Doom Desire, Water Spout, Eruption, Overheat. Everything
   else in Gen 3 learnsets is remapped to the nearest existing move or dropped, as Gen 2 did.
4. **Evolutions that need a Gen 3 mechanic:**
   - **Trade with an item:** Clamperl uses **Deep Sea Tooth** (Huntail) or **Deep Sea Scale** (Gorebyss) from the bag.
   - **Happiness:** Azurill becomes a level-up (Lv 15, like the Gen 2 babies).
   - **Beauty:** Feebas evolves into Milotic with a new **Beauty Scale** item, hidden somewhere fitting.
   - **Wurmple:** Silcoon or Cascoon picked from the Pokémon's DVs (Gen 3 used a hidden value the game doesn't have),
     so the same Wurmple always goes the same way.
   - **Nincada:** at Lv 20 becomes Ninjask and, if the party has room, a Shedinja appears too.
   - **Stones:** Skitty (Moon Stone), Nuzleaf (Leaf Stone) and Lombre (Water Stone) use the stones the game already sells.
5. **Elite Four 3 levels:** the Hoenn Elite Four's teams raised to about Lv 70–80, above the Gen 2 rematch (Lv 60–70).
6. **Rotation at Indigo Plateau:** after the Gen 2 rematch is beaten, the rooms run the Hoenn Elite Four from then on.
   (An option to choose which Elite Four to face each visit was offered earlier and can be added later.)
7. **Legendary encounters:** Latias and Latios **roam** like the beasts (they roam in Ruby and Sapphire). The others are
   one-off static encounters at Lv 70, placed at fitting Kanto spots (for example Kyogre in Seafoam Islands, Groudon in
   the Cinnabar volcano area, Rayquaza at the top of a tower, the Regis in three caves, Jirachi and Deoxys as
   Celebi-style rarities). Exact spots are settled in Phase 5.
8. **Diploma:** all 386 except the four mythicals: Mew, Celebi, Jirachi and Deoxys.
9. **Deoxys:** its Normal Forme only.

## Architecture: overlay, as with Gen 2

Nothing generated from pokered or pokecrystal is edited. Gen 3 adds its own files, merged into `G.DATA` at load time and
imported in `src/engine/engine.ts` after the Gen 2 files:

| File | Contents | Produced by |
|---|---|---|
| `tools/convert_gen3.js` | Reads a local pokeemerald checkout (`vendor/pokeemerald`, git-ignored) and emits `src/engine/data/gen3.ts`; lints the loaded result | new tool, modelled on `tools/convert_gen2.js` but parsing pokeemerald's C headers (`species_info.h`, level-up and TM learnsets, `evolution.h`, dex text) |
| `src/engine/data/gen3_core.ts` | The added moves, new items (Deep Sea Tooth/Scale, Beauty Scale) and where they are sold or hidden | hand-written |
| `src/engine/data/gen3.ts` | 135 species in Gen 3's own terms | generated |
| `src/engine/data/gen3_rules.ts` | Gen 1 rules at load time: Special average and overrides, move remap, happiness levels, item evolutions, Wurmple and Nincada handling, Shedinja's HP, the Slaking and Shedinja exceptions flagged for the battle engine | hand-written |
| `src/engine/data/gen3_world.ts` | Wild pools (thirds), trainer additions, gifts, Elite Four 3 parties, legendary placements | hand-written |
| `src/engine/data/mons/252-281.ts` … `372-386.ts` | Sprite definitions (typed, `art/mondef.ts`) | hand-written |
| `src/engine/data/text/dex_gen3.ts` | 135 Pokédex entries, written fresh | hand-written |

New engine code is typed from the start (`CLAUDE.md`).

## Phases

Every phase ends with `pnpm typecheck`, `pnpm lint`, `pnpm test`, a clean build, the strategy guide updated, a
production deploy, and the phase marked done here.

### Phase 1: engine and rules — done

Landed 2026-10-18:
- `src/engine/data/gen3_core.ts` (typed): 29 Gen 3 attacks on existing effects, with a `highCrit` flag on the move
  data that the battle engine now reads (Leaf Blade, Blaze Kick, Air Cutter, Poison Tail), and the evolution items
  Deep Sea Tooth, Deep Sea Scale and Beauty Scale (`evo: true`, so the bag treats them like stones).
- Species flags for Phase 2 to set: `ability: 'TRUANT' | 'WONDER_GUARD'`, `fixedHp: 1`, the `dv` evolution kind
  (Wurmple, by the Attack DV's parity) and `extra` on a level evolution (Nincada's Shedinja, added by `G.evolve` when
  the party has room, with the same level, DVs and moves).
- `tests/gen3-mechanics.test.js` covers all of it with test species; removing either ability makes its test fail.

The original Phase 1 plan:

- Truant and Wonder Guard in `src/engine/game/battle.ts`, keyed by a species flag, so only Slaking and Shedinja ever use them.
- The added moves and new items (`gen3_core.ts`).
- Shedinja's fixed 1 HP; the Nincada split; Wurmple's DV-based branch.
- **Done when:** new tests cover Truant (Slaking acts every other turn), Wonder Guard (only super-effective damage, Fire
  and Flying etc. land, Normal does nothing), Shedinja's HP, both Nincada outcomes and a stable Wurmple branch.

### Phase 2: data — done

Landed 2026-10-18:
- `tools/convert_gen3.js` reads `vendor/pokeemerald` (cloned shallow, git-ignored) and writes `src/engine/data/gen3.ts`;
  `--report` lists learnset moves this game lacks (111 of them). Its lint checks the loaded result: starting moves, an
  attack by Lv 10 (14 listed exceptions such as Azurill, Feebas and the cocoons), types, evolutions, growth rates,
  names and Pokédex position.
- `src/engine/data/gen3_rules.ts` (typed): Special as the average (no overrides needed), the move remap (support moves
  dropped, attacks mapped to the nearest move of the same type), Erratic growth as Fast and Fluctuating as Slow, Azurill
  at Lv 15, the item, Wurmple and Nincada evolutions, and Truant / Wonder Guard / Shedinja's 1 HP.
- Mud-Slap and DragonBreath were added as real moves (Barboach's only early attack; the Bagon and Altaria lines).
- `src/engine/data/text/dex_gen3.ts`: 135 Pokédex entries, written fresh.
- Part of Phase 6 came forward because the Pokédex is already 386 long: Oak's ratings to 386, the diploma (all but Mew,
  Celebi, Jirachi and Deoxys), share milestones and link validation to 386, and the Battle Tower only uses POKéMON with
  a drawing (so Gen 3 joins it as Phase 3 lands) and never the Gen 3 legendaries.
- Tests: `tests/gen3-species.test.js` (all 135 build, every special evolution, abilities, saving); the Pokédex and Gen 2
  world tests now cover 386 and ignore baby evolutions when checking wild levels (Azurill made Marill a Lv 15 evolution).
- Guide: generation numbers instead of a Gen 2 flag, header counts 151 + 100 + 135, a Gen 3 evolutions table, and the
  Special-stat note covers Gen 3.

The original Phase 2 plan:


- `tools/convert_gen3.js` and the generated `gen3.ts`; `gen3_rules.ts` (Special, remaps, evolutions).
- Dex text for all 135.
- **Done when:** all 135 build at Lv 1–100 with moves and valid stats, every evolution path works, a Gen 3 party
  survives save and load and passes backup-import validation (extending `tests/gen2-species.test.js` or a Gen 3 copy).

### Phase 3: art — done

- Batch 1 landed 2026-10-18: #252–281 (Treecko through Kirlia) in `src/engine/data/mons/252-261.ts`, `262-271.ts` and
  `272-281.ts`. They join the quiz and the Battle Tower, and the guide's Gen 3 intro counts drawings from the game data.
- Batch 2 landed 2026-10-18: #282–311 (Gardevoir through Plusle) in `282-291.ts`, `292-301.ts` and `302-311.ts`.
- Batches 3–5 landed 2026-10-18: #312–386 (Minun through Deoxys, legendaries included) in eight files of ten,
  `312-321.ts` … `382-386.ts`. Every species has art, so the quiz pool is all 386 and the legendaries on the map show
  their own sprite instead of the bird.

- 135 drawings in five batches, reviewed with `node tools/monsheet.js`: #252–281 (starters, early routes), 282–311,
  312–341, 342–371, 372–386 (pseudo-legendaries and legendaries). Back views are generated.
- A Pokémon without a drawing keeps the placeholder sprite and stays out of the quiz.
- **Done when:** every species has art and the quiz pool is all 386.

### Phase 4: world integration — done

Landed 2026-10-18:
- `src/engine/data/gen3_world.ts` (typed): Gen 3 pools for 60+ areas. `gen2_world.ts` now exports its pools and the mixer
  (`G.WILD_GEN2`, `G.mixWild`) instead of applying them, and the mixer splits each area by whichever generation is
  behind. Average share Gen 1/2/3 is 37/31/32; slot 0, rare Gen 1 species and every Gen 1 and Gen 2 species stay wild.
  Bagon and Beldum get rare Rock Tunnel slots (Lv 15 and 18) because Victory Road comes too late for them.
- Surfing on Routes 19–21 adds Wingull, Carvanha, Wailmer, Luvdisc and Relicanth; the Super Rod adds Corphish,
  Barboach, Carvanha, Wailmer, Luvdisc, Feebas (Routes 12–13), Clamperl (Seafoam, Cinnabar) and Relicanth.
- Trainers: every leader gets one Gen 3 POKéMON of their type (Nosepass, Corphish, Electrike, Roselia, Seviper, Grumpig,
  Torkoal, Flygon), every gym trainer one of the gym type, the rival a Hoenn starter from Route 22 on (it covers his
  starter's weakness), and every third team of themed route classes swaps a Gen 1 middle member. Full teams swap a
  Gen 1 non-ace, preferring one that shares a type, so aces and Gen 2 additions stay.
- `src/engine/scripts/gen3.ts` (typed): Treecko/Torchic/Mudkip from Oak's aide in the Route 11 gate after the Thunder
  Badge; Azurill (Cerulean Pokémon Center) and Wynaut (Lavender); Root and Claw Fossils hidden on Mt. Moon B2F rather
  than added to the fossil choice (Cinnabar Lab revives them); DeepSeaTooth, DeepSeaScale and Beauty Scale hidden.
- Tests: `tests/gen3-world.test.js` (125 non-legendary species obtainable, thirds, trainer teams, gifts once, hidden
  items, fossils); `tests/wild-grass.test.js` now expects about two thirds Gen 2 + Gen 3. `tools/gymsim.js` has Gen 3
  swaps: Shroomish fixes Brock for a Charmander start (25% → 95%) much as Gen 1 options do, and nothing else jumps. The
  new trainer members make Erika, Sabrina and the mid-game rival noticeably harder (e.g. Erika 43% → 24%, rival on the
  S.S. Anne 17% → 8% for a Gen 1 team): left for Phase 7.
- Guide: Gifts, Fossils and Items panels in the Gen 3 section, the Catch finder lists Gen 3 encounters with GEN 3 tags,
  and the walkthrough names the Gen 3 species, gifts and items area by area; gym and rival intros mention Gen 3.

The original Phase 4 plan:

- **Wild thirds:** generalise `addGen2` in `gen2_world.ts` into one pass that gives each area a Gen 2 pool and a Gen 3
  pool, targeting about a third of the encounter odds each. Slot 0 and rare Gen 1 species (5% or less) stay as they are.
  Every Gen 1 and Gen 2 species must stay catchable somewhere (the test already enforces it for all 251).
- Fishing and surfing tables get Gen 3 water Pokémon (Wingull, Carvanha, Wailmer, Corphish, Barboach and others).
- **Trainers:** gym leaders, gym trainers, rival (one per fight from Route 22 on) and themed route trainers, with full
  teams swapping a non-ace Gen 1 member.
- **Gifts:** the Hoenn starter from Oak's aide in Vermilion (after the Thunder Badge), Azurill and Wynaut from NPCs,
  Lileep and Anorith in the Mt. Moon fossil choice.
- **Done when:** every Gen 3 species is obtainable (extending the obtainability test to 386), wild share is about a
  third per generation, and `tools/gymsim.js` shows no Gen 3 catch trivialising an early gym.

### Phase 5: Elite Four 3 and the post-game — done

Landed 2026-10-18:
- `src/engine/data/gen3_world.ts`: Sidney, Phoebe, Glacia and Drake (pokeemerald's first-run teams) and Champion Steven
  (his Ruby/Sapphire team) 22 levels up, Lv 68–80, with their movesets where the game has the move or a close stand-in.
  `G.E4_3` puts them in the rooms once `GEN2_BEAT_E4_2` is set; `scripts/late.ts` picks the run, and beating Steven sets
  `GEN3_BEAT_E4_3` and goes on to the HALL OF FAME. Overworld looks (`data/cast.ts`), portraits (`art/trainerpics.ts`),
  boss names and items (`game/battleflow.ts`) and share-card colours (`game/share.ts`) for all five.
- `src/engine/scripts/gen3.ts`: after Steven, Latias and Latios roam (Lv 70, from Routes 12 and 16) and eight statics
  appear at Lv 70 in dead ends: Kyogre (Seafoam B3F), Groudon (Pokémon Mansion B1F), Rayquaza (Silph Co. 11F, as the
  "top of a tower"; the Celadon rooftop has no dead end), Regirock (Rock Tunnel B1F), Regice (Seafoam B4F), Registeel
  (Power Plant), Jirachi (Mt. Moon 1F) and Deoxys (Mt. Moon B2F). Until Phase 3 draws them they show the bird sprite.
- Tests: `tests/elite-four-3.test.js` (teams, portraits, a run through all five rooms, the legendaries appearing only
  after Steven); `tests/gen3-world.test.js` now requires all 135 Gen 3 species to be obtainable.
- Guide: Elite Four 3 cards with advice in the Elite Four section, the Hoenn legendaries in the Legendaries table, a
  walkthrough step after the Hall of Fame, and the Gen 3 intro and roaming panel updated.

The original Phase 5 plan:

- Sidney, Phoebe, Glacia, Drake and Champion Steven with their Hoenn teams at about Lv 70–80; battle portraits and
  overworld sprites for all five; the room rotation after the Gen 2 rematch.
- Legendaries released after the third Hall of Fame: Latias and Latios roaming, the rest static.
- **Done when:** a test plays through all five rooms (as `tests/elite-four-2.test.js` does) and the post-game unlocks.

### Phase 6: Pokédex and meta (386) — done

Landed 2026-10-18 (most of it came forward with Phase 2):
- `tests/gen3-share.test.js`: a save with all 12 boxes of Gen 3 POKéMON is about 100 KB (the cloud row allows 512 KB)
  and passes import validation; team, trade and trade-back links carry Gen 3 POKéMON intact (Shedinja keeps 1 HP);
  Battle Tower trainers use Gen 3 POKéMON and never the Hoenn legendaries. No code changes were needed.
- Guide: the Social Zone panels now read the Pokédex size from the game (386), name the four mythicals the diploma
  skips, and say Tower opponents come from all three generations.

The original Phase 6 plan:

- Pokédex list, Oak's ratings and milestone cards to 386; the diploma (all but the four mythicals); save validation and
  cloud saves with Gen 3 species; Battle Tower and Social Zone accept them.
- **Done when:** the Pokédex test covers 386 and the diploma rule.

### Phase 7: balance and playtest — done

Landed 2026-10-18. `tools/gymsim.js` now compares each trainer against its Gen 1+2 version ("no Gen 3"), simulates the
Hoenn Elite Four with a Lv 72–74 team of six, and swaps in Shroomish, Shedinja, Slaking and Metagross. Win rates below are
for that greedy no-items Gen 1 team, before Phase 4 (Gen 1+2) → after Phase 4 → now.
- **Leaders and rival (owner's call: back near their Gen 1+2 difficulty).** The Hoenn Pokémon now *replace* a Kanto
  member (preferring one that shares a type, never below its evolution level) instead of making the team bigger. The
  rival's Hoenn starter also sits 3 levels down and evolves 10 levels late before the League. Sabrina's Grumpig is Lv 34.
  Brock 82 → 73 → 83 (Charmander start 48 → 19 → 49); Erika 41 → 22 → 49; Sabrina 45 → 24 → 40; Blaine 96 → 80 → 91;
  rival at Cerulean 66 → 40 → 78, S.S. Anne 16 → 10 → 33, Lavender 72 → 52 → 66, Silph 94 → 70 → 85, Route 22 last
  fight 61 → 26 → 53. Misty, Lt. Surge, Koga and Giovanni were never affected.
- **Hoenn Elite Four (owner's call: Steven stays tough).** Sidney 100, Phoebe 88, Glacia 85, Drake 64, Champion Steven
  22 (60 with a Metagross).
- **Catches:** Shroomish fixes Brock for a Charmander start (49 → 94). Shedinja walls Sabrina (40 → 86, like Umbreon's
  99) and changes nothing against Lt. Surge. Slaking's Truant makes it a liability against Koga (99 → 80). Nothing
  trivialises an early gym beyond what Gen 1 options already do.
- **Fuzzers:** `fuzzbattle`, `talkfuzz` and `stepfuzz` report no errors; `warpcheck` keeps its one known Silph Co. 11F issue.
- Guide: advice for Brock (Shroomish), Erika, Sabrina (Shedinja and Xatu's Night Shade) and how the rival's Hoenn
  starter grows.

The original Phase 7 plan:

- `tools/gymsim.js` extended with Gen 3 swaps for every gym, the Elite Fours and the rival; tune any outlier (Slaking's
  stats with Truant, Shedinja's matchups, early Gen 3 catches like Mudkip's Ground typing against Lt. Surge).
- All four fuzzers compared against the previous commit.

## Strategy guide (every phase)

The owner plays with the guide (`/guide`) open, so each phase also lands in it, from the game's own data via
`tools/guide-data.js` (hand-written text only for advice and directions). The guide has a **Gen 3** section, started in
Phase 1 with the new moves; it grows like this:

| Phase | Guide additions |
|---|---|
| 1 | Gen 3 section with the 29 new attacks; the rules panel names Slaking's Truant and Shedinja's Wonder Guard (done) |
| 2 | Gen 3 evolutions table (levels, items, Wurmple's branch, Nincada's Shedinja), the Special-stat note. `guide-data.js` marks every POKéMON with its generation instead of today's `dex > 151` test, so tables and the Catch finder tell Gen 2 and Gen 3 apart, and the header counts become 151 + 100 + 135 |
| 3 | Nothing extra: drawings show up in the game and the quiz |
| 4 | **Where to catch every Gen 3 POKéMON** in the Catch finder (encounter rates by area, fishing, surfing), the Hoenn starter gift and the other gifts, Gen 3 trainer additions in the gym, rival and route-trainer tables, and walkthrough notes per area |
| 5 | Elite Four 3 teams and how to unlock them; the Hoenn legendaries (where, level, Latias and Latios roaming) |
| 6 | Pokédex 386, Oak's ratings, the diploma rule, milestone cards |
| 7 | Balance notes from `tools/gymsim.js` where they change advice (for example which Gen 3 catches help against which gym) |

## Order and dependencies

```
Phase 1 engine ──► Phase 2 data ──► Phase 4 world ──► Phase 5 Elite Four 3 ──► Phase 6 dex ──► Phase 7 balance
      └──────────► Phase 3 art (parallel; placeholders until done) ──────────────────────────────┘
```

Phase 4 can ship once the early-route species have data; art never blocks a deploy.

## Risks

- **Data volume:** 135 species, their learnsets and 135 dex entries is about a third more than Gen 2. The converter and
  its lint carry most of it; the dex text and drawings are the long pole.
- **Gen 3 move list:** many Gen 3 moves rely on mechanics this game doesn't have (weather, abilities, held items).
  Learnsets for some species will feel thinner after remapping; Phase 2 reviews the worst cases.
- **Team size:** three generations in teams capped at 6 means more Gen 1 Pokémon get swapped out of trainer teams; the
  rule (never the ace, never the only Pokémon of the gym's type) keeps the feel of each fight.
