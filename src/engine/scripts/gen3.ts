// Gen 3 gifts, fossils and evolution items (docs/gen3-integration-plan.md, Phase 4) and the post-game legendaries
// (Phase 5). Gifts hang off NPCs who are already there (their usual lines still play once the gift is given); items and
// legendaries go in dead-end nooks so nothing can block a path.
import { game } from '../global';

type Gen<T = unknown> = Generator<unknown, T, unknown>;
type MapObj = { textLabel?: string };
type Hidden = { kind: string; x: number; y: number; fn: string; arg: string };
const G = game() as unknown as {
  S: { giftMon(sp: string, lv: number, flag?: string): Gen<boolean>; hasBadge(b: string): boolean; show(id: string, map: string): void };
  MAPSCRIPTS: Record<string, { talk?: Record<string, (a: { obj: MapObj }) => Gen> }>;
  say(t: string): Gen; ask(q: string): Gen<boolean>; choose(items: string[], o: object): Gen<number>;
  flag(f: string): boolean; dexSeen(sp: string): void; speciesName(sp: string): string; textFor(label?: string): string;
  maps: { getMap(n: string): { hidden: Hidden[]; objs: object[] } }; nooks(map: string): [number, number][];
  TEXT: Record<string, string>; setFlag(f: string): void; stepHooks?: (() => void)[];
  roamers: { release(sp: string, lv: number, route: string): void };
  FOSSILS: [string, string][]; DATA: { items: Record<string, { id: string; name: string; price: number }> };
  GEN3_GUIDE: unknown;
};
const S = G.S, MS = G.MAPSCRIPTS;

// run fn when this NPC is talked to; if fn returns false, the NPC's own script (or plain text) runs instead
function onTalk(map: string, id: string, fn: () => Gen<boolean>) {
  const ms = (MS[map] = MS[map] || {}), talk = (ms.talk = Object.assign({}, ms.talk)), before = talk[id];
  talk[id] = function* (a) {
    if (yield* fn()) return;
    if (before) yield* before(a); else yield* G.say(G.textFor(a.obj.textLabel));
  };
}

// ---------------- the Hoenn starter: Oak's aide in the Route 11 gate (east of Vermilion), after the Thunder Badge ----------------
const STARTERS = ['TREECKO', 'TORCHIC', 'MUDKIP'];
onTalk('Route11Gate2F', 'ROUTE11GATE2F_OAKS_AIDE', function* () {
  if (!S.hasBadge('THUNDERBADGE') || G.flag('GEN3_GOT_HOENN_STARTER')) return false;
  yield* G.say("PROF.OAK's colleague in HOENN sent these three POKéMON over for study.\fThe PROF. says a trainer who beat LT.SURGE should raise one. Which will you take?");
  STARTERS.forEach(sp => G.dexSeen(sp));
  const r = yield* G.choose(STARTERS.map(G.speciesName).concat(['NOT NOW']), { x: 6, y: 6, w: 120 });
  if (r < 0 || r > 2) { yield* G.say("Take your time. I'll look after them until you decide."); return true; }
  yield* S.giftMon(STARTERS[r], 10, 'GEN3_GOT_HOENN_STARTER');
  return true;
});

// ---------------- baby POKéMON ----------------
const GIFTS = [
  { map: 'CeruleanPokecenter', npc: 'CERULEANPOKECENTER_GENTLEMAN', flag: 'GEN3_GOT_AZURILL', sp: 'AZURILL', lv: 5, where: 'Gentleman, Cerulean Pokémon Center',
    offer: 'This AZURILL bounced all the way here on its tail from the river up north. It needs someone with more energy than me. Will you take it?' },
  { map: 'LavenderPokecenter', npc: 'LAVENDERPOKECENTER_LITTLE_GIRL', flag: 'GEN3_GOT_WYNAUT', sp: 'WYNAUT', lv: 5, where: 'Little girl, Lavender Pokémon Center',
    offer: 'My WYNAUT keeps smiling at you! I think it wants to go on an adventure. Will you look after it?' },
];
for (const g of GIFTS) onTalk(g.map, g.npc, function* () {
  if (G.flag(g.flag) || !(yield* G.ask(g.offer))) return false;
  yield* S.giftMon(g.sp, g.lv, g.flag);
  return true;
});

