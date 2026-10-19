"use client";

import Image from "next/image";
import { useState } from "react";
import s from "./guide.module.css";

type Place = { name: string; kind: string; x: number; y: number };
type Marker = { kind: string; label: string; x: number; y: number };
const KINDS: [string, string, string][] = [
  ["gym", "Gyms", "#e8b830"], ["center", "Pokémon Centers", "#e85060"], ["mart", "Poké Marts", "#4a8ae0"],
  ["cave", "Caves and tunnels", "#8a6a4a"], ["legend", "Legendaries and one-offs", "#b060e0"], ["item", "Hidden items", "#f8f0a0"],
];
const ZOOMS = [0.5, 1, 2, 3];

export default function KantoMap({ w, h, places, markers }: { w: number; h: number; places: Place[]; markers: Marker[] }) {
  const [zoom, setZoom] = useState(0);
  const [show, setShow] = useState<Record<string, boolean>>({ gym: true, center: true, mart: false, cave: true, legend: true, item: false });
  const [picked, setPicked] = useState<Marker | null>(null);
  const z = ZOOMS[zoom];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className={s.mapControls}>
        <button type="button" onClick={() => setZoom(Math.max(0, zoom - 1))} disabled={zoom === 0} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setZoom(Math.min(ZOOMS.length - 1, zoom + 1))} disabled={zoom === ZOOMS.length - 1} aria-label="Zoom in">+</button>
        {KINDS.map(([k, label, c]) => (
          <label key={k} className={s.mapToggle}>
            <input type="checkbox" checked={show[k]} onChange={(e) => setShow({ ...show, [k]: e.target.checked })} />
            <span className={s.mapDot} style={{ background: c }} />{label}
          </label>
        ))}
      </div>
      <p className={`${s.muted} ${s.small}`} aria-live="polite">{picked ? `${KINDS.find(([k]) => k === picked.kind)?.[1].replace(/s$/, "")}: ${picked.label}` : "Tap a marker to see what it is. Scroll or drag the map to look around."}</p>
      <div className={s.mapScroll}>
        <div style={{ position: "relative", width: w * z, height: h * z }}>
          <Image src="/kanto-map.png" alt="Detailed map of Kanto: every town and route drawn from the game's own tiles" width={w} height={h} unoptimized
            style={{ width: w * z, height: h * z, imageRendering: "pixelated" }} />
          {markers.filter((m) => show[m.kind]).map((m, i) => (
            <button key={i} type="button" className={s.mapMarker} title={m.label} aria-label={m.label}
              style={{ left: m.x * z, top: m.y * z, background: KINDS.find(([k]) => k === m.kind)?.[2] }} onClick={() => setPicked(m)} />
          ))}
          {places.filter((p) => p.kind === "town" || z >= 1).map((p) => (
            <span key={p.name} className={p.kind === "town" ? s.mapTown : s.mapPlace} style={{ left: p.x * z, top: p.y * z }}>{p.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
