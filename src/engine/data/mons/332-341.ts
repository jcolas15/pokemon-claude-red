// POKéMON drawings, Gen 3 #332-341. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @CACTURNE
defMon('CACTURNE', { pal: { body: '#4a8a48', dark: '#2a5a34', light: '#7cbc60', eye: '#f0d040', socket: '#1c2c20', mouth: '#1c2c20', thorn: '#e8e0b0' }, parts: [
  { t: 'c', x1: 38, y1: 44, x2: 40, y2: 54, r1: 3, r2: 2.6, c: 'body', g: 'legB', z: -1 },
  { t: 'e', x: 41, y: 56, rx: 4, ry: 2, c: 'dark', g: 'legB', z: -1 },
  { t: 'c', x1: 38, y1: 28, x2: 50, y2: 36, r1: 2.6, r2: 2.4, c: 'body', g: 'armB', z: -0.5 },
  { t: 'e', x: 52, y: 38, rx: 4.6, ry: 5, c: 'dark', g: 'handB', z: -0.4 },
  { t: 'p', pts: [32, 26, 40, 26, 42, 46, 28, 46], c: 'body', g: 'body' },
  { t: 'e', x: 35, y: 44, rx: 7.5, ry: 5, c: 'body', g: 'body' },
  { t: 'p', pts: [29, 38, 40, 38, 38, 42, 30, 42], c: 'dark', g: 'body' },
  { t: 'c', x1: 31, y1: 46, x2: 28, y2: 54, r1: 3.2, r2: 2.8, c: 'body', g: 'legF', z: 1 },
  { t: 'e', x: 27, y: 56, rx: 4.5, ry: 2.2, c: 'dark', g: 'legF', z: 1 },
  { t: 'c', x1: 31, y1: 28, x2: 18, y2: 36, r1: 2.6, r2: 2.4, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 14, y: 38, rx: 5, ry: 5.5, c: 'dark', g: 'handF', z: 2.1 },
  { t: 'spot', x: 12, y: 35, rx: 0.8, ry: 0.8, c: 'thorn', on: 'handF' },
  { t: 'spot', x: 16, y: 40, rx: 0.8, ry: 0.8, c: 'thorn', on: 'handF' },
  { t: 'spot', x: 12, y: 41, rx: 0.8, ry: 0.8, c: 'thorn', on: 'handF' },
  { t: 'e', x: 34, y: 20, rx: 10, ry: 7.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'e', x: 34, y: 13, rx: 14, ry: 3.2, c: 'dark', g: 'hat', z: 1.7 },
  { t: 'p', pts: [25, 13, 31, 4, 36, 0, 40, 5, 43, 13], c: 'dark', g: 'hat', z: 1.7 },
  { t: 'p', pts: [32, 3, 34, -1, 36, 3, 40, 2, 37, 5, 38, 9, 34, 7, 30, 9, 31, 5, 28, 2], c: 'eye', g: 'star', z: 1.8, flat: true },
  { t: 'p', pts: [32, 30, 35, 27, 38, 30, 35, 33], c: 'light', g: 'gem1', z: 0.5, flat: true },
  { t: 'p', pts: [33, 35, 35, 33, 37, 35, 35, 37], c: 'light', g: 'gem2', z: 0.5, flat: true },
  { t: 'p', pts: [24, 15, 32, 17, 31, 21, 25, 20], c: 'socket', g: 'sockL', z: 1.8, flat: true, face: true },
  { t: 'p', pts: [35, 17, 42, 15, 42, 20, 36, 21], c: 'socket', g: 'sockR', z: 1.8, flat: true, face: true },
  { t: 'p', pts: [25, 16.5, 31, 18, 28, 20.5], c: 'eye', g: 'eyeL', z: 1.9, flat: true, face: true },
  { t: 'p', pts: [36, 18, 42, 16.5, 39, 20.5], c: 'eye', g: 'eyeR', z: 1.9, flat: true, face: true },
  { t: 'p', pts: [27, 24, 33, 25, 39, 24, 37, 27, 29, 27], c: 'mouth', g: 'mouth', z: 1.8, flat: true, face: true },
] });

