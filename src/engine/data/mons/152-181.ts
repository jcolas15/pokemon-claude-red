// POKéMON drawings, Gen 2 #152-181 (the Johto starters, the early routes and the babies). Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @CHIKORITA
defMon('CHIKORITA', { pal: { body: '#c8e89a', leaf: '#5cb848', vein: '#3c8a34', bud: '#3f8f3a' }, parts: [
  { t: 'e', x: 44, y: 55, rx: 3, ry: 4, c: 'body', g: 'legBR', z: -1 },
  { t: 'e', x: 33, y: 56, rx: 3, ry: 3.5, c: 'body', g: 'legBL', z: -1 },
  { t: 'e', x: 39, y: 47, rx: 11, ry: 8, c: 'body', g: 'body' },
  { t: 'e', x: 47, y: 55, rx: 3, ry: 3.6, c: 'body', g: 'legFR', z: 1 },
  { t: 'e', x: 30, y: 55, rx: 3.2, ry: 3.8, c: 'body', g: 'legFL', z: 1 },
  { t: 'p', pts: [25, 26, 28, 9, 40, 1, 47, 3, 41, 13, 31, 26], c: 'leaf', g: 'leaf', z: -0.5 },
  { t: 'stripe', pts: [28, 24, 35, 10, 45, 3], w: 1, c: 'vein', on: 'leaf' },
  { t: 'e', x: 24, y: 34, rx: 10.5, ry: 9, c: 'body', g: 'head', z: 2 },
  { t: 'e', x: 29, y: 42.5, rx: 2.2, ry: 1.6, c: 'bud', g: 'bud1', z: 3 },
  { t: 'e', x: 34, y: 41, rx: 2.2, ry: 1.6, c: 'bud', g: 'bud2', z: 3 },
  { t: 'e', x: 24, y: 43.5, rx: 2.2, ry: 1.6, c: 'bud', g: 'bud3', z: 3 },
  { t: 'eye', x: 19, y: 33, s: 3, iris: '#b03a2a', look: [-1, 0] },
  { t: 'eye', x: 27, y: 33, s: 3, iris: '#b03a2a', look: [-1, 0] },
  { t: 'mouth', x: 17, y: 38.5, w: 2, style: 'smile' },
] });

// @BAYLEEF
defMon('BAYLEEF', { pal: { body: '#f2e8a8', leaf: '#4fae45', bud: '#3f8f3a', budLight: '#77c35a' }, parts: [
  { t: 'e', x: 48, y: 56, rx: 3.2, ry: 3.6, c: 'body', g: 'legBR', z: -1 },
  { t: 'e', x: 36, y: 56.5, rx: 3.2, ry: 3.2, c: 'body', g: 'legBL', z: -1 },
  { t: 'e', x: 42, y: 47, rx: 12, ry: 8.5, c: 'body', g: 'body' },
  { t: 'c', x1: 34, y1: 44, x2: 25, y2: 28, r1: 5, r2: 4, c: 'body', g: 'neck', z: 1 },
  { t: 'e', x: 51, y: 55, rx: 3.2, ry: 4, c: 'body', g: 'legFR', z: 1 },
  { t: 'e', x: 33, y: 55, rx: 3.4, ry: 4, c: 'body', g: 'legFL', z: 1 },
  { t: 'e', x: 25.5, y: 38, rx: 2.8, ry: 2.2, c: 'bud', g: 'n1', z: 2 },
  { t: 'e', x: 31, y: 36.5, rx: 2.8, ry: 2.2, c: 'bud', g: 'n2', z: 2 },
  { t: 'e', x: 21, y: 35, rx: 2.4, ry: 2, c: 'bud', g: 'n3', z: 2 },
  { t: 'spot', x: 25, y: 37.2, rx: 1.2, ry: 1, c: 'budLight', on: 'n1' },
  { t: 'spot', x: 30.5, y: 35.7, rx: 1.2, ry: 1, c: 'budLight', on: 'n2' },
  { t: 'p', pts: [23, 18, 26, 8, 33, 5, 36, 9, 31, 11, 28, 19], c: 'leaf', g: 'leaf', z: 2.5 },
  { t: 'e', x: 21, y: 23, rx: 9, ry: 7.5, c: 'body', g: 'head', z: 3 },
  { t: 'eye', x: 16, y: 22, s: 2.8, iris: '#b03a2a', look: [-1, 0] },
  { t: 'eye', x: 23, y: 22, s: 2.8, iris: '#b03a2a', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 27, w: 2, style: 'smile' },
] });

// @MEGANIUM
defMon('MEGANIUM', { pal: { body: '#9cd07a', belly: '#d8eeb0', petal: '#f28ab4', petalIn: '#fbc6dc', stalk: '#5aa845' }, parts: [
  { t: 'e', x: 49, y: 56, rx: 3.6, ry: 3.6, c: 'body', g: 'legBR', z: -1 },
  { t: 'e', x: 39, y: 57, rx: 3.6, ry: 3, c: 'body', g: 'legBL', z: -1 },
  { t: 'e', x: 44, y: 47, rx: 13, ry: 9, c: 'body', g: 'body' },
  { t: 'spot', x: 40, y: 52, rx: 9, ry: 4, c: 'belly', on: 'body' },
  { t: 'e', x: 36, y: 38, rx: 7, ry: 4, rot: -20, c: 'petal', g: 'pb1', z: 0.5 },
  { t: 'e', x: 44, y: 37, rx: 7, ry: 4, rot: 20, c: 'petal', g: 'pb2', z: 0.4 },
  { t: 'c', x1: 34, y1: 44, x2: 24, y2: 22, r1: 5, r2: 4, c: 'body', g: 'neck', z: 1 },
  { t: 'e', x: 22, y: 38, rx: 7, ry: 4, rot: 25, c: 'petal', g: 'pf1', z: 2 },
  { t: 'e', x: 33, y: 41, rx: 7, ry: 4, rot: -10, c: 'petal', g: 'pf2', z: 2.1 },
  { t: 'e', x: 26, y: 33, rx: 6, ry: 3.6, rot: -30, c: 'petal', g: 'pf3', z: 2.2 },
  { t: 'spot', x: 22, y: 38, rx: 3, ry: 1.6, c: 'petalIn', on: 'pf1' },
  { t: 'spot', x: 33, y: 41, rx: 3, ry: 1.6, c: 'petalIn', on: 'pf2' },
  { t: 'e', x: 52, y: 56, rx: 3.6, ry: 4, c: 'body', g: 'legFR', z: 1 },
  { t: 'e', x: 35, y: 56, rx: 3.8, ry: 4, c: 'body', g: 'legFL', z: 1 },
  { t: 'l', pts: [23, 10, 25, 3, 29, 1], w: 1.6, w2: 1.2, c: 'stalk', g: 'st1', z: 2 },
  { t: 'l', pts: [26, 11, 31, 5, 35, 4], w: 1.6, w2: 1.2, c: 'stalk', g: 'st2', z: 2 },
  { t: 'e', x: 21, y: 16, rx: 8.5, ry: 7, c: 'body', g: 'head', z: 3 },
  { t: 'eye', x: 16, y: 15, s: 2.8, iris: '#b03a2a', look: [-1, 0] },
  { t: 'eye', x: 23, y: 15, s: 2.8, iris: '#b03a2a', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 20, w: 2, style: 'smile' },
] });

