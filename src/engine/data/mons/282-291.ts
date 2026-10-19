// POKéMON drawings, Gen 3 #282-291. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @GARDEVOIR
defMon('GARDEVOIR', { pal: { body: '#f8f8f4', hair: '#68c858', lining: '#58b048', horn: '#e85068', blk: '#2a2430' }, parts: [
  { t: 'p', pts: [32, 30, 44, 42, 50, 58, 40, 56, 32, 58, 22, 56, 14, 58, 20, 42], c: 'lining', g: 'lining', z: -1 },
  { t: 'p', pts: [32, 29, 24, 38, 18, 50, 12, 58, 22, 55, 30, 58, 34, 50, 36, 38], c: 'body', g: 'gown', z: 0.2 },
  { t: 'p', pts: [32, 29, 38, 36, 42, 46, 46, 56, 40, 54, 36, 46], c: 'body', g: 'gownR', z: -0.5 },
  { t: 'c', x1: 32, y1: 21, x2: 32, y2: 32, r1: 2.6, r2: 3.6, c: 'body', g: 'torso', z: 0.4 },
  { t: 'p', pts: [30, 24, 20, 25, 30, 28], c: 'horn', g: 'hornF', z: 1 },
  { t: 'p', pts: [34, 24, 44, 25, 34, 28], c: 'horn', g: 'hornB', z: -0.2 },
  { t: 'c', x1: 34, y1: 23, x2: 40, y2: 31, r1: 1.2, r2: 1, c: 'hair', g: 'armR', z: -0.6 },
  { t: 'c', x1: 40, y1: 31, x2: 38, y2: 38, r1: 1, r2: 0.9, c: 'hair', g: 'armR', z: -0.6 },
  { t: 'c', x1: 30, y1: 23, x2: 24, y2: 31, r1: 1.2, r2: 1, c: 'hair', g: 'armL', z: 1.2 },
  { t: 'c', x1: 24, y1: 31, x2: 27, y2: 37, r1: 1, r2: 0.9, c: 'hair', g: 'armL', z: 1.2 },
  { t: 'e', x: 31, y: 14.5, rx: 5.5, ry: 6, c: 'body', g: 'face', z: 1.4 },
  { t: 'e', x: 32, y: 8.5, rx: 6.5, ry: 3.6, c: 'hair', g: 'hair', z: 1.6 },
  { t: 'p', pts: [26, 9, 23, 14, 23, 21, 26, 19, 27, 14], c: 'hair', g: 'hairL', z: 1.6 },
  { t: 'p', pts: [37, 8, 40, 13, 41, 21, 38, 19, 36, 13], c: 'hair', g: 'hairR', z: 1.3 },
  { t: 'e', x: 28, y: 14.5, rx: 1.3, ry: 1.7, c: '#d03040', g: 'eyeL', z: 1.7, face: true, gloss: true },
  { t: 'e', x: 33.5, y: 14.5, rx: 1.3, ry: 1.7, c: '#d03040', g: 'eyeR', z: 1.7, face: true, gloss: true },
  { t: 'mouth', x: 30.5, y: 18.5, w: 1, style: 'smile' },
] });

// @SURSKIT
defMon('SURSKIT', { pal: { body: '#70a8e8', knob: '#f8d048', leg: '#4a3a40', tip: '#f8d048', belly: '#f0e8a0' }, parts: [
  { t: 'l', pts: [36, 46, 44, 44, 50, 52], w: 1, w2: 0.8, c: 'leg', g: 'legR2', z: -1 },
  { t: 'l', pts: [34, 46, 40, 50, 42, 57], w: 1, w2: 0.8, c: 'leg', g: 'legR1', z: -0.8 },
  { t: 'e', x: 50, y: 52.5, rx: 1.6, ry: 1, c: 'tip', g: 'legR2', z: -1 },
  { t: 'e', x: 42, y: 57, rx: 1.6, ry: 1, c: 'tip', g: 'legR1', z: -0.8 },
  { t: 'e', x: 33, y: 44, rx: 6.5, ry: 6, c: 'body', g: 'body' },
  { t: 'p', pts: [33, 39, 38, 35, 35, 42], c: 'body', g: 'body' },
  { t: 'e', x: 39, y: 34, rx: 2.4, ry: 2.4, c: 'knob', g: 'knob', z: 0.5 },
  { t: 'l', pts: [30, 47, 22, 46, 15, 53], w: 1, w2: 0.8, c: 'leg', g: 'legL2', z: 1 },
  { t: 'l', pts: [31, 48, 26, 52, 24, 57], w: 1, w2: 0.8, c: 'leg', g: 'legL1', z: 1.1 },
  { t: 'e', x: 15, y: 53.5, rx: 1.6, ry: 1, c: 'tip', g: 'legL2', z: 1 },
  { t: 'e', x: 24, y: 57, rx: 1.6, ry: 1, c: 'tip', g: 'legL1', z: 1.1 },
  { t: 'eye', x: 28.5, y: 42, s: 2, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 33.5, y: 42, s: 2, iris: '#2a2430', sclera: false },
  { t: 'mouth', x: 30, y: 46.5, w: 1.2, style: 'smile' },
] });

