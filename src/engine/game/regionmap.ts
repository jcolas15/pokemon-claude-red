// The detailed Kanto map: every outdoor map drawn with its real tiles, stitched where the world layout puts it, the gaps
// filled with forest or sea, plus place names and markers read from the game data. tools/kanto-map.js renders the image
// once (public/kanto-map.png, about half a minute); START → MAP and the guide show it with the labels on top.
import { game } from '../global';

type Warp = { x: number; y: number; to: string };
type Hidden = { x: number; y: number; fn: string; arg: string };
type Obj = { id: string; x: number; y: number; mon?: { species: string; level: number } };
type GameMap = { name: string; w: number; h: number; ts: string; world?: { x: number; y: number }; warps: Warp[]; hidden: Hidden[]; objs: Obj[]; label(x: number, y: number): string };
type Surf = { w: number; h: number; data: Uint32Array; clear(c: number): void; rect(x: number, y: number, w: number, h: number, c: number): void };
type Rendered = { s: Surf; up: Surf; W: number; mx: number; my: number };
const G = game() as unknown as {
  MAPDATA: { maps: Record<string, { ts: string }> };
  maps: { getMap(n: string): GameMap };
  mapRender: { build(m: GameMap): Rendered };
  mapDisplayName(m: GameMap): string; speciesName(sp: string): string; itemName(id: string): string;
  gfx: { Surface: new (w: number, h: number) => Surf; hex(c: string): number };
  regionMap: unknown;
};

export type Place = { name: string; x: number; y: number; kind: 'town' | 'route' | 'spot' };
export type Marker = { kind: 'gym' | 'center' | 'mart' | 'cave' | 'legend' | 'item'; x: number; y: number; label: string; map: string; flag?: string };

const OUTDOOR = (n: string) => ['overworld', 'plateau'].includes(G.MAPDATA.maps[n].ts);
const CAVE = /^(MtMoon1F|RockTunnel1F|DiglettsCaveRoute\d+|SeafoamIslands1F|VictoryRoad1F|CeruleanCave1F|PowerPlant|UndergroundPathRoute\d+)$/;
const SPOT = /^(SilphCo1F|PokemonTower1F|GameCorner|SafariZoneGate|PokemonMansion1F|CinnabarLab|Museum1F|FightingDojo|Daycare|BillsHouse|OaksLab|IndigoPlateauLobby|PokemonFanClub|VermilionDock|CeladonMart1F|CeladonMansion1F)$/;
const plain = (n: string) => G.mapDisplayName(G.maps.getMap(n)).replace(/\s*B?\d+F$/, '');

function outdoorMaps() { return Object.keys(G.MAPDATA.maps).filter(OUTDOOR).map(n => G.maps.getMap(n)).filter(m => m.world); }

/** tile extents of the outdoor world */
export function extents() {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const m of outdoorMaps()) { x0 = Math.min(x0, m.world!.x); y0 = Math.min(y0, m.world!.y); x1 = Math.max(x1, m.world!.x + m.w); y1 = Math.max(y1, m.world!.y + m.h); }
  return { x0, y0, w: x1 - x0, h: y1 - y0 };
}

/** for every map, the world tile of the outdoor door that leads into it (outdoor maps map to themselves) */
export function entrances() {
  const at: Record<string, [number, number]> = {}, q: string[] = [];
  for (const m of outdoorMaps()) for (const w of m.warps) {
    if (at[w.to] || OUTDOOR(w.to) || !G.MAPDATA.maps[w.to]) continue;
    at[w.to] = [m.world!.x + w.x, m.world!.y + w.y]; q.push(w.to);
  }
  while (q.length) {
    const n = q.shift()!;
    for (const w of G.maps.getMap(n).warps) if (G.MAPDATA.maps[w.to] && !OUTDOOR(w.to) && !at[w.to]) { at[w.to] = at[n]; q.push(w.to); }
  }
  return at;
}

/** where a map position sits in world tiles: itself when outdoors, else the door leading in */
export function worldPos(map: string, x: number, y: number, doors = entrances()): [number, number] | null {
  const m = G.maps.getMap(map);
  if (m.world && OUTDOOR(map)) return [m.world.x + x, m.world.y + y];
  return doors[map] || null;
}