// @CYNDAQUIL
defMon('CYNDAQUIL', { pal: { back: '#2c4f63', cream: '#f2dd98', flame: '#ef5a2a', core: '#f8c43c' }, parts: [
  { t: 'p', pts: [37, 38, 38, 27, 42, 34, 46, 22, 48, 34, 54, 29, 51, 41], c: 'flame', g: 'flame', z: -1, flat: true },
  { t: 'p', pts: [41, 38, 43, 31, 46, 35, 49, 30, 49, 40], c: 'core', g: 'flameIn', z: -0.8, flat: true },
  { t: 'e', x: 44, y: 55, rx: 3, ry: 3, c: 'cream', g: 'legB', z: -1 },
  { t: 'e', x: 38, y: 47, rx: 12, ry: 9, c: 'back', g: 'body' },
  { t: 'spot', x: 34, y: 54, rx: 10, ry: 4, c: 'cream', on: 'body' },
  { t: 'e', x: 31, y: 55.5, rx: 3.2, ry: 3, c: 'cream', g: 'legF', z: 1 },
  { t: 'e', x: 23, y: 40, rx: 8, ry: 7, c: 'back', g: 'head', z: 2 },
  { t: 'e', x: 15, y: 42.5, rx: 6, ry: 3.6, c: 'back', g: 'head', z: 2 },
  { t: 'spot', x: 17, y: 46, rx: 9, ry: 3.2, c: 'cream', on: 'head' },
  { t: 'eye', x: 18, y: 39.5, s: 2.4, style: 'closed' },
  { t: 'mouth', x: 12, y: 44.5, w: 1.5, style: 'smile' },
] });

// @QUILAVA
defMon('QUILAVA', { pal: { back: '#2c4f63', cream: '#f2dd98', flame: '#ef5a2a', core: '#f8c43c' }, parts: [
  { t: 'p', pts: [46, 40, 50, 30, 53, 37, 58, 28, 58, 42, 52, 46], c: 'flame', g: 'tailFlame', z: -1, flat: true },
  { t: 'p', pts: [51, 41, 53, 35, 55, 39, 57, 36, 56, 43], c: 'core', g: 'tailFlameIn', z: -0.9, flat: true },
  { t: 'e', x: 45, y: 55, rx: 3.2, ry: 3.4, c: 'cream', g: 'legB', z: -1 },
  { t: 'e', x: 38, y: 46, rx: 14, ry: 8, c: 'back', g: 'body' },
  { t: 'spot', x: 35, y: 52, rx: 12, ry: 3.8, c: 'cream', on: 'body' },
  { t: 'e', x: 28, y: 55, rx: 3.4, ry: 3.4, c: 'cream', g: 'legF', z: 1 },
  { t: 'p', pts: [22, 31, 23, 21, 27, 28, 31, 19, 32, 30], c: 'flame', g: 'headFlame', z: 1.5, flat: true },
  { t: 'p', pts: [25, 30, 27, 25, 29, 28, 30, 26, 30, 31], c: 'core', g: 'headFlameIn', z: 1.6, flat: true },
  { t: 'e', x: 21, y: 37, rx: 8, ry: 6.5, c: 'back', g: 'head', z: 2 },
  { t: 'e', x: 13, y: 39.5, rx: 6, ry: 3.4, c: 'back', g: 'head', z: 2 },
  { t: 'spot', x: 15, y: 43, rx: 9, ry: 3, c: 'cream', on: 'head' },
  { t: 'eye', x: 17, y: 36, s: 2.6, style: 'angry', iris: '#c0302a', look: [-1, 0] },
  { t: 'mouth', x: 10, y: 41.5, w: 1.5, style: 'smile' },
] });

// @TYPHLOSION
defMon('TYPHLOSION', { pal: { back: '#2a4658', cream: '#f2dd98', flame: '#ef5a2a', core: '#f8c43c' }, parts: [
  { t: 'p', pts: [20, 26, 16, 14, 24, 20, 26, 8, 32, 18, 38, 6, 40, 20, 48, 12, 46, 26, 52, 22, 48, 32], c: 'flame', g: 'collar', z: -1, flat: true },
  { t: 'p', pts: [25, 25, 26, 17, 30, 22, 34, 13, 37, 23, 42, 18, 42, 28], c: 'core', g: 'collarIn', z: -0.9, flat: true },
  { t: 'c', x1: 44, y1: 49, x2: 55, y2: 55, r1: 4, r2: 2, c: 'back', g: 'tail', z: -1 },
  { t: 'e', x: 40, y: 57, rx: 4.4, ry: 2.6, c: 'cream', g: 'footB', z: -1 },
  { t: 'e', x: 36, y: 42, rx: 11, ry: 14, c: 'back', g: 'body' },
  { t: 'spot', x: 32, y: 45, rx: 7, ry: 12, c: 'cream', on: 'body' },
  { t: 'e', x: 29, y: 57, rx: 4.8, ry: 2.8, c: 'cream', g: 'footF', z: 1 },
  { t: 'c', x1: 28, y1: 38, x2: 21, y2: 44, r1: 3, r2: 2.6, c: 'cream', g: 'armF', z: 2 },
  { t: 'e', x: 26, y: 27, rx: 8, ry: 6.5, c: 'back', g: 'head', z: 2 },
  { t: 'e', x: 18, y: 29, rx: 6, ry: 3.6, c: 'back', g: 'head', z: 2 },
  { t: 'spot', x: 20, y: 32.5, rx: 9, ry: 3, c: 'cream', on: 'head' },
  { t: 'eye', x: 22, y: 26, s: 2.6, style: 'angry', iris: '#c0302a', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 31, w: 1.8, style: 'smile' },
] });

// @TOTODILE
defMon('TOTODILE', { pal: { body: '#56a2de', jaw: '#f0dc98', spike: '#d8403a', mark: '#f0d050' }, parts: [
  { t: 'p', pts: [38, 25, 44, 22, 42, 28, 48, 28, 44, 33, 50, 35, 44, 39], c: 'spike', g: 'spikes', z: -1 },
  { t: 'c', x1: 42, y1: 50, x2: 53, y2: 47, r1: 4, r2: 2, c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 39, y: 57, rx: 4, ry: 2.6, c: 'body', g: 'footB', z: -1 },
  { t: 'e', x: 35, y: 46, rx: 9, ry: 10, c: 'body', g: 'body' },
  { t: 'spot', x: 31, y: 48, rx: 5, ry: 7, c: 'jaw', on: 'body' },
  { t: 'e', x: 29, y: 57, rx: 4.4, ry: 2.8, c: 'body', g: 'footF', z: 1 },
  { t: 'c', x1: 29, y1: 42, x2: 22, y2: 46, r1: 2.6, r2: 2.4, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 28, y: 29, rx: 10.5, ry: 9, c: 'body', g: 'head', z: 2 },
  { t: 'e', x: 17, y: 31, rx: 7.5, ry: 5, c: 'body', g: 'head', z: 2 },
  { t: 'spot', x: 18, y: 35, rx: 10, ry: 3, c: 'jaw', on: 'head' },
  { t: 'eye', x: 24, y: 25, s: 3.2, iris: '#b82a2a', look: [-1, 0] },
  { t: 'mouth', x: 15, y: 33, w: 3.5, style: 'open' },
] });

