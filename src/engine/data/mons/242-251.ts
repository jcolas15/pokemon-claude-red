// POKéMON drawings, Gen 2 #242-251 (Blissey, the legendary beasts, the Larvitar line, Lugia, Ho-Oh and Celebi). Format: art/mondef.ts.
import { defMon } from '../../art/mondef';

// @BLISSEY
defMon('BLISSEY', { pal: { body: '#f8c8d8', belly: '#f8f4ec', curl: '#f8c8d8', egg: '#f8f4ec', cheek: '#f07a98' }, parts: [
  { t: 'e', x: 26, y: 57, rx: 4, ry: 2.4, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 38, y: 57, rx: 4, ry: 2.4, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 38, rx: 16, ry: 18, c: 'body', g: 'body' },
  { t: 'spot', x: 32, y: 46, rx: 12, ry: 10, c: 'belly', on: 'body' },
  { t: 'l', pts: [16, 28, 10, 30, 8, 36], w: 3, w2: 2, c: 'curl', g: 'curlL', z: 0.5, soft: true },
  { t: 'l', pts: [48, 28, 54, 30, 56, 36], w: 3, w2: 2, c: 'curl', g: 'curlR', z: 0.5, soft: true },
  { t: 'e', x: 32, y: 44, rx: 4, ry: 5, c: 'egg', g: 'egg', z: 1, gloss: true, face: true },
  { t: 'e', x: 26, y: 46, rx: 3, ry: 2.4, c: 'body', g: 'armL', z: 1.1 },
  { t: 'e', x: 38, y: 46, rx: 3, ry: 2.4, c: 'body', g: 'armR', z: 1.1 },
  { t: 'spot', x: 22, y: 32, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'spot', x: 42, y: 32, rx: 2.4, ry: 1.6, c: 'cheek', on: 'body', face: true },
  { t: 'eye', x: 27, y: 28, s: 2.4, style: 'happy' },
  { t: 'eye', x: 37, y: 28, s: 2.4, style: 'happy' },
  { t: 'mouth', x: 32, y: 33, w: 1.8, style: 'smile' },
] });

