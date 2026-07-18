// Shot-sheet generator for Films 02–07 — faithful to the mounted Film-01 board.
// Reuses Film-01 CSS; §2 becomes a data-driven "Set & Camera Map" ribbon.
// Writes _shotsheet_NN.html at codex root, screenshots via headless Chrome,
// then the caller ffmpeg's each PNG -> assets/storyboards/NN/board.webp.
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'D:/New AI Directory/Lucifer gaming/Xsino/04_Interactive_Codex';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

/* ---------- palettes ---------- */
const PAL = {
  xsino: {
    bg:'#0a0a1a', panel:'#110f28', panel2:'#171338', line:'#2a2650', line2:'#3a3568',
    violet:'#8b5cf6', violetBright:'#a78bfa', magenta:'#ec4899', cyan:'#22d3ee',
    warm:'#e8a24c', silver:'#cfd6e6', gold:'#f5c542',
    text:'#eceaf7', muted:'#9b96c4', dim:'#726ea0',
    bgGrad:'radial-gradient(1200px 600px at 80% -5%,rgba(139,92,246,.10),transparent 60%),radial-gradient(900px 500px at -5% 20%,rgba(34,211,238,.06),transparent 55%)',
    h1:'linear-gradient(92deg,#fff 10%,#a78bfa 55%,#ec4899)',
    brandBadge:'linear-gradient(90deg,#8b5cf6,#ec4899)', brandText:'#fff',
    swatches:[['#0a0a1a','navy'],['#8b5cf6','violet'],['#ec4899','magenta'],['#22d3ee','cyan'],['#e8a24c','warm key'],['#cfd6e6','silver'],['#f5c542','gold']],
  },
  heaven: {
    bg:'#0a0912', panel:'#14111f', panel2:'#1b1730', line:'#2e2846', line2:'#40395e',
    violet:'#c9a84e', violetBright:'#f0d27a', magenta:'#e0a866', cyan:'#9db8d6',
    warm:'#e8a24c', silver:'#e6ddc9', gold:'#f5c542',
    text:'#f3eede', muted:'#ada593', dim:'#7d7663',
    bgGrad:'radial-gradient(1200px 600px at 80% -5%,rgba(245,197,66,.10),transparent 60%),radial-gradient(900px 500px at -5% 20%,rgba(157,184,214,.06),transparent 55%)',
    h1:'linear-gradient(92deg,#fff 10%,#f0d27a 55%,#e8a24c)',
    brandBadge:'linear-gradient(90deg,#c9a84e,#f5c542)', brandText:'#1a1408',
    swatches:[['#0a0912','celestial'],['#f5c542','gold'],['#f0d27a','starlight'],['#9db8d6','moonlight'],['#e8a24c','warm key'],['#e6ddc9','cream']],
  },
};