// @CROCONAW
defMon('CROCONAW', { pal: { body: '#4f94d6', jaw: '#f0dc98', spike: '#d8403a', mark: '#f0d050' }, parts: [
  { t: 'p', pts: [36, 14, 44, 12, 41, 19, 49, 20, 44, 26, 52, 30, 45, 34], c: 'spike', g: 'spikes', z: -1 },
  { t: 'c', x1: 42, y1: 49, x2: 56, y2: 46, r1: 5, r2: 2.4, c: 'body', g: 'tail', z: -1 },
  { t: 'p', pts: [52, 45, 57, 40, 58, 47], c: 'spike', g: 'tailSpike', z: -1.1 },
  { t: 'e', x: 41, y: 57, rx: 4.6, ry: 2.8, c: 'body', g: 'footB', z: -1 },
  { t: 'e', x: 36, y: 42, rx: 10, ry: 13, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 45, rx: 6, ry: 10, c: 'jaw', on: 'body' },
  { t: 'e', x: 30, y: 57, rx: 5, ry: 2.8, c: 'body', g: 'footF', z: 1 },
  { t: 'c', x1: 30, y1: 36, x2: 22, y2: 41, r1: 2.8, r2: 2.6, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 29, y: 22, rx: 10, ry: 8.5, c: 'body', g: 'head', z: 2 },
  { t: 'e', x: 17, y: 25, rx: 8, ry: 5, c: 'body', g: 'head', z: 2 },
  { t: 'spot', x: 17, y: 29, rx: 11, ry: 3, c: 'jaw', on: 'head' },
  { t: 'eye', x: 25, y: 19, s: 3, style: 'angry', iris: '#b82a2a', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 27.5, w: 4, style: 'fang' },
] });

// @FERALIGATR
defMon('FERALIGATR', { pal: { body: '#3d82c6', jaw: '#f0dc98', spike: '#d8403a' }, parts: [
  { t: 'p', pts: [38, 10, 46, 8, 43, 15, 52, 16, 46, 22, 55, 26, 48, 30, 56, 36, 48, 38], c: 'spike', g: 'spikes', z: -1 },
  { t: 'c', x1: 44, y1: 50, x2: 58, y2: 52, r1: 6, r2: 2.6, c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 43, y: 57, rx: 5, ry: 3, c: 'body', g: 'footB', z: -1 },
  { t: 'e', x: 37, y: 40, rx: 12, ry: 15, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 43, rx: 7, ry: 12, c: 'jaw', on: 'body' },
  { t: 'e', x: 30, y: 57, rx: 5.6, ry: 3, c: 'body', g: 'footF', z: 1 },
  { t: 'c', x1: 29, y1: 33, x2: 19, y2: 38, r1: 3.4, r2: 3, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 29, y: 17, rx: 10, ry: 8, c: 'body', g: 'head', z: 2 },
  { t: 'e', x: 15, y: 20, rx: 10, ry: 5, c: 'body', g: 'head', z: 2 },
  { t: 'spot', x: 15, y: 24, rx: 13, ry: 3, c: 'jaw', on: 'head' },
  { t: 'eye', x: 25, y: 14, s: 3, style: 'angry', iris: '#b82a2a', look: [-1, 0] },
  { t: 'mouth', x: 10, y: 22.5, w: 5, style: 'fang' },
] });

// @SENTRET
defMon('SENTRET', { pal: { fur: '#a4683c', cream: '#f2dcb0', ring: '#6a3e20' }, parts: [
  { t: 'e', x: 45, y: 33, rx: 9, ry: 15, c: 'fur', g: 'tail', z: -1 },
  { t: 'stripe', pts: [37, 24, 53, 24], w: 2.4, c: 'cream', on: 'tail' },
  { t: 'stripe', pts: [36, 33, 54, 33], w: 2.4, c: 'cream', on: 'tail' },
  { t: 'stripe', pts: [37, 42, 53, 42], w: 2.4, c: 'cream', on: 'tail' },
  { t: 'e', x: 36, y: 57, rx: 3.6, ry: 2.2, c: 'fur', g: 'footB', z: -0.5 },
  { t: 'e', x: 32, y: 46, rx: 8, ry: 11, c: 'fur', g: 'body' },
  { t: 'spot', x: 29, y: 48, rx: 5, ry: 8, c: 'cream', on: 'body' },
  { t: 'e', x: 28, y: 57, rx: 3.8, ry: 2.4, c: 'fur', g: 'footF', z: 1 },
  { t: 'c', x1: 27, y1: 42, x2: 23, y2: 45, r1: 1.8, r2: 1.6, c: 'fur', g: 'armF', z: 2 },
  { t: 'e', x: 24, y: 20, rx: 2.4, ry: 3.2, c: 'fur', g: 'earL', z: 1.5 },
  { t: 'e', x: 33, y: 20, rx: 2.4, ry: 3.2, c: 'fur', g: 'earR', z: 1.4 },
  { t: 'e', x: 28, y: 29, rx: 9, ry: 8, c: 'fur', g: 'head', z: 2 },
  { t: 'spot', x: 26, y: 33, rx: 6, ry: 3.5, c: 'cream', on: 'head' },
  { t: 'eye', x: 24, y: 28, s: 2.6, look: [-1, 0] },
  { t: 'eye', x: 31, y: 28, s: 2.6, look: [-1, 0] },
  { t: 'mouth', x: 25, y: 33, w: 1.5, style: 'smile' },
] });

// @FURRET
defMon('FURRET', { pal: { fur: '#9c6038', cream: '#f2dcb0' }, parts: [
  { t: 'e', x: 46, y: 54, rx: 8, ry: 5, c: 'fur', g: 'tail', z: -1 },
  { t: 'stripe', pts: [42, 50, 44, 58], w: 2, c: 'cream', on: 'tail' },
  { t: 'stripe', pts: [48, 50, 50, 58], w: 2, c: 'cream', on: 'tail' },
  { t: 'c', x1: 36, y1: 56, x2: 30, y2: 22, r1: 7.5, r2: 6, c: 'fur', g: 'body' },
  { t: 'spot', x: 30, y: 40, rx: 3.5, ry: 16, c: 'cream', on: 'body' },
  { t: 'stripe', pts: [30, 27, 38, 29], w: 2.2, c: 'cream', on: 'body' },
  { t: 'stripe', pts: [31, 36, 39, 38], w: 2.2, c: 'cream', on: 'body' },
  { t: 'stripe', pts: [32, 45, 40, 47], w: 2.2, c: 'cream', on: 'body' },
  { t: 'c', x1: 27, y1: 34, x2: 23, y2: 37, r1: 1.8, r2: 1.6, c: 'fur', g: 'armF', z: 1 },
  { t: 'e', x: 23, y: 9, rx: 2, ry: 2.8, c: 'fur', g: 'earL', z: 1.5 },
  { t: 'e', x: 31, y: 9, rx: 2, ry: 2.8, c: 'fur', g: 'earR', z: 1.4 },
  { t: 'e', x: 27, y: 16, rx: 7.5, ry: 6.5, c: 'fur', g: 'head', z: 2 },
  { t: 'spot', x: 25, y: 20, rx: 5, ry: 3, c: 'cream', on: 'head' },
  { t: 'eye', x: 23, y: 15, s: 2.2, style: 'happy' },
  { t: 'eye', x: 29, y: 15, s: 2.2, style: 'happy' },
  { t: 'mouth', x: 24, y: 20, w: 1.4, style: 'smile' },
] });

