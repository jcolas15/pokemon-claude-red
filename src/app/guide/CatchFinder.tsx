"use client";

import { useMemo, useState } from "react";
import { Type, title } from "./parts";
import s from "./guide.module.css";

type Encounter = { name: string; levels: string; pct: number; gen: number };
type Wild = Record<string, { grass?: Encounter[]; water?: Encounter[] }>;
type Row = { label: string; kind: string; levels: string; pct: number | null; gen?: number; mon?: string };
type Evo = { name: string; how: string };
export type CatchMon = { dex: number; gen: number; types: string[]; stats: Record<string, number>; from: Evo[]; to: Evo[]; moves: { lv: number; name: string; type: string }[] };

function Rows({ rows, onPick }: { rows: Row[]; onPick?: (mon: string) => void }) {
  return rows.map((r, i) => (
    <div key={i} className={s.row}>
      <span className={s.place}>
        {r.mon && onPick ? <button type="button" className={s.monLink} onClick={() => onPick(r.mon!)}>{r.label}</button> : r.label}
        <span className={s.kind}>{r.kind.toUpperCase()}{r.gen && r.gen > 1 ? ` · GEN ${r.gen}` : ""}</span>
      </span>
      <span className={s.rowLv}>{r.levels ? "Lv " + r.levels : ""}</span>
      <span className={s.pct}>{r.pct != null ? r.pct + "%" : r.kind ? "—" : ""}</span>
      {r.pct != null && <div className={s.bar}><span style={{ width: Math.min(100, r.pct) + "%" }} /></div>}
    </div>
  ));
}

function MonCard({ name, mon, found, back, onBack }: { name: string; mon: CatchMon; found: Row[]; back: string; onBack: () => void }) {
  return (
    <div className={s.monCard}>
      <button type="button" className={s.backLink} onClick={onBack}>← Back to {back}</button>
      <h3>{title(name)} <span className={s.kind}>#{mon.dex}{mon.gen > 1 ? ` · GEN ${mon.gen}` : ""}</span></h3>
      <div>{mon.types.map((t) => <Type key={t} t={t} />)}</div>
      <dl className={s.stats}>
        {Object.entries(mon.stats).map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd><span className={s.bar}><span style={{ width: Math.min(100, (v / 160) * 100) + "%" }} /></span></div>
        ))}
      </dl>
      {(mon.from.length > 0 || mon.to.length > 0) && (
        <p className={s.small}>
          {mon.from.map((e) => <span key={e.name}>Evolves from <b>{title(e.name)}</b> ({e.how}). </span>)}
          {mon.to.map((e) => <span key={e.name}>Evolves into <b>{title(e.name)}</b> ({e.how}). </span>)}
        </p>
      )}
      <div>
        <h4 className={s.kind}>MOVES BY LEVEL</h4>
        <div className={s.pills}>{mon.moves.map((m) => <span key={m.lv + m.name} className={s.pill}><i>{m.lv <= 1 ? "Start" : "Lv " + m.lv}</i> {title(m.name)} <Type t={m.type} /></span>)}</div>
      </div>
      <div>
        <h4 className={s.kind}>WHERE TO FIND IT</h4>
        <div className={s.results}><Rows rows={found} /></div>
      </div>
    </div>
  );
}

export default function CatchFinder({ wild, superRod, mons }: { wild: Wild; superRod: Record<string, string[]>; mons: Record<string, CatchMon> }) {
  const [query, setQuery] = useState("Pikachu");
  const [place, setPlace] = useState("");
  const [picked, setPicked] = useState("");

  const byMon = useMemo(() => {
    const out: Record<string, Row[]> = {};
    for (const [p, kinds] of Object.entries(wild))
      for (const [kind, list] of Object.entries(kinds))
        for (const e of list ?? []) (out[e.name] ??= []).push({ label: title(p), kind, levels: e.levels, pct: e.pct, gen: e.gen });
    for (const [p, list] of Object.entries(superRod)) for (const n of list) (out[n] ??= []).push({ label: title(p), kind: "super rod", levels: "", pct: null });
    return out;
  }, [wild, superRod]);
  const names = useMemo(() => Object.keys(byMon).sort(), [byMon]);
  const sorted = (n: string) => byMon[n].slice().sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0));

  let rows: Row[] | null = null, empty = "Type a name or choose a place.";
  if (place) {
    rows = [];
    for (const [kind, list] of Object.entries(wild[place] ?? {})) for (const e of list ?? []) rows.push({ label: title(e.name), kind, levels: e.levels, pct: e.pct, gen: e.gen, mon: e.name });
    for (const n of superRod[place] ?? []) rows.push({ label: title(n), kind: "super rod", levels: "", pct: null, mon: n });
  } else if (query.trim()) {
    const q = query.trim().toUpperCase(), key = names.find((n) => n === q) ?? names.find((n) => n.startsWith(q));
    if (key) rows = [{ label: title(key), kind: "", levels: "", pct: null, mon: key }, ...sorted(key)];
    else empty = `No wild encounters for "${query}". It may be a gift, trade, legendary or evolution-only POKéMON.`;
  }

  const card = picked && mons[picked];
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className={s.finderControls}>
        <label className={s.fld} htmlFor="q">POKéMON
          <input id="q" type="search" list="mon-names" placeholder="e.g. Pikachu" autoComplete="off" value={query}
            onChange={(e) => { setQuery(e.target.value); setPlace(""); setPicked(""); }} />
        </label>
        <label className={s.fld} htmlFor="place">PLACE
          <select id="place" value={place} onChange={(e) => { setPlace(e.target.value); setQuery(""); setPicked(""); }}>
            <option value="">Choose a route or area…</option>
            {Object.keys(wild).map((p) => <option key={p} value={p}>{title(p)}</option>)}
          </select>
        </label>
      </div>
      <datalist id="mon-names">{names.map((n) => <option key={n} value={title(n)} />)}</datalist>
      <div aria-live="polite">
        {card
          ? <MonCard name={picked} mon={card} found={sorted(picked)} back={place ? title(place) : "the search"} onBack={() => setPicked("")} />
          : <div className={s.results}>{rows ? <Rows rows={rows} onPick={setPicked} /> : <div className={s.empty}>{empty}</div>}</div>}
      </div>
      {!card && rows && <p className={`${s.muted} ${s.small}`}>Tap a POKéMON for its types, stats, evolutions and moves.</p>}
    </div>
  );
}