// @SWABLU
defMon('SWABLU', { pal: { body: '#68b8e8', cloud: '#f4f6fa', beak: '#f0d070', leg: '#e8c060' }, parts: [
  { t: 'e', x: 44, y: 40, rx: 8, ry: 6, c: 'cloud', g: 'wingB', z: -1, soft: true },
  { t: 'e', x: 50, y: 44, rx: 6, ry: 5, c: 'cloud', g: 'wingB', z: -1, soft: true },
  { t: 'p', pts: [42, 46, 52, 50, 50, 54, 44, 52], c: 'body', g: 'tail', z: -1.5 },
  { t: 'l', pts: [31, 50, 30, 56], w: 1.2, c: 'leg', g: 'legR', z: -1, flat: true },
  { t: 'l', pts: [37, 50, 36, 56], w: 1.2, c: 'leg', g: 'legL', z: -1, flat: true },
  { t: 'e', x: 34, y: 42, rx: 9.5, ry: 9, c: 'body', g: 'body' },
  { t: 'p', pts: [34, 34, 36, 26, 38, 32, 42, 28, 40, 36], c: 'body', g: 'crest', z: -0.5 },
  { t: 'e', x: 38, y: 46, rx: 7, ry: 5, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'e', x: 44, y: 49, rx: 5, ry: 4, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'e', x: 33, y: 49, rx: 4, ry: 3.6, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'p', pts: [26, 40, 20, 42, 26, 44], c: 'beak', g: 'beak', z: 1.5 },
  { t: 'eye', x: 29, y: 38, s: 2, style: 'closed', iris: '#2a2430' },
] });

// @ALTARIA
defMon('ALTARIA', { pal: { body: '#5cb0e8', cloud: '#f4f6fa', beak: '#f0d070', leg: '#e8c060', dark: '#3a78b8' }, parts: [
  { t: 'e', x: 48, y: 26, rx: 11, ry: 9, c: 'cloud', g: 'wingB', z: -1, soft: true },
  { t: 'e', x: 56, y: 32, rx: 7, ry: 7, c: 'cloud', g: 'wingB', z: -1, soft: true },
  { t: 'e', x: 42, y: 20, rx: 7, ry: 6, c: 'cloud', g: 'wingB', z: -1, soft: true },
  { t: 'p', pts: [46, 44, 60, 46, 62, 52, 56, 50, 58, 56, 48, 52], c: 'body', g: 'tail', z: -1.5 },
  { t: 'l', pts: [32, 50, 31, 57], w: 1.4, c: 'leg', g: 'legR', z: -1, flat: true },
  { t: 'l', pts: [40, 50, 39, 57], w: 1.4, c: 'leg', g: 'legL', z: -1, flat: true },
  { t: 'e', x: 38, y: 42, rx: 12, ry: 9, c: 'body', g: 'body' },
  { t: 'c', x1: 30, y1: 38, x2: 22, y2: 24, r1: 4.5, r2: 3.5, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 40, rx: 8, ry: 6, c: 'cloud', g: 'chest', z: 0.5, soft: true },
  { t: 'e', x: 27, y: 34, rx: 5, ry: 4.5, c: 'cloud', g: 'chest', z: 0.5, soft: true },
  { t: 'e', x: 40, y: 44, rx: 11, ry: 8, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'e', x: 50, y: 40, rx: 8, ry: 7, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'e', x: 48, y: 49, rx: 7, ry: 5, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'e', x: 32, y: 48, rx: 6, ry: 4.5, c: 'cloud', g: 'wingF', z: 1, soft: true },
  { t: 'p', pts: [24, 18, 32, 10, 30, 16, 38, 12, 30, 22], c: 'body', g: 'crest', z: 1.4 },
  { t: 'e', x: 20, y: 20, rx: 7, ry: 6, c: 'body', g: 'head', z: 1.5 },
  { t: 'p', pts: [14, 19, 6, 21.5, 14, 24], c: 'beak', g: 'beak', z: 1.6 },
  { t: 'eye', x: 17, y: 18.5, s: 2.2, style: 'sleepy', iris: '#2a2430' },
] });