// @HOOTHOOT
defMon('HOOTHOOT', { pal: { body: '#9a6a44', face: '#ecd2a2', beak: '#e8a040', leg: '#e8a040', hand: '#2a2430' }, parts: [
  { t: 'l', pts: [29, 28, 26, 16], w: 2, w2: 1.4, c: 'hand', g: 'handL', z: -1 },
  { t: 'l', pts: [35, 28, 40, 19], w: 2, w2: 1.4, c: 'hand', g: 'handR', z: -1 },
  { t: 'c', x1: 32, y1: 50, x2: 32, y2: 56, r1: 1.6, r2: 1.4, c: 'leg', g: 'leg', z: -0.5 },
  { t: 'e', x: 32, y: 57, rx: 4, ry: 1.6, c: 'leg', g: 'foot', z: -0.4 },
  { t: 'e', x: 32, y: 39, rx: 13, ry: 13, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 38, rx: 10, ry: 8, c: 'face', on: 'body' },
  { t: 'e', x: 20, y: 43, rx: 3, ry: 6, rot: 10, c: 'body', g: 'wingL', z: 1 },
  { t: 'e', x: 44, y: 43, rx: 3, ry: 6, rot: -10, c: 'body', g: 'wingR', z: 1 },
  { t: 'eye', x: 27, y: 36, s: 4, iris: '#c03a3a' },
  { t: 'eye', x: 37, y: 36, s: 4, iris: '#c03a3a' },
  { t: 'p', pts: [30, 41, 34, 41, 32, 45], c: 'beak', g: 'beak', z: 2, face: true },
] });

// @NOCTOWL
defMon('NOCTOWL', { pal: { body: '#8a5c38', face: '#ecd2a2', belly: '#d8b888', beak: '#e8a040', leg: '#e8a040' }, parts: [
  { t: 'p', pts: [24, 22, 20, 8, 29, 18], c: 'body', g: 'tuftL', z: -1 },
  { t: 'p', pts: [40, 22, 44, 8, 35, 18], c: 'body', g: 'tuftR', z: -1 },
  { t: 'e', x: 27, y: 57, rx: 3.4, ry: 1.6, c: 'leg', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.4, ry: 1.6, c: 'leg', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 38, rx: 13, ry: 18, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 44, rx: 8, ry: 10, c: 'belly', on: 'body' },
  { t: 'spot', x: 32, y: 29, rx: 10, ry: 7, c: 'face', on: 'body' },
  { t: 'e', x: 19, y: 42, rx: 3.6, ry: 10, rot: 8, c: 'body', g: 'wingL', z: 1 },
  { t: 'e', x: 45, y: 42, rx: 3.6, ry: 10, rot: -8, c: 'body', g: 'wingR', z: 1 },
  { t: 'eye', x: 27, y: 28, s: 3.6, style: 'angry', iris: '#c03a3a' },
  { t: 'eye', x: 37, y: 28, s: 3.6, style: 'angry', iris: '#c03a3a', flip: true },
  { t: 'p', pts: [30, 33, 34, 33, 32, 37], c: 'beak', g: 'beak', z: 2, face: true },
] });

// @LEDYBA
defMon('LEDYBA', { pal: { shell: '#e0433e', spot: '#1e1e2e', navy: '#2a3470', face: '#f0e2c0' }, parts: [
  { t: 'c', x1: 34, y1: 48, x2: 30, y2: 56, r1: 1.8, r2: 1.6, c: 'navy', g: 'legB', z: -1 },
  { t: 'c', x1: 42, y1: 48, x2: 44, y2: 56, r1: 1.8, r2: 1.6, c: 'navy', g: 'legB2', z: -1 },
  { t: 'e', x: 38, y: 40, rx: 14, ry: 11, c: 'shell', g: 'shell', gloss: true },
  { t: 'spot', x: 33, y: 34, rx: 2.8, ry: 2.4, c: 'spot', on: 'shell' },
  { t: 'spot', x: 44, y: 33, rx: 2.6, ry: 2.2, c: 'spot', on: 'shell' },
  { t: 'spot', x: 40, y: 42, rx: 3, ry: 2.6, c: 'spot', on: 'shell' },
  { t: 'spot', x: 49, y: 42, rx: 2.4, ry: 2.4, c: 'spot', on: 'shell' },
  { t: 'spot', x: 31, y: 44, rx: 2.4, ry: 2.2, c: 'spot', on: 'shell' },
  { t: 'c', x1: 28, y1: 47, x2: 24, y2: 55, r1: 1.8, r2: 1.6, c: 'navy', g: 'legF', z: 1 },
  { t: 'l', pts: [18, 29, 15, 22, 12, 20], w: 1.2, w2: 1, c: 'navy', g: 'antL', z: 1.5 },
  { t: 'l', pts: [23, 29, 24, 21, 22, 18], w: 1.2, w2: 1, c: 'navy', g: 'antR', z: 1.5 },
  { t: 'e', x: 12, y: 20, rx: 1.8, ry: 1.8, c: 'navy', g: 'antTipL', z: 1.5 },
  { t: 'e', x: 22, y: 18, rx: 1.8, ry: 1.8, c: 'navy', g: 'antTipR', z: 1.5 },
  { t: 'e', x: 20, y: 38, rx: 8, ry: 8, c: 'navy', g: 'head', z: 2 },
  { t: 'spot', x: 18, y: 43, rx: 5, ry: 3, c: 'face', on: 'head' },
  { t: 'eye', x: 16, y: 36, s: 3, look: [-1, 0] },
  { t: 'eye', x: 23, y: 36, s: 3, look: [-1, 0] },
  { t: 'mouth', x: 17, y: 43, w: 1.5, style: 'smile' },
] });

