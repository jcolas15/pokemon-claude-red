// POKéMON drawings, Gen 3 #362-371. Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @GLALIE
defMon('GLALIE', { pal: { ice: '#e4eaf0', mask: '#2a2c38', horn: '#94cce8', jaw: '#7ab4dc', eye: '#f4d030', tooth: '#f8fcff', pupil: '#1a1a22' }, parts: [
  { t: 'p', pts: [42, 16, 54, 2, 56, 4, 52, 22], c: 'horn', g: 'hornB', z: -1 },
  { t: 'e', x: 32, y: 31, rx: 23, ry: 22, c: 'ice', g: 'head' },
  { t: 'spot', x: 30, y: 50, rx: 22, ry: 8, c: 'jaw', on: 'head' },
  { t: 'spot', x: 24, y: 34, rx: 16, ry: 12, c: 'mask', on: 'head', face: true },
  { t: 'p', pts: [16, 16, 6, 2, 4, 4, 10, 22], c: 'horn', g: 'hornF', z: 1 },
  { t: 'e', x: 17, y: 29, rx: 4, ry: 3, rot: 0.3, c: 'eye', g: 'eyeL', z: 1, flat: true, face: true },
  { t: 'e', x: 31, y: 29, rx: 4, ry: 3, rot: -0.3, c: 'eye', g: 'eyeR', z: 1, flat: true, face: true },
  { t: 'e', x: 16, y: 29.5, rx: 1.2, ry: 1.6, c: 'pupil', g: 'pupL', z: 1.1, flat: true, face: true },
  { t: 'e', x: 30, y: 29.5, rx: 1.2, ry: 1.6, c: 'pupil', g: 'pupR', z: 1.1, flat: true, face: true },
  { t: 'p', pts: [12, 39, 36, 39, 33, 43, 15, 43], c: 'tooth', g: 'teeth', z: 1, flat: true, face: true },
  { t: 'p', pts: [13, 39, 17, 32, 19, 39], c: 'tooth', g: 'fangL', z: 1.1, face: true },
  { t: 'p', pts: [29, 39, 32, 32, 35, 39], c: 'tooth', g: 'fangR', z: 1.1, face: true },
  { t: 'shine', x: 40, y: 15 },
] });

// @SPHEAL
defMon('SPHEAL', { pal: { body: '#78b4e8', belly: '#f4ecc4', spot: '#a8d4f4', fin: '#78b4e8', ear: '#5a90c8' }, parts: [
  { t: 'e', x: 44, y: 49, rx: 4, ry: 2.4, rot: -0.4, c: 'fin', g: 'finB', z: -1 },
  { t: 'e', x: 32, y: 43, rx: 15, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 29, y: 51, rx: 12, ry: 7, c: 'belly', on: 'body' },
  { t: 'spot', x: 38, y: 34, rx: 3, ry: 2, c: 'spot', on: 'body' },
  { t: 'spot', x: 43, y: 40, rx: 2, ry: 1.6, c: 'spot', on: 'body' },
  { t: 'e', x: 24, y: 30, rx: 2.4, ry: 2, c: 'ear', g: 'earL', z: -0.5 },
  { t: 'e', x: 37, y: 30, rx: 2.4, ry: 2, c: 'ear', g: 'earR', z: -0.5 },
  { t: 'e', x: 17, y: 48, rx: 4.5, ry: 2.6, rot: 0.5, c: 'fin', g: 'finF', z: 1 },
  { t: 'e', x: 25, y: 44, rx: 4.5, ry: 3, c: 'belly', g: 'muzzle', z: 0.5, face: true },
  { t: 'e', x: 25, y: 41.5, rx: 1.4, ry: 1, c: '#3a3040', g: 'nose', z: 0.6, flat: true, face: true },
  { t: 'eye', x: 21, y: 37, s: 2.2, style: 'round', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 31, y: 37, s: 2.2, style: 'round', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 25, y: 46, w: 2, style: 'smile' },
] });

