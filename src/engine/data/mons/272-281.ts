// POKéMON drawings, Gen 3 #272-281. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @LUDICOLO
defMon('LUDICOLO', { pal: { body: '#f0d050', stripe: '#3a8070', limb: '#5cb848', hat: '#78c850', vein: '#4a9838', beak: '#f0a038', blk: '#2a2430' }, parts: [
  { t: 'c', x1: 37, y1: 46, x2: 41, y2: 56, r1: 3.4, r2: 3, c: 'limb', g: 'legR', z: -0.5 },
  { t: 'e', x: 42, y: 57.5, rx: 4.5, ry: 2, c: 'limb', g: 'legR', z: -0.5 },
  { t: 'c', x1: 27, y1: 46, x2: 23, y2: 56, r1: 3.4, r2: 3, c: 'limb', g: 'legL', z: 0.5 },
  { t: 'e', x: 21, y: 57.5, rx: 4.5, ry: 2, c: 'limb', g: 'legL', z: 0.5 },
  { t: 'c', x1: 40, y1: 33, x2: 51, y2: 24, r1: 3, r2: 2.6, c: 'limb', g: 'armR', z: -1 },
  { t: 'e', x: 52, y: 21, rx: 3.4, ry: 3.6, c: 'limb', g: 'armR', z: -1 },
  { t: 'e', x: 32, y: 39, rx: 13, ry: 11, c: 'body', g: 'body' },
  { t: 'stripe', pts: [19, 36, 25, 34, 32, 36, 39, 34, 45, 36], w: 2.4, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [19, 42, 25, 40, 32, 42, 39, 40, 45, 42], w: 2.4, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [21, 48, 26, 46, 32, 48, 38, 46, 43, 48], w: 2.4, c: 'stripe', on: 'body' },
  { t: 'c', x1: 24, y1: 33, x2: 13, y2: 25, r1: 3, r2: 2.6, c: 'limb', g: 'armL', z: 1 },
  { t: 'e', x: 11, y: 22, rx: 3.4, ry: 3.6, c: 'limb', g: 'armL', z: 1 },
  { t: 'e', x: 32, y: 27, rx: 11, ry: 8, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 18, rx: 18, ry: 4.5, c: 'hat', g: 'hat', z: 1.5 },
  { t: 'e', x: 32, y: 14.5, rx: 9, ry: 4.5, c: 'hat', g: 'hat', z: 1.5 },
  { t: 'stripe', pts: [32, 12, 32, 21], w: 0.8, c: 'vein', on: 'hat' },
  { t: 'stripe', pts: [31, 17, 17, 19], w: 0.8, c: 'vein', on: 'hat' },
  { t: 'stripe', pts: [33, 17, 47, 19], w: 0.8, c: 'vein', on: 'hat' },
  { t: 'eye', x: 27.5, y: 25.5, s: 2.6, style: 'happy', iris: '#2a2430' },
  { t: 'eye', x: 36.5, y: 25.5, s: 2.6, style: 'happy', iris: '#2a2430' },
  { t: 'e', x: 32, y: 31, rx: 6.5, ry: 2.4, c: 'beak', g: 'beak', z: 1.7, face: true },
  { t: 'stripe', pts: [26, 31, 32, 32, 38, 31], w: 0.8, c: 'blk', on: 'beak' },
] });

// @SEEDOT
defMon('SEEDOT', { pal: { body: '#c08a50', cap: '#5a3a28', face: '#e8c890', foot: '#6a4630', leaf: '#5cb848' }, parts: [
  { t: 'e', x: 28, y: 57, rx: 2.6, ry: 1.6, c: 'foot', g: 'footL', z: -0.5 },
  { t: 'e', x: 36, y: 57, rx: 2.6, ry: 1.6, c: 'foot', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 46, rx: 8.5, ry: 10, c: 'body', g: 'body' },
  { t: 'p', pts: [26, 52, 32, 57, 38, 52], c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 44, rx: 5, ry: 3.4, c: 'face', on: 'body', face: true },
  { t: 'e', x: 32, y: 37, rx: 9.5, ry: 6, c: 'cap', g: 'cap', z: 1, gloss: true },
  { t: 'l', pts: [32, 31, 32, 28], w: 1.4, c: 'foot', g: 'stem', z: 0.8 },
  { t: 'p', pts: [32, 28, 36, 25, 40, 26, 36, 29], c: 'leaf', g: 'leaf', z: 0.9 },
  { t: 'eye', x: 28, y: 44, s: 2, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 34, y: 44, s: 2, iris: '#2a2430', sclera: false },
] });