// @LEDIAN
defMon('LEDIAN', { pal: { shell: '#e0433e', spot: '#1e1e2e', navy: '#2a3470', glove: '#f4f0e0', wing: '#d6e8fa' }, parts: [
  { t: 'p', pts: [38, 26, 58, 16, 60, 30, 44, 34], c: 'wing', g: 'wingR', z: -2, flat: true },
  { t: 'p', pts: [30, 26, 12, 12, 8, 26, 24, 32], c: 'wing', g: 'wingL', z: -2, flat: true },
  { t: 'c', x1: 34, y1: 50, x2: 36, y2: 57, r1: 2, r2: 1.8, c: 'navy', g: 'legR', z: -1 },
  { t: 'c', x1: 29, y1: 50, x2: 27, y2: 57, r1: 2, r2: 1.8, c: 'navy', g: 'legL', z: -1 },
  { t: 'e', x: 32, y: 40, rx: 10, ry: 12, c: 'shell', g: 'body', gloss: true },
  { t: 'spot', x: 28, y: 36, rx: 2.4, ry: 2.2, c: 'spot', on: 'body' },
  { t: 'spot', x: 37, y: 37, rx: 2.4, ry: 2.2, c: 'spot', on: 'body' },
  { t: 'spot', x: 30, y: 45, rx: 2.4, ry: 2.2, c: 'spot', on: 'body' },
  { t: 'spot', x: 38, y: 46, rx: 2, ry: 2, c: 'spot', on: 'body' },
  { t: 'c', x1: 25, y1: 34, x2: 17, y2: 30, r1: 1.8, r2: 1.6, c: 'navy', g: 'arm1', z: 1 },
  { t: 'c', x1: 25, y1: 41, x2: 17, y2: 44, r1: 1.8, r2: 1.6, c: 'navy', g: 'arm2', z: 1 },
  { t: 'c', x1: 39, y1: 34, x2: 47, y2: 30, r1: 1.8, r2: 1.6, c: 'navy', g: 'arm3', z: 1 },
  { t: 'c', x1: 39, y1: 41, x2: 47, y2: 44, r1: 1.8, r2: 1.6, c: 'navy', g: 'arm4', z: 1 },
  { t: 'e', x: 16, y: 29, rx: 2.4, ry: 2.4, c: 'glove', g: 'g1', z: 1.1 },
  { t: 'e', x: 16, y: 45, rx: 2.4, ry: 2.4, c: 'glove', g: 'g2', z: 1.1 },
  { t: 'e', x: 48, y: 29, rx: 2.4, ry: 2.4, c: 'glove', g: 'g3', z: 1.1 },
  { t: 'e', x: 48, y: 45, rx: 2.4, ry: 2.4, c: 'glove', g: 'g4', z: 1.1 },
  { t: 'l', pts: [29, 16, 26, 8, 23, 6], w: 1.2, w2: 1, c: 'navy', g: 'antL', z: 1.5 },
  { t: 'l', pts: [35, 16, 38, 8, 41, 6], w: 1.2, w2: 1, c: 'navy', g: 'antR', z: 1.5 },
  { t: 'e', x: 32, y: 22, rx: 7, ry: 6.5, c: 'navy', g: 'head', z: 2 },
  { t: 'eye', x: 29, y: 21, s: 2.6 },
  { t: 'eye', x: 35, y: 21, s: 2.6 },
] });

// @SPINARAK
defMon('SPINARAK', { pal: { body: '#8ec65e', leg: '#e8d05a', band: '#7a3c8c', mark: '#f0e8a0', dark: '#2a3024', horn: '#f4f0e6' }, parts: [
  { t: 'l', pts: [40, 46, 48, 50, 53, 57], w: 1.6, w2: 1.2, c: 'leg', g: 'lb1', z: -1 },
  { t: 'l', pts: [34, 48, 36, 53, 38, 58], w: 1.6, w2: 1.2, c: 'leg', g: 'lb2', z: -1 },
  { t: 'e', x: 40, y: 40, rx: 13, ry: 10, c: 'body', g: 'abdomen' },
  { t: 'spot', x: 40, y: 38, rx: 6, ry: 4.5, c: 'mark', on: 'abdomen' },
  { t: 'spot', x: 37.5, y: 37, rx: 1.4, ry: 1.4, c: 'dark', on: 'abdomen' },
  { t: 'spot', x: 42.5, y: 37, rx: 1.4, ry: 1.4, c: 'dark', on: 'abdomen' },
  { t: 'stripe', pts: [37, 40.5, 43, 40.5], w: 1, c: 'dark', on: 'abdomen' },
  { t: 'l', pts: [26, 48, 22, 52, 18, 58], w: 1.6, w2: 1.2, c: 'leg', g: 'lf1', z: 1 },
  { t: 'l', pts: [30, 49, 30, 54, 28, 58], w: 1.6, w2: 1.2, c: 'leg', g: 'lf2', z: 1 },
  { t: 'stripe', pts: [21, 52, 24, 51], w: 1.4, c: 'band', on: 'lf1' },
  { t: 'p', pts: [21, 38, 23, 30, 26, 38], c: 'horn', g: 'horn', z: 2.5 },
  { t: 'e', x: 23, y: 44, rx: 8, ry: 6.5, c: 'body', g: 'head', z: 2 },
  { t: 'eye', x: 19, y: 43, s: 2, iris: '#1e1e2e', look: [-1, 0] },
  { t: 'eye', x: 25, y: 43, s: 2, iris: '#1e1e2e', look: [-1, 0] },
  { t: 'mouth', x: 18, y: 48, w: 1.5, style: 'fang' },
] });

// @ARIADOS
defMon('ARIADOS', { pal: { body: '#d8403a', leg: '#e8c848', band: '#6a3c8c', mark: '#f4e2a0', horn: '#8a58b0' }, parts: [
  { t: 'l', pts: [44, 44, 54, 46, 60, 56], w: 2, w2: 1.4, c: 'leg', g: 'lb1', z: -1 },
  { t: 'l', pts: [40, 48, 46, 54, 48, 60], w: 2, w2: 1.4, c: 'leg', g: 'lb2', z: -1 },
  { t: 'stripe', pts: [52, 45, 55, 47], w: 1.6, c: 'band', on: 'lb1' },
  { t: 'e', x: 42, y: 36, rx: 15, ry: 12, c: 'body', g: 'abdomen' },
  { t: 'spot', x: 42, y: 32, rx: 7, ry: 3.5, c: 'mark', on: 'abdomen' },
  { t: 'spot', x: 38, y: 40, rx: 3, ry: 2, c: 'mark', on: 'abdomen' },
  { t: 'spot', x: 47, y: 40, rx: 3, ry: 2, c: 'mark', on: 'abdomen' },
  { t: 'l', pts: [24, 46, 16, 50, 10, 58], w: 2, w2: 1.4, c: 'leg', g: 'lf1', z: 1 },
  { t: 'l', pts: [29, 48, 26, 54, 24, 60], w: 2, w2: 1.4, c: 'leg', g: 'lf2', z: 1 },
  { t: 'stripe', pts: [14, 51, 17, 49], w: 1.6, c: 'band', on: 'lf1' },
  { t: 'stripe', pts: [25, 54, 28, 55], w: 1.6, c: 'band', on: 'lf2' },
  { t: 'p', pts: [19, 36, 20, 24, 25, 36], c: 'horn', g: 'horn', z: 2.5 },
  { t: 'e', x: 21, y: 42, rx: 8.5, ry: 7, c: 'body', g: 'head', z: 2 },
  { t: 'eye', x: 17, y: 41, s: 2.2, style: 'angry', iris: '#1e1e2e', look: [-1, 0] },
  { t: 'eye', x: 23, y: 41, s: 2.2, style: 'angry', iris: '#1e1e2e', look: [-1, 0] },
  { t: 'mouth', x: 16, y: 46, w: 1.8, style: 'fang' },
] });

