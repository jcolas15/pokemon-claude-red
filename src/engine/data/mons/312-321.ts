// POKéMON drawings, Gen 3 #312-321. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @MINUN
defMon('MINUN', { pal: { body: '#f6eedc', blue: '#3c78e0' }, parts: [
  { t: 'c', x1: 38, y1: 50, x2: 46, y2: 44, r1: 1, r2: 1, c: 'blue', g: 'tail', z: -1 },
  { t: 'p', pts: [43, 40.5, 52, 40.5, 52, 44, 43, 44], c: 'blue', g: 'tail', z: -1 },
  { t: 'e', x: 36, y: 56.5, rx: 2.6, ry: 1.6, c: 'blue', g: 'footB', z: -0.5 },
  { t: 'e', x: 32, y: 50, rx: 6, ry: 6, c: 'body', g: 'body' },
  { t: 'e', x: 27, y: 56.5, rx: 2.6, ry: 1.6, c: 'blue', g: 'footF', z: 1 },
  { t: 'e', x: 25, y: 48, rx: 2, ry: 2, c: 'blue', g: 'pawF', z: 2 },
  { t: 'e', x: 38, y: 47, rx: 2, ry: 2, c: 'blue', g: 'pawB', z: -0.5 },
  { t: 'e', x: 21, y: 27, rx: 2.6, ry: 7, rot: -35, c: 'body', g: 'earL', z: 1 },
  { t: 'spot', x: 18, y: 23, rx: 3.5, ry: 5, c: 'blue', on: 'earL' },
  { t: 'e', x: 40, y: 26, rx: 2.6, ry: 7, rot: 35, c: 'body', g: 'earR', z: 1 },
  { t: 'spot', x: 43, y: 22, rx: 3.5, ry: 5, c: 'blue', on: 'earR' },
  { t: 'e', x: 30, y: 37, rx: 9, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'p', pts: [20, 40, 24.5, 40, 24.5, 41.6, 20, 41.6], c: 'blue', g: 'cheek', z: 2, flat: true, face: true },
  { t: 'eye', x: 26, y: 35, s: 2.4, iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 33, y: 35, s: 2.4, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 28, y: 40.5, w: 1.6, style: 'smile' },
] });

// @VOLBEAT
defMon('VOLBEAT', { pal: { head: '#2a2a3a', body: '#5870b8', yellow: '#f6d030', red: '#d83838', wing: '#c8e0f0', light: '#fff27a' }, parts: [
  { t: 'p', pts: [38, 32, 52, 20, 58, 24, 46, 36], c: 'wing', g: 'wingB', z: -2 },
  { t: 'e', x: 46, y: 46, rx: 7, ry: 6, c: 'light', g: 'tail', z: -1, gloss: true },
  { t: 'c', x1: 36, y1: 46, x2: 38, y2: 55, r1: 2.2, r2: 1.8, c: 'head', g: 'legB', z: -0.8 },
  { t: 'c', x1: 36, y1: 34, x2: 44, y2: 40, r1: 1.8, r2: 1.6, c: 'body', g: 'armB', z: -0.6 },
  { t: 'e', x: 34, y: 40, rx: 8, ry: 9, c: 'body', g: 'body' },
  { t: 'stripe', pts: [26, 38, 40, 38], w: 1.6, c: 'yellow', on: 'body' },
  { t: 'stripe', pts: [26, 43, 40, 43], w: 1.6, c: 'yellow', on: 'body' },
  { t: 'c', x1: 30, y1: 47, x2: 28, y2: 55, r1: 2.4, r2: 2, c: 'head', g: 'legF', z: 1 },
  { t: 'e', x: 27, y: 56.5, rx: 3, ry: 1.6, c: 'head', g: 'legF', z: 1 },
  { t: 'c', x1: 29, y1: 34, x2: 21, y2: 41, r1: 1.8, r2: 1.6, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 20, y: 42, rx: 2.2, ry: 2.2, c: 'head', g: 'armF', z: 2 },
  { t: 'p', pts: [36, 26, 50, 12, 56, 16, 44, 30], c: 'wing', g: 'wingF', z: 0.5 },
  { t: 'e', x: 30, y: 22, rx: 9, ry: 8, c: 'head', g: 'head', z: 1.5 },
  { t: 'spot', x: 24, y: 26, rx: 6, ry: 3.5, c: 'yellow', on: 'head', face: true },
  { t: 'l', pts: [30, 15, 30, 8, 26, 4], w: 1.4, w2: 1, c: 'yellow', z: 1.4 },
  { t: 'e', x: 26, y: 4, rx: 2, ry: 2, c: 'red', g: 'antTip', z: 1.4 },
  { t: 'e', x: 24, y: 20, rx: 2.2, ry: 2.6, c: '#f8f8f0', g: 'eyeA', z: 2, flat: true, face: true },
  { t: 'e', x: 31, y: 20, rx: 2.2, ry: 2.6, c: '#f8f8f0', g: 'eyeB', z: 2, flat: true, face: true },
  { t: 'mouth', x: 24, y: 27, w: 1.6, style: 'smile' },
] });

