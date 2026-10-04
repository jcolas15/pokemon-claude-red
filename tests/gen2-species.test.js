// The 100 Gen 2 species: they build at every level, evolve the Gen 1-rules way, and survive saving.
import { it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

it('Gen 2 species build, evolve and save', () => {
  const { ctx, G, D } = loadGame();
  const bad = [];
  for (const sp of D.dexOrder.slice(152)) for (let lv = 1; lv <= 100; lv++) {
    const m = new G.Mon(sp, lv);
    if (!m.moves.length || ![m.maxhp, m.atk, m.def, m.spd, m.spc].every(v => Number.isFinite(v) && v > 0)) { bad.push(sp + '@' + lv); break; }
  }
  check(!bad.length, 'all 100 species build at Lv 1-100 with moves and valid stats ' + bad.slice(0, 5).join(', '));

  const use = (item, sp, lv) => { const m = new G.Mon(sp, lv || 30); G.state.party = [m]; drive(G, G.spawnScript(G.applyItemToMon(item, m, t => G.say(t), null)), 20000); return m.species; };
  check(use('METAL_COAT', 'ONIX') === 'STEELIX', 'ONIX + METAL COAT -> STEELIX');
  check(use('METAL_COAT', 'SCYTHER') === 'SCIZOR', 'SCYTHER + METAL COAT -> SCIZOR');
  check(use('KINGS_ROCK', 'SLOWPOKE') === 'SLOWKING', "SLOWPOKE + KING'S ROCK -> SLOWKING");
  check(use('KINGS_ROCK', 'POLIWHIRL') === 'POLITOED', "POLIWHIRL + KING'S ROCK -> POLITOED");
  check(use('DRAGON_SCALE', 'SEADRA') === 'KINGDRA', 'SEADRA + DRAGON SCALE -> KINGDRA');
  check(use('UP_GRADE', 'PORYGON') === 'PORYGON2', 'PORYGON + UP-GRADE -> PORYGON2');
  check(use('SUN_STONE', 'EEVEE') === 'ESPEON' && use('MOON_STONE', 'EEVEE') === 'UMBREON' && use('FIRE_STONE', 'EEVEE') === 'FLAREON', 'EEVEE: SUN STONE -> ESPEON, MOON STONE -> UMBREON, FIRE STONE still FLAREON');
  check(use('SUN_STONE', 'GLOOM') === 'BELLOSSOM' && use('LEAF_STONE', 'GLOOM') === 'VILEPLUME', 'GLOOM: SUN STONE -> BELLOSSOM, LEAF STONE -> VILEPLUME');
  check(use('SUN_STONE', 'SUNKERN') === 'SUNFLORA', 'SUNKERN + SUN STONE -> SUNFLORA');
  check(new G.Mon('GOLBAT', 40).evoByLevel() === 'CROBAT' && new G.Mon('GOLBAT', 39).evoByLevel() === null, 'GOLBAT -> CROBAT at Lv 40');
  check(new G.Mon('CHANSEY', 45).evoByLevel() === 'BLISSEY', 'CHANSEY -> BLISSEY at Lv 45');
  check(['PICHU', 'CLEFFA', 'IGGLYBUFF', 'TOGEPI'].every(s => new G.Mon(s, 15).evoByLevel()), 'babies evolve at Lv 15');
  const t = new G.Mon('TYROGUE', 20), want = t.atk > t.def ? 'HITMONLEE' : t.atk < t.def ? 'HITMONCHAN' : 'HITMONTOP';
  check(t.evoByLevel() === want, `TYROGUE at Lv 20 -> ${want} (Atk ${t.atk}, Def ${t.def})`);
  check(new G.Mon('LARVITAR', 30).evoByLevel() === 'PUPITAR' && new G.Mon('PUPITAR', 55).evoByLevel() === 'TYRANITAR', 'LARVITAR -> PUPITAR (30) -> TYRANITAR (55)');

  G.state.party = ['TYPHLOSION', 'UMBREON', 'SCIZOR'].map(s => new G.Mon(s, 50));
  G.saveGame(); const back = G.loadSave();
  check(back && back.party.map(m => m.species).join() === 'TYPHLOSION,UMBREON,SCIZOR', 'Gen 2 party survives save and load');
  check(G.saveTransfer.validSave(JSON.parse(ctx.localStorage.getItem('pkmn_pixel_red_save'))), 'a save with Gen 2 POKéMON passes backup-import validation');
});
