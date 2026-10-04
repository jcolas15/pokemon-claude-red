// Shared setup for the game tests: the engine runs headlessly (tools/headless.js bundles src/engine/engine.ts into a
// Node vm), and `check` records each condition as a soft assertion so one run reports every failing check by name.
import { createRequire } from 'node:module';
import { expect } from 'vitest';

const require = createRequire(import.meta.url);
export const headless = require('../tools/headless.js');

export function loadGame(search = '?map=Route1&x=10&y=20') {
  const ctx = headless.loadGame({ search });
  const G = ctx.G;
  G.boot();
  G.noEncounters = true;
  G.autoBattleText = true;
  G.state.options.battleAnim = false;
  return { ctx, G, D: G.DATA };
}

export const check = (cond, message) => expect.soft(!!cond, message).toBe(true);

// run a script task to completion, pressing A every third frame
export function drive(G, task, frames = 30000) {
  for (let f = 0; f < frames && !task.done; f++) { G.input.injected.a = f % 3 === 0; G.engine.step(); }
  return task;
}
