// Convert pokered's music (audio/music/*.asm + a few jingle SFX) into compact sequencer programs.
// usage: node tools/convert_music.js <pokered dir>   → src/data/music.js
// Output: G.MUSIC = { progs: {file: [ops]}, songs: {Id: {f, ch: [start...], n: [chanIds]}}, waves, drums, mapSongs }
// Op codes (arrays): see OPS below; call/loop targets are indices into the same program.
'use strict';
const fs = require('fs'), path = require('path');
const PR = process.argv[2];
if (!PR) { console.error('usage: node tools/convert_music.js <pokered>'); process.exit(1); }
const rd = f => fs.readFileSync(path.join(PR, f), 'utf8');

const OPS = { note: 0, rest: 1, octave: 2, note_type: 3, drum_speed: 4, drum_note: 5, tempo: 6, duty_cycle: 7, vibrato: 8,
  pitch_slide: 9, toggle_perfect_pitch: 10, sound_call: 11, sound_ret: 12, sound_loop: 13, volume: 14, stereo_panning: 15, duty_cycle_pattern: 16,
  square_note: 17, noise_note: 18 };
const PITCH = { C_: 0, 'C#': 1, D_: 2, 'D#': 3, E_: 4, F_: 5, 'F#': 6, G_: 7, 'G#': 8, A_: 9, 'A#': 10, B_: 11 };
const num = s => { s = String(s).trim(); if (/^\$/.test(s)) return parseInt(s.slice(1), 16); if (/^%/.test(s)) return parseInt(s.slice(1), 2); return parseInt(s, 10); };

// assemble one .asm file into a program; returns { prog, labels }
function assemble(src) {
  const prog = [], labels = {}, fix = [];
  let scope = '';
  for (let raw of src.split('\n')) {
    const line = raw.replace(/;.*/, '').replace(/\s+$/, '');
    if (!line.trim()) continue;
    let m;
    if ((m = line.match(/^(\w+)::?/))) { scope = m[1]; labels[scope] = prog.length; continue; }
    if ((m = line.match(/^\.(\w+):?/))) { labels[scope + '.' + m[1]] = prog.length; continue; }
    if (!(m = line.match(/^\s+(\w+)\s*(.*)$/))) continue;
    const cmd = m[1], args = m[2] ? m[2].split(',').map(s => s.trim()) : [];
    if (cmd === 'execute_music' || cmd === 'unknownmusic0xef') continue;
    if (!(cmd in OPS)) { console.warn('unknown cmd', cmd); continue; }
    const op = [OPS[cmd]];
    switch (cmd) {
      case 'note': op.push(PITCH[args[0]], num(args[1])); break;
      case 'sound_call': op.push(0); fix.push([op, 1, args[0], scope]); break;
      case 'sound_loop': op.push(num(args[0]), 0); fix.push([op, 2, args[1], scope]); break;
      case 'pitch_slide': op.push(num(args[0]), num(args[1]), PITCH[args[2]]); break;
      default: for (const a of args) op.push(num(a));
    }
    prog.push(op);
  }
  return { prog, labels, fix };
}

// gather every label across files first so cross-file references resolve
const files = {};
const musicDir = 'audio/music';
for (const f of fs.readdirSync(path.join(PR, musicDir)).filter(f => f.endsWith('.asm'))) files['m_' + f.replace('.asm', '')] = rd(path.join(musicDir, f));
const JINGLE_SFX = ['get_item1_1', 'get_item2_1', 'get_key_item_1', 'level_up', 'caught_mon', 'dex_page_added', 'save_1'];
for (const f of JINGLE_SFX) if (fs.existsSync(path.join(PR, 'audio/sfx', f + '.asm'))) files['s_' + f] = rd(path.join('audio/sfx', f + '.asm'));
const progs = {}, where = {};
for (const [k, src] of Object.entries(files)) {
  const a = assemble(src); progs[k] = a;
  for (const l in a.labels) where[l] = [k, a.labels[l]];
}
for (const [k, a] of Object.entries(progs)) for (const [op, i, target, scope] of a.fix) {
  const key = target.startsWith('.') ? scope.replace(/\..*/, '') + target : target;
  // local labels are scoped to the enclosing global label
  const hit = where[key] || where[Object.keys(a.labels).find(l => l.endsWith(target)) || ''];
  if (!hit || hit[0] !== k) { console.warn('unresolved/foreign', target, 'in', k); op[i] = 0; continue; }
  op[i] = hit[1];
}

