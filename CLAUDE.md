# Claude Red — project rules

## Next.js 16

This is Next.js 16 (App Router, Turbopack). APIs and conventions differ from older versions: read the relevant guide
in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices. Package manager: pnpm.

| Command | What it does |
|---|---|
| `pnpm dev` / `pnpm dev:lan` | Guide data, then the dev server on :8784 (`dev:lan` is reachable from a phone on the Wi-Fi) |
| `pnpm build` | Guide data, then the production build |
| `pnpm typecheck`, `pnpm lint` | Minimum bar before calling work done, together with a clean build |
| `node tools/fuzzbattle.js`, `node tools/talkfuzz.js`, `node -r ./tools/pathaudit.js tools/stepfuzz.js`, `node tools/warpcheck.js` | Headless game tests; compare against the previous commit when behavior might change |

## Keep the strategy guide current

**Every change that affects what a player sees or does must also update the strategy guide in the same piece of work.**
That covers Pokémon, moves, types, items, trainers, wild encounters, gifts, trades, legendaries, story flow, menus,
controls, saving, and extras like the Battle Tower or Social Zone.

- The guide is the `/guide` route: `src/app/guide/`. Facts come from the game itself: `tools/guide-data.js` loads the
  engine headlessly and writes `src/generated/guide-data.json` (git-ignored) before every dev run and build.
- Prefer exposing new facts through the game data and `tools/guide-data.js` over writing them by hand in the page.
  Only advice and directions are hand-written.
- A feature iteration is not done until the guide reflects it. Say in the wrap-up what changed in the guide.

**Why:** the owner plays on a phone and uses the guide as the reference for this specific build, which diverges from
the original games (Gen 2 Pokémon under Gen 1 rules, roaming legendaries, a second Elite Four).

## Engine

The engine (`src/engine/`) is plain JavaScript that adds to a global `G`; `src/engine/entry.ts` is the only place the
load order is written, and `tools/headless.js` reads it too. It moves to TypeScript modules one piece at a time
(`docs/nextjs-migration.md`). Keep the headless tests green through every step.

## Gen 2 work

The plan and progress live in `docs/gen2-integration-plan.md`. Mark phases done there as they land.