// @MASQUERAIN
defMon('MASQUERAIN', { pal: { body: '#f0ece0', wing: '#e8f0f8', wingEdge: '#b8c8d8', ant: '#5890d8', eyespot: '#2a2430', mark: '#e8d048', red: '#d84040' }, parts: [
  { t: 'e', x: 45, y: 22, rx: 12, ry: 7, rot: -25, c: 'wing', g: 'wingRT', z: -2, soft: true },
  { t: 'e', x: 44, y: 41, rx: 11, ry: 6, rot: 25, c: 'wing', g: 'wingRB', z: -2, soft: true },
  { t: 'e', x: 19, y: 22, rx: 12, ry: 7, rot: 25, c: 'wing', g: 'wingLT', z: -1.5, soft: true },
  { t: 'e', x: 20, y: 41, rx: 11, ry: 6, rot: -25, c: 'wing', g: 'wingLB', z: -1.5, soft: true },
  { t: 'e', x: 32, y: 36, rx: 4.5, ry: 6, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 27, rx: 5, ry: 4.5, c: 'body', g: 'head', z: 0.5 },
  { t: 'e', x: 21, y: 22, rx: 8, ry: 5.5, rot: 20, c: 'ant', g: 'antL', z: 1 },
  { t: 'e', x: 43, y: 22, rx: 8, ry: 5.5, rot: -20, c: 'ant', g: 'antR', z: 1 },
  { t: 'spot', x: 20, y: 22, rx: 4.5, ry: 2.6, c: 'eyespot', on: 'antL' },
  { t: 'spot', x: 44, y: 22, rx: 4.5, ry: 2.6, c: 'eyespot', on: 'antR' },
  { t: 'spot', x: 18, y: 21, rx: 1.6, ry: 1.2, c: 'red', on: 'antL' },
  { t: 'spot', x: 46, y: 21, rx: 1.6, ry: 1.2, c: 'red', on: 'antR' },
  { t: 'c', x1: 32, y1: 41, x2: 32, y2: 50, r1: 2.4, r2: 1, c: 'body', g: 'tail', z: -0.5 },
  { t: 'eye', x: 30, y: 28, s: 1.4, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 34, y: 28, s: 1.4, iris: '#2a2430', sclera: false },
  { t: 'mouth', x: 32, y: 30.5, w: 0.8, style: 'line' },
] });

// @SHROOMISH
defMon('SHROOMISH', { pal: { body: '#f4ecc8', cap: '#68b058', bump: '#4a8a40', foot: '#c8b080', blk: '#2a2430' }, parts: [
  { t: 'e', x: 27, y: 56.5, rx: 3, ry: 1.8, c: 'foot', g: 'footL', z: 0.5 },
  { t: 'e', x: 37, y: 56.5, rx: 3, ry: 1.8, c: 'foot', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 49, rx: 9, ry: 7.5, c: 'body', g: 'body' },
  { t: 'e', x: 32, y: 40, rx: 11, ry: 6.5, c: 'cap', g: 'cap', z: 1 },
  { t: 'spot', x: 26, y: 37, rx: 2.2, ry: 1.6, c: 'bump', on: 'cap' },
  { t: 'spot', x: 35, y: 36, rx: 2.4, ry: 1.6, c: 'bump', on: 'cap' },
  { t: 'spot', x: 30, y: 42, rx: 1.8, ry: 1.3, c: 'bump', on: 'cap' },
  { t: 'spot', x: 40, y: 41, rx: 1.8, ry: 1.3, c: 'bump', on: 'cap' },
  { t: 'eye', x: 28, y: 49, s: 2, iris: '#2a2430', sclera: false },
  { t: 'eye', x: 34, y: 49, s: 2, iris: '#2a2430', sclera: false },
  { t: 'mouth', x: 31, y: 52.5, w: 1.4, style: 'smile' },
] });

