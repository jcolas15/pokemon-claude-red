# Tileset labeling guide

Maps come from the pokered disassembly. Every map is a grid of 16x16 cells; each distinct cell
pattern of a tileset (a "quad" of four 8x8 tiles) needs ONE semantic label so the remake's own
renderer can draw it. Collision is handled separately (from tile ids) — labels are purely visual.
The overworld tileset is already done (`G.LABELS.overworld` in src/data/labels.js — see it for style).

`src/data/labels_interior.js` holds the labels for every other tileset file name
(cavern, cemetery, club, facility, forest, gate, gym, house, interior, lab, lobby, mansion,
plateau, pokecenter, reds_house, ship, ship_port, underground):

    G.LABELS.cavern = [ 'cave_floor', 'cave_wall', ... ];   // index = quad index in G.MAPDATA.quads.cavern

Arrays must have exactly as many entries as `G.MAPDATA.quads[<tileset>]`.

## Checking labels
Render any map with the game's own renderer and look at it: `node tools/rendermap.js <MapName> out.png [scale]`.

## Vocabulary (use only these)
Floors (walkable): floor (wood boards), floor_tile (tiled: centers, marts, labs, offices, gates),
floor_carpet, floor_stone (stone/concrete: gyms, museum, dungeons), floor_dojo, floor_tower,
mat (exit doormat / warp carpet), stairs_up, stairs_down, ladder_up, ladder_down, hole.
Walls/structure: wall (back wall), wall_window, wall_deco (poster/picture/map/clock on a wall),
void (black outside area), pillar, railing, door (interior door, elevator door), window_big.
Furniture/objects (multi-cell objects are detected by adjacent cells with the same label):
table, chair, bed, tv, console, pc, bookshelf, shelf (shop shelves/goods), cabinet, plant,
counter, heal_machine, display (glass case/exhibit), desk, sink, stove, fridge, machine
(lab/industrial machine, generator, computer bank), statue, gym_statue, trash, crate, barrel,
board (blackboard/notice board), vending, slots (slot machine), lamp, bench, fossil, grave.
Mechanics: spinner_up, spinner_down, spinner_left, spinner_right, spinner_stop, teleport,
barrier (electric barrier), water.
Caves: cave_floor, cave_floor2 (alternate/darker floor), cave_high (raised platform floor),
cave_wall, cave_rock (rock/boulder obstacle), cave_ledge (elevation lip).
Ships: ship_floor, ship_wall, porthole, deck.
Outdoor-style tilesets (forest, plateau, ship_port, parts of others) may use the overworld labels:
grass, tall_grass, tree, tree2, path, path_tufts, sand, water, fence, sign, flowers, cut_tree,
ledge_d, ledge_l, ledge_r, cliff, cliff_top, bridge, stairs_wood, cave_door, pavement,
roof_house, roof_flat, wall, window, door.

Pick the closest label for mixed quads (dominant object wins over floor). Notes the renderer relies on
(typical multi-cell furniture sizes, odd quads, which maps use which special labels) are in
[tile-label-notes.md](tile-label-notes.md).