// ---------------- fossils and evolution items, hidden in dead ends ----------------
G.DATA.items.ROOT_FOSSIL = { id: 'ROOT_FOSSIL', name: 'ROOT FOSSIL', price: 0 };
G.DATA.items.CLAW_FOSSIL = { id: 'CLAW_FOSSIL', name: 'CLAW FOSSIL', price: 0 };
G.FOSSILS.push(['ROOT_FOSSIL', 'LILEEP'], ['CLAW_FOSSIL', 'ANORITH']);
const HIDDEN: [string, string, string][] = [
  ['MtMoonB2F', 'ROOT_FOSSIL', 'Mt. Moon B2F'], ['MtMoonB2F', 'CLAW_FOSSIL', 'Mt. Moon B2F'],
  ['SeafoamIslandsB1F', 'DEEP_SEA_TOOTH', 'Seafoam Islands B1F'], ['SeafoamIslandsB2F', 'DEEP_SEA_SCALE', 'Seafoam Islands B2F'],
  ['Route12SuperRodHouse', 'BEAUTY_SCALE', 'Route 12, Super Rod house'],
];
for (const [map, item] of HIDDEN) {
  const m = G.maps.getMap(map), taken = new Set(m.hidden.map(h => h.x + ',' + h.y));
  const spot = G.nooks(map).find(([x, y]) => !taken.has(x + ',' + y));
  if (!spot) throw new Error('no free nook for ' + item + ' in ' + map);
  m.hidden.push({ kind: 'hidden_event', x: spot[0], y: spot[1], fn: 'HiddenItems', arg: item });
}

// ---------------- legendaries, after beating CHAMPION STEVEN (the third HALL OF FAME) ----------------
const LEGENDS: [string, string, string, string][] = [
  ['SeafoamIslandsB3F', 'KYOGRE', 'The water far below churns, as if something vast just turned over...', 'Seafoam Islands B3F'],
  ['PokemonMansionB1F', 'GROUDON', 'The floor is hot to the touch. Something beneath it is breathing...', 'Pokémon Mansion B1F'],
  ['SilphCo11F', 'RAYQUAZA', 'A green shape coils past the window, high above SAFFRON...', 'Silph Co. 11F'],
  ['RockTunnelB1F', 'REGIROCK', 'The rocks here are arranged in a strange pattern of dots...', 'Rock Tunnel B1F'],
  ['SeafoamIslandsB4F', 'REGICE', 'This ice is so cold it never melts...', 'Seafoam Islands B4F'],
  ['PowerPlant', 'REGISTEEL', 'A dull metal clang echoes through the plant...', 'Power Plant'],
  ['MtMoon1F', 'JIRACHI', 'A soft, sleepy hum, like a lullaby...', 'Mt. Moon 1F'],
  ['MtMoonB2F', 'DEOXYS', 'A meteorite fragment pulses with a strange light...', 'Mt. Moon B2F'],
];
for (const [map, species, text] of LEGENDS) {
  const m = G.maps.getMap(map), taken = new Set(m.hidden.map(h => h.x + ',' + h.y).concat((m.objs as { x: number; y: number }[]).map(o => o.x + ',' + o.y)));
  const spot = G.nooks(map).find(([x, y]) => !taken.has(x + ',' + y));
  if (!spot) throw new Error('no free nook for ' + species + ' in ' + map);
  const id = 'GEN3_' + species;
  G.TEXT[id + '_TEXT'] = text;
  m.objs.push({ id, x: spot[0], y: spot[1], sprite: 'bird', move: 'STAY', dir: 'DOWN', text: '', textLabel: id + '_TEXT', mon: { species, level: 70 }, shown: false });
}
const EONS: [string, string][] = [['LATIAS', 'Route12'], ['LATIOS', 'Route16']];
// checked on each step, so a save that already beat STEVEN catches up too
(G.stepHooks = G.stepHooks || []).push(() => {
  if (!G.flag('GEN3_BEAT_E4_3') || G.flag('GEN3_POSTGAME')) return;
  G.setFlag('GEN3_POSTGAME');
  for (const [map, species] of LEGENDS) S.show('GEN3_' + species, map);
  for (const [sp, route] of EONS) G.roamers.release(sp, 70, route);
});

// what the strategy guide shows (tools/guide-data.js)
G.GEN3_GUIDE = {
  gifts: [{ species: STARTERS, level: 10, where: "Oak's aide, Route 11 gate upstairs (east of Vermilion)", requires: 'after the Thunder Badge; choose one' }]
    .concat(GIFTS.map(g => ({ species: [g.sp], level: g.lv, where: g.where, requires: '' }))),
  fossils: [{ item: 'ROOT_FOSSIL', species: 'LILEEP' }, { item: 'CLAW_FOSSIL', species: 'ANORITH' }],
  items: HIDDEN.map(([, item, where]) => ({ item, where, how: 'hidden (use the Itemfinder)' })),
  legends: LEGENDS.map(([, species, , where]) => ({ species, level: 70, where, how: 'appears after beating Champion Steven' }))
    .concat(EONS.map(([species]) => ({ species, level: 70, where: 'roams the grass routes', how: 'released after beating Champion Steven' }))),
};
