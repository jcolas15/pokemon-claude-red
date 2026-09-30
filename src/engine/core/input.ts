// Keyboard / gamepad input mapped onto Game Boy style buttons.
import { game } from '../global';
import { W, H } from './gfx';

export const BTN = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select'] as const;
export type Button = (typeof BTN)[number];
const KEYMAP: Record<string, Button> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
  KeyZ: 'a', KeyJ: 'a', Space: 'a', KeyX: 'b', KeyK: 'b', Backspace: 'b', Escape: 'b',
  Enter: 'start', ShiftRight: 'select', ShiftLeft: 'select', KeyC: 'select',
};
type Flags = Record<Button, boolean>;
const flags = () => Object.fromEntries(BTN.map(b => [b, false])) as Flags;
const raw = flags();
export const down = flags(), pressed = flags(), released = flags();
export const held = Object.fromEntries(BTN.map(b => [b, 0])) as Record<Button, number>;
/** headless / scripted input: buttons, plus pointer = {x, y, click, right, wheel} for one frame */
export const injected: Partial<Flags> & { pointer?: { x: number; y: number; click?: boolean; right?: boolean; wheel?: number } | null } = {};
const pulse: Partial<Flags> = {};    // one-frame synthetic presses (unclaimed clicks -> A, right click -> B, wheel -> up/down)
const touch: Partial<Flags> = {};    // on-screen controller (src/engine/game/touchpad.js); a press also pulses so a quick tap never falls between frames

// ---- mouse / touch: position in game pixels; press flags latched once per frame ----
// Scenes hit-test with G.pointer.in(x, y, w, h) and claim a click with consume(); unclaimed clicks become buttons.
export const pointer = { x: -1, y: -1, inside: false, down: false, pressed: false, rpressed: false, moved: false, wheel: 0, used: false, touch: false,
  in(x: number, y: number, w: number, h: number) { return this.inside && this.x >= x && this.y >= y && this.x < x + w && this.y < y + h; },
  consume() { this.used = true; },
};
const pend = { press: false, rpress: false, moved: false, wheel: 0, down: false };
let canvasEl: HTMLElement | null = null;
function toGame(e: MouseEvent) {
  const c = canvasEl || (canvasEl = document.getElementById('screen')); if (!c) return false;
  const r = c.getBoundingClientRect(); if (!r.width) return false;
  pointer.x = Math.floor((e.clientX - r.left) * W / r.width); pointer.y = Math.floor((e.clientY - r.top) * H / r.height);
  pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x < W && pointer.y < H;
  return pointer.inside;
}

// typing in the page's own fields (the email signup) must not walk the player or get swallowed
const typing = (e: Event) => { const t = e.target as HTMLElement | null; return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable); };
const onChrome = (e: Event) => { const t = e.target as Element | null; return !!(t && t.closest && t.closest('[data-chrome]')); };
function onKey(e: KeyboardEvent, v: boolean) {
  const b = KEYMAP[e.code];
  if (!b || (v && typing(e))) return;
  raw[b] = v;
  e.preventDefault();
}
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('keydown', e => onKey(e, true));
  document.addEventListener('keyup', e => onKey(e, false));
  window.addEventListener('blur', () => BTN.forEach(b => raw[b] = false));
  document.addEventListener('pointermove', e => { toGame(e); pend.moved = true; pointer.touch = e.pointerType === 'touch'; });
  document.addEventListener('pointerdown', e => {
    if (onChrome(e) || !toGame(e)) return;
    pointer.touch = e.pointerType === 'touch';
    if (e.button === 2) pend.rpress = true; else { pend.press = true; pend.down = true; }
    e.preventDefault();
  });
  document.addEventListener('pointerup', () => { pend.down = false; });
  document.addEventListener('contextmenu', e => { if (e.target && (e.target as Element).id === 'screen') e.preventDefault(); });
  document.addEventListener('wheel', e => { if (onChrome(e) || !toGame(e)) return; pend.wheel += Math.sign(e.deltaY); e.preventDefault(); }, { passive: false });
}

function pollPad(): Partial<Flags> | null {
  if (typeof navigator === 'undefined' || !navigator.getGamepads) return null;
  const pads = navigator.getGamepads(); if (!pads) return null;
  for (const p of pads) {
    if (!p) continue;
    const bt = (i: number) => !!(p.buttons[i] && p.buttons[i].pressed);
    const ax = p.axes[0] || 0, ay = p.axes[1] || 0;
    return {
      up: bt(12) || ay < -0.5, down: bt(13) || ay > 0.5, left: bt(14) || ax < -0.5, right: bt(15) || ax > 0.5,
      a: bt(0), b: bt(1) || bt(2), start: bt(9), select: bt(8),
    };
  }
  return null;
}

export function update() {
  const pad = pollPad();
  for (const b of BTN) {
    const v = raw[b] || !!injected[b] || !!(pad && pad[b]) || !!pulse[b] || !!touch[b];
    pressed[b] = v && !down[b];
    released[b] = !v && down[b];
    down[b] = v;
    held[b] = v ? held[b] + 1 : 0;
  }
  for (const b in pulse) delete pulse[b as Button];
  // pointer: latch this frame's edges (injected.pointer = {x, y, click, right} drives it headlessly)
  const ip = injected.pointer;
  if (ip) { pointer.x = ip.x; pointer.y = ip.y; pointer.inside = true; if (ip.click) pend.press = true; if (ip.right) pend.rpress = true; if (ip.wheel) pend.wheel += ip.wheel; pend.moved = true; injected.pointer = null; }
  pointer.pressed = pend.press; pointer.rpressed = pend.rpress; pointer.moved = pend.moved; pointer.wheel = pend.wheel; pointer.down = pend.down;
  pend.press = pend.rpress = pend.moved = false; pend.wheel = 0; pointer.used = false;
}
// after the scenes ran: clicks nobody claimed act like A, right clicks like B, the wheel like up/down
export function pointerFallback() {
  if (pointer.used) return;
  if (pointer.pressed) pulse.a = true;
  if (pointer.rpressed) pulse.b = true;
  if (pointer.wheel > 0) pulse.down = true; else if (pointer.wheel < 0) pulse.up = true;
}
// true on press, then repeats while held (menu navigation)
export function repeat(b: Button, delay?: number, rate?: number) {
  delay = delay || 18; rate = rate || 5;
  if (pressed[b]) return true;
  const h = held[b];
  return h > delay && (h - delay) % rate === 0;
}
// Direction currently held (last pressed priority is approximated by fixed order)
export function dir(): Button | null {
  if (down.up) return 'up'; if (down.down) return 'down'; if (down.left) return 'left'; if (down.right) return 'right';
  return null;
}
export function clear() { BTN.forEach(b => { pressed[b] = false; }); }

export function touchSet(b: Button, on: boolean) { touch[b] = on; if (on) pulse[b] = true; }

const G = game();
G.input = { down, pressed, released, held, update, repeat, dir, clear, injected, BTN, pointerFallback, touchSet };
G.pointer = pointer;
