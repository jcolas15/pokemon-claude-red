# Label notes (src/data/labels_interior.js)

Labels are one per quad. "q<N>" below means the quad index in `G.MAPDATA.quads[<tileset>]`.
Collision still comes from tile ids. Several quads are shared by maps that show different things,
so a few maps need per-map overrides (see "Shared quads").

## Floors per tileset
- floor (wood): house q4, interior q10/q8/q11/q12, reds_house q4.
- floor_tile: pokecenter, gate/museum, facility (Silph, Mansion, Rocket, Power Plant), lab, club, lobby q2 (big checker),
  ship q1 (cabins, also CeruleanBadgeHouse/FuchsiaGoodRodHouse), underground, gym q12 (square slabs:
  HallOfFame, Lorelei, Cerulean Gym walkways).
- floor_carpet: lobby q5 (Celadon Mart crosshatch), mansion q1/q23 (apartment rooms).
- floor_stone: gym q1 (striped gym floor), gym q14, mansion q17 (hallways and roof).
- floor_tower: cemetery q1. ship_floor: ship q12/q13 (corridors and the SSAnneBow open deck). deck: ship q38-40 (bow edge).
- Outdoor-style: forest q0 = path (white dotted ground), forest q53-56 = grass (checker patch), plateau q10 path,
  q9/q18 path_tufts, q14/q19 grass, gym q6/7/9 = grass (Celadon Gym garden).

## Typical multi-cell objects (w x h in cells)
- Plants 1x2 (leaves over pot). Bookshelves and cabinets are 1x2, often in rows. Beds are 1x2 (ship beds 1x2 or 1x3).
- Tables: 2x2 in houses, Red's house, lobby (octagonal diner/roof tables) and Celadon apartments. Chief's house is 4x2.
  Ship kitchen tables are 2x6 (vertical). Interior (Fan Club/Silph 11F) has a 4x4 octagon: its corners are cut,
  and q38/q42 are floor. Oak's Lab and HallOfFame table legs (gym q27/28/41/42/44) are walkable but labelled table.
- PC desks: two `pc` cells side by side, a `chair` below-left and a `desk` (drawer) below-right. This covers interior q13/15/14/16,
  lab q21/22/23/24 and mansion q29/30/31/32. Red's PC is 1x2 `pc`. The pokecenter PC is 1x2 (q24/q25, keyboard walkable).
- Heal machine 2x2 (pokecenter q12/14 over q13/16 or q18). The second machine in the pokecenter top wall uses the same art.
- Vending machine 1x2 (lobby q41 over q20). Q20 is a generic machine base, also under the Mart1F payphone (q19)
  and the Mart3F display TVs (q29).
- Statues are 1x2: cemetery q3/4, facility q8/9 (Mansion switch statues and the Cinnabar gym statue),
  gym q3/4 (gym_statue), forest q30/31, gate q52/55 over q53. On plateau the statue (q2/q13) sits on a `pillar`.
- Museum1F fossil exhibits are 4x2: the `fossil` row (gate q7,9,10,13) over the `display` base (q8,11,12,14). Museum2F has the space
  shuttle (3x2 display) and the moon stone (4x2 display, which reuses the same base row).
- The Bill's House cell separator uses `machine` in rows 1-2 (two cylinders joined by a pipe). The wall row above it is `wall`.
- Game Corner slot machines are 2-wide columns, 7 tall (lobby q46 top, q4 x4, q47, q48) with chair columns between them.
- The forest big tree is 2x2 (q2 TL, q3 TR, q4 BL, q5 BR, all `tree`). Adjacent big trees touch, so use quad position, not label runs.
- Safari rest house (forest) is 3x2: roof_house q33/34/37 over wall q35 / door q36 / window q38 / wall q39.
- VermilionDock SS Anne (ship_port) is 8x3 at cells (10..17, 3..5). The top rows are `deck` and the hull cells are `ship_wall`. Draw it as one boat.
- The interior sofa (bench q21/22/25 over q23/24/26) is 3x2 and straddles the wall line. The pokecenter bench is 1x2 (q5/q7), and
  the tiles include a girl sitting on it.

## Shared quads (need per-map override)
- lobby q4 `counter`: in GameCorner it is the body of the slot machines, so draw it as slots there.
- lobby q47 `slots`: in RocketHideoutElevator it is the side wall of the elevator car.
- lobby q36 `counter`: on CeladonMartRoof it is the cap of a vending machine.
- mansion q6/7/8 `table`: on CeladonMansionRoof it is the top edge of the roof house (q38-40 roof_flat, q41 wall, q18 door, q42 sign plaque).
- gym q1 `floor_stone`: FightingDojo (map tsc DOJO) should use floor_dojo. OaksLab also uses the gym tileset.
- gym q24 `floor_stone`: these are the Fuchsia Gym invisible walls. Draw them as floor (they block through collision).
- ship q0 `ship_wall`, q2 door, q1 floor: also used in the land houses CeruleanBadgeHouse/FuchsiaGoodRodHouse.
- cemetery q7 `wall` (Pokemon Tower wall blocks) uses the same art as facility q17 `crate`.