// @NUZLEAF
defMon('NUZLEAF', { pal: { skin: '#d8aa70', dark: '#5a3a28', hair: '#6a4630', leaf: '#5cb848' }, parts: [
  { t: 'c', x1: 35, y1: 46, x2: 37, y2: 56, r1: 2.6, r2: 2.2, c: 'dark', g: 'legR', z: -0.5 },
  { t: 'e', x: 36, y: 57.5, rx: 3, ry: 1.6, c: 'dark', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 46, x2: 27, y2: 56, r1: 2.6, r2: 2.2, c: 'dark', g: 'legL', z: 0.5 },
  { t: 'e', x: 26, y: 57.5, rx: 3, ry: 1.6, c: 'dark', g: 'legL', z: 0.5 },
  { t: 'c', x1: 32, y1: 34, x2: 32, y2: 44, r1: 6, r2: 7, c: 'skin', g: 'body' },
  { t: 'e', x: 32, y: 46, rx: 7.5, ry: 4, c: 'dark', g: 'hips', z: 0.2 },
  { t: 'c', x1: 37, y1: 36, x2: 42, y2: 44, r1: 1.8, r2: 1.6, c: 'skin', g: 'armR', z: -1 },
  { t: 'c', x1: 27, y1: 36, x2: 22, y2: 44, r1: 1.8, r2: 1.6, c: 'skin', g: 'armL', z: 1 },
  { t: 'e', x: 32, y: 26, rx: 8.5, ry: 8, c: 'skin', g: 'head', z: 1.2 },
  { t: 'e', x: 33, y: 21, rx: 9, ry: 5, c: 'hair', g: 'hair', z: 1.3 },
  { t: 'p', pts: [33, 17, 36, 8, 42, 4, 40, 11, 36, 17], c: 'leaf', g: 'leaf', z: 1.1 },
  { t: 'c', x1: 27, y1: 28, x2: 18, y2: 29, r1: 2, r2: 1, c: 'skin', g: 'nose', z: 1.6, face: true },
  { t: 'eye', x: 27, y: 25, s: 2.2, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 34, y: 25, s: 2.2, style: 'angry', iris: '#2a2430', flip: true },
  { t: 'mouth', x: 31, y: 31, w: 2.4, style: 'smile' },
] });