// @ILLUMISE
defMon('ILLUMISE', { pal: { body: '#8a6cc8', dark: '#5c4498', face: '#f4dc90', hair: '#4c64c0', wing: '#d8e8f4', light: '#fff27a' }, parts: [
  { t: 'p', pts: [38, 30, 52, 18, 58, 22, 46, 34], c: 'wing', g: 'wingB', z: -2 },
  { t: 'e', x: 45, y: 47, rx: 6, ry: 5, c: 'light', g: 'tail', z: -1, gloss: true },
  { t: 'c', x1: 36, y1: 34, x2: 44, y2: 40, r1: 1.8, r2: 1.6, c: 'body', g: 'armB', z: -0.6 },
  { t: 'p', pts: [28, 32, 38, 32, 44, 54, 22, 54], c: 'body', g: 'body' },
  { t: 'e', x: 33, y: 53, rx: 11, ry: 3.4, c: 'body', g: 'body' },
  { t: 'stripe', pts: [26, 44, 41, 44], w: 1.4, c: 'dark', on: 'body' },
  { t: 'e', x: 33, y: 36, rx: 6, ry: 5, c: 'face', g: 'chest', z: 0.3 },
  { t: 'c', x1: 29, y1: 34, x2: 21, y2: 41, r1: 1.8, r2: 1.6, c: 'body', g: 'armF', z: 2 },
  { t: 'e', x: 20, y: 42, rx: 2.2, ry: 2.2, c: 'face', g: 'armF', z: 2 },
  { t: 'p', pts: [36, 26, 50, 12, 56, 16, 44, 30], c: 'wing', g: 'wingF', z: 0.5 },
  { t: 'e', x: 30, y: 23, rx: 8, ry: 7.5, c: 'face', g: 'head', z: 1.5 },
  { t: 'p', pts: [22, 20, 26, 14, 34, 13, 40, 18, 46, 10, 50, 4, 52, 14, 46, 22, 38, 22, 30, 18, 24, 22], c: 'hair', g: 'hair', z: 1.7 },
  { t: 'p', pts: [26, 15, 22, 6, 16, 2, 22, 12], c: 'hair', g: 'hair2', z: 1.6 },
  { t: 'eye', x: 25, y: 24, s: 2.2, iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 31, y: 24, s: 2, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 26, y: 28.5, w: 1.4, style: 'smile' },
] });

