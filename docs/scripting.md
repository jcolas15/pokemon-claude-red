# Story scripting guide

The remake reproduces Pokémon Red's story and event logic faithfully. Map layouts, objects, warps,
signs, trainers and text labels are imported from the pokered disassembly; each map's special events
are scripted in `src/scripts/` so the game plays exactly like Red.

## Source material
- Original logic: `$POKERED/scripts/<Map>.asm`, objects `$POKERED/data/maps/objects/<Map>.asm`,
  toggles `$POKERED/data/maps/toggleable_objects.asm`, hidden events `$POKERED/data/events/hidden_events.asm`,
  engine routines under `$POKERED/engine/events/` (e.g. `hidden_events/`, `pokemon_tower`, `in_game_trades.asm`).
  `$POKERED` = your clone of [pret/pokered](https://github.com/pret/pokered).
- Text: every original text label (minus its leading `_`) exists in `G.TEXT` with paraphrased wording
  (`src/data/text/*.js`). Show it with `yield* S.say('LabelName')`. Placeholders like `{PLAYER}`, `{RIVAL}` are
  substituted automatically; other `{wXxx}` placeholders read from `G.textVars` (set them before saying).
  To see a label's original wording, build a reference with `node tools/extract_text.js $POKERED text_ref.json` (keep it out of the repo).

## Where to write
Map scripts live in `src/engine/scripts/` (each file is imported in order by `src/engine/engine.ts`). Keep engine changes (`src/engine/core`,
`src/engine/game`) small and separate from story work. Features a map needs (a minigame, a special screen) can live in
its script file as new `G.*` functions.

## Reference implementation
`src/scripts/pallet.js` (Red's house, Pallet Town, Oak's Lab, Route 1, Viridian City/Mart, Route 22).
Read it first. `src/game/story.js` holds the runtime + helpers, `src/game/fieldmoves.js` field mechanics.

## API
```js
G.defMapScript('MapName', {
  enter() { ... return generator | null },   // runs after the map loads (toggle objects here, auto-events)
  step(x, y) { return generator | null },    // coordinate triggers, checked after every player step
  talk: { OBJECT_ID: function* (actor) {} }, // custom NPC behaviour (ids from the map objects)
  sign: { TEXT_CONST: function* (sign) {} }, // custom sign behaviour (bg_event text const)
  hidden: { 'x,y': function* (h) {} },       // custom hidden event
  beforeStatic: function* (actor) { return false to cancel } // before static encounters (Snorlax etc.)
});
```
Helpers (`const S = G.S;`): `S.say(labelOrText)`, `S.ask(labelOrText)` → bool, `S.flag(f)`, `S.set(f)`, `S.clear(f)`,
`S.actor(id)`, `S.show(id, map?, [x,y]?)`, `S.hide(id, map?)` (persistent toggles; map defaults to current),
`S.isShown(id, map?)`, `S.move(actorOrId, 'UDLR...', speed?)`, `S.movePlayer('UDLR')`, `S.moveTogether([[a,'UU'],[p,'UU']])`,
`S.face(a, dir)`, `S.facePlayer(a)`, `S.faceTo(a, b)`, `S.emote(a, '!'|'?'|'...'|'heart')`, `S.pathTo(a, x, y)`,
`S.give(item, n?, msg?)` → bool, `S.giveMon(species, level)`, `S.giftMon(species, level, flag)`,
`S.battle(TRAINER_CLASS, partyIndex, {winText, noBlackout})` → 'win'|'lose', `S.gymLeader({...})` (see story.js),
`S.awardBadge(badge)`, `S.inGameTrade(idx, texts)`, `S.warp(map, x, y, dir)`, `S.wait(frames)`, `S.music(name)`,
`S.shake(n)`, `S.setCell(x, y, label, passable, map?)` (open doors, move barriers; re-renders), `S.elevator(floors)`,
`S.hasBadge(b)`, `S.badgeCount()`, `S.partyHas(species)`, `G.bag.add/has/remove/count`, `G.state.money`,
`G.startWildBattle(species, level, opts)`, `G.mart(itemList)`, `G.nurseHeal(actor)`, `G.usePC()`, `G.evolve(mon, sp)`,
`G.rivalParty(base)` (rival party index offset by the starter), `G.state.starter`, `G.onBoulderMoved = (map, boulder) => generator|null`.

Handled automatically (no script needed): trainers with trainer headers (line of sight, "!", walk up,
battle/end/after texts, beaten flags), item balls, nurses, mart clerks whose text label is a mart inventory
(`G.DATA.marts`), static Pokémon objects (`obj.mon`, e.g. Voltorbs/legendaries: shows text, battles, hides on
win/catch), signs, hidden items/coins/PCs/bookcases/gym statues, cut trees & surf prompts, spinner arrows,
Strength boulders (`ow.strength`), Rock Tunnel darkness, warps (doors, stairs, mats), map connections.

Flags: use pokered's `EVENT_*` names. Beating a trainer sets its header flag automatically. Toggleable objects
start in pokered's initial state; use `S.show/S.hide` exactly where Red's scripts use ShowObject/HideObject.
Music names (optional): pallet, route, city, gym, cave, forest, tower, ss_anne, silph, hideout, mansion, safari,
oak, rival, rival_leave, trainer, gym_leader, final_battle, legendary, heal, evolution, badge, hall_of_fame,
credits, game_corner, surf, bike.

## Testing
`tools/drive.js` drives the game headlessly:
```js
const T = require('./tools/drive.js').make('?map=PewterCity&x=18&y=19');
const { G, S } = { G: T.G, S: T.G.S };
G.state.party.push(new G.Mon('PIKACHU', 20)); G.setFlag('EVENT_GOT_POKEDEX'); // set up preconditions
T.walk('UUR'); T.press('a'); T.settle([true, false]); // answer YES then NO to prompts; settle runs dialogue out
console.log(T.log.join('\n'), G.flag('EVENT_BEAT_BROCK'), G.state.badges);
T.shot('pewter_gym');   // PNG in $SHOTS (set SHOTS=<any folder>)
```
Battles auto-advance (A presses choose FIGHT + first move); give the party strong Pokémon to win quickly.
Inspect maps with: `node -e "global.G={};eval(require('fs').readFileSync('src/data/maps.js','utf8'));const m=G.MAPDATA.maps.PewterGym;console.log(JSON.stringify({w:m.w,h:m.h,warps:m.warps,signs:m.signs,objs:m.objs,hidden:m.hidden},null,1))"`
Test every scripted event at least once (trigger it, see the text order, check flags/badges/items/toggles), plus
the gating that blocks progress until the right item/badge/event.
