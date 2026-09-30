// POKéMON drawings, Gen 2 #212-241 (Scizor to Miltank). Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @SCIZOR
defMon('SCIZOR', { pal: { body: '#d83a3a', dark: '#3a3040', wing: '#e6eef4', claw: '#d83a3a', eyeC: '#f0d040' }, parts: [
  { t: 'p', pts: [38, 28, 56, 20, 56, 30, 42, 34], c: 'wing', g: 'wing', z: -1, flat: true },
  { t: 'c', x1: 34, y1: 46, x2: 38, y2: 57, r1: 2, r2: 1.8, c: 'dark', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 46, x2: 26, y2: 57, r1: 2, r2: 1.8, c: 'dark', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 38, rx: 7, ry: 10, c: 'body', g: 'body' },
  { t: 'stripe', pts: [26, 44, 38, 44], w: 1.4, c: 'dark', on: 'body' },
  { t: 'c', x1: 38, y1: 32, x2: 46, y2: 40, r1: 1.8, r2: 1.6, c: 'dark', g: 'armR', z: -0.4 },
  { t: 'e', x: 49, y: 42, rx: 5, ry: 5, c: 'claw', g: 'clawR', z: -0.3, gloss: true },
  { t: 'spot', x: 49, y: 42, rx: 1.4, ry: 1.4, c: 'eyeC', on: 'clawR' },
  { t: 'c', x1: 26, y1: 32, x2: 18, y2: 38, r1: 1.8, r2: 1.6, c: 'dark', g: 'armL', z: 1 },
  { t: 'e', x: 14, y: 39, rx: 6, ry: 6, c: 'claw', g: 'clawL', z: 1.2, gloss: true },
  { t: 'spot', x: 12, y: 38, rx: 1.6, ry: 1.6, c: 'eyeC', on: 'clawL' },
  { t: 'stripe', pts: [8, 39, 16, 39], w: 1, c: 'dark', on: 'clawL' },
  { t: 'p', pts: [28, 16, 30, 8, 33, 16], c: 'body', g: 'horn', z: 1.4 },
  { t: 'e', x: 30, y: 21, rx: 6, ry: 5.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 26.5, y: 21, s: 2.4, style: 'angry', iris: '#e8c030', look: [-1, 0] },
  { t: 'eye', x: 32, y: 21, s: 2.4, style: 'angry', iris: '#e8c030', look: [-1, 0] },
] });

// @SHUCKLE
defMon('SHUCKLE', { pal: { shell: '#d84838', spot: '#f4e8a0', body: '#f0d040' }, parts: [
  { t: 'p', pts: [38, 20, 56, 26, 58, 50, 40, 54, 34, 36], c: 'shell', g: 'shell', z: -1 },
  { t: 'spot', x: 46, y: 28, rx: 2.4, ry: 2.4, c: 'spot', on: 'shell' },
  { t: 'spot', x: 52, y: 38, rx: 2.4, ry: 2.4, c: 'spot', on: 'shell' },
  { t: 'spot', x: 44, y: 44, rx: 2.4, ry: 2.4, c: 'spot', on: 'shell' },
  { t: 'spot', x: 50, y: 50, rx: 2.2, ry: 2.2, c: 'spot', on: 'shell' },
  { t: 'e', x: 36, y: 54, rx: 3, ry: 2.4, c: 'body', g: 'foot1', z: 0.5 },
  { t: 'e', x: 30, y: 55, rx: 3, ry: 2.4, c: 'body', g: 'foot2', z: 0.5 },
  { t: 'c', x1: 34, y1: 48, x2: 22, y2: 34, r1: 6, r2: 5, c: 'body', g: 'body' },
  { t: 'eye', x: 19, y: 33, s: 2.4, iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 25, y: 32, s: 2.4, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 20, y: 37, w: 1.2, style: 'smile' },
] });

// @HERACROSS
defMon('HERACROSS', { pal: { body: '#3a68c0', dark: '#284a90', eyeC: '#f0c040' }, parts: [
  { t: 'c', x1: 36, y1: 48, x2: 38, y2: 57, r1: 3, r2: 2.6, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 28, y1: 48, x2: 26, y2: 57, r1: 3, r2: 2.6, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 40, rx: 10, ry: 12, c: 'body', g: 'body', gloss: true },
  { t: 'stripe', pts: [32, 30, 32, 52], w: 1, c: 'dark', on: 'body' },
  { t: 'c', x1: 23, y1: 36, x2: 16, y2: 44, r1: 2.4, r2: 2.2, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 41, y1: 36, x2: 48, y2: 44, r1: 2.4, r2: 2.2, c: 'body', g: 'armR', z: 1 },
  { t: 'p', pts: [28, 24, 30, 6, 26, 4, 34, 2, 36, 6, 34, 24], c: 'body', g: 'horn', z: 1.4 },
  { t: 'e', x: 32, y: 26, rx: 7, ry: 6, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 26, s: 2.4, iris: '#e8b030', sclera: false },
  { t: 'eye', x: 36, y: 26, s: 2.4, iris: '#e8b030', sclera: false },
] });

// @SNEASEL
defMon('SNEASEL', { pal: { body: '#2e3a4a', feather: '#d83a48', claw: '#f4f0e6', gem: '#f0c040' }, parts: [
  { t: 'p', pts: [42, 44, 52, 36, 54, 42, 44, 48], c: 'feather', g: 'tail', z: -1 },
  { t: 'c', x1: 34, y1: 46, x2: 38, y2: 57, r1: 2.4, r2: 2, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 46, x2: 26, y2: 57, r1: 2.4, r2: 2, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 40, rx: 7, ry: 9, c: 'body', g: 'body' },
  { t: 'e', x: 30, y: 34, rx: 1.6, ry: 1.4, c: 'gem', g: 'gem', z: 0.5, gloss: true, face: true },
  { t: 'c', x1: 26, y1: 36, x2: 18, y2: 42, r1: 1.8, r2: 1.6, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [18, 40, 10, 38, 17, 44, 10, 46, 19, 46], c: 'claw', g: 'claw', z: 1.2 },
  { t: 'p', pts: [30, 16, 36, 2, 40, 6, 34, 18], c: 'feather', g: 'feather', z: 1.4 },
  { t: 'p', pts: [22, 16, 20, 10, 26, 14], c: 'body', g: 'earL', z: 1.3 },
  { t: 'e', x: 28, y: 22, rx: 8, ry: 7, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 23.5, y: 22, s: 2.6, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 30.5, y: 22, s: 2.6, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'mouth', x: 23, y: 27, w: 1.6, style: 'fang' },
] });