// @ROSELIA
defMon('ROSELIA', { pal: { body: '#80c060', pale: '#c8e8a0', leaf: '#3c8c3c', red: '#e03850', blue: '#4058c8', thorn: '#2c6a34', foot: '#58a048' }, parts: [
  { t: 'c', x1: 36, y1: 36, x2: 43, y2: 32, r1: 1.4, r2: 1.2, c: 'leaf', g: 'armB', z: -1 },
  { t: 'e', x: 45, y: 30, rx: 4, ry: 4.4, c: 'blue', g: 'roseB', z: -1 },
  { t: 'stripe', pts: [43, 29, 45, 31, 47, 28], w: 0.7, c: '#2c3a8c', on: 'roseB' },
  { t: 'e', x: 36, y: 56, rx: 2.6, ry: 1.6, c: 'foot', g: 'footB', z: -0.5 },
  { t: 'e', x: 32, y: 47, rx: 6, ry: 8, c: 'body', g: 'body' },
  { t: 'spot', x: 31, y: 49, rx: 3.5, ry: 5, c: 'pale', on: 'body' },
  { t: 'p', pts: [22, 38, 30, 34, 38, 34, 44, 38, 38, 42, 32, 40, 26, 42], c: 'leaf', g: 'collar', z: 0.5 },
  { t: 'e', x: 27, y: 56.5, rx: 2.8, ry: 1.6, c: 'foot', g: 'footF', z: 1 },
  { t: 'c', x1: 28, y1: 40, x2: 21, y2: 44, r1: 1.4, r2: 1.2, c: 'leaf', g: 'armF', z: 2 },
  { t: 'e', x: 18, y: 44, rx: 4, ry: 4.4, c: 'red', g: 'roseF', z: 2 },
  { t: 'stripe', pts: [16, 43, 18, 45, 20, 42], w: 0.7, c: '#a02038', on: 'roseF' },
  { t: 'p', pts: [17, 47, 14, 51, 19, 49], c: 'leaf', g: 'roseLeaf', z: 2.1 },
  { t: 'e', x: 31, y: 28, rx: 7.5, ry: 6.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'p', pts: [29, 22, 31, 12, 34, 22], c: 'thorn', g: 'thornM', z: 1.4 },
  { t: 'p', pts: [25, 23, 22, 14, 29, 22], c: 'thorn', g: 'thornL', z: 1.6 },
  { t: 'p', pts: [34, 22, 40, 15, 38, 24], c: 'thorn', g: 'thornR', z: 1.3 },
  { t: 'eye', x: 27, y: 28, s: 2, iris: '#d83040', look: [-1, 0] },
  { t: 'eye', x: 33, y: 28, s: 1.8, iris: '#d83040', look: [-1, 0] },
  { t: 'mouth', x: 28, y: 32.5, w: 1.4, style: 'smile' },
] });

// @GULPIN
defMon('GULPIN', { pal: { body: '#a8d858', dark: '#78a838', tuft: '#f0d040', blk: '#2a2a30' }, parts: [
  { t: 'c', x1: 40, y1: 44, x2: 45, y2: 48, r1: 1.6, r2: 1.4, c: 'body', g: 'armB', z: -1 },
  { t: 'e', x: 32, y: 44, rx: 12, ry: 12.5, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 54.5, rx: 13.5, ry: 3.4, c: 'body', g: 'body' },
  { t: 'p', pts: [40, 36, 43, 40, 40, 44, 37, 40], c: 'blk', g: 'mark', z: 0.5, backOnly: true },
  { t: 'p', pts: [30, 38, 36, 42, 30, 48, 24, 42], c: 'blk', g: 'mark', z: 0.5, backOnly: true },
  { t: 'c', x1: 22, y1: 46, x2: 17, y2: 49, r1: 1.6, r2: 1.4, c: 'body', g: 'armF', z: 1 },
  { t: 'p', pts: [29, 33, 27, 26, 30.5, 29, 33, 24, 34, 33], c: 'tuft', g: 'tuft', z: 0.8 },
  { t: 'eye', x: 24, y: 40, s: 1.1, style: 'dot', iris: '#2a2430', sclera: false },
  { t: 'eye', x: 30, y: 40, s: 1.1, style: 'dot', iris: '#2a2430', sclera: false },
  { t: 'mouth', x: 26, y: 45, w: 3.4, style: 'line' },
] });