// @SEALEO
defMon('SEALEO', { pal: { body: '#80b8e8', belly: '#f0ead0', muzzle: '#f8f8f4', whisk: '#f8f8f8', ear: '#5a90c8', nose: '#d86070' }, parts: [
  { t: 'e', x: 48, y: 52, rx: 6, ry: 3, rot: -0.3, c: 'body', g: 'tail', z: -1 },
  { t: 'e', x: 36, y: 44, rx: 15, ry: 12, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 50, rx: 12, ry: 7, c: 'belly', on: 'body' },
  { t: 'e', x: 25, y: 31, rx: 12, ry: 11, c: 'body', g: 'head', z: 1 },
  { t: 'e', x: 21, y: 22, rx: 2.6, ry: 2.4, c: 'ear', g: 'earL', z: 0.8 },
  { t: 'e', x: 33, y: 22, rx: 2.6, ry: 2.4, c: 'ear', g: 'earR', z: 0.8 },
  { t: 'e', x: 17, y: 38, rx: 6, ry: 4.5, c: 'muzzle', g: 'muzzle', z: 1.2, face: true },
  { t: 'l', pts: [12, 38, 5, 35, 1, 37], w: 1.6, w2: 0.8, c: 'whisk', g: 'whL', z: 1.3, face: true },
  { t: 'l', pts: [21, 38, 28, 36, 32, 39], w: 1.6, w2: 0.8, c: 'whisk', g: 'whR', z: 1.3, face: true },
  { t: 'e', x: 15, y: 35, rx: 1.8, ry: 1.2, c: 'nose', g: 'nose', z: 1.4, flat: true, face: true },
  { t: 'p', pts: [13, 41, 14, 45, 15.5, 41], c: 'whisk', g: 'fangL', z: 1.4, face: true },
  { t: 'p', pts: [18, 41, 19, 45, 20.5, 41], c: 'whisk', g: 'fangR', z: 1.4, face: true },
  { t: 'e', x: 46, y: 55, rx: 5, ry: 2.4, c: 'body', g: 'finB', z: -0.5 },
  { t: 'e', x: 24, y: 54, rx: 6, ry: 2.8, c: 'body', g: 'finF', z: 1.5 },
  { t: 'c', x1: 30, y1: 42, x2: 23, y2: 48, r1: 3, r2: 2.6, c: 'body', g: 'arm', z: 1.4 },
  { t: 'eye', x: 18, y: 29, s: 2.2, style: 'round', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 27, y: 29, s: 2.2, style: 'round', iris: '#2a2430', look: [-1, 0] },
] });

// @WALREIN
defMon('WALREIN', { pal: { body: '#3c64b0', belly: '#e8e4d0', mane: '#f4f6f8', tusk: '#fbfaf0', nose: '#2a2a40', fin: '#2e5098' }, parts: [
  { t: 'e', x: 54, y: 52, rx: 8, ry: 4, rot: -0.4, c: 'fin', g: 'tail', z: -2 },
  { t: 'e', x: 52, y: 54, rx: 6, ry: 3, c: 'fin', g: 'finB', z: -1 },
  { t: 'e', x: 38, y: 40, rx: 22, ry: 17, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 50, rx: 18, ry: 9, c: 'belly', on: 'body' },
  { t: 'p', pts: [14, 26, 18, 14, 28, 10, 40, 12, 48, 18, 50, 28, 44, 34, 38, 30, 32, 38, 22, 36], c: 'mane', g: 'mane', z: 0.5 },
  { t: 'p', pts: [44, 26, 54, 22, 52, 32, 46, 34], c: 'mane', g: 'mane', z: 0.5 },
  { t: 'e', x: 22, y: 24, rx: 12, ry: 10, c: 'body', g: 'head', z: 1 },
  { t: 'e', x: 13, y: 28, rx: 7, ry: 6, c: 'body', g: 'head', z: 1 },
  { t: 'e', x: 13, y: 31, rx: 5.5, ry: 3.5, c: 'mane', g: 'muzzle', z: 1.2, face: true },
  { t: 'e', x: 9, y: 26.5, rx: 2.2, ry: 1.6, c: 'nose', g: 'nose', z: 1.3, flat: true, face: true },
  { t: 'p', pts: [7, 32, 3, 44, 5, 55, 11, 45, 13, 33], c: 'tusk', g: 'tuskB', z: 0.9 },
  { t: 'p', pts: [14, 33, 12, 46, 16, 58, 20, 46, 20, 33], c: 'tusk', g: 'tuskF', z: 1.5 },
  { t: 'e', x: 30, y: 52, rx: 7, ry: 4, rot: 0.3, c: 'fin', g: 'finF', z: 2 },
  { t: 'e', x: 24, y: 57, rx: 7, ry: 2.6, c: 'fin', g: 'footF', z: 2 },
  { t: 'eye', x: 16, y: 21, s: 1.8, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 24, y: 21, s: 1.8, style: 'angry', iris: '#2a2430', look: [-1, 0] },
] });