// @TEDDIURSA
defMon('TEDDIURSA', { pal: { fur: '#b07840', moon: '#f4dca0', snout: '#f4dca0' }, parts: [
  { t: 'e', x: 27, y: 57, rx: 3.6, ry: 2.4, c: 'fur', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.6, ry: 2.4, c: 'fur', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 48, rx: 9, ry: 9, c: 'fur', g: 'body' },
  { t: 'p', pts: [28, 40, 32, 38, 36, 40, 34, 44, 32, 42, 30, 44], c: 'moon', g: 'moon', z: 0.5, face: true },
  { t: 'c', x1: 25, y1: 44, x2: 22, y2: 38, r1: 2.2, r2: 2, c: 'fur', g: 'armL', z: 1 },
  { t: 'e', x: 21, y: 36, rx: 2.4, ry: 2.4, c: 'moon', g: 'paw', z: 1.1 },
  { t: 'e', x: 21, y: 21, rx: 4, ry: 4, c: 'fur', g: 'earL', z: 1 },
  { t: 'e', x: 43, y: 21, rx: 4, ry: 4, c: 'fur', g: 'earR', z: 1 },
  { t: 'e', x: 32, y: 30, rx: 11, ry: 9.5, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 32, y: 34, rx: 4, ry: 3, c: 'snout', on: 'head', face: true },
  { t: 'eye', x: 27, y: 29, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 37, y: 29, s: 2.4, iris: '#2a2430' },
  { t: 'e', x: 32, y: 33, rx: 1.4, ry: 1, c: '#2a2430', g: 'nose', z: 1.6, face: true },
] });

// @URSARING
defMon('URSARING', { pal: { fur: '#9a6434', ring: '#f0c060', snout: '#e8c890' }, parts: [
  { t: 'c', x1: 25, y1: 50, x2: 24, y2: 57, r1: 4.5, r2: 4, c: 'fur', g: 'legL', z: -0.5 },
  { t: 'c', x1: 39, y1: 50, x2: 40, y2: 57, r1: 4.5, r2: 4, c: 'fur', g: 'legR', z: -0.5 },
  { t: 'e', x: 32, y: 40, rx: 15, ry: 14, c: 'fur', g: 'body' },
  { t: 'spot', x: 32, y: 44, rx: 5.5, ry: 5.5, c: 'ring', on: 'body', face: true },
  { t: 'spot', x: 32, y: 44, rx: 3.5, ry: 3.5, c: 'fur', on: 'body', face: true },
  { t: 'c', x1: 19, y1: 36, x2: 10, y2: 44, r1: 4, r2: 3.6, c: 'fur', g: 'armL', z: 1 },
  { t: 'c', x1: 45, y1: 36, x2: 54, y2: 44, r1: 4, r2: 3.6, c: 'fur', g: 'armR', z: 1 },
  { t: 'e', x: 24, y: 13, rx: 3.4, ry: 3.4, c: 'fur', g: 'earL', z: 1 },
  { t: 'e', x: 40, y: 13, rx: 3.4, ry: 3.4, c: 'fur', g: 'earR', z: 1 },
  { t: 'e', x: 32, y: 21, rx: 9, ry: 8, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 32, y: 25, rx: 4.5, ry: 3.4, c: 'snout', on: 'head', face: true },
  { t: 'eye', x: 27.5, y: 19, s: 2.4, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 36.5, y: 19, s: 2.4, style: 'angry', iris: '#2a2430', flip: true },
  { t: 'e', x: 32, y: 24, rx: 1.6, ry: 1.2, c: '#2a2430', g: 'nose', z: 1.6, face: true },
  { t: 'mouth', x: 32, y: 27.5, w: 2, style: 'fang' },
] });

// @SLUGMA
defMon('SLUGMA', { pal: { lava: '#e84828', glow: '#f8b030', drip: '#c83018' }, parts: [
  { t: 'p', pts: [20, 54, 24, 46, 36, 44, 50, 48, 58, 56, 44, 58, 30, 58], c: 'lava', g: 'base', z: -0.5 },
  { t: 'spot', x: 44, y: 52, rx: 3, ry: 1.6, c: 'glow', on: 'base' },
  { t: 'c', x1: 30, y1: 50, x2: 24, y2: 30, r1: 7, r2: 7.5, c: 'lava', g: 'body' },
  { t: 'spot', x: 28, y: 42, rx: 2, ry: 1.6, c: 'glow', on: 'body' },
  { t: 'spot', x: 22, y: 22, rx: 2.4, ry: 1.6, c: 'glow', on: 'body' },
  { t: 'eye', x: 19, y: 30, s: 2.6, iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 26, y: 30, s: 2.6, iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 19, y: 35, w: 1.4, style: 'smile' },
] });