// @SWALOT
defMon('SWALOT', { pal: { body: '#8070c8', dark: '#5a4a98', lip: '#f0d060', blk: '#2a2440', mouth: '#4a2848' }, parts: [
  { t: 'c', x1: 48, y1: 40, x2: 54, y2: 42, r1: 2.4, r2: 2, c: 'body', g: 'armB', z: -1 },
  { t: 'e', x: 34, y: 38, rx: 18, ry: 19, c: 'body', g: 'body' },
  { t: 'e', x: 34, y: 53, rx: 20, ry: 5, c: 'body', g: 'body' },
  { t: 'p', pts: [32, 16, 35, 20, 32, 24, 29, 20], c: 'blk', g: 'diaT', z: 0.6 },
  { t: 'p', pts: [46, 26, 50, 30, 46, 34, 42, 30], c: 'blk', g: 'diaA', z: 0.6 },
  { t: 'p', pts: [49, 40, 52, 44, 49, 48, 46, 44], c: 'blk', g: 'diaB', z: 0.6 },
  { t: 'p', pts: [30, 22, 34, 18, 37, 24, 32, 26], c: 'blk', g: 'mark', z: 0.5, backOnly: true },
  { t: 'p', pts: [22, 34, 28, 30, 44, 30, 50, 34, 44, 42, 28, 42], c: 'lip', g: 'lips', z: 1, face: true },
  { t: 'p', pts: [24, 35, 30, 32.5, 42, 32.5, 48, 35, 42, 39.5, 30, 39.5], c: 'mouth', g: 'inMouth', z: 1.1, flat: true, face: true },
  { t: 'c', x1: 20, y1: 44, x2: 14, y2: 48, r1: 2.6, r2: 2.2, c: 'body', g: 'armF', z: 1.5 },
  { t: 'eye', x: 27, y: 24, s: 1.4, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 39, y: 24, s: 1.4, style: 'sleepy', iris: '#2a2430', flip: true },
] });

// @CARVANHA
defMon('CARVANHA', { pal: { top: '#2c4c98', red: '#d83c3c', yellow: '#f6d030', tooth: '#f8f4ec', mouth: '#4a1c24' }, parts: [
  { t: 'p', pts: [44, 38, 58, 28, 60, 34, 56, 40, 60, 46, 58, 52, 44, 44], c: 'top', g: 'tail', z: -1 },
  { t: 'p', pts: [32, 24, 40, 14, 46, 22, 42, 28], c: 'top', g: 'dorsal', z: -0.5 },
  { t: 'e', x: 32, y: 40, rx: 15, ry: 13, c: 'red', g: 'body' },
  { t: 'spot', x: 34, y: 31, rx: 16, ry: 9, c: 'top', on: 'body' },
  { t: 'p', pts: [30, 22, 32, 18, 34, 22, 38, 22.5, 35, 25, 36, 29, 32, 27, 28, 29, 29, 25, 26, 22.5], c: 'yellow', g: 'star', z: 0.6, flat: true, face: true },
  { t: 'p', pts: [36, 46, 44, 44, 40, 52], c: 'yellow', g: 'fin', z: 0.6 },
  { t: 'p', pts: [17, 38, 30, 40, 24, 48, 14, 46], c: 'mouth', g: 'jaw', z: 1, flat: true, face: true },
  { t: 'p', pts: [17, 38, 19, 41, 21, 39, 23, 42, 25, 39.5, 27, 42, 29, 40], c: 'tooth', g: 'teethU', z: 1.1, flat: true, face: true },
  { t: 'p', pts: [15, 46, 17, 43, 19, 46, 21, 43, 23, 47], c: 'tooth', g: 'teethL', z: 1.1, flat: true, face: true },
  { t: 'eye', x: 24, y: 34, s: 2.4, style: 'angry', iris: '#e8c020', look: [-1, 0] },
] });

