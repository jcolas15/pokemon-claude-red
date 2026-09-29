// Google sign-in (Supabase Auth) + cloud saves. The page stays behind a sign-in gate until the owner approves the
// player (players.approved in Supabase). SAVE also uploads; CLOUD SAVE on the title screen loads it on any device.
// A save made elsewhere is never overwritten without asking: uploads carry the version this browser last synced, and
// put_save refuses a stale one. Tables, policies and put_save: supabase/schema.sql.
(function (G) {
  'use strict';
  if (typeof document === 'undefined' || !document.getElementById || window.HEADLESS) return;
  const SAVE_KEY = 'pkmn_pixel_red_save', WTP_KEY = 'claudered_wtp', SYNC_KEY = 'claudered_synced';
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  const q = id => document.getElementById(id);
  const cfg = G.CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) { q('gate').hidden = true; return; } // no Supabase yet: browser-only saves, no sign-in
  const sb = window.supabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { flowType: 'pkce' } }) : null;
  let user = null;

  // the cloud version this browser last synced, kept per player so a second account on the same browser starts clean
  function synced() { try { const s = JSON.parse(ls.get(SYNC_KEY) || 'null'); return s && s.uid === user.id ? s.at : null; } catch (e) { return null; } }
  const setSynced = at => ls.set(SYNC_KEY, JSON.stringify({ uid: user.id, at }));

  async function upload(force) {
    const raw = ls.get(SAVE_KEY); if (!raw || !user) return { ok: false };
    const w = ls.get(WTP_KEY);
    const { data, error } = await sb.rpc('put_save', { p_data: { save: JSON.parse(raw), wtp: w ? JSON.parse(w) : null }, p_base: synced(), p_force: !!force });
    if (error || !data) return { ok: false };
    if (data.ok) setSynced(data.updatedAt);
    return data;
  }
  async function fetchCloud() {
    const { data, error } = await sb.from('saves').select('data, updated_at').eq('player', user.id).maybeSingle();
    return error ? { ok: false } : { ok: true, row: data };
  }
  async function signOut() { if (sb) await sb.auth.signOut(); location.reload(); }

  // a game script waits on a promise frame by frame
  function* waitFor(fn) { let done = false, val = null; fn().then(v => { val = v; done = true; }, () => { done = true; }); while (!done) yield; return val; }
  function toast(text) {
    const t = q('cloud-toast'); if (!t) return;
    t.textContent = text; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2600);
  }
  G.cloud = { email: () => user && user.email };

  // ---------------- sign-in gate: main.js boots the game once this resolves ----------------
  function show(msg, mode) {
    q('gate').hidden = false; q('gate-msg').textContent = msg;
    q('gate-google').hidden = mode !== 'signin'; q('gate-google').disabled = false;
    q('gate-row').hidden = mode !== 'wait';
  }
  async function approved() {
    if (!sb) { show("Couldn't load sign-in. Check your connection and reload.", null); return false; }
    const { data } = await sb.auth.getSession();
    user = data.session && data.session.user;
    if (!user) { show('Sign in to play. New players can play once the owner approves them.', 'signin'); return false; }
    const { data: row, error } = await sb.from('players').select('approved').eq('id', user.id).maybeSingle();
    if (error) { show("Couldn't reach the server. Try again in a moment.", 'wait'); return false; }
    if (!row || !row.approved) { show('Signed in as ' + user.email + '. Waiting for the owner to approve you.', 'wait'); return false; }
    return true;
  }
  G.authGate = () => new Promise(res => {
    const run = async () => {
      let ok = false;
      try { ok = await approved(); } catch (e) { show("Couldn't reach the server. Try again in a moment.", 'wait'); }
      if (!ok) return;
      q('gate').hidden = true; q('who-email').textContent = user.email; q('who').hidden = false;
      if (!ls.get(SAVE_KEY)) await restore();
      res();
    };
    q('gate-google').addEventListener('click', () => { q('gate-google').disabled = true; sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } }); });
    q('gate-retry').addEventListener('click', run);
    q('gate-out').addEventListener('click', signOut);
    q('who-out').addEventListener('click', signOut);
    run();
  });
  // a browser without a save (new device, or one that wiped it) gets the cloud copy on its own
  async function restore() {
    const r = await fetchCloud().catch(() => null), d = r && r.ok && r.row && r.row.data;
    if (!d || !d.save || !(G.saveTransfer && G.saveTransfer.validSave(d.save))) return;
    ls.set(SAVE_KEY, JSON.stringify(d.save)); if (d.wtp) ls.set(WTP_KEY, JSON.stringify(d.wtp));
    setSynced(r.row.updated_at); toast('☁ Loaded your cloud save');
  }

  // ---------------- after SAVE in the start menu ----------------
  function describe(s) { // "RED, 8 BADGES, CINNABAR ISLAND"
    const b = (s.badges || []).length, where = G.mapDisplayName && G.maps ? G.mapDisplayName(G.maps.getMap(s.map)) : s.map;
    return s.name + ', ' + b + ' BADGE' + (b === 1 ? '' : 'S') + ', ' + where;
  }
  G.cloudAfterSave = function* () {
    if (!user) return;
    let r = yield* waitFor(() => upload(false));
    if (r && r.conflict) { // the cloud holds a different save (another device)
      const other = r.save && r.save.save ? describe(r.save.save) : 'a different game';
      if (yield* G.ask('Your cloud already has another save: ' + other + '. Replace it with this game?')) r = yield* waitFor(() => upload(true));
      else { yield* G.say('Your cloud keeps that save. This game is saved on this device.'); return; }
    }
    if (r && r.ok) toast('☁ Saved to ' + user.email);
    else yield* G.say("Saved on this device, but the cloud couldn't be reached. It'll sync the next time you SAVE.");
  };

  // ---------------- title screen: CLOUD SAVE ----------------
  function* loadCloud() {
    const r = yield* waitFor(fetchCloud);
    if (!r || !r.ok) { yield* G.say("Couldn't reach the cloud. Try again in a moment."); return; }
    const d = r.row && r.row.data;
    if (!d || !d.save) { yield* G.say('Your cloud has no save yet. Play and choose SAVE to put one there.'); return; }
    const p = { v: 1, save: d.save, wtp: d.wtp }, T = G.saveTransfer;
    if (!T || !T.validSave(p.save)) { yield* G.say("The save in your cloud couldn't be read."); return; }
    const local = ls.get(SAVE_KEY);
    if (local && local === JSON.stringify(p.save)) { setSynced(r.row.updated_at); yield* G.say('Your cloud save is already on this device. Choose CONTINUE!'); return; }
    if (yield* T.confirmImport(p, { title: 'CLOUD SAVE', ask: 'Load your cloud save?', replace: 'Replace the save on this device with your cloud save?', done: 'Cloud save loaded! Choose CONTINUE to pick up where you left off.' })) setSynced(r.row.updated_at);
  }
  G.cloudMenu = function* () {
    if (!user) return;
    const r = yield* G.choose(['LOAD CLOUD SAVE', 'SIGN OUT', 'CANCEL'], { x: 6, y: 6, w: 170 });
    if (r === 0) yield* loadCloud();
    else if (r === 1 && (yield* G.ask('Sign out of ' + user.email + '? The save on this device stays here.'))) yield* waitFor(signOut);
  };
})(window.G);