// @MAGCARGO
defMon('MAGCARGO', { pal: { lava: '#e84828', glow: '#f8b030', shell: '#8a8078', shellD: '#6a6058' }, parts: [
  { t: 'p', pts: [14, 54, 20, 46, 40, 44, 54, 50, 60, 56, 40, 58, 20, 58], c: 'lava', g: 'base', z: -0.5 },
  { t: 'e', x: 38, y: 40, rx: 14, ry: 12, c: 'shell', g: 'shell' },
  { t: 'spot', x: 34, y: 34, rx: 3, ry: 2, c: 'shellD', on: 'shell' },
  { t: 'spot', x: 44, y: 44, rx: 3.4, ry: 2.2, c: 'shellD', on: 'shell' },
  { t: 'spot', x: 44, y: 32, rx: 2, ry: 1.6, c: 'glow', on: 'shell' },
  { t: 'e', x: 38, y: 28, rx: 5, ry: 3, c: 'lava', g: 'top', z: -0.5 },
  { t: 'c', x1: 24, y1: 50, x2: 18, y2: 34, r1: 6, r2: 6.5, c: 'lava', g: 'body', z: 1 },
  { t: 'eye', x: 14, y: 34, s: 2.4, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 20, y: 34, s: 2.4, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 14, y: 39, w: 1.4, style: 'line' },
] });

// @SWINUB
defMon('SWINUB', { pal: { fur: '#a07048', stripe: '#6a4428', snout: '#e8a0a8' }, parts: [
  { t: 'e', x: 26, y: 57, rx: 3, ry: 2, c: 'fur', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 3, ry: 2, c: 'fur', g: 'footR', z: -0.5 },
  { t: 'e', x: 33, y: 44, rx: 16, ry: 13, c: 'fur', g: 'body', soft: true },
  { t: 'stripe', pts: [30, 36, 30, 44], w: 1.6, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [36, 36, 36, 44], w: 1.6, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [42, 38, 42, 46], w: 1.6, c: 'stripe', on: 'body' },
  { t: 'e', x: 18, y: 48, rx: 4, ry: 3.4, c: 'snout', g: 'snout', z: 1 },
  { t: 'e', x: 16.5, y: 47.5, rx: 0.8, ry: 1, c: '#2a2430', g: 'n1', z: 1.1, face: true },
  { t: 'e', x: 19.5, y: 47.5, rx: 0.8, ry: 1, c: '#2a2430', g: 'n2', z: 1.1, face: true },
] });

// @PILOSWINE
defMon('PILOSWINE', { pal: { fur: '#8a5a3a', furL: '#a87450', snout: '#e8a0a8', tusk: '#f4f0e6' }, parts: [
  { t: 'e', x: 24, y: 57, rx: 3.4, ry: 2, c: 'fur', g: 'footL', z: -0.5 },
  { t: 'e', x: 42, y: 57, rx: 3.4, ry: 2, c: 'fur', g: 'footR', z: -0.5 },
  { t: 'e', x: 34, y: 42, rx: 18, ry: 15, c: 'fur', g: 'body', soft: true },
  { t: 'spot', x: 30, y: 34, rx: 12, ry: 6, c: 'furL', on: 'body' },
  { t: 'e', x: 18, y: 46, rx: 3.6, ry: 3, c: 'snout', g: 'snout', z: 1 },
  { t: 'l', pts: [20, 50, 16, 55, 12, 54], w: 1.6, w2: 1, c: 'tusk', g: 'tuskL', z: 1.2 },
  { t: 'l', pts: [24, 50, 24, 56, 21, 58], w: 1.6, w2: 1, c: 'tusk', g: 'tuskR', z: 0.9 },
] });

// @CORSOLA
defMon('CORSOLA', { pal: { body: '#f4a0a8', branch: '#f4a0a8', base: '#f4f0e0' }, parts: [
  { t: 'c', x1: 32, y1: 34, x2: 26, y2: 18, r1: 3, r2: 2.4, c: 'branch', g: 'br1', z: -1 },
  { t: 'c', x1: 38, y1: 34, x2: 44, y2: 16, r1: 3, r2: 2.4, c: 'branch', g: 'br2', z: -1 },
  { t: 'c', x1: 44, y1: 24, x2: 52, y2: 20, r1: 2, r2: 1.8, c: 'branch', g: 'br3', z: -1 },
  { t: 'c', x1: 28, y1: 26, x2: 20, y2: 22, r1: 2, r2: 1.8, c: 'branch', g: 'br4', z: -1 },
  { t: 'c', x1: 24, y1: 50, x2: 22, y2: 57, r1: 2.6, r2: 2.4, c: 'base', g: 'legL', z: -0.5 },
  { t: 'c', x1: 42, y1: 50, x2: 44, y2: 57, r1: 2.6, r2: 2.4, c: 'base', g: 'legR', z: -0.5 },
  { t: 'e', x: 33, y: 44, rx: 13, ry: 10, c: 'body', g: 'body' },
  { t: 'spot', x: 33, y: 52, rx: 12, ry: 4, c: 'base', on: 'body' },
  { t: 'eye', x: 27, y: 42, s: 2.8, iris: '#2a2430' },
  { t: 'eye', x: 37, y: 42, s: 2.8, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 47, w: 1.6, style: 'smile' },
] });

// @REMORAID
defMon('REMORAID', { pal: { body: '#8ab4d8', fin: '#6a94c0', belly: '#d8e8f0' }, parts: [
  { t: 'p', pts: [44, 40, 56, 30, 54, 40, 58, 50], c: 'fin', g: 'tail', z: -1 },
  { t: 'p', pts: [30, 32, 36, 24, 40, 32], c: 'fin', g: 'dorsal', z: -0.5 },
  { t: 'e', x: 30, y: 40, rx: 16, ry: 9, c: 'body', g: 'body' },
  { t: 'spot', x: 28, y: 46, rx: 12, ry: 3.4, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [30, 32, 30, 48], w: 1.2, c: 'fin', on: 'body' },
  { t: 'e', x: 13, y: 40, rx: 2.4, ry: 3, c: 'body', g: 'mouth', z: 1 },
  { t: 'e', x: 12, y: 40, rx: 1, ry: 1.6, c: '#2a2430', g: 'mouthIn', z: 1.1, face: true },
  { t: 'eye', x: 20, y: 37, s: 3, iris: '#2a2430', look: [-1, 0] },
  { t: 'p', pts: [30, 48, 36, 54, 38, 48], c: 'fin', g: 'finB', z: 0.8 },
] });