// @CLAMPERL
defMon('CLAMPERL', { pal: { shell: '#4a78c8', rim: '#7aa8e8', inner: '#f0c0c8', pearl: '#f4dce4', face: '#2a2430' }, parts: [
  { t: 'p', pts: [14, 34, 18, 22, 28, 15, 40, 15, 50, 22, 54, 34, 34, 38], c: 'shell', g: 'top', z: -1 },
  { t: 'stripe', pts: [34, 16, 34, 36], w: 1, c: 'rim', on: 'top' },
  { t: 'stripe', pts: [26, 18, 22, 34], w: 1, c: 'rim', on: 'top' },
  { t: 'stripe', pts: [42, 18, 46, 34], w: 1, c: 'rim', on: 'top' },
  { t: 'e', x: 34, y: 42, rx: 17, ry: 6, c: 'inner', g: 'inner', z: -0.5 },
  { t: 'e', x: 32, y: 36, rx: 6.5, ry: 6.5, c: 'pearl', g: 'pearl', z: 0, gloss: true },
  { t: 'p', pts: [14, 42, 54, 42, 52, 50, 44, 56, 24, 56, 16, 50], c: 'shell', g: 'bot', z: 1 },
  { t: 'stripe', pts: [24, 43, 26, 55], w: 1, c: 'rim', on: 'bot' },
  { t: 'stripe', pts: [34, 43, 34, 56], w: 1, c: 'rim', on: 'bot' },
  { t: 'stripe', pts: [44, 43, 42, 55], w: 1, c: 'rim', on: 'bot' },
  { t: 'eye', x: 20, y: 46, s: 1.4, style: 'dot', iris: '#2a2430', sclera: false },
  { t: 'eye', x: 27, y: 46, s: 1.4, style: 'dot', iris: '#2a2430', sclera: false },
  { t: 'mouth', x: 23.5, y: 50, w: 2, style: 'smile' },
] });

// @HUNTAIL
defMon('HUNTAIL', { pal: { body: '#5c8cd0', belly: '#e8dca0', spot: '#24365c', fin: '#8cb4e8', mouth: '#f0d050', tooth: '#fbf8f0' }, parts: [
  { t: 'l', pts: [26, 40, 34, 52, 48, 54, 56, 44, 52, 32, 44, 26], w: 7, w2: 3.5, c: 'body', g: 'body', z: -1 },
  { t: 'p', pts: [42, 26, 52, 14, 58, 22, 50, 22, 56, 28, 46, 28], c: 'fin', g: 'tailFin', z: -1.5 },
  { t: 'e', x: 52, y: 18, rx: 2, ry: 2, c: 'spot', g: 'lure', z: -1.4, flat: true },
  { t: 'spot', x: 40, y: 53, rx: 2.5, ry: 2, c: 'spot', on: 'body' },
  { t: 'spot', x: 52, y: 46, rx: 2.5, ry: 2, c: 'spot', on: 'body' },
  { t: 'spot', x: 51, y: 34, rx: 2, ry: 1.8, c: 'spot', on: 'body' },
  { t: 'c', x1: 26, y1: 42, x2: 22, y2: 24, r1: 6, r2: 7, c: 'body', g: 'neck' },
  { t: 'spot', x: 27, y: 36, rx: 2.5, ry: 2, c: 'spot', on: 'neck' },
  { t: 'p', pts: [30, 26, 38, 30, 32, 36], c: 'fin', g: 'gill', z: -0.5 },
  { t: 'e', x: 17, y: 18, rx: 10, ry: 7, rot: -0.2, c: 'body', g: 'head', z: 1 },
  { t: 'p', pts: [8, 18, 22, 21, 10, 26], c: 'mouth', g: 'mouth', z: 1.2, flat: true, face: true },
  { t: 'p', pts: [10, 19, 11, 21.5, 13, 19.5, 14, 22, 16, 20, 17, 22], c: 'tooth', g: 'teeth', z: 1.3, flat: true, face: true },
  { t: 'spot', x: 22, y: 12, rx: 3, ry: 2, c: 'spot', on: 'head' },
  { t: 'eye', x: 17, y: 15, s: 1.6, style: 'angry', iris: '#e8c020', look: [-1, 0] },
] });

