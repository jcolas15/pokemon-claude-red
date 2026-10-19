// Sound is off by default: new games and older saves start muted, and only an explicit SOUND: ON is remembered.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('sound is off unless the save turned it on', () => {
  const { G } = loadGame();
  const calls = []; G.audio = Object.assign({}, G.audio, { setMute: m => calls.push(m) });
  check(G.newState().options.mute === true, 'a new game starts with sound off');
  const older = G.newState(); delete older.options.mute;
  G.engine.scenes.length = 0; G.startGame(older);
  check(calls.at(-1) === true, 'an older save without the setting loads muted');
  const on = G.newState(); on.options.mute = false;
  G.engine.scenes.length = 0; G.startGame(on);
  check(calls.at(-1) === false, 'a save that turned sound on keeps it on');
});
