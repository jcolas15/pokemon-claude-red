// POKéMON drawings, Gen 3 #352-361. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @KECLEON
defMon('KECLEON', { pal: { body: '#78c050', bodyD: '#589838', belly: '#f0e090', zig: '#d83838', ring: '#f0d040', crest: '#5a9a38', claw: '#e8e8d8' }, parts: [
  { t: 'c', x1: 42, y1: 50, x2: 52, y2: 50, r1: 3, r2: 2.6, c: 'bodyD', g: 'tail', z: -1 },
  { t: 'e', x: 53, y: 44, rx: 6, ry: 6, c: 'bodyD', g: 'tail', z: -1 },
  { t: 'e', x: 53, y: 44, rx: 2.6, ry: 2.6, c: 'body', g: 'tailIn', z: -0.9 },
  { t: 'c', x1: 40, y1: 48, x2: 42, y2: 56, r1: 3, r2: 2.6, c: 'bodyD', g: 'legB', z: -0.8 },
  { t: 'e', x: 44, y: 57, rx: 4, ry: 1.8, c: 'bodyD', g: 'footB', z: -0.7 },
  { t: 'c', x1: 40, y1: 34, x2: 46, y2: 40, r1: 2.4, r2: 2, c: 'bodyD', g: 'armB', z: -0.6 },
  { t: 'e', x: 34, y: 42, rx: 10, ry: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 44, rx: 6.5, ry: 9, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [24, 42, 28, 39, 31, 44, 34, 39, 37, 44, 41, 40], w: 1.6, c: 'zig', on: 'body' },
  { t: 'c', x1: 30, y1: 50, x2: 28, y2: 56, r1: 3.4, r2: 3, c: 'body', g: 'legF', z: 0.5 },
  { t: 'e', x: 25, y: 57, rx: 5, ry: 2, c: 'body', g: 'footF', z: 0.6 },
  { t: 'p', pts: [30, 14, 36, 8, 42, 12, 38, 18], c: 'crest', g: 'crest', z: 0.8 },
  { t: 'e', x: 27, y: 22, rx: 12, ry: 9, c: 'body', g: 'head', z: 1 },
  { t: 'spot', x: 20, y: 28, rx: 7, ry: 2.6, c: 'belly', on: 'head' },
  { t: 'e', x: 26, y: 18, rx: 5.4, ry: 5.4, c: 'body', g: 'eyeBulge', z: 1.2 },
  { t: 'spot', x: 25.5, y: 18, rx: 4.6, ry: 4.6, c: 'ring', on: 'eyeBulge' },
  { t: 'eye', x: 25, y: 18, s: 2.6, iris: '#c83030', look: [-1, 0] },
  { t: 'mouth', x: 16, y: 26, w: 3, style: 'smile' },
  { t: 'c', x1: 26, y1: 36, x2: 18, y2: 40, r1: 2.4, r2: 2, c: 'body', g: 'armF', z: 1.4 },
  { t: 'p', pts: [17, 38, 13, 38, 15, 40, 13, 42, 17, 42], c: 'claw', g: 'clawF', z: 1.5 },
] });

// @SHUPPET
defMon('SHUPPET', { pal: { body: '#5a6280', bodyD: '#424a64', eye: '#58c8f0' }, parts: [
  { t: 'p', pts: [38, 40, 48, 42, 54, 52, 48, 50, 50, 58, 42, 52, 36, 58, 34, 46], c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 36, rx: 14, ry: 12, c: 'body', g: 'body' },
  { t: 'p', pts: [32, 26, 32, 14, 26, 4, 36, 10, 40, 26], c: 'body', g: 'body' },
  { t: 'p', pts: [16, 30, 26, 27, 27, 38, 15, 40], c: 'bodyD', g: 'hoodShade', z: 0.5, face: true },
  { t: 'e', x: 20, y: 34, rx: 3.6, ry: 4, c: 'eye', g: 'eyeA', z: 1, face: true },
  { t: 'e', x: 30, y: 33, rx: 3.8, ry: 4.2, c: 'eye', g: 'eyeB', z: 1, face: true },
  { t: 'spot', x: 19.4, y: 34.5, rx: 1.5, ry: 2.4, c: '#1a1a28', on: 'eyeA' },
  { t: 'spot', x: 29.4, y: 33.5, rx: 1.5, ry: 2.4, c: '#1a1a28', on: 'eyeB' },
  { t: 'shine', x: 20, y: 32 },
  { t: 'shine', x: 30, y: 31 },
  { t: 'mouth', x: 24, y: 41, w: 2.4, style: 'smile' },
] });

