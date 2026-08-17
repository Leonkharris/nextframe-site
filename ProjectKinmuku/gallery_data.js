// 畫集 ART — manifest of everything built on the v3 art direction.
// Boards: all 15 roster characters in id order, all built and gated against the v3
// COLOR BIBLE. `pending:true` hides a card while its board is still being fired — add it
// back if a board is ever pulled, so a gap reads as "queued", not "missing".
// Keyframes: 24 planned scene frames, 8 episodes x 3 scenes. `win` = the gated winner file.
// Keep this file in sync when a keyframe passes its gate.
window.KINMUKU_GALLERY = {
  boardDir: 'assets/character-boards',
  keyDir: 'assets/keyframes/out',
  panels: [
    {k:'turnaround',  cn:'三面圖', en:'Turnaround'},
    {k:'expressions', cn:'表情',   en:'Expressions'},
    {k:'head',        cn:'頭部',   en:'Head detail'},
    {k:'details',     cn:'細部',   en:'Macro details'},
    {k:'wardrobe',    cn:'衣裝',   en:'Wardrobe flat-lay'}
  ],
  boards: [
    {key:'genki',    id:'01', kanji:'赤座玄鬼',   romaji:'Akaza Genki',   note:'Protagonist. Black horns with a red base — not red. Carries a sheathed katana in hand and a second through the obi.'},
    {key:'byakuren', id:'02', kanji:'九條白蓮',   romaji:'Kujō Byakuren', note:'White kitsune. The nine tails are canon, not invention.'},
    {key:'enma',     id:'03', kanji:'大江炎馬',   romaji:'Ōe Enma',       note:'Two horn pairs, red front and dark back. Deep-V open chest and the ofuda plates are canon.'},
    {key:'giga',     id:'04', kanji:'茨木義牙',   romaji:'Ibaraki Giga',  note:'Hannya mask worn pushed up on the head. Mismatched horns — reddish right, purple left.'},
    {key:'ugaku',    id:'05', kanji:'鞍馬烏嶽',   romaji:'Kurama Ugaku',  note:'Tengu. The judge.'},
    {key:'hakurei',  id:'06', kanji:'鞍馬白嶺',   romaji:'Kurama Hakurei',note:'Last of the kings; dissolves into gold.'},
    {key:'sumi',     id:'07', kanji:'霜月澄',     romaji:'Shimotsuki Sumi',note:'雪女 Yuki-onna. 170 cm, normal height — she stands eye-level with the cast. BOTH irises teal; the red is eyeliner, not pigment.'},
    {key:'ayame',    id:'08', kanji:'綾女',       romaji:'Ayame',         note:'Fire oni woman — orange flame, red horns, gold eyes. NO mask, and never violet. First to reach Golden Stillness.'},
    {key:'shirotae', id:'09', kanji:'白妙',       romaji:'Shirotae',      note:'骨女 Hone-onna · The violence of never being seen. Part Two.'},
    {key:'aokichi',  id:'10', kanji:'碧吉',       romaji:'Aokichi',       note:'Kappa. Green hair, shell, riverbank.'},
    {key:'kuroberi', id:'11', kanji:'黒縁',       romaji:'Kuroberi',      note:'The fingerless glove is canon.'},
    {key:'benio',    id:'12', kanji:'紅緒',       romaji:'Benio',         note:"妖狐 Yōko · Vanity's trickster. Reserved for Part Two."},
    {key:'shizuka',  id:'13', kanji:'玉藻静香',   romaji:'Tamamo Shizuka',note:"玉藻前 Tamamo-no-Mae · Byakuren's buried failure. Referenced; prequel key."},
    {key:'mine',     id:'14', kanji:'峰',         romaji:'Mine',          note:'山姥 Yamanba · Devouring-as-protecting. Reserved for Part Two.'},
    {key:'kuroshio', id:'15', kanji:'黒潮',       romaji:'Kuroshio',      note:"海坊主 Umibōzu · The sea's silent pressure. Reserved for Part Two."}
  ],
  episodes: [
    {ep:1, cn:'第一集', title:'The Night Parade Begins'},
    {ep:2, cn:'第二集', title:'Edo Does Not Sleep'},
    {ep:3, cn:'第三集', title:'Named by Daylight'},
    {ep:4, cn:'第四集', title:'The Parade Arrives Early'},
    {ep:5, cn:'第五集', title:'The Face Beneath'},
    {ep:6, cn:'第六集', title:'A Windless Night'},
    {ep:7, cn:'第七集', title:'Fear Turns on Itself'},
    {ep:8, cn:'第八集', title:'The Last Naming'}
  ],
  keyframes: [
    {stem:'ep1s1', ep:1, sc:1, title:'The Third Sound',          who:'genki',    win:'ep1s1-cand2.jpg',     fires:1, note:'Low-angle tracking, silent night procession.'},
    {stem:'ep1s2', ep:1, sc:2, title:'The Half Beat',            who:'byakuren', win:'ep1s2-cand1.jpg',     fires:4, note:'Roof ridge under the moon, cold eyes narrowing.'},
    {stem:'ep1s3', ep:1, sc:3, title:'The Ache of Being Left',   who:'aokichi',  win:'ep1s3-cand1.jpg',     fires:3, note:'Fire 1 invented a co-star and collapsed to flat cel-shading. Rule 3 was earned here.'},
    {stem:'ep2s1', ep:2, sc:1, title:'Edo Does Not Sleep',       who:'genki',    win:'ep2s1-cand1.jpg',     fires:2, note:'Stepping toward a trembling shadow, hand outstretched.'},
    {stem:'ep2s2', ep:2, sc:2, title:'Give Me a Name',           who:'kuroberi', win:'ep2s2-cand1.jpg',     fires:1, note:'Circling slowly, licking a claw. Chip-check saved the fingerless glove.'},
    {stem:'ep2s3', ep:2, sc:3, title:'Refusing the Outlet',      who:'ugaku',    win:'ep2s3-cand1.jpg',     fires:1, note:'Descending windswept across rooftops against the moon.'},
    {stem:'ep3s1', ep:3, sc:1, title:'A False Order',            who:'aokichi',  win:'ep3s1-cand2.jpg',     fires:2, note:'Seated on a wet stone at dawn, shy relief.'},
    {stem:'ep3s2', ep:3, sc:2, title:'Named by Daylight',        who:'genki',    win:'ep3s2-cand2.jpg',     fires:3, note:'Fire 1 drifted red horns. Rule 4 pinned the katana and the black-with-red-base horns.'},
    {stem:'ep3s3', ep:3, sc:3, title:'Night Returns',            who:'genki',    win:'ep3s3-r3-cand2.jpg',  fires:3, note:'Hardest shot of the run. Rule 5 (adjective bleed) was earned here — "a bare arm" returned him shirtless.'},
    {stem:'ep4s1', ep:4, sc:1, title:'The Parade Arrives Early', who:'enma',     win:'ep4s1-cand1.jpg',     fires:2, note:'Rule 6 earned here — the word "silhouette" returned an unreadable black mass.'},
    {stem:'ep4s2', ep:4, sc:2, title:"The Parade Doesn't Need You", who:'byakuren', win:'ep4s2-cand2.jpg', fires:2, note:'One fire, every chip element present.'},
    {stem:'ep4s3', ep:4, sc:3, title:'Giga Emerges',             who:'giga',     win:'ep4s3-cand2.jpg',     fires:3, note:'Fire 1 was a harvest overrun — the driver downloaded old gallery tiles instead of the new ones.'},
    {stem:'ep5s1', ep:5, sc:1, title:'The City Holds Its Breath',who:'ayame',    win:'ep5s1-cand2.jpg',     fires:2, note:'Re-fired on the tagged chip ayame_face__k2 after the wrong-reference rejection (the library held 7 assets named ayame_face.jpg). Kuroberi tells are gone: red horns, gold eyes, no gloves, no white streak. Both candidates are on-model — spec.json says black hair + high ponytail + auburn streak, and BLACK IS CANON here, so neither reads as drift. cand2 mounts purely on framing: cand1 is the full-body wide and she reads small in it, which fails the "largest in frame" rule.'},
    {stem:'ep5s2', ep:5, sc:2, title:'A Terrible Calm',          who:'ayame',    win:'ep5s2-cand1.jpg',     fires:2, note:'Re-fired on the tagged chip. Both candidates are clean of the white streak and claw nails; cand1 mounts because cand2 renders the kimono red-on-gold instead of her canon black with red peonies and a gold obi.'},
    {stem:'ep5s3', ep:5, sc:3, title:'The Face Beneath',         who:'ayame',    win:'ep5s3-cand1.jpg',     fires:4, note:'The warm-kimono wobble was a WORDING defect, not a model one. All three ep5 shots shared the compound "black-red-gold kimono", which the model is free to blend into one warm red; ep7s3 spelled the colours out separately and landed canon. Copying that phrasing onto the shared CAST line (all 3 shots) and re-firing brought the black panel with gold pattern-work back, so this now cuts with ep5s2. Fired on NB2 Lite again — Pro was still capped at 03:07 (reset is 15:00 Manila) and a capped fire costs nothing. cand1 mounts: cand2 grew a WHITE STREAK, the exact Kuroberi tell that got the first Ayame set rejected, and dropped both the flame and the tear-kindled light. No mask, tears instead: the face beneath is her own.'},
    {stem:'ep6s1', ep:6, sc:1, title:'A Windless Night',         who:'hakurei',  win:'ep6s1-cand2.jpg',     fires:1, note:'Chip-check found the snow: his hero chip is a snowfield, so the chip bleeds ENVIRONMENT as well as design.'},
    {stem:'ep6s2', ep:6, sc:2, title:'Let Me Be Last',           who:'genki',    win:'ep6s2-cand1.jpg',     fires:1, note:'Cuts cleanly with ep6s1 — same bridge, same lantern, same crescent moon. One fire.'},
    {stem:'ep6s3', ep:6, sc:3, title:'The Formless Shadow',      who:'genki',    win:'ep6s3-cand1.jpg',     fires:1, note:'Chip-check in the HUE direction: the rose-pink catchlights are in his face chip, not a drift. No reroll.'},
    {stem:'ep7s1', ep:7, sc:1, title:'The Parade Advances',      who:'genki',    win:'ep7s1-cand1.jpg',     fires:4, note:'Fire 2 returned eight generic humans with drawn swords. Fire 4 was the canon re-fire: the plan had drifted off the v3 spec files (Genki in a gold cloud-dragon haori with amber eyes, Ayame as a violet masked hannya). All four now match their spec.json.'},
    {stem:'ep7s2', ep:7, sc:2, title:'Fear Turns on Itself',     who:'byakuren', win:'ep7s2-cand2.jpg',     fires:2, note:'Fire 1 was a gacha splash. "SLATE-BLUE" was an invented colour fighting her pearl-white board; cand2 puts the city back as the subject.'},
    {stem:'ep7s3', ep:7, sc:3, title:'The First Gold Light',     who:'ayame',    win:'ep7s3-cand2.jpg',     fires:2, note:'Rebuilt off her v3 spec — fire oni, not the violet masked hannya the old plan described. cand1 baked the "CAST — 主角 綾女" label into the frame as lettering; on a solo close-up that label reads as a caption, so 2 candidates is the gate.'},
    {stem:'ep8s1', ep:8, sc:1, title:'An Unaccustomed Emptiness',who:'genki',    win:'ep8s1-cand1.jpg',     fires:2, note:'The v3 spec migration proves out here — silver clover crest large on the back, red sash, black ridged horns, yellow eye, katana sheathed. cand2 was equally on-model but short-haired; the spec says long hair, and cand1 also has the open empty hand the title asks for.'},
    {stem:'ep8s2', ep:8, sc:2, title:'The Last Naming',          who:'genki',    win:'ep8s2-cand1.jpg',     fires:2, note:'Blocking matches the prompt line for line — torch ring at the bridgehead, arms loose and hands open, both katana sheathed, the crowd a dark wall beyond the ring. cand2 died mid-fire and never wrote to disk.'},
    {stem:'ep8s3', ep:8, sc:3, title:'Is He Still an Oni',       who:'genki',    win:'ep8s3-cand1.jpg',     fires:2, note:'The closer, and the hardest ask in the run: horns blunted and paled to grey-pink, iron-red drained from the skin to human warmth, yellow eyes calm. cand2 baked the CAST line across the top as a title bar — the same cartouche failure as ep7s3, both on solo close-ups.'}
  ]
};
