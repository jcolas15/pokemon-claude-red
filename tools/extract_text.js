// Builds a reference JSON of the original text from a pokered clone: source material for the paraphrased dialogue.
// Never shipped. usage: node tools/extract_text.js <pokered dir> <out.json>
const fs = require('fs'), path = require('path');
const P = process.argv[2], OUT = process.argv[3];
const out = {};
function conv(s) {
  return s.replace(/#MON/g, 'POKéMON').replace(/#/g, 'POKé').replace(/<PLAYER>/g, '{PLAYER}').replace(/<RIVAL>/g, '{RIVAL}').replace(/@$/, '').replace(/<……>/g, '……').replace(/<PK><MN>/g, 'PKMN');
}
for (const dir of ['text', 'data/text']) {
  for (const f of fs.readdirSync(path.join(P, dir))) {
    if (!f.endsWith('.asm')) continue;
    const t = fs.readFileSync(path.join(P, dir, f), 'utf8');
    const file = {};
    let cur = null, buf = '';
    const flush = () => { if (cur) file[cur] = buf.trim(); cur = null; buf = ''; };
    for (const line of t.split('\n')) {
      const lm = line.match(/^(_?\w+)::?\s*$/);
      if (lm) { flush(); cur = lm[1].replace(/^_/, ''); continue; }
      if (!cur) continue;
      const m = line.match(/^\s*(text|line|cont|para|next)\s+"(.*)"/);
      if (m) {
        const s = conv(m[2]);
        if (m[1] === 'text') buf += (buf ? ' ' : '') + s;
        else if (m[1] === 'para') buf += '\f' + s;
        else buf += ' ' + s;
        continue;
      }
      const r = line.match(/^\s*text_ram (\w+)/); if (r) { buf += (r[1] === 'wPlayerName' ? '{PLAYER}' : r[1] === 'wRivalName' ? '{RIVAL}' : '{' + r[1] + '}'); continue; }
      const d = line.match(/^\s*text_(decimal|bcd) (\w+)/); if (d) { buf += '{' + d[2] + '}'; continue; }
      if (/^\s*(done|prompt|text_end)/.test(line)) { if (/prompt/.test(line)) buf += '{PROMPT}'; }
      if (/^\s*text_start/.test(line)) buf += '\f';
    }
    flush();
    out[dir + '/' + f] = file;
  }
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
let n = 0, chars = 0; for (const f in out) for (const k in out[f]) { n++; chars += out[f][k].length; }
console.log('labels', n, 'chars', chars, 'files', Object.keys(out).length);
