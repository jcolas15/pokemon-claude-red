import type { ReactNode } from "react";
import s from "./guide.module.css";

export type Mon = { name: string; level: number; types: string[]; moves: string[]; gen2: boolean };
export type Trainer = { team: Mon[]; weakTo: string[] };

// POKéMON names are stored the Game Boy way (PIKACHU); the guide sets them in title case
export const title = (n: string) =>
  n.toLowerCase().replace(/(^|[\s.-])([a-zà-ÿ])/g, (m, a: string, b: string) => a + b.toUpperCase()).replace(/Mt\.moon/, "Mt. Moon").replace(/'S\b/, "'s");

export function Type({ t }: { t: string }) {
  return <span className={s.t} data-type={t}>{t}</span>;
}

export function Gen2Tag() {
  return <span className={s.gen2}>GEN 2</span>;
}

export function Team({ team }: { team: Mon[] }) {
  const top = Math.max(...team.map((m) => m.level));
  const ace = team.findIndex((m) => m.level === top);
  return (
    <div className={s.team}>
      {team.map((m, i) => (
        <div key={i} className={`${s.mon} ${i === ace ? s.ace : ""}`}>
          <span className={s.monLv}>Lv {m.level}</span>
          <span className={s.monName}>
            {title(m.name)} {m.types.map((t) => <Type key={t} t={t} />)} {m.gen2 && <Gen2Tag />}
          </span>
          <span className={s.moves}>{m.moves.map(title).join(" · ")}</span>
        </div>
      ))}
    </div>
  );
}

export function TrainerCard({ kicker, name, type, trainer, children }: { kicker: string; name: string; type?: string; trainer: Trainer; children?: ReactNode }) {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div className={s.who}>
          <span className={s.badge}>{kicker}</span>
          <h3>{name}</h3>
        </div>
        {type && <Type t={type} />}
      </div>
      <Team team={trainer.team} />
      <dl className={s.kv}>
        <dt>WEAK TO</dt>
        <dd>{trainer.weakTo.length ? trainer.weakTo.map((t) => <Type key={t} t={t} />) : <span className={s.muted}>no type hits most of this team</span>}</dd>
        {children}
      </dl>
    </article>
  );
}