// @SHIFTRY
defMon('SHIFTRY', { pal: { skin: '#b07a50', face: '#e8cc98', dark: '#4a3024', hair: '#f4f0e8', leaf: '#5cb848', geta: '#8a6040' }, parts: [
  { t: 'e', x: 40, y: 15, rx: 9, ry: 7, c: 'hair', g: 'mane', z: -2 },
  { t: 'e', x: 49, y: 22, rx: 8, ry: 7, c: 'hair', g: 'mane', z: -2 },
  { t: 'e', x: 54, y: 32, rx: 6, ry: 7, c: 'hair', g: 'mane', z: -2 },
  { t: 'p', pts: [52, 36, 60, 34, 58, 44], c: 'hair', g: 'mane', z: -2 },
  { t: 'p', pts: [42, 46, 51, 40, 62, 40, 60, 46, 52, 47], c: 'leaf', g: 'fanR1', z: -1.5 },
  { t: 'p', pts: [42, 46, 50, 48, 59, 54, 54, 56, 47, 50], c: 'leaf', g: 'fanR2', z: -1.6 },
  { t: 'c', x1: 37, y1: 34, x2: 43, y2: 45, r1: 2, r2: 1.8, c: 'skin', g: 'armR', z: -1 },
  { t: 'c', x1: 36, y1: 44, x2: 38, y2: 55, r1: 2.6, r2: 2.2, c: 'dark', g: 'legR', z: -0.5 },
  { t: 'p', pts: [33, 55, 43, 55, 43, 58, 33, 58], c: 'geta', g: 'getaR', z: -0.4 },
  { t: 'c', x1: 28, y1: 44, x2: 26, y2: 55, r1: 2.6, r2: 2.2, c: 'dark', g: 'legL', z: 0.5 },
  { t: 'p', pts: [21, 55, 31, 55, 31, 58, 21, 58], c: 'geta', g: 'getaL', z: 0.6 },
  { t: 'c', x1: 32, y1: 30, x2: 32, y2: 42, r1: 6, r2: 7, c: 'skin', g: 'body' },
  { t: 'e', x: 32, y: 44, rx: 7.5, ry: 3.5, c: 'dark', g: 'body' },
  { t: 'c', x1: 27, y1: 33, x2: 19, y2: 42, r1: 2, r2: 1.8, c: 'skin', g: 'armL', z: 1 },
  { t: 'p', pts: [19, 42, 7, 34, 2, 38, 8, 43], c: 'leaf', g: 'fanL1', z: 1.2 },
  { t: 'p', pts: [19, 42, 4, 44, 4, 49, 11, 47], c: 'leaf', g: 'fanL2', z: 1.3 },
  { t: 'p', pts: [19, 42, 10, 50, 13, 55, 18, 49], c: 'leaf', g: 'fanL3', z: 1.4 },
  { t: 'e', x: 32, y: 21, rx: 7.5, ry: 8, c: 'face', g: 'head', z: 1.2 },
  { t: 'e', x: 33, y: 14, rx: 8.5, ry: 4.5, c: 'hair', g: 'hairTop', z: 1.4 },
  { t: 'e', x: 39, y: 18, rx: 4, ry: 5, c: 'hair', g: 'hairTop', z: 1.4 },
  { t: 'c', x1: 26, y1: 22, x2: 14, y2: 23, r1: 2.2, r2: 1, c: 'face', g: 'nose', z: 1.6, face: true },
  { t: 'eye', x: 27, y: 19, s: 2.2, style: 'angry', iris: '#c03a3a' },
  { t: 'eye', x: 34, y: 19, s: 2.2, style: 'angry', iris: '#c03a3a', flip: true },
] });

// @TAILLOW
defMon('TAILLOW', { pal: { body: '#2c3a70', red: '#e04848', white: '#f4f0e8', beak: '#3a3440', leg: '#e8a040' }, parts: [
  { t: 'p', pts: [40, 46, 56, 50, 58, 56, 50, 52, 54, 58, 40, 52], c: 'body', g: 'tail', z: -2 },
  { t: 'l', pts: [31, 50, 30, 57], w: 1.2, c: 'leg', g: 'legR', z: -1, flat: true },
  { t: 'l', pts: [36, 50, 35, 57], w: 1.2, c: 'leg', g: 'legL', z: -1, flat: true },
  { t: 'e', x: 34, y: 44, rx: 10, ry: 8, c: 'body', g: 'body' },
  { t: 'spot', x: 28, y: 48, rx: 7, ry: 5, c: 'white', on: 'body', face: true },
  { t: 'p', pts: [33, 39, 48, 40, 56, 46, 44, 49, 35, 46], c: 'body', g: 'wing', z: 1 },
  { t: 'e', x: 26, y: 33, rx: 8, ry: 7.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 21, y: 35, rx: 4.5, ry: 4, c: 'red', on: 'head', face: true },
  { t: 'p', pts: [19, 33, 13, 35, 19, 36], c: 'beak', g: 'beak', z: 2 },
  { t: 'eye', x: 23, y: 31, s: 2.2, style: 'angry', iris: '#2a2430' },
] });