// @OCTILLERY
defMon('OCTILLERY', { pal: { body: '#e04838', spot: '#f09080', suck: '#f4d0c0' }, parts: [
  { t: 'c', x1: 38, y1: 48, x2: 52, y2: 56, r1: 3, r2: 2, c: 'body', g: 't1', z: -1 },
  { t: 'c', x1: 34, y1: 50, x2: 40, y2: 58, r1: 3, r2: 2, c: 'body', g: 't2', z: -1 },
  { t: 'c', x1: 28, y1: 50, x2: 24, y2: 58, r1: 3, r2: 2, c: 'body', g: 't3', z: 0.5 },
  { t: 'c', x1: 24, y1: 48, x2: 12, y2: 55, r1: 3, r2: 2, c: 'body', g: 't4', z: 0.5 },
  { t: 'e', x: 32, y: 36, rx: 15, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 40, y: 28, rx: 3, ry: 2.4, c: 'spot', on: 'body' },
  { t: 'spot', x: 44, y: 38, rx: 2.4, ry: 2, c: 'spot', on: 'body' },
  { t: 'c', x1: 22, y1: 40, x2: 14, y2: 40, r1: 3.4, r2: 3.6, c: 'body', g: 'snout', z: 1 },
  { t: 'e', x: 12, y: 40, rx: 1.4, ry: 2.4, c: '#2a2430', g: 'mouthIn', z: 1.1, face: true },
  { t: 'eye', x: 24, y: 31, s: 3, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 32, y: 31, s: 3, style: 'angry', iris: '#2a2430', look: [-1, 0] },
] });

// @DELIBIRD
defMon('DELIBIRD', { pal: { red: '#d83a3a', white: '#f4f0e6', beak: '#f0c040', leg: '#f0c040' }, parts: [
  { t: 'e', x: 46, y: 32, rx: 9, ry: 8, c: 'white', g: 'bag', z: -1, soft: true },
  { t: 'e', x: 27, y: 57, rx: 3.4, ry: 1.6, c: 'leg', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.4, ry: 1.6, c: 'leg', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 44, rx: 11, ry: 11, c: 'white', g: 'body' },
  { t: 'e', x: 32, y: 30, rx: 9, ry: 8, c: 'red', g: 'head', z: 1 },
  { t: 'p', pts: [22, 36, 42, 36, 44, 48, 38, 40, 32, 46, 26, 40, 20, 48], c: 'red', g: 'cape', z: 1.2 },
  { t: 'eye', x: 28, y: 29, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 29, s: 2.4, iris: '#2a2430' },
  { t: 'p', pts: [30, 33, 34, 33, 32, 36], c: 'beak', g: 'beak', z: 1.5, face: true },
] });

// @MANTINE
defMon('MANTINE', { pal: { body: '#3a4a8a', belly: '#f4f0e6', dark: '#2a3060' }, parts: [
  { t: 'l', pts: [40, 44, 52, 52, 62, 54], w: 1.4, w2: 1, c: 'dark', g: 'tail', z: -1 },
  { t: 'p', pts: [32, 30, 4, 44, 12, 48, 32, 46, 52, 48, 60, 44], c: 'body', g: 'wings' },
  { t: 'e', x: 32, y: 40, rx: 10, ry: 8, c: 'body', g: 'wings' },
  { t: 'spot', x: 32, y: 44, rx: 7, ry: 4, c: 'belly', on: 'wings' },
  { t: 'c', x1: 25, y1: 34, x2: 22, y2: 26, r1: 1.6, r2: 1.4, c: 'body', g: 'hornL', z: 1 },
  { t: 'c', x1: 39, y1: 34, x2: 42, y2: 26, r1: 1.6, r2: 1.4, c: 'body', g: 'hornR', z: 1 },
  { t: 'eye', x: 28, y: 37, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 37, s: 2.4, iris: '#2a2430' },
  { t: 'mouth', x: 32, y: 42, w: 2.4, style: 'smile' },
] });

// @SKARMORY
defMon('SKARMORY', { pal: { steel: '#a8b0c0', steelD: '#7a8290', red: '#d83a3a', leg: '#6a7080' }, parts: [
  { t: 'p', pts: [38, 30, 60, 14, 58, 22, 62, 26, 56, 32, 60, 38, 44, 40], c: 'steel', g: 'wingR', z: -1 },
  { t: 'p', pts: [42, 44, 58, 50, 56, 54, 42, 50], c: 'steelD', g: 'tail', z: -1 },
  { t: 'c', x1: 30, y1: 48, x2: 28, y2: 57, r1: 1.4, r2: 1.2, c: 'leg', g: 'legL', z: -0.5 },
  { t: 'c', x1: 36, y1: 48, x2: 38, y2: 57, r1: 1.4, r2: 1.2, c: 'leg', g: 'legR', z: -0.5 },
  { t: 'e', x: 33, y: 40, rx: 10, ry: 9, c: 'steel', g: 'body' },
  { t: 'p', pts: [28, 34, 6, 18, 8, 26, 4, 30, 10, 36, 6, 42, 24, 44], c: 'steel', g: 'wingL', z: 1 },
  { t: 'spot', x: 12, y: 30, rx: 4, ry: 6, c: 'red', on: 'wingL' },
  { t: 'p', pts: [26, 18, 30, 8, 32, 18], c: 'steel', g: 'crest', z: 1.4 },
  { t: 'e', x: 26, y: 24, rx: 6, ry: 5.5, c: 'steel', g: 'head', z: 1.5 },
  { t: 'p', pts: [21, 24, 12, 28, 21, 29], c: 'steelD', g: 'beak', z: 1.6 },
  { t: 'eye', x: 25, y: 23, s: 2.2, style: 'angry', iris: '#e8c030', look: [-1, 0] },
] });