// @GOREBYSS
defMon('GOREBYSS', { pal: { body: '#f4a8c4', spot: '#d8508c', fin: '#f8d0e0', fin2: '#a8c8f0', snout: '#f4b8cc' }, parts: [
  { t: 'p', pts: [46, 46, 58, 40, 62, 48, 58, 56, 48, 52], c: 'fin2', g: 'tailFin', z: -1.5 },
  { t: 'l', pts: [26, 34, 30, 46, 40, 52, 50, 48], w: 6, w2: 3, c: 'body', g: 'body', z: -1 },
  { t: 'spot', x: 34, y: 49, rx: 2, ry: 1.6, c: 'spot', on: 'body' },
  { t: 'spot', x: 44, y: 51, rx: 1.8, ry: 1.4, c: 'spot', on: 'body' },
  { t: 'p', pts: [36, 44, 42, 38, 44, 46], c: 'fin', g: 'finTop', z: -1.2 },
  { t: 'p', pts: [32, 52, 36, 60, 40, 52], c: 'fin', g: 'finBot', z: -1.2 },
  { t: 'c', x1: 27, y1: 38, x2: 26, y2: 22, r1: 5.5, r2: 6.5, c: 'body', g: 'neck' },
  { t: 'spot', x: 28, y: 30, rx: 2, ry: 1.6, c: 'spot', on: 'neck' },
  { t: 'p', pts: [30, 22, 40, 18, 38, 26, 32, 28], c: 'fin2', g: 'gill', z: -0.5 },
  { t: 'e', x: 24, y: 18, rx: 7, ry: 6, c: 'body', g: 'head', z: 1 },
  { t: 'c', x1: 18, y1: 20, x2: 6, y2: 25, r1: 2.2, r2: 1.6, c: 'snout', g: 'head', z: 1 },
  { t: 'e', x: 5.5, y: 25, rx: 1.4, ry: 1, c: 'spot', g: 'lips', z: 1.1, flat: true, face: true },
  { t: 'p', pts: [24, 12, 30, 6, 30, 14], c: 'fin2', g: 'crest', z: 0.9 },
  { t: 'eye', x: 21, y: 16, s: 1.8, style: 'happy', iris: '#2a2430' },
] });

// @RELICANTH
defMon('RELICANTH', { pal: { body: '#a88a6c', dark: '#6c5444', pale: '#d8c8a8', lip: '#e86878', fin: '#8c7058' }, parts: [
  { t: 'p', pts: [50, 36, 60, 26, 62, 40, 60, 52, 50, 42], c: 'fin', g: 'tail', z: -1 },
  { t: 'p', pts: [34, 22, 40, 12, 46, 24], c: 'fin', g: 'dorsal', z: -0.5 },
  { t: 'p', pts: [38, 46, 44, 54, 48, 44], c: 'fin', g: 'finBack', z: -0.5 },
  { t: 'e', x: 30, y: 36, rx: 22, ry: 13, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 44, rx: 20, ry: 5, c: 'pale', on: 'body' },
  { t: 'spot', x: 34, y: 30, rx: 3, ry: 2, c: 'pale', on: 'body' },
  { t: 'spot', x: 42, y: 34, rx: 2.5, ry: 2, c: 'pale', on: 'body' },
  { t: 'spot', x: 38, y: 40, rx: 2, ry: 1.5, c: 'dark', on: 'body' },
  { t: 'spot', x: 46, y: 39, rx: 1.8, ry: 1.4, c: 'dark', on: 'body' },
  { t: 'stripe', pts: [22, 26, 24, 46], w: 1, c: 'dark', on: 'body' },
  { t: 'spot', x: 9, y: 39, rx: 2.4, ry: 1.6, c: 'lip', on: 'body', face: true },
  { t: 'p', pts: [24, 46, 22, 54, 30, 50], c: 'fin', g: 'finFL', z: 1 },
  { t: 'p', pts: [34, 48, 34, 56, 40, 52], c: 'fin', g: 'finFR', z: 1 },
  { t: 'eye', x: 15, y: 32, s: 2, style: 'sleepy', iris: '#2a2430' },
] });