/* ---------- per-film canon ---------- */
const FILMS = {
'02': {
  brand:'xsino', brandLabel:'XSINO', pillar:'Inspire',
  titleEN:'THE GRANDFATHER & HIS GRANDDAUGHTER', titleES:'El Abuelo y su Nieta',
  runtime:'~38s', cutword:'11 cuts', lensGrade:'~85mm portrait · warm afternoon → golden-hour',
  lensNote:'<b>11 cuts</b>, 3–4s each — cut on the finished VO line.<br><b>~85mm portrait</b>: intimate compression, shallow DoF on faces.',
  goldNote:'gold = the luck-moment (cut 09) + logo close (cut 11)',
  char:{ img:'assets/charboards/02/board.png', nm:'Don Emilio  &  Lucía',
    role:'70s grandfather + mid-20s granddaughter · XSINO canon (story 02)',
    bullets:[
      '<b>Don Emilio:</b> 70s, warm brown skin, short wavy gray hair, full trimmed gray beard; heather blue-and-rust shawl-collar cardigan over navy henley, wooden-bead necklace, brown canvas trousers.',
      '<b>Lucía:</b> granddaughter, mid-20s (clearly 21+), sun-kissed brown skin, freckles, long wavy dark-brown hair; cream sleeveless sundress with blue-and-gold floral print, gold bracelets &amp; rings.',
      '<b>Reference node:</b> the coherence board (left) is the identity-lock target for any re-gen; both are adults.' ],
    warn:'This sheet consolidates the <b>11 existing keyframes as-is</b> — no regeneration. The coherence board is the lock target if any cut is re-rendered.' },
  locations:[
    {name:'GARDEN BENCH', time:'afternoon', cuts:[1,2,3]},
    {name:'NEIGHBORHOOD STREET', time:'golden hour', cuts:[4]},
    {name:'KITCHEN', time:'afternoon', cuts:[5,6]},
    {name:'PORCH', time:'sunset', cuts:[7,8,9,10]},
    {name:'BLACK / LOGO', time:'—', cuts:[11]},
  ],
  cuts:[
    {n:1, lens:'85mm', dur:'3s', mv:'PUSH-IN',  sz:'MEDIUM',   vo:'Some questions children ask without knowing how big they are.'},
    {n:2, lens:'85mm', dur:'3s', mv:'DOLLY-IN', sz:'CLOSE-UP', vo:'He said nothing. He chose to show her instead.'},
    {n:3, lens:'85mm', dur:'3s', mv:'PULL-BACK',sz:'WIDE',     vo:'He began teaching her without another word.'},
    {n:4, lens:'85mm', dur:'4s', mv:'TRACK',    sz:'MEDIUM',   vo:'Every fall had his hands waiting underneath.'},
    {n:5, lens:'85mm', dur:'4s', mv:'TRANSITION',sz:'MEDIUM',  vo:'None of those afternoons cost anything — all were worth everything.'},
    {n:6, lens:'85mm', dur:'4s', mv:'ARC',      sz:'MEDIUM',   vo:'Even the mess tasted like luck.'},
    {n:7, lens:'85mm', dur:'4s', mv:'STATIC',   sz:'MEDIUM',   vo:"Old photos hold what money can't buy."},
    {n:8, lens:'85mm', dur:'3s', mv:'PUSH-IN',  sz:'CLOSE-UP', vo:'She hugged him — already holding the answer in her arms.'},
    {n:9, lens:'85mm', dur:'4s', mv:'PUSH-IN',  sz:'CLOSE-UP', vo:'Luck was never about money…', m:'gold', tag:'⏱ THE MOMENT'},
    {n:10,lens:'85mm', dur:'4s', mv:'STATIC',   sz:'CLOSE-UP', vo:'My greatest luck… has always been you.'},
    {n:11,lens:'85mm', dur:'2s', mv:'PUSH-IN',  sz:'LOGO',     vo:'Celebrate every moment. Enjoy every opportunity.', m:'gold', tag:'★ XSINO'},
  ],
  mood:{
    light:'Warm afternoon key softening into golden hour; soft wrap light on faces. The <b>only</b> gold flare belongs to cut 09.',
    arc:'Innocent question → patient teaching → shared ordinary joy → the answer already in her arms. Never buys the moment — it treasures it.',
    sound:'Warm nylon-string guitar + soft piano, swelling on the embrace (09). Diegetic: birds, kitchen clatter, laughter, a page turning.',
    style:'Photoreal cinematic · ~85mm · shallow DoF · warm grade · centred eyeline · <b>no baked-in subtitles</b>.',
    bar:[['#6a6480','nostalgia'],['#8a6a7a','tenderness'],['#d8b878','gratitude'],['#f5c542','★ XSINO']] },
  arc:'MEDIUM → CU → WIDE → MEDIUM → montage → MEDIUM → CU → CU (gold) → CU → LOGO — opens on the question, breathes out to the lesson, closes tight on the embrace and the answer.',
},

'03': {
  brand:'xsino', brandLabel:'XSINO', pillar:'Inspire',
  titleEN:'EVERY DAY A NEW OPPORTUNITY', titleES:'Cada Día una Oportunidad',
  runtime:'~60s', cutword:'12 cuts', lensGrade:'35mm wides / 85mm close-ups · natural grade',
  lensNote:'<b>12 cuts</b>, 5s each — cut on the finished VO line.<br><b>35mm on wides, ~85mm on close-ups</b>: room to breathe, then in on resolve.',
  goldNote:'gold = the bench luck-moment (cuts 09–10) + logo close (cut 12)',
  char:{ img:'assets/charboards/03/board.png', nm:'Diego',
    role:'mid-20s · from the pitch to the interview room · XSINO canon (story 03)',
    bullets:[
      '<b>Skin / ethnicity:</b> mixed South American / Polynesian, warm brown skin, short dark hair, brown eyes, athletic build — reads clearly 21+.',
      '<b>Wardrobe A (opening):</b> worn red-and-white amateur soccer jersey, black shorts, sneakers.',
      '<b>Wardrobe B (rest of film):</b> light-blue button-down (sleeves rolled), charcoal-grey trousers, brown leather dress shoes, slim leather watch, leather notebook.' ],
    warn:'Consolidates the <b>12 existing keyframes as-is</b> — no regeneration. Watch the wardrobe switch (jersey → shirt) is the only intended change; face stays locked to the board.' },
  locations:[
    {name:'SOCCER FIELD', time:'afternoon', cuts:[1,2]},
    {name:'MODERN OFFICE', time:'day', cuts:[3,4]},
    {name:'INTERVIEW ROOM', time:'day', cuts:[5]},
    {name:'RAINY STREET', time:'day', cuts:[6,7,8]},
    {name:'PARK BENCH', time:'sunset', cuts:[9,10,11]},
    {name:'BLACK / LOGO', time:'—', cuts:[12]},
  ],
  cuts:[
    {n:1, lens:'35mm', dur:'5s', mv:'PUSH-IN',  sz:'WIDE',     vo:'One shot. One second. And everything is decided — or not.'},
    {n:2, lens:'85mm', dur:'5s', mv:'FOLLOW',   sz:'CLOSE-UP', vo:"He didn't win. But he didn't leave defeated either."},
    {n:3, lens:'35mm', dur:'5s', mv:'PUSH-IN',  sz:'MEDIUM',   vo:"Another door that didn't open. Yet."},
    {n:4, lens:'35mm', dur:'5s', mv:'PULL-BACK',sz:'MEDIUM',   vo:'He walked out empty-handed, dignity intact.'},
    {n:5, lens:'35mm', dur:'5s', mv:'PUSH-IN',  sz:'MEDIUM',   vo:"We've decided to move forward with another candidate."},
    {n:6, lens:'85mm', dur:'5s', mv:'TRACK',    sz:'CLOSE-UP', vo:'One more no. One more step.'},
    {n:7, lens:'35mm', dur:'5s', mv:'PULL-BACK',sz:'WIDE',     vo:'Everyone ran. He stayed to enjoy it.'},
    {n:8, lens:'35mm', dur:'5s', mv:'TRACK',    sz:'MEDIUM',   vo:'Sometimes you have to get soaked to feel alive.'},
    {n:9, lens:'35mm', dur:'5s', mv:'DOLLY-IN', sz:'MEDIUM',   vo:'How come you never give up?', m:'gold', tag:'⏱ THE MOMENT'},
    {n:10,lens:'85mm', dur:'5s', mv:'PUSH-IN',  sz:'CLOSE-UP', vo:'Because one day… everything can change.', m:'gold', tag:'★ GOLD'},
    {n:11,lens:'35mm', dur:'5s', mv:'PULL-BACK',sz:'WIDE',     vo:"And in that silence, he'd already said it all."},
    {n:12,lens:'35mm', dur:'5s', mv:'PUSH-IN',  sz:'LOGO',     vo:'Believe in new possibilities.', m:'gold', tag:'★ XSINO'},
  ],
  mood:{
    light:'Flat field light → clean office daylight → grey rain → warm sunset on the bench. The single gold wash lands on cuts 09–10.',
    arc:'Near-miss → rejection → rejection → rain-soaked release → the honest question, and the quiet answer. Persistence, never a promise.',
    sound:'Sparse piano building to strings; rain as texture; the bench beat drops to near-silence before the logo. Diegetic: whistle, keyboard, rain.',
    style:'Photoreal cinematic · 35mm / 85mm · shallow DoF · natural grade · <b>no baked-in subtitles</b>.',
    bar:[['#5b5570','defeat'],['#7a6a8a','persistence'],['#6a8ab0','rain release'],['#f5c542','★ XSINO']] },
  arc:'WIDE → CU → MEDIUM → MEDIUM → MEDIUM → CU → WIDE → MEDIUM → MEDIUM (bench) → CU (gold) → WIDE → LOGO — every rejection pulls back, every truth pushes in; the bench is the turn.',
},

'04': {
  brand:'heaven', brandLabel:'HEAVEN ONLINE', pillar:'Love',
  titleEN:'TWO STRANGERS', titleES:'Dos Extraños',
  runtime:'~37s', cutword:'12 cuts', lensGrade:'~85mm · split-screen grammar · celestial black/gold/cream',
  lensNote:'<b>12 cuts</b>, 2–4s each — cut on the finished VO line.<br><b>~85mm</b> held in <b>split-screen</b> until the festival, where the two frames finally become one.',
  goldNote:'gold = the crossing (cuts 09–10) + HeavenOnline logo (cut 12) · gold is a legit HeavenOnline brand element',
  char:{ img:'assets/charboards/04/board.png', nm:'Camila  &  Tomás',
    role:'two late-20s strangers · two cities · HeavenOnline canon (story 04)',
    bullets:[
      '<b>Camila:</b> late-20s, long dark wavy hair, warm brown eyes; cream knit sweater, high-waisted denim, small gold hoops; adds a fitted navy-blue jacket partway.',
      '<b>Tomás:</b> late-20s, short dark hair, light stubble; plain grey henley, dark jeans, leather-strap watch; adds a matching navy-blue jacket partway.',
      '<b>Structure:</b> two separate cities in split-screen; the <b>matching navy jacket</b> is the visual rhyme that pays off when they finally share one frame.' ],
    warn:'Consolidates the <b>12 existing keyframes as-is</b> — no regeneration. Left/right pairing and the jacket rhyme are the coherence anchors.' },
  locations:[
    {name:'CAFÉ — CITY A', time:'day', cuts:[1]},
    {name:'CAFÉ — CITY B', time:'day', cuts:[2]},
    {name:'SPLIT-SCREEN MONTAGE', time:'day', cuts:[3,4,5,6]},
    {name:'FESTIVAL', time:'night', cuts:[7,8,9,10,11]},
    {name:'BLACK / LOGO', time:'—', cuts:[12]},
  ],
  cuts:[
    {n:1, lens:'85mm', dur:'3s', mv:'DOLLY-IN',    sz:'MEDIUM',   vo:'Two lives, the same morning — not knowing it yet.'},
    {n:2, lens:'85mm', dur:'3s', mv:'STATIC',      sz:'MEDIUM',   vo:'Neither knew about the other. Not yet.'},
    {n:3, lens:'85mm', dur:'3s', mv:'SYNC-CUT',    sz:'INSERT',   vo:'The same gesture, hundreds of streets apart.'},
    {n:4, lens:'85mm', dur:'3s', mv:'PARALLEL PAN',sz:'INSERT',   vo:'The same mug, in two hands that have never touched.'},
    {n:5, lens:'85mm', dur:'3s', mv:'TILT-UP',     sz:'MEDIUM',   vo:"The same song, for two who don't know each other yet."},
    {n:6, lens:'85mm', dur:'3s', mv:'PULL-BACK',   sz:'MEDIUM',   vo:'Two gazes, the same unasked question.'},
    {n:7, lens:'85mm', dur:'4s', mv:'CRANE',       sz:'WIDE',     vo:'They both arrived at the same place. By different paths.'},
    {n:8, lens:'85mm', dur:'4s', mv:'STEADICAM',   sz:'WIDE',     vo:'So close, so many times — without knowing it.'},
    {n:9, lens:'85mm', dur:'3s', mv:'BULLET-TIME', sz:'INSERT',   vo:'One object. Two hands. A crossing already written.', m:'gold', tag:'⏱ THE MOMENT'},
    {n:10,lens:'85mm', dur:'3s', mv:'TILT-UP',     sz:'CLOSE-UP', vo:"It wasn't lightning. It was just… true.", m:'gold', tag:'★ GOLD'},
    {n:11,lens:'85mm', dur:'3s', mv:'DOLLY-OUT',   sz:'MEDIUM',   vo:"Everything else kept moving. For a moment, they didn't."},
    {n:12,lens:'85mm', dur:'2s', mv:'PUSH-IN',     sz:'LOGO',     vo:'Every moment can bring something unexpected.', m:'gold', tag:'★ HEAVEN'},
  ],
  mood:{
    light:'Two matched daylight interiors (celestial-neutral) held in split-screen, then a warm festival night of lanterns and gold. Gold flares only at the crossing (09–10).',
    arc:'Parallel solitude → uncanny symmetry → convergence → one shared object, one true moment. Fate as coincidence, gently.',
    sound:'One song bridging both halves; ambient café hum; the festival swells, then holds its breath on the freeze. Diegetic: cups, crowd, a single struck note.',
    style:'Photoreal cinematic · ~85mm · split-screen grammar · celestial black/gold/cream · <b>no baked-in subtitles</b>.',
    bar:[['#4a4a6a','parallel'],['#8a6a7a','longing'],['#d8b878','convergence'],['#f5c542','★ HEAVEN']] },
  arc:'split MEDIUM/MEDIUM → INSERT → INSERT → MEDIUM → MEDIUM → WIDE → WIDE → INSERT (freeze) → CU (gold hands) → MEDIUM → LOGO — two frames become one at the crossing.',
},

'05': {
  brand:'heaven', brandLabel:'HEAVEN ONLINE', pillar:'Inspire',
  titleEN:'THE DREAM', titleES:'El Sueño',
  runtime:'~35s', cutword:'12 cuts', lensGrade:'~85mm · anonymised framing · celestial grade',
  lensNote:'<b>12 cuts</b>, 2–4s each — cut on the finished VO line.<br><b>~85mm</b>; the face is kept in <b>silhouette / from behind</b> until the reveal at the tunnel mouth.',
  goldNote:'gold = the tunnel-mouth flare / reveal (cut 09) + HeavenOnline logo (cut 12)',
  char:{ img:'assets/charboards/05/board.png', nm:'The Footballer',
    role:'young footballer · kept anonymous until the reveal · HeavenOnline canon (story 05)',
    bullets:[
      '<b>Look:</b> young footballer, mixed heritage, early 20s, athletic — reads clearly 21+.',
      '<b>Wardrobe arc:</b> humble street clothes → cold-morning training kit → pro jersey at the stadium reveal.',
      '<b>Framing rule:</b> shot from behind / in silhouette so we <b>learn his story before his name</b>; the coherence board is the lock for the reveal frames.' ],
    warn:'Consolidates the <b>12 existing keyframes as-is</b> — no regeneration. Keep the face anonymised until cut 09; the reveal is the only full face.' },
  locations:[
    {name:'BACKSTREET', time:'sunset', cuts:[1,2]},
    {name:'TRAINING · HILL · FIELD', time:'pre-dawn → day', cuts:[3,4,5]},
    {name:'SEASONS MONTAGE', time:'all', cuts:[6]},
    {name:'PRO PITCH', time:'day', cuts:[7]},
    {name:'PLAYER TUNNEL', time:'night', cuts:[8,9]},
    {name:'STADIUM FIELD', time:'night', cuts:[10,11]},
    {name:'BLACK / LOGO', time:'—', cuts:[12]},
  ],
  cuts:[
    {n:1, lens:'85mm', dur:'3s', mv:'STATIC',   sz:'WIDE',     vo:'It all began on a street no one would remember.'},
    {n:2, lens:'85mm', dur:'3s', mv:'PUSH-IN',  sz:'MEDIUM',   vo:"'You'll never be a real football player.'"},
    {n:3, lens:'85mm', dur:'4s', mv:'TRACK',    sz:'MEDIUM',   vo:'No one saw him train — so no one saw him doubt.'},
    {n:4, lens:'85mm', dur:'3s', mv:'TRACK',    sz:'WIDE',     vo:'He climbed the hill again and again. As habit, not punishment.'},
    {n:5, lens:'85mm', dur:'3s', mv:'LOW ANGLE',sz:'MEDIUM',   vo:'Every fall had the same answer: get back up.'},
    {n:6, lens:'85mm', dur:'3s', mv:'MONTAGE',  sz:'WIDE',     vo:"Time passed. The dream didn't."},
    {n:7, lens:'85mm', dur:'3s', mv:'TRACK',    sz:'MEDIUM',   vo:'His confidence grew. His pride never did.'},
    {n:8, lens:'85mm', dur:'4s', mv:'PUSH-IN',  sz:'WIDE',     vo:'Thousands waited. None of them knew his name yet.'},
    {n:9, lens:'85mm', dur:'3s', mv:'PUSH-IN',  sz:'MEDIUM',   vo:"'Welcome…' — the stadium calls him in.", m:'gold', tag:'⏱ THE MOMENT'},
    {n:10,lens:'85mm', dur:'2s', mv:'CRANE',    sz:'WIDE',     vo:'The crowd erupts.'},
    {n:11,lens:'85mm', dur:'2s', mv:'STATIC',   sz:'CLOSE-UP', vo:"We didn't know his name — but we knew his story."},
    {n:12,lens:'85mm', dur:'2s', mv:'PUSH-IN',  sz:'LOGO',     vo:'Dream big. Enjoy the journey.', m:'gold', tag:'★ HEAVEN'},
  ],
  mood:{
    light:'Humble backstreet dusk → cold pre-dawn training → floodlit tunnel. Face kept in shadow/silhouette until the gold tunnel-mouth flare (09).',
    arc:'Doubt and dismissal → unseen discipline → the walk into the light. We learn his story before we learn his name.',
    sound:'Low drone + heartbeat under training; crowd roar bleeding through the tunnel; full swell on the reveal. Diegetic: ball, breath, studs, announcer.',
    style:'Photoreal cinematic · ~85mm · anonymised framing (back / silhouette) · celestial grade · <b>no baked-in subtitles</b>.',
    bar:[['#4a4a6a','doubt'],['#6a6a8a','discipline'],['#d89a5a','arrival'],['#f5c542','★ HEAVEN']] },
  arc:'WIDE → MEDIUM → MEDIUM → WIDE → MEDIUM → WIDE → MEDIUM → WIDE → MEDIUM (gold) → WIDE → CU → LOGO — the world stays wide and anonymous, then the tunnel narrows to one face in the light.',
},

'06': {
  brand:'heaven', brandLabel:'HEAVEN ONLINE', pillar:'Inspire',
  titleEN:'THE JOURNEY', titleES:'El Viaje',
  runtime:'~38s', cutword:'12 cuts', lensGrade:'35mm landscapes / 85mm close-ups · natural grade',
  lensNote:'<b>12 cuts</b>, 3–4s each — cut on the finished VO line.<br><b>35mm on the landscapes, ~85mm on the two close-ups</b>: the lone figure kept small in wide frames.',
  goldNote:'gold = the summit light (cut 09, no treasure in frame) + HeavenOnline logo (cut 12)',
  char:{ img:'assets/charboards/06/board.png', nm:'The Traveller',
    role:'a lone traveller across eight landscapes · HeavenOnline canon (story 06)',
    bullets:[
      '<b>Look:</b> a single wanderer in rugged outdoor clothing with a pack and weathered boots — read clearly 21+.',
      '<b>Framing rule:</b> often turned to the landscape; <b>the journey, not the face, is the subject</b> — the reward is the walking.',
      '<b>Reference node:</b> the coherence board (left) is the lock for the two close-up frames (08 stumble, 10 summit).' ],
    warn:'Consolidates the <b>12 existing keyframes as-is</b> — no regeneration. Full per-look canon lives in story 06; the board is the identity lock.' },
  locations:[
    {name:'VALLEY EDGE', time:'before dawn', cuts:[1]},
    {name:'MOUNTAIN TRAIL', time:'dawn', cuts:[2,3]},
    {name:'DESERT', time:'noon', cuts:[4]},
    {name:'ROPE BRIDGE', time:'day', cuts:[5]},
    {name:'FOGGY FOREST', time:'fog', cuts:[6]},
    {name:'STORM RIDGE', time:'storm', cuts:[7,8]},
    {name:'SUMMIT', time:'dawn', cuts:[9,10,11]},
    {name:'BLACK / LOGO', time:'—', cuts:[12]},
  ],
  cuts:[
    {n:1, lens:'35mm', dur:'3s', mv:'STATIC',   sz:'WIDE',     vo:'Before every journey, one last moment of stillness.'},
    {n:2, lens:'35mm', dur:'3s', mv:'TRACK',    sz:'MEDIUM',   vo:"He didn't hesitate. He just walked."},
    {n:3, lens:'35mm', dur:'3s', mv:'TRACK',    sz:'WIDE',     vo:'Every trail cost him something. Every sunrise gave it back.'},
    {n:4, lens:'35mm', dur:'3s', mv:'CRANE',    sz:'WIDE',     vo:"The desert doesn't forgive — nor stop those who cross it."},
    {n:5, lens:'35mm', dur:'3s', mv:'STATIC',   sz:'MEDIUM',   vo:'One wrong step, and the river would decide for him.'},
    {n:6, lens:'35mm', dur:'3s', mv:'TRACK',    sz:'MEDIUM',   vo:'The mist showed only the next step.'},
    {n:7, lens:'35mm', dur:'4s', mv:'HANDHELD', sz:'WIDE',     vo:'Every storm asked if it was worth it. He kept walking.'},
    {n:8, lens:'85mm', dur:'3s', mv:'LOW ANGLE',sz:'CLOSE-UP', vo:"He stumbled. He didn't stay down."},
    {n:9, lens:'35mm', dur:'4s', mv:'CRANE',    sz:'WIDE',     vo:'There was no treasure waiting up there.', m:'gold', tag:'⏱ THE MOMENT'},
    {n:10,lens:'85mm', dur:'3s', mv:'STATIC',   sz:'CLOSE-UP', vo:'For the first time, he needed nothing else.'},
    {n:11,lens:'35mm', dur:'4s', mv:'PULL-BACK',sz:'WIDE',     vo:'The reward was never the summit — it was every step.'},
    {n:12,lens:'35mm', dur:'2s', mv:'PUSH-IN',  sz:'LOGO',     vo:'Every journey begins with a choice.', m:'gold', tag:'★ HEAVEN'},
  ],
  mood:{
    light:'Cold blue pre-dawn → hard desert noon → grey storm → warm gold summit dawn. The single gold wash is the summit light (09), no treasure in frame.',
    arc:'Stillness before the choice → cost and doubt across eight landscapes → the summit, where he needs nothing else. The reward is the walking.',
    sound:'Sparse ambient pads + wind; percussion rising through the storm; a clean sustained note at the summit. Diegetic: footsteps, wind, river, breath.',
    style:'Photoreal cinematic · 35mm landscapes / 85mm close-ups · natural grade · lone figure in wide frames · <b>no baked-in subtitles</b>.',
    bar:[['#4a5a6a','stillness'],['#7a6a5a','struggle'],['#d8b878','summit'],['#f5c542','★ HEAVEN']] },
  arc:'WIDE throughout the journey, dropping to CU only at the stumble (08) and the summit (10) — the landscape dwarfs him until the reward is simply standing there.',
},

'07': {
  brand:'xsino', brandLabel:'XSINO', pillar:'Anime',
  titleEN:'THE WHEEL OF DESTINY', titleES:'La Rueda del Destino',
  runtime:'~40s', cutword:'13 cuts', lensGrade:'stylised 2.5D anime · neon rim light',
  lensNote:'<b>13 cuts</b>, ~3s each — cut on the finished VO line.<br><b>Stylised anime (NOT photoreal)</b>: hard neon rim light, one motif per gate.',
  goldNote:'gold = the single time-freeze Wheel-rim flash (cut 11) + XSINO signature (cut 13) — the ONLY gold in the film',
  char:{ img:'assets/charboards/07/board.png', nm:'Kairo · Vega · Nyx · Fortuna',
    role:'the climber and the keepers of the gates · XSINO canon (story 07)',
    bullets:[
      '<b>Kairo:</b> the climber / protagonist — nerve over luck, refuses to let go.',
      '<b>Vega · Nyx · Fortuna:</b> Vega at his side; Nyx, the guardian who closes gates with <b>doubt</b>, not force; Fortuna, keeper of the Wheel who promises an answer, not a prize.',
      '<b>Style note:</b> this is the <b>only stylised (anime) film</b> — the coherence board fixes the cast; gold is quarantined to the Wheel-freeze.' ],
    warn:'Consolidates the <b>13 existing keyframes as-is</b> — no regeneration. Anime look is intentional; gold appears only at cut 11 and the cut-13 signature.' },
  locations:[
    {name:'THE ASCENT', time:'neon dusk', cuts:[1,2]},
    {name:'BRONZE GATE', time:'—', cuts:[3]},
    {name:'SILVER GATE', time:'—', cuts:[4]},
    {name:'SAPPHIRE GATE', time:'—', cuts:[5]},
    {name:'PLATINUM GATE', time:'—', cuts:[6,7]},
    {name:'DIAMOND GATE', time:'—', cuts:[8]},
    {name:'WHEEL CHAMBER', time:'—', cuts:[9,10,11,12]},
    {name:'BLACK / LOGO', time:'—', cuts:[13]},
  ],
  cuts:[
    {n:1, lens:'anime', dur:'3s', mv:'CRANE',      sz:'WIDE',     vo:'At the very top spins something that decides your fate.'},
    {n:2, lens:'anime', dur:'3s', mv:'TRACK',      sz:'MEDIUM',   vo:'Others made it further. None made it whole.'},
    {n:3, lens:'anime', dur:'3s', mv:'PUSH-IN',    sz:'MEDIUM',   vo:"The first gate asks only that you don't hesitate."},
    {n:4, lens:'anime', dur:'3s', mv:'TRACK',      sz:'WIDE',     vo:'Six gates. One Wheel. A single question behind them all.'},
    {n:5, lens:'anime', dur:'3s', mv:'LOW ANGLE',  sz:'MEDIUM',   vo:"He climbed not because he was lucky — because he didn't let go."},
    {n:6, lens:'anime', dur:'3s', mv:'PUSH-IN',    sz:'CLOSE-UP', vo:'Nyx closes the gate not with force, but with doubt.'},
    {n:7, lens:'anime', dur:'3s', mv:'STATIC',     sz:'MEDIUM',   vo:'Beating the gate is refusing to agree with the guardian.'},
    {n:8, lens:'anime', dur:'3s', mv:'TRACK',      sz:'WIDE',     vo:'The last gate let him through — doubt still burning.'},
    {n:9, lens:'anime', dur:'3s', mv:'CRANE',      sz:'WIDE',     vo:'Six gates, to reach a single question.'},
    {n:10,lens:'anime', dur:'3s', mv:'PUSH-IN',    sz:'MEDIUM',   vo:'Fortuna promises no prize. She promises an answer.'},
    {n:11,lens:'anime', dur:'4s', mv:'TIME-FREEZE',sz:'CLOSE-UP', vo:'The luck was never in the Wheel — it was the six gates behind him.', m:'gold', tag:'⏱ THE MOMENT'},
    {n:12,lens:'anime', dur:'3s', mv:'STATIC',     sz:'MEDIUM',   vo:"He didn't know the outcome — but he was no longer who entered the first gate."},
    {n:13,lens:'anime', dur:'3s', mv:'PUSH-IN',    sz:'LOGO',     vo:'Six gates have opened. Which would you cross first?', m:'gold', tag:'★ XSINO'},
  ],
  mood:{
    light:'Stylised anime: near-black chamber with hard neon rim (magenta / cyan / violet) per gate. The <b>only</b> gold is the single time-freeze Wheel-rim flash (11).',
    arc:'Ascent → six gates, each a test of nerve not luck → Nyx&rsquo;s doubt → the Wheel, where the answer was already the climb behind him.',
    sound:'Synth-orchestral anime score, per-gate motifs, a hard cut to silence on the time-freeze, then the XSINO signature. Diegetic: gate mechanisms, the Wheel.',
    style:'Stylised 2.5D anime (<b>NOT photoreal</b>) · neon rim light · six-gate motif · gold reserved for the Wheel-freeze · <b>no baked-in subtitles</b>.',
    bar:[['#4a3f6a','ascent'],['#7a4a7a','doubt'],['#22d3ee','time-freeze'],['#f5c542','★ XSINO']] },
  arc:'WIDE → MEDIUM → gate by gate tightening to CU at Platinum (doubt) → WIDE chamber → CU time-freeze (gold) → MEDIUM → LOGO — the frame closes as certainty erodes, then releases at the Wheel.',
},
};

