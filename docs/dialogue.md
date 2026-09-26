# Dialogue guide

The remake keeps Pokémon Red's story beat-for-beat, but every line of dialogue is **rewritten in
our own words** (the original script is never reproduced verbatim). Source material: a reference JSON
built from a pokered clone with `node tools/extract_text.js <pokered> text_ref.json` (keys: source file →
label → original text; never committed), plus the original Pokédex entries.

## Output format
Dialogue files (`src/data/text/*.js`) contain `Object.assign(G.TEXT, { ... });` blocks mapping
**every label** of their source files to a paraphrased string, e.g.

    Object.assign(G.TEXT, {
      PalletTownGirlText: "I'm training POKéMON of my own!\fOnce they're strong, they'll look after me!",
    });

For Pokédex text use `Object.assign(G.DEX_TEXT, { BULBASAUR: "..." })` keyed by species constant
(`BULBASAUR`, `NIDORAN_M`, `MR_MIME`, `FARFETCHD` ...), 2–3 short original sentences each, and start
the file with `G.DEX_TEXT = G.DEX_TEXT || {};`.

## Rules
- Preserve meaning, speaker, tone, humour, and every gameplay-relevant fact: directions, hints,
  prices, item/move/Pokémon/place/person names, numbers, yes/no questions (the question must still
  be a question answerable with YES/NO), and who is speaking ("OAK: ...", "{RIVAL}: ...").
- Do NOT copy sentences verbatim. Short functional labels (sign names such as "VIRIDIAN CITY",
  "POKéMON CENTER", item names) may stay as is.
- Keep Red's style: names and key nouns in CAPS (POKéMON, POKéDEX, OAK, BROCK, POTION, HM01),
  friendly and concise. Similar length to the original; no modern references.
- `\f` starts a new text page (use where the original has a paragraph break); lines wrap automatically.
- Keep placeholders exactly: `{PLAYER}`, `{RIVAL}`, and any other `{wSomething}` value placeholders.
  Drop `{PROMPT}`.
- Escape quotes properly; the file must be valid JavaScript (verify with `node -e "global.G={TEXT:{}};require('./<file>')"`
  or similar).
