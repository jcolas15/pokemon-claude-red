// Main loop, scene stack and coroutine scheduler.
// Scenes: { update(), draw(surf), opaque?:bool, done?:bool }.
// Coroutines are generator functions; `yield` waits one frame.
import { game } from '../global';
import { H, screen, W, type Surface } from './gfx';
import * as input from './input';

export interface Scene {
  /** called each frame; `focused` is false for scenes ticked behind the top one and on the frame a scene opens */
  update?(focused: boolean): void;
  draw?(surf: Surface): void;
  /** hides everything below it */
  opaque?: boolean;
  /** pauses script tasks while it's on top */
  modal?: boolean;
  /** keeps updating while another scene is on top */
  tickBehind?: boolean;
  done?: boolean;
  result?: unknown;
  enter?(): void;
  exit?(): void;
  bornFrame?: number;
}
export type Script<R = unknown> = Generator<unknown, R, unknown>;
export interface Task { gen: Script; done: boolean; value: unknown; name: string }

const G = game();
export const scenes: Scene[] = [];
export const tasks: Task[] = [];
let frame = 0;

export function push<S extends Scene>(scene: S): S { scene.bornFrame = frame; scenes.push(scene); if (scene.enter) scene.enter(); return scene; }
export function pop(scene?: Scene): Scene | undefined {
  const i = scene ? scenes.lastIndexOf(scene) : scenes.length - 1;
  if (i >= 0) { const s = scenes.splice(i, 1)[0]; if (s.exit) s.exit(); return s; }
}
export function top(): Scene | undefined { return scenes[scenes.length - 1]; }
// Start a coroutine; returns a handle { done, value }
export function spawn(gen: Script, name?: string): Task {
  const t: Task = { gen, done: false, value: undefined, name: name || '' };
  tasks.push(t);
  return t;
}
// Push a scene and wait until it finishes; returns scene.result
export function* run(scene: Scene): Script {
  push(scene);
  while (!scene.done) yield;
  pop(scene);
  return scene.result;
}
export function* wait(frames: number): Script<void> { for (let i = 0; i < frames; i++) yield; }
export function* waitFor(pred: () => boolean): Script<void> { while (!pred()) yield; }
// Run several generators concurrently until all finish
export function* all(gens: Script[]): Script<void> {
  const live = gens.map(g => ({ g, done: false }));
  for (;;) {
    let any = false;
    for (const l of live) if (!l.done) { const r = l.g.next(); if (r.done) l.done = true; else any = true; }
    if (!any) return;
    yield;
  }
}

export function step() {
  frame++;
  G.frame = frame;
  input.update();
  if (G.preStep) G.preStep();
  // tasks first (scripts), then the top scene receives input; a modal scene on top pauses the scripts
  const modal = scenes.length && scenes[scenes.length - 1].modal;
  for (let i = 0; i < tasks.length && !modal; i++) {
    const t = tasks[i];
    if (t.done) continue;
    try {
      const r = t.gen.next();
      if (r.done) { t.done = true; t.value = r.value; }
    } catch (e) {
      t.done = true;
      console.error('task error', t.name, e);
      if (G.onError) G.onError(e);
    }
  }
  for (let i = tasks.length - 1; i >= 0; i--) if (tasks[i].done) tasks.splice(i, 1);
  // update scenes: top scene gets focus; scenes below with `background` get ticked too
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const focused = i === scenes.length - 1;
    // a scene opened this frame waits a frame for input: the press that opened it (read by a script or the
    // scene below) must not also pick in it
    if (focused) { if (s.update) s.update(s.bornFrame !== frame); }
    else if (s.tickBehind && s.update) s.update(false);
  }
  input.pointerFallback();
}

export function draw(surf: Surface) {
  let start = 0;
  for (let i = scenes.length - 1; i >= 0; i--) if (scenes[i].opaque) { start = i; break; }
  for (let i = start; i < scenes.length; i++) scenes[i].draw?.(surf);
  if (G.postDraw) G.postDraw(surf);
}

// Browser runner: fixed 60Hz timestep, integer scaled canvas
export function startBrowser(canvas: HTMLCanvasElement) {
  const surf = screen;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = W; canvas.height = H;
  const img = ctx.createImageData(W, H);
  const view = new Uint32Array(img.data.buffer);
  function resize() {
    if (G.pageLayout && G.pageLayout(canvas)) return; // touch devices: the page lays out screen + controller (src/engine/game/touchpad.js)
    const s = Math.max(1, Math.floor(Math.min(window.innerWidth / W, window.innerHeight / H)));
    canvas.style.width = (W * s) + 'px'; canvas.style.height = (H * s) + 'px';
  }
  window.addEventListener('resize', resize); resize(); G.relayout = resize;
  let last = performance.now(), acc = 0;
  const STEP = 1000 / 60;
  function loop(now: number) {
    acc += Math.min(100, now - last); last = now;
    let n = 0;
    while (acc >= STEP && n < 4) { step(); acc -= STEP; n++; }
    if (n) { draw(surf); view.set(surf.data); ctx!.putImageData(img, 0, 0); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

G.engine = { push, pop, top, spawn, run, wait, waitFor, all, step, draw, startBrowser, scenes, tasks };
G.frame = 0;