// @CROBAT
defMon('CROBAT', { pal: { body: '#8a58b8', wing: '#7a4aa8', wingIn: '#c890d8', ear: '#8a58b8' }, parts: [
  { t: 'p', pts: [25, 34, 3, 14, 6, 26, 1, 32, 9, 35, 5, 41, 22, 40], c: 'wing', g: 'wingTL', z: -1 },
  { t: 'p', pts: [39, 34, 61, 14, 58, 26, 63, 32, 55, 35, 59, 41, 42, 40], c: 'wing', g: 'wingTR', z: -1 },
  { t: 'spot', x: 12, y: 30, rx: 7, ry: 5, c: 'wingIn', on: 'wingTL' },
  { t: 'spot', x: 52, y: 30, rx: 7, ry: 5, c: 'wingIn', on: 'wingTR' },
  { t: 'p', pts: [27, 40, 14, 50, 20, 51, 18, 56, 29, 45], c: 'wing', g: 'wingBL', z: -1.1 },
  { t: 'p', pts: [37, 40, 50, 50, 44, 51, 46, 56, 35, 45], c: 'wing', g: 'wingBR', z: -1.1 },
  { t: 'p', pts: [26, 28, 25, 18, 31, 27], c: 'ear', g: 'earL', z: -0.5 },
  { t: 'p', pts: [38, 28, 39, 18, 33, 27], c: 'ear', g: 'earR', z: -0.5 },
  { t: 'e', x: 32, y: 35, rx: 9, ry: 9, c: 'body', g: 'body' },
  { t: 'eye', x: 28, y: 33, s: 3, style: 'angry', iris: '#e8c030' },
  { t: 'eye', x: 36, y: 33, s: 3, style: 'angry', iris: '#e8c030', flip: true },
  { t: 'mouth', x: 32, y: 39, w: 2.4, style: 'fang' },
] });

// @CHINCHOU
defMon('CHINCHOU', { pal: { body: '#4a72ca', light: '#f4e050', fin: '#3a5aa8', belly: '#8aa8e8' }, parts: [
  { t: 'p', pts: [46, 42, 57, 35, 55, 44, 58, 52], c: 'fin', g: 'tail', z: -1 },
  { t: 'l', pts: [28, 34, 22, 26, 16, 22], w: 1.4, w2: 1.2, c: 'fin', g: 'antL', z: -0.5 },
  { t: 'l', pts: [36, 33, 42, 24, 48, 19], w: 1.4, w2: 1.2, c: 'fin', g: 'antR', z: -0.5 },
  { t: 'e', x: 15, y: 21, rx: 3.6, ry: 3.6, c: 'light', g: 'orbL', z: -0.4, gloss: true },
  { t: 'e', x: 49, y: 18, rx: 3.6, ry: 3.6, c: 'light', g: 'orbR', z: -0.4, gloss: true },
  { t: 'e', x: 33, y: 43, rx: 14, ry: 11, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 49, rx: 9, ry: 4, c: 'belly', on: 'body' },
  { t: 'e', x: 30, y: 54, rx: 4, ry: 2.4, c: 'fin', g: 'finB', z: 1 },
  { t: 'eye', x: 25, y: 41, s: 3.2, iris: '#d83a3a', look: [-1, 0] },
  { t: 'eye', x: 33, y: 41, s: 3.2, iris: '#d83a3a', look: [-1, 0] },
  { t: 'mouth', x: 25, y: 47, w: 2, style: 'smile' },
] });

// @LANTURN
defMon('LANTURN', { pal: { body: '#3a68b8', belly: '#f0d460', fin: '#f0d460', light: '#fff27a', stalk: '#2e5498' }, parts: [
  { t: 'p', pts: [48, 40, 60, 30, 58, 42, 61, 54, 48, 48], c: 'fin', g: 'tail', z: -1 },
  { t: 'l', pts: [26, 30, 22, 16, 14, 10, 8, 12], w: 1.8, w2: 1.4, c: 'stalk', g: 'lure', z: -0.5 },
  { t: 'e', x: 8, y: 14, rx: 4.5, ry: 4.5, c: 'light', g: 'bulb', z: -0.4, gloss: true },
  { t: 'e', x: 34, y: 41, rx: 17, ry: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 49, rx: 13, ry: 5, c: 'belly', on: 'body' },
  { t: 'p', pts: [34, 44, 42, 52, 30, 51], c: 'fin', g: 'finSide', z: 1 },
  { t: 'eye', x: 22, y: 38, s: 3, iris: '#d83a3a', look: [-1, 0] },
  { t: 'mouth', x: 20, y: 45, w: 2.4, style: 'smile' },
] });

// @PICHU
defMon('PICHU', { pal: { fur: '#f8d848', tip: '#2a2430', cheek: '#f07a8a' }, parts: [
  { t: 'p', pts: [40, 50, 48, 46, 46, 42, 53, 40], c: 'tip', g: 'tail', z: -2 },
  { t: 'e', x: 34, y: 49, rx: 8, ry: 8, c: 'fur', g: 'body' },
  { t: 'e', x: 29, y: 57, rx: 3.6, ry: 2.2, c: 'fur', g: 'footL', z: 1 },
  { t: 'e', x: 39, y: 57, rx: 3.6, ry: 2.2, c: 'fur', g: 'footR', z: 1 },
  { t: 'c', x1: 28, y1: 46, x2: 25, y2: 49, r1: 1.8, r2: 1.6, c: 'fur', g: 'armL', z: 2 },
  { t: 'e', x: 15, y: 22, rx: 8, ry: 6, rot: 30, c: 'fur', g: 'earL', z: 1 },
  { t: 'spot', x: 10, y: 18, rx: 5, ry: 5, c: 'tip', on: 'earL' },
  { t: 'e', x: 45, y: 20, rx: 8, ry: 6, rot: -30, c: 'fur', g: 'earR', z: 0.5 },
  { t: 'spot', x: 50, y: 16, rx: 5, ry: 5, c: 'tip', on: 'earR' },
  { t: 'e', x: 30, y: 33, rx: 11, ry: 9.5, c: 'fur', g: 'head', z: 2 },
  { t: 'spot', x: 22, y: 37, rx: 2.8, ry: 2.2, c: 'cheek', on: 'head', face: true },
  { t: 'spot', x: 38, y: 37, rx: 2.8, ry: 2.2, c: 'cheek', on: 'head', face: true },
  { t: 'eye', x: 25, y: 31, s: 3, look: [-0.5, 0], sclera: false },
  { t: 'eye', x: 35, y: 31, s: 3, look: [-0.5, 0], sclera: false },
  { t: 'mouth', x: 29, y: 36, w: 1.6, style: 'smile' },
] });

// @CLEFFA
defMon('CLEFFA', { pal: { body: '#f4a8b8', ear: '#d06a84', cheek: '#e87890' }, parts: [
  { t: 'p', pts: [22, 36, 16, 20, 26, 30], c: 'body', g: 'earL', z: -1 },
  { t: 'p', pts: [42, 36, 48, 20, 38, 30], c: 'body', g: 'earR', z: -1 },
  { t: 'p', pts: [17, 22, 16, 20, 20, 24], c: 'ear', g: 'earL', z: -0.9 },
  { t: 'e', x: 26, y: 55, rx: 4, ry: 3, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 55, rx: 4, ry: 3, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 14, ry: 13, c: 'body', g: 'body' },
  { t: 'e', x: 17, y: 44, rx: 4, ry: 3, rot: -20, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 47, y: 44, rx: 4, ry: 3, rot: 20, c: 'body', g: 'armR', z: 1 },
  { t: 'l', pts: [32, 29, 31, 25, 34, 23, 35, 26], w: 1.6, w2: 1.2, c: 'body', g: 'curl', z: 2 },
  { t: 'spot', x: 23, y: 46, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 41, y: 46, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 27, y: 41, s: 2.4, style: 'happy' },
  { t: 'eye', x: 37, y: 41, s: 2.4, style: 'happy' },
  { t: 'mouth', x: 32, y: 47, w: 1.6, style: 'smile' },
] });