/* ---------- render ---------- */
const pad = n => String(n).padStart(2,'0');
const esc = s => s;

function buildHTML(id, f){
  const p = PAL[f.brand];
  const accentCycle = f.brand==='xsino'
    ? ['var(--violet)','var(--magenta)','var(--cyan)','var(--warm)','var(--violet-bright)']
    : ['var(--violet)','var(--cyan)','var(--warm)','var(--violet-bright)','var(--magenta)'];
  const cutByN = Object.fromEntries(f.cuts.map(c=>[c.n,c]));
  f.locations.forEach((loc,i)=> loc.accent = /BLACK|LOGO/i.test(loc.name) ? 'var(--gold)' : accentCycle[i%accentCycle.length]);

  const cutRange = arr => arr.length===1 ? `CUT ${pad(arr[0])}` : `CUTS ${pad(arr[0])}–${pad(arr[arr.length-1])}`;

  // §0 fingerprint
  const fingerprint = f.locations.map((loc,i)=>{
    const arrow = i < f.locations.length-1 ? '<span class="arr">→</span>' : '';
    return `<span class="env" style="color:${loc.accent}">${loc.name} ${loc.time!=='—'?`<small>${loc.time}</small>`:''}</span>${arrow}`;
  }).join('');

  // §0 swatches
  const swatches = p.swatches.map(([hex,label])=>`<span class="sw"><i style="background:${hex}"></i>${label}</span>`).join('');

  // §2 ribbon
  const ribbon = f.locations.map(loc=>{
    const moves = loc.cuts.map(n=>{
      const c = cutByN[n];
      return `<div class="lc-move"><b>${pad(n)}</b> ${c.mv} · <span class="lc-sz">${c.sz}</span></div>`;
    }).join('');
    return `<div class="loc" style="--acc:${loc.accent}">
      <div class="lc-cuts">${cutRange(loc.cuts)}</div>
      <div class="lc-name">${loc.name}</div>
      <div class="lc-time">${loc.time}</div>
      <div class="lc-moves">${moves}</div>
    </div>`;
  }).join('');

  // §3 grid
  const grid = f.cuts.map(c=>{
    const cls = c.m==='gold'?'gold':'';
    const mm = c.m ? `<span class="moment m-gold">${c.tag}</span>` : '';
    return `<div class="cut ${cls}">
      <div class="thumb"><span class="tag">CUT ${pad(c.n)}</span>${mm}<img src="assets/frames/${id}/shot${pad(c.n)}.png" alt="cut ${c.n}"></div>
      <div class="info">
        <div class="chip"><b>${c.lens}</b><b>${c.dur}</b><b class="mv">${c.mv}</b><b class="sz">${c.sz}</b></div>
        <div class="vo">${esc(c.vo)}</div>
      </div>
    </div>`;
  }).join('');

  // §4 moodbar
  const moodbar = f.mood.bar.map(([bg,label])=>`<div style="background:${bg}">${label}</div>`).join('');

  const bullets = f.char.bullets.map(b=>`<li>${b}</li>`).join('');
  const footBrand = f.brand==='heaven' ? 'HeavenOnline' : 'XSINO';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${f.brandLabel} Shot Sheet · Film ${id}</title>
<style>
  :root{
    --bg:${p.bg}; --panel:${p.panel}; --panel2:${p.panel2}; --line:${p.line}; --line2:${p.line2};
    --violet:${p.violet}; --violet-bright:${p.violetBright}; --magenta:${p.magenta}; --cyan:${p.cyan};
    --warm:${p.warm}; --silver:${p.silver}; --gold:${p.gold};
    --text:${p.text}; --muted:${p.muted}; --dim:${p.dim};
    --mono:'Cascadia Code','Consolas',ui-monospace,monospace;
    --sans:'Segoe UI',system-ui,-apple-system,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);font-family:var(--sans);width:1500px;
    -webkit-font-smoothing:antialiased;background-image:${p.bgGrad};}
  .sheet{padding:42px 48px 40px}
  .mast{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;
    padding-bottom:20px;border-bottom:2px solid var(--line2);margin-bottom:26px}
  .mast .lead{font:600 12px/1 var(--mono);letter-spacing:4px;color:var(--cyan);text-transform:uppercase;margin-bottom:12px}
  .mast h1{font-size:44px;font-weight:800;letter-spacing:-1px;line-height:.98;
    background:${p.h1};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .mast .es{font-size:19px;font-weight:600;color:var(--dim);letter-spacing:.3px;margin-top:6px;font-style:italic}
  .mast .meta{text-align:right;font:500 12.5px/1.9 var(--mono);color:var(--muted);white-space:nowrap}
  .mast .meta b{color:var(--text);font-weight:700}
  .badge{display:inline-block;font:700 10px/1 var(--mono);letter-spacing:2px;padding:6px 11px;border-radius:20px;text-transform:uppercase}
  .b-brand{background:${p.brandBadge};color:${p.brandText}}
  .b-pillar{border:1px solid var(--violet-bright);color:var(--violet-bright);margin-left:6px}
  .compliance{margin-top:12px;font:500 11px/1.5 var(--sans);color:var(--dim)}
  .compliance b{color:var(--warm)}
  .sec{margin-top:26px;border:1px solid var(--line);border-radius:12px;background:var(--panel);overflow:hidden}
  .sec>h2{font:800 13px/1 var(--sans);letter-spacing:2px;text-transform:uppercase;padding:13px 18px;
    display:flex;align-items:center;gap:12px;background:var(--panel2);border-bottom:1px solid var(--line)}
  .sec>h2 .no{font:800 12px/1 var(--mono);color:var(--bg);background:var(--violet-bright);padding:5px 9px;border-radius:6px;letter-spacing:1px}
  .sec>h2 .sub{font-weight:500;color:var(--muted);letter-spacing:.4px;text-transform:none;font-size:12px}
  .sec .body{padding:18px}
  .choices{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .card{background:var(--panel2);border:1px solid var(--line);border-radius:9px;padding:14px 16px}
  .card .lab{font:700 10px/1 var(--mono);letter-spacing:2px;text-transform:uppercase;color:var(--cyan);margin-bottom:9px}
  .card .big{font-size:15px;font-weight:600;line-height:1.45}
  .card .big b{color:var(--violet-bright)}
  .swatches{display:flex;flex-wrap:wrap;gap:9px;margin-top:2px}
  .sw{display:flex;align-items:center;gap:7px;font:600 11px/1 var(--mono);color:var(--muted)}
  .sw i{width:20px;height:20px;border-radius:5px;display:block;border:1px solid rgba(255,255,255,.14)}
  .note{margin-top:11px;font:600 11px/1.4 var(--mono);color:var(--warm)}
  .fingerprint{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font:700 13px/1.3 var(--sans)}
  .fingerprint .env{padding:7px 12px;border-radius:7px;background:var(--panel);border:1px solid var(--line2)}
  .fingerprint .env small{color:var(--dim);font-weight:500}
  .fingerprint .arr{color:var(--dim);font-size:16px}
  .charrow{display:grid;grid-template-columns:420px 1fr;gap:20px;align-items:start}
  .charrow img{width:100%;border-radius:9px;border:1px solid var(--line2);display:block}
  .lock{font-size:14px;line-height:1.7}
  .lock .nm{font-size:22px;font-weight:800;color:#fff;margin-bottom:4px}
  .lock .role{font:600 12px/1 var(--mono);color:var(--warm);letter-spacing:1px;text-transform:uppercase;margin-bottom:14px}
  .lock ul{list-style:none;display:flex;flex-direction:column;gap:9px}
  .lock li{padding-left:16px;position:relative;color:var(--muted)}
  .lock li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%;background:var(--violet)}
  .lock li b{color:var(--text)}
  .warn{margin-top:14px;font-size:12px;line-height:1.55;color:var(--dim);background:rgba(232,162,76,.07);
    border:1px solid rgba(232,162,76,.28);border-radius:8px;padding:10px 13px}
  .warn b{color:var(--warm)}
  /* §2 set & camera map ribbon */
  .ribbon{display:flex;gap:12px;flex-wrap:wrap}
  .loc{flex:1 1 210px;min-width:190px;background:var(--panel2);border:1px solid var(--line);border-radius:10px;
    padding:13px 14px 14px;position:relative;overflow:hidden}
  .loc::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--acc)}
  .loc .lc-cuts{font:700 10px/1 var(--mono);color:var(--bg);background:var(--acc);padding:4px 8px;border-radius:5px;display:inline-block;margin-bottom:9px;letter-spacing:.5px}
  .loc .lc-name{font:800 14px/1.2 var(--sans);color:var(--text);margin-bottom:2px}
  .loc .lc-time{font:600 10.5px/1 var(--mono);color:var(--dim);text-transform:uppercase;letter-spacing:.5px;margin-bottom:11px}
  .loc .lc-moves{display:flex;flex-direction:column;gap:6px}
  .loc .lc-move{font:600 11px/1.3 var(--mono);color:var(--muted)}
  .loc .lc-move b{color:var(--cyan);font-weight:800}
  .loc .lc-move .lc-sz{color:var(--violet-bright)}
  .maplab{margin-top:14px;padding-top:13px;border-top:1px solid var(--line);font:600 11px/1.5 var(--mono);color:var(--dim)}
  .maplab b{color:var(--cyan)}
  /* §3 grid */
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .cut{background:var(--panel2);border:1px solid var(--line);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
  .cut.gold{border-color:var(--gold);box-shadow:0 0 0 1px rgba(245,197,66,.4),0 0 22px rgba(245,197,66,.14)}
  .cut .thumb{position:relative;aspect-ratio:9/16;overflow:hidden;background:#000}
  .cut .thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .cut .tag{position:absolute;top:8px;left:8px;font:800 12px/1 var(--mono);color:#fff;
    background:rgba(10,10,26,.82);padding:5px 8px;border-radius:6px;letter-spacing:1px;border:1px solid var(--line2)}
  .cut .moment{position:absolute;top:8px;right:8px;font:800 9px/1 var(--mono);letter-spacing:1px;padding:5px 7px;border-radius:5px;text-transform:uppercase}
  .m-gold{background:var(--gold);color:#0a0a1a}
  .cut .info{padding:10px 11px 12px;display:flex;flex-direction:column;gap:7px;flex:1}
  .chip{font:700 10px/1.35 var(--mono);letter-spacing:.3px;display:flex;flex-wrap:wrap;gap:5px}
  .chip b{padding:3px 6px;border-radius:4px;background:var(--panel);border:1px solid var(--line2);color:var(--cyan);font-weight:700}
  .chip b.mv{color:var(--magenta)} .chip b.sz{color:var(--violet-bright)}
  .cut .vo{font-size:11.5px;line-height:1.45;color:var(--muted);font-style:italic}
  .cut .vo::before{content:'“';color:var(--dim)} .cut .vo::after{content:'”';color:var(--dim)}
  .arcbar{margin-top:16px;padding:13px 16px;background:var(--panel2);border:1px solid var(--line);border-radius:9px;
    font:600 12px/1.5 var(--sans);color:var(--muted)}
  .arcbar b{color:var(--violet-bright);font-family:var(--mono);font-size:11px;letter-spacing:.5px}
  .mood{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .mood .card .big{font-size:13px;line-height:1.55;font-weight:500;color:var(--muted)}
  .mood .card .big b{color:var(--text);font-weight:700}
  .moodbar{grid-column:1 / -1;display:flex;height:38px;border-radius:8px;overflow:hidden;margin-top:2px;border:1px solid var(--line)}
  .moodbar div{flex:1;display:flex;align-items:center;justify-content:center;font:700 11px/1 var(--mono);color:#0a0a1a;text-align:center;padding:0 6px}
  .foot{margin-top:24px;padding-top:16px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:16px;font:500 11px/1.5 var(--mono);color:var(--dim)}
  .foot .rails{color:var(--warm)}
</style></head>
<body><div class="sheet">

  <div class="mast">
    <div>
      <div class="lead">Shot Sheet · Film ${id} · OpenArt “Smart Shot” template</div>
      <h1>${f.titleEN}</h1>
      <div class="es">${f.titleES}</div>
    </div>
    <div class="meta">
      <span class="badge b-brand">${f.brandLabel}</span><span class="badge b-pillar">${f.pillar}</span><br>
      <b>9:16</b> vertical · <b>${f.runtime}</b> · <b>${f.cutword}</b><br>
      ${f.lensGrade}
      <div class="compliance"><b>21+ only</b> · never promises winning · logo only at the end</div>
    </div>
  </div>

  <div class="sec">
    <h2><span class="no">§0</span> Shared Choices <span class="sub">— the consistency contract, decided once</span></h2>
    <div class="body choices">
      <div class="card"><div class="lab">Cut count · lens</div><div class="big">${f.lensNote}</div></div>
      <div class="card"><div class="lab">Palette · gold quarantined</div><div class="swatches">${swatches}</div><div class="note">${f.goldNote}</div></div>
      <div class="card" style="grid-column:1 / -1"><div class="lab">Environment fingerprint — the world, in order</div><div class="fingerprint">${fingerprint}</div></div>
    </div>
  </div>

  <div class="sec">
    <h2><span class="no">§1</span> Character Reference <span class="sub">— identity lock · reference node = the coherence board</span></h2>
    <div class="body charrow">
      <img src="${f.char.img}" alt="coherence board">
      <div class="lock">
        <div class="nm">${f.char.nm}</div>
        <div class="role">${f.char.role}</div>
        <ul>${bullets}</ul>
        <div class="warn"><b>⚠ Consolidation note:</b> ${f.char.warn}</div>
      </div>
    </div>
  </div>

  <div class="sec">
    <h2><span class="no">§2</span> Set &amp; Camera Map <span class="sub">— every location, its cuts, and how the camera moves (from the scene headings)</span></h2>
    <div class="body">
      <div class="ribbon">${ribbon}</div>
      <div class="maplab">Order follows the cut numbers in <b>§3</b>. Movements are derived directly from the story&rsquo;s MOVE lines — no invented geometry.</div>
    </div>
  </div>

  <div class="sec">
    <h2><span class="no">§3</span> Storyboard · ${f.cutword} <span class="sub">— explicit camera grammar: lens | dur | movement | size</span></h2>
    <div class="body">
      <div class="grid" id="grid">${grid}</div>
      <div class="arcbar"><b>ARC OF SIZE:</b> ${f.arc}</div>
    </div>
  </div>

  <div class="sec">
    <h2><span class="no">§4</span> Light · Mood · Style</h2>
    <div class="body mood">
      <div class="card"><div class="lab">Light</div><div class="big">${f.mood.light}</div></div>
      <div class="card"><div class="lab">Mood arc</div><div class="big">${f.mood.arc}</div></div>
      <div class="card"><div class="lab">Sound</div><div class="big">${f.mood.sound}</div></div>
      <div class="card"><div class="lab">Style words</div><div class="big">${f.mood.style}</div></div>
      <div class="moodbar">${moodbar}</div>
    </div>
  </div>

  <div class="foot">
    <span>${footBrand} · Lucifer Gaming · Film ${id} — ${f.titleEN.replace(/&/g,'&amp;')} · consolidated from ${f.cuts.length} existing keyframes + coherence board · zero regeneration</span>
    <span class="rails">21+ · responsible gaming · never promises winning · logo only at the end</span>
  </div>

</div></body></html>`;
}

/* ---------- run ---------- */
const ids = process.argv[2] ? process.argv[2].split(',') : Object.keys(FILMS);
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport:{width:1500,height:1000}, deviceScaleFactor:2 });

for (const id of ids){
  const f = FILMS[id];
  const htmlPath = path.join(ROOT, `_shotsheet_${id}.html`);
  writeFileSync(htmlPath, buildHTML(id, f), 'utf8');
  const page = await context.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil:'load' });
  // wait for grid + all images
  await page.waitForFunction((n)=>{
    const cuts = document.querySelectorAll('#grid .cut');
    if (cuts.length !== n) return false;
    const imgs = [...document.images];
    return imgs.length >= n+1 && imgs.every(i=>i.complete && i.naturalWidth>0);
  }, f.cuts.length, { timeout: 30000 });
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(400);
  const outPng = path.join(ROOT, 'assets', 'storyboards', id, 'board.png');
  await page.screenshot({ path: outPng, fullPage: true });
  const box = await page.evaluate(()=>({w:document.body.scrollWidth,h:document.body.scrollHeight}));
  console.log(`film ${id}: ${f.cuts.length} cuts · ${box.w}x${box.h}css -> ${outPng}`);
  await page.close();
}
await browser.close();
console.log('DONE');