export function places(): Place[] {
  const out: Place[] = [];
  for (const m of outdoorMaps()) out.push({ name: G.mapDisplayName(m), x: m.world!.x + m.w / 2, y: m.world!.y + m.h / 2, kind: /^Route/.test(m.name) ? 'route' : 'town' });
  for (const m of outdoorMaps()) for (const w of m.warps) if (SPOT.test(w.to) || CAVE.test(w.to)) {
    const name = plain(w.to);
    if (!out.some(p => p.name === name)) out.push({ name, x: m.world!.x + w.x + 0.5, y: m.world!.y + w.y, kind: 'spot' });
  }
  return out;
}

export function markers(): Marker[] {
  const doors = entrances(), out: Marker[] = [];
  for (const m of outdoorMaps()) for (const w of m.warps) {
    const kind = /Gym$/.test(w.to) ? 'gym' : /Pokecenter$/.test(w.to) ? 'center' : /Mart$/.test(w.to) ? 'mart' : CAVE.test(w.to) ? 'cave' : null;
    if (kind) out.push({ kind, x: m.world!.x + w.x, y: m.world!.y + w.y, label: kind === 'center' || kind === 'mart' ? G.mapDisplayName(m) : plain(w.to), map: w.to });
  }
  for (const name of Object.keys(G.MAPDATA.maps)) {
    const m = G.maps.getMap(name);
    for (const o of m.objs) if (o.mon && /^(GEN[23]_|.*(ARTICUNO|ZAPDOS|MOLTRES|MEWTWO|SNORLAX))/.test(o.id)) {
      const p = worldPos(name, o.x, o.y, doors);
      if (p) out.push({ kind: 'legend', x: p[0], y: p[1], label: G.speciesName(o.mon.species) + ' Lv' + o.mon.level, map: name });
    }
    if (OUTDOOR(name) && m.world) for (const h of m.hidden) if (h.fn === 'HiddenItems')
      out.push({ kind: 'item', x: m.world.x + h.x, y: m.world.y + h.y, label: G.itemName(h.arg), map: name, flag: 'HIDDEN_' + name + '_' + h.x + '_' + h.y });
  }
  return out;
}

