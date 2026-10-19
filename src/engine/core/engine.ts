// Main loop, scene stack and coroutine scheduler.
// Scenes: { update(), draw(surf), opaque?:bool, done?:bool }.
// Coroutines are generator functions; `yield` waits one frame.
import { game } from '../global';
import { H, Surface, bandOf, screen, view, W } from './gfx';
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
  /** draws the whole taller touch-portrait frame instead of the W x H band (the overworld) */
  tall?: boolean;
  /** fixed-position overlays (the map-name banner); drawn unzoomed above a zoomed map, else by draw() itself */
  drawHud?(surf: Surface): void;
  hudOnTop?: boolean;
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
    if (focused) { if (s.update) withBandPointer(s, () => s.update!(s.bornFrame !== frame)); }
    else if (s.tickBehind && s.update) s.update(false);
  }
  input.pointerFallback();
}

// scenes drawn in the bottom band read the pointer in band coordinates
function withBandPointer(s: Scene, fn: () => void) {
  const shift = view.h > H && !s.tall ? view.band : 0;
  if (!shift) { fn(); return; }
  const P = input.pointer, y = P.y, inside = P.inside;
  P.y -= shift; P.inside = inside && P.y >= 0 && P.y < H;
  try { fn(); } finally { P.y = y; P.inside = inside; }
}

const BACKDROP = 0xff1a1012;
// with a map surface (zoomed phone view) the overworld draws there and everything else on a transparent frame above it
function drawTall(surf: Surface, map?: Surface) {
  let start = 0;
  for (let i = scenes.length - 1; i >= 0; i--) if (scenes[i].opaque) { start = i; break; }
  const band = bandOf(surf, view.band), base = scenes[start];
  if (base && base.tall && map) {
    base.hudOnTop = true; base.draw?.(map); base.hudOnTop = false;
    if (G.fadeSurface) G.fadeSurface(map);
    surf.clear(0); base.drawHud?.(surf);
  }
  else if (base && base.tall) base.draw?.(surf);
  else { surf.clear(BACKDROP); base?.draw?.(band); }
  for (let i = start + 1; i < scenes.length; i++) scenes[i].draw?.(band);
  if (G.postDraw) G.postDraw(surf);
}

export function draw(surf: Surface, map?: Surface) {
  if (surf.h > H) { drawTall(surf, map); return; }
  let start = 0;
  for (let i = scenes.length - 1; i >= 0; i--) if (scenes[i].opaque) { start = i; break; }
  for (let i = start; i < scenes.length; i++) scenes[i].draw?.(surf);
  if (G.postDraw) G.postDraw(surf);
}

// Browser runner: fixed 60Hz timestep, integer scaled canvas
export function startBrowser(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = W; canvas.height = H;
  let img = ctx.createImageData(W, H), pixels = new Uint32Array(img.data.buffer), tall: Surface | null = null;
  const frameSurface = () => {
    if (view.h <= H) return screen;
    if (!tall || tall.h !== view.h) tall = new Surface(W, view.h);
    return tall;
  };
  // zoomed phone view: the map gets its own canvas behind the screen, in a clipped box the same size, scaled up by CSS
  const mapBox = document.createElement('div'), mapCanvas = document.createElement('canvas'), mapCtx = mapCanvas.getContext('2d');
  mapBox.style.cssText = 'position:fixed;overflow:hidden;pointer-events:none;display:none';
  mapCanvas.style.cssText = 'position:absolute;top:0;height:100%';
  mapBox.appendChild(mapCanvas); canvas.parentNode?.insertBefore(mapBox, canvas);
  let mapSurf: Surface | null = null, mapImg: ImageData | null = null, mapPixels: Uint32Array | null = null, mapZoom = 0;
  const mapSurface = () => {
    if (view.zoom <= 1 || !mapCtx) { mapBox.style.display = 'none'; return null; }
    if (!mapSurf || mapSurf.h !== view.mh) {
      mapSurf = new Surface(W, view.mh); mapCanvas.width = W; mapCanvas.height = view.mh;
      mapImg = mapCtx.createImageData(W, view.mh); mapPixels = new Uint32Array(mapImg.data.buffer);
    }
    const cs = canvas.style, bs = mapBox.style;
    if (bs.left !== cs.left || bs.top !== cs.top || bs.width !== cs.width || bs.height !== cs.height || mapZoom !== view.zoom) {
      Object.assign(bs, { left: cs.left, top: cs.top, width: cs.width, height: cs.height, display: 'block' }); mapZoom = view.zoom;
      const w = parseFloat(cs.width) || canvas.clientWidth;
      Object.assign(mapCanvas.style, { width: w * view.zoom + 'px', left: -w * (view.zoom - 1) / 2 + 'px' });
    }
    return mapSurf;
  };
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
    if (n) {
      const surf = frameSurface();
      if (canvas.height !== surf.h) { canvas.height = surf.h; img = ctx!.createImageData(W, surf.h); pixels = new Uint32Array(img.data.buffer); }
      const map = mapSurface();
      draw(surf, map ?? undefined); pixels.set(surf.data); ctx!.putImageData(img, 0, 0);
      if (map && mapImg && mapPixels) { mapPixels.set(map.data); mapCtx!.putImageData(mapImg, 0, 0); }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

G.engine = { push, pop, top, spawn, run, wait, waitFor, all, step, draw, startBrowser, scenes, tasks };
G.frame = 0;
