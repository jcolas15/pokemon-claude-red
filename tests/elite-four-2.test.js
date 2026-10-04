// The post-game Elite Four rematch (Will, Koga, Bruno, Karen, Champion Lance): teams, portraits, and a full run.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('the Elite Four rematch is set up and can be played through', () => {
  const { G } = loadGame('?map=PalletTown&x=5&y=6');
  check(G.makeTrainerParty('BRUNO', 1).every(m => m.moves.some(x => x.id === 'FISSURE')), "Elite Four 1: Red's forced FISSURE on Bruno's team is intact");
  check(G.makeTrainerParty('LANCE', 1).every(m => m.moves.some(x => x.id === 'BARRIER')), "Elite Four 1: Red's forced BARRIER on Lance's team is intact");
  const will = G.makeTrainerParty('WILL', 1);
  check(will.map(m => m.species + m.level).join() === 'XATU60,JYNX61,EXEGGUTOR61,SLOWBRO61,XATU62', 'Will: Xatu, Jynx, Exeggutor, Slowbro, Xatu at Lv 60-62');
  check(will[1].moves.map(x => x.id).join() === 'DOUBLESLAP,LOVELY_KISS,ICE_PUNCH,PSYCHIC_M', "Will's Jynx keeps its Gen 2 moveset");
  const bruno2 = G.makeTrainerParty('BRUNO', 2), lance2 = G.makeTrainerParty('LANCE', 2), karen = G.makeTrainerParty('KAREN', 1);
  check(!bruno2.every(m => m.moves.some(x => x.id === 'FISSURE')) && !lance2.every(m => m.moves.some(x => x.id === 'BARRIER')), 'rematch teams are not forced onto FISSURE / BARRIER');
  check(karen[4].species === 'HOUNDOOM' && karen[4].level === 67 && karen[4].moves.some(x => x.id === 'CRUNCH') && karen[4].moves.some(x => x.id === 'FLAMETHROWER'), "Karen's Houndoom (Lv 67) keeps Crunch and Flamethrower");
  check(lance2.length === 6 && lance2[5].species === 'DRAGONITE' && lance2[5].level === 70, 'Champion Lance: six POKéMON, Lv 70 Dragonite ace');
  check([will, bruno2, lance2, karen, G.makeTrainerParty('KOGA', 2)].every(t => t.every(m => m.moves.length >= 1 && m.moves.length <= 4)), 'every rematch POKéMON has 1-4 moves');
  let pics = true; try { G.trainerPic('WILL'); G.trainerPic('KAREN'); } catch { pics = false; }
  check(pics, 'Will and Karen battle portraits render');

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
  let a = room('LoreleisRoom', 'LORELEISROOM_LORELEI', 5, 2);
  check(a && a.sprite === 'lorelei', 'before the first HALL OF FAME Lorelei is in her room');
  G.setFlag('EVENT_BEAT_CHAMPION');
  const rooms = [['LoreleisRoom', 'LORELEISROOM_LORELEI', 'will', 'EVENT_BEAT_LORELEIS_ROOM_TRAINER_0'], ['BrunosRoom', 'BRUNOSROOM_BRUNO', 'koga', 'EVENT_BEAT_BRUNOS_ROOM_TRAINER_0'],
    ['AgathasRoom', 'AGATHASROOM_AGATHA', 'bruno', 'EVENT_BEAT_AGATHAS_ROOM_TRAINER_0'], ['LancesRoom', 'LANCESROOM_LANCE', 'karen', 'EVENT_BEAT_LANCES_ROOM_TRAINER_0']];
  for (const [map, id, sprite, flag] of rooms) {
    G.state.party = team();
    a = room(map, id, 5, 3);
    drive(G.spawnScript(G.talkTo(a)));
    check(a && a.sprite === sprite && G.flag(flag), map + ': ' + sprite.toUpperCase() + ' beaten, door flag set');
  }
  G.state.party = team();
  const seen = []; const orig = G.startTrainerBattle;
  G.startTrainerBattle = function* (cls, n, o) { seen.push(cls + '#' + n + ':' + (o && o.music)); return yield* orig(cls, n, o); };
  G.ow.load('ChampionsRoom', 4, 7, 'up'); drive({ get done() { return G.flag('GEN2_BEAT_E4_2') && G.scriptRunning === 0; } }, 80000);
  G.startTrainerBattle = orig;
  check(seen[0] === 'LANCE#2:final_battle' && G.flag('EVENT_BEAT_CHAMPION_RIVAL') && G.flag('GEN2_BEAT_E4_2'), 'Champion Lance battled with the final-battle music; HALL OF FAME unlocked (' + seen.join() + ')');
});