/** the full image, px pixels per tile (16 / px must be a whole number) */
export function render(px = 4): Surf {
  const ext = extents(), k = 16 / px, W = ext.w * px, H = ext.h * px;
  const out = new G.gfx.Surface(W, H);
  const kind = new Uint8Array(ext.w * ext.h); // 1 a land map's tile, 2 a water route's (mostly water) tile
  let treeLum = Infinity, waterLum = Infinity; const trees: Uint32Array[] = [], waters: Uint32Array[] = [];
  const luma = (c: Uint32Array) => c.reduce((a, v) => a + (v & 255) + ((v >> 8) & 255) + ((v >> 16) & 255), 0);
  const cell = (R: Rendered, cx: number, cy: number) => {
    const c = new Uint32Array(256);
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const i = (R.my * 16 + cy * 16 + y) * R.W + R.mx * 16 + cx * 16 + x, u = R.up.data[i];
      c[y * 16 + x] = (u >>> 24) >= 128 ? u : R.s.data[i];
    }
    return c;
  };
  const put = (tx: number, ty: number, c: Uint32Array) => {
    for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) {
      let r = 0, g = 0, b = 0;
      for (let yy = 0; yy < k; yy++) for (let xx = 0; xx < k; xx++) { const v = c[(y * k + yy) * 16 + x * k + xx]; r += v & 255; g += (v >> 8) & 255; b += (v >> 16) & 255; }
      const n = k * k;
      out.data[(ty * px + y) * W + tx * px + x] = ((255 << 24) | (Math.round(b / n) << 16) | (Math.round(g / n) << 8) | Math.round(r / n)) >>> 0;
    }
  };
  for (const m of outdoorMaps()) {
    const R = G.mapRender.build(m);
    let wetCells = 0; for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) if (m.label(x, y) === 'water') wetCells++;
    const wet = wetCells > m.w * m.h / 2;
    for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
      const tx = m.world!.x - ext.x0 + x, ty = m.world!.y - ext.y0 + y, c = cell(R, x, y);
      kind[ty * ext.w + tx] = wet ? 2 : 1;
      put(tx, ty, c);
    }
    // the darkest 4x4 patches of solid forest and open water, aligned to world parity, to tile the gaps with
    for (let y = 0; y + 4 <= m.h; y += 2) for (let x = 0; x + 4 <= m.w; x += 2) {
      if (((m.world!.x + x) & 1) || ((m.world!.y + y) & 1)) continue;
      let all = true; for (let i = 0; i < 16 && all; i++) all = /^tree2?$/.test(m.label(x + (i % 4), y + (i >> 2)));
      if (!all) continue;
      const patch = Array.from({ length: 16 }, (_, i) => cell(R, x + (i % 4), y + (i >> 2))), lum = patch.reduce((a, c) => a + luma(c), 0);
      if (lum < treeLum) { treeLum = lum; trees.splice(0, 16, ...patch); }
    }
    for (let y = 1; y + 5 <= m.h; y++) for (let x = 1; x + 5 <= m.w; x++) {
      if (((m.world!.x + x) & 3) || ((m.world!.y + y) & 3)) continue;
      let all = true; for (let i = 0; i < 36 && all; i++) all = m.label(x - 1 + (i % 6), y - 1 + Math.floor(i / 6)) === 'water';
      if (!all) continue;
      const patch = Array.from({ length: 16 }, (_, i) => cell(R, x + (i % 4), y + (i >> 2))), lum = patch.reduce((a, c) => a + luma(c), 0);
      if (lum < waterLum) { waterLum = lum; waters.splice(0, 16, ...patch); }
    }
  }
  // gaps are forest, except sea: open coast (nothing mapped below), or an enclosed gap mostly ringed by water routes
  const sea = new Uint8Array(kind.length), seen = new Uint8Array(kind.length);
  for (let tx = 0; tx < ext.w; tx++) for (let ty = ext.h - 1; ty >= 0 && !kind[ty * ext.w + tx]; ty--) sea[ty * ext.w + tx] = 1;
  for (let i0 = 0; i0 < kind.length; i0++) {
    if (kind[i0] || seen[i0]) continue;
    const comp = [i0]; let wet = 0, dry = 0; seen[i0] = 1;
    for (let h = 0; h < comp.length; h++) {
      const i = comp[h], x = i % ext.w, y = (i / ext.w) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy, j = ny * ext.w + nx;
        if (nx < 0 || ny < 0 || nx >= ext.w || ny >= ext.h) continue;
        if (kind[j] === 2) wet++; else if (kind[j] === 1) dry++; else if (!seen[j]) { seen[j] = 1; comp.push(j); }
      }
    }
    if (wet > dry) for (const i of comp) sea[i] = 1;
  }
  for (let ty = 0; ty < ext.h; ty++) for (let tx = 0; tx < ext.w; tx++) {
    if (kind[ty * ext.w + tx]) continue;
    put(tx, ty, (sea[ty * ext.w + tx] && waters.length === 16 ? waters : trees)[((tx + ext.x0) & 3) + ((ty + ext.y0) & 3) * 4]);
  }
  return out;
}

// ---------------- START → MAP: the image panned and zoomed, with names, markers and where you are ----------------
type Input = { pressed: Record<string, boolean>; repeat(b: string): boolean };
type Pointer = { x: number; y: number; inside: boolean; down: boolean; pressed: boolean; consume(): void };
type Font = { drawSmall(s: Surf, t: string, x: number, y: number, c: number, sh?: number): number; measureSmall(t: string): number };
const V = G as unknown as {
  input: Input; pointer?: Pointer; font: Font; frame?: number; sfx?: (n: string) => void;
  state: { map: string; x: number; y: number; flags: Record<string, boolean> }; flag(f: string): boolean;
  engine: { run(scene: object): Generator<unknown, unknown, unknown> };
  gfx: { Surface: new (w: number, h: number) => Surf; hex(c: string): number; shade(c: number, k: number): number };
  regionMapImage?: Surf | null;
};
const PX = 4; // image pixels per tile (tools/kanto-map.js)
const ICON: Record<Marker['kind'], [string, string]> = {
  gym: ['#e8b830', 'GYM'], center: ['#e85060', 'POKEMON CENTER'], mart: ['#4a8ae0', 'POKE MART'], cave: ['#8a6a4a', 'CAVE'], legend: ['#b060e0', 'LEGENDARY'], item: ['#f8f0a0', 'HIDDEN ITEM'],
};

