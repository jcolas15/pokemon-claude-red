"use client";

import { useMemo, useState } from "react";
import { title } from "./parts";
import s from "./guide.module.css";

type Encounter = { name: string; levels: string; pct: number; gen2: boolean };
type Wild = Record<string, { grass?: Encounter[]; water?: Encounter[] }>;
type Row = { label: string; kind: string; levels: string; pct: number | null; gen2?: boolean };

function Rows({ rows }: { rows: Row[] }) {
  return rows.map((r, i) => (
    <div key={i} className={s.row}>
      <span className={s.place}>{r.label}<span className={s.kind}>{r.kind.toUpperCase()}{r.gen2 ? " · GEN 2" : ""}</span></span>
      <span className={s.rowLv}>{r.levels ? "Lv " + r.levels : ""}</span>
      <span className={s.pct}>{r.pct != null ? r.pct + "%" : r.kind ? "—" : ""}</span>
      {r.pct != null && <div className={s.bar}><span style={{ width: Math.min(100, r.pct) + "%" }} /></div>}
    </div>
  ));
}

export default function CatchFinder({ wild, superRod }: { wild: Wild; superRod: Record<string, string[]> }) {
  const [query, setQuery] = useState("Pikachu");
  const [place, setPlace] = useState("");

  const byMon = useMemo(() => {
    const out: Record<string, Row[]> = {};
    for (const [p, kinds] of Object.entries(wild))
      for (const [kind, list] of Object.entries(kinds))
        for (const e of list ?? []) (out[e.name] ??= []).push({ label: title(p), kind, levels: e.levels, pct: e.pct, gen2: e.gen2 });
    for (const [p, mons] of Object.entries(superRod)) for (const n of mons) (out[n] ??= []).push({ label: title(p), kind: "super rod", levels: "", pct: null });
    return out;
  }, [wild, superRod]);
  const names = useMemo(() => Object.keys(byMon).sort(), [byMon]);

  let rows: Row[] | null = null, empty = "Type a name or choose a place.";
  if (place) {
    rows = [];
    for (const [kind, list] of Object.entries(wild[place] ?? {})) for (const e of list ?? []) rows.push({ label: title(e.name), kind, levels: e.levels, pct: e.pct, gen2: e.gen2 });
    for (const n of superRod[place] ?? []) rows.push({ label: title(n), kind: "super rod", levels: "", pct: null });
  } else if (query.trim()) {
    const q = query.trim().toUpperCase(), key = names.find((n) => n === q) ?? names.find((n) => n.startsWith(q));
    if (key) rows = [{ label: title(key), kind: "", levels: "", pct: null }, ...byMon[key].slice().sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))];
    else empty = `No wild encounters for "${query}". It may be a gift, trade, legendary or evolution-only POKéMON.`;
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className={s.finderControls}>
        <label className={s.fld} htmlFor="q">POKéMON
          <input id="q" type="search" list="mon-names" placeholder="e.g. Pikachu" autoComplete="off" value={query}
            onChange={(e) => { setQuery(e.target.value); setPlace(""); }} />
        </label>
        <label className={s.fld} htmlFor="place">PLACE
          <select id="place" value={place} onChange={(e) => { setPlace(e.target.value); setQuery(""); }}>
            <option value="">Choose a route or area…</option>
            {Object.keys(wild).map((p) => <option key={p} value={p}>{title(p)}</option>)}
          </select>
        </label>
      </div>
      <datalist id="mon-names">{names.map((n) => <option key={n} value={title(n)} />)}</datalist>
      <div className={s.results} aria-live="polite">
        {rows ? <Rows rows={rows} /> : <div className={s.empty}>{empty}</div>}
      </div>
    </div>
  );
}