// @BANETTE
defMon('BANETTE', { pal: { body: '#585868', bodyD: '#40404e', zip: '#e8c040', eye: '#e03838', sclera: '#f4f0e8' }, parts: [
  { t: 'c', x1: 36, y1: 16, x2: 50, y2: 8, r1: 3.6, r2: 1.4, c: 'body', g: 'horn', z: -0.5 },
  { t: 'c', x1: 38, y1: 46, x2: 40, y2: 56, r1: 3.6, r2: 3.2, c: 'bodyD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 40, y1: 34, x2: 48, y2: 40, r1: 3, r2: 2.4, c: 'bodyD', g: 'armB', z: -0.6 },
  { t: 'e', x: 32, y: 42, rx: 10, ry: 11, c: 'body', g: 'body' },
  { t: 'p', pts: [24, 46, 28, 52, 32, 47, 36, 52, 40, 46, 41, 54, 22, 54], c: 'body', g: 'body' },
  { t: 'c', x1: 28, y1: 50, x2: 27, y2: 57, r1: 3.6, r2: 3.2, c: 'body', g: 'legF', z: 0.5 },
  { t: 'e', x: 30, y: 24, rx: 13, ry: 11, c: 'body', g: 'head', z: 1 },
  { t: 'p', pts: [32, 14, 40, 10, 42, 18], c: 'body', g: 'head', z: 1 },
  { t: 'l', pts: [17, 30, 22, 32, 28, 32, 33, 30], w: 1.6, c: 'zip', g: 'zip', z: 1.6, face: true },
  { t: 'e', x: 33.5, y: 31, rx: 1.6, ry: 2.2, c: 'zip', g: 'zipTab', z: 1.7, face: true },
  { t: 'e', x: 21, y: 22, rx: 3.2, ry: 3.4, c: 'sclera', g: 'eyeA', z: 1.4, face: true },
  { t: 'e', x: 30, y: 21, rx: 3.4, ry: 3.6, c: 'sclera', g: 'eyeB', z: 1.4, face: true },
  { t: 'spot', x: 20.5, y: 22.5, rx: 2, ry: 2.4, c: 'eye', on: 'eyeA' },
  { t: 'spot', x: 29.5, y: 21.5, rx: 2, ry: 2.4, c: 'eye', on: 'eyeB' },
  { t: 'p', pts: [17, 18, 24, 19, 24, 17], c: 'bodyD', g: 'browA', z: 1.5, face: true },
  { t: 'c', x1: 26, y1: 36, x2: 16, y2: 42, r1: 3, r2: 2.6, c: 'body', g: 'armF', z: 1.4 },
] });

// @DUSKULL
defMon('DUSKULL', { pal: { body: '#3e3e4a', bodyD: '#2a2a34', mask: '#e8e4dc', maskD: '#b8b4ac', eye: '#e83030', hole: '#1a1a22' }, parts: [
  { t: 'l', pts: [38, 42, 46, 50, 52, 52, 54, 46], w: 7, w2: 1.4, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 36, rx: 12, ry: 13, c: 'body', g: 'body' },
  { t: 'p', pts: [26, 26, 34, 14, 38, 26], c: 'body', g: 'body' },
  { t: 'c', x1: 26, y1: 44, x2: 18, y2: 50, r1: 2.6, r2: 2, c: 'bodyD', g: 'armF', z: 1.2 },
  { t: 'c', x1: 38, y1: 44, x2: 44, y2: 50, r1: 2.4, r2: 1.8, c: 'bodyD', g: 'armB', z: -0.5 },
  { t: 'e', x: 26, y: 33, rx: 8.5, ry: 8.5, c: 'mask', g: 'mask', z: 1, face: true },
  { t: 'spot', x: 22, y: 32, rx: 2.8, ry: 3.2, c: 'hole', on: 'mask' },
  { t: 'spot', x: 29.5, y: 32, rx: 2.8, ry: 3.2, c: 'hole', on: 'mask' },
  { t: 'spot', x: 22.5, y: 32.4, rx: 1.3, ry: 1.6, c: 'eye', on: 'mask' },
  { t: 'stripe', pts: [21, 38, 26, 39.5, 31, 38], w: 0.8, c: 'maskD', on: 'mask' },
  { t: 'stripe', pts: [34, 40, 36, 30], w: 1.2, c: 'bodyD', on: 'body', backOnly: true },
] });

// @DUSCLOPS
defMon('DUSCLOPS', { pal: { body: '#a8a090', bodyD: '#807868', band: '#686050', head: '#8c8478', eye: '#e83030', hole: '#2a2420', hand: '#a8a090' }, parts: [
  { t: 'c', x1: 40, y1: 48, x2: 42, y2: 56, r1: 4, r2: 3.6, c: 'bodyD', g: 'legB', z: -0.8 },
  { t: 'e', x: 32, y: 38, rx: 15, ry: 15, c: 'body', g: 'body' },
  { t: 'stripe', pts: [18, 32, 32, 36, 46, 32], w: 2, c: 'band', on: 'body' },
  { t: 'stripe', pts: [18, 42, 32, 46, 46, 42], w: 2, c: 'band', on: 'body' },
  { t: 'e', x: 32, y: 40, rx: 4, ry: 2.6, c: 'hole', g: 'navel', z: 0.3, face: true },
  { t: 'c', x1: 27, y1: 50, x2: 26, y2: 57, r1: 4.4, r2: 4, c: 'body', g: 'legF', z: 0.5 },
  { t: 'e', x: 30, y: 18, rx: 10, ry: 9, c: 'head', g: 'head', z: 1 },
  { t: 'p', pts: [34, 12, 40, 4, 40, 14], c: 'head', g: 'head', z: 1 },
  { t: 'e', x: 24, y: 19, rx: 5, ry: 5, c: 'hole', g: 'socket', z: 1.2, face: true },
  { t: 'spot', x: 23.5, y: 19, rx: 2.4, ry: 2.4, c: 'eye', on: 'socket' },
  { t: 'c', x1: 46, y1: 34, x2: 54, y2: 40, r1: 3, r2: 2.6, c: 'bodyD', g: 'armB', z: -0.6 },
  { t: 'e', x: 55, y: 42, rx: 5, ry: 5, c: 'bodyD', g: 'handB', z: -0.5 },
  { t: 'c', x1: 20, y1: 34, x2: 12, y2: 42, r1: 3.4, r2: 3, c: 'body', g: 'armF', z: 1.4 },
  { t: 'e', x: 10, y: 45, rx: 6, ry: 6, c: 'hand', g: 'handF', z: 1.5 },
  { t: 'stripe', pts: [6, 46, 14, 46], w: 0.8, c: 'bodyD', on: 'handF' },
] });

// @TROPIUS
defMon('TROPIUS', { pal: { body: '#9c6c3c', bodyD: '#7a5028', leaf: '#5cae38', leafD: '#3e8a28', fruit: '#f0d848', fruitD: '#c8a830', belly: '#c89860' }, parts: [
  { t: 'p', pts: [36, 30, 50, 10, 62, 12, 54, 30], c: 'leafD', g: 'leafB1', z: -2 },
  { t: 'p', pts: [42, 34, 60, 24, 64, 34, 50, 40], c: 'leafD', g: 'leafB2', z: -2 },
  { t: 'c', x1: 44, y1: 44, x2: 45, y2: 57, r1: 3.6, r2: 3.4, c: 'bodyD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 28, y1: 44, x2: 28, y2: 57, r1: 3.6, r2: 3.4, c: 'bodyD', g: 'legB2', z: -0.8 },
  { t: 'c', x1: 50, y1: 40, x2: 62, y2: 48, r1: 4, r2: 1.4, c: 'body', g: 'body' },
  { t: 'e', x: 38, y: 40, rx: 15, ry: 9, c: 'body', g: 'body' },
  { t: 'spot', x: 36, y: 46, rx: 10, ry: 3.6, c: 'belly', on: 'body' },
  { t: 'c', x1: 40, y1: 44, x2: 40, y2: 57, r1: 3.8, r2: 3.6, c: 'body', g: 'legF', z: 0.5 },
  { t: 'c', x1: 25, y1: 44, x2: 24, y2: 57, r1: 3.8, r2: 3.6, c: 'body', g: 'legF2', z: 0.5 },
  { t: 'p', pts: [32, 32, 40, 6, 52, 2, 46, 30], c: 'leaf', g: 'leafF1', z: 0.8 },
  { t: 'stripe', pts: [38, 30, 47, 5], w: 0.8, c: 'leafD', on: 'leafF1' },
  { t: 'p', pts: [40, 34, 56, 18, 62, 22, 50, 36], c: 'leaf', g: 'leafF2', z: 0.7 },
  { t: 'stripe', pts: [45, 34, 59, 20], w: 0.8, c: 'leafD', on: 'leafF2' },
  { t: 'c', x1: 28, y1: 36, x2: 18, y2: 16, r1: 5, r2: 3.6, c: 'body', g: 'neck', z: 1 },
  { t: 'p', pts: [14, 12, 10, 6, 16, 8, 18, 4, 22, 8, 26, 6, 24, 14], c: 'leaf', g: 'collar', z: 1.1 },
  { t: 'e', x: 14, y: 15, rx: 7, ry: 5, c: 'body', g: 'head', z: 1.2 },
  { t: 'e', x: 15, y: 13, rx: 4, ry: 1.6, c: 'leafD', g: 'brow', z: 1.25 },
  { t: 'eye', x: 12, y: 15, s: 1.8, style: 'sleepy', look: [-1, 0] },
  { t: 'e', x: 17, y: 23, rx: 2, ry: 3.4, rot: 10, c: 'fruit', g: 'fruit1', z: 1.3 },
  { t: 'e', x: 20, y: 24, rx: 2, ry: 3.4, rot: -5, c: 'fruitD', g: 'fruit2', z: 1.25 },
  { t: 'e', x: 14.5, y: 23.5, rx: 2, ry: 3.2, rot: 20, c: 'fruit', g: 'fruit3', z: 1.35 },
] });

// @CHIMECHO
defMon('CHIMECHO', { pal: { body: '#e8f0f8', bodyD: '#b8c8e0', top: '#e04838', topY: '#f0d048', tail: '#a8c8f0', mouth: '#e05868' }, parts: [
  { t: 'l', pts: [34, 36, 40, 44, 36, 52, 42, 58, 50, 54, 48, 50], w: 6, w2: 2.4, c: 'tail', g: 'tail', z: -1 },
  { t: 'e', x: 30, y: 24, rx: 13, ry: 12, c: 'body', g: 'head' },
  { t: 'c', x1: 31, y1: 32, x2: 34, y2: 40, r1: 7, r2: 4, c: 'body', g: 'head' },
  { t: 'e', x: 30, y: 11, rx: 6.4, ry: 3.6, c: 'top', g: 'cap', z: 0.6 },
  { t: 'spot', x: 30, y: 10, rx: 4, ry: 1.6, c: 'topY', on: 'cap' },
  { t: 'c', x1: 30, y1: 9, x2: 30, y2: 4, r1: 1.8, r2: 1.8, c: 'top', g: 'stem', z: 0.5 },
  { t: 'c', x1: 21, y1: 32, x2: 13, y2: 36, r1: 2.2, r2: 1.6, c: 'body', g: 'armF', z: 1 },
  { t: 'c', x1: 39, y1: 32, x2: 46, y2: 36, r1: 2, r2: 1.4, c: 'bodyD', g: 'armB', z: -0.5 },
  { t: 'eye', x: 23, y: 22, s: 2.4, style: 'happy' },
  { t: 'eye', x: 33, y: 22, s: 2.4, style: 'happy' },
  { t: 'e', x: 27, y: 29, rx: 3.6, ry: 3, c: 'mouth', g: 'mouth', z: 1, face: true },
] });

// @ABSOL
defMon('ABSOL', { pal: { fur: '#f0f0f4', furD: '#c8ccd8', skin: '#3c4a78', skinD: '#2a345a', eye: '#e03040' }, parts: [
  { t: 'p', pts: [48, 36, 52, 24, 60, 18, 64, 22, 58, 28, 54, 40], c: 'skin', g: 'tail', z: -1 },
  { t: 'c', x1: 48, y1: 42, x2: 50, y2: 56, r1: 2.6, r2: 2, c: 'furD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 32, y1: 42, x2: 33, y2: 56, r1: 2.6, r2: 2, c: 'furD', g: 'legB2', z: -0.8 },
  { t: 'e', x: 40, y: 38, rx: 13, ry: 8, c: 'fur', g: 'body' },
  { t: 'stripe', pts: [30, 34, 38, 32, 50, 34], w: 1, c: 'furD', on: 'body' },
  { t: 'c', x1: 46, y1: 44, x2: 46, y2: 56, r1: 2.8, r2: 2.2, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'p', pts: [43, 55, 49, 56, 48, 59, 42, 59], c: 'skin', g: 'pawF', z: 0.6 },
  { t: 'c', x1: 30, y1: 44, x2: 28, y2: 56, r1: 2.8, r2: 2.2, c: 'fur', g: 'legF2', z: 0.5 },
  { t: 'p', pts: [25, 55, 31, 56, 30, 59, 24, 59], c: 'skin', g: 'pawF2', z: 0.6 },
  { t: 'p', pts: [20, 30, 30, 26, 36, 32, 34, 40, 30, 50, 27, 44, 22, 48, 24, 40], c: 'fur', g: 'mane', z: 0.8 },
  { t: 'p', pts: [28, 18, 32, 8, 38, 2, 46, 2, 40, 6, 36, 14, 32, 24], c: 'skin', g: 'horn', z: 0.7 },
  { t: 'e', x: 21, y: 22, rx: 8.5, ry: 7, c: 'skin', g: 'head', z: 1 },
  { t: 'p', pts: [18, 15, 26, 13, 32, 18, 30, 26, 24, 22], c: 'fur', g: 'head', z: 1 },
  { t: 'p', pts: [14, 24, 8, 28, 16, 28], c: 'skin', g: 'head', z: 1 },
  { t: 'p', pts: [13, 19, 20, 20, 19, 23, 14, 22], c: 'eye', g: 'eye', z: 1.4, face: true },
] });

// @WYNAUT
defMon('WYNAUT', { pal: { body: '#70b8f0', bodyD: '#4a8cc8', mouth: '#e8708a', tail: '#2a2430' }, parts: [
  { t: 'c', x1: 40, y1: 50, x2: 50, y2: 48, r1: 2.6, r2: 2, c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 52, y: 47, rx: 3.4, ry: 3, c: 'tail', g: 'tailTip', z: -1 },
  { t: 'e', x: 32, y: 42, rx: 12, ry: 13, c: 'body', g: 'body' },
  { t: 'p', pts: [28, 31, 30, 24, 36, 20, 35, 26, 38, 31], c: 'body', g: 'body' },
  { t: 'c', x1: 22, y1: 34, x2: 16, y2: 46, r1: 3, r2: 2.4, c: 'body', g: 'earL', z: 0.6 },
  { t: 'c', x1: 42, y1: 34, x2: 48, y2: 46, r1: 3, r2: 2.4, c: 'bodyD', g: 'earR', z: -0.3 },
  { t: 'c', x1: 25, y1: 48, x2: 20, y2: 52, r1: 2.2, r2: 1.8, c: 'body', g: 'armF', z: 0.8 },
  { t: 'e', x: 26, y: 56, rx: 3.6, ry: 2, c: 'body', g: 'footF', z: 0.5 },
  { t: 'e', x: 38, y: 56, rx: 3.6, ry: 2, c: 'bodyD', g: 'footB', z: -0.5 },
  { t: 'eye', x: 27, y: 37, s: 2, style: 'happy' },
  { t: 'eye', x: 35, y: 37, s: 2, style: 'happy' },
  { t: 'e', x: 31, y: 44, rx: 6, ry: 3.6, c: 'mouth', g: 'mouth', z: 1, face: true },
  { t: 'spot', x: 31, y: 46, rx: 3, ry: 1.4, c: '#c04060', on: 'mouth' },
] });

// @SNORUNT
defMon('SNORUNT', { pal: { hood: '#f0c058', hoodD: '#c89038', face: '#2a2a30', eye: '#f4f4f0', foot: '#2a2a30' }, parts: [
  { t: 'e', x: 26, y: 56, rx: 3, ry: 1.8, c: 'foot', g: 'footF', z: 0.5 },
  { t: 'e', x: 37, y: 56, rx: 3, ry: 1.8, c: 'foot', g: 'footB', z: -0.5 },
  { t: 'e', x: 32, y: 48, rx: 7, ry: 7, c: 'face', g: 'inner' },
  { t: 'p', pts: [32, 14, 48, 40, 46, 51, 41, 47, 37, 53, 32, 48, 27, 53, 23, 47, 18, 51, 16, 40], c: 'hood', g: 'hood', z: 0.3 },
  { t: 'e', x: 32, y: 38, rx: 10, ry: 7.5, c: 'face', g: 'faceHole', z: 0.5, face: true },
  { t: 'e', x: 28, y: 37, rx: 2.4, ry: 3.2, c: 'eye', g: 'eyeA', z: 0.8, face: true },
  { t: 'e', x: 36, y: 37, rx: 2.4, ry: 3.2, c: 'eye', g: 'eyeB', z: 0.8, face: true },
  { t: 'spot', x: 27.5, y: 37.5, rx: 1, ry: 1.4, c: '#1a1a20', on: 'eyeA' },
  { t: 'spot', x: 35.5, y: 37.5, rx: 1, ry: 1.4, c: '#1a1a20', on: 'eyeB' },
  { t: 'c', x1: 24, y1: 46, x2: 20, y2: 50, r1: 1.8, r2: 1.6, c: 'face', g: 'armF', z: 0.2 },
] });
