// The global G the plain-JS engine files share. TypeScript modules export their API directly and also publish it on G
// so the files not yet converted keep working (docs/nextjs-migration.md). Hooks that typed modules read from G are
// declared here; everything else stays `unknown` until its module is converted.
import type { Surface } from './core/gfx';

export interface GameGlobal {
  /** frames stepped since boot (core/engine) */
  frame?: number;
  /** runs each step before scripts and scenes (game/share) */
  preStep?: () => void;
  /** draws over the finished frame (game/overworld, game/share) */
  postDraw?: (surf: Surface) => void;
  /** a script task threw (optional; nothing sets it today) */
  onError?: (e: unknown) => void;
  /** touch layouts place the canvas and controller themselves; returns true when it did (game/touchpad) */
  pageLayout?: (canvas: HTMLCanvasElement) => boolean;
  /** re-run the page layout (set by core/engine) */
  relayout?: () => void;
  [key: string]: unknown;
}

declare global {
  interface Window {
    G: GameGlobal;
    HEADLESS?: boolean;
  }
}

export function game(): GameGlobal {
  return (window.G = window.G || {});
}