// @ZANGOOSE
defMon('ZANGOOSE', { pal: { fur: '#f4f2ee', red: '#d83a48', claw: '#3a3440', pink: '#e89aa0' }, parts: [
  { t: 'c', x1: 44, y1: 48, x2: 56, y2: 36, r1: 3, r2: 4.5, c: 'fur', g: 'tail', z: -2 },
  { t: 'c', x1: 56, y1: 36, x2: 58, y2: 24, r1: 4.5, r2: 3, c: 'fur', g: 'tail', z: -2 },
  { t: 'stripe', pts: [55, 38, 59, 30], w: 2, c: 'red', on: 'tail' },
  { t: 'c', x1: 40, y1: 46, x2: 42, y2: 54, r1: 3.4, r2: 2.6, c: 'fur', g: 'legB', z: -1 },
  { t: 'e', x: 41, y: 56.5, rx: 4, ry: 1.8, c: 'fur', g: 'legB', z: -1 },
  { t: 'c', x1: 38, y1: 30, x2: 44, y2: 40, r1: 2.6, r2: 2.2, c: 'fur', g: 'armB', z: -0.5 },
  { t: 'p', pts: [42, 40, 48, 44, 44, 44, 46, 47, 41, 44], c: 'claw', g: 'clawB', z: -0.4 },
  { t: 'e', x: 36, y: 38, rx: 8, ry: 11, c: 'fur', g: 'body' },
  { t: 'stripe', pts: [30, 32, 35, 35, 30, 39, 35, 43], w: 2.2, c: 'red', on: 'body' },
  { t: 'c', x1: 32, y1: 46, x2: 28, y2: 54, r1: 3.6, r2: 2.8, c: 'fur', g: 'legF', z: 1 },
  { t: 'e', x: 26, y: 56.5, rx: 4.5, ry: 1.8, c: 'fur', g: 'legF', z: 1 },
  { t: 'c', x1: 30, y1: 31, x2: 22, y2: 38, r1: 2.8, r2: 2.4, c: 'fur', g: 'armF', z: 2 },
  { t: 'p', pts: [21, 36, 14, 34, 18, 37, 13, 39, 18, 40, 15, 43, 22, 41], c: 'claw', g: 'clawF', z: 2.1 },
  { t: 'p', pts: [32, 16, 35, 6, 40, 15], c: 'fur', g: 'earB', z: 1.4 },
  { t: 'p', pts: [33, 9, 35, 6, 37, 10], c: 'red', g: 'earB', z: 1.45 },
  { t: 'e', x: 28, y: 22, rx: 9, ry: 7.5, c: 'fur', g: 'head', z: 1.5 },
  { t: 'e', x: 19, y: 25, rx: 5, ry: 3.5, c: 'fur', g: 'head', z: 1.5 },
  { t: 'p', pts: [22, 16, 22, 6, 29, 14], c: 'fur', g: 'earF', z: 1.6 },
  { t: 'p', pts: [22, 10, 22, 6, 25, 10], c: 'red', g: 'earF', z: 1.65 },
  { t: 'stripe', pts: [26, 14, 29, 17, 26, 19], w: 1.6, c: 'red', on: 'head', face: true },
  { t: 'spot', x: 15, y: 24.5, rx: 1.2, ry: 1, c: 'pink', on: 'head', face: true },
  { t: 'eye', x: 22, y: 21, s: 2.2, style: 'angry', iris: '#c83040', look: [-1, 0] },
  { t: 'mouth', x: 18, y: 27.5, w: 2.6, style: 'fang' },
] });