// @BRELOOM
defMon('BRELOOM', { pal: { body: '#68b058', cap: '#78c060', spot: '#d84838', skin: '#f0e0a8', claw: '#d84838', seed: '#78c060' }, parts: [
  { t: 'c', x1: 38, y1: 44, x2: 52, y2: 46, r1: 2.4, r2: 1.6, c: 'body', g: 'tail', z: -2 },
  { t: 'e', x: 55, y: 45, rx: 4, ry: 4, c: 'seed', g: 'seed', z: -2 },
  { t: 'spot', x: 56, y: 44, rx: 1.4, ry: 1.2, c: 'spot', on: 'seed' },
  { t: 'c', x1: 37, y1: 46, x2: 40, y2: 55, r1: 3, r2: 2.4, c: 'body', g: 'legR', z: -0.5 },
  { t: 'e', x: 41, y: 57, rx: 4, ry: 1.8, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 37, y1: 30, x2: 45, y2: 36, r1: 1.6, r2: 1.4, c: 'body', g: 'armR', z: -1 },
  { t: 'c', x1: 45, y1: 36, x2: 47, y2: 44, r1: 1.4, r2: 1.6, c: 'body', g: 'armR', z: -1 },
  { t: 'p', pts: [46, 44, 48, 47, 50, 44], c: 'claw', g: 'clawR', z: -1 },
  { t: 'e', x: 32, y: 40, rx: 7, ry: 9, c: 'skin', g: 'body' },
  { t: 'e', x: 33, y: 46, rx: 8, ry: 5, c: 'body', g: 'body' },
  { t: 'c', x1: 27, y1: 46, x2: 25, y2: 55, r1: 3, r2: 2.4, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 23, y: 57, rx: 4, ry: 1.8, c: 'body', g: 'legL', z: 0.5 },
  { t: 'c', x1: 28, y1: 30, x2: 18, y2: 33, r1: 1.6, r2: 1.4, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 18, y1: 33, x2: 12, y2: 27, r1: 1.4, r2: 1.8, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [10, 25, 12, 21, 14, 25], c: 'claw', g: 'clawL', z: 1 },
  { t: 'e', x: 30, y: 23, rx: 7, ry: 6, c: 'skin', g: 'head', z: 1.2 },
  { t: 'e', x: 32, y: 14, rx: 10, ry: 6, c: 'cap', g: 'cap', z: 1.4 },
  { t: 'spot', x: 27, y: 12, rx: 1.8, ry: 1.4, c: 'spot', on: 'cap' },
  { t: 'spot', x: 35, y: 11, rx: 1.8, ry: 1.4, c: 'spot', on: 'cap' },
  { t: 'spot', x: 40, y: 16, rx: 1.6, ry: 1.2, c: 'spot', on: 'cap' },
  { t: 'e', x: 24, y: 25.5, rx: 2.6, ry: 1.8, c: 'skin', g: 'head', z: 1.2, face: true },
  { t: 'eye', x: 27, y: 21, s: 2.2, style: 'angry', iris: '#2a2430', sclera: false },
  { t: 'eye', x: 32, y: 21, s: 2.2, style: 'angry', iris: '#2a2430', sclera: false, flip: true },
  { t: 'mouth', x: 24, y: 26.5, w: 1.6, style: 'line' },
] });

// @SLAKOTH
defMon('SLAKOTH', { pal: { body: '#9a6a48', face: '#e8c8a0', dark: '#5a3a28', nose: '#d07070' }, parts: [
  { t: 'c', x1: 42, y1: 52, x2: 48, y2: 56, r1: 2.6, r2: 2.2, c: 'body', g: 'legR', z: -1 },
  { t: 'e', x: 34, y: 50, rx: 13, ry: 7, c: 'body', g: 'body' },
  { t: 'c', x1: 24, y1: 52, x2: 18, y2: 57, r1: 2.6, r2: 2.2, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [15, 57, 16, 59, 18, 57, 19, 59, 20, 57], c: 'face', g: 'clawL', z: 1.1 },
  { t: 'e', x: 22, y: 44, rx: 8, ry: 7, c: 'body', g: 'head', z: 1.2 },
  { t: 'e', x: 21, y: 46, rx: 6, ry: 4.5, c: 'face', g: 'face', z: 1.3, face: true },
  { t: 'e', x: 17, y: 44, rx: 2.4, ry: 1.6, c: 'dark', g: 'ringL', z: 1.35, face: true },
  { t: 'e', x: 24, y: 44, rx: 2.4, ry: 1.6, c: 'dark', g: 'ringR', z: 1.35, face: true },
  { t: 'eye', x: 17, y: 44.5, s: 1.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 24, y: 44.5, s: 1.6, style: 'sleepy', iris: '#2a2430' },
  { t: 'e', x: 20.5, y: 47.5, rx: 1.4, ry: 1, c: 'nose', g: 'nose', z: 1.5, face: true },
  { t: 'mouth', x: 20.5, y: 49.5, w: 1.2, style: 'smile' },
] });