// @SWELLOW
defMon('SWELLOW', { pal: { body: '#2c3a70', red: '#e04848', white: '#f4f0e8', beak: '#3a3440', leg: '#e8a040' }, parts: [
  { t: 'p', pts: [42, 44, 60, 52, 63, 62, 52, 52, 56, 63, 40, 50], c: 'body', g: 'tail', z: -2 },
  { t: 'p', pts: [42, 30, 54, 10, 63, 4, 58, 20, 50, 36], c: 'body', g: 'wingR', z: -1.5 },
  { t: 'l', pts: [31, 48, 30, 57], w: 1.4, c: 'leg', g: 'legR', z: -1, flat: true },
  { t: 'l', pts: [37, 48, 36, 57], w: 1.4, c: 'leg', g: 'legL', z: -1, flat: true },
  { t: 'e', x: 35, y: 40, rx: 11, ry: 10, c: 'body', g: 'body' },
  { t: 'spot', x: 29, y: 45, rx: 7.5, ry: 7, c: 'white', on: 'body', face: true },
  { t: 'p', pts: [34, 34, 48, 26, 58, 18, 54, 32, 44, 42, 36, 42], c: 'body', g: 'wingL', z: 1 },
  { t: 'e', x: 25, y: 26, rx: 8.5, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 20, y: 29, rx: 5, ry: 4.5, c: 'red', on: 'head', face: true },
  { t: 'p', pts: [30, 20, 40, 10, 38, 18, 44, 14, 36, 24], c: 'body', g: 'crest', z: 1.4 },
  { t: 'p', pts: [18, 26, 10, 28, 18, 29.5], c: 'beak', g: 'beak', z: 2 },
  { t: 'eye', x: 22, y: 24.5, s: 2.2, style: 'angry', iris: '#2a2430' },
] });

// @WINGULL
defMon('WINGULL', { pal: { body: '#f8f8f4', blue: '#5890d8', beak: '#f0c040', tail: '#5890d8' }, parts: [
  { t: 'p', pts: [42, 42, 52, 38, 54, 44, 46, 46], c: 'tail', g: 'tail', z: -1.5 },
  { t: 'p', pts: [34, 36, 46, 26, 62, 28, 60, 31, 46, 32, 40, 40], c: 'body', g: 'wingR', z: -1 },
  { t: 'stripe', pts: [44, 28, 62, 29], w: 2, c: 'blue', on: 'wingR' },
  { t: 'e', x: 34, y: 42, rx: 10, ry: 7, c: 'body', g: 'body' },
  { t: 'p', pts: [30, 38, 18, 28, 2, 30, 4, 33, 18, 34, 28, 44], c: 'body', g: 'wingL', z: 1 },
  { t: 'stripe', pts: [2, 31, 18, 29, 26, 37], w: 2, c: 'blue', on: 'wingL' },
  { t: 'p', pts: [26, 41, 12, 43, 10, 45, 14, 46, 26, 45], c: 'beak', g: 'beak', z: 1.4 },
  { t: 'eye', x: 28, y: 39, s: 2, style: 'dot', iris: '#2a2430' },
] });

// @PELIPPER
defMon('PELIPPER', { pal: { body: '#f8f8f4', blue: '#5890d8', beak: '#f0c840', inner: '#e8a030', leg: '#f0a040' }, parts: [
  { t: 'p', pts: [38, 26, 50, 10, 63, 6, 60, 14, 52, 26, 46, 34], c: 'body', g: 'wingR', z: -1.5 },
  { t: 'stripe', pts: [48, 12, 63, 7], w: 2.4, c: 'blue', on: 'wingR' },
  { t: 'e', x: 41, y: 56, rx: 3.4, ry: 1.6, c: 'leg', g: 'footR', z: -1 },
  { t: 'e', x: 47, y: 57, rx: 3.4, ry: 1.6, c: 'leg', g: 'footL', z: -1 },
  { t: 'e', x: 42, y: 42, rx: 11, ry: 13, c: 'body', g: 'body' },
  { t: 'e', x: 47, y: 41, rx: 6, ry: 11, rot: -15, c: 'body', g: 'wingL', z: 1 },
  { t: 'stripe', pts: [42, 31, 49, 29, 54, 34], w: 2.4, c: 'blue', on: 'wingL' },
  { t: 'e', x: 36, y: 22, rx: 9, ry: 8, c: 'body', g: 'head', z: 0.5 },
  { t: 'spot', x: 38, y: 16, rx: 9, ry: 4, c: 'blue', on: 'head' },
  { t: 'p', pts: [32, 21, 4, 22, 2, 25, 30, 27], c: 'beak', g: 'bill', z: 1.5 },
  { t: 'p', pts: [30, 27, 4, 25, 4, 30, 10, 42, 22, 46, 32, 40], c: 'beak', g: 'pouch', z: 1.4 },
  { t: 'spot', x: 20, y: 30, rx: 12, ry: 3, c: 'inner', on: 'pouch', face: true },
  { t: 'eye', x: 35, y: 19.5, s: 2, style: 'dot', iris: '#2a2430' },
] });

