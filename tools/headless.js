// Headless runner: runs the game engine in a Node VM (bundled from src/engine/engine.ts) and dumps frames to PNG.
'use strict';
const vm = require('vm'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const ROOT = path.join(__dirname, '..');

function memStorage() {
  const m = {};
  return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; } };
}

function loadGame(opts) {
  opts = opts || {};
  const ctx = {
    console, Math, Date, JSON, Object, Array, String, Number, Boolean, Error, Map, Set, Symbol, Promise, RegExp,
    Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, Uint8ClampedArray,
    ArrayBuffer, DataView, parseInt, parseFloat, isNaN, isFinite, Infinity, NaN, undefined,
    performance: { now: () => Date.now() }, setTimeout, clearTimeout,
    localStorage: memStorage(), location: { search: opts.search || '' }, HEADLESS: true,
  };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
  vm.createContext(ctx);
  vm.runInContext(engineBundle(), ctx, { filename: 'engine.bundle.js' });
  return ctx;
}

// src/engine/engine.ts bundled once per process (JS and TypeScript alike); the browser-only platform.ts stays out
let bundle = null;
function engineBundle() {
  if (!bundle) bundle = require('esbuild').buildSync({
    entryPoints: [path.join(ROOT, 'src', 'engine', 'engine.ts')], bundle: true, write: false, format: 'iife', platform: 'neutral', target: 'es2020',
  }).outputFiles[0].text;
  return bundle;
}

const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
// surf: {w,h,data:Uint32Array}; scale: integer upscale
function savePNG(surf, file, scale, bg) {
  scale = scale || 1;
  const W = surf.w * scale, H = surf.h * scale;
  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    for (let x = 0; x < W; x++) {
      let c = surf.data[Math.floor(y / scale) * surf.w + Math.floor(x / scale)];
      if ((c >>> 24) === 0 && bg !== undefined) c = bg;
      const o = y * (W * 4 + 1) + 1 + x * 4;
      raw[o] = c & 255; raw[o + 1] = (c >>> 8) & 255; raw[o + 2] = (c >>> 16) & 255; raw[o + 3] = c >>> 24;
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
}

// Drive the game: steps = [{frames, press:{a:true}}...]
function runFrames(G, n) { for (let i = 0; i < n; i++) { G.engine.step(); G.engine.draw(G.gfx.screen); } }
function hold(G, btns, frames) {
  for (const b of btns) G.input.injected[b] = true;
  runFrames(G, frames);
  for (const b of btns) G.input.injected[b] = false;
}
function tap(G, b, after) { hold(G, [b], 2); runFrames(G, after === undefined ? 6 : after); }
function shot(G, file, scale) { G.engine.draw(G.gfx.screen); savePNG(G.gfx.screen, file, scale || 2); }

module.exports = { loadGame, savePNG, runFrames, hold, tap, shot, ROOT };
