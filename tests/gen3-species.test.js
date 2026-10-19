// The 135 Gen 3 species (docs/gen3-integration-plan.md, Phase 2): they build at every level, evolve the way this game
// plays Gen 3 (items, levels, Wurmple's branch, Nincada's Shedinja), keep the two abilities, and survive saving.
import { it } from 'vitest';
import { loadGame, check, drive } from './helpers.js';

it('Gen 3 species build, evolve and save', () => {
  const { ctx, G, D } = loadGame();
  const g3 = D.dexOrder.slice(252);
  check(g3.length === 135 && g3[0] === 'TREECKO' && g3[134] === 'DEOXYS', `135 species, Treecko to Deoxys (${g3.length})`);
  const bad = [];
  for (const sp of g3) for (let lv = 1; lv <= 100; lv++) {
    const m = new G.Mon(sp, lv);
    if (!m.moves.length || ![m.maxhp, m.atk, m.def, m.spd, m.spc].every(v => Number.isFinite(v) && v > 0)) { bad.push(sp + '@' + lv); break; }
  }
  check(!bad.length, 'all 135 build at Lv 1-100 with moves and valid stats ' + bad.slice(0, 5).join(', '));
  check(g3.every(sp => G.DEX_TEXT[sp]), 'every Gen 3 species has Pokédex text');

  const use = (item, sp, lv) => { const m = new G.Mon(sp, lv || 30); G.state.party = [m]; drive(G, G.spawnScript(G.applyItemToMon(item, m, t => G.say(t), null)), 20000); return m.species; };
  check(use('DEEP_SEA_TOOTH', 'CLAMPERL') === 'HUNTAIL' && use('DEEP_SEA_SCALE', 'CLAMPERL') === 'GOREBYSS', 'CLAMPERL: DEEPSEATOOTH -> HUNTAIL, DEEPSEASCALE -> GOREBYSS');
  check(use('BEAUTY_SCALE', 'FEEBAS') === 'MILOTIC', 'FEEBAS + BEAUTY SCALE -> MILOTIC');
  check(use('MOON_STONE', 'SKITTY') === 'DELCATTY' && use('LEAF_STONE', 'NUZLEAF') === 'SHIFTRY' && use('WATER_STONE', 'LOMBRE') === 'LUDICOLO', 'stones: SKITTY, NUZLEAF and LOMBRE evolve');
  check(new G.Mon('TREECKO', 16).evoByLevel() === 'GROVYLE' && new G.Mon('TREECKO', 15).evoByLevel() === null, 'TREECKO -> GROVYLE at Lv 16');
  check(new G.Mon('AZURILL', 15).evoByLevel() === 'MARILL' && new G.Mon('WYNAUT', 15).evoByLevel() === 'WOBBUFFET', 'babies: AZURILL -> MARILL, WYNAUT -> WOBBUFFET at Lv 15');
  const wurm = atk => new G.Mon('WURMPLE', 7, { dvs: { atk, def: 8, spd: 8, spc: 8 } }).evoByLevel();
  check(wurm(4) === 'SILCOON' && wurm(5) === 'CASCOON', 'WURMPLE: even Attack DV -> SILCOON, odd -> CASCOON');
  check(new G.Mon('BELDUM', 20).evoByLevel() === 'METANG' && new G.Mon('BAGON', 30).evoByLevel() === 'SHELGON', 'BELDUM -> METANG (20), BAGON -> SHELGON (30)');

  const nincada = new G.Mon('NINCADA', 20); G.state.party = [nincada];
  drive(G, G.spawnScript(G.evolve(nincada, nincada.evoByLevel(), true)), 20000);
  check(nincada.species === 'NINJASK' && G.state.party[1] && G.state.party[1].species === 'SHEDINJA' && G.state.party[1].maxhp === 1, 'NINCADA -> NINJASK, plus a 1 HP SHEDINJA');
  check(D.species.SLAKING.ability === 'TRUANT' && D.species.SHEDINJA.ability === 'WONDER_GUARD', 'SLAKING keeps TRUANT and SHEDINJA keeps WONDER GUARD');
  check(g3.filter(sp => D.species[sp].ability).length === 2, 'no other Gen 3 species has an ability');

  G.state.party = ['SCEPTILE', 'METAGROSS', 'SHEDINJA'].map(s => new G.Mon(s, 50));
  G.saveGame(); const back = G.loadSave();
  check(back && back.party.map(m => m.species).join() === 'SCEPTILE,METAGROSS,SHEDINJA', 'a Gen 3 party survives save and load');
  check(G.saveTransfer.validSave(JSON.parse(ctx.localStorage.getItem('pkmn_pixel_red_save'))), 'a save with Gen 3 POKéMON passes backup-import validation');
});
