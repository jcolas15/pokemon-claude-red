"use client";

import { useState } from "react";
import { title, type Mon } from "./parts";
import s from "./guide.module.css";

type Fight = { where: string; when: string; teams: Mon[][] };
const STARTERS = ["Bulbasaur", "Charmander", "Squirtle"];

export default function RivalPicker({ fights }: { fights: Fight[] }) {
  const [starter, setStarter] = useState(0);
  return (
    <div className={s.panel}>
      <div className={s.seg} role="group" aria-label="Your starter">
        {STARTERS.map((n, i) => (
          <button key={n} type="button" aria-pressed={starter === i} onClick={() => setStarter(i)}>
            {i === 0 ? "I chose " : ""}{n}
          </button>
        ))}
      </div>
      <div>
        {fights.map((f, i) => (
          <div key={i} className={s.rivalRow}>
            <div className={s.where}>{f.where}<span>{f.when}</span></div>
            <div className={s.pills}>
              {f.teams[starter].map((m, j) => (
                <span key={j} className={s.pill}>{title(m.name)}<i>Lv{m.level}{m.gen2 ? " · GEN 2" : ""}</i></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
