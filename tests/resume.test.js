// Swiping the home-screen app away must not lose progress: a resume point taken while walking around brings the game
// back to the same spot for a day (src/engine/game/resume.ts), and never overrides a newer SAVE.
import { it } from 'vitest';
import { loadGame, check } from './helpers.js';

it('reopening within a day resumes where you were', () => {
  const { ctx, G } = loadGame('?map=ViridianCity&x=20&y=20');
  for (let i = 0; i < 5; i++) G.engine.step();
  G.state.party = [new G.Mon('PIKACHU', 12)]; G.state.money = 4321;
  G.resume.write();
  check(!!ctx.localStorage.getItem('pkmn_pixel_red_resume'), 'a resume point is written while walking around');

  G.state.money = 0; G.state.map = 'PalletTown';
  check(G.resume.take() && G.state.map === 'ViridianCity' && G.state.money === 4321 && G.state.party[0].species === 'PIKACHU', 'take() restores the map, money and party');

  const r = JSON.parse(ctx.localStorage.getItem('pkmn_pixel_red_resume'));
  ctx.localStorage.setItem('pkmn_pixel_red_resume', JSON.stringify({ at: Date.now() - 25 * 3600 * 1000, state: r.state }));
  check(!G.resume.take() && !ctx.localStorage.getItem('pkmn_pixel_red_resume'), 'a resume point older than 24 hours is dropped');

  G.resume.write();
  const at = JSON.parse(ctx.localStorage.getItem('pkmn_pixel_red_resume')).at;
  ctx.localStorage.setItem('pkmn_pixel_red_save', JSON.stringify(Object.assign(JSON.parse(G.serializeState()), { savedAt: at + 1000 })));
  check(!G.resume.take(), 'a SAVE made after the resume point wins');

  G.spawnScript(G.say('Hello!'));
  G.resume.write();
  check(!ctx.localStorage.getItem('pkmn_pixel_red_resume'), 'nothing is written while a text box or battle is open');
});
