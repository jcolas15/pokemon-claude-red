// The Hoenn Elite Four after the Gen 2 rematch (docs/gen3-integration-plan.md, Phase 5): teams, portraits, a full run
// through all five rooms, and the legendaries that beating Champion Steven releases.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the Hoenn Elite Four is set up, can be played through, and wakes the legendaries', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  const teams = ['SIDNEY', 'PHOEBE', 'GLACIA', 'DRAKE', 'STEVEN'].map(c => G.makeTrainerParty(c, 1));
  check(teams.every(t => t.every(m => m.level >= 68 && m.level <= 80 && m.moves.length >= 1 && m.moves.length <= 4)), 'all five teams at Lv 68-80 with 1-4 moves');
  const steven = teams[4];
  check(steven.length === 6 && steven[5].species === 'METAGROSS' && steven[5].level === 80 && steven[5].moves.some(x => x.id === 'METEOR_MASH'), 'Champion Steven: six POKéMON, Lv 80 Metagross with Meteor Mash');
  check(G.makeTrainerParty('LANCE', 2)[5].species === 'DRAGONITE', 'the Gen 2 rematch is unchanged');
  let pics = true; try { for (const c of ['SIDNEY', 'PHOEBE', 'GLACIA', 'DRAKE', 'STEVEN']) G.trainerPic(c); } catch { pics = false; }
  check(pics, 'all five battle portraits render');

  const team = () => Array.from({ length: 6 }, () => { const m = new G.Mon('MEWTWO', 100); m.moves = []; m.addMove('SURF'); m.addMove('PSYCHIC_M'); return m; });
  const drive = (task, n) => {
    for (let f = 0; f < (n || 60000) && !task.done; f++) {
      const top = G.engine.scenes[G.engine.scenes.length - 1];
      G.input.injected.a = f % 3 === 0; G.input.injected.down = !!top && top.constructor.name === 'PartyScreen' && f % 6 === 0;
      G.engine.step();
    }
    G.input.injected.down = false; return task;
  };
  const room = (map, id, x, y) => { G.ow.load(map, x, y, 'up'); for (let i = 0; i < 5; i++) G.engine.step(); return G.ow.actors.find(a => a.obj.id === id); };
  const LEGENDS = { SeafoamIslandsB3F: 'KYOGRE', PokemonMansionB1F: 'GROUDON', SilphCo11F: 'RAYQUAZA', RockTunnelB1F: 'REGIROCK', SeafoamIslandsB4F: 'REGICE', PowerPlant: 'REGISTEEL', MtMoon1F: 'JIRACHI', MtMoonB2F: 'DEOXYS' };
  const shown = () => Object.entries(LEGENDS).filter(([map, sp]) => { G.ow.load(map, 1, 1, 'down'); return G.ow.actors.some(a => a.obj.id === 'GEN3_' + sp); }).length;
  check(shown() === 0, 'the Hoenn legendaries stay hidden until Steven is beaten');
  G.setFlag('EVENT_BEAT_CHAMPION');
  check(room('LoreleisRoom', 'LORELEISROOM_LORELEI', 5, 3).sprite === 'will', 'before beating the rematch, Will is in the first room');
  G.setFlag('GEN2_BEAT_E4_2');
  const rooms = [['LoreleisRoom', 'LORELEISROOM_LORELEI', 'sidney', 'EVENT_BEAT_LORELEIS_ROOM_TRAINER_0'], ['BrunosRoom', 'BRUNOSROOM_BRUNO', 'phoebe', 'EVENT_BEAT_BRUNOS_ROOM_TRAINER_0'],
    ['AgathasRoom', 'AGATHASROOM_AGATHA', 'glacia', 'EVENT_BEAT_AGATHAS_ROOM_TRAINER_0'], ['LancesRoom', 'LANCESROOM_LANCE', 'drake', 'EVENT_BEAT_LANCES_ROOM_TRAINER_0']];
  for (const [map, id, sprite, flag] of rooms) {
    G.state.party = team();
    const a = room(map, id, 5, 3);
    drive(G.spawnScript(G.talkTo(a)));
    check(a && a.sprite === sprite && G.flag(flag), map + ': ' + sprite.toUpperCase() + ' beaten, door flag set');
  }
  G.state.party = team();
  const seen = []; const orig = G.startTrainerBattle;
  G.startTrainerBattle = function* (cls, n, o) { seen.push(cls + '#' + n + ':' + (o && o.music)); return yield* orig(cls, n, o); };
  G.ow.load('ChampionsRoom', 4, 7, 'up'); drive({ get done() { return G.flag('GEN3_BEAT_E4_3') && G.scriptRunning === 0; } }, 80000);
  G.startTrainerBattle = orig;
  check(seen[0] === 'STEVEN#1:final_battle' && G.flag('GEN3_BEAT_E4_3'), 'Champion Steven battled with the final-battle music (' + seen.join() + ')');

  G.stepHooks.forEach(h => h(G.state));
  check(shown() === 8 && G.flag('GEN3_POSTGAME'), 'beating Steven wakes all eight static Hoenn legendaries at Lv 70');
  const roam = G.state.roamers.map(r => r.mon.species);
  check(roam.includes('LATIAS') && roam.includes('LATIOS'), 'Latias and Latios roam');
});
