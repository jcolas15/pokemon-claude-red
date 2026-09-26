// node tools/vfxsheet.js out.png MOVE1 MOVE2 ... : captures each move animation mid-way in a grid
const H = require('./headless.js');
const G = H.loadGame({ search: '?map=Route1&x=10&y=20' }).G; G.boot();
const out = process.argv[2], moves = process.argv.slice(3);
const cols = 3, S = new G.gfx.Surface(cols * 322, Math.ceil(moves.length / cols) * 134);
moves.forEach((mv, i) => {
  G.state.party = [new G.Mon('CHARIZARD', 40)];
  const b = new G.Battle({ type: 'wild', enemyParty: [new G.Mon('BLASTOISE', 40)] });
  const sc = new G.BattleScene({ bg: 'grass' });
  sc.b = b; b.ui = sc; sc.show.p = sc.show.e = true; sc.boxes.p = sc.boxes.e = true; sc.disp.p = b.mon(b.p).hp; sc.disp.e = b.mon(b.e).hp; sc.platformSlide = 1;
  G.engine.scenes.length = 0; G.engine.push(sc);
  const gen = G.vfx.move(sc, mv, 'p', 0);
  let n = 0, frames = 0; for (let f = 0; f < 400; f++) { const r = gen.next(); frames++; G.engine.draw(G.gfx.screen); if (r.done) break; }
  // replay and capture at 55% of the animation
  sc.fx.length = 0; sc.screenFx = null; sc.flash = 0; sc.offs.p = { x: 0, y: 0 }; sc.offs.e = { x: 0, y: 0 };
  const gen2 = G.vfx.move(sc, mv, 'p', 0); const cap = Math.max(1, Math.floor(frames * (+process.env.AT || 0.55)));
  for (let f = 0; f < cap; f++) { gen2.next(); G.engine.draw(G.gfx.screen); }
  const x = (i % cols) * 322, y = Math.floor(i / cols) * 134;
  S.copyFrom(G.gfx.screen, 0, 0, 320, 132, x, y);
  G.font.drawOutlined(S, mv, x + 4, y + 4, G.gfx.hex('#ffffff'), G.gfx.hex('#000000'));
});
H.savePNG(S, out, 1);