// @SEVIPER
defMon('SEVIPER', { pal: { body: '#2c2c3a', yellow: '#f0d040', belly: '#9a7ab8', blade: '#c83040', fang: '#d84050' }, parts: [
  { t: 'c', x1: 46, y1: 28, x2: 54, y2: 16, r1: 3, r2: 2, c: 'body', g: 'tail', z: -2 },
  { t: 'p', pts: [52, 18, 60, 4, 63, 8, 58, 18, 54, 22], c: 'blade', g: 'blade', z: -1.9 },
  { t: 'e', x: 38, y: 50, rx: 22, ry: 8, c: 'body', g: 'coil', z: -1 },
  { t: 'stripe', pts: [26, 48, 30, 52], w: 2, c: 'yellow', on: 'coil' },
  { t: 'stripe', pts: [38, 44, 40, 50], w: 2, c: 'yellow', on: 'coil' },
  { t: 'stripe', pts: [50, 45, 52, 51], w: 2, c: 'yellow', on: 'coil' },
  { t: 'c', x1: 52, y1: 46, x2: 46, y2: 30, r1: 5, r2: 4, c: 'body', g: 'coil2', z: -0.5 },
  { t: 'stripe', pts: [46, 38, 52, 37], w: 2, c: 'yellow', on: 'coil2' },
  { t: 'c', x1: 34, y1: 52, x2: 32, y2: 32, r1: 6, r2: 5, c: 'body', g: 'neck', z: 1 },
  { t: 'c', x1: 32, y1: 32, x2: 26, y2: 22, r1: 5, r2: 4.5, c: 'body', g: 'neck', z: 1 },
  { t: 'spot', x: 29, y: 38, rx: 3, ry: 12, c: 'belly', on: 'neck' },
  { t: 'stripe', pts: [34, 40, 38, 42], w: 2, c: 'yellow', on: 'neck' },
  { t: 'stripe', pts: [33, 30, 37, 32], w: 2, c: 'yellow', on: 'neck' },
  { t: 'e', x: 22, y: 18, rx: 10, ry: 7, c: 'body', g: 'head', z: 2 },
  { t: 'e', x: 13, y: 21, rx: 6, ry: 4.5, c: 'body', g: 'head', z: 2 },
  { t: 'stripe', pts: [16, 15, 22, 13, 30, 15], w: 1.6, c: 'yellow', on: 'head' },
  { t: 'eye', x: 19, y: 17, s: 2.4, style: 'angry', iris: '#d83040', look: [-1, 0] },
  { t: 'p', pts: [11, 23, 13, 29, 15, 23], c: 'fang', g: 'fang1', z: 2.2, face: true },
  { t: 'p', pts: [17, 24, 19, 30, 21, 24], c: 'fang', g: 'fang2', z: 2.2, face: true },
  { t: 'p', pts: [12, 26, 9, 28, 7, 27], c: 'blade', g: 'tongue', z: 2.1, flat: true, face: true },
] });

// @LUNATONE
defMon('LUNATONE', { pal: { rock: '#ecd890', dark: '#b8a060', eye: '#d83040', socket: '#4a3a30' }, parts: [
  { t: 'p', pts: [30, 6, 22, 12, 16, 22, 14, 32, 16, 42, 22, 50, 30, 55, 40, 57, 50, 54, 44, 51, 38, 46, 34, 40, 32, 33, 32, 24, 34, 14, 38, 6], c: 'rock', g: 'moon' },
  { t: 'spot', x: 20, y: 24, rx: 2.2, ry: 2, c: 'dark', on: 'moon' },
  { t: 'spot', x: 24, y: 46, rx: 1.6, ry: 1.4, c: 'dark', on: 'moon' },
  { t: 'spot', x: 18, y: 36, rx: 1.2, ry: 1.2, c: 'dark', on: 'moon' },
  { t: 'p', pts: [22, 25, 30, 22, 31.5, 28, 23, 30], c: 'socket', g: 'sock', z: 0.5, flat: true, face: true },
  { t: 'e', x: 27, y: 26.5, rx: 2.4, ry: 1.8, c: 'eye', g: 'eye', z: 0.6, flat: true, face: true },
  { t: 'p', pts: [26, 35, 30, 34, 29, 38], c: 'socket', g: 'nose', z: 0.5, flat: true, face: true },
  { t: 'shine', x: 19, y: 16 },
] });