// @HOUNDOUR
defMon('HOUNDOUR', { pal: { fur: '#2e2e3a', furD: '#1e1e28', tan: '#c87848', bone: '#f4f0e6' }, parts: [
  { t: 'l', pts: [46, 40, 54, 36, 58, 30], w: 1.6, w2: 1, c: 'fur', g: 'tail', z: -1 },
  { t: 'p', pts: [56, 32, 62, 28, 58, 26], c: 'fur', g: 'tailTip', z: -1 },
  { t: 'c', x1: 44, y1: 44, x2: 46, y2: 57, r1: 2.8, r2: 2.2, c: 'furD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 2.8, r2: 2.2, c: 'furD', g: 'legFB', z: -0.8 },
  { t: 'e', x: 35, y: 41, rx: 13, ry: 8, c: 'fur', g: 'body' },
  { t: 'stripe', pts: [30, 34, 30, 40], w: 1.6, c: 'bone', on: 'body' },
  { t: 'stripe', pts: [36, 33, 36, 39], w: 1.6, c: 'bone', on: 'body' },
  { t: 'stripe', pts: [42, 34, 42, 40], w: 1.6, c: 'bone', on: 'body' },
  { t: 'c', x1: 40, y1: 44, x2: 39, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 26, y1: 44, x2: 26, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'stripe', pts: [23, 52, 29, 52], w: 1.6, c: 'bone', on: 'legF' },
  { t: 'p', pts: [20, 22, 18, 10, 27, 18], c: 'fur', g: 'earL', z: 1 },
  { t: 'p', pts: [26, 20, 32, 9, 33, 21], c: 'fur', g: 'earR', z: 0.8 },
  { t: 'e', x: 22, y: 28, rx: 8, ry: 7, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 17, y: 32, rx: 5, ry: 3, c: 'tan', on: 'head' },
  { t: 'eye', x: 18, y: 27, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 24.5, y: 27, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'mouth', x: 16, y: 33, w: 1.6, style: 'fang' },
] });

// @HOUNDOOM
defMon('HOUNDOOM', { pal: { fur: '#2e2e3a', furD: '#1e1e28', tan: '#c87848', bone: '#f4f0e6', horn: '#e8e0d0' }, parts: [
  { t: 'l', pts: [48, 38, 56, 34, 60, 26], w: 1.8, w2: 1, c: 'fur', g: 'tail', z: -1 },
  { t: 'p', pts: [58, 28, 64, 22, 58, 22], c: 'fur', g: 'tailTip', z: -1 },
  { t: 'c', x1: 46, y1: 44, x2: 48, y2: 57, r1: 3, r2: 2.4, c: 'furD', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 3, r2: 2.4, c: 'furD', g: 'legFB', z: -0.8 },
  { t: 'e', x: 36, y: 40, rx: 15, ry: 9, c: 'fur', g: 'body' },
  { t: 'spot', x: 30, y: 46, rx: 8, ry: 3, c: 'tan', on: 'body' },
  { t: 'stripe', pts: [32, 32, 32, 38], w: 1.6, c: 'bone', on: 'body' },
  { t: 'stripe', pts: [38, 31, 38, 37], w: 1.6, c: 'bone', on: 'body' },
  { t: 'stripe', pts: [44, 32, 44, 38], w: 1.6, c: 'bone', on: 'body' },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 3, r2: 2.4, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 26, y1: 44, x2: 26, y2: 57, r1: 3, r2: 2.4, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'l', pts: [22, 20, 24, 12, 30, 8], w: 2, w2: 1, c: 'horn', g: 'hornL', z: 1.2 },
  { t: 'l', pts: [28, 20, 32, 13, 38, 11], w: 2, w2: 1, c: 'horn', g: 'hornR', z: 0.9 },
  { t: 'e', x: 21, y: 26, rx: 8.5, ry: 7, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 15, y: 30, rx: 5, ry: 3, c: 'tan', on: 'head' },
  { t: 'eye', x: 17, y: 25, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 24, y: 25, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'mouth', x: 15, y: 31, w: 1.8, style: 'fang' },
] });