// @SHARPEDO
defMon('SHARPEDO', { pal: { top: '#2a3c88', belly: '#f0e8c8', yellow: '#f6d030', red: '#d83c3c', tooth: '#f8f8f0', mouth: '#4a1c24' }, parts: [
  { t: 'p', pts: [50, 34, 62, 18, 60, 32, 63, 46, 52, 40], c: 'top', g: 'tail', z: -1 },
  { t: 'p', pts: [40, 46, 50, 52, 54, 58, 42, 52], c: 'top', g: 'finB', z: -0.8 },
  { t: 'p', pts: [26, 22, 38, 4, 42, 8, 44, 24], c: 'top', g: 'dorsal', z: -0.5 },
  { t: 'e', x: 32, y: 34, rx: 22, ry: 14, rot: -8, c: 'top', g: 'body' },
  { t: 'spot', x: 26, y: 44, rx: 18, ry: 7, c: 'belly', on: 'body' },
  { t: 'p', pts: [7, 30, 24, 33, 36, 34, 24, 40, 12, 40], c: 'mouth', g: 'jaw', z: 1, flat: true, face: true },
  { t: 'p', pts: [7, 30, 9, 33.5, 11, 30.5, 13, 34, 15, 31, 17, 34.5, 19, 31.5, 21, 35, 23, 32, 25, 35.5, 27, 33], c: 'tooth', g: 'teethU', z: 1.1, flat: true, face: true },
  { t: 'p', pts: [11, 40, 13, 36.5, 15, 39.5, 17, 36.5, 19, 40, 21, 37, 23, 40, 25, 37.5, 27, 39], c: 'tooth', g: 'teethL', z: 1.1, flat: true, face: true },
  { t: 'p', pts: [10, 24, 13, 21, 14, 24, 17, 24.5, 14.5, 26.5, 15.5, 29.5, 13, 28, 10.5, 29.5, 11.5, 26.5, 8.5, 24.5], c: 'yellow', g: 'star', z: 1.2, flat: true, face: true },
  { t: 'p', pts: [30, 42, 40, 44, 38, 56, 30, 50], c: 'top', g: 'finF', z: 1.5 },
  { t: 'stripe', pts: [42, 38, 46, 30], w: 1, c: '#1a2860', on: 'body' },
  { t: 'stripe', pts: [46, 40, 50, 32], w: 1, c: '#1a2860', on: 'body' },
  { t: 'eye', x: 22, y: 26, s: 2.4, style: 'angry', iris: '#e8c020', look: [-1, 0] },
] });

// @WAILMER
defMon('WAILMER', { pal: { body: '#3c78c8', belly: '#f0e4b8', spray: '#a8d8f8', blk: '#22304a' }, parts: [
  { t: 'p', pts: [48, 38, 56, 30, 60, 34, 56, 44, 52, 46], c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 32, y: 40, rx: 19, ry: 17, c: 'body', g: 'body' },
  { t: 'spot', x: 26, y: 52, rx: 20, ry: 8, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [12, 47, 22, 49, 34, 49], w: 0.8, c: '#a89878', on: 'body', face: true },
  { t: 'p', pts: [38, 46, 48, 48, 46, 56, 38, 52], c: 'body', g: 'finF', z: 1 },
  { t: 'e', x: 36, y: 24, rx: 2.2, ry: 1.2, c: 'blk', g: 'hole', z: 0.5, flat: true },
  { t: 'l', pts: [36, 22, 34, 14, 30, 10], w: 1.6, w2: 1, c: 'spray', z: 0.4 },
  { t: 'l', pts: [36, 22, 39, 14, 43, 10], w: 1.6, w2: 1, c: 'spray', z: 0.4 },
  { t: 'eye', x: 22, y: 36, s: 2.2, iris: '#d83030', look: [-1, 0] },
  { t: 'eye', x: 30, y: 36, s: 2, iris: '#d83030', look: [-1, 0] },
] });

// @WAILORD
defMon('WAILORD', { pal: { body: '#3c6cc0', belly: '#f0e4b8', blk: '#22304a', line: '#a89878' }, parts: [
  { t: 'p', pts: [52, 36, 59, 24, 63, 24, 61, 37, 63, 50, 59, 50, 52, 41], c: 'body', g: 'tail', z: -1 },
  { t: 'c', x1: 16, y1: 36, x2: 50, y2: 37, r1: 17, r2: 10, c: 'body', g: 'body' },
  { t: 'e', x: 15, y: 38, rx: 14, ry: 17, c: 'body', g: 'body' },
  { t: 'spot', x: 18, y: 54, rx: 34, ry: 11, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [2, 44, 12, 46, 24, 46], w: 0.8, c: 'line', on: 'body', face: true },
  { t: 'stripe', pts: [6, 49, 20, 50, 36, 48], w: 0.6, c: 'line', on: 'body' },
  { t: 'stripe', pts: [10, 52.5, 24, 53.5, 40, 51], w: 0.6, c: 'line', on: 'body' },
  { t: 'p', pts: [26, 46, 38, 48, 38, 57, 28, 54], c: 'body', g: 'finF', z: 1 },
  { t: 'e', x: 24, y: 20, rx: 2.4, ry: 1.2, c: 'blk', g: 'hole', z: 0.5, flat: true },
  { t: 'eye', x: 9, y: 37, s: 1.6, iris: '#2a2430', look: [-1, 0] },
] });
