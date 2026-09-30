# Moving Claude Red to Next.js

How the game became a Next.js app, and how the engine moves to TypeScript one file at a time.

## Step 1: the Next.js shell (done)

| Piece | Where |
|---|---|
| App | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4, ESLint, Vitest, pnpm; conventions follow `../jandj_bets` |
| Game page `/` | `src/app/page.tsx` → `src/components/game/GameScreen.tsx`: renders the canvas, controller and sign-in gate once, then imports the engine after mount (it needs the browser) |
| Engine | `src/engine/` (moved from `src/`); `entry.ts` = `platform.ts` (global G, `NEXT_PUBLIC_SUPABASE_*` env, Supabase client from npm) + `engine.ts` (the ordered engine imports) |
| Strategy guide `/guide` | `src/app/guide/`, rendered from `src/generated/guide-data.json`, which `tools/guide-data.js` builds from the game before every dev run and build |
| Link preview | `public/preview.png`, rendered by `pnpm preview:image` |
| Tests | `tools/headless.js` bundles `src/engine/engine.ts` with esbuild and runs it in a Node VM, so JS and TS engine files are tested alike |

Engine change needed for the shell: `main.js` starts immediately when the page has already loaded (the engine is
imported after the load event).

## Step 2: engine files to TypeScript (in progress)

### Recipe for one file

1. `git mv foo.js foo.ts` so history follows the file.
2. Replace the `(function (G) { ... })(window.G)` wrapper with a module: typed functions and classes as named exports.
3. Keep publishing the same object on the global, e.g. `game().gfx = { ... }` (`src/engine/global.ts`), so the
   files not yet converted keep working. Remove that line once nothing reads it.
4. In `src/engine/engine.ts`, change the import to the extensionless path (`import './core/gfx';`).
5. Verify, in this order: `pnpm exec tsc --noEmit`, `pnpm lint`, the headless tests, a pixel comparison against the
   previous commit for anything that draws, and `pnpm build`.

### Done

| File | Notes |
|---|---|
| `core/gfx.ts` | `Color`, `Surface`, `BlitOptions` and every drawing helper exported; still published as `G.gfx`. Pixel-identical on six reference scenes |
| `core/font.ts` | Glyph tables typed; `draw`, `measure`, `wrap`, `drawSmall` exported; still `G.font` |
| `core/input.ts` | `Button` type, button state, pointer and `injected` (headless input) exported; still `G.input` / `G.pointer` |
| `core/engine.ts` | `Scene`, `Script`, `Task` types; the loop imports `gfx` and `input` directly and reads its hooks through the typed `GameGlobal` |
| `art/palette.ts` | `PAL`, `Ramp`, `NoiseTex`, `noise`, `rand` exported; still `G.PAL` / `G.noise` / `G.rand` |
| `art/logo.ts` | `titleLogo()` exported; still `G.titleLogo` |

### Order for the rest

Leaves first, so each converted file can import typed modules instead of reading `G`:

1. `core/` — done except `audio.js`, which stays plain JavaScript on purpose: sound is low priority for this build,
   and it works unchanged through the `G.audio` / `G.sfx` globals
2. `art/` — `palette` and `logo` done; the other 11 renderers next (they also read `G.CAST`, `G.DATA` and each other)
3. `game/` — in dependency order: `map`, `maprender`, `ui`, `pokemon`, `battle`, then the screens
4. `scripts/` — story scripts last; they read the most of `G`
5. `data/` — generated files: switch the converters (`tools/convert_*.js`) to emit typed modules

Files that read other parts of `G` go through the `GameGlobal` interface in `src/engine/global.ts`: add a typed
entry there for each hook a converted module reads, instead of casting at every call site.