// @VIGOROTH
defMon('VIGOROTH', { pal: { body: '#f4f0e8', face: '#e8c8a0', red: '#d84848', claw: '#c8c0b0', blk: '#2a2430' }, parts: [
  { t: 'c', x1: 37, y1: 44, x2: 41, y2: 55, r1: 3, r2: 2.6, c: 'body', g: 'legR', z: -0.5 },
  { t: 'e', x: 42, y: 57, rx: 3.6, ry: 1.8, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 38, y1: 30, x2: 48, y2: 22, r1: 2.6, r2: 2.4, c: 'body', g: 'armR', z: -1 },
  { t: 'p', pts: [47, 20, 50, 13, 51, 20, 54, 15, 52, 22], c: 'claw', g: 'clawR', z: -1 },
  { t: 'e', x: 32, y: 38, rx: 9, ry: 10, c: 'body', g: 'body' },
  { t: 'stripe', pts: [26, 36, 32, 40, 38, 36], w: 2.4, c: 'red', on: 'body' },
  { t: 'c', x1: 27, y1: 44, x2: 23, y2: 55, r1: 3, r2: 2.6, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 22, y: 57, rx: 3.6, ry: 1.8, c: 'body', g: 'legL', z: 0.5 },
  { t: 'c', x1: 26, y1: 30, x2: 15, y2: 24, r1: 2.6, r2: 2.4, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [14, 22, 9, 15, 12, 21, 7, 18, 12, 25], c: 'claw', g: 'clawL', z: 1 },
  { t: 'e', x: 31, y: 23, rx: 7.5, ry: 7, c: 'body', g: 'head', z: 1.2 },
  { t: 'e', x: 29, y: 25, rx: 5, ry: 4, c: 'face', g: 'face', z: 1.3, face: true },
  { t: 'p', pts: [26, 18, 28, 8, 32, 14, 35, 6, 37, 15, 40, 12, 38, 19], c: 'red', g: 'hair', z: 1.4 },
  { t: 'eye', x: 26.5, y: 22.5, s: 2, style: 'angry', iris: '#2a2430', sclera: false },
  { t: 'eye', x: 31.5, y: 22.5, s: 2, style: 'angry', iris: '#2a2430', sclera: false, flip: true },
  { t: 'mouth', x: 28, y: 27.5, w: 1.8, style: 'open' },
] });

// @SLAKING
defMon('SLAKING', { pal: { body: '#8a6040', belly: '#e8d0a8', face: '#f0e4d0', dark: '#4a3024', nose: '#2a2430' }, parts: [
  { t: 'c', x1: 48, y1: 52, x2: 58, y2: 55, r1: 4.5, r2: 4, c: 'body', g: 'legR', z: -1 },
  { t: 'e', x: 36, y: 46, rx: 18, ry: 11, c: 'body', g: 'body' },
  { t: 'spot', x: 36, y: 49, rx: 12, ry: 7, c: 'belly', on: 'body' },
  { t: 'c', x1: 40, y1: 52, x2: 50, y2: 57, r1: 4.5, r2: 4, c: 'body', g: 'legL', z: 0.5 },
  { t: 'c', x1: 24, y1: 40, x2: 14, y2: 55, r1: 4.5, r2: 4, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 13, y: 56.5, rx: 5, ry: 2.4, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 21, y: 28, rx: 10, ry: 9, c: 'body', g: 'head', z: 1.2 },
  { t: 'e', x: 19, y: 31, rx: 7.5, ry: 6, c: 'face', g: 'face', z: 1.3, face: true },
  { t: 'p', pts: [17, 20, 19, 16, 22, 14, 25, 17, 26, 20], c: 'belly', g: 'tuft', z: 1.4 },
  { t: 'eye', x: 15, y: 29, s: 2, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 22, y: 29, s: 2, style: 'sleepy', iris: '#2a2430' },
  { t: 'e', x: 18.5, y: 32.5, rx: 2, ry: 1.3, c: 'nose', g: 'nose', z: 1.5, face: true },
  { t: 'mouth', x: 18.5, y: 35.5, w: 2, style: 'smile' },
] });

