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
  onTalk('Daycare', 'DAYCARE_GENTLEMAN', gift('GEN2_GOT_TOGEPI', 'TOGEPI', 5,
    'An egg turned up by the fence one morning and hatched into this TOGEPI. It would be happier traveling. Will you take it?'));
  onTalk('FightingDojo', 'FIGHTINGDOJO_KARATE_MASTER', gift('GEN2_GOT_TYROGUE', 'TYROGUE', 15,
    'This young TYROGUE watched your battle and will not stop kicking the walls. Take it with you and see what it becomes?',
    () => G.flag('EVENT_DEFEATED_FIGHTING_DOJO')));
  onTalk('PokemonFanClub', 'POKEMONFANCLUB_PIKACHU_FAN', gift('GEN2_GOT_PICHU', 'PICHU', 5,
    "My PIKACHU had a little one! You look like you'd love it as much as I do. Will you raise this PICHU?"));
  onTalk('PewterPokecenter', 'PEWTERPOKECENTER_GENTLEMAN', gift('GEN2_GOT_IGGLYBUFF', 'IGGLYBUFF', 5,
    'That JIGGLYPUFF over there sings us all to sleep. This little IGGLYBUFF wants to learn. Would you take it along?'));
  onTalk('MtMoonPokecenter', 'MTMOONPOKECENTER_GENTLEMAN', gift('GEN2_GOT_CLEFFA', 'CLEFFA', 5,
    'I found this CLEFFA outside MT.MOON the night of a meteor shower. Would you like to raise it?'));

  // ---------------- trades ----------------
  const trade = key => function* () { yield* S.inGameTrade(G.GEN2_TRADES[key], {}); return true; };
  onTalk('CeruleanTradeHouse', 'CERULEANTRADEHOUSE_GRANNY', trade('smoochum'));
  onTalk('VermilionPokecenter', 'VERMILIONPOKECENTER_SAILOR', trade('elekid'));
  onTalk('CinnabarLabTradeRoom', 'CINNABARLABTRADEROOM_SUPER_NERD', trade('magby'));

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
  const HIDDEN = [['PowerPlant', 'METAL_COAT'], ['VictoryRoad2F', 'METAL_COAT'], ['SSAnneB1FRooms', 'KINGS_ROCK'],
    ['SeafoamIslandsB3F', 'KINGS_ROCK'], ['SeafoamIslandsB4F', 'DRAGON_SCALE']];
  for (const [map, item] of HIDDEN) {
    const [x, y] = nooks(map)[0];
    G.maps.getMap(map).hidden.push({ kind: 'hidden_event', x, y, fn: 'HiddenItems', arg: item });
  }

  // ---------------- post-game legendaries ----------------
  const LEGENDS = [['SeafoamIslandsB4F', 'GEN2_LUGIA', 'bird', 'LUGIA', 60, 'A deep, rolling cry echoes off the ice...'],
    ['PokemonTower7F', 'GEN2_HO_OH', 'bird', 'HO_OH', 60, 'Rainbow light spills across the floor...'],
    ['ViridianForest', 'GEN2_CELEBI', 'fairy', 'CELEBI', 50, 'The leaves rustle, though there is no wind...']];
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
})(window.G);