// @KINGDRA
defMon('KINGDRA', { pal: { body: '#4a90d8', belly: '#f0e0a0', fin: '#f4f0e6', spine: '#f0e0a0' }, parts: [
  { t: 'l', pts: [38, 50, 46, 56, 52, 52, 50, 46], w: 4, w2: 2, c: 'body', g: 'tail', z: -1 },
  { t: 'p', pts: [38, 28, 50, 20, 48, 30, 54, 34, 44, 38], c: 'fin', g: 'finBack', z: -0.5 },
  { t: 'c', x1: 32, y1: 26, x2: 34, y2: 50, r1: 8, r2: 6, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 40, rx: 4, ry: 9, c: 'belly', on: 'body' },
  { t: 'stripe', pts: [27, 34, 33, 34], w: 1, c: 'body', on: 'body' },
  { t: 'stripe', pts: [27, 40, 33, 40], w: 1, c: 'body', on: 'body' },
  { t: 'stripe', pts: [27, 46, 33, 46], w: 1, c: 'body', on: 'body' },
  { t: 'p', pts: [30, 14, 34, 4, 38, 12, 36, 18], c: 'fin', g: 'crest', z: 1 },
  { t: 'e', x: 28, y: 20, rx: 7, ry: 6, c: 'body', g: 'head', z: 1.5 },
  { t: 'c', x1: 24, y1: 22, x2: 14, y2: 20, r1: 2.6, r2: 2.4, c: 'body', g: 'snout', z: 1.6 },
  { t: 'eye', x: 27, y: 18, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @PHANPY
defMon('PHANPY', { pal: { body: '#8ab8e0', ear: '#d86060', foot: '#f4f0e6' }, parts: [
  { t: 'c', x1: 42, y1: 48, x2: 43, y2: 57, r1: 3.4, r2: 3, c: 'body', g: 'legB', z: -0.8 },
  { t: 'e', x: 38, y: 44, rx: 12, ry: 10, c: 'body', g: 'body' },
  { t: 'c', x1: 32, y1: 50, x2: 32, y2: 57, r1: 3.4, r2: 3, c: 'body', g: 'legF', z: 0.5 },
  { t: 'e', x: 32, y: 57, rx: 3.4, ry: 1.4, c: 'foot', g: 'toe', z: 0.6 },
  { t: 'e', x: 32, y: 32, rx: 7, ry: 9, c: 'body', g: 'ear', z: 1 },
  { t: 'spot', x: 32, y: 32, rx: 4.5, ry: 6.5, c: 'ear', on: 'ear' },
  { t: 'e', x: 21, y: 36, rx: 8, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'c', x1: 16, y1: 40, x2: 11, y2: 48, r1: 2.6, r2: 2.4, c: 'body', g: 'trunk', z: 1.6 },
  { t: 'eye', x: 19, y: 35, s: 2.4, iris: '#2a2430', look: [-1, 0] },
] });

// @DONPHAN
defMon('DONPHAN', { pal: { body: '#606878', hide: '#3a4048', tusk: '#f4f0e6', band: '#b8c0c8' }, parts: [
  { t: 'c', x1: 46, y1: 48, x2: 47, y2: 57, r1: 4, r2: 3.6, c: 'body', g: 'legB', z: -0.8 },
  { t: 'e', x: 38, y: 40, rx: 16, ry: 13, c: 'body', g: 'body' },
  { t: 'stripe', pts: [30, 28, 30, 52], w: 2, c: 'hide', on: 'body' },
  { t: 'stripe', pts: [38, 27, 38, 53], w: 2, c: 'hide', on: 'body' },
  { t: 'stripe', pts: [46, 28, 46, 52], w: 2, c: 'hide', on: 'body' },
  { t: 'c', x1: 32, y1: 50, x2: 32, y2: 57, r1: 4, r2: 3.6, c: 'body', g: 'legF', z: 0.5 },
  { t: 'e', x: 20, y: 36, rx: 8, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'c', x1: 14, y1: 40, x2: 10, y2: 52, r1: 3.2, r2: 2.6, c: 'body', g: 'trunk', z: 1.6 },
  { t: 'stripe', pts: [8, 46, 15, 46], w: 1.2, c: 'band', on: 'trunk' },
  { t: 'l', pts: [18, 42, 12, 46, 8, 42], w: 2.4, w2: 1.2, c: 'tusk', g: 'tusk', z: 1.7 },
  { t: 'eye', x: 18, y: 34, s: 2.2, style: 'angry', iris: '#2a2430', look: [-1, 0] },
] });

// @PORYGON2
defMon('PORYGON2', { pal: { pink: '#f07a98', blue: '#4a88d8' }, parts: [
  { t: 'e', x: 44, y: 44, rx: 5, ry: 4, c: 'blue', g: 'tail', z: -1 },
  { t: 'e', x: 36, y: 40, rx: 11, ry: 10, c: 'pink', g: 'body', gloss: true },
  { t: 'e', x: 30, y: 52, rx: 4, ry: 3, c: 'blue', g: 'legL', z: -0.5 },
  { t: 'e', x: 40, y: 53, rx: 4, ry: 3, c: 'blue', g: 'legR', z: -0.5 },
  { t: 'e', x: 26, y: 44, rx: 3.6, ry: 2.4, c: 'blue', g: 'arm', z: 1 },
  { t: 'e', x: 22, y: 28, rx: 8, ry: 7, c: 'pink', g: 'head', z: 1.5, gloss: true },
  { t: 'e', x: 13, y: 31, rx: 4, ry: 3, c: 'blue', g: 'beak', z: 1.6, gloss: true },
  { t: 'eye', x: 22, y: 26, s: 2.6, iris: '#2a2430', look: [-1, 0] },
] });

// @STANTLER
defMon('STANTLER', { pal: { fur: '#a87048', light: '#e8cc98', antler: '#8a6040', orb: '#6ac8d8' }, parts: [
  { t: 'c', x1: 46, y1: 44, x2: 47, y2: 57, r1: 2.4, r2: 1.8, c: 'fur', g: 'legB', z: -0.8 },
  { t: 'c', x1: 30, y1: 44, x2: 29, y2: 57, r1: 2.4, r2: 1.8, c: 'fur', g: 'legFB', z: -0.8 },
  { t: 'e', x: 39, y: 40, rx: 12, ry: 7.5, c: 'fur', g: 'body' },
  { t: 'spot', x: 30, y: 38, rx: 5, ry: 6, c: 'light', on: 'body' },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 2.4, r2: 1.8, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 33, y1: 44, x2: 33, y2: 57, r1: 2.4, r2: 1.8, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'c', x1: 30, y1: 36, x2: 24, y2: 26, r1: 4, r2: 3.4, c: 'fur', g: 'neck', z: 0.6 },
  { t: 'l', pts: [24, 18, 28, 8, 22, 2, 16, 6, 18, 12], w: 1.6, w2: 1.2, c: 'antler', g: 'antL', z: 1 },
  { t: 'l', pts: [26, 18, 34, 10, 40, 12, 38, 18], w: 1.6, w2: 1.2, c: 'antler', g: 'antR', z: 0.8 },
  { t: 'e', x: 21, y: 24, rx: 7, ry: 5.5, c: 'fur', g: 'head', z: 1 },
  { t: 'e', x: 20, y: 28, rx: 2.4, ry: 2.4, c: 'orb', g: 'orb', z: 1.1, gloss: true, face: true },
  { t: 'eye', x: 18, y: 23, s: 2.2, iris: '#2a2430', look: [-1, 0] },
] });

// @SMEARGLE
defMon('SMEARGLE', { pal: { body: '#f4ecd8', beret: '#8a6440', paint: '#5cb848', tail: '#f4ecd8' }, parts: [
  { t: 'l', pts: [40, 44, 48, 40, 54, 30, 52, 22], w: 2, w2: 1.6, c: 'tail', g: 'tail', z: -1 },
  { t: 'e', x: 52, y: 20, rx: 3, ry: 3.4, c: 'paint', g: 'brush', z: -1 },
  { t: 'c', x1: 35, y1: 48, x2: 37, y2: 57, r1: 2.4, r2: 2, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 48, x2: 27, y2: 57, r1: 2.4, r2: 2, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 8, ry: 10, c: 'body', g: 'body' },
  { t: 'c', x1: 25, y1: 38, x2: 20, y2: 44, r1: 1.8, r2: 1.6, c: 'body', g: 'armL', z: 1 },
  { t: 'e', x: 21, y: 30, rx: 3, ry: 5, rot: 20, c: 'beret', g: 'ear', z: 1.3 },
  { t: 'e', x: 30, y: 25, rx: 8, ry: 7, c: 'body', g: 'head', z: 1.5 },
  { t: 'e', x: 32, y: 18, rx: 9, ry: 3.5, c: 'beret', g: 'beret', z: 1.6 },
  { t: 'eye', x: 26, y: 25, s: 2.2, style: 'sleepy', iris: '#2a2430' },
  { t: 'eye', x: 33, y: 25, s: 2.2, style: 'sleepy', iris: '#2a2430' },
  { t: 'mouth', x: 29, y: 30, w: 1.4, style: 'smile' },
] });

// @TYROGUE
defMon('TYROGUE', { pal: { skin: '#e8b890', shorts: '#8a58b8', hair: '#6a4430', glove: '#f4f0e6' }, parts: [
  { t: 'c', x1: 35, y1: 48, x2: 37, y2: 57, r1: 2.6, r2: 2.2, c: 'skin', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 48, x2: 27, y2: 57, r1: 2.6, r2: 2.2, c: 'skin', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 8, ry: 9, c: 'skin', g: 'body' },
  { t: 'spot', x: 32, y: 48, rx: 8, ry: 4, c: 'shorts', on: 'body' },
  { t: 'c', x1: 25, y1: 38, x2: 20, y2: 44, r1: 2, r2: 1.8, c: 'skin', g: 'armL', z: 1 },
  { t: 'e', x: 19, y: 45, rx: 2.8, ry: 2.6, c: 'glove', g: 'gloveL', z: 1.1 },
  { t: 'c', x1: 39, y1: 38, x2: 44, y2: 44, r1: 2, r2: 1.8, c: 'skin', g: 'armR', z: 1 },
  { t: 'e', x: 45, y: 45, rx: 2.8, ry: 2.6, c: 'glove', g: 'gloveR', z: 1.1 },
  { t: 'e', x: 32, y: 24, rx: 9, ry: 8, c: 'skin', g: 'head', z: 1.5 },
  { t: 'p', pts: [22, 22, 24, 14, 30, 16, 32, 12, 36, 16, 40, 14, 42, 22], c: 'hair', g: 'hair', z: 1.6 },
  { t: 'eye', x: 28, y: 25, s: 2.4, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 36, y: 25, s: 2.4, style: 'angry', iris: '#2a2430', flip: true },
  { t: 'mouth', x: 32, y: 30, w: 1.6, style: 'line' },
] });

// @HITMONTOP
defMon('HITMONTOP', { pal: { body: '#a87048', light: '#e8cc98', blue: '#4a78c0', horn: '#8a6040' }, parts: [
  { t: 'c', x1: 38, y1: 32, x2: 52, y2: 20, r1: 2.6, r2: 2.2, c: 'body', g: 'legR', z: -1 },
  { t: 'e', x: 53, y: 18, rx: 3, ry: 2.4, c: 'body', g: 'footR', z: -1 },
  { t: 'c', x1: 26, y1: 32, x2: 12, y2: 20, r1: 2.6, r2: 2.2, c: 'body', g: 'legL', z: -1 },
  { t: 'e', x: 11, y: 18, rx: 3, ry: 2.4, c: 'body', g: 'footL', z: -1 },
  { t: 'e', x: 32, y: 34, rx: 9, ry: 8, c: 'blue', g: 'body' },
  { t: 'spot', x: 32, y: 30, rx: 4, ry: 3, c: 'light', on: 'body' },
  { t: 'c', x1: 24, y1: 36, x2: 18, y2: 42, r1: 1.8, r2: 1.6, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 40, y1: 36, x2: 46, y2: 42, r1: 1.8, r2: 1.6, c: 'body', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 46, rx: 7, ry: 6, c: 'body', g: 'head', z: 0.5 },
  { t: 'p', pts: [28, 51, 32, 60, 36, 51], c: 'horn', g: 'horn', z: 0.4 },
  { t: 'eye', x: 29, y: 45, s: 2.2, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 35, y: 45, s: 2.2, style: 'angry', iris: '#2a2430', flip: true },
] });

// @SMOOCHUM
defMon('SMOOCHUM', { pal: { skin: '#f8c8d0', hair: '#f0d860', dress: '#f07a98', lips: '#e04868' }, parts: [
  { t: 'e', x: 28, y: 57, rx: 3, ry: 2, c: 'dress', g: 'footL', z: -0.5 },
  { t: 'e', x: 36, y: 57, rx: 3, ry: 2, c: 'dress', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 49, rx: 8, ry: 7, c: 'dress', g: 'body' },
  { t: 'c', x1: 25, y1: 46, x2: 21, y2: 50, r1: 1.6, r2: 1.4, c: 'skin', g: 'armL', z: 1 },
  { t: 'c', x1: 39, y1: 46, x2: 43, y2: 50, r1: 1.6, r2: 1.4, c: 'skin', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 32, rx: 11, ry: 10, c: 'skin', g: 'head', z: 1.5 },
  { t: 'e', x: 32, y: 22, rx: 10, ry: 5, c: 'hair', g: 'hair', z: 1.6 },
  { t: 'l', pts: [30, 18, 30, 12, 34, 10], w: 1.6, w2: 1.2, c: 'hair', g: 'curl', z: 1.5 },
  { t: 'eye', x: 27, y: 33, s: 2.4, iris: '#3a7ac8' },
  { t: 'eye', x: 37, y: 33, s: 2.4, iris: '#3a7ac8' },
  { t: 'e', x: 32, y: 38.5, rx: 2.6, ry: 1.8, c: 'lips', g: 'lips', z: 1.7, face: true },
] });

// @ELEKID
defMon('ELEKID', { pal: { body: '#f4d040', stripe: '#2a2430', plug: '#b0b0b8' }, parts: [
  { t: 'c', x1: 35, y1: 48, x2: 37, y2: 57, r1: 2.8, r2: 2.4, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 48, x2: 27, y2: 57, r1: 2.8, r2: 2.4, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 9, ry: 9, c: 'body', g: 'body' },
  { t: 'p', pts: [26, 40, 30, 36, 32, 40, 34, 36, 38, 40, 36, 44, 28, 44], c: 'stripe', g: 'bolt', z: 0.5, face: true },
  { t: 'c', x1: 24, y1: 38, x2: 18, y2: 44, r1: 2.4, r2: 2, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 40, y1: 38, x2: 46, y2: 44, r1: 2.4, r2: 2, c: 'body', g: 'armR', z: 1 },
  { t: 'c', x1: 26, y1: 20, x2: 24, y2: 12, r1: 1.8, r2: 1.6, c: 'plug', g: 'hornL', z: 1.4 },
  { t: 'c', x1: 38, y1: 20, x2: 40, y2: 12, r1: 1.8, r2: 1.6, c: 'plug', g: 'hornR', z: 1.4 },
  { t: 'e', x: 32, y: 26, rx: 10, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 26, s: 2.4, style: 'angry', iris: '#2a2430' },
  { t: 'eye', x: 36, y: 26, s: 2.4, style: 'angry', iris: '#2a2430', flip: true },
  { t: 'mouth', x: 32, y: 31, w: 1.8, style: 'open' },
] });

// @MAGBY
defMon('MAGBY', { pal: { body: '#e84838', belly: '#f4d060', flame: '#f8b030', lip: '#f4d060' }, parts: [
  { t: 'e', x: 44, y: 50, rx: 4, ry: 2.4, c: 'flame', g: 'tail', z: -1 },
  { t: 'e', x: 27, y: 57, rx: 3.4, ry: 2.2, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 37, y: 57, rx: 3.4, ry: 2.2, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 45, rx: 9, ry: 10, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 48, rx: 5, ry: 6, c: 'belly', on: 'body' },
  { t: 'c', x1: 24, y1: 42, x2: 19, y2: 47, r1: 2, r2: 1.8, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 40, y1: 42, x2: 45, y2: 47, r1: 2, r2: 1.8, c: 'body', g: 'armR', z: 1 },
  { t: 'p', pts: [26, 22, 28, 12, 32, 18, 36, 12, 38, 22], c: 'flame', g: 'crest', z: 1.4 },
  { t: 'e', x: 32, y: 28, rx: 9, ry: 7.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 27, s: 2.4, iris: '#2a2430' },
  { t: 'eye', x: 36, y: 27, s: 2.4, iris: '#2a2430' },
  { t: 'e', x: 32, y: 32.5, rx: 3.4, ry: 1.8, c: 'lip', g: 'lips', z: 1.6, face: true },
] });

// @MILTANK
defMon('MILTANK', { pal: { body: '#f4a8c0', black: '#2a2430', udder: '#f07a98', horn: '#f4f0e6', belly: '#f8e0e0' }, parts: [
  { t: 'l', pts: [42, 46, 50, 44, 54, 40], w: 1.4, w2: 1, c: 'black', g: 'tail', z: -1 },
  { t: 'c', x1: 27, y1: 50, x2: 26, y2: 57, r1: 3.6, r2: 3.2, c: 'black', g: 'legL', z: -0.5 },
  { t: 'c', x1: 38, y1: 50, x2: 39, y2: 57, r1: 3.6, r2: 3.2, c: 'black', g: 'legR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 13, ry: 12, c: 'black', g: 'body' },
  { t: 'spot', x: 32, y: 46, rx: 10, ry: 8, c: 'belly', on: 'body' },
  { t: 'e', x: 32, y: 44, rx: 3.6, ry: 3, c: 'udder', g: 'udder', z: 0.5, gloss: true, face: true },
  { t: 'c', x1: 20, y1: 38, x2: 15, y2: 44, r1: 2.6, r2: 2.4, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 44, y1: 38, x2: 49, y2: 44, r1: 2.6, r2: 2.4, c: 'body', g: 'armR', z: 1 },
  { t: 'p', pts: [23, 18, 20, 10, 27, 16], c: 'horn', g: 'hornL', z: 1.3 },
  { t: 'p', pts: [41, 18, 44, 10, 37, 16], c: 'horn', g: 'hornR', z: 1.3 },
  { t: 'e', x: 18, y: 22, rx: 4, ry: 2.2, rot: -20, c: 'black', g: 'earL', z: 1.3 },
  { t: 'e', x: 46, y: 22, rx: 4, ry: 2.2, rot: 20, c: 'black', g: 'earR', z: 1.3 },
  { t: 'e', x: 32, y: 26, rx: 10, ry: 8.5, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 32, y: 31, rx: 5, ry: 2.8, c: 'udder', on: 'head', face: true },
  { t: 'eye', x: 27.5, y: 24, s: 2.4, iris: '#3a7ac8' },
  { t: 'eye', x: 36.5, y: 24, s: 2.4, iris: '#3a7ac8' },
] });