// @IGGLYBUFF
defMon('IGGLYBUFF', { pal: { body: '#f8b8c8', cheek: '#e87890', ear: '#f8b8c8' }, parts: [
  { t: 'p', pts: [21, 34, 17, 22, 27, 29], c: 'ear', g: 'earL', z: -1 },
  { t: 'p', pts: [43, 34, 47, 22, 37, 29], c: 'ear', g: 'earR', z: -1 },
  { t: 'e', x: 26, y: 55, rx: 4.2, ry: 3, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 55, rx: 4.2, ry: 3, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 14.5, ry: 13.5, c: 'body', g: 'body', gloss: true },
  { t: 'e', x: 18, y: 46, rx: 3, ry: 2.4, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 46, y: 46, rx: 3, ry: 2.4, c: 'body', g: 'armR', z: 1 },
  { t: 'l', pts: [30, 29, 28, 24, 32, 21, 35, 24, 32, 26], w: 1.8, w2: 1.2, c: 'body', g: 'curl', z: 2 },
  { t: 'spot', x: 23, y: 47, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 41, y: 47, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 27, y: 41, s: 3.4, iris: '#3a2a4a' },
  { t: 'eye', x: 37, y: 41, s: 3.4, iris: '#3a2a4a' },
  { t: 'mouth', x: 32, y: 48, w: 1.6, style: 'smile' },
] });

// @TOGEPI
defMon('TOGEPI', { pal: { shell: '#f8f4e8', skin: '#f8e6a0', red: '#e04848', blue: '#4878d8' }, parts: [
  { t: 'e', x: 26, y: 57, rx: 3.6, ry: 2.2, c: 'skin', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 3.6, ry: 2.2, c: 'skin', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 46, rx: 11, ry: 11, c: 'shell', g: 'shell' },
  { t: 'spot', x: 26, y: 48, rx: 2.8, ry: 2.4, c: 'red', on: 'shell' },
  { t: 'spot', x: 37, y: 51, rx: 2.8, ry: 2.4, c: 'blue', on: 'shell' },
  { t: 'spot', x: 38, y: 43, rx: 2.4, ry: 2, c: 'red', on: 'shell' },
  { t: 'spot', x: 29, y: 54, rx: 2.2, ry: 1.8, c: 'blue', on: 'shell' },
  { t: 'p', pts: [21, 41, 25, 36, 28, 40, 32, 35, 36, 40, 39, 36, 43, 41, 43, 44, 21, 44], c: 'shell', g: 'rim', z: 1 },
  { t: 'e', x: 20, y: 42, rx: 2.4, ry: 2, c: 'skin', g: 'armL', z: 1.2 },
  { t: 'e', x: 44, y: 42, rx: 2.4, ry: 2, c: 'skin', g: 'armR', z: 1.2 },
  { t: 'p', pts: [26, 22, 28, 15, 31, 21, 34, 14, 36, 22, 38, 16, 39, 24], c: 'skin', g: 'head', z: 0.5 },
  { t: 'e', x: 32, y: 30, rx: 9, ry: 8, c: 'skin', g: 'head', z: 0.5 },
  { t: 'eye', x: 28, y: 30, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 30, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 35, w: 1.6, style: 'smile' },
] });

// @TOGETIC
defMon('TOGETIC', { pal: { body: '#f8f4e8', wing: '#ffffff', red: '#e04848', blue: '#4878d8', skin: '#f8e6a0' }, parts: [
  { t: 'p', pts: [38, 36, 56, 22, 60, 30, 54, 34, 57, 40, 44, 44], c: 'wing', g: 'wingR', z: -1 },
  { t: 'p', pts: [26, 36, 8, 22, 4, 30, 10, 34, 7, 40, 20, 44], c: 'wing', g: 'wingL', z: 1 },
  { t: 'e', x: 27, y: 56, rx: 3.4, ry: 2.4, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 56, rx: 3.4, ry: 2.4, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 11, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 29, y: 48, rx: 2.4, ry: 2, c: 'red', on: 'body' },
  { t: 'spot', x: 36, y: 52, rx: 2.4, ry: 2, c: 'blue', on: 'body' },
  { t: 'c', x1: 24, y1: 40, x2: 21, y2: 45, r1: 1.8, r2: 1.6, c: 'body', g: 'armL', z: 2 },
  { t: 'p', pts: [26, 31, 28, 23, 31, 29, 33, 22, 35, 29, 38, 23, 39, 31], c: 'body', g: 'crown', z: -0.5 },
  { t: 'eye', x: 28, y: 32, s: 2.8, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 32, s: 2.8, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 37, w: 1.6, style: 'smile' },
] });

// @NATU
defMon('NATU', { pal: { body: '#5cb850', white: '#f4f0e0', beak: '#f0c040', crest: '#e04848', wing: '#e04848', leg: '#e8a040' }, parts: [
  { t: 'e', x: 27, y: 57, rx: 3.2, ry: 1.6, c: 'leg', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.2, ry: 1.6, c: 'leg', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 46, rx: 11, ry: 10, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 50, rx: 7, ry: 5, c: 'white', on: 'body' },
  { t: 'e', x: 21, y: 47, rx: 2.6, ry: 4.5, rot: 10, c: 'wing', g: 'wingL', z: 1 },
  { t: 'e', x: 43, y: 47, rx: 2.6, ry: 4.5, rot: -10, c: 'wing', g: 'wingR', z: 1 },
  { t: 'p', pts: [30, 27, 33, 21, 35, 27], c: 'crest', g: 'crest', z: 1.4 },
  { t: 'p', pts: [33, 28, 37, 23, 38, 29], c: 'crest', g: 'crest', z: 1.4 },
  { t: 'e', x: 32, y: 35, rx: 10, ry: 8.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 34, s: 3.4, iris: '#2a2430', sclera: true },
  { t: 'eye', x: 36, y: 34, s: 3.4, iris: '#2a2430', sclera: true },
  { t: 'p', pts: [30, 38, 34, 38, 32, 42], c: 'beak', g: 'beak', z: 2, face: true },
] });

// @XATU
defMon('XATU', { pal: { body: '#5cb850', wing: '#f4f0e0', band: '#e04848', band2: '#2a2430', beak: '#f0c040', crest: '#e04848', leg: '#e8a040' }, parts: [
  { t: 'e', x: 27, y: 58, rx: 3.2, ry: 1.6, c: 'leg', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 58, rx: 3.2, ry: 1.6, c: 'leg', g: 'footR', z: -0.5 },
  { t: 'c', x1: 32, y1: 22, x2: 32, y2: 54, r1: 9, r2: 9, c: 'body', g: 'body' },
  { t: 'e', x: 22, y: 42, rx: 5.5, ry: 15, c: 'wing', g: 'wingL', z: 1 },
  { t: 'stripe', pts: [17, 36, 27, 36], w: 2, c: 'band', on: 'wingL' },
  { t: 'stripe', pts: [17, 40, 27, 40], w: 1.6, c: 'band2', on: 'wingL' },
  { t: 'stripe', pts: [17, 47, 27, 47], w: 2, c: 'band', on: 'wingL' },
  { t: 'e', x: 42, y: 42, rx: 5.5, ry: 15, c: 'wing', g: 'wingR', z: 1 },
  { t: 'stripe', pts: [37, 36, 47, 36], w: 2, c: 'band', on: 'wingR' },
  { t: 'stripe', pts: [37, 40, 47, 40], w: 1.6, c: 'band2', on: 'wingR' },
  { t: 'stripe', pts: [37, 47, 47, 47], w: 2, c: 'band', on: 'wingR' },
  { t: 'p', pts: [30, 12, 33, 6, 35, 12], c: 'crest', g: 'crest', z: 1.4 },
  { t: 'e', x: 32, y: 19, rx: 7.5, ry: 7, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 29, y: 18, s: 2.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 35, y: 18, s: 2.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'p', pts: [30, 22, 34, 22, 32, 26], c: 'beak', g: 'beak', z: 2, face: true },
] });

