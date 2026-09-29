<p align="center">
  <img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/title.png" width="760" alt="Pokémon Claude Red title screen">
</p>

<h1 align="center">Pokémon Claude Red</h1>

<p align="center">
  <b>Pokémon Red, rebuilt from raw pixels by Claude Opus 5.5.</b><br>
  Every sprite, tile, building, battle effect and song is drawn or played by code.<br>
  There is not a single image file in the game.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/image_files-0-e08a5f?style=flat-square" alt="0 image files">
  <img src="https://img.shields.io/badge/built_with-Claude_Opus_5.5-d97757?style=flat-square" alt="Built with Claude Opus 5.5">
  <img src="https://img.shields.io/badge/dependencies-none-5fd3b0?style=flat-square" alt="No dependencies">
  <img src="https://img.shields.io/badge/runs_in-any_browser-4a90d8?style=flat-square" alt="Runs in any browser">
  <img src="https://img.shields.io/badge/phones-Game_Boy_controls-8a83a8?style=flat-square" alt="Phone controls">
</p>

<p align="center"><a href="https://claudered.dev"><b>▶ Play it now at claudered.dev</b></a></p>

---

## The prompt

The whole project started from one message typed into [Claude Code](https://claude.com/claude-code):

> using only pixels directly remake a beautiful pokemon red remake but with better graphics, environments and vfx. visualise everything perfectly as pixel art using raw pixels. absolute pixel art perfection. keep the story exactly as pokemon red (research on web for all dialogue etc)

Everything in this repository grew from that sentence, followed by a few days of playing it and asking for fixes.

## Screenshots

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/pallet.png" alt="Pallet Town"></td>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/battle-flamethrower.png" alt="Charizard uses Flamethrower"></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/cerulean.png" alt="Cerulean City"></td>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/battle-thunderbolt.png" alt="Pikachu uses Thunderbolt"></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/celadon-night.png" alt="Celadon City at night"></td>
    <td><img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/missingno.png" alt="A wild MISSINGNO. appeared"></td>
  </tr>
</table>

<p align="center">
  <img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/pokemon-151.png" width="760" alt="All 151 Pokémon, drawn from shapes">
  <br><sub>All 151 Pokémon. Each one is a list of ellipses, polygons and curves that the game rasterises, shades and outlines at runtime.</sub>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/phone-portrait.png" height="420" alt="Game Boy controls on a phone">
  &nbsp;
  <img src="https://raw.githubusercontent.com/levy-street/pokemon-claude-red/media/screens/phone-landscape.png" height="195" alt="GBA-style controls in landscape">
  <br><sub>On phones: Game Boy layout when held upright, GBA layout when turned sideways.</sub>
</p>

<sub>Screenshots are rendered by the game itself and live on the <a href="https://github.com/levy-street/pokemon-claude-red/tree/media"><code>media</code></a> branch, so <code>main</code> stays 100% code.</sub>

## Play

Play it in your browser at **[claudered.dev](https://claudered.dev)**, on a computer or a phone.

To run it yourself, there's no install and no build step. Clone the repo and open `index.html` in a browser.

```sh
git clone https://github.com/levy-street/pokemon-claude-red.git
cd pokemon-claude-red
open index.html            # or double-click it
```

With `src/config.js` left empty, the game saves to the browser only, with no sign-in. Filling it in turns on Google
sign-in and cloud saves (see [Hosting](#hosting)); the page then has to be served over http rather than opened as a file:

```sh
python3 -m http.server 8784   # http://localhost:8784
```

### Controls

| | Keyboard | Touch | Gamepad |
|---|---|---|---|
| Move / navigate | Arrow keys or WASD | D-pad, or tap a tile to walk there | D-pad / left stick |
| A: talk, confirm | Z, J or Space | A, or tap a person, sign or menu item | A |
| B: cancel, hold to run | X, K, Backspace or Esc | B | B |
| START: menu | Enter | START | Start |
| SELECT | Shift or C | SELECT | Select |

On a computer, the mouse also works: click to walk or pick menu entries, right-click for B or the START menu, and scroll lists with the wheel.
Progress saves to the browser. With Supabase set up, every SAVE also keeps a copy in the cloud for the signed-in player, so the game survives in-app browsers that wipe storage and can move between devices.

## What's in it

- **The complete Kanto story**: all 224 maps, every trainer, the eight gyms, Team Rocket, Silph Co., the Elite Four, the
  Champion and Cerulean Cave, with Red's event order and gating. All ~2,500 lines of dialogue follow the original
  beat for beat, rewritten in new words.
- **Every pixel is code.**
  - The game draws into a 320×180 framebuffer (`Uint32Array`), then scales it up with crisp nearest-neighbour pixels.
  - Each map cell has a semantic label ("tall grass", "roof", "bookshelf"), and a procedural painter draws it with shading and texture.
  - Buildings are painted as whole objects with roofs, windows, doors and shadows.
  - There's a day/night cycle with lit windows, fireflies and flickering torches.
  - Every one of the 165 moves has its own animation.
- **151 Pokémon from shapes.** A small drawing language (ellipses, polygons, spots, stripes, eyes) is rasterised into
  outlined, shaded pixel art, and back sprites and party icons are derived from the same description.
- **The original music, re-voiced.** The note data of all 52 songs is converted from the disassembly. A sequencer that
  keeps the Game Boy's exact frame timing plays it through new Web Audio instruments: chorused pulse leads, a wave
  bass with a sub layer, and noise drums with body.
- **A character customiser**: hair, hats, skin, clothes and bag colours, carried through every sprite and portrait.
- **Social Zone**, entered through any Pokémon Center's Cable Club:
  - a level-50 Battle Tower;
  - link battles and trades through shareable links;
  - a two-player versus mode.
- **Who's That Pokémon?** A daily and endless silhouette quiz.
- **Share cards**: every badge, capture, evolution and Hall of Fame entry can become a pixel-art card or a link.
- **Classic glitches, recreated from how the original code works:**
  - [MissingNo.](#missingno) with its +128 item quantity and Hall of Fame corruption;
  - the [Mew trick](#the-mew-trick).
- **Easter eggs**: the world has opinions about AI. Talk to everyone.

### MissingNo.

The old man's catching demo in Viridian City backs your name up into the memory that holds the area's wild Pokémon
list. Only maps that have grass encounters overwrite that list. The shore squares just east of Cinnabar Island take
their encounter rate from the water, but their Pokémon list from that leftover memory.

1. Watch the old man's demo.
2. Fly to Cinnabar without walking through any grass or caves.
3. Surf up and down the east coast.

The letters of your name, read as level/species bytes, decide what appears: MISSINGNO., 'M, and sometimes a
Lv 132 Mewtwo. Meeting MissingNo. adds 128 to the sixth item in your bag.

### The Mew trick

1. Press START mid-step as a far-off trainer spots you, then Fly away. That route's script is left waiting to start
   the battle, and START won't open until you finish a trainer battle.
2. The next battle overwrites the trainer bytes that script will read. Let the Route 25 Youngster's Slowpoke be that
   battle: its Special stat is 21, which is Mew's internal ID.
3. Walk back onto the route. The START menu opens by itself; close it and a wild Lv 7 Mew appears.

## How it's built

```
index.html          the page: canvas, phone controller, sign-in gate, script list
src/core/           framebuffer + drawing primitives, pixel font, input, main loop, audio synth + GB sequencer
src/art/            procedural renderers: terrain, buildings, interiors, characters, Pokémon, battle scenes, VFX
src/data/           maps, species, moves, trainers, music (converted from pokered), dialogue, Pokémon shape files
src/game/           overworld, battles, menus, PC, bag, Pokédex, Social Zone, sharing, cloud saves, glitches
src/scripts/        the story, map by map, following Red's event scripts
tools/              data converters, headless runner, fuzzers, map/sprite/VFX sheet renderers, the site server
docs/               how maps, sprites, dialogue and story scripts are authored
```

It's plain JavaScript loaded with classic `<script>` tags. There are no frameworks and no bundler, and it runs from `file://`.

### Rebuilding the data

Map layouts, collision, warps, trainers, wild encounters, species, moves and the music's note data are converted from
the [pret/pokered](https://github.com/pret/pokered) disassembly. No graphics or original text are taken from it.

```sh
git clone https://github.com/pret/pokered ../pokered
node tools/convert_maps.js  ../pokered
node tools/convert_data.js  ../pokered
node tools/convert_music.js ../pokered
```

### Testing

`tools/headless.js` runs the entire game inside Node's `vm` with no browser, and can save any frame as a PNG. Test
drivers are built on top of it:

| Tool | What it does |
| --- | --- |
| `node tools/talkfuzz.js` | Visits all 224 maps, talks to every NPC and reads every sign (1,000+ conversations), playing out any battles. |
| `node tools/fuzzbattle.js` | Random battles with random species, levels and movesets; reports exceptions and stuck battles. |
| `node -r ./tools/pathaudit.js tools/stepfuzz.js` | Fires every step/enter script on every walkable cell under random story states; flags anyone walking through a wall. |
| `node tools/warpcheck.js` | Walks the warp graph and checks every exit leads back where it came from. |
| `node tools/rendermap.js <Map> out.png` | Renders a whole map. `monsheet.js`, `vfxsheet.js` and `charsheet.js` do the same for Pokémon, move animations and characters. |

### Hosting

`node tools/build_dist.js https://your.site/` writes a static `dist/` (plus a `preview.png` for link previews) that any
web host can serve. Set `CF_BEACON_TOKEN=<site token>` to include Cloudflare Web Analytics, which is cookieless.

#### Sign-in and cloud saves (Supabase)

Players sign in with Google. Anyone can sign in, but only players you approve get past the sign-in screen, and
row-level security keeps each save readable and writable by its owner only. A save is 1-60 KB of JSON, one row per player.

1. In the Supabase SQL editor, run `supabase/schema.sql`. The owner email in it is approved automatically; change it
   there if you play with a different Google account.
2. In Google Cloud Console, create an OAuth client (type *Web application*) with the authorized redirect URI
   `https://<project-ref>.supabase.co/auth/v1/callback`. Paste its client ID and secret into Supabase under
   Authentication > Sign In / Providers > Google.
3. In Supabase under Authentication > URL Configuration, set the Site URL to your Vercel URL and add it (plus
   `http://localhost:8784/` for local testing) to the redirect URLs.
4. Put the project URL and anon key (Project Settings > API) in `src/config.js`.
5. To let someone in, open Table Editor > `players` and set their `approved` to `true`. Until then they see
   "Waiting for the owner to approve you".

On Vercel, import the repo with framework preset *Other*, no build command and the repo root as the output directory.
You can also deploy the `dist/` folder that `node tools/build_dist.js` writes.

## Credits

- Built by **Claude Opus 5.5** in [Claude Code](https://claude.com/claude-code), directed by
  [Levy Street](https://levystreet.com), from September 24 to 27, 2026.
- Maps, trainers, encounters, game data and the music's note data are converted from
  [pret/pokered](https://github.com/pret/pokered). Huge thanks to everyone who worked on it.

## Legal

Pokémon © 1996 Nintendo / Creatures Inc. / GAME FREAK inc. This is a free, non-commercial fan project. It is not
affiliated with or endorsed by Nintendo, The Pokémon Company, GAME FREAK, Creatures Inc., Anthropic or OpenAI.

## Levy Street

Levy Street works at the frontier of **AI × gaming × consumer**. Say hello at [hello@levystreet.com](mailto:hello@levystreet.com).