## Odd quads
- cavern: q13 cave_floor (dark), q31 cave_floor2 (Victory Road), q8/q1 cave_high (raised platforms, walkable).
  q0/2/3/4/5/6/10/18/19 cave_ledge (platform rims), q7/11/14/15/17/23/24 cave_wall (rock faces).
  q12 cave_rock is the round boulder that forms the walls of Cerulean Cave, Rock Tunnel and Victory Road. q20 is rubble, and q28 is the square
  block in MtMoonB2F and Victory Road. q16 `stairs_up` are in-map steps up to platforms, not warps. q9 ladder_up / q22 ladder_down.
  q25 `mat` is the cave exit strip. q29 `hole` is a Seafoam hole. q30 `teleport` is the Victory Road boulder floor switch, so draw a round plate.
  q27 void is the black MtMoonB1F filler. q21 water. q26 sign.
- cemetery q12 `floor_tile` is the Pokemon Tower 5F purified zone. q6 void is the grey outside of the tower.
- facility: q16 `cave_rock` is rubble (Mansion, Power Plant). q17 `crate` covers the generic blocks (Rocket Hideout maze walls, Power Plant
  rows, Silph 1F planter border). q49 `flowers` is the Silph 1F planter. q31 `hole` is the Mansion 2F/3F collapsed floor, edged by
  `railing` q30/32/33. q4 (wall and machine top) over q5 forms machines against walls. q29 is the top of the tall machines.
  q12/13/25 exit mats. q44 elevator door. q43 Silph stairs in the wall.
- gate: q47 `machine` is the binoculars at the 2F windows (`window_big` q41-46). q16 trash. q37 are the gatehouse wall blocks.
  q54 is the door in the back wall of Route2/22/forest gates.
- house: q22 `door` is the hole in the CeruleanTrashedHouse wall (exit warp). q23-32 are floor with debris,
  q28 a knocked-over chair, q34/35 a fallen potted plant, q33 a broken table corner. q17/18 blackboard (ViridianSchoolHouse).
- lab: q29 `sink` (row of faucets, Metronome room). q20 is the floor with the cable/grate pattern in front of the Fossil room machines.
  q42-45 is the Warden's display case (2x2). q46 `cave_rock` is the rocks around the Warden's rare candy.
- lobby: q29 tv and q30 console (Mart 3F SNES counters, with counter q31-34 below). q19 is the Mart1F payphone (`vending`).
  q23/24/26/27 goods shelves. q38 void and q39/44/40 railing are the edges and fences of the Celadon roof. q42/43 is the upper wall. q49 wall_deco is the prize room.
- mansion q3/q5 `display` is a cabinet with a figurine. q2/q21/q28/q4 are plain cabinets.
- plateau is architectural: q1/3/4 roof_flat (terrace tops and the League roof), q6/8/16 wall faces, q0/12 white wall ridges,
  q5/7/15/17 pillars, q11 door (League and Victory Road entrances), q22 cave_rock, q21 tree2 (small bush on walls),
  q24-29 water, q30-35 the Route 22 gate roof seen from Route 23.
- pokecenter: q11/q20 are the light pillars between counter sections (q20 is the dark base in the counter row). q19 `door` are the dark
  doorways (Indigo lobby to Lorelei). q26/27 `shelf` is the "SALE" freezer, and q28/29 `display` is the glass case.
- ship: q41 `barrel` is the rope coil / bollard on the SSAnneBow. q37 railing is the bow gunwale blocks. q36 water. q9 trash.
  q42/43 is the captain's chair, q46-50 the captain's desk with a book, q44/45 bookshelf. q59-62 is the 2x2 stove burner in the kitchen counter row.
  q10 void is the black outside the hull, with the white-edged borders labelled ship_wall. q16 porthole. q25 door (corridor doorways).
- ship_port: q5/6 `machine` is the truck (top right). q2/7/8 `cliff` are the quay walls around the dock basin. q4 bridge is the gangway.
  q0 crate stacks. q1 pavement.
- underground q8 `void` is filler: the last block row of UndergroundPathNorthSouth.blk is garbage.
- forest q6/7, q20/21, q26/27 and q59/60 are `mat`: ground arrows (up, left, right, down) marking the Safari area exits.

## Where special labels appear
spinner_* (facility q36-40 in RocketHideoutB2F/B3F; gym q51-55 in ViridianGym). teleport (facility q41 in SaffronGym/Silph;
interior q47 in SilphCo11F). barrier (gym q45/46/49/50, VermilionGym electric gate). slots (GameCorner). heal_machine
(pokecenters). grave (Pokemon Tower). fossil (Museum1F). stove (SSAnneKitchen). sink (CinnabarLabMetronomeRoom).
board (ViridianSchoolHouse). cut_tree (CeladonGym). gym_statue (gyms and Elite Four rooms, gym q3/4).
Unused labels: floor_dojo (see the Dojo override), fridge, lamp, sand, ledge_d/l/r, cave_door.
