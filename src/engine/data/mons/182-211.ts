// POKéMON drawings, Gen 2 #182-211 (Bellossom to Qwilfish). Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @BELLOSSOM
defMon('BELLOSSOM', { pal: { body: '#6cc050', skirt: '#9ad860', petal: '#e04858', core: '#f8d040' }, parts: [
  { t: 'e', x: 28, y: 57, rx: 3, ry: 2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 36, y: 57, rx: 3, ry: 2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'p', pts: [20, 52, 24, 44, 32, 42, 40, 44, 44, 52, 38, 50, 32, 54, 26, 50], c: 'skirt', g: 'skirt', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 6, ry: 5, c: 'body', g: 'body' },
  { t: 'c', x1: 27, y1: 40, x2: 21, y2: 36, r1: 1.6, r2: 1.4, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 37, y1: 40, x2: 43, y2: 36, r1: 1.6, r2: 1.4, c: 'body', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 30, rx: 8.5, ry: 7.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'e', x: 22, y: 20, rx: 5, ry: 4, c: 'petal', g: 'flowerL', z: 1.6 },
  { t: 'spot', x: 22, y: 20, rx: 1.8, ry: 1.6, c: 'core', on: 'flowerL' },
  { t: 'e', x: 42, y: 20, rx: 5, ry: 4, c: 'petal', g: 'flowerR', z: 1.6 },
  { t: 'spot', x: 42, y: 20, rx: 1.8, ry: 1.6, c: 'core', on: 'flowerR' },
  { t: 'eye', x: 28.5, y: 30, s: 2.4, style: 'happy' },
  { t: 'eye', x: 35.5, y: 30, s: 2.4, style: 'happy' },
  { t: 'mouth', x: 32, y: 34, w: 1.4, style: 'smile' },
] });