// @RAIKOU
defMon('RAIKOU', { pal: { fur: '#f0c840', stripe: '#3a3040', cloud: '#7a5aa8', mask: '#3a3040', fang: '#f4f0e6' }, parts: [
  { t: 'l', pts: [48, 36, 56, 30, 60, 34, 62, 28], w: 2, w2: 1.4, c: 'stripe', g: 'tail', z: -1 },
  { t: 'c', x1: 46, y1: 44, x2: 48, y2: 57, r1: 3, r2: 2.6, c: 'fur', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 3, r2: 2.6, c: 'fur', g: 'legFB', z: -0.8 },
  { t: 'e', x: 36, y: 40, rx: 15, ry: 9, c: 'fur', g: 'body' },
  { t: 'stripe', pts: [40, 32, 44, 38, 40, 44], w: 1.6, c: 'stripe', on: 'body' },
  { t: 'stripe', pts: [46, 32, 50, 38, 46, 44], w: 1.6, c: 'stripe', on: 'body' },
  { t: 'e', x: 38, y: 30, rx: 10, ry: 4.5, c: 'cloud', g: 'cloud', z: 0.8, soft: true },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 3, r2: 2.6, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 27, y1: 44, x2: 27, y2: 57, r1: 3, r2: 2.6, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'e', x: 22, y: 27, rx: 9, ry: 8, c: 'fur', g: 'head', z: 1.5 },
  { t: 'spot', x: 22, y: 22, rx: 7, ry: 3.4, c: 'mask', on: 'head' },
  { t: 'p', pts: [14, 34, 16, 40, 18, 34], c: 'fang', g: 'fangL', z: 1.6 },
  { t: 'p', pts: [20, 34, 22, 40, 24, 34], c: 'fang', g: 'fangR', z: 1.6 },
  { t: 'eye', x: 17, y: 26, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 24, y: 26, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @ENTEI
defMon('ENTEI', { pal: { fur: '#a86030', mane: '#f4ece0', plate: '#9a9aa8', face: '#3a3040', fire: '#e84828' }, parts: [
  { t: 'p', pts: [46, 36, 56, 30, 60, 38, 54, 40], c: 'mane', g: 'tail', z: -1, soft: true },
  { t: 'c', x1: 46, y1: 44, x2: 48, y2: 57, r1: 3.4, r2: 3, c: 'fur', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 3.4, r2: 3, c: 'fur', g: 'legFB', z: -0.8 },
  { t: 'e', x: 36, y: 40, rx: 16, ry: 10, c: 'fur', g: 'body' },
  { t: 'p', pts: [30, 32, 34, 22, 40, 30, 46, 22, 48, 32], c: 'fire', g: 'smoke', z: -0.5 },
  { t: 'e', x: 32, y: 34, rx: 9, ry: 7, c: 'mane', g: 'mane', z: 0.7, soft: true },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 3.4, r2: 3, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 27, y1: 44, x2: 27, y2: 57, r1: 3.4, r2: 3, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'e', x: 20, y: 30, rx: 9, ry: 8, c: 'fur', g: 'head', z: 1.5 },
  { t: 'p', pts: [14, 24, 16, 16, 22, 14, 28, 18, 26, 24], c: 'plate', g: 'crown', z: 1.6 },
  { t: 'spot', x: 16, y: 35, rx: 5, ry: 3, c: 'face', on: 'head' },
  { t: 'eye', x: 16, y: 29, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 23, y: 29, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
] });

// @SUICUNE
defMon('SUICUNE', { pal: { fur: '#6ac0e0', spot: '#f4f0f8', mane: '#a878c8', ribbon: '#f4f0f8', crystal: '#e0f4fa' }, parts: [
  { t: 'l', pts: [34, 28, 48, 20, 58, 26, 62, 36], w: 2.4, w2: 1.4, c: 'ribbon', g: 'ribbon1', z: -1 },
  { t: 'l', pts: [36, 32, 50, 30, 60, 44], w: 2, w2: 1.2, c: 'ribbon', g: 'ribbon2', z: -1 },
  { t: 'c', x1: 46, y1: 44, x2: 48, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legB', z: -0.8 },
  { t: 'c', x1: 22, y1: 44, x2: 21, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legFB', z: -0.8 },
  { t: 'e', x: 36, y: 40, rx: 14, ry: 8.5, c: 'fur', g: 'body' },
  { t: 'spot', x: 40, y: 38, rx: 2, ry: 3, c: 'spot', on: 'body' },
  { t: 'spot', x: 46, y: 40, rx: 1.8, ry: 2.6, c: 'spot', on: 'body' },
  { t: 'e', x: 30, y: 32, rx: 8, ry: 6, c: 'mane', g: 'mane', z: 0.7, soft: true },
  { t: 'c', x1: 42, y1: 44, x2: 41, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legB2', z: 0.5 },
  { t: 'c', x1: 27, y1: 44, x2: 27, y2: 57, r1: 2.8, r2: 2.2, c: 'fur', g: 'legF', z: 0.5 },
  { t: 'e', x: 20, y: 28, rx: 8, ry: 7, c: 'fur', g: 'head', z: 1.5 },
  { t: 'p', pts: [18, 22, 22, 8, 26, 22], c: 'crystal', g: 'crest', z: 1.6 },
  { t: 'eye', x: 16, y: 27, s: 2.4, style: 'angry', iris: '#c03a5a', look: [-1, 0] },
  { t: 'eye', x: 22.5, y: 27, s: 2.4, style: 'angry', iris: '#c03a5a', look: [-1, 0] },
  { t: 'mouth', x: 15, y: 32, w: 1.4, style: 'line' },
] });

// @LARVITAR
defMon('LARVITAR', { pal: { body: '#8ab860', belly: '#e0e8c0', spike: '#8ab860', mark: '#d83a3a' }, parts: [
  { t: 'p', pts: [42, 44, 50, 40, 48, 48], c: 'spike', g: 'spikeB', z: -1 },
  { t: 'c', x1: 35, y1: 48, x2: 37, y2: 57, r1: 3, r2: 2.8, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 29, y1: 48, x2: 27, y2: 57, r1: 3, r2: 2.8, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 32, y: 42, rx: 9, ry: 10, c: 'body', g: 'body' },
  { t: 'p', pts: [28, 44, 36, 44, 32, 50], c: 'mark', g: 'mark', z: 0.5, face: true },
  { t: 'c', x1: 24, y1: 40, x2: 20, y2: 44, r1: 2, r2: 1.8, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [28, 18, 32, 10, 36, 18], c: 'spike', g: 'horn', z: 1.4 },
  { t: 'e', x: 32, y: 26, rx: 9, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 26, s: 2.6, style: 'angry', iris: '#d83838' },
  { t: 'eye', x: 36, y: 26, s: 2.6, style: 'angry', iris: '#d83838', flip: true },
  { t: 'mouth', x: 32, y: 31, w: 1.8, style: 'open' },
] });

// @PUPITAR
defMon('PUPITAR', { pal: { shell: '#7a90b8', shellD: '#5a70a0', steam: '#e6eef4' }, parts: [
  { t: 'p', pts: [26, 58, 30, 52, 34, 58, 38, 52, 42, 58], c: 'steam', g: 'steam', z: -1, flat: true },
  { t: 'p', pts: [32, 8, 44, 22, 46, 44, 40, 54, 24, 54, 18, 44, 20, 22], c: 'shell', g: 'shell' },
  { t: 'stripe', pts: [20, 38, 44, 38], w: 1.4, c: 'shellD', on: 'shell' },
  { t: 'p', pts: [22, 26, 16, 20, 22, 22], c: 'shell', g: 'finL', z: 0.5 },
  { t: 'p', pts: [42, 26, 48, 20, 42, 22], c: 'shell', g: 'finR', z: 0.5 },
  { t: 'p', pts: [24, 30, 40, 30, 38, 34, 26, 34], c: '#2a2430', g: 'visor', z: 1, face: true },
  { t: 'e', x: 28, y: 32, rx: 1.4, ry: 1, c: '#d83838', g: 'eyeL', z: 1.1, face: true },
  { t: 'e', x: 36, y: 32, rx: 1.4, ry: 1, c: '#d83838', g: 'eyeR', z: 1.1, face: true },
] });

// @TYRANITAR
defMon('TYRANITAR', { pal: { body: '#6a9a58', belly: '#b8c8a0', plate: '#4a7a8a', spike: '#6a9a58', mark: '#4a7a8a' }, parts: [
  { t: 'c', x1: 42, y1: 50, x2: 60, y2: 54, r1: 5, r2: 2.4, c: 'body', g: 'tail', z: -1 },
  { t: 'p', pts: [40, 26, 46, 16, 48, 28], c: 'spike', g: 'backSpike1', z: -0.5 },
  { t: 'p', pts: [42, 34, 50, 26, 50, 38], c: 'spike', g: 'backSpike2', z: -0.5 },
  { t: 'c', x1: 38, y1: 50, x2: 40, y2: 57, r1: 4.5, r2: 4, c: 'body', g: 'legR', z: -0.5 },
  { t: 'c', x1: 28, y1: 50, x2: 26, y2: 57, r1: 4.5, r2: 4, c: 'body', g: 'legL', z: 0.5 },
  { t: 'e', x: 34, y: 40, rx: 12, ry: 14, c: 'body', g: 'body' },
  { t: 'spot', x: 30, y: 44, rx: 6, ry: 9, c: 'belly', on: 'body' },
  { t: 'p', pts: [26, 36, 34, 36, 30, 42], c: 'mark', g: 'mark', z: 0.5, face: true },
  { t: 'c', x1: 24, y1: 36, x2: 16, y2: 42, r1: 3.4, r2: 3, c: 'body', g: 'armL', z: 1 },
  { t: 'p', pts: [14, 42, 10, 40, 12, 46, 16, 46], c: 'belly', g: 'clawL', z: 1.1 },
  { t: 'p', pts: [24, 12, 26, 4, 30, 12], c: 'spike', g: 'horn', z: 1.4 },
  { t: 'e', x: 26, y: 20, rx: 8, ry: 7, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 22, y: 19, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'eye', x: 29, y: 19, s: 2.4, style: 'angry', iris: '#d83838', look: [-1, 0] },
  { t: 'mouth', x: 21, y: 25, w: 2.2, style: 'fang' },
] });

// @LUGIA
defMon('LUGIA', { pal: { body: '#f4f4fa', plate: '#4a6ab0', belly: '#c8d4ec', fin: '#4a6ab0' }, parts: [
  { t: 'c', x1: 40, y1: 48, x2: 58, y2: 54, r1: 4, r2: 1.6, c: 'body', g: 'tail', z: -1 },
  { t: 'p', pts: [54, 50, 62, 44, 60, 54], c: 'fin', g: 'tailFin', z: -1 },
  { t: 'p', pts: [38, 30, 60, 14, 62, 22, 58, 26, 62, 32, 56, 36, 60, 42, 44, 42], c: 'body', g: 'wingR', z: -0.8 },
  { t: 'c', x1: 34, y1: 50, x2: 36, y2: 57, r1: 3, r2: 2.6, c: 'body', g: 'legR', z: -0.5 },
  { t: 'e', x: 34, y: 42, rx: 10, ry: 11, c: 'body', g: 'body' },
  { t: 'spot', x: 31, y: 44, rx: 5, ry: 7, c: 'belly', on: 'body' },
  { t: 'p', pts: [30, 32, 8, 16, 6, 24, 10, 28, 4, 32, 10, 38, 6, 44, 26, 44], c: 'body', g: 'wingL', z: 1 },
  { t: 'stripe', pts: [8, 25, 12, 25], w: 1.4, c: 'plate', on: 'wingL' },
  { t: 'stripe', pts: [7, 33, 11, 33], w: 1.4, c: 'plate', on: 'wingL' },
  { t: 'c', x1: 30, y1: 34, x2: 22, y2: 20, r1: 4, r2: 3.4, c: 'body', g: 'neck', z: 1.2 },
  { t: 'p', pts: [24, 24, 30, 26, 28, 30, 32, 32], c: 'plate', g: 'neckPlates', z: 1.3 },
  { t: 'e', x: 20, y: 16, rx: 7, ry: 5, c: 'body', g: 'head', z: 1.5 },
  { t: 'spot', x: 20, y: 16, rx: 4, ry: 2.4, c: 'plate', on: 'head' },
  { t: 'eye', x: 18, y: 16, s: 2, iris: '#2a2430', look: [-1, 0] },
] });

// @HO_OH
defMon('HO_OH', { pal: { red: '#e04830', gold: '#f0c040', green: '#5cb848', white: '#f4f0e6', beak: '#f0c040' }, parts: [
  { t: 'p', pts: [40, 44, 58, 50, 62, 58, 50, 58, 40, 50], c: 'green', g: 'tail', z: -1 },
  { t: 'p', pts: [42, 46, 56, 44, 60, 50, 46, 50], c: 'gold', g: 'tail2', z: -0.9 },
  { t: 'p', pts: [38, 30, 60, 10, 62, 20, 58, 26, 62, 32, 54, 38, 44, 40], c: 'red', g: 'wingR', z: -0.8 },
  { t: 'spot', x: 56, y: 22, rx: 4, ry: 6, c: 'gold', on: 'wingR' },
  { t: 'c', x1: 34, y1: 50, x2: 34, y2: 57, r1: 1.6, r2: 1.4, c: 'gold', g: 'leg', z: -0.5 },
  { t: 'e', x: 34, y: 42, rx: 10, ry: 10, c: 'red', g: 'body' },
  { t: 'spot', x: 31, y: 44, rx: 5, ry: 6, c: 'white', on: 'body' },
  { t: 'p', pts: [30, 32, 6, 14, 4, 24, 8, 28, 4, 34, 12, 40, 26, 42], c: 'red', g: 'wingL', z: 1 },
  { t: 'spot', x: 9, y: 24, rx: 4, ry: 6, c: 'gold', on: 'wingL' },
  { t: 'p', pts: [28, 16, 34, 6, 36, 10, 38, 4, 38, 18], c: 'gold', g: 'crest', z: 1.4 },
  { t: 'e', x: 28, y: 22, rx: 7, ry: 6, c: 'red', g: 'head', z: 1.5 },
  { t: 'p', pts: [22, 22, 14, 26, 22, 27], c: 'beak', g: 'beak', z: 1.6 },
  { t: 'eye', x: 27, y: 21, s: 2.2, style: 'angry', iris: '#2a2430', look: [-1, 0] },
] });

// @CELEBI
defMon('CELEBI', { pal: { body: '#a8e068', wing: '#e6f4fa', antenna: '#a8e068', dark: '#4a8a3a' }, parts: [
  { t: 'e', x: 44, y: 34, rx: 7, ry: 4, rot: -30, c: 'wing', g: 'wingR', z: -1, flat: true },
  { t: 'e', x: 20, y: 34, rx: 7, ry: 4, rot: 30, c: 'wing', g: 'wingL', z: -1, flat: true },
  { t: 'l', pts: [26, 22, 22, 12, 18, 10], w: 1.4, w2: 1, c: 'antenna', g: 'antL', z: -0.5 },
  { t: 'l', pts: [38, 22, 42, 12, 46, 10], w: 1.4, w2: 1, c: 'antenna', g: 'antR', z: -0.5 },
  { t: 'e', x: 18, y: 10, rx: 2, ry: 2, c: 'dark', g: 'tipL', z: -0.4 },
  { t: 'e', x: 46, y: 10, rx: 2, ry: 2, c: 'dark', g: 'tipR', z: -0.4 },
  { t: 'e', x: 29, y: 52, rx: 2.4, ry: 3, c: 'body', g: 'footL', z: -0.5 },
  { t: 'e', x: 35, y: 52, rx: 2.4, ry: 3, c: 'body', g: 'footR', z: -0.5 },
  { t: 'e', x: 32, y: 42, rx: 6, ry: 8, c: 'body', g: 'body' },
  { t: 'c', x1: 27, y1: 38, x2: 22, y2: 42, r1: 1.6, r2: 1.4, c: 'body', g: 'armL', z: 1 },
  { t: 'c', x1: 37, y1: 38, x2: 42, y2: 42, r1: 1.6, r2: 1.4, c: 'body', g: 'armR', z: 1 },
  { t: 'e', x: 32, y: 27, rx: 9, ry: 8, c: 'body', g: 'head', z: 1.5 },
  { t: 'eye', x: 28, y: 27, s: 3.2, iris: '#3a7ac8' },
  { t: 'eye', x: 36, y: 27, s: 3.2, iris: '#3a7ac8' },
  { t: 'mouth', x: 32, y: 33, w: 1.4, style: 'smile' },
] });