// @LUVDISC
defMon('LUVDISC', { pal: { body: '#f490b0', fin: '#f8b8cc', lip: '#e04878' }, parts: [
  { t: 'p', pts: [36, 48, 42, 44, 48, 46, 46, 52, 42, 56], c: 'fin', g: 'tail', z: -1 },
  { t: 'p', pts: [26.1, 34.9, 25.6, 34.2, 25, 32, 25.1, 29, 26.8, 26.2, 29.9, 24.4, 33.6, 24.4, 36.6, 26.2, 38.4, 29.6, 38.7, 33.9, 38.3, 38.5, 37.9, 42.7, 38, 46.1, 38.8, 48.6, 36.4, 47.6, 33.1, 47.2, 28.8, 47.3, 24.2, 47.4, 19.9, 46.8, 16.7, 44.8, 15.1, 41.6, 15.4, 38, 17.3, 35, 20.3, 33.5, 23.3, 33.5, 25.4, 34.4], c: 'body', g: 'body' },
  { t: 'p', pts: [34, 24, 38, 18, 40, 26], c: 'fin', g: 'finTop', z: -0.5 },
  { t: 'p', pts: [28, 40, 30, 47, 34, 41], c: 'fin', g: 'fin', z: 1 },
  { t: 'eye', x: 21, y: 38, s: 1.8, style: 'happy', iris: '#2a2430' },
  { t: 'e', x: 16.5, y: 42, rx: 1.6, ry: 1.3, c: 'lip', g: 'lips', z: 1, flat: true, face: true },
] });

// @BAGON
defMon('BAGON', { pal: { body: '#5c94d8', belly: '#f0e4b0', helm: '#c0c4cc', dark: '#2a2430' }, parts: [
  { t: 'e', x: 44, y: 52, rx: 4, ry: 3, c: 'body', g: 'tail', z: -1.5 },
  { t: 'c', x1: 38, y1: 48, x2: 40, y2: 55, r1: 3, r2: 2.6, c: 'body', g: 'legB', z: -1 },
  { t: 'e', x: 40, y: 56, rx: 3.6, ry: 1.8, c: 'body', g: 'legB', z: -1 },
  { t: 'e', x: 35, y: 45, rx: 8, ry: 8, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 47, rx: 5, ry: 6, c: 'belly', on: 'body' },
  { t: 'c', x1: 31, y1: 50, x2: 29, y2: 55, r1: 3, r2: 2.6, c: 'body', g: 'legF', z: 1 },
  { t: 'e', x: 28, y: 56, rx: 3.6, ry: 1.8, c: 'body', g: 'legF', z: 1 },
  { t: 'c', x1: 30, y1: 42, x2: 25, y2: 46, r1: 1.8, r2: 1.6, c: 'body', g: 'arm', z: 1.5 },
  { t: 'e', x: 28, y: 30, rx: 11, ry: 10, c: 'body', g: 'head', z: 2 },
  { t: 'spot', x: 24, y: 37, rx: 9, ry: 4, c: 'belly', on: 'head', face: true },
  { t: 'p', pts: [18, 26, 20, 19, 28, 17, 38, 20, 40, 26, 30, 27], c: 'helm', g: 'helm', z: 2.2 },
  { t: 'stripe', pts: [24, 19, 23, 26], w: 0.8, c: 'dark', on: 'helm' },
  { t: 'stripe', pts: [30, 18, 30, 26], w: 0.8, c: 'dark', on: 'helm' },
  { t: 'eye', x: 21, y: 30, s: 2, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'eye', x: 29, y: 30, s: 2, style: 'angry', iris: '#2a2430', look: [-1, 0] },
  { t: 'mouth', x: 21, y: 36, w: 2.4, style: 'fang' },
] });
