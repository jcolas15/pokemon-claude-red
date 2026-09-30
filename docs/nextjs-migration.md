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

### Where it stands

Every engine file is a TypeScript ES module except `core/audio.js`, which stays plain JavaScript on purpose (sound is
low priority for this build). Files come in two kinds:

- **Typed** (strict, linted): `global`, `platform`, `engine`, `entry`, `core/gfx`, `core/font`, `core/input`,
  `core/engine`, `art/palette`, `art/logo`.
- **Legacy** (everything else): moved into modules by a one-off conversion that removed the old
  `(function (G) { ... })(window.G)` wrappers. They start with `// @ts-nocheck`, read and publish through
  `const G = game()`, and are skipped by ESLint. `eslint.config.mjs` lists the typed files explicitly, so that list is
  the progress tracker. The generated data files (`maps`, `music`, `pokedata`, `gen2`) come out of the converters in
  this same form.

Verified after the conversion: pixel-identical reference scenes, identical fuzzer results, every Gen 2 phase test, a
clean type-check (about 2 s), lint and build.

### Typing a legacy file

1. Remove `// @ts-nocheck` and add types until `pnpm exec tsc --noEmit` is clean. Prefer importing typed modules
   (`import { Surface } from '../core/gfx'`) over reading them from `G`.
2. Hooks the file reads from `G` that aren't typed yet go into the `GameGlobal` interface in `src/engine/global.ts`.
3. Add the file to the un-ignore list in `eslint.config.mjs` and make `pnpm lint` clean.
4. Verify: type-check, lint, the headless tests, a pixel comparison against the previous commit for anything that
   draws, and `pnpm build`.

Once no file reads a given part of `G`, stop publishing it there.

### Typed so far

| File | Notes |
|---|---|
| `core/gfx.ts` | `Color`, `Surface`, `BlitOptions` and every drawing helper exported; still published as `G.gfx`. Pixel-identical on six reference scenes |
| `core/font.ts` | Glyph tables typed; `draw`, `measure`, `wrap`, `drawSmall` exported; still `G.font` |
| `core/input.ts` | `Button` type, button state, pointer and `injected` (headless input) exported; still `G.input` / `G.pointer` |
| `core/engine.ts` | `Scene`, `Script`, `Task` types; the loop imports `gfx` and `input` directly and reads its hooks through the typed `GameGlobal` |
| `art/palette.ts` | `PAL`, `Ramp`, `NoiseTex`, `noise`, `rand` exported; still `G.PAL` / `G.noise` / `G.rand` |
| `art/logo.ts` | `titleLogo()` exported; still `G.titleLogo` |

### Suggested order for typing the rest

Leaves first: `art/` renderers, then `game/` in dependency order (`map`, `maprender`, `ui`, `pokemon`, `battle`, then
the screens), then the story `scripts/`. For generated data, give the converters typed output with a schema (species,
moves, maps) instead of `@ts-nocheck`.