// @MARILL
defMon('MARILL', { pal: { body: '#4a8ae0', belly: '#f4f0e0', tail: '#4a8ae0', line: '#2a3a70' }, parts: [
  { t: 'l', pts: [42, 50, 48, 46, 46, 42, 52, 38], w: 1, c: 'line', g: 'tailLine', z: -1 },
  { t: 'e', x: 54, y: 37, rx: 4, ry: 4, c: 'tail', g: 'tailBall', z: -1, gloss: true },
  { t: 'e', x: 27, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 20, y: 26, rx: 5, ry: 5, c: 'body', g: 'earL', z: -0.5 },
  { t: 'e', x: 44, y: 26, rx: 5, ry: 5, c: 'body', g: 'earR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 14, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 49, rx: 9, ry: 7, c: 'belly', on: 'body' },
  { t: 'e', x: 19, y: 44, rx: 2.6, ry: 3, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 45, y: 44, rx: 2.6, ry: 3, c: 'body', g: 'armR', z: 1 },
  { t: 'eye', x: 27, y: 38, s: 2.8, iris: '#2a2430' },
  { t: 'eye', x: 37, y: 38, s: 2.8, iris: '#2a2430' },
  { t: 'e', x: 32, y: 42, rx: 2.2, ry: 1.6, c: '#f08aa0', g: 'nose', z: 1.2, face: true },
  { t: 'mouth', x: 32, y: 45, w: 1.4, style: 'smile' },
] });

// @AZUMARILL
defMon('AZUMARILL', { pal: { body: '#4a8ae0', belly: '#f4f0e0', line: '#2a3a70' }, parts: [
  { t: 'l', pts: [44, 50, 50, 48, 50, 44, 55, 40], w: 1, c: 'line', g: 'tailLine', z: -1 },
  { t: 'e', x: 56, y: 38, rx: 4.5, ry: 4.5, c: 'body', g: 'tailBall', z: -1, gloss: true },
  { t: 'e', x: 26, y: 12, rx: 3, ry: 9, rot: -12, c: 'body', g: 'earL', z: -0.5 },
  { t: 'e', x: 38, y: 12, rx: 3, ry: 9, rot: 12, c: 'body', g: 'earR', z: -0.5 },
  { t: 'spot', x: 26, y: 12, rx: 1.4, ry: 6, c: 'belly', on: 'earL' },
  { t: 'spot', x: 38, y: 12, rx: 1.4, ry: 6, c: 'belly', on: 'earR' },
  { t: 'e', x: 26, y: 57, rx: 4, ry: 2.4, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 4, ry: 2.4, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 45, rx: 13, ry: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 47, rx: 9, ry: 7, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [23, 47, 41, 47], w: 1.2, c: 'body', on: 'body' },
  { t: 'e', x: 32, y: 28, rx: 9, ry: 8, c: 'body', g: 'head', z: 1 },
  { t: 'e', x: 20, y: 42, rx: 2.6, ry: 3.6, c: 'body', g: 'armL', z: 1.5 },
  { t: 'e', x: 44, y: 42, rx: 2.6, ry: 3.6, c: 'body', g: 'armR', z: 1.5 },
  { t: 'eye', x: 28, y: 27, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 27, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 32, w: 1.6, style: 'smile' },
] });

// @SUDOWOODO
defMon('SUDOWOODO', { pal: { bark: '#a0703c', barkD: '#6a4424', leaf: '#5cb848' }, parts: [
  { t: 'c', x1: 28, y1: 50, x2: 27, y2: 57, r1: 3.4, r2: 3.2, c: 'bark', g: 'legL', z: -0.5 },
  { t: 'c', x1: 37, y1: 50, x2: 38, y2: 57, r1: 3.4, r2: 3.2, c: 'bark', g: 'legR', z: -0.5 },
  { t: 'c', x1: 32, y1: 20, x2: 32, y2: 50, r1: 8, r2: 9, c: 'bark', g: 'body' },
  { t: 'spot', x: 30, y: 36, rx: 1.4, ry: 1.4, c: 'barkD', on: 'body' },
  { t: 'spot', x: 35, y: 44, rx: 1.6, ry: 1.2, c: 'barkD', on: 'body' },
  { t: 'spot', x: 29, y: 46, rx: 1.2, ry: 1.2, c: 'barkD', on: 'body' },
  { t: 'c', x1: 26, y1: 32, x2: 14, y2: 26, r1: 2.6, r2: 2.2, c: 'bark', g: 'armL', z: 1 },
  { t: 'c', x1: 38, y1: 32, x2: 50, y2: 26, r1: 2.6, r2: 2.2, c: 'bark', g: 'armR', z: 1 },
  { t: 'e', x: 11, y: 24, rx: 4.5, ry: 4.5, c: 'leaf', g: 'ballL', z: 1.2 },
  { t: 'e', x: 53, y: 24, rx: 4.5, ry: 4.5, c: 'leaf', g: 'ballR', z: 1.2 },
  { t: 'c', x1: 32, y1: 18, x2: 32, y2: 11, r1: 2.2, r2: 2, c: 'bark', g: 'top', z: 0.5 },
  { t: 'e', x: 32, y: 8, rx: 4.5, ry: 4.5, c: 'leaf', g: 'ballT', z: 0.6 },
  { t: 'eye', x: 28.5, y: 24, s: 2.6, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 35.5, y: 24, s: 2.6, style: 'angry', iris: '#2a2430', flip: true },
  { t: 'mouth', x: 32, y: 29, w: 1.6, style: 'line' },
] });

// @POLITOED
defMon('POLITOED', { pal: { body: '#58b848', belly: '#f0e070', cheek: '#e87890', curl: '#58b848' }, parts: [
  { t: 'e', x: 25, y: 56, rx: 5, ry: 2.6, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 39, y: 56, rx: 5, ry: 2.6, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 13, ry: 13, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 47, rx: 8.5, ry: 8, c: 'belly', on: 'body' },
  { t: 'c', x1: 21, y1: 37, x2: 15, y2: 30, r1: 2.4, r2: 2, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 43, y1: 37, x2: 49, y2: 30, r1: 2.4, r2: 2, c: 'body', g: 'armR', z: 1 },
  { t: 'l', pts: [32, 17, 30, 11, 33, 7, 37, 9, 35, 12], w: 2, w2: 1.4, c: 'curl', g: 'curl', z: 1.4 },
  { t: 'e', x: 32, y: 25, rx: 10, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 24, y: 29, rx: 2.6, ry: 2, c: 'cheek', on: 'head', face: true },
  { t: 'spot', x: 40, y: 29, rx: 2.6, ry: 2, c: 'cheek', on: 'head', face: true },
  { t: 'eye', x: 27.5, y: 23, s: 3, iris: '#2a2430' },
  { t: 'eye', x: 36.5, y: 23, s: 3, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 29, w: 3, style: 'smile' },
] });

// @HOPPIP
defMon('HOPPIP', { pal: { body: '#f4a0b8', leaf: '#5cb848', cheek: '#e8708a' }, parts: [
  { t: 'e', x: 26, y: 12, rx: 6, ry: 3, rot: -25, c: 'leaf', g: 'leafL', z: -0.5 },
  { t: 'e', x: 38, y: 12, rx: 6, ry: 3, rot: 25, c: 'leaf', g: 'leafR', z: -0.5 },
  { t: 'l', pts: [32, 28, 32, 18], w: 1.2, c: 'leaf', g: 'stem', z: -0.4 },
  { t: 'e', x: 16, y: 36, rx: 6, ry: 3, rot: 20, c: 'body', g: 'earL', z: -0.5 },
  { t: 'e', x: 48, y: 36, rx: 6, ry: 3, rot: -20, c: 'body', g: 'earR', z: -0.5 },
  { t: 'e', x: 27, y: 55, rx: 3, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 55, rx: 3, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 11, ry: 11, c: 'body', g: 'body' },
  { t: 'spot', x: 24, y: 46, rx: 2.4, ry: 1.8, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 40, y: 46, rx: 2.4, ry: 1.8, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 27.5, y: 41, s: 2.8, iris: '#2a2430' },
  { t: 'eye', x: 36.5, y: 41, s: 2.8, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 47, w: 1.6, style: 'smile' },
] });

// @SKIPLOOM
defMon('SKIPLOOM', { pal: { body: '#7cc850', petal: '#f8d848', core: '#e89030', cheek: '#e8708a' }, parts: [
  { t: 'e', x: 32, y: 25, rx: 12, ry: 5, c: 'petal', g: 'flower', z: -0.5 },
  { t: 'spot', x: 32, y: 23, rx: 4, ry: 2.4, c: 'core', on: 'flower' },
  { t: 'e', x: 16, y: 38, rx: 6, ry: 3, rot: 20, c: 'body', g: 'earL', z: -0.5 },
  { t: 'e', x: 48, y: 38, rx: 6, ry: 3, rot: -20, c: 'body', g: 'earR', z: -0.5 },
  { t: 'e', x: 27, y: 56, rx: 3, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 56, rx: 3, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 40, rx: 11, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 25, y: 38, rx: 2.4, ry: 1.8, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 39, y: 38, rx: 2.4, ry: 1.8, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 27.5, y: 33, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 36.5, y: 33, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 39, w: 1.6, style: 'smile' },
] });

// @JUMPLUFF
defMon('JUMPLUFF', { pal: { body: '#5a88d8', puff: '#f8f6ec', leaf: '#5cb848', cheek: '#e8708a' }, parts: [
  { t: 'e', x: 12, y: 36, rx: 7.5, ry: 7, c: 'puff', g: 'puffL', z: -0.5, soft: true },
  { t: 'e', x: 52, y: 36, rx: 7.5, ry: 7, c: 'puff', g: 'puffR', z: -0.5, soft: true },
  { t: 'e', x: 32, y: 8, rx: 7, ry: 6, c: 'puff', g: 'puffT', z: -0.5, soft: true },
  { t: 'e', x: 26, y: 18, rx: 4, ry: 2, rot: -30, c: 'leaf', g: 'leafL', z: -0.3 },
  { t: 'e', x: 38, y: 18, rx: 4, ry: 2, rot: 30, c: 'leaf', g: 'leafR', z: -0.3 },
  { t: 'c', x1: 22, y1: 36, x2: 17, y2: 36, r1: 1.6, r2: 1.4, c: 'body', g: 'armL', z: -0.4 },
  { t: 'c', x1: 42, y1: 36, x2: 47, y2: 36, r1: 1.6, r2: 1.4, c: 'body', g: 'armR', z: -0.4 },
  { t: 'e', x: 28, y: 55, rx: 3, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 36, y: 55, rx: 3, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 36, rx: 10, ry: 16, c: 'body', g: 'body' },
  { t: 'spot', x: 26, y: 32, rx: 2.2, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 38, y: 32, rx: 2.2, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 28, y: 28, s: 2.6, iris: '#c03a3a' },
  { t: 'eye', x: 36, y: 28, s: 2.6, iris: '#c03a3a' },
  { t: 'mouth', x: 32, y: 34, w: 1.4, style: 'smile' },
] });

// @AIPOM
defMon('AIPOM', { pal: { fur: '#a070c0', face: '#f0dcb0', hand: '#f0dcb0' }, parts: [
  { t: 'l', pts: [40, 48, 50, 46, 54, 36, 50, 28], w: 2, w2: 1.6, c: 'fur', g: 'tail', z: -1 },
  { t: 'e', x: 50, y: 25, rx: 4.5, ry: 4, c: 'hand', g: 'tailHand', z: -1 },
  { t: 'e', x: 27, y: 57, rx: 3.6, ry: 2.2, c: 'hand', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.6, ry: 2.2, c: 'hand', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 46, rx: 8, ry: 9, c: 'fur', g: 'body' },
  { t: 'c', x1: 26, y1: 42, x2: 21, y2: 47, r1: 1.6, r2: 1.4, c: 'fur', g: 'armL', z: 1 },
  { t: 'e', x: 17, y: 25, rx: 4.5, ry: 4.5, c: 'fur', g: 'earL', z: 1.2 },
  { t: 'spot', x: 17, y: 25, rx: 2.4, ry: 2.4, c: 'face', on: 'earL' },
  { t: 'e', x: 45, y: 25, rx: 4.5, ry: 4.5, c: 'fur', g: 'earR', z: 1.2 },
  { t: 'spot', x: 45, y: 25, rx: 2.4, ry: 2.4, c: 'face', on: 'earR' },
  { t: 'p', pts: [29, 20, 31, 13, 33, 20], c: 'fur', g: 'head', z: 1.5 },
  { t: 'e', x: 31, y: 29, rx: 11, ry: 9, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 31, y: 31, rx: 8, ry: 6, c: 'face', on: 'head' },
  { t: 'eye', x: 27, y: 29, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 35, y: 29, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 31, y: 34, w: 2.4, style: 'smile' },
] });

// @SUNKERN
defMon('SUNKERN', { pal: { body: '#f4d040', leaf: '#5cb848', stripe: '#c8a020' }, parts: [
  { t: 'e', x: 26, y: 18, rx: 6, ry: 2.6, rot: -30, c: 'leaf', g: 'leafL', z: -0.5 },
  { t: 'e', x: 38, y: 18, rx: 6, ry: 2.6, rot: 30, c: 'leaf', g: 'leafR', z: -0.5 },
  { t: 'l', pts: [32, 30, 32, 20], w: 1.4, c: 'leaf', g: 'stem', z: -0.4 },
  { t: 'p', pts: [32, 26, 44, 38, 42, 52, 32, 56, 22, 52, 20, 38], c: 'body', g: 'body' },
  { t: 'stripe', pts: [26, 48, 38, 48], w: 1, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [24, 52, 40, 52], w: 1, c: 'stripe', on: 'body' },
  { t: 'eye', x: 28, y: 40, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 40, s: 2.4, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 44, w: 1.4, style: 'smile' },
] });

// @SUNFLORA
defMon('SUNFLORA', { pal: { petal: '#f4c030', face: '#f8e060', body: '#5cb848' }, parts: [
  { t: 'e', x: 27, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 48, rx: 6, ry: 8, c: 'body', g: 'body' },
  { t: 'e', x: 20, y: 46, rx: 6, ry: 2.6, rot: 30, c: 'body', g: 'leafL', z: 0.5 },
  { t: 'e', x: 44, y: 46, rx: 6, ry: 2.6, rot: -30, c: 'body', g: 'leafR', z: 0.5 },
  { t: 'p', pts: [32, 6, 37, 14, 46, 11, 45, 20, 54, 24, 46, 30, 50, 38, 41, 38, 38, 46, 32, 40, 26, 46, 23, 38, 14, 38, 18, 30, 10, 24, 19, 20, 18, 11, 27, 14], c: 'petal', g: 'petals', z: 1 },
  { t: 'e', x: 32, y: 26, rx: 10, ry: 10, c: 'face', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 25, s: 2.6, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 25, s: 2.6, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 30, w: 2.4, style: 'smile' },
] });

// @YANMA
defMon('YANMA', { pal: { body: '#d84838', band: '#5a2a24', eye: '#5cc848', wing: '#e6f2fa', leg: '#5a2a24' }, parts: [
  { t: 'p', pts: [32, 30, 52, 14, 58, 18, 36, 32], c: 'wing', g: 'wing1', z: -1, flat: true },
  { t: 'p', pts: [34, 34, 58, 30, 58, 36, 36, 36], c: 'wing', g: 'wing2', z: -1, flat: true },
  { t: 'c', x1: 38, y1: 36, x2: 58, y2: 44, r1: 3, r2: 2, c: 'body', g: 'tail', z: -0.5 },
  { t: 'stripe', pts: [44, 35, 44, 41], w: 1.2, c: 'band', on: 'tail' },
  { t: 'stripe', pts: [50, 38, 50, 44], w: 1.2, c: 'band', on: 'tail' },
  { t: 'l', pts: [28, 40, 26, 48, 22, 52], w: 1.2, c: 'leg', g: 'legs', z: -0.2 },
  { t: 'l', pts: [33, 40, 34, 48, 32, 53], w: 1.2, c: 'leg', g: 'legs2', z: -0.2 },
  { t: 'e', x: 32, y: 36, rx: 7, ry: 6, c: 'body', g: 'body' },
  { t: 'p', pts: [26, 30, 8, 20, 6, 28, 26, 34], c: 'wing', g: 'wing3', z: 1, flat: true },
  { t: 'e', x: 21, y: 30, rx: 7, ry: 6, c: 'body', g: 'head', z: 1.5 },
  { t: 'e', x: 16, y: 28, rx: 4.5, ry: 5, c: 'eye', g: 'eyeL', z: 1.6, gloss: true },
  { t: 'e', x: 25, y: 26, rx: 4, ry: 4.5, c: 'eye', g: 'eyeR', z: 1.55, gloss: true },
  { t: 'mouth', x: 17, y: 34, w: 1.6, style: 'fang' },
] });

// @WOOPER
defMon('WOOPER', { pal: { body: '#68b8e8', belly: '#a8d8f4', gill: '#a868b8', line: '#3a5a90' }, parts: [
  { t: 'e', x: 48, y: 48, rx: 8, ry: 5, c: 'body', g: 'tail', z: -1 },
  { t: 'l', pts: [15, 30, 10, 26], w: 2.4, w2: 1.8, c: 'gill', g: 'gillL1', z: -0.5 },
  { t: 'l', pts: [15, 35, 9, 35], w: 2.4, w2: 1.8, c: 'gill', g: 'gillL2', z: -0.5 },
  { t: 'l', pts: [16, 40, 10, 43], w: 2.4, w2: 1.8, c: 'gill', g: 'gillL3', z: -0.5 },
  { t: 'l', pts: [45, 30, 50, 26], w: 2.4, w2: 1.8, c: 'gill', g: 'gillR1', z: -0.5 },
  { t: 'l', pts: [45, 35, 51, 35], w: 2.4, w2: 1.8, c: 'gill', g: 'gillR2', z: -0.5 },
  { t: 'l', pts: [44, 40, 50, 43], w: 2.4, w2: 1.8, c: 'gill', g: 'gillR3', z: -0.5 },
  { t: 'e', x: 26, y: 56, rx: 4, ry: 2.4, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 36, y: 56, rx: 4, ry: 2.4, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 30, y: 40, rx: 14, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 50, rx: 8, ry: 4, c: 'belly', on: 'body' },
  { t: 'eye', x: 24, y: 36, s: 2, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 36, y: 36, s: 2, iris: '#2a2430', sclera: false },
  { t: 'l', pts: [22, 42, 26, 45, 30, 46, 34, 45, 38, 42], w: 1, c: 'line', g: 'mouth', z: 1.2, face: true },
] });

// @QUAGSIRE
defMon('QUAGSIRE', { pal: { body: '#5aa0c8', belly: '#8ac8e0', line: '#2a3a60', fin: '#4a88b0' }, parts: [
  { t: 'e', x: 46, y: 52, rx: 9, ry: 4.5, c: 'fin', g: 'tail', z: -1 },
  { t: 'e', x: 21, y: 16, rx: 3, ry: 4, rot: -20, c: 'fin', g: 'finL', z: -0.5 },
  { t: 'e', x: 43, y: 16, rx: 3, ry: 4, rot: 20, c: 'fin', g: 'finR', z: -0.5 },
  { t: 'e', x: 26, y: 57, rx: 4.2, ry: 2.4, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 4.2, ry: 2.4, c: 'body', g: 'footR', z: -0.5 },
  { t: 'c', x1: 32, y1: 22, x2: 32, y2: 48, r1: 11, r2: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 44, rx: 7.5, ry: 9, c: 'belly', on: 'body' },
  { t: 'c', x1: 22, y1: 36, x2: 18, y2: 44, r1: 2.4, r2: 2, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 42, y1: 36, x2: 46, y2: 44, r1: 2.4, r2: 2, c: 'body', g: 'armR', z: 1 },
  { t: 'eye', x: 26, y: 20, s: 1.8, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 38, y: 20, s: 1.8, iris: '#2a2430', sclera: false },
  { t: 'l', pts: [23, 26, 28, 29, 32, 30, 36, 29, 41, 26], w: 1, c: 'line', g: 'mouth', z: 1.2, face: true },
] });

// @ESPEON
defMon('ESPEON', { pal: { fur: '#d8a8e0', gem: '#e03848', furD: '#b888c8' }, parts: [
  { t: 'l', pts: [46, 40, 54, 34, 58, 26], w: 2.2, w2: 1.4, c: 'fur', g: 'tail1', z: -1 },
  { t: 'l', pts: [54, 34, 60, 34, 62, 30], w: 1.6, w2: 1.2, c: 'fur', g: 'tail2', z: -1 },
  { t: 'c', x1: 44, y1: 44, x2: 46, y2: 57, r1: 3.2, r2: 2.6, c: 'furD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 3.2, r2: 2.6, c: 'furD', g: 'legFB', z: -0.8 },
  { t: 'e', x: 35, y: 41, rx: 13.5, ry: 8.5, c: 'fur', g: 'body' },
  { t: 'c', x1: 40, y1: 44, x2: 39, y2: 57, r1: 3.2, r2: 2.6, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 26, y1: 44, x2: 26, y2: 57, r1: 3.2, r2: 2.6, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'p', pts: [20, 22, 18, 6, 27, 18], c: 'fur', g: 'earL', z: 1 },
  { t: 'p', pts: [26, 20, 32, 5, 34, 21], c: 'fur', g: 'earR', z: 0.8 },
  { t: 'e', x: 22, y: 28, rx: 8, ry: 7, c: 'fur', g: 'head', z: 1.5 },
  { t: 'e', x: 21, y: 22.5, rx: 1.6, ry: 1.4, c: 'gem', g: 'gem', z: 1.6, gloss: true, face: true },
  { t: 'eye', x: 17.5, y: 28, s: 2.4, iris: '#8a3aa8', look: [-1, 0] },
  { t: 'eye', x: 24, y: 28, s: 2.4, iris: '#8a3aa8', look: [-1, 0] },
  { t: 'mouth', x: 17, y: 32.5, w: 1.2, style: 'smile' },
] });

// @UMBREON
defMon('UMBREON', { pal: { fur: '#2e3040', furD: '#1e2030', ring: '#f0d040' }, parts: [
  { t: 'c', x1: 46, y1: 40, x2: 58, y2: 34, r1: 2.6, r2: 1.6, c: 'fur', g: 'tail', z: -1 },
  { t: 'stripe', pts: [52, 34, 54, 40], w: 1.6, c: 'ring', on: 'tail' },
  { t: 'c', x1: 44, y1: 44, x2: 46, y2: 57, r1: 3.2, r2: 2.6, c: 'furD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 3.2, r2: 2.6, c: 'furD', g: 'legFB', z: -0.8 },
  { t: 'e', x: 35, y: 41, rx: 13.5, ry: 8.5, c: 'fur', g: 'body' },
  { t: 'c', x1: 40, y1: 44, x2: 39, y2: 57, r1: 3.2, r2: 2.6, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'stripe', pts: [36, 51, 42, 51], w: 1.6, c: 'ring', on: 'legB2' },
  { t: 'c', x1: 26, y1: 44, x2: 26, y2: 57, r1: 3.2, r2: 2.6, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'stripe', pts: [23, 51, 29, 51], w: 1.6, c: 'ring', on: 'legF' },
  { t: 'p', pts: [18, 24, 12, 4, 25, 18], c: 'fur', g: 'earL', z: 1 },
  { t: 'stripe', pts: [14, 11, 19, 10], w: 1.6, c: 'ring', on: 'earL' },
  { t: 'p', pts: [25, 20, 33, 2, 33, 21], c: 'fur', g: 'earR', z: 0.8 },
  { t: 'stripe', pts: [29, 10, 33, 11], w: 1.6, c: 'ring', on: 'earR' },
  { t: 'e', x: 22, y: 28, rx: 8, ry: 7, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 21, y: 23, rx: 2.2, ry: 1.6, c: 'ring', on: 'head' },
  { t: 'eye', x: 17.5, y: 28, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 24, y: 28, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @MURKROW
defMon('MURKROW', { pal: { body: '#2e3048', belly: '#f4f0e0', beak: '#f0c040', leg: '#f0c040' }, parts: [
  { t: 'p', pts: [42, 44, 58, 50, 56, 54, 42, 50], c: 'body', g: 'tail', z: -1 },
  { t: 'c', x1: 30, y1: 50, x2: 30, y2: 56, r1: 1.2, r2: 1.2, c: 'leg', g: 'leg', z: -0.5 },
  { t: 'e', x: 29, y: 57, rx: 3, ry: 1.4, c: 'leg', g: 'foot', z: -0.5 },
  { t: 'e', x: 34, y: 42, rx: 11, ry: 9, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 46, rx: 5, ry: 4, c: 'belly', on: 'body' },
  { t: 'e', x: 38, y: 40, rx: 8, ry: 5, rot: 15, c: 'body', g: 'wing', z: 1 },
  { t: 'p', pts: [14, 22, 18, 12, 30, 10, 40, 14, 32, 18, 34, 22], c: 'body', g: 'hat', z: 2 },
  { t: 'e', x: 24, y: 28, rx: 8, ry: 7, c: 'body', g: 'head', z: 1.5 },
  { t: 'p', pts: [17, 28, 8, 32, 17, 33], c: 'beak', g: 'beak', z: 2 },
  { t: 'eye', x: 20, y: 27, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @SLOWKING
defMon('SLOWKING', { pal: { skin: '#f0a0b0', belly: '#f8e0c0', shell: '#e8e0e8', spike: '#b0a8b8', red: '#e04848', collar: '#f4f0e0' }, parts: [
  { t: 'c', x1: 40, y1: 52, x2: 54, y2: 54, r1: 3, r2: 2.4, c: 'skin', g: 'tail', z: -1 },
  { t: 'e', x: 26, y: 57, rx: 4.5, ry: 2.4, c: 'skin', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 4.5, ry: 2.4, c: 'skin', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 44, rx: 11, ry: 12, c: 'skin', g: 'body' },
  { t: 'spot', x: 32, y: 47, rx: 7, ry: 8, c: 'belly', on: 'body' },
  { t: 'e', x: 32, y: 33, rx: 9, ry: 3, c: 'collar', g: 'collar', z: 1, soft: true },
  { t: 'c', x1: 22, y1: 38, x2: 18, y2: 46, r1: 2.4, r2: 2, c: 'skin', g: 'armL', z: 1.2 },
  { t: 'c', x1: 42, y1: 38, x2: 46, y2: 46, r1: 2.4, r2: 2, c: 'skin', g: 'armR', z: 1.2 },
  { t: 'e', x: 32, y: 24, rx: 9, ry: 8, c: 'skin', g: 'head', z: 1.5 },
  { t: 'p', pts: [22, 18, 24, 6, 28, 13, 32, 3, 36, 13, 40, 6, 42, 18], c: 'shell', g: 'crown', z: 1.6 },
  { t: 'spot', x: 32, y: 13, rx: 2, ry: 2, c: 'red', on: 'crown' },
  { t: 'eye', x: 28, y: 24, s: 2.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 36, y: 24, s: 2.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 29, w: 2.4, style: 'open' },
] });

// @MISDREAVUS
defMon('MISDREAVUS', { pal: { body: '#3a6878', hair: '#8a3a78', orb: '#e04888' }, parts: [
  { t: 'p', pts: [22, 36, 18, 50, 24, 46, 28, 54, 32, 46, 36, 54, 40, 46, 46, 50, 42, 36], c: 'hair', g: 'fringe', z: -0.5 },
  { t: 'e', x: 32, y: 32, rx: 12, ry: 12, c: 'body', g: 'head' },
  { t: 'p', pts: [20, 26, 26, 18, 32, 24, 38, 18, 44, 26, 44, 18, 32, 14, 20, 18], c: 'hair', g: 'bangs', z: 1 },
  { t: 'e', x: 24, y: 46, rx: 2.4, ry: 2.4, c: 'orb', g: 'orb1', z: 1, gloss: true },
  { t: 'e', x: 32, y: 48, rx: 2.4, ry: 2.4, c: 'orb', g: 'orb2', z: 1, gloss: true },
  { t: 'e', x: 40, y: 46, rx: 2.4, ry: 2.4, c: 'orb', g: 'orb3', z: 1, gloss: true },
  { t: 'eye', x: 27, y: 31, s: 3, iris: '#e8c030' },
  { t: 'eye', x: 37, y: 31, s: 3, iris: '#e8c030' },
  { t: 'mouth', x: 32, y: 38, w: 1.6, style: 'smile' },
] });

// @UNOWN
defMon('UNOWN', { pal: { ink: '#2a2a34' }, parts: [
  { t: 'l', pts: [16, 56, 32, 12, 48, 56], w: 3.4, c: 'ink', g: 'frame' },
  { t: 'l', pts: [22, 42, 42, 42], w: 3, c: 'ink', g: 'bar' },
  { t: 'e', x: 32, y: 30, rx: 7, ry: 7, c: '#f4f0e6', g: 'eyeball', z: 1, face: true },
  { t: 'eye', x: 32, y: 30, s: 4, iris: '#2a2a34' },
] });

// @WOBBUFFET
defMon('WOBBUFFET', { pal: { body: '#4a90d8', tail: '#2a2430', mouth: '#e8708a' }, parts: [
  { t: 'c', x1: 42, y1: 52, x2: 52, y2: 48, r1: 3.4, r2: 2.4, c: 'tail', g: 'tail', z: -1 },
  { t: 'e', x: 54, y: 46, rx: 4.5, ry: 4, c: 'tail', g: 'tailHead', z: -1 },
  { t: 'e', x: 52, y: 45, rx: 1, ry: 1, c: '#f4f0e6', g: 'te1', z: -0.9 },
  { t: 'e', x: 56, y: 45, rx: 1, ry: 1, c: '#f4f0e6', g: 'te2', z: -0.9 },
  { t: 'e', x: 32, y: 36, rx: 12, ry: 22, c: 'body', g: 'body' },
  { t: 'c', x1: 22, y1: 30, x2: 18, y2: 16, r1: 3.4, r2: 3, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 42, y1: 30, x2: 46, y2: 16, r1: 3.4, r2: 3, c: 'body', g: 'armR', z: 1 },
  { t: 'eye', x: 28, y: 22, s: 2, style: 'closed' },
  { t: 'eye', x: 36, y: 22, s: 2, style: 'closed' },
  { t: 'e', x: 32, y: 27, rx: 3, ry: 1.6, c: 'mouth', g: 'mouth', z: 1, face: true },
] });

// @GIRAFARIG
defMon('GIRAFARIG', { pal: { fur: '#f0d060', spot: '#a86830', back: '#3a3040', horn: '#a86830', tailHead: '#3a3040' }, parts: [
  { t: 'c', x1: 48, y1: 36, x2: 56, y2: 40, r1: 2.4, r2: 3.6, c: 'tailHead', g: 'tail', z: -1 },
  { t: 'mouth', x: 58, y: 42, w: 2, style: 'fang' },
  { t: 'c', x1: 46, y1: 44, x2: 47, y2: 57, r1: 2.4, r2: 2, c: 'back', g: 'legB', z: -0.8 },
  { t: 'c', x1: 30, y1: 44, x2: 29, y2: 57, r1: 2.4, r2: 2, c: 'fur', g: 'legFB', z: -0.8 },
  { t: 'e', x: 39, y: 40, rx: 12, ry: 7, c: 'fur', g: 'body' },
  { t: 'spot', x: 46, y: 40, rx: 6, ry: 8, c: 'back', on: 'body' },
  { t: 'spot', x: 34, y: 38, rx: 2, ry: 1.6, c: 'spot', on: 'body' },
  { t: 'spot', x: 38, y: 43, rx: 1.8, ry: 1.4, c: 'spot', on: 'body' },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 2.4, r2: 2, c: 'back', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 33, y1: 44, x2: 33, y2: 57, r1: 2.4, r2: 2, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'c', x1: 32, y1: 38, x2: 22, y2: 16, r1: 4, r2: 3, c: 'fur', g: 'neck', z: 0.6 },
  { t: 'spot', x: 27, y: 28, rx: 1.8, ry: 1.4, c: 'spot', on: 'neck' },
  { t: 'l', pts: [22, 12, 21, 6], w: 1.2, c: 'horn', g: 'hornL', z: 0.7 },
  { t: 'l', pts: [26, 12, 27, 6], w: 1.2, c: 'horn', g: 'hornR', z: 0.7 },
  { t: 'e', x: 20, y: 16, rx: 7, ry: 5, c: 'fur', g: 'head', z: 1 },
  { t: 'eye', x: 18, y: 15, s: 2.2, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 19, w: 1.2, style: 'smile' },
] });

// @PINECO
defMon('PINECO', { pal: { shell: '#6a9a5a', scale: '#4a7a42', dark: '#2a2430' }, parts: [
  { t: 'e', x: 32, y: 40, rx: 15, ry: 16, c: 'shell', g: 'shell' },
  { t: 'stripe', pts: [18, 32, 24, 28, 32, 32, 40, 28, 46, 32], w: 1.2, c: 'scale', on: 'shell' },
  { t: 'stripe', pts: [17, 44, 24, 40, 32, 44, 40, 40, 47, 44], w: 1.2, c: 'scale', on: 'shell' },
  { t: 'stripe', pts: [19, 52, 26, 48, 32, 52, 38, 48, 45, 52], w: 1.2, c: 'scale', on: 'shell' },
  { t: 'p', pts: [28, 26, 32, 20, 36, 26], c: 'shell', g: 'tip', z: 0.5 },
  { t: 'e', x: 32, y: 37, rx: 7, ry: 4, c: 'dark', g: 'gap', z: 1, face: true },
  { t: 'eye', x: 29, y: 37, s: 1.8, iris: '#f4f0e6', sclera: false },
  { t: 'eye', x: 35, y: 37, s: 1.8, iris: '#f4f0e6', sclera: false },
] });

// @FORRETRESS
defMon('FORRETRESS', { pal: { shell: '#a078b8', shellD: '#7a5890', plate: '#c8c0d0', dark: '#2a2430' }, parts: [
  { t: 'e', x: 32, y: 40, rx: 18, ry: 17, c: 'shell', g: 'shell', gloss: true },
  { t: 'spot', x: 32, y: 26, rx: 8, ry: 3, c: 'shellD', on: 'shell' },
  { t: 'e', x: 13, y: 38, rx: 4, ry: 3, c: 'plate', g: 'plateL', z: 1 },
  { t: 'e', x: 51, y: 38, rx: 4, ry: 3, c: 'plate', g: 'plateR', z: 1 },
  { t: 'e', x: 21, y: 25, rx: 3.4, ry: 2.4, rot: -30, c: 'plate', g: 'plateTL', z: 1 },
  { t: 'e', x: 43, y: 25, rx: 3.4, ry: 2.4, rot: 30, c: 'plate', g: 'plateTR', z: 1 },
  { t: 'e', x: 22, y: 53, rx: 3.4, ry: 2.4, rot: 30, c: 'plate', g: 'plateBL', z: 1 },
  { t: 'e', x: 42, y: 53, rx: 3.4, ry: 2.4, rot: -30, c: 'plate', g: 'plateBR', z: 1 },
  { t: 'p', pts: [18, 42, 46, 42, 44, 46, 20, 46], c: 'dark', g: 'gap', z: 1.2, face: true },
  { t: 'e', x: 27, y: 44, rx: 1.4, ry: 1.2, c: '#f4f0e6', g: 'eyeL', z: 1.3, face: true },
  { t: 'e', x: 37, y: 44, rx: 1.4, ry: 1.2, c: '#f4f0e6', g: 'eyeR', z: 1.3, face: true },
] });

// @DUNSPARCE
defMon('DUNSPARCE', { pal: { body: '#f0d860', band: '#4a78b8', belly: '#f8ecb0', wing: '#e6f2fa', drill: '#4a78b8' }, parts: [
  { t: 'p', pts: [52, 44, 62, 40, 56, 50], c: 'drill', g: 'drill', z: -1 },
  { t: 'c', x1: 22, y1: 40, x2: 40, y2: 50, r1: 8, r2: 6, c: 'body', g: 'body' },
  { t: 'c', x1: 40, y1: 50, x2: 54, y2: 46, r1: 6, r2: 3.6, c: 'body', g: 'body' },
  { t: 'stripe', pts: [30, 36, 28, 48], w: 2.2, c: 'band', on: 'body' },
  { t: 'stripe', pts: [38, 42, 36, 55], w: 2.2, c: 'band', on: 'body' },
  { t: 'stripe', pts: [46, 44, 46, 54], w: 2.2, c: 'band', on: 'body' },
  { t: 'p', pts: [32, 36, 40, 24, 44, 30, 36, 38], c: 'wing', g: 'wing', z: 1, flat: true },
  { t: 'l', pts: [22, 32, 24, 26, 28, 24], w: 1.6, w2: 1.2, c: 'band', g: 'crest', z: 1.2 },
  { t: 'eye', x: 17, y: 38, s: 2.6, iris: '#4a78b8', look: [-1, 0] },
  { t: 'mouth', x: 15, y: 43, w: 1.6, style: 'smile' },
] });

// @GLIGAR
defMon('GLIGAR', { pal: { body: '#b078c0', wing: '#d8a8d8', claw: '#e05050', tail: '#b078c0' }, parts: [
  { t: 'l', pts: [42, 46, 52, 48, 58, 40, 56, 32], w: 2.4, w2: 1.2, c: 'tail', g: 'tail', z: -1 },
  { t: 'p', pts: [38, 30, 58, 18, 60, 30, 52, 36, 42, 40], c: 'wing', g: 'wingR', z: -1, flat: true },
  { t: 'e', x: 34, y: 38, rx: 11, ry: 10, c: 'body', g: 'body' },
  { t: 'p', pts: [26, 32, 6, 22, 8, 34, 16, 38, 26, 40], c: 'wing', g: 'wingL', z: 1, flat: true },
  { t: 'e', x: 36, y: 52, rx: 3, ry: 3, c: 'body', g: 'leg', z: 0.5 },
  { t: 'c', x1: 24, y1: 38, x2: 16, y2: 44, r1: 2, r2: 2, c: 'body', g: 'arm', z: 1.5 },
  { t: 'p', pts: [16, 44, 10, 40, 12, 46, 8, 48, 16, 48], c: 'claw', g: 'claw', z: 1.6 },
  { t: 'eye', x: 27, y: 34, s: 3, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 35, y: 34, s: 3, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 27, y: 40, w: 1.8, style: 'fang' },
] });

// @STEELIX
defMon('STEELIX', { pal: { steel: '#8890a0', steelD: '#6a7080', jaw: '#a0a8b8' }, parts: [
  { t: 'e', x: 54, y: 52, rx: 6, ry: 5, c: 'steelD', g: 's1', z: -3, gloss: true },
  { t: 'e', x: 46, y: 46, rx: 6.5, ry: 6, c: 'steel', g: 's2', z: -2.5, gloss: true },
  { t: 'e', x: 44, y: 36, rx: 7, ry: 6, c: 'steel', g: 's3', z: -2, gloss: true },
  { t: 'e', x: 38, y: 27, rx: 7, ry: 6, c: 'steel', g: 's4', z: -1.5, gloss: true },
  { t: 'p', pts: [38, 20, 40, 14, 42, 21], c: 'steel', g: 'fin', z: -1.4 },
  { t: 'p', pts: [12, 18, 34, 12, 38, 24, 30, 32, 14, 30], c: 'steel', g: 'head' },
  { t: 'p', pts: [12, 30, 30, 32, 26, 38, 12, 36], c: 'jaw', g: 'jaw', z: 0.5 },
  { t: 'p', pts: [30, 12, 36, 4, 38, 14], c: 'steel', g: 'horn', z: -0.5 },
  { t: 'stripe', pts: [14, 32, 28, 34], w: 1, c: 'steelD', on: 'jaw' },
  { t: 'eye', x: 24, y: 20, s: 2.6, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @SNUBBULL
defMon('SNUBBULL', { pal: { body: '#f4b0c8', dark: '#6a4a8a', fang: '#f4f0e6', muzzle: '#c87898' }, parts: [
  { t: 'e', x: 44, y: 50, rx: 3, ry: 2, c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 27, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.6, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 33, y: 49, rx: 9, ry: 8, c: 'body', g: 'body' },
  { t: 'c', x1: 26, y1: 46, x2: 22, y2: 51, r1: 2, r2: 1.8, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 18, y: 25, rx: 5, ry: 3.4, rot: -30, c: 'dark', g: 'earL', z: 1 },
  { t: 'e', x: 42, y: 25, rx: 5, ry: 3.4, rot: 30, c: 'dark', g: 'earR', z: 1 },
  { t: 'e', x: 30, y: 34, rx: 11, ry: 9.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 30, y: 39, rx: 5, ry: 2.6, c: 'muzzle', on: 'head', face: true },
  { t: 'p', pts: [25, 44, 27, 37, 29, 44], c: 'fang', g: 'fangL', z: 1.8, face: true },
  { t: 'p', pts: [31, 44, 33, 37, 35, 44], c: 'fang', g: 'fangR', z: 1.8, face: true },
  { t: 'eye', x: 25, y: 31, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 35, y: 31, s: 2.4, iris: '#2a2430' },
] });

// @GRANBULL
defMon('GRANBULL', { pal: { body: '#b890d8', dark: '#6a4a8a', fang: '#f4f0e6', belly: '#d8c0e8', muzzle: '#8a60a8' }, parts: [
  { t: 'e', x: 46, y: 50, rx: 3, ry: 2, c: 'body', g: 'tail', z: -1 },
  { t: 'c', x1: 27, y1: 50, x2: 26, y2: 57, r1: 4, r2: 3.6, c: 'body', g: 'legL', z: -0.5 },
  { t: 'c', x1: 38, y1: 50, x2: 39, y2: 57, r1: 4, r2: 3.6, c: 'body', g: 'legR', z: -0.5 },
  { t: 'e', x: 33, y: 43, rx: 12, ry: 11, c: 'body', g: 'body' },
  { t: 'spot', x: 31, y: 46, rx: 6, ry: 6, c: 'belly', on: 'body' },
  { t: 'c', x1: 22, y1: 40, x2: 16, y2: 48, r1: 3.2, r2: 3, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 19, y: 18, rx: 4, ry: 2.6, rot: -30, c: 'dark', g: 'earL', z: 1 },
  { t: 'e', x: 41, y: 18, rx: 4, ry: 2.6, rot: 30, c: 'dark', g: 'earR', z: 1 },
  { t: 'e', x: 30, y: 27, rx: 11, ry: 9, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 30, y: 33, rx: 7, ry: 3, c: 'muzzle', on: 'head', face: true },
  { t: 'p', pts: [22, 38, 23, 28, 27, 36], c: 'fang', g: 'fangL', z: 1.8, face: true },
  { t: 'p', pts: [33, 36, 37, 28, 38, 38], c: 'fang', g: 'fangR', z: 1.8, face: true },
  { t: 'eye', x: 25, y: 24, s: 2.4, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 35, y: 24, s: 2.4, style: 'angry', iris: '#2a2430', flip: true },
] });

// @QWILFISH
defMon('QWILFISH', { pal: { body: '#6a8a9a', spike: '#e8e0c8', belly: '#b8c8c0', fin: '#e8c840' }, parts: [
  { t: 'p', pts: [46, 40, 58, 32, 56, 42, 58, 52], c: 'fin', g: 'tail', z: -1 },
  { t: 'p', pts: [18, 30, 14, 20, 24, 26, 26, 14, 32, 24, 38, 14, 40, 26, 50, 20, 46, 32, 56, 38, 46, 44, 50, 56, 40, 50, 36, 60, 30, 50, 22, 58, 22, 48, 10, 48, 18, 40, 8, 36], c: 'spike', g: 'spikes', z: -0.5 },
  { t: 'e', x: 32, y: 38, rx: 13, ry: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 45, rx: 8, ry: 4, c: 'belly', on: 'body' },
  { t: 'eye', x: 24, y: 34, s: 3, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 33, y: 34, s: 3, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'mouth', x: 22, y: 41, w: 2, style: 'open' },
] });