// @SOLROCK
defMon('SOLROCK', { pal: { body: '#e86a30', ray: '#f09838', face: '#f8d860', eye: '#d83040', socket: '#3a2a20' }, parts: [
  { t: 'p', pts: [32, 4, 37, 14, 46, 8, 45, 18, 56, 18, 50, 26, 60, 32, 50, 38, 56, 46, 45, 46, 46, 56, 37, 50, 32, 60, 27, 50, 18, 56, 19, 46, 8, 46, 14, 38, 4, 32, 14, 26, 8, 18, 19, 18, 18, 8, 27, 14], c: 'ray', g: 'rays', z: -1 },
  { t: 'e', x: 32, y: 32, rx: 16, ry: 16, c: 'body', g: 'disk' },
  { t: 'e', x: 32, y: 33, rx: 10, ry: 11, c: 'face', g: 'face', z: 0.5, face: true },
  { t: 'p', pts: [24, 30, 32, 27, 40, 30, 32, 33], c: 'socket', g: 'band', z: 0.7, flat: true, face: true },
  { t: 'p', pts: [32, 27.5, 35, 30, 32, 32.5, 29, 30], c: 'eye', g: 'eye', z: 0.8, flat: true, face: true },
  { t: 'p', pts: [30, 36, 34, 36, 32, 40], c: 'socket', g: 'nose', z: 0.7, flat: true, face: true },
] });

// @BARBOACH
defMon('BARBOACH', { pal: { body: '#7c9ab0', belly: '#c8d4dc', fin: '#5c7890', whisk: '#e8e0b0', spot: '#a8bccb' }, parts: [
  { t: 'p', pts: [44, 44, 56, 36, 58, 44, 56, 52], c: 'fin', g: 'tail', z: -1 },
  { t: 'p', pts: [34, 36, 40, 30, 44, 38], c: 'fin', g: 'dorsal', z: -0.5 },
  { t: 'e', x: 34, y: 45, rx: 13, ry: 8, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 51, rx: 12, ry: 3, c: 'belly', on: 'body' },
  { t: 'spot', x: 40, y: 42, rx: 1.4, ry: 1.2, c: 'spot', on: 'body' },
  { t: 'spot', x: 44, y: 46, rx: 1.2, ry: 1, c: 'spot', on: 'body' },
  { t: 'p', pts: [34, 48, 38, 54, 32, 52], c: 'fin', g: 'pec', z: 1 },
  { t: 'l', pts: [22, 46, 16, 50, 14, 56], w: 1.4, w2: 0.8, c: 'whisk', g: 'whisk1', z: 1.5 },
  { t: 'l', pts: [26, 48, 22, 54, 23, 58], w: 1.4, w2: 0.8, c: 'whisk', g: 'whisk2', z: 0.5 },
  { t: 'eye', x: 26, y: 40, s: 2, style: 'dot', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 31, y: 39, s: 1.8, style: 'dot', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 23, y: 46, w: 3, style: 'smile' },
] });

