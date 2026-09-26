// Path audit hook: node -r ./tools/pathaudit.js <script> — logs scripted steps onto blocked cells / into other actors (JSON lines in $AUDIT_LOG).
const fs = require('fs');
const H = require('./headless.js');
const LOG = process.env.AUDIT_LOG || 'pathaudit.log';
const orig = H.loadGame;
H.loadGame = function (...a) {
  const ctx = orig.apply(this, a), G = ctx.G;
  const sm = G.Actor.prototype.startMove;
  G.Actor.prototype.startMove = function (dir, speed, jump) {
    try {
      if (G.scriptRunning > 0 && G.ow && G.ow.map && !jump) {
        const [dx, dy] = G.DIRS[dir], nx = this.x + dx, ny = this.y + dy, m = G.ow.map;
        if (m.inside(nx, ny)) {
          const water = G.ow.surfing && this.isPlayer && m.isWater(nx, ny);
          const blocked = !(m.passable(nx, ny) || m.warpAt(nx, ny) >= 0 || water);
          const other = G.ow.actors.concat([G.ow.player]).find(o => o !== this && !o.hidden && o.x === nx && o.y === ny && !o.moving);
          if (blocked || other) {
            const who = this.isPlayer ? 'PLAYER' : (this.obj && this.obj.id) || this.sprite;
            const task = G.engine.tasks.find(t => t && t.name && t.name !== 'fuzz') || {};
            fs.appendFileSync(LOG, JSON.stringify({ map: m.name, who, from: [this.x, this.y], to: [nx, ny], dir, kind: blocked ? 'wall:' + m.labelAt(nx, ny) : 'actor:' + ((other.obj && other.obj.id) || 'PLAYER'), test: process.argv[1].split('/').pop() }) + '\n');
          }
        }
      }
    } catch (e) {}
    return sm.call(this, dir, speed, jump);
  };
  return ctx;
};