let loading: Promise<void> | null = null;
function loadImage() {
  if (V.regionMapImage !== undefined || loading || typeof Image === 'undefined') return;
  loading = new Promise(res => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d')!; ctx.drawImage(img, 0, 0);
      const surf = new V.gfx.Surface(img.width, img.height);
      surf.data.set(new Uint32Array(ctx.getImageData(0, 0, img.width, img.height).data.buffer));
      V.regionMapImage = surf; res();
    };
    img.onerror = () => { V.regionMapImage = null; res(); };
    img.src = '/kanto-map.png';
  });
}
// half-size copies of the image, so zoomed-out views stay crisp: levels[0] is full size
function halve(src: Surf) {
  const w = src.w >> 1, h = src.h >> 1, out = new V.gfx.Surface(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let r = 0, g = 0, b = 0;
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const v = src.data[(y * 2 + dy) * src.w + x * 2 + dx]; r += v & 255; g += (v >> 8) & 255; b += (v >> 16) & 255; }
    out.data[y * w + x] = ((255 << 24) | ((b >> 2) << 16) | ((g >> 2) << 8) | (r >> 2)) >>> 0;
  }
  return out;
}

export function* openRegionMap() {
  loadImage();
  const ext = extents(), doors = entrances(), pl = places(), mk = markers(), hex = V.gfx.hex, F = V.font;
  const me = worldPos(V.state.map, V.state.x, V.state.y, doors) || [ext.x0 + ext.w / 2, ext.y0 + ext.h / 2];
  const W = 320, H = 180, ZOOMS = [Math.min((H - 24) / (ext.h * PX), W / (ext.w * PX)), 1 / 4, 1 / 2, 1, 2]; // screen pixels per image pixel; the first fits all of Kanto
  let levels: Surf[] = [], zi = 2, labels = 2; // labels: 0 none, 1 towns, 2 everything
  let cx = (me[0] - ext.x0) * PX, cy = (me[1] - ext.y0) * PX; // view centre in image pixels
  let drag: [number, number] | null = null;
  const scene = { opaque: true, t: 0, done: false, update(focused: boolean) {
    this.t++;
    if (!levels.length && V.regionMapImage) { levels = [V.regionMapImage]; while (levels.length < 4) levels.push(halve(levels[levels.length - 1])); }
    if (!focused) return;
    const I = V.input, z = ZOOMS[zi], step = 6 / z;
    if (I.repeat('left')) cx -= step; if (I.repeat('right')) cx += step;
    if (I.repeat('up')) cy -= step; if (I.repeat('down')) cy += step;
    if (I.pressed.a && zi < ZOOMS.length - 1) { zi++; V.sfx?.('cursor'); }
    if (I.pressed.b) { if (zi > 0) { zi--; V.sfx?.('cursor'); } else this.done = true; }
    if (I.pressed.select) { labels = (labels + 2) % 3; V.sfx?.('cursor'); }
    if (I.pressed.start) this.done = true;
    const Pt = V.pointer;
    if (Pt && Pt.down && Pt.inside) { if (drag) { cx -= (Pt.x - drag[0]) / z; cy -= (Pt.y - drag[1]) / z; } drag = [Pt.x, Pt.y]; if (Pt.pressed) Pt.consume(); }
    else drag = null;
    const fitX = ext.w * PX * ZOOMS[zi] <= W, fitY = ext.h * PX * ZOOMS[zi] <= H - 22;
    if (fitY) cy = ext.h * PX / 2 - 0.5 / ZOOMS[zi];
    cx = fitX ? ext.w * PX / 2 : Math.max(0, Math.min(ext.w * PX, cx)); cy = fitY ? ext.h * PX / 2 : Math.max(0, Math.min(ext.h * PX, cy));
  }, draw(s: Surf) {
    s.clear(hex('#1c3a5a'));
    const z = ZOOMS[zi];
    if (!levels.length) { F.drawSmall(s, V.regionMapImage === null ? 'THE MAP COULD NOT BE LOADED' : 'LOADING THE MAP...', 110, 86, hex('#ffffff')); return; }
    const li = z >= 1 ? 0 : Math.round(Math.log2(1 / z)), src = levels[li], k = z * (1 << li); // k: screen px per pixel of src
    const ox = cx * z - W / 2, oy = cy * z - H / 2;
    for (let y = 0; y < H; y++) { const sy = Math.floor((y + oy) / k); if (sy < 0 || sy >= src.h) continue;
      for (let x = 0; x < W; x++) { const sx = Math.floor((x + ox) / k); if (sx >= 0 && sx < src.w) s.data[y * W + x] = src.data[sy * src.w + sx]; } }
    const at = (wx: number, wy: number): [number, number] => [Math.round((wx - ext.x0) * PX * z - ox), Math.round((wy - ext.y0) * PX * z - oy)];
    const dot = (x: number, y: number, r: number, c: number) => { for (let dy = -r - 1; dy <= r + 1; dy++) for (let dx = -r - 1; dx <= r + 1; dx++) if (dx * dx + dy * dy <= (r + 1) * (r + 1)) { const px = x + dx, py = y + dy; if (px >= 0 && py >= 0 && px < W && py < H) s.data[py * W + px] = dx * dx + dy * dy <= r * r ? c : hex('#1b1a2e'); } };
    let near: Marker | null = null, nd = 64;
    for (const m of mk) {
      if (m.kind === 'item' && m.flag && V.flag(m.flag)) continue;
      if (m.kind === 'item' && zi < 3) continue;
      const [x, y] = at(m.x + 0.5, m.y + 0.5);
      if (x < -4 || y < -4 || x > W + 4 || y > H + 4) continue;
      dot(x, y, zi >= 3 ? 2 : 1, hex(ICON[m.kind][0]));
      const d = (x - W / 2) ** 2 + (y - H / 2) ** 2; if (d < nd) { nd = d; near = m; }
    }
    const taken: number[][] = [];
    if (labels) for (const p of pl) {
      if (p.kind !== 'town' && (labels < 2 || zi < (p.kind === 'route' ? 2 : 3))) continue;
      const [x, y] = at(p.x, p.y), w = F.measureSmall(p.name);
      if (x + w / 2 < 0 || x - w / 2 > W || y < 0 || y > H) continue;
      const box = [x - w / 2 - 3, y - 3, x + w / 2 + 3, y + 9];
      if (taken.some(b => b[0] < box[2] && box[0] < b[2] && b[1] < box[3] && box[1] < b[3])) continue;
      taken.push(box);
      s.rect(Math.round(x - w / 2) - 2, y - 2, w + 4, 9, hex(p.kind === 'town' ? '#1b1a2e' : '#2a3a4a'));
      F.drawSmall(s, p.name, Math.round(x - w / 2), y, hex(p.kind === 'town' ? '#ffe890' : '#ffffff'));
    }
    if (Math.floor(this.t / 12) % 2 === 0) { const [x, y] = at(me[0] + 0.5, me[1] + 0.5); dot(x, y, 3, hex('#e04848')); }
    for (let i = -4; i <= 4; i++) if (Math.abs(i) > 1) { s.data[(H / 2) * W + W / 2 + i] = hex('#ffffff'); s.data[(H / 2 + i) * W + W / 2] = hex('#ffffff'); }
    const top = near ? ICON[near.kind][1] + ': ' + near.label : 'KANTO';
    s.rect(0, 0, W, 11, hex('#1b1a2e')); F.drawSmall(s, top, 4, 2, hex('#ffffff'));
    s.rect(0, H - 11, W, 11, hex('#1b1a2e'));
    F.drawSmall(s, 'A ZOOM IN  B ZOOM OUT / CLOSE  SELECT LABELS  DRAG TO MOVE', 4, H - 9, hex('#b8c8e0'));
  } };
  yield* V.engine.run(scene);
}

G.regionMap = { extents, entrances, worldPos, places, markers, render, open: openRegionMap };
