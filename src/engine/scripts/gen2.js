// Gen 2 gifts, trades, evolution items and post-game legendaries (docs/gen2-integration-plan.md, Phase 4). Gifts and
// trades hang off NPCs who are already there, and their usual lines still play once the gift is given. Hidden items
// and legendaries go in dead-end nooks, so nothing new can block a path.
(function (G) {
  'use strict';
  const S = G.S, MS = G.MAPSCRIPTS;

  // run fn when this NPC is talked to; if fn returns false, the NPC's own script (or plain text) runs instead
  function onTalk(map, id, fn) {
    const ms = MS[map] = MS[map] || {}, talk = ms.talk = Object.assign({}, ms.talk), before = talk[id];
    talk[id] = function* (a) {
      if (yield* fn(a)) return;
      if (before) yield* before(a); else yield* G.say(G.textFor(a.obj.textLabel));
    };
  }
  function gift(flag, sp, lv, offer, when) {
    return function* () {
      if (G.flag(flag) || (when && !when())) return false;
      if (!(yield* G.ask(offer))) return false;
      yield* S.giftMon(sp, lv, flag);
      return true;
    };
  }

  // ---------------- gift POKéMON ----------------
  onTalk('BillsHouse', 'BILLSHOUSE_BILL1', function* () {
    if (!G.flag('EVENT_GOT_SS_TICKET') || G.flag('GEN2_GOT_JOHTO_STARTER')) return false;
    yield* G.say("Oh, one more thing! A friend of mine in JOHTO sent me three rare POKéMON.\fI'd like one of them to go to a good trainer. Which one will you take?");
    const opts = ['CHIKORITA', 'CYNDAQUIL', 'TOTODILE'];
    opts.forEach(sp => G.dexSeen(sp));
    const r = yield* G.choose(opts.map(G.speciesName).concat(['NOT NOW']), { x: 6, y: 6, w: 120 });
    if (r < 0 || r > 2) { yield* G.say("No rush. They'll be here when you're ready."); return true; }
    yield* S.giftMon(opts[r], 10, 'GEN2_GOT_JOHTO_STARTER');
    return true;
  });
  const GIFTS = [
    { map: 'Daycare', npc: 'DAYCARE_GENTLEMAN', flag: 'GEN2_GOT_TOGEPI', sp: 'TOGEPI', lv: 5, where: 'Day Care man, Route 5',
      offer: 'An egg turned up by the fence one morning and hatched into this TOGEPI. It would be happier traveling. Will you take it?' },
    { map: 'FightingDojo', npc: 'FIGHTINGDOJO_KARATE_MASTER', flag: 'GEN2_GOT_TYROGUE', sp: 'TYROGUE', lv: 15, where: 'Karate Master, Fighting Dojo',
      requires: 'after the Hitmonlee or Hitmonchan gift', when: () => G.flag('EVENT_DEFEATED_FIGHTING_DOJO'),
      offer: 'This young TYROGUE watched your battle and will not stop kicking the walls. Take it with you and see what it becomes?' },
    { map: 'PokemonFanClub', npc: 'POKEMONFANCLUB_PIKACHU_FAN', flag: 'GEN2_GOT_PICHU', sp: 'PICHU', lv: 5, where: 'Pikachu fan, Pokémon Fan Club (Vermilion)',
      offer: "My PIKACHU had a little one! You look like you'd love it as much as I do. Will you raise this PICHU?" },
    { map: 'PewterPokecenter', npc: 'PEWTERPOKECENTER_GENTLEMAN', flag: 'GEN2_GOT_IGGLYBUFF', sp: 'IGGLYBUFF', lv: 5, where: 'Gentleman, Pewter Pokémon Center',
      offer: 'That JIGGLYPUFF over there sings us all to sleep. This little IGGLYBUFF wants to learn. Would you take it along?' },
    { map: 'MtMoonPokecenter', npc: 'MTMOONPOKECENTER_GENTLEMAN', flag: 'GEN2_GOT_CLEFFA', sp: 'CLEFFA', lv: 5, where: 'Gentleman, Mt. Moon Pokémon Center',
      offer: 'I found this CLEFFA outside MT.MOON the night of a meteor shower. Would you like to raise it?' },
  ];
  for (const g of GIFTS) onTalk(g.map, g.npc, gift(g.flag, g.sp, g.lv, g.offer, g.when));

  // ---------------- trades ----------------
  const TRADES = [['CeruleanTradeHouse', 'CERULEANTRADEHOUSE_GRANNY', 'smoochum', 'Granny, Cerulean trade house'],
    ['VermilionPokecenter', 'VERMILIONPOKECENTER_SAILOR', 'elekid', 'Sailor, Vermilion Pokémon Center'],
    ['CinnabarLabTradeRoom', 'CINNABARLABTRADEROOM_SUPER_NERD', 'magby', 'Super Nerd, Cinnabar Lab trade room']];
  for (const [map, npc, key] of TRADES) onTalk(map, npc, function* () { yield* S.inGameTrade(G.GEN2_TRADES[key], {}); return true; });

  // ---------------- evolution items ----------------
  onTalk('SaffronPokecenter', 'SAFFRONPOKECENTER_GENTLEMAN', function* () {
    if (!G.flag('EVENT_BEAT_SILPH_CO_GIOVANNI') || G.flag('GEN2_GOT_UP_GRADE')) return false;
    yield* G.say('SILPH CO. is back in business! They sent this over to thank the one who ran off TEAM ROCKET.');
    if (yield* S.give('UP_GRADE', 1)) G.setFlag('GEN2_GOT_UP_GRADE');
    return true;
  });

  // walkable cells you can reach from the map's warps, and the dead ends among them (farthest from a warp first)
  function nooks(name) {
    const m = G.maps.getMap(name), key = (x, y) => x + ',' + y;
    const taken = new Set(m.objs.map(o => key(o.x, o.y)).concat(m.hidden.map(h => key(h.x, h.y)), m.warps.map(w => key(w.x, w.y))));
    const open = (x, y) => m.passable(x, y) && !m.isWater(x, y) && !m.isWarpTile(x, y) && !m.isDoorTile(x, y) && !taken.has(key(x, y));
    const dist = new Map(), q = [];
    for (const w of m.warps) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0, 0]]) {
      const x = w.x + dx, y = w.y + dy; if (open(x, y) && !dist.has(key(x, y))) { dist.set(key(x, y), 0); q.push([x, y]); }
    }
    for (let i = 0; i < q.length; i++) {
      const [x, y] = q[i];
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy; if (!open(nx, ny) || dist.has(key(nx, ny))) continue;
        dist.set(key(nx, ny), dist.get(key(x, y)) + 1); q.push([nx, ny]);
      }
    }
    return q.filter(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => dist.has(key(x + dx, y + dy))).length === 1)
      .sort((a, b) => dist.get(key(b[0], b[1])) - dist.get(key(a[0], a[1])) || a[1] - b[1] || a[0] - b[0]);
  }
  const HIDDEN = [['PowerPlant', 'METAL_COAT', 'Power Plant'], ['VictoryRoad2F', 'METAL_COAT', 'Victory Road 2F'],
    ['SSAnneB1FRooms', 'KINGS_ROCK', 'S.S. Anne, lower-deck cabins'], ['SeafoamIslandsB3F', 'KINGS_ROCK', 'Seafoam Islands B3F'],
    ['SeafoamIslandsB4F', 'DRAGON_SCALE', 'Seafoam Islands B4F']];
  for (const [map, item] of HIDDEN) {
    const [x, y] = nooks(map)[0];
    G.maps.getMap(map).hidden.push({ kind: 'hidden_event', x, y, fn: 'HiddenItems', arg: item });
  }

  // ---------------- post-game legendaries ----------------
  const LEGENDS = [['SeafoamIslandsB4F', 'GEN2_LUGIA', 'bird', 'LUGIA', 60, 'A deep, rolling cry echoes off the ice...', 'Seafoam Islands B4F'],
    ['PokemonTower7F', 'GEN2_HO_OH', 'bird', 'HO_OH', 60, 'Rainbow light spills across the floor...', 'Pokémon Tower 7F'],
    ['ViridianForest', 'GEN2_CELEBI', 'fairy', 'CELEBI', 50, 'The leaves rustle, though there is no wind...', 'Viridian Forest']];
  for (const [map, id, sprite, species, level, text] of LEGENDS) {
    const m = G.maps.getMap(map), taken = m.hidden.map(h => h.x + ',' + h.y), spot = nooks(map).find(([x, y]) => !taken.includes(x + ',' + y));
    G.TEXT[id + '_TEXT'] = text;
    m.objs.push({ id, x: spot[0], y: spot[1], sprite, move: 'STAY', dir: 'DOWN', text: '', textLabel: id + '_TEXT', mon: { species, level }, shown: false });
  }
  const BEASTS = [['RAIKOU', 'Route10'], ['ENTEI', 'Route7'], ['SUICUNE', 'Route24']];
  // the first HALL OF FAME wakes them (checked on each step, so older saves that already won catch up too)
  G.stepHooks = G.stepHooks || [];
  G.stepHooks.push(() => {
    if (!G.flag('EVENT_BEAT_CHAMPION') || G.flag('GEN2_POSTGAME')) return;
    G.setFlag('GEN2_POSTGAME');
    for (const [map, id] of LEGENDS) S.show(id, map);
    for (const [sp, route] of BEASTS) G.roamers.release(sp, 50, route);
  });

  // what the strategy guide shows (tools/guide-data.js)
  G.GEN2_GUIDE = {
    gifts: [{ species: ['CHIKORITA', 'CYNDAQUIL', 'TOTODILE'], level: 10, where: "Bill, Bill's house (Route 25)", requires: 'after the S.S. Ticket; choose one' }]
      .concat(GIFTS.map(g => ({ species: [g.sp], level: g.lv, where: g.where, requires: g.requires || '' }))),
    trades: TRADES.map(([, , key, where]) => Object.assign({ where }, G.DATA.trades[G.GEN2_TRADES[key]])),
    items: [{ item: 'SUN_STONE', where: 'Celadon Dept. Store 4F', how: 'buy' }, { item: 'UP_GRADE', where: 'Gentleman, Saffron Pokémon Center', how: 'gift after Silph Co. is freed' }]
      .concat(HIDDEN.map(([, item, where]) => ({ item, where, how: 'hidden (use the Itemfinder)' }))),
    legends: LEGENDS.map(([, , , species, level, , where]) => ({ species, level, where, how: 'appears after the first Hall of Fame' }))
      .concat(BEASTS.map(([species]) => ({ species, level: 50, where: 'roams the grass routes', how: 'released after the first Hall of Fame' }))),
  };
})(window.G);