// @RALTS
defMon('RALTS', { pal: { body: '#f8f8f4', hair: '#68c858', horn: '#e85068' }, parts: [
  { t: 'c', x1: 29, y1: 50, x2: 28, y2: 56, r1: 2.2, r2: 2, c: 'body', g: 'legL', z: -0.5 },
  { t: 'c', x1: 35, y1: 50, x2: 36, y2: 56, r1: 2.2, r2: 2, c: 'body', g: 'legR', z: -0.5 },
  { t: 'p', pts: [32, 36, 24, 52, 40, 52], c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 47, rx: 7, ry: 6, c: 'body', g: 'body' },
  { t: 'c', x1: 27, y1: 42, x2: 23, y2: 48, r1: 1.6, r2: 1.4, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 37, y1: 42, x2: 41, y2: 48, r1: 1.6, r2: 1.4, c: 'body', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 34, rx: 7, ry: 5, c: 'body', g: 'face', z: 1.2 },
  { t: 'e', x: 32, y: 30, rx: 9, ry: 8, c: 'hair', g: 'hair', z: 1.4 },
  { t: 'p', pts: [23, 30, 26, 38, 30, 33, 34, 37, 38, 33, 41, 30], c: 'hair', g: 'hair', z: 1.4 },
  { t: 'p', pts: [26, 26, 25, 18, 29, 23], c: 'horn', g: 'hornL', z: 1.5 },
  { t: 'p', pts: [36, 22, 40, 15, 39, 24], c: 'horn', g: 'hornR', z: 1.3 },
  { t: 'mouth', x: 32, y: 37.5, w: 1.4, style: 'smile' },
] });

// @KIRLIA
defMon('KIRLIA', { pal: { body: '#f8f8f4', hair: '#68c858', horn: '#e85068', leg: '#68c858' }, parts: [
  { t: 'c', x1: 30, y1: 42, x2: 27, y2: 57, r1: 1.4, r2: 1.2, c: 'leg', g: 'legL', z: -0.5 },
  { t: 'c', x1: 34, y1: 42, x2: 40, y2: 54, r1: 1.4, r2: 1.2, c: 'leg', g: 'legR', z: -0.5 },
  { t: 'p', pts: [32, 34, 20, 46, 28, 44, 32, 47, 36, 44, 44, 46], c: 'body', g: 'tutu' },
  { t: 'c', x1: 32, y1: 28, x2: 32, y2: 38, r1: 3, r2: 4, c: 'body', g: 'body', z: 0.2 },
  { t: 'l', pts: [29, 30, 22, 24, 18, 20], w: 1.4, w2: 1, c: 'body', g: 'armL', z: 1 },
  { t: 'l', pts: [35, 30, 42, 26, 48, 26], w: 1.4, w2: 1, c: 'body', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 20, rx: 6, ry: 6.5, c: 'body', g: 'face', z: 1.2 },
  { t: 'e', x: 32, y: 15, rx: 7, ry: 4.5, c: 'hair', g: 'hair', z: 1.4 },
  { t: 'p', pts: [26, 14, 21, 19, 19, 26, 22, 29, 24, 25, 26.5, 18], c: 'hair', g: 'tailL', z: 1.3 },
  { t: 'p', pts: [38, 14, 43, 19, 45, 26, 42, 29, 40, 25, 37.5, 18], c: 'hair', g: 'tailR', z: 1.3 },
  { t: 'p', pts: [30, 12, 32, 4, 34, 12], c: 'horn', g: 'horn', z: 1.5 },
  { t: 'eye', x: 29, y: 20.5, s: 2, iris: '#c03a3a', sclera: false },
  { t: 'eye', x: 35, y: 20.5, s: 2, iris: '#c03a3a', sclera: false },
  { t: 'mouth', x: 32, y: 24.5, w: 1.2, style: 'smile' },
] });