// @WHISCASH
defMon('WHISCASH', { pal: { body: '#4c8ad0', belly: '#e8ecf0', yellow: '#f0d040', whisk: '#f0d040', fin: '#3a6aa8', mouth: '#2a2a40' }, parts: [
  { t: 'p', pts: [48, 36, 62, 26, 60, 38, 63, 50, 50, 46], c: 'fin', g: 'tail', z: -1 },
  { t: 'e', x: 34, y: 38, rx: 22, ry: 16, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 52, rx: 18, ry: 7, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [24, 26, 28, 32, 32, 26, 36, 32, 40, 26], w: 2, c: 'yellow', on: 'body', face: true },
  { t: 'spot', x: 46, y: 30, rx: 1.6, ry: 1.6, c: 'yellow', on: 'body' },
  { t: 'spot', x: 50, y: 36, rx: 1.4, ry: 1.4, c: 'yellow', on: 'body' },
  { t: 'p', pts: [42, 46, 50, 54, 40, 54], c: 'fin', g: 'pec', z: 1 },
  { t: 'p', pts: [12, 42, 34, 44, 30, 47, 14, 46], c: 'mouth', g: 'mouth', z: 0.5, flat: true, face: true },
  { t: 'l', pts: [14, 40, 6, 36, 2, 26, 4, 18], w: 2.2, w2: 1, c: 'whisk', g: 'whiskF', z: 2 },
  { t: 'l', pts: [22, 38, 18, 30, 20, 22], w: 1.8, w2: 0.8, c: 'whisk', g: 'whiskB', z: 1.5 },
  { t: 'eye', x: 20, y: 33, s: 2.4, style: 'sleepy', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 29, y: 31, s: 2.2, style: 'sleepy', iris: '#2a2430', look: [-1, 0] },
] });

// @CORPHISH
defMon('CORPHISH', { pal: { body: '#e05838', claw: '#d84830', tan: '#e8c890', star: '#f8f4e8', leg: '#b84028' }, parts: [
  { t: 'p', pts: [44, 48, 54, 44, 60, 48, 56, 54, 46, 54], c: 'body', g: 'tail', z: -1.5 },
  { t: 'l', pts: [36, 50, 40, 56], w: 1.4, c: 'leg', g: 'legB1', z: -1, flat: true },
  { t: 'l', pts: [42, 50, 46, 56], w: 1.4, c: 'leg', g: 'legB2', z: -1, flat: true },
  { t: 'c', x1: 38, y1: 40, x2: 46, y2: 32, r1: 2, r2: 1.8, c: 'body', g: 'armB', z: -0.5 },
  { t: 'p', pts: [42, 30, 48, 22, 56, 24, 58, 30, 52, 30, 54, 34, 46, 36], c: 'claw', g: 'clawB', z: -0.4 },
  { t: 'e', x: 36, y: 46, rx: 11, ry: 8, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 51, rx: 8, ry: 3.5, c: 'tan', on: 'body' },
  { t: 'l', pts: [28, 51, 24, 57], w: 1.4, c: 'leg', g: 'legF1', z: 1, flat: true },
  { t: 'l', pts: [34, 52, 32, 57], w: 1.4, c: 'leg', g: 'legF2', z: 1, flat: true },
  { t: 'c', x1: 28, y1: 42, x2: 20, y2: 34, r1: 2, r2: 1.8, c: 'body', g: 'armF', z: 2 },
  { t: 'p', pts: [20, 36, 10, 30, 8, 22, 14, 18, 18, 24, 22, 20, 26, 26, 24, 34], c: 'claw', g: 'clawF', z: 2.1 },
  { t: 'p', pts: [22, 24, 16, 26, 14, 20], c: 'tan', g: 'clawIn', z: 2.2, flat: true },
  { t: 'p', pts: [30, 36, 31, 30, 35, 34, 39, 28, 39, 34, 44, 34, 38, 38], c: 'star', g: 'star', z: 1.4 },
  { t: 'eye', x: 28, y: 42, s: 2, style: 'round', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 34, y: 41, s: 1.8, style: 'round', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 26, y: 47, w: 2.4, style: 'smile' },
] });
