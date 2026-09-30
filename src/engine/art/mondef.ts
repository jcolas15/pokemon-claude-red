// Types for POKéMON drawings (the primitive format rasterized by art/pokesprite.ts) and a typed way to register one.
// Coordinates are in a 64x64 space, y down, feet near y 57; front views face left.
import { game } from '../global';

type Common = {
  /** colour: a palette key or '#rrggbb' */
  c?: string;
  /** group: parts sharing a group are outlined and lit as one shape; spots and stripes clip to it */
  g?: string;
  /** draw order (higher is nearer) */
  z?: number;
  /** z for the generated back view */
  bz?: number;
  /** hidden on the back view (eyes, mouth, cheeks) */
  face?: boolean;
  frontOnly?: boolean;
  backOnly?: boolean;
  flat?: boolean;
  gloss?: boolean;
  soft?: boolean;
  line?: boolean;
};
export type Part = Common & (
  | { t: 'e'; x: number; y: number; rx: number; ry: number; rot?: number } // ellipsoid
  | { t: 'c'; x1: number; y1: number; x2: number; y2: number; r1: number; r2: number } // tapered capsule
  | { t: 'p'; pts: number[] } // polygon
  | { t: 'l'; pts: number[]; w: number; w2?: number } // stroke
  | { t: 'eye'; x: number; y: number; s: number; style?: 'round' | 'angry' | 'sleepy' | 'closed' | 'dot' | 'happy' | 'sad'; iris?: string; look?: [number, number]; sclera?: boolean; flip?: boolean }
  | { t: 'mouth'; x: number; y: number; w: number; style?: 'smile' | 'open' | 'fang' | 'line' | 'frown' | 'beak' | 'tongue' }
  | { t: 'spot'; x: number; y: number; rx: number; ry: number; on: string }
  | { t: 'stripe'; pts: number[]; w: number; on: string }
  | { t: 'shine'; x: number; y: number }
);
export type MonDef = { pal?: Record<string, string>; parts: Part[] };

export function defMon(species: string, def: MonDef) {
  (game().defMon as (sp: string, d: MonDef) => void)(species, def);
}
