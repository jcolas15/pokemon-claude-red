# Pokémon sprite authoring guide

Sprites are **not** image files. Each Pokémon is described with geometric primitives and
rasterized into shaded, outlined pixel art by `src/art/pokesprite.js` (read its header comment
for the full primitive reference). Study `src/data/mons/test.js` (Bulbasaur, Charmander,
Squirtle, Pikachu) for the house style before starting.

## Where they live
Each Pokémon is a `G.defMon('SPECIES_CONST', { pal: {...}, parts: [...] });` call in `src/data/mons/*.js`
(e.g. `src/data/mons/031-060.js`). Species constants are the ones in `G.DATA.species`
(e.g. `NIDORAN_M`, `MR_MIME`, `FARFETCHD`).

## Rules
- Canvas is 64×64, y points down. **Front sprites face LEFT** (3/4 view, head toward the left edge)
  like GBA-era sprites. The ground line is y≈58–60; flying/floating Pokémon hover a few pixels higher.
- Size communicates scale: tiny Pokémon (Caterpie, Diglett) ~24–32 px tall; small ~34–42;
  medium ~44–52; large/legendary 56–62 and may nearly fill the canvas. Keep a 1px margin for the outline.
- Use the official colour schemes. Put colours in `pal` and reference them by key.
- Build recognisable silhouettes first (body/head/limbs/tail/ears/wings), then details
  (spots, stripes, belly patches with `t:'spot'`/`t:'stripe'` + `on:'<group>'`), then eyes/mouth.
- Groups (`g`) decide where dark internal lines appear: parts in the same group blend seamlessly;
  different groups get a line where the front one overlaps. `z` controls draw order.
- Back view is automatic (mirrored, enlarged, cropped). Mark cheeks, bellies, face markings and
  anything only visible from the front with `face:true`; add back-only details (shell patterns,
  back stripes, spines) with `backOnly:true`; use `bz` to reorder parts for the back view
  (e.g. a shell that should cover the body from behind).
- Eyes: `t:'eye'` with `s` (size ~2–4), `style` (round, angry, sleepy, closed, happy, sad, dot),
  `iris` colour, `look` direction, `sclera:false` for solid dark eyes, `flip:true` mirrors angry/sad brows.
  Mouths: `t:'mouth'` styles smile, open, fang, line, frown, tongue.
- Flat-coloured parts (flames, energy, crystals) can use `flat:true`; shiny parts `gloss:true`.

## Checking your work
Render a sheet and look at it; iterate until every sprite is clearly the right Pokémon, well proportioned
and attractive at 1× game scale:

    node tools/monsheet.js sheet.png BULBASAUR IVYSAUR VENUSAUR

Each row shows front (64px), back, and the 32px party icon. Check at least: silhouette reads
correctly, colours right, faces left, nothing clipped at canvas edges, back view sensible,
evolution lines look related and scale up in size.