// @NINCADA
defMon('NINCADA', { pal: { body: '#e4e0d4', shell: '#a8a090', wing: '#f8f8f4', leg: '#807868', eye: '#2a2430' }, parts: [
  { t: 'l', pts: [40, 51, 45, 54, 47, 57], w: 1.1, w2: 0.8, c: 'leg', g: 'legR', z: -1 },
  { t: 'l', pts: [33, 52, 35, 57], w: 1.1, w2: 0.8, c: 'leg', g: 'legM', z: -0.8 },
  { t: 'e', x: 38, y: 49, rx: 10, ry: 5.5, c: 'body', g: 'body' },
  { t: 'stripe', pts: [34, 43, 34, 55], w: 0.9, c: 'shell', on: 'body' },
  { t: 'stripe', pts: [39, 43, 39, 55], w: 0.9, c: 'shell', on: 'body' },
  { t: 'stripe', pts: [44, 43, 44, 55], w: 0.9, c: 'shell', on: 'body' },
  { t: 'e', x: 41, y: 44.5, rx: 5, ry: 2.2, rot: -10, c: 'wing', g: 'wing', z: 0.5, flat: true },
  { t: 'e', x: 24, y: 47, rx: 7, ry: 6, c: 'body', g: 'head', z: 1 },
  { t: 'spot', x: 26, y: 42, rx: 6, ry: 3, c: 'shell', on: 'head' },
  { t: 'e', x: 20, y: 47, rx: 3, ry: 2.6, c: 'eye', g: 'eye', z: 1.2, face: true, gloss: true },
  { t: 'l', pts: [24, 41, 21, 34, 14, 30], w: 0.8, w2: 0.6, c: 'leg', g: 'antL', z: 0.8 },
  { t: 'l', pts: [27, 41, 29, 34, 27, 28], w: 0.8, w2: 0.6, c: 'leg', g: 'antR', z: 0.6 },
  { t: 'c', x1: 22, y1: 52, x2: 15, y2: 55, r1: 1.6, r2: 1.2, c: 'body', g: 'clawL', z: 1.1 },
  { t: 'p', pts: [16, 53, 11, 57, 15, 57], c: 'shell', g: 'clawL', z: 1.1 },
  { t: 'l', pts: [29, 53, 28, 57], w: 1.1, w2: 0.8, c: 'leg', g: 'legL', z: 1.1 },
] });

// @NINJASK
defMon('NINJASK', { pal: { body: '#2a2a30', yel: '#f0d040', wing: '#e8eef4', red: '#d83838', grey: '#909098' }, parts: [
  { t: 'e', x: 44, y: 20, rx: 14, ry: 4, rot: -25, c: 'wing', g: 'wingRT', z: -2, soft: true },
  { t: 'e', x: 46, y: 32, rx: 12, ry: 3.4, rot: 10, c: 'wing', g: 'wingRB', z: -2, soft: true },
  { t: 'c', x1: 34, y1: 34, x2: 46, y2: 46, r1: 5, r2: 2.4, c: 'body', g: 'abdo', z: -0.5 },
  { t: 'stripe', pts: [36, 41, 41, 37], w: 1.4, c: 'yel', on: 'abdo' },
  { t: 'stripe', pts: [40, 45, 44, 41], w: 1.2, c: 'yel', on: 'abdo' },
  { t: 'e', x: 29, y: 31, rx: 6, ry: 5, c: 'body', g: 'thorax' },
  { t: 'e', x: 20, y: 26, rx: 6, ry: 5, c: 'body', g: 'head', z: 1 },
  { t: 'spot', x: 18, y: 28, rx: 5, ry: 2.6, c: 'yel', on: 'head' },
  { t: 'e', x: 17, y: 24, rx: 2.2, ry: 2, c: 'red', g: 'eyeL', z: 1.2, face: true, gloss: true },
  { t: 'e', x: 23, y: 23.5, rx: 2, ry: 1.9, c: 'red', g: 'eyeR', z: 1.1, face: true, gloss: true },
  { t: 'p', pts: [22, 21, 26, 12, 25, 21], c: 'body', g: 'hornR', z: 0.9 },
  { t: 'p', pts: [17, 21, 14, 13, 19, 20], c: 'body', g: 'hornL', z: 0.9 },
  { t: 'e', x: 22, y: 20, rx: 14, ry: 4, rot: 25, c: 'wing', g: 'wingLT', z: 2, soft: true },
  { t: 'l', pts: [26, 35, 22, 40, 20, 44], w: 0.8, w2: 0.6, c: 'grey', g: 'legL', z: 1.2 },
  { t: 'l', pts: [30, 36, 30, 42, 28, 46], w: 0.8, w2: 0.6, c: 'grey', g: 'legM', z: 1.2 },
] });