// @MAREEP
defMon('MAREEP', { pal: { wool: '#f4f0e0', skin: '#4a8ad8', orb: '#f0c040', stripe: '#2a2430', horn: '#f0c040' }, parts: [
  { t: 'c', x1: 48, y1: 42, x2: 56, y2: 38, r1: 1.6, r2: 1.4, c: 'skin', g: 'tail', z: -1 },
  { t: 'e', x: 57, y: 37, rx: 3, ry: 3, c: 'orb', g: 'orb', z: -1, gloss: true },
  { t: 'c', x1: 44, y1: 48, x2: 44, y2: 57, r1: 2.4, r2: 2.2, c: 'skin', g: 'legB', z: -1 },
  { t: 'stripe', pts: [42, 53, 46, 53], w: 1.4, c: 'stripe', on: 'legB' },
  { t: 'e', x: 38, y: 40, rx: 14, ry: 11, c: 'wool', g: 'body', soft: true },
  { t: 'e', x: 28, y: 36, rx: 5, ry: 5, c: 'wool', g: 'body', soft: true },
  { t: 'e', x: 48, y: 36, rx: 5, ry: 5, c: 'wool', g: 'body', soft: true },
  { t: 'c', x1: 32, y1: 48, x2: 31, y2: 57, r1: 2.4, r2: 2.2, c: 'skin', g: 'legF', z: 1 },
  { t: 'stripe', pts: [29, 53, 33, 53], w: 1.4, c: 'stripe', on: 'legF' },
  { t: 'e', x: 19, y: 30, rx: 3, ry: 1.6, rot: -30, c: 'skin', g: 'ear', z: 1.4 },
  { t: 'l', pts: [24, 24, 21, 20, 23, 17], w: 1.6, w2: 1.2, c: 'horn', g: 'horn', z: 1.5 },
  { t: 'e', x: 21, y: 34, rx: 7, ry: 6.5, c: 'skin', g: 'head', z: 2 },
  { t: 'eye', x: 19, y: 33, s: 2.6, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 16, y: 38, w: 1.4, style: 'smile' },
] });

// @FLAAFFY
defMon('FLAAFFY', { pal: { skin: '#f4a0b8', wool: '#f4f0e0', orb: '#4a8ad8', stripe: '#2a2430' }, parts: [
  { t: 'c', x1: 40, y1: 48, x2: 52, y2: 42, r1: 2, r2: 1.6, c: 'skin', g: 'tail', z: -1 },
  { t: 'e', x: 54, y: 41, rx: 3, ry: 3, c: 'orb', g: 'orb', z: -1, gloss: true },
  { t: 'c', x1: 36, y1: 50, x2: 37, y2: 57, r1: 2.6, r2: 2.4, c: 'skin', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 50, x2: 27, y2: 57, r1: 2.6, r2: 2.4, c: 'skin', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 43, rx: 9, ry: 10, c: 'skin', g: 'body' },
  { t: 'e', x: 32, y: 36, rx: 11, ry: 5.5, c: 'wool', g: 'wool', z: 1, soft: true },
  { t: 'e', x: 32, y: 55, rx: 8, ry: 3.4, c: 'wool', g: 'woolB', z: 0.2, soft: true },
  { t: 'c', x1: 24, y1: 40, x2: 20, y2: 45, r1: 1.8, r2: 1.6, c: 'skin', g: 'armL', z: 2 },
  { t: 'e', x: 27, y: 14, rx: 2, ry: 4, rot: -20, c: 'skin', g: 'earL', z: 1.4 },
  { t: 'stripe', pts: [25, 12, 29, 12], w: 1.4, c: 'stripe', on: 'earL' },
  { t: 'e', x: 38, y: 14, rx: 2, ry: 4, rot: 20, c: 'skin', g: 'earR', z: 1.3 },
  { t: 'stripe', pts: [36, 12, 40, 12], w: 1.4, c: 'stripe', on: 'earR' },
  { t: 'e', x: 32, y: 24, rx: 8, ry: 7.5, c: 'skin', g: 'head', z: 2 },
  { t: 'eye', x: 28, y: 23, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 35, y: 23, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 31, y: 28, w: 1.6, style: 'smile' },
] });

// @AMPHAROS
defMon('AMPHAROS', { pal: { skin: '#f4d040', stripe: '#2a2430', belly: '#f8f0d0', orb: '#e04848' }, parts: [
  { t: 'c', x1: 40, y1: 50, x2: 54, y2: 44, r1: 2.8, r2: 2, c: 'skin', g: 'tail', z: -1 },
  { t: 'stripe', pts: [46, 45, 47, 51], w: 1.6, c: 'stripe', on: 'tail' },
  { t: 'stripe', pts: [50, 44, 51, 49], w: 1.6, c: 'stripe', on: 'tail' },
  { t: 'e', x: 56, y: 43, rx: 3.4, ry: 3.4, c: 'orb', g: 'orbT', z: -1, gloss: true },
  { t: 'c', x1: 36, y1: 50, x2: 37, y2: 57, r1: 3, r2: 2.8, c: 'skin', g: 'legR', z: -0.5 },
  { t: 'c', x1: 28, y1: 50, x2: 26, y2: 57, r1: 3, r2: 2.8, c: 'skin', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 10, ry: 12, c: 'skin', g: 'body' },
  { t: 'spot', x: 30, y: 46, rx: 5.5, ry: 7, c: 'belly', on: 'body' },
  { t: 'c', x1: 24, y1: 38, x2: 20, y2: 44, r1: 2, r2: 1.8, c: 'skin', g: 'armL', z: 2 },
  { t: 'c', x1: 30, y1: 32, x2: 29, y2: 18, r1: 4.5, r2: 4, c: 'skin', g: 'neck', z: 1 },
  { t: 'stripe', pts: [25, 22, 34, 22], w: 2, c: 'stripe', on: 'neck' },
  { t: 'stripe', pts: [25, 27, 34, 27], w: 2, c: 'stripe', on: 'neck' },
  { t: 'e', x: 26, y: 14, rx: 7.5, ry: 6.5, c: 'skin', g: 'head', z: 2 },
  { t: 'e', x: 31, y: 5, rx: 3, ry: 3, c: 'orb', g: 'orbH', z: 1.8, gloss: true },
  { t: 'e', x: 32, y: 13, rx: 2, ry: 3.4, rot: 30, c: 'stripe', g: 'ear', z: 2.1 },
  { t: 'eye', x: 22, y: 13, s: 2.4, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 20, y: 18, w: 1.4, style: 'smile' },
] });
