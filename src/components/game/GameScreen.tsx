"use client";

import { useEffect } from "react";
import "./game.css";

// The page around the canvas. The engine finds these elements by id and runs them itself, so React renders them
// once and never updates them. The engine is imported after mount because it needs the browser.
export default function GameScreen() {
  useEffect(() => {
    import("@/engine/entry");
  }, []);

  return (
    <>
      <canvas id="screen" />
      <div id="pad" data-chrome hidden>
        <div id="pad-body" />
        <div className="dpad" id="dpad" role="group" aria-label="D-pad">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="dp-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#403d58" />
                <stop offset="1" stopColor="#2a2840" />
              </linearGradient>
              <radialGradient id="dp-c">
                <stop offset="0" stopColor="#1b192b" />
                <stop offset="1" stopColor="#312f47" />
              </radialGradient>
            </defs>
            <g fill="#0a0913" transform="translate(0 4)">
              <rect x="33" y="0" width="34" height="100" rx="7" />
              <rect x="0" y="33" width="100" height="34" rx="7" />
            </g>
            <g fill="url(#dp-g)">
              <rect x="33" y="0" width="34" height="100" rx="7" />
              <rect x="0" y="33" width="100" height="34" rx="7" />
            </g>
            <g fill="#fff">
              <rect className="hl u" x="33" y="0" width="34" height="34" rx="7" />
              <rect className="hl d" x="33" y="66" width="34" height="34" rx="7" />
              <rect className="hl l" x="0" y="33" width="34" height="34" rx="7" />
              <rect className="hl r" x="66" y="33" width="34" height="34" rx="7" />
            </g>
            <circle cx="50" cy="50" r="10" fill="url(#dp-c)" />
            <g fill="#6f6b92">
              <path d="M50 8l7 9H43z" />
              <path d="M50 92l7-9H43z" />
              <path d="M8 50l9-7v14z" />
              <path d="M92 50l-9-7v14z" />
            </g>
          </svg>
        </div>
        <button className="pbtn ab" data-btn="b" aria-label="B">B</button>
        <button className="pbtn ab" data-btn="a" aria-label="A">A</button>
        <button className="pbtn pill" data-btn="select" aria-label="Select">SELECT</button>
        <button className="pbtn pill" data-btn="start" aria-label="Start">START</button>
      </div>
      <div id="gate" data-chrome>
        <div className="gate-card" role="dialog" aria-modal="true" aria-labelledby="gate-title">
          <h2 id="gate-title">Pokémon Claude Red</h2>
          <p id="gate-msg">Checking your sign-in…</p>
          <button type="button" id="gate-google" hidden>Sign in with Google</button>
          <div className="gate-row" id="gate-row" hidden>
            <button type="button" id="gate-retry">Check again</button>
            <button type="button" id="gate-out">Sign out</button>
          </div>
        </div>
      </div>
      <div id="who" data-chrome hidden>
        <span id="who-email" />
        <button type="button" id="who-out">Sign out</button>
      </div>
      <div id="cloud-toast" role="status" />
      <p id="disclaimer">
        Free non-commercial fan project. Pokémon © Nintendo / Creatures / GAME FREAK. Not affiliated with Nintendo, The
        Pokémon Company, Anthropic or OpenAI.
      </p>
    </>
  );
}