// song headers: music + the jingle SFX (channels 5-8 map to 1-4)
const songs = {};
function headers(file) {
  const src = rd(file); let cur = null;
  for (const line of src.split('\n')) {
    let m;
    if ((m = line.match(/^(\w+)::/))) { cur = { name: m[1], ch: [] }; continue; }
    if (cur && (m = line.match(/^\s+channel\s+(\d+),\s*(\w+)/))) {
      const w = where[m[2]]; if (!w) continue;
      cur.ch.push([(+m[1] - 1) % 4, w[0], w[1]]);
      const id = cur.name.replace(/^Music_/, '').replace(/^SFX_/, 'SFX_');
      if (!songs[id]) songs[id] = { f: w[0], ch: [], n: [] };
      if (songs[id].f !== w[0]) console.warn('song spans files', id);
      songs[id].ch.push(w[1]); songs[id].n.push((+m[1] - 1) % 4);
    }
  }
}
for (const f of ['musicheaders1', 'musicheaders2', 'musicheaders3']) headers('audio/headers/' + f + '.asm');
for (const f of ['sfxheaders1', 'sfxheaders2', 'sfxheaders3']) headers('audio/headers/' + f + '.asm');
for (const id of Object.keys(songs)) if (id.startsWith('SFX_') && !/Get_Item1_1|Get_Item2_1|Get_Key_Item_1|Level_Up|Caught_Mon|Dex_Page_Added|Save_1/.test(id)) delete songs[id];

// only keep programs referenced by songs
const used = new Set(Object.values(songs).map(s => s.f));
const outProgs = {}; for (const k of used) outProgs[k] = progs[k].prog;

// wave instruments
const waveSrc = rd('audio/wave_samples.asm');
const waves = [...waveSrc.matchAll(/\.wave\d\s*\n\s*dn\s+([\d,\s]+)/g)].map(m => m[1].split(',').map(s => +s.trim()));
// wave 5 reads whatever sits in memory: the commented dumps give its effective shape per audio bank
// (index 5 = audio 1 / Lavender Town, index 6 = audio 3 / Pokémon Tower)
for (const m of waveSrc.matchAll(/in audio (1|3):[^\n]*\n;\s*dn\s+([\d,\s]+)/g)) waves[m[1] === '1' ? 5 : 6] = m[2].split(',').map(s => +s.trim());
// drum kit: noise instruments 1-19 as [len, vol, fade, nr43]
const drums = [null];
for (let i = 1; i <= 19; i++) {
  const s = rd(`audio/sfx/noise_instrument${String(i).padStart(2, '0')}_1.asm`);
  drums.push([...s.matchAll(/noise_note\s+(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)/g)].map(m => m.slice(1, 5).map(Number)));
}
// map → song, from data/maps/songs.asm (by map constant)
const mapSongs = {};
for (const m of rd('data/maps/songs.asm').matchAll(/db\s+MUSIC_(\w+),\s*BANK\(Music_(\w+)\)\s*;\s*(\w+)/g)) mapSongs[m[3]] = m[2];
// trainer encounter music classes
const enc = rd('data/trainers/encounter_types.asm');
const list = name => [...(enc.split(name + '::')[1] || '').split('db -1')[0].matchAll(/OPP_(\w+)/g)].map(m => m[1]);
const encounter = { female: list('FemaleTrainerList'), evil: list('EvilTrainerList') };

const out = { progs: outProgs, songs, waves, drums, mapSongs, encounter };
const js = '// Generated by tools/convert_music.js from pret/pokered audio data (note data of the original compositions).\nwindow.G.MUSIC = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(path.join(__dirname, '..', 'src/data/music.js'), js);
console.log('songs', Object.keys(songs).length, 'progs', Object.keys(outProgs).length, 'ops', Object.values(outProgs).reduce((a, p) => a + p.length, 0), 'waves', waves.length, 'maps', Object.keys(mapSongs).length, 'bytes', js.length);
