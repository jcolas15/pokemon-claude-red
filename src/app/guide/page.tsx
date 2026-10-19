import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Chakra_Petch, Silkscreen } from "next/font/google";
import Link from "next/link";
import data from "@/generated/guide-data.json";
import CatchFinder from "./CatchFinder";
import KantoMap from "./KantoMap";
import RivalPicker from "./RivalPicker";
import { GenTag, TrainerCard, Type, title } from "./parts";
import s from "./guide.module.css";

const body = Atkinson_Hyperlegible({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-body" });
const display = Chakra_Petch({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const pixel = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

export const metadata: Metadata = {
  title: "Claude Red Field Guide",
  description: "Walkthrough, gym and Elite Four teams, a catch finder, the Gen 2 additions and the glitches, read from Claude Red's own game data.",
};

// the hand-written part of each gym card; teams, moves and weaknesses come from the game data
const GYMS: [keyof typeof data.gyms, string, string, string, string, string][] = [
  ["BROCK", "Brock", "Pewter City", "BOULDER BADGE", "ROCK", "Water or Grass: 4× on Geodude and Onix, 2× on Sudowoodo. Fighting works too."],
  ["MISTY", "Misty", "Cerulean City", "CASCADE BADGE", "WATER", "Grass or Electric. A Pikachu from Viridian Forest carries this fight."],
  ["LT_SURGE", "Lt. Surge", "Vermilion City", "THUNDER BADGE", "ELECTRIC", "Ground: a Diglett from Diglett's Cave is immune to his whole team."],
  ["ERIKA", "Erika", "Celadon City", "RAINBOW BADGE", "GRASS", "Fire, Ice or Flying. Jumpluff is part Flying, so Ground moves miss it."],
  ["KOGA", "Koga", "Fuchsia City", "SOUL BADGE", "POISON", "Psychic. Ground hits Koffing, Muk and Weezing, but only does normal damage to Ariados."],
  ["SABRINA", "Sabrina", "Saffron City", "MARSH BADGE", "PSYCHIC", "A Dark-type ignores Psychic moves outright. Otherwise strong physical hitters; Electric and Ice for Xatu."],
  ["BLAINE", "Blaine", "Cinnabar Island", "VOLCANO BADGE", "FIRE", "Water, Ground or Rock. Magcargo takes 4× from Water and Ground."],
  ["GIOVANNI", "Giovanni", "Viridian City", "EARTH BADGE", "GROUND", "Water, Grass or Ice. Gligar is part Flying: Ice hits it 4× and Ground moves miss it."],
];
const E4: [keyof typeof data.eliteFour, string, string, string][] = [
  ["LORELEI", "Lorelei", "ICE", "Electric (most are Water/Ice), Fighting or Rock."],
  ["BRUNO", "Bruno", "FIGHTING", "Psychic and Flying for the Fighting-types; Water or Grass for both Onix."],
  ["AGATHA", "Agatha", "GHOST", "Psychic and Ground: every Gengar and Haunter is part Poison."],
  ["LANCE", "Lance", "DRAGON", "Ice: Dragonite takes 4×. Electric for Gyarados (4×)."],
];
const E4_2: [keyof typeof data.eliteFour2, string, string, string, string][] = [
  ["WILL", "Will", "ELITE FOUR 2", "PSYCHIC", "A Dark-type ignores his Psychic moves. Electric, Ice or Rock for both Xatu; Fire for Jynx."],
  ["KOGA", "Koga", "ELITE FOUR 2", "POISON", "Psychic for most of the team; Fire hits Forretress 4×. Crobat is fast, so paralyze it early."],
  ["BRUNO", "Bruno", "ELITE FOUR 2", "FIGHTING", "Psychic and Flying for the Fighting-types; Water or Grass for Onix."],
  ["KAREN", "Karen", "ELITE FOUR 2", "DARK", "Fighting and Bug for Umbreon, Murkrow and Houndoom; Psychic or Ground for Gengar; Fire or Ice for Vileplume."],
  ["LANCE", "Champion Lance", "CHAMPION · REMATCH", "DRAGON", "Ice hits all three Dragonite 4×. Electric for Gyarados; Water or Rock for Charizard and Aerodactyl."],
];
const E4_3: [keyof typeof data.eliteFour3, string, string, string, string][] = [
  ["SIDNEY", "Sidney", "ELITE FOUR 3", "DARK", "Fighting for Mightyena, Absol and Cacturne (Shiftry takes Bug and Flying 4× and 2×); Electric or Grass for Crawdaunt."],
  ["PHOEBE", "Phoebe", "ELITE FOUR 3", "GHOST", "Ghost and Dark hit Dusclops and Banette 2×; Normal and Fighting moves can't touch any of them. Sableye has no weakness, so use your strongest Water, Fire or Electric move."],
  ["GLACIA", "Glacia", "ELITE FOUR 3", "ICE", "Fighting, Fire, Rock or Steel; Electric or Grass for the Water/Ice Sealeo and Walrein."],
  ["DRAKE", "Drake", "ELITE FOUR 3", "DRAGON", "Ice hits Altaria, Flygon and Salamence 4× and Shelgon 2×. Kingdra only fears Dragon."],
  ["STEVEN", "Champion Steven", "CHAMPION · HOENN", "STEEL", "Ground for Aggron (4×) and Metagross; Fire for Skarmory and Metagross (Skarmory is immune to Ground); Water for Claydol and Armaldo; Ice or Fighting for Cradily."],
];
const SECTIONS = [["start", "Start"], ["walkthrough", "Walkthrough"], ["gyms", "Gyms"], ["rival", "Rival"], ["league", "Elite Four"],
  ["catch", "Catch finder"], ["map", "Map"], ["gen2", "Gen 2"], ["gen3", "Gen 3"], ["legends", "Legendaries"], ["mechanics", "Rules"], ["glitches", "Glitches"], ["social", "Social Zone"]];

function Section({ id, kicker, heading, intro, children }: { id: string; kicker: string; heading: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className={s.section}>
      <header className={s.sectionHead}>
        <p className={s.kicker}>{kicker}</p>
        <h2>{heading}</h2>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </section>
  );
}
function Chapter({ n, heading, lv, open, children }: { n: string; heading: string; lv: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details className={s.chapter} open={open}>
      <summary><span className={s.step}>{n}</span><h3>{heading}</h3><span className={s.lv}>{lv}</span></summary>
      <div className={s.chapterBody}><ol>{children}</ol></div>
    </details>
  );
}

export default function Guide() {
  const g2 = data.gen2, g3 = data.gen3;
  return (
    <div className={`${s.page} ${body.variable} ${display.variable} ${pixel.variable}`}>
      <div className={s.wrap}>
        <header className={s.top}>
          <div className={s.brand}><b>CLAUDE RED</b><Link href="/">PLAY THE GAME</Link></div>
          <nav className={s.sections} aria-label="Sections">
            {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </header>

        <div className={s.intro}>
          <p className={s.kicker}>Strategy guide · this build</p>
          <h1>Claude Red Field Guide</h1>
          <p>Teams, moves, levels and encounter rates on this page are read out of the game itself when the site is built, so they always match what you&apos;ll meet. The story follows Pokémon Red; the 100 Gen 2 and 135 Gen 3 POKéMON, the glitches, Battle Tower and quiz are specific to Claude Red.</p>
          <div className={s.facts}>
            <span><b>8</b> badges</span><span><b>{data.counts.gen1 + data.counts.gen2 + data.counts.gen3}</b> POKéMON ({data.counts.gen1} + {data.counts.gen2} from Gen 2 + {data.counts.gen3} from Gen 3)</span>
            <span><b>{data.counts.maps}</b> maps</span><span>Champion ace <b>Lv 65</b></span>
          </div>
        </div>

        <Section id="start" kicker="Before you start" heading="Playing on your phone">
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>Controls</h3>
              <ul className={s.tight}>
                <li>The on-screen <b>D-pad</b> moves; you can also <b>tap a tile</b> to walk there, or tap a person, sign or menu item to use it.</li>
                <li><b>A</b> talks and confirms. <b>B</b> cancels; <b>hold B to run</b>.</li>
                <li><b>START</b> opens the menu (Pokédex, party, bag, MAP, OUTFIT, SAVE); <b>MAP</b> opens the detailed <a href="#map">Kanto map</a> with your position blinking (A/B zoom, drag or the D-pad to look around, SELECT for labels). Your name opens the trainer card, where earned badges show in colour; <b>GUIDE</b> there opens this guide over the game, and &ldquo;Back to game&rdquo; returns you right where you were. <b>SELECT</b> reorders items and moves, even mid-battle: in FIGHT, press SELECT on one move, then SELECT on another to swap them (B cancels). In the battle menu, B no longer jumps to RUN, tapping RUN on the screen only points at it (tap again to run), and the cursor always comes back on FIGHT, so mashing buttons won&apos;t make you flee.</li>
                <li>When a POKéMON tries to learn a fifth move, the &ldquo;forget which move?&rdquo; list shows the highlighted move&apos;s type, power, accuracy and PP next to the new move&apos;s.</li>
                <li><b>Sound starts off.</b> Turn it on in START &rarr; OPTION &rarr; SOUND; the choice is kept with your save.</li>
                <li>On a phone held upright, the map is zoomed in a little and the controls sit right under the screen; battles fill the screen. Added to the home screen, the game uses a Squirtle icon.</li>
                <li>On a computer: arrows/WASD, <kbd className={s.kbd}>Z</kbd> for A, <kbd className={s.kbd}>X</kbd> for B, <kbd className={s.kbd}>Enter</kbd> for START. Gamepads work too.</li>
              </ul>
            </div>
            <div className={s.panel}>
              <h3>Keep your save safe</h3>
              <ul className={s.tight}>
                <li><b>Swiping the app away is safe for a day.</b> While you walk around, the game keeps a resume point every few seconds; reopen it within 24 hours and you&apos;re back on the same spot, skipping the title screen. A battle or cutscene you were in starts over from just before it. This doesn&apos;t replace SAVE: after 24 hours you go back to your last save, and only SAVE goes to the cloud.</li>
                <li>Saves live in your browser <b>for that exact address</b>: the deployed site and a local dev server are two different places.</li>
                <li>Back up from the title screen: <b>SAVE TRANSFER → DOWNLOAD BACKUP</b>. Restore anywhere with <b>LOAD BACKUP FILE</b>.</li>
                <li>With Google sign-in turned on, every SAVE also goes to the cloud, and CLOUD SAVE on the title screen loads it on another device.</li>
                <li>Clearing the browser&apos;s website data, or a private tab, wipes the local save.</li>
              </ul>
            </div>
          </div>
          <div className={s.panel}>
            <h3>Which starter?</h3>
            <p><b>Bulbasaur</b> is the easy start: it beats Brock and Misty and resists Lt. Surge. <b>Squirtle</b> is nearly as smooth. <b>Charmander</b> is hard mode for the first two gyms: Rock resists Ember and Misty&apos;s Water is strong against it, so train a second POKéMON early. A second starter comes later: Bill gives you your pick of <b>Chikorita, Cyndaquil or Totodile</b> after the S.S. Ticket.</p>
            <p className={`${s.muted} ${s.small}`}>Your rival always picks the Kanto starter that beats yours, so his team changes with your choice (see <a href="#rival">Rival</a>).</p>
          </div>
        </Section>

        <Section id="walkthrough" kicker="Story order" heading="Walkthrough" intro="Each chapter ends at a badge. The level on the right is a comfortable target for your lead POKéMON before that chapter's boss.">
          <div className={s.chapters}>
            <Chapter n="01" heading="Pallet Town to Pewter City" lv="Lv 12–14" open>
              <li>Pick your starter in Oak&apos;s lab. Your rival battles you straight away (Lv 5).</li>
              <li>Walk to Viridian City&apos;s Poké Mart, collect <b>Oak&apos;s Parcel</b> and bring it back: you get the <b>Pokédex</b> and Poké Balls. Route 1 now mixes Pidgey and Rattata with <b>Sentret</b>, <b>Hoothoot</b>, <b>Zigzagoon</b> and <b>Poochyena</b>: about a third of every wild area in Kanto is Gen 2 and another third Gen 3.</li>
              <li>Back in Viridian, the old man shows you how to catch POKéMON. Remember him for the <a href="#glitches">MissingNo. glitch</a>.</li>
              <li>Optional: Route 22 (west of Viridian) has your rival (Lv 8–9), Nidoran♂/♀, <b>Mareep</b>, <b>Sentret</b>, <b>Poochyena</b> and <b>Taillow</b>.</li>
              <li>Route 2 adds <b>Ledyba</b>, <b>Spinarak</b>, <b>Wurmple</b>, <b>Taillow</b> and a rare <b>Slakoth</b>.</li>
              <li>Go north through <b>Viridian Forest</b>: <b>Spinarak</b>, <b>Pineco</b>, <b>Wurmple</b>, <b>Shroomish</b> and <b>Nincada</b> now share it with the Weedle and Kakuna; Pikachu, Caterpie and Metapod are still 5% each.</li>
              <li>In Pewter, the gentleman in the Pokémon Center gives you an <b>Igglybuff</b>.</li>
              <li><b>Brock</b> (Rock) now fields Nosepass and Sudowoodo before Onix. Sudowoodo&apos;s Low Kick is his only real attack, and its high Defense shrugs off Ember, so a Charmander start wants a second POKéMON around level 13. Water, Grass and Fighting all work; a <b>Shroomish</b> from Viridian Forest makes it easy.</li>
            </Chapter>
            <Chapter n="02" heading="Mt. Moon to Cerulean City" lv="Lv 20–22">
              <li>Route 3 adds <b>Hoppip</b>, <b>Mareep</b>, <b>Sunkern</b>, <b>Taillow</b>, <b>Whismur</b> and <b>Skitty</b>, and Route 4 <b>Aipom</b> and <b>Lotad</b>. In the Pokémon Center at Mt. Moon, the gentleman gives you a <b>Cleffa</b>, and a salesman sells a Magikarp for $500.</li>
              <li><b>Mt. Moon</b>: Zubat, Geodude and Paras alongside <b>Dunsparce</b>, <b>Phanpy</b> and a rare <b>Shuckle</b>, plus Clefairy, <b>Aron</b>, <b>Makuhita</b>, <b>Nosepass</b>, <b>Lunatone</b> and (B2F) <b>Solrock</b>. Two more fossils are hidden in dead ends on B2F: the <b>Root Fossil</b> (Lileep) and <b>Claw Fossil</b> (Anorith); the Itemfinder points to them. At the end you choose the <b>Dome Fossil</b> (Kabuto) or <b>Helix Fossil</b> (Omanyte).</li>
              <li>In Cerulean, your rival waits on the bridge north of town (Lv 15–18). Routes 24 and 25 add <b>Marill</b>, <b>Hoppip</b>, <b>Ledyba</b>, <b>Natu</b>, <b>Pineco</b>, <b>Lotad</b>, <b>Surskit</b>, <b>Ralts</b>, <b>Seedot</b>, <b>Wingull</b> and <b>Nuzleaf</b>.</li>
              <li>Help Bill for the <b>S.S. Ticket</b>, then talk to him again: he gives you <b>Chikorita, Cyndaquil or Totodile</b> (Lv 10).</li>
              <li>The granny in Cerulean&apos;s trade house swaps a <b>Jigglypuff for Smoochum</b>, and the gentleman in the Pokémon Center gives you an <b>Azurill</b>.</li>
              <li><b>Misty</b> (Water): Grass or Electric. Her Starmie at Lv 21 is the real test.</li>
            </Chapter>
            <Chapter n="03" heading="Vermilion City and the S.S. Anne" lv="Lv 24–26">
              <li>The <b>Day Care</b> on Route 5 has an egg that hatched into a <b>Togepi</b>; the old man gives it to you. Routes 5–6 add <b>Snubbull</b>, <b>Aipom</b>, <b>Natu</b>, <b>Wooper</b>, <b>Marill</b>, <b>Electrike</b>, <b>Spinda</b>, <b>Plusle</b>, <b>Minun</b> and <b>Lombre</b>; Route 11 has Wooper, Sunkern, Natu, <b>Spoink</b>, Electrike and <b>Gulpin</b>.</li>
              <li>In the Pokémon Fan Club, the Pikachu fan gives you a <b>Pichu</b>, and the chairman a <b>Bike Voucher</b>. The sailor in Vermilion&apos;s Pokémon Center trades a <b>Voltorb for Elekid</b>.</li>
              <li>Board the <b>S.S. Anne</b>: your rival (Lv 16–20), <b>HM01 Cut</b> from the captain, and a <b>King&apos;s Rock</b> hidden in the lower-deck cabins.</li>
              <li><b>Lt. Surge</b> (Electric): Ground is immune to his whole team, Electrike included.</li>
              <li>With the Thunder Badge, Oak&apos;s aide upstairs in the <b>Route 11 gate</b> (east of Vermilion) gives you <b>Treecko, Torchic or Mudkip</b> (Lv 10).</li>
              <li>With 10+ POKéMON owned, Oak&apos;s aide on Route 2 gives <b>HM05 Flash</b> for Rock Tunnel.</li>
            </Chapter>
            <Chapter n="04" heading="Rock Tunnel, Lavender and Celadon" lv="Lv 30–32">
              <li>Routes 9–10 add <b>Phanpy</b>, <b>Hoothoot</b>, <b>Flaaffy</b>, <b>Sudowoodo</b>, <b>Numel</b>, <b>Trapinch</b>, Electrike and Plusle; Rock Tunnel has <b>Dunsparce</b>, Sudowoodo, Shuckle, Aron, Makuhita, <b>Sableye</b>, <b>Mawile</b> and rare <b>Bagon</b> (1F) and <b>Beldum</b> (B1F), and Diglett&apos;s Cave Phanpy, Dunsparce, Trapinch, <b>Baltoy</b> and Nincada.</li>
              <li>Routes 7–8 add <b>Houndour</b>, <b>Snubbull</b>, <b>Aipom</b>, <b>Murkrow</b>, Spoink, Skitty, <b>Kecleon</b> and <b>Mightyena</b>.</li>
              <li><b>Celadon Dept. Store 4F</b> sells a <b>Sun Stone</b> next to the other stones. Celadon Mansion&apos;s rooftop room has a free <b>Eevee</b>: a Sun Stone makes Espeon, a Moon Stone makes Umbreon.</li>
              <li><b>Erika</b> (Grass): Fire, Ice or Flying. A Swellow or Houndoom helps a lot; her Roselia knows Stun Spore and Leech Seed.</li>
              <li>The poster in the <b>Game Corner</b> hides the Rocket Hideout. Beat Giovanni for the <b>Silph Scope</b>.</li>
            </Chapter>
            <Chapter n="05" heading="Pokémon Tower to Fuchsia City" lv="Lv 38–40">
              <li>Climb Lavender&apos;s <b>Pokémon Tower</b> with the Silph Scope (<b>Misdreavus</b>, <b>Murkrow</b>, <b>Shuppet</b> and <b>Duskull</b> haunt it now). Rescue <b>Mr. Fuji</b> for the <b>Poké Flute</b>. The little girl in Lavender&apos;s Pokémon Center gives you a <b>Wynaut</b>.</li>
              <li>Wake the <b>Snorlax</b> on Route 12 and Route 16 (Lv 30 each). The Route 12 house gives the <b>Super Rod</b>, which now also hooks <b>Remoraid</b>, <b>Qwilfish</b> and Hoenn fish (<b>Feebas</b> on Routes 12–13; see the Catch finder). A <b>Beauty Scale</b> (Feebas → Milotic) is hidden in that house. Routes 12–15 add <b>Yanma</b>, <b>Skiploom</b>, <b>Jumpluff</b>, <b>Ledian</b>, <b>Stantler</b>, <b>Natu</b>, <b>Miltank</b>, <b>Noctowl</b>, <b>Roselia</b>, <b>Tropius</b>, <b>Masquerain</b>, <b>Castform</b>, <b>Volbeat</b>, <b>Illumise</b> and Kecleon; Routes 16–18 <b>Furret</b>, <b>Aipom</b>, <b>Smeargle</b>, <b>Murkrow</b>, <b>Gligar</b>, <b>Linoone</b>, <b>Swablu</b>, <b>Seviper</b> and <b>Zangoose</b>.</li>
              <li>The <b>Safari Zone</b> adds <b>Teddiursa, Girafarig</b> and <b>Heracross</b>, plus <b>Cacnea</b>, Tropius, Zangoose, Seviper, Trapinch and a rare <b>Absol</b>, and holds <b>HM03 Surf</b> and the Gold Teeth (the Warden trades them for <b>HM04 Strength</b>).</li>
              <li><b>Koga</b> (Poison): Psychic. Weezing&apos;s Toxic builds up every turn, and Smokescreen and Muk&apos;s Minimize make you miss.</li>
            </Chapter>
            <Chapter n="06" heading="Saffron City and Silph Co." lv="Lv 42–44">
              <li>The thirsty Saffron guards want a drink from the Celadon rooftop vending machines.</li>
              <li><b>Silph Co.</b>: Lapras on 7F, your rival (now with <b>Heracross</b>), Giovanni on 11F, and the <b>Master Ball</b>. Afterwards the gentleman in Saffron&apos;s Pokémon Center gives you an <b>Up-Grade</b> (Porygon → Porygon2).</li>
              <li>The <b>Fighting Dojo</b> gives Hitmonlee or Hitmonchan; talk to the Karate Master again for a <b>Tyrogue</b>.</li>
              <li><b>Sabrina</b> (Psychic): a Dark-type such as Umbreon or Houndour ignores her Psychic moves. <b>Shedinja</b> works too: almost none of her attacks are super effective on it; watch out for Xatu&apos;s Night Shade, which is Ghost-type and knocks it out.</li>
            </Chapter>
            <Chapter n="07" heading="Cinnabar Island" lv="Lv 47–50">
              <li>Surf to Cinnabar via Route 21 or Routes 19–20: surfing now turns up <b>Chinchou</b>, <b>Lanturn</b>, <b>Corsola</b>, <b>Remoraid</b>, <b>Qwilfish</b>, <b>Mantine</b>, <b>Wingull</b>, <b>Carvanha</b>, <b>Wailmer</b>, <b>Luvdisc</b> and a rare <b>Relicanth</b> (Route 21 adds Octillery, and Noctowl, Jumpluff, Azumarill, Swellow, Swablu and Tropius in its grass). The <b>Seafoam Islands</b> add Swinub, Delibird, Sneasel, Shuckle, <b>Spheal</b>, <b>Sealeo</b> and <b>Snorunt</b>, plus a hidden <b>King&apos;s Rock</b> (B3F) and <b>Dragon Scale</b> (B4F), <b>DeepSeaTooth</b> (B1F) and <b>DeepSeaScale</b> (B2F) for Clamperl, which the Super Rod hooks there.</li>
              <li>The <b>Pokémon Mansion</b> holds the Secret Key and now <b>Slugma</b>, <b>Magcargo</b>, <b>Houndoom</b>, <b>Numel</b>, <b>Camerupt</b>, <b>Torkoal</b> and Shuppet. The Cinnabar Lab trade room swaps a <b>Growlithe for Magby</b>, and the lab revives the Root and Claw Fossils too.</li>
              <li><b>Blaine</b> (Fire): Water, Ground or Rock.</li>
              <li>Side trip: the <b>Power Plant</b> (Zapdos) now has <b>Flaaffy</b>, <b>Ampharos</b>, <b>Chinchou</b>, Electrike, Plusle, Minun and a hidden <b>Metal Coat</b>.</li>
            </Chapter>
            <Chapter n="08" heading="Viridian Gym, the League and after" lv="Lv 55–60">
              <li><b>Giovanni</b> (Ground): Water, Grass or Ice.</li>
              <li>Route 23 and <b>Victory Road</b> add <b>Gligar</b>, <b>Skarmory</b>, <b>Sudowoodo</b>, <b>Donphan</b>, <b>Pupitar</b>, <b>Lairon</b>, <b>Hariyama</b>, <b>Meditite</b>, <b>Medicham</b>, Absol, <b>Shelgon</b> and <b>Metang</b>, with a second <b>Metal Coat</b> hidden on 2F.</li>
              <li>After the Hall of Fame: <b>Raikou, Entei and Suicune</b> start roaming, <b>Lugia, Ho-Oh and Celebi</b> appear, and <b>Cerulean Cave</b> opens with Mewtwo, <b>Wobbuffet</b>, <b>Unown</b>, <b>Sneasel</b>, <b>Misdreavus</b>, a very rare <b>Larvitar</b>, an even rarer wild <b>Tyranitar</b>, and <b>Chimecho</b>, Medicham, Absol, Sableye, Mawile and a rare wild <b>Metagross</b>.</li>
              <li>Beat the Elite Four again (Gen 2 rematch, Champion Lance), then a third time against the <b>Hoenn Elite Four</b> and <b>Champion Steven</b> (Lv 68–80). Beating Steven releases <b>Latias</b> and <b>Latios</b> to roam and wakes <b>Kyogre, Groudon, Rayquaza, Regirock, Regice, Registeel, Jirachi</b> and <b>Deoxys</b> (all Lv 70; see <a href="#legends">Legendaries</a>).</li>
            </Chapter>
          </div>
        </Section>

        <Section id="gyms" kicker="Eight badges" heading="Gym leaders" intro="Teams, moves and levels come from this build. Each leader fields one Gen 2 and one Gen 3 POKéMON and keeps their ace, and every trainer inside a gym brings Gen 2 and Gen 3 POKéMON of the gym's type.">
          <div className={s.grid2}>
            {GYMS.map(([cls, name, city, badge, type, bring]) => (
              <TrainerCard key={cls} kicker={badge} name={`${name} · ${city}`} type={type} trainer={data.gyms[cls]}>
                <dt>BRING</dt><dd>{bring}</dd>
              </TrainerCard>
            ))}
          </div>
        </Section>

        <Section id="rival" kicker="Blue" heading="Rival battles" intro="His team depends on your Kanto starter. From Route 22 on he brings one Gen 2 POKéMON that grows with him: Sentret, Furret, then Heracross. From Route 22 he also raises a Hoenn starter that covers his own starter&apos;s weakness: Torchic next to Squirtle, Mudkip next to Bulbasaur, Treecko next to Charmander. It takes the place of one of his Kanto POKéMON and evolves later than yours would, so it's fully evolved only at the League. Pick your starter to see every fight.">
          <RivalPicker fights={data.rival} />
        </Section>

        <Section id="league" kicker="Indigo Plateau" heading="Elite Four and Champion" intro="Four battles in a row, then your rival, with no Pokémon Center between rooms. The first run is unchanged from Red; after your first Hall of Fame, the rematch brings the Gen 2 Elite Four, and after that the Hoenn Elite Four.">
          <div className={s.grid2}>
            {E4.map(([cls, name, type, bring]) => (
              <TrainerCard key={cls} kicker="ELITE FOUR" name={name} type={type} trainer={data.eliteFour[cls]}>
                <dt>BRING</dt><dd>{bring}</dd>
              </TrainerCard>
            ))}
            <TrainerCard kicker="CHAMPION" name="Your rival (if you chose Bulbasaur)" trainer={data.champion[0]}>
              <dt>BRING</dt><dd>Heracross takes Rhydon&apos;s place: Flying hits it 4×. See Rival for the other starters&apos; teams.</dd>
            </TrainerCard>
          </div>
          <div className={s.sectionHead}>
            <h3>Elite Four 2: the rematch</h3>
            <p>Every visit after your first Hall of Fame: Will, Koga, Bruno and Karen, then Lance as Champion, with their Gen 2 teams about 20 levels higher and their own movesets. Beating Lance adds another Hall of Fame entry.</p>
          </div>
          <div className={s.grid2}>
            {E4_2.map(([cls, name, kicker, type, bring]) => (
              <TrainerCard key={cls} kicker={kicker} name={name} type={type} trainer={data.eliteFour2[cls]}>
                <dt>BRING</dt><dd>{bring}</dd>
              </TrainerCard>
            ))}
          </div>
          <div className={s.sectionHead}>
            <h3>Elite Four 3: Hoenn</h3>
            <p>Once you&apos;ve beaten Champion Lance in the rematch, every later visit brings the Hoenn Elite Four: Sidney, Phoebe, Glacia and Drake, then Steven as Champion, at Lv 68–80. Beating Steven adds a Hall of Fame entry and wakes the Hoenn legendaries.</p>
          </div>
          <div className={s.grid2}>
            {E4_3.map(([cls, name, kicker, type, bring]) => (
              <TrainerCard key={cls} kicker={kicker} name={name} type={type} trainer={data.eliteFour3[cls]}>
                <dt>BRING</dt><dd>{bring}</dd>
              </TrainerCard>
            ))}
          </div>
        </Section>

        <Section id="catch" kicker="Encounter tables" heading="Catch finder" intro="Search a POKéMON to see everywhere it appears, or pick a place. Percentages are the chance per encounter in that area's grass or water; for caves with several floors, the best floor is shown.">
          <CatchFinder wild={data.wild} superRod={data.superRod} mons={data.catchMons} />
          <div className={s.panel}>
            <h3>Fishing</h3>
            <ul className={s.tight}>
              <li><b>Old Rod</b> (fishing guru, Vermilion): Magikarp only.</li>
              <li><b>Good Rod</b> (Fuchsia): {data.goodRod.map((m) => title(m.name)).join(", ")}.</li>
              <li><b>Super Rod</b> (Route 12 house): depends on where you fish; search a water POKéMON above.</li>
            </ul>
          </div>
          <div className={s.panel}>
            <h3>In-game trades</h3>
            <p className={`${s.muted} ${s.small}`}>You give → you get, with its nickname.</p>
            <div className={s.pills}>
              {data.trades.map((t, i) => <span key={i} className={s.pill}>{title(t.give)} → {title(t.get)}<i>{t.nick}{t.gen > 1 ? ` · GEN ${t.gen}` : ""}</i></span>)}
            </div>
          </div>
        </Section>

        <Section id="map" kicker="Kanto, tile for tile" heading="Map" intro="Every town and route drawn from the game's own tiles, with gyms, Pokémon Centers, caves, legendaries and hidden items marked. The same map opens in the game from START → MAP, where it also shows where you are.">
          <KantoMap {...data.kantoMap} />
        </Section>

        <Section id="gen2" kicker="Johto comes to Kanto" heading="The Gen 2 additions" intro="All 100 Gen 2 POKéMON are in, under Gen 1 rules, and the Pokédex runs to #251. Every one of them has its own drawing, front and back.">
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>Gifts</h3>
              <ul className={s.tight}>
                {g2.gifts.map((x, i) => <li key={i}><b>{x.species.map(title).join(" / ")}</b> (Lv {x.level}): {x.where}{x.requires ? `, ${x.requires}` : ""}.</li>)}
              </ul>
            </div>
            <div className={s.panel}>
              <h3>Trades</h3>
              <ul className={s.tight}>
                {g2.trades.map((x, i) => <li key={i}>Give a <b>{title(x.give)}</b>, get <b>{title(x.get)}</b>: {x.where}.</li>)}
              </ul>
              <h3>Evolution items</h3>
              <ul className={s.tight}>
                {g2.items.map((x, i) => <li key={i}><b>{title(x.item)}</b>: {x.where} ({x.how}).</li>)}
              </ul>
            </div>
          </div>
          <div className={s.panel}>
            <h3>How they evolve</h3>
            <p className={`${s.muted} ${s.small}`}>Trade and happiness evolutions become items and levels. Items are used from the bag, like stones.</p>
            <div className={s.scroll}>
              <table className={s.table}>
                <thead><tr><th>From</th><th>To</th><th>How</th></tr></thead>
                <tbody>
                  {g2.evolutions.map((e, i) => <tr key={i}><td>{title(e.from)}</td><td>{title(e.to)}</td><td className={e.item ? undefined : s.num}>{e.item ? title(e.how) : e.how}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className={s.panel}>
            <h3>New moves</h3>
            <p className={`${s.muted} ${s.small}`}>Gen 2 attacks the new POKéMON rely on, played with Gen 1 effects. Gen 2-only moves like Protect or Rain Dance were left out.</p>
            <div className={s.scroll}>
              <table className={s.table}>
                <thead><tr><th>Move</th><th>Type</th><th>Power</th><th>Acc</th><th>PP</th><th>Effect</th></tr></thead>
                <tbody>
                  {g2.newMoves.map((m) => <tr key={m.name}><td>{title(m.name)}</td><td><Type t={m.type} /></td><td className={s.num}>{m.power}</td><td className={s.num}>{m.acc}</td><td className={s.num}>{m.pp}</td><td>{m.effect}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section id="gen3" kicker="Hoenn comes to Kanto" heading="The Gen 3 additions" intro={`The 135 Hoenn POKéMON are in, under the same rules as Gen 2, and the Pokédex runs to #386. About a third of every wild area is now Hoenn POKéMON (search one in the Catch finder above), and Hoenn POKéMON join every gym, the rival and route trainers. ${data.counts.gen3Drawn === data.counts.gen3 ? "Every one has its own drawing, front and back, and they're all in Who's That POKéMON?" : `Drawings land in batches (${data.counts.gen3Drawn} of ${data.counts.gen3} so far); the rest show a placeholder and stay out of the quiz until drawn.`} The Hoenn Elite Four waits after the Gen 2 rematch, and beating Champion Steven wakes the Hoenn legendaries.`}>
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>Gifts</h3>
              <ul className={s.tight}>
                {g3.gifts.map((x, i) => <li key={i}><b>{x.species.map(title).join(" / ")}</b> (Lv {x.level}): {x.where}{x.requires ? `, ${x.requires}` : ""}.</li>)}
              </ul>
              <h3>Fossils</h3>
              <ul className={s.tight}>
                {g3.fossils.map((x, i) => <li key={i}><b>{title(x.item)}</b> → <b>{title(x.species)}</b> (Lv 30) at the Cinnabar Lab, like the Mt. Moon fossils.</li>)}
              </ul>
            </div>
            <div className={s.panel}>
              <h3>Items</h3>
              <ul className={s.tight}>
                {g3.items.map((x, i) => <li key={i}><b>{title(x.item)}</b>: {x.where} ({x.how}).</li>)}
              </ul>
              <p className={`${s.muted} ${s.small}`}>FEEBAS bites on the Super Rod on Routes 12 and 13; CLAMPERL in the Seafoam Islands and off Cinnabar.</p>
            </div>
          </div>
          <div className={s.panel}>
            <h3>Evolutions</h3>
            <p className={`${s.muted} ${s.small}`}>Trade, happiness and beauty evolutions become items and levels; items are used from the bag, like stones. WURMPLE&apos;s cocoon depends on its Attack DV, so each one always goes the same way, and NINCADA leaves a SHEDINJA behind if your party has room.</p>
            <div className={s.scroll}>
              <table className={s.table}>
                <thead><tr><th>From</th><th>To</th><th>How</th></tr></thead>
                <tbody>
                  {g3.evolutions.map((e, i) => <tr key={i}><td>{title(e.from)}</td><td>{title(e.to)}</td><td className={e.item ? undefined : s.num}>{e.item ? title(e.how) : e.how}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className={s.panel}>
            <h3>New moves</h3>
            <p className={`${s.muted} ${s.small}`}>Gen 3 attacks the Hoenn POKéMON will use, played with Gen 1 effects. Until Hoenn POKéMON arrive, they can turn up through Metronome.</p>
            <div className={s.scroll}>
              <table className={s.table}>
                <thead><tr><th>Move</th><th>Type</th><th>Power</th><th>Acc</th><th>PP</th><th>Effect</th></tr></thead>
                <tbody>
                  {g3.newMoves.map((m) => <tr key={m.name}><td>{title(m.name)}</td><td><Type t={m.type} /></td><td className={s.num}>{m.power}</td><td className={s.num}>{m.acc}</td><td className={s.num}>{m.pp}</td><td>{m.effect}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section id="legends" kicker="One chance each" heading="Legendaries and one-offs" intro="These don't come back if they faint, so save first. Put them to sleep or paralyze them before throwing balls.">
          <div className={s.scroll}>
            <table className={s.table}>
              <thead><tr><th>POKéMON</th><th>Lv</th><th>Where</th></tr></thead>
              <tbody>
                {data.statics.map((x) => <tr key={x.name + x.where}><td><b>{title(x.name)}</b>{x.count > 1 ? ` ×${x.count}` : ""}</td><td className={s.num}>{x.level}</td><td>{x.where}</td></tr>)}
                <tr><td><b>Snorlax</b> ×2</td><td className={s.num}>30</td><td>Routes 12 and 16, woken by the Poké Flute</td></tr>
                <tr><td><b>Mew</b></td><td className={s.num}>7</td><td>Only through the <a href="#glitches">Trainer-Fly glitch</a></td></tr>
                {g2.legends.map((x) => <tr key={x.species}><td><b>{title(x.species)}</b> {x.types.map((t) => <Type key={t} t={t} />)} <GenTag gen={2} /></td><td className={s.num}>{x.level}</td><td>{x.where}, {x.how}</td></tr>)}
                {data.gen3.legends.map((x) => <tr key={x.species}><td><b>{title(x.species)}</b> {x.types.map((t) => <Type key={t} t={t} />)} <GenTag gen={3} /></td><td className={s.num}>{x.level}</td><td>{x.where}, {x.how}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className={s.panel}>
            <h3>Catching the roaming legendaries</h3>
            <p>Raikou, Entei and Suicune (and later Latias and Latios) move to a nearby route every time you change maps and take over about 1 in 4 wild encounters there. They <b>flee the moment they get to act</b>, but damage carries over between meetings. Sleep, freeze, paralysis, flinching or Wrap keeps them in place; the Town Map shows where they are once you&apos;ve met them.</p>
          </div>
        </Section>

        <Section id="mechanics" kicker="It plays like 1996" heading="Gen 1 rules worth knowing" intro="Claude Red keeps the original's battle math, quirks included, and adds the two Gen 2 types.">
          <div className={s.grid2}>
            <div className={s.panel}><h3>Dark and Steel</h3><p><Type t="DARK" /> is immune to Psychic and hits Psychic and Ghost 2×. <Type t="STEEL" /> resists most types, is immune to Poison, and is weak to Fire, Fighting and Ground. Dark moves are special, Steel moves physical.</p></div>
            <div className={s.panel}><h3>Psychic is still strong</h3><p><b>Ghost moves do nothing to Psychic</b> (the original&apos;s bug; Shadow Ball too). Dark-types are now the cleanest answer to Alakazam.</p></div>
            <div className={s.panel}><h3>One Special stat</h3><p>Special covers both special attack and defense, so Amnesia doubles both. Gen 2 and Gen 3 POKéMON use the average of their two Special stats (Blissey and Shuckle keep their defensive role).</p></div>
            <div className={s.panel}><h3>Critical hits come from Speed</h3><p>Crit chance comes from base Speed; <b>Slash, Karate Chop, Razor Leaf, Crabhammer, Cross Chop and Aeroblast</b> crit about 8× as often. Bug and Poison are super-effective on each other, and Ice is neutral against Fire.</p></div>
            <div className={s.panel}><h3>Hoenn is on the way</h3><p>Gen 3 POKéMON are being added under these same rules: no abilities, natures or held items, except <b>Slaking</b> (Truant: it acts only every other turn) and <b>Shedinja</b> (Wonder Guard: only super-effective hits land, and it always has 1 HP). Their new attacks, like Leaf Blade, Aerial Ace and Dragon Claw, can already turn up through <b>Metronome</b>.</p></div>
          </div>
        </Section>

        <Section id="glitches" kicker="Rebuilt from the original code" heading="Glitches" intro="The famous Red and Blue glitches work the way the original did, without corrupting your save file.">
          <div className={s.panel}>
            <h3>MissingNo. and the old man</h3>
            <ol className={s.tight}>
              <li>After you have the Pokédex, talk to the <b>old man in Viridian City</b> and watch his catching demo.</li>
              <li><b>Fly straight to Cinnabar Island</b>. Visiting any map with wild grass encounters first overwrites the effect.</li>
              <li>Surf along the <b>east coast of Cinnabar</b>, on the water tiles right against the shoreline.</li>
              <li>Wild POKéMON there come from the letters of <b>your name</b>, including <b>MISSINGNO.</b> and <b>&apos;M</b>.</li>
            </ol>
            <p className={s.note}>Meeting MissingNo. adds <b>128 to the 6th item in your bag</b>. Put the item you want in slot 6 first.</p>
            <p className={`${s.note} ${s.warn}`}>The Hall of Fame screen shows scrambled records afterwards. It&apos;s only a display effect.</p>
          </div>
          <div className={s.panel}>
            <h3>The Mew trick (Trainer-Fly)</h3>
            <ol className={s.tight}>
              <li>Walk into the sight line of a trainer you haven&apos;t fought, and <b>press START mid-step</b> as they spot you. The classic setup uses a trainer on Route 8.</li>
              <li>From that menu, <b>Fly</b> to Cerulean City. Until your next trainer battle, the START menu won&apos;t open.</li>
              <li>Walk to Route 25 and let the <b>Youngster with the Lv 17 Slowpoke</b> spot you. Beat Slowpoke <b>without lowering its Attack</b>.</li>
              <li>Fly to Lavender and walk back onto the route you escaped from. Close the START menu that opens by itself: a <b>Lv 7 Mew</b> appears.</li>
            </ol>
          </div>
        </Section>

        <Section id="social" kicker="Cable Club, any Pokémon Center" heading="Social Zone and extras" intro="The Cable Club receptionist in every Pokémon Center takes you to the Social Zone.">
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>Battle Tower</h3>
              <ul className={s.tight}>
                <li>Pick <b>3 POKéMON</b>; they&apos;re healed and set to <b>Lv 50</b> for every fight. No items, no EXP.</li>
                <li>Each win earns <b>1 BP</b>, and every 7th win in a row adds 3 more. One loss resets the streak.</li>
                <li>Opponents come from all three generations (Gen 3 included), but never legendaries.</li>
              </ul>
              <p className={s.small}><b>BP prizes:</b> {data.towerPrizes.map((p) => `${title(p.item)} ${p.bp}`).join(" · ")}</p>
            </div>
            <div className={s.panel}>
              <h3>Friends, trades and versus</h3>
              <ul className={s.tight}>
                <li><b>Link battles:</b> share your team as a link, and your friend battles it.</li>
                <li><b>Trades by link:</b> Kadabra, Haunter, Machoke and Graveler evolve when traded. Gen 2 and Gen 3 POKéMON trade too, Shedinja&apos;s 1 HP and all.</li>
                <li><b>Local versus:</b> 2 players on one device.</li>
              </ul>
            </div>
            <div className={s.panel}><h3>Who&apos;s That POKéMON?</h3><p>On the title screen: name the silhouette before time runs out. <b>DAILY</b> gives everyone the same 10; <b>ENDLESS</b> runs until you miss. All {data.counts.gen1 + data.counts.gen2 + data.counts.gen3} POKéMON are in the pool.</p></div>
            <div className={s.panel}><h3>Completing the Pokédex</h3><p>The Pokédex holds <b>{data.counts.gen1 + data.counts.gen2 + data.counts.gen3}</b>. PROF. OAK rates your progress at any PC all the way up, and the game designer in <b>Celadon Mansion 3F</b> awards the diploma once you own every POKéMON except Mew, Celebi, Jirachi and Deoxys. Milestone share cards run to {data.counts.gen1 + data.counts.gen2 + data.counts.gen3}.</p></div>
            <div className={s.panel}><h3>Share and customize</h3><p>A new game lets you design your trainer&apos;s look, and <b>OUTFIT</b> in the START menu changes it any time (say NO at the end to keep your old one). <b>SHARE</b> in the START menu makes cards for badges, catches and Pokédex milestones.</p></div>
          </div>
        </Section>

        <footer className={s.footer}>
          <p>Teams, moves, encounter rates, static POKéMON, Gen 2 placements and Battle Tower prizes are generated from the game&apos;s data at build time. Directions follow Pokémon Red&apos;s story.</p>
          <p>Pokémon © Nintendo / Creatures / GAME FREAK. Fan project, not affiliated.</p>
        </footer>
      </div>
    </div>
  );
}
