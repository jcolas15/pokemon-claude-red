// Pick up where you left off: a phone may close a home-screen web app as soon as it is swiped away, so the game keeps a
// resume point, separate from the player's own SAVE, taken every few seconds while they are free to walk around and
// when the app goes to the background. Opening the game within a day goes straight back to it.
// A battle or cutscene in progress is not kept; the game returns to the spot just before it.
import { game } from '../global';

const RESUME_KEY = 'pkmn_pixel_red_resume';
const KEEP_MS = 24 * 60 * 60 * 1000;
const EVERY_MS = 3000;

type State = { options: { textSpeed: number }; savedAt?: number };
const G = game() as unknown as {
  state?: State; ow?: { player?: { moving?: boolean } }; scriptRunning: number;
  engine: { scenes: unknown[] };
  serializeState(): string; restoreState(raw: string): State; startGame(st: State): unknown; textSpeed: number;
  resume: { take(): boolean; write(): void; clear(): void };
};

const storage = () => { try { return typeof localStorage === 'undefined' ? null : localStorage; } catch { return null; } };
const free = () => !!(G.state && G.ow && G.engine.scenes[G.engine.scenes.length - 1] === G.ow && !G.scriptRunning && !G.ow.player?.moving);

function write() {
  const ls = storage();
  if (!ls || !free()) return;
  try { ls.setItem(RESUME_KEY, JSON.stringify({ at: Date.now(), state: G.serializeState() })); } catch { /* storage full: the player's own SAVE still stands */ }
}
function clear() { try { storage()?.removeItem(RESUME_KEY); } catch { /* nothing to clear */ } }

// the resume point, if it is less than a day old and newer than the save; starts the game there and returns true
function take() {
  const ls = storage();
  try {
    const raw = ls?.getItem(RESUME_KEY); if (!raw) return false;
    const r = JSON.parse(raw) as { at: number; state: string };
    const saved = ls?.getItem('pkmn_pixel_red_save'), savedAt = saved ? (JSON.parse(saved) as State).savedAt || 0 : 0;
    if (Date.now() - r.at > KEEP_MS || r.at < savedAt) { clear(); return false; }
    const st = G.restoreState(r.state);
    G.startGame(st);
    G.textSpeed = st.options.textSpeed;
    return true;
  } catch { clear(); return false; }
}

if (typeof document !== 'undefined' && document.addEventListener && !window.HEADLESS) {
  setInterval(write, EVERY_MS);
  document.addEventListener('visibilitychange', () => { if (document.hidden) write(); });
  window.addEventListener('pagehide', write);
}
G.resume = { take, write, clear };
