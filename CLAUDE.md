# Claude Red — project rules

## Keep the strategy guide current

**Every change that affects what a player sees or does must also update the strategy guide in the same piece of work.**
That covers Pokémon, moves, types, items, trainers, wild encounters, gifts, trades, legendaries, story flow, menus,
controls, saving, and extras like the Battle Tower or Social Zone.

- Source: `docs/claude-red-strategy-guide.html` (single self-contained page; data is embedded as JSON in its script).
- Published copy: https://claude.ai/artifact/66Jot48TbrV3VjfLAdPvtT — republish from that file after every update so the
  link stays the same.
- Take facts from the game's own data (load it with `tools/headless.js`), not from memory of Pokémon Red/Crystal.
- A feature iteration is not done until the guide reflects it. Say in the wrap-up what changed in the guide.

**Why:** the owner plays on a phone and uses the guide as the reference for this specific build, which diverges from
the original games (Gen 2 Pokémon under Gen 1 rules, roaming legendaries, a second Elite Four).

## Gen 2 work

The plan and progress live in `docs/gen2-integration-plan.md`. Mark phases done there as they land.
