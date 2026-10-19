# HANDOFF — Jade Manila media kit (`jadesupperclubv3`)

> Append below, never rewrite. Another account edits this file too.

## Goal
Editorial media kit deck for **Jade Manila — by Todd English**, Bonifacio Global City.
Single page: `index.html` (+ `press.css`, `pdf.css` print-only, `press.js`). The v7 cinematic
hero CSS lives in the **inline `<style>` inside index.html**, not press.css — easy to miss.

## Key decisions (2026-09-07)
- **Rebranded off "Jade Supper Club".** Source of truth = `D:\New AI Directory\Jade supper club\Jade Logo Deck Final.pdf` (9 pages, not 329 — the file metadata lies).
- **Logo lockup = `JADE / MANILA`** (page-1 primary), stacked and CENTRED. Didone serif over tracked
  small-caps sans. The deck defines **no script face and no green/gold wordmark** — colour is
  binary black-on-light / white-on-dark. Deck uses cream `#f3ead9` on the dark ground.
  (The green/gold looks in the PDF are foil + laser *finishes* in mockups, not brand colours.)
  2026-09-07 correction: an earlier build used the 3-line `BY TODD ENGLISH` variant with loose
  tracking, built from a written description instead of the artwork. Page 1 is the primary and it is
  two lines. Proportions now matched to the art: MANILA ~0.28x JADE font-size, ~0.52x its width,
  centred, sitting tight beneath. The 3-line variants are still official (page 9) if ever wanted.
- **"Supper club" dropped entirely** — as the name *and* as the concept/positioning. The deck no
  longer uses the term anywhere; copy now leans on "dinner, music, late bar" and names Jade directly.
- **Cigar Lounge** (formerly "The Salon · Private Dining") uses render **jade-11** (wine-cabinet
  wall) — Leon picked it by sight over jade-12 (fireplace wall of the same room).
- Fixed numbers left untouched: **96 seats**, ₱13M / 18%, ₱40.1M total project cost.

## Verified state (2026-09-07, not deployed)
- Logo correct in **both** places: the animated v7 hero title and the static Page-1 cover.
- Brand swept: page title, all page headers, wax-seal arc, monogram (`JS` → `J`), marquee, quote credit.
- Slides done: story headline ("When the iconic Bank Bar closed…"), agenda **Cocktails & Caviar**
  (was The Ice Bar), editorial + Grand Room now use generated shots, rooms teaser + cover +
  banquette + cigar lounge on final renders.
- **13 hover videos wired, 0 broken images.**
- **NOT DEPLOYED.** Everything is local. Preview: `http://localhost:4173/jadesupperclubv3/index.html`
  via the `nextframe-site-static` launch config.

## Landmine: hover videos
`index.html` (~line 1251) wires hover clips by matching `src` against `/img\/([^\/]+)\.jpg/` and a
hardcoded `CLIPS` array, scanning only `.kit-wrap img` and skipping `.cover-photo`.
**Repointing any `img/*.jpg` whose basename is in CLIPS to a `dev-renderings/…` path silently kills
that tile's hover video.** Count went 14 → 13 when the Cigar Lounge tile moved to a render.
Hero-teaser floats and the cover are outside this system, so those swaps are free.

## Assets
- `dev-renderings/enhanced/jade-NN-cand1.jpg` — 16 enhanced renders (NN = 00–08, 11–17).
- `dev-renderings/enhanced/gen/` — 2 Nano Banana composites (editorial singer+band, Grand Room DJ+dancers).
- `dev-renderings/veo-web/jade-walkthrough.mp4` — **DONE**: 16 clips stitched, 72s, 1280×720 silent.

## Open / next
- Optional: extend final renders to the remaining gallery tiles — **each costs that tile its hover video**. Recommendation was to keep the hover videos.
- A matching cigar-lounge hover clip would need **Flow video credits** — video is no longer free
  after the flow.google.com migration (see `project-flow-migrated-to-flow-google-com` memory).
- Deploy only on Leon's explicit say-so.

## 2026-09-08 update

- Deck is now **22 pages** (the "Build, Phase by Phase" placeholder was removed and everything renumbered).
- Menu page runs Jade Manila's own dishes with photography generated **on the brand plate** — the
  reference image must be ATTACHED as an ingredient chip, not described in the prompt. Describing it
  produced generic dark-restaurant shots that the client rejected.
- **Open item:** total project cost reads ₱38,000,000 but the itemised breakdown still sums to
  ₱40,083,352. A note on the page states both. Needs the client's revised line items — do not invent them.
- Flow lane: always pass `--project https://flow.google.com/project/8c6cd836-...` (the Jade tab).
  `flow2.mjs` now hard-fails with AMBIGUOUS_LANE if a caller omits it while several Flow tabs are open —
  that guard exists because omitting it let this job hijack another client batch's tab mid-run.
- Typefaces remain unresolved: the logo deck is fully outlined (no font names anywhere), and quantitative
  glyph matching against 23 Google fonts scored 0.39 at best where a true match scores 1.00. It is a
  licensed commercial face. Clean 600-DPI crops for WhatTheFont were handed to the client.

## Layout traps (learned the hard way, 2026-09-08)

- `.sheet` is a **fixed 1056px page with `overflow:hidden`** — extra copy clips silently, no error.
  Three sheets were clipping before this was caught; the menu page was losing 65px.
- **Bump `press.css?v=N`** in index.html whenever press.css changes, or the browser serves the old file.
- Gallery image heights are set in the **inline `<style>` in index.html**, not press.css — the inline
  rules win, so editing press.css for those does nothing.
- Gallery tiles had photos that did not match their captions. Audit **all** tiles when one is reported;
  the correct images were already sitting unused in `img/`.


## Brand Guidelines V01 adopted (2026-10-03)

`Jade supper club/Current Jade Updates/Jade Brand Guidelines V01 .pdf` is now the **source of
truth**, superseding the logo deck for colour, type and logo colourways. The logo deck remains
correct on lockup geometry.

**Type system (settled — stop guessing at it).** The book names the faces and the PDF's embedded
font table confirms them: primary **Acumin Variable Concept Extra Condensed Black**, alternative
**Futura Bold**, body **Figtree Regular**. The earlier hunt that scored 23 free fonts and topped
out at 0.393 was right that no free face matched — the primary is a licensed Adobe face.
Web build substitutes **Archivo `font-stretch:62%` wght 900** and **Jost 700**; **Figtree is
exact and free**. There is **no serif in the brand system** — the Didone "JADE" is logo artwork
only, so Bodoni Moda is out of the deck.

**Palette.** Woodsmoke `#09110c`, Jade Green `#032316`, Spring Green `#21725f`,
Verdigris `#3fbba1`, Almond `#ebdec4`, White Smoke `#f6f5f1`, Gold `#b9a04b`
(gradient `#663400 -> #fcebc3`), Brass `#5c2a00`. Three tones the book does not name were
derived by mixing its own values: `#9aa59e` muted type, `#0a2b1c` raised panel, `#104333` border.
Every colour in the deck is now one of these.

**Logo.** Primary = `JADE / MANILA`, secondary = `JADE / TODD ENGLISH / MANILA`, plus a vine
**brand icon**. All three extracted as true vector from the guidelines PDF into `img/`:
`jade-primary-{white,gold,green}.svg`, `jade-secondary-{white,gold}.svg`,
`jade-icon-{white,gold,verdigris}.svg`. `jade-manila-logo.svg` is kept as a copy of
primary-white so older references keep resolving.
Only **three colourways are approved**: white on dark, spring green on white smoke, gold on
jade green. **Recolouring the logo is an explicit DON'T** — the cream `#f3ead9` wordmark this
deck shipped through September was off-brand. Minimum size: logo 40px / 14mm, logo-with-icon
80px / 28mm.

**Voice (§01.3), applies to any future copy.** Assured never loud, warm never familiar, witty
never silly. Short sentences, **no exclamation marks**. Say: *rare, after dark, the night set,
bloom, indulgence*. Never say: *cheap, deals, vibes, hottest* — and **never mention Bali**.
Note the book itself calls Jade "a supper club and cocktail bar in BGC": supper club is fine as
a **category**, it is only dead as a **name**.

**Open question for Leon:** the back cover now carries *G/F, RCBC Savings Bank Corporate Center,
26th & 25th Street, BGC* and `jadebarmanila.com`. The address appears in the book only as the
**typography hierarchy specimen** on p12, not as a contact block — worth confirming before print.

**New traps**
- `currentColor` does not inherit through `<img>`; bake each colourway into its own file.
- The brand marks have a small intrinsic viewBox (196x74). `width:100%` collapses to that inside
  a shrink-wrapped parent — pin logo widths in px.
- Colours can hide **URL-encoded inside data-URI SVGs** (`%23c29a55` in press.css). A hex scan
  will not see them; scan `%23` as well.
- The zip `Jade logos with icons.zip` is flat RGB PNG with baked backgrounds and **no alpha** —
  unusable on the dark ground. Extract vector from the PDF instead.


## The deck is 23 pages (2026-10-03, later)

A page was inserted: **03 · The Jade Vine**, the brand's origin story told in the
guidelines' own words, with the vine photograph full-height. Everything after it shifted
by one and the deck is now **23 numbered pages across 24 sheets** (the editorial plate
after the cover still carries no number — pre-existing, cosmetic).
If you add or remove a page, you must update: every `NN/23` marker, the `toc-pg`
entries, the "Twenty-three pages" standfirst, and the "see Press Assets, page 22"
cross-reference in the contents foot-note.

**Brand imagery now in `img/`** (extracted from the guidelines PDF, not re-generated):
`vine-hero`, `vine-tall`, `jade-cocktail`, `jade-stone`, `brand-texture`,
`vine-interior`, `app-menucard`, `app-signage`, `app-tray`, `app-coasters`.

**Two assets carry conditions.**
- `app-signage.jpg` is the guidelines' exterior mockup and it shows a **David Guetta
  "Opening DJ" poster**. It is deliberately **not used** — in an investor kit that reads
  as a booking claim. Only use it if Leon confirms the booking.
- `app-menucard.jpg` has been **cropped to its head** because the specimen body is
  lorem ipsum. Do not swap the full-height version back in.

**Where the brand speaks now:** cover ("Rare by design"), editorial plate ("Jade gives
the Philippines nights it has never had"), the vine page (the full story, "Like the jade
vine, it isn't for every day", "Philippine soul · Global table"), a vine-icon watermark
on all three dividers, the wordmark on both plates, and six applications on The Mark.

**CSS trap learned here:** to float a watermark behind a block's own text, give the block
a stacking context (`position:relative; z-index:0`) and the pseudo-element `z-index:-1`.
Do **not** set `position:relative` on the children to lift them — `.div-foot` is
absolutely positioned and that silently drops it onto the standfirst.

## 2026-10-03 (redesign session, separate from the kit work above) — Motion prototypes for the public website
- Separate session built four live scroll-animated website prototypes (not the kit): https://claude.ai/artifact/C58UEe3UY2TPS7Adse3sXS — hub + A The Curtain / B The Evening / C The Onyx / **D The Walkthrough (flagship, built to Brand Guidelines V.01)**.
- D: preloader → pinned scrub of 144 WebP frames cut from `Jade supper club/Jade preview - no text.mp4` (six 4s moves at 0/21/9/24/30/54s, 1536px, NextFrame bug delogo'd x1730 y920 170×140) with six chapters in the book's voice; jade-vine story in a gold arch that draws on scroll; WebGL ripple room gallery; kinetic caviar-bar menu; THE NIGHT SET video-through-type; glass reserve panel; sound toggle (48s loop from `Music/Jade Supper club v3.2.mp3`); custom cursor; GSAP 3.13 ScrollSmoother.
- Uses THIS folder's `img/jade-primary-white|gold|green.svg`, `jade-secondary-gold.svg`, `jade-icon-white|gold|verdigris.svg` and the same web type substitutes (Archivo 62%/900, Jost 700, Figtree). Palette aligned to press.css tokens (#09110c #032316 #21725f #3fbba1 #ebdec4 #f6f5f1, gold #b9a04b/#dac47f, gold-leaf gradient).
- Source files live in that session's scratchpad `jade-motion/`; to build out, copy into this repo as `motion/` or a new `site/` folder. Open items: real phone; SevenRooms/TableCheck widget; BGC address is the book's type specimen, unconfirmed; keep or restore the NextFrame bug in scrub frames.
- 2026-10-03 (redesign session) TYPE NOTE: Leon flagged the headline face as off-brand in the prototypes. Archivo at wdth 62 / 900 reads too wide and heavy next to the book's Acumin Variable Concept Extra Condensed Black, and in Leon's viewer the width axis did not apply at all (rendered full width). Prototypes now use **Sofia Sans Extra Condensed 900** (Google Fonts; Saira Extra Condensed 900 as fallback), which matches the cover type closely. The kit's `.section-title/.div-title/.v7line` etc. still use Archivo 62% — consider the same switch so kit and site agree. Real fix for the live site: Acumin via Adobe Fonts if Leon's Creative Cloud plan has web projects.
- 2026-10-03 (redesign session) HERO NOTE: Leon saw "no change" after the face swap; the real issue was scale, not face. D's hero now follows the book's cover: large white JADE / MANILA lockup, gold hairline rule with place+date, "RARE BY DESIGN." at clamp(34px,5.6vw,88px) beneath, tracked Jost sub-line. All section headlines brought down to editorial sizes (36–72px desktop). Artifact v8.
- 2026-10-03 (redesign session) VINE CURTAIN: Leon asked for jade vines hanging in front of the hero that part as you scroll. D now opens on a curtain of 9 strands (8 flanking at three depths + the macro strand dead centre as the focal point, per Leon) that part left/right with a pivot over the first 16% of the pinned walk; the centre strand lifts away last to reveal the lockup. Cutouts made by HSV colour key (teal vs dark ground) with PIL — `brand/vine-a.webp` from img/vine-hero.jpg, `brand/vine-b.webp` from img/vine-tall.jpg; rembg was not needed. Artifact v9.
- 2026-10-03 (redesign session) DRIP: per Leon, a single water drop swells at the tip of the centre vine strand, falls to the onyx floor and spreads three perspective rings (+ a splash highlight); loops every 3.5–7 s while the curtain is up, pauses when the tab is hidden or the vines have parted. Pure CSS elements + GSAP timeline in d.html (`function drip()`). Artifact v10.
- 2026-10-03 (redesign session) WEATHER OPENING, per Leon's sketch: canopy of 12 short vine strands across the top + 2 hangers + the macro strand at centre; open dark middle holds the lockup; water fills the lower 42% with a horizon line. Loop: distant soft rain comes in behind the vines (canvas streaks, haze, faint rings on the water) → rains → subsides → stillness → one drop swells at the centre strand tip, falls into the water, three big perspective rings (scale 16) → hold → repeat. Glints sampled from the strand's opaque bright pixels twinkle during rain. On scroll the canopy lifts away and the water sinks. Debug hooks in d.html: `window.__forceWeather=true` (ignore document.hidden), `window.__dropNow()`. Artifact v11.
- 2026-10-03 (redesign session, END — usage limit): D opening now matches Leon's sketch: dense canopy band (60 strands in 5 depth layers, sized by height not scale), 3 danglers (centre macro strand longest, to ~39vh), lockup in the open middle at 45vh, water at 66vh, bigger drop (18×26px) and bead-like petal droplets, bigger/slower sway + pointer parallax per layer. Artifact v12. NOT yet re-verified visually after the last two patches (hidden pane throttles GSAP via lagSmoothing, so timing checks there are unreliable) — Leon should eyeball: lockup clear of the strands, rain distant, drop → rings on the water. Debug hooks: `__forceWeather=true`, `__dropNow()`.
- 2026-10-04 (redesign session) GLASS WALL: per Leon, a pane now separates us from the rain. `.wall#glass` sits between the rain canvas (z1, outside) and the strands (z3+, inside): backdrop-filter blur softens everything outside; a `#pane` canvas grows beads on the glass during rain (dark rim, glassy body, highlight), some break and run down leaving fading trails, all evaporate as the rain subsides; a diagonal sheen + edge fog follow rain intensity. Fixed a class collision (`.glass` was already the reserve panel). Fixed the lockup padding (shorthand was resetting padding-top). Artifact v13.
- 2026-10-04 (redesign session) MOBILE FIX: Leon's phone screenshot showed oversized glass beads all running at once with dotted trails and a blurred lockup. Beads now capped (r ≤ 2.4px mobile / 3.4 desktop, ≤26 / 90 of them, slow growth, run only near cap), trails are thin fading lines, and `.walk .intro` is z-index 7 (inside the room, above the glass, sharp). Verified at 375×812: no overflow, lockup at 40vh, beads subtle. Artifact v14.
- 2026-10-04 (redesign session) REAL WATER: Leon said the ripple looked fake. The CSS rings are gone; the pool is now a height-field water simulation (`#wsim`, 220×56 grid desktop / 120×40 mobile, classic two-buffer wave step, damping .968) rendered through an offscreen buffer and scaled over the lower 34vh with highlight/shadow shading from the surface normals. Rain pokes it lightly, the single drop pokes it hard with two follow-up bounces; waves spread, interfere and decay. Gotcha: `.walk canvas{inset:0;...}` out-specifies a class, so the pool canvas is styled as `.walk canvas#wsim`. Artifact v15.
- SONG: Leon asked for "Jade in the Moonlight" in the background. Not on disk (Jade Music/ has only "Jade Supper club v2–v4.2" Suno exports, titles tagged the same; Master Music folder has no Jade/moon track). Suno lane :9228 probes signed out (user:null, age-gate state) — Leon must sign in on that window, then `node scripts/suno-dl.mjs <id> jade-in-the-moonlight` (metered download) → trim 48s loop to `jade-motion/audio/ambient.mp3` with ffmpeg (afade in 2s / out 3s, 96k) and republish. Or drop the mp3 in `Jade supper club/Music/` and say so.
- 2026-10-04 (redesign session, END — usage limit) MOBILE v16: Leon's phone was showing the cached 2:50 build (v13). Added `?v=16` to every a/b/c/d link so phones refetch. Applied: water fades in (sim alpha ramps over top 40% of the band, softer gradient, horizon line at 22% @ .5), mobile pool 26vh + lockup at 34vh, stage height 100svh, `ScrollTrigger.config({ignoreMobileResize:true})`, ScrollSmoother only on hover-capable devices (native scroll on touch), no backdrop-filter on mobile, DPR 1 on mobile, smaller sim grid. NOT DONE: Leon's six-layer depth canopy (few large near strands, more and smaller per layer going back) — a rewrite script was drafted twice and refused itself on a stale-rule assert; redo it cleanly: replace the strand markup block + the `.vs…` layer CSS (keep `.vs img` base, `@keyframes sway/swayFar`, `.vs .sw` rules) with layers l1–l6 (52/40/32/24/17/12vh; counts 2/4/6/9/13/18; brightness 1/.86/.68/.5/.36/.24; blur 0/.25/.7/1.2/1.8/2.4px; --pz 2.6/1.9/1.3/.8/.45/.2vw). Song "Jade in the Moonlight" still pending (see above).
- 2026-10-04 (redesign session) PERSPECTIVE CANOPY v17: per Leon + IG reel DbQoJsxS7FQ (a perspective-placement tutorial: one level horizon, scale ∝ 1/depth, far elements converge on the horizon). The water line is the horizon (`.vines{--hz:66vh}`, 74vh mobile). Six strand layers with s = 1/.56/.38/.25/.17/.11: `top = hz − s·80vh`, `height = s·52vh`, spacing 24vw·s, brightness .22+.78s, blur (1−s)·2.6px, parallax 2.6vw·s, sway near/mid/far. 89 strands desktop; mobile hides l5/l6 and every other l3/l4, dims l3/l4, danglers 34vh. Verified desktop layer tops at −14/21/36/46/52/57vh converging on 66; mobile 25 strands, no overflow. Reel archived at reel-library/media/DbQoJsxS7FQ.mp4. Song still pending (see above).
- 2026-10-04 (redesign session) HORIZON v18 — Leon's green line: the horizon is HIGH (20vh), through the middle of the big strands. Rule now: `top = hz − 0.6·L`, `height = L = s·73vh` for s = .75/.5/.34/.23/.15/.1, so every strand (and the hero, 52vh wide) is crossed by the 20vh line at 60% of its length; far strands become tiny figures sitting ON the line. Only 13 strands + hero (2/2/2/3/2/2 per layer) — distinct figures, not rows. Water back to the bottom 30vh, lockup at 42vh, faint mist band on the horizon. Verified desktop layer spans −13→42, −2→35, 5→30, 10→27, 14→24, 16→23 vh. Mobile hides l2/l5/l6.
- 2026-10-04 (redesign session) LOW HORIZON v19 — Leon ticked the reel's low-eye-level frame (line ≈72%, crossing figures at the knees). Now `--hz:72vh`, every strand crossed at 75% of its length (`top = 72 − .75·L`, `L = s·100vh`, s = .75/.5/.34/.23/.15/.1 → spans 16→91, 35→85, 47→81, 55→78, 61→76, 65→75 vh); hero 46vh wide (top ≈33vh, tip ≈85vh); water 28vh from the horizon down; lockup moved to the top band (12–39vh) at z-index 9 above the strands. 13 strands + hero.
- 2026-10-04 (redesign session) v20 — composition now mirrors the reel's ticked frame: horizon 72vh, every strand crossed at 75% of its length; HERO (vine-a) is the nearest/biggest at centre (80vh long, 12→92vh), near vine-b at +36 (16→91), mid at −40 (35→85), far ones at s .34/.23/.15/.1 in the gaps (12 strands + hero). Lockup moved to the upper-LEFT (left-aligned, max-width 34vw, z-index 9). Mobile: lockup centred at top, hero 46→78vh, near strand on the right, far ones faint; verified no overflow. Published as artifact v20.
- 2026-10-04 (redesign session) v21 — FINAL READ OF LEON'S BRIEF: short strands hang from the top, every tip just over ONE line at 22vh (near tips ~27vh, far ~23vh), small/dim/soft with distance, crowns hide cut tops; lockup centred below (40vh); curtain lifts straight up with scroll and `.vines` goes `visibility:hidden` at full lift. The tall-strand perspective stack (v18–v20) is GONE — Leon: "the current perspective is all wrong, I just wanted the bottom of the jade just hanging over the horizontal line". Walk frames re-cut at full 1920 width, WebP q80, unsharp 5:5:.55 (22.7 MB / 144 frames); canvas DPR cap raised to 2. Mobile: hero hidden, near pair hidden, far strands only + lockup at 38vh.
- 2026-10-04 (redesign session) v22 — Leon saw the preloader frozen at 0% on the live artifact after the 23 MB frame re-upload (unauthenticated probes can't see artifact files, so the cause is unproven; most likely slow/propagating file serving right after a large publish). Preloader now opens after the FIRST 6 frames or 7 s, whichever first; frame 0 loads first; progress text moves while requests are in flight. Links bumped to ?v=17. If it recurs: re-encode seq at q72 (~17 MB) or 1600px, and consider hosting frames on next-frame.agency instead of the artifact store.
- 2026-10-04 (redesign session) v23 — Leon: (1) strands cut off → centre strand now uses vine-b (natural tip) instead of the cropped macro; (2) "moving in unison" → layered lift: per-layer lag .22·(1−d) and distance 18+92·d² vh (near 110, far ~33); (3) drop+ripple now the OPENING beat (1.2 s still → drop → ripple → 8 s hold), rain cycle after; (4) "still low res, make higher-res ones with Flow" → Flow MCP text-image works (project 21ca631b tab, AMBIGUOUS_LANE needs --project) and produced a perfect raceme-on-black (`jade-motion/gen/vine-raceme-a-cand1.jpg`) BUT the driver saves a 1280×720 preview → need 9:16 + full-size download before it's useful. Pending.
- 2026-10-04 (redesign session) v24 — HI-RES VINES DONE: Flow MCP `flow_generate_text_image` (project https://flow.google.com/project/21ca631b-1406-4df4-b6ac-204cfae41e77 — pass `project` or you get AMBIGUOUS_LANE; the connector call "times out" at ~60 s but the driver finishes and saves `<stem>-cand1.jpg` ~1–2 min later) → two racemes on pure black (`jade-motion/gen/vine-raceme-{a,b}-cand1.jpg`, 1280×720 / 1376×768) → Real-ESRGAN 4× via HF space Nick088/Real-ESRGAN_Pytorch (`gen/esrgan-vines.py`, py -3.12, ~1 min) → 5120×2880 / 5504×3072 → luminance key off black + un-premultiply (PIL/numpy) → `brand/vine-hi-a.webp` (980×2400, fuller) and `brand/vine-hi-b.webp` (675×2400, slender). Hero = hi-a at 58vh; strands alternate hi-b/hi-a. Prompt that worked: single hanging raceme of Philippine jade vine, Strongylodon macrobotrys, from a thin woody stem at top, turquoise claw blossoms, tapering to a tip, pure black seamless studio background, 8K product photography. Flow project aspect is 16:9 (strand ≈ 700 px tall before ESRGAN); `vine-a/b.webp` (PDF cutouts) are now unused.
- 2026-10-04 (redesign session) v25 — SHARP WALK: Leon "can't stand this low res blurriness" (the preview film is a soft 1080p render and chapter III sat on a cross-dissolve). The 144-frame video scrub is REPLACED by six 4K room stills with a scroll-driven push-in (scale 1→~1.1 about a focus point) and an 18% dissolve into the next room. Sources: Veo stills 2560×1312 (`Jade supper club/Video - Veo Stills/veo-06,02,05,07,12.jpg`) + `Generated previews/jade-preview-01.png` (corridor, 1024) → Real-ESRGAN 4× (`gen/esrgan-rooms.py`) → 3840 wide WebP q82 with light unsharp → `jade-motion/rooms/r1-corridor…r6-salon.webp` (2.6 MB total vs 23 MB). Preloader opens on the first still. Centre strand enlarged (84vh), slender strand re-keyed without side trimming. The old `seq/` frames are still in the artifact store but unreferenced.
- 2026-10-04 (redesign session) v26 — CRISP PASS: (1) animated film-grain overlay removed (it read as fuzz), vignette softened; (2) rooms re-sourced from the CLEAN renders `Jade supper club/Generated previews/jade-preview-{01,05,14,02,07,13}` (not Veo video frames) → ESRGAN 4× → 3840w WebP q84 unsharp .45; Laplacian-variance check: renders 877–2502 vs Veo frames 372–1505 at 1920w; (3) hero raceme regenerated in Flow with a richer botanical prompt (`gen/vine-hero-c-cand1.jpg`, 1376×768, dewy/dense) → ESRGAN → keyed against a per-row left→right background gradient (the render has a teal glow, not flat black) → `brand/vine-hero.webp` 1497×2600; (4) drop origin now = lowest opaque row of the strand silhouette (confirmed in-browser: drop x within the strand, y just above its tip). Ceiling note for Leon: all room imagery is AI-rendered; clean renders upscale well, video frames don't.
- 2026-10-04 (redesign session) v27 — STAGE: Leon: the onyx proscenium "is not the stage". The Stage is the GOLD-leaf arch room (`jadesupperclub/img/stage-guests.jpg`, 1024px) → ESRGAN 4× → `rooms/r3-stage.webp` (3840) and `img/stage.jpg` (1600, gallery card). Hero reframed to 64vh so the blossom body is on screen, not just the tip. HERO DETAIL still the open problem: Flow 16:9 gives ~650 px of strand; the 9:16 attempt via `flow2.mjs image-gen --aspect 9:16` harvested ANOTHER session's render (shared project 21ca631b, concurrent use → wrong newest tile) and then failed on a blocking popover ("Settings trigger" intercepted by cdk-overlay-backdrop); `flow-new-project.mjs` can't find the "New project" button any more. Next: when the other Jade session is idle, create/choose a dedicated project and re-run the 9:16 prompt (stored in this handoff above), ESRGAN, key with the left→right bg gradient (`gen/key-hero.py` variant). Higgsfield upscale is not an option (0.05 credits).
- 2026-10-04 (redesign session) v28 — FOOD IN THE WALK (Leon: "not enough food mentioned in the first 6 slides, not acceptable"). Chapters now: I curtain (wood oven lit, caviar on ice) · II floor (one menu by Todd English; raw bar, wood and fire, pasta at the table; See the menu) · III THE RAW BAR = fd-oyster-real photo (oyster tower, kinilaw, caviar service) · IV WOOD AND FIRE = fd-beef-real photo (lapu-lapu, short rib, wagyu sando; Reserve) · V the stage (gold arch; dinner through the band) · VI after dark (soufflé at midnight, chocolate and barako). Food photos ESRGAN'd 4× → rooms/r3-rawbar.webp, r4-fire.webp (real photography, 1024 source). ROOMS order: corridor, floor, rawbar, fire, stage, salon.

### v29 (2026-10-04) — food, drinks, atmosphere across the six chapters
Leon: "food drinks and atmosphere". Added a drinks chapter and folded the stage + soufflé into one closer so all three are present:
I corridor (atmosphere, oven + caviar) · II floor (77 seats, menu, bar until 2AM) · III raw bar (food, oyster tower) · **IV The pour (drinks, NEW)** "The Jade Negroni. The house pour." over `rooms/r4-bar.webp` · V wood and fire (food) · VI "The night set arrives at ten. Soufflé at midnight." (stage, gold arch).
`rooms/r4-bar.webp` = `img/bar-coupe-real.jpg` (1600x900) with the old JADE BAR MANILA watermark clone-stamped out (`gen/bar-clean.py`), Real-ESRGAN 4x, 3840 WebP q84 (390 KB). ROOMS/MOVES reordered; r6-salon dropped from the walk. Published artifact v29.

### v30 (2026-10-05) — hero raceme WOW + stage swap
- Leon circled the centre strand: "doesnt have that wow factor". Flow lane was free of the other Jade session, so `scripts/flow2.mjs image-gen --aspect 9:16` in project 21ca631b produced `gen/vine-hero-tall2.jpg` (768x1376, dense dewy raceme with leaves on pure black; prompt in the script call). NOTE: that call flipped the shared project aspect to 9:16 — set it back to 16:9 before any 16:9 job there.
- Real-ESRGAN HF space hit the ZeroGPU free quota (3h20m lockout at ~01:00 2026-10-05). INTERIM: `gen/key-hero-tall.py <jpg>` does a 2x Lanczos pre-scale + gradient-bg key -> `brand/vine-hero.webp` 821x2701. At 1440x820 the hero renders ~917 px tall from 2701 natural, so it is crisp on screen; re-run `gen/esrgan-one.py gen/vine-hero-tall2.jpg` then `key-hero-tall.py` (no arg) when the quota resets for 4K-screen headroom. Local torch is CPU-only, no ESRGAN weights on disk (spandrel installed in py -3.12 if weights are ever approved for download).
- Hero CSS: desktop top:-72vh height:110vh (bottom ~39vh, 327 px wide at 1440), mobile top:-46vh height:80vh.
- STAGE: Leon: the gold-arch room "aint the stage" either (second rejection after the onyx proscenium). image-qc swept all 14 originals, Veo stills, previews with people/Flow/no-people: NO render has stage hardware. The only render with performance cues is `img/nr-dj-floor.jpg` (tiered banquette steps, theatrical spotlights, mirror ball) -> `rooms/r6-dj.webp` (Lanczos 2x 3200, interim) for chapter VI and `img/stage-dj.jpg` for the gallery card. Chapter VI copy: "The tiers fill and the lights drop." If Leon rejects this too, the stage has to be GENERATED (no source render exists).

### Night set programme (2026-10-18) — `program/index.html`
- Leon: "about 3 dances each night… modular… not too hard to achieve… visuals… the first show should be burlesque with elements of jade and gold, give me a color pallet and fabric patterns." Built as a standalone page `program/index.html` (NOT linked from the kit, not deployed): three fixed acts (10:00 PM stage / 11:15 PM floor / 12:30 AM floor+DJ), nine swappable pieces (3 per act), six-night rotation (Mon dark), run-of-show cue sheet, company + kit + build order.
- Show 1 = **Jade Fans** (feather-fan burlesque). Palette is 100% brand-book values (woodsmoke, jade, spring green, verdigris, oxidised gold #663400 + gold-leaf highlight #FCEBC3 from the gradient, gold, light gold, almond) with a 55/30/10/5 ratio; eight fabric repeats are inline SVG `<pattern>`s derived from the guidelines' graphic elements (vine raceme, arch line-work, vertical lines, sequin scale, deco fan, chevron fringe, trellis, moiré). Beats + costume rail + two lighting looks are on the page.
- Visuals: Pollinations free lane now WATERMARKS ("pollinations.ai" bottom-right, `nologo=true` ignored) and returned 402s; 3/5 failed QC (subject not rendered, yellow/lime drift). Switched to `scripts/artlist-gen.mjs image … --model "Seedream 5.0 Pro"` (browser lane :9223, Unlimited-guarded) via a subagent. Targets: `program/img/m1..m9-*.jpg`, `f1..f4-*.jpg`, `lockup.svg`.
- 2026-10-18 later: all 13 visuals landed on Artlist Seedream 5.0 Pro (0 credits, 0 QC fails; m7/m8 least covered, f2/f4 pale). Artifact v2 https://claude.ai/artifact/2UA98njU9uVDhE47R9KLDh. Page also shows the four fabric macro references under the SVG patterns.
- 2026-10-18: Leon: no censorship of how covered the dancers are. Removed all coverage language from program/index.html (lead, almond swatch, trellis note, beats 3 and 6, mesh-body line, Shadow card). Artifact v3.
- 2026-10-18: Leon picked the f4 feather swatch as THE colour combination ("the dresses and the outfits should use these colors"). Costume palette rebuilt from sampled values: feather greens #2d5a36/#497851/#699977/#89ad8c, champagne #e1ddca/#c7c5a9, golds #a5884d/#b39a63/#cbaf77/#e6ce9c (50/25/20/5). SVG patterns recoloured to match; brand deep jade/woodsmoke stay on the ROOM only. Artifact v4. Nine dance visuals being re-rolled as program/img/v2-m*.jpg on Artlist Seedream 5.0 Pro with the new colour tail.
- 2026-10-18: Leon on the Gold Leaf flapper render: "these outfits are too old school". Rule: wardrobe is CONTEMPORARY across all nine pieces (modern showgirl line in the feather palette), never period: no flapper fringe dresses, no bowler hats, no 1920s caps; fringe = trim only. Page copy updated (Act I card, Show 1 lead, costume rail, pattern 06, M2/M3 cards, library intro). Artifact v5. Re-roll agent redirected for v2-m2/v2-m3.
- 2026-10-18: Leon sent two refs of sleek black floor-length halter / one-shoulder column gowns with a high thigh slit ("more like these kind of dresses with a high slit"). HOUSE SILHOUETTE = that gown, in the feather palette, across all nine pieces; bodysuit wording removed. Page v6. Agent re-rolling v2-m2/m3 in gowns + a wardrobe ref v2-w1-the-dress.jpg.
- 2026-10-18 (restructure): Leon: "we only need about 4 dances a night, all girls group and it needs to be sexy" + "I love the shape and cut of these dresses [black halter column, high slit] but different colors like a grey and jade light green with gold trim". Page now: FOUR acts (10:00 opener stage / 11:00 the line stage / 12:15 Philippine soul floor / 1:00 late set floor+DJ), EIGHT all-female pieces two per act (Jade Fans 1+3, The Chair; Gold Leaf, Mirror [new]; Pandanggo, Tinikling all-women; The Shadow, After Dark). Tango and Carinosa DROPPED (needed a man). Gown colourways: light jade #89ad8c / smoke grey #8e9490 / charcoal #3d423f (replaces black), all gold-trimmed; champagne = lining/gloves only. Ratio 45/30/20/5. Artifact v7. Re-roll agent told to finish current image and stop; a clean final run follows with the settled brief (female casts, sexy register, gown silhouette, grey/jade/gold).
- 2026-10-18: Leon on the Pandanggo render: "this is too pinoy, the theme doesnt need to be philipino at all". Act III is now THE WALK (between the tables): Velvet (3, light jade, slow aisle walk, hand on a shoulder) and Smoke (4, charcoal, low-fog floor piece, side-lit). Pandanggo and Tinikling dropped; no Filipino framing anywhere on the page. Artifact v8. Final image run still to launch: m1 fans, m2 chair, m3 gold leaf, m10 mirror, m11 velvet, m12 smoke, m8 shadow, m9 after dark, w1 the dress.
- 2026-10-18 FINAL VISUALS: v3-m1/m2/m3/m10/m11/m12/m8/m9 + v3-w1-the-dress.jpg (Artlist Seedream 5.0 Pro, 0 credits, craft QC 7 PASS / 2 notes / 0 FAIL; Leon: "i like these"). Page now references the v3 set and shows the dress three ways under the costume rail. Old m1-m9 removed from the artifact (v1/v2 files still on disk in program/img). Artifact v9. Leon: Flow is on PRO, not free (memory feedback-flow-is-pro-not-free) — for a consistent six-face cast, Flow NB2 reference-anchored is the lane.
- 2026-10-18: Leon: "this long dress is one outfit, give me more variations for different situations and shows". Added section 03 THE WARDROBE: seven looks in the three colourways + gold piping (01 Gown, 02 Mini, 03 Two-Piece bodysuit+detachable sheer skirt, 04 Tux blazer-nothing-under, 05 Catsuit, 06 Corset, 07 Robe) with a look × piece/situation matrix (Doors / Tables / DJ booth are off-stage situations). Module kit lines now cite look numbers. Later sections renumbered 04-07. Lookbook images v3-w2..w7 generating on Artlist (agent artlist-gen-4). Artifact v10 = text only, images follow.
- 2026-10-18: Leon: "i want a moulin rouge segment, a chicago cell block tango" -> two Act II HEADLINERS, once a week each (Fri Cell Block, Sat Cancan, all six on): Cancan (Offenbach galop, public domain, Look 08 ruffled skirt over the corset) and Cell Block (six gold chairs, six stories, Look 06 charcoal; built on an ORIGINAL track unless the musical grand rights are bought; the venue blanket music licence does not cover a staged reproduction). Week grid, company, kit, build order updated; wardrobe now 8 looks; matrix has Cancan/Cell Block columns.
- 2026-10-18: Leon on the emerald velvet/sequin swatches: "these colors are too hard to wear". All eight SVG repeats now sit on the gown bases (P1-P4 light jade #89ad8c, P5-P8 smoke grey #8e9490) with gold lines; feather jade #497851 is feathers only, never fabric; "feather-jade" fabric wording removed. Fabric photos f1-f3 re-rendering as v3-f1..f3 in the light palette (f4 feather stays, it is the chosen swatch). Images queued on agent artlist-gen-4: w2-w7, m13 cancan, m14 cell block, w8 cancan skirt, f1-f3. Artifact v11 = text/patterns, images follow.
- 2026-10-18: Leon: the three-gown render (v3-w1-the-dress) "is the standard, then how are the color palettes so different". Palette now SAMPLED FROM THAT IMAGE (sheen/body/fold per colourway): light jade #a5b29b/#7b8f75/#576e53, smoke grey #a9a59c/#89867c/#5c5a50, charcoal #45453e/#262a23, gold piping #d6b286/#b77f59. Body value = what wardrobe orders. SVG patterns recoloured to the same values. The feather-swatch greens are no longer the fabric reference. Artifact v12.
- 2026-10-18 WARDROBE VISUALS: v3-w2..w8 (looks), v3-m13 cancan, v3-m14 cell block, v3-f1..f3 (light-palette fabrics) landed on Artlist Seedream 5.0 Pro, 0 credits; craft QC 8 PASS / 4 notes / 0 FAIL (w5 feet cropped at frame edge; m13 two cream bodices; m14 five beams for six women; f2 sequins read as enamel discs). Old f1-f3 removed from the artifact. Stray captures parked in program/img/_stray/ (w4-stray.png, f3-stray.png) - check then delete. Artifact v13 = complete.
- 2026-10-18: Leon crossed out Looks 04 Tux, 06 Corset, 07 Robe, 08 Cancan Skirt. Wardrobe = FOUR looks: 01 Gown, 02 Mini, 03 Two-Piece, 04 Catsuit (renumbered from 05). Re-wired: Jade Fans = gown + two-piece (no robe; beat 2 is now "the turn", the three unclasp their skirts); Cancan in the Mini (no skirts, kicks are the show); Cell Block in the charcoal catsuit; The Shadow in the gown; doors = gown. Matrix rebuilt for 4 rows. Cut look images removed from the artifact (files kept on disk). Artifact v14.
- 2026-10-18: Leon crossed out Gold Leaf (kick line) and Cancan ("circus"). Library = EIGHT: Jade Fans, The Chair / Mirror, Cell Block (headliner, all six, Wed+Fri+Sat) / Velvet, Smoke / The Shadow, After Dark. Matrix columns and look wear-for lines updated; Offenbach line removed. Images m3/m13 removed from the artifact, files kept. Leon also showed the Jade Fans card clipped ~10px on its left edge in his viewer; the page itself has no horizontal overflow at desktop width (table is inside overflow-x:auto); mobile check inconclusive because the static file preview has no viewport meta. Artifact v15.
- 2026-10-18: Moulin Rouge replacement = THE STAIRCASE (the star entrance down the spiral stair from the mezzanine, 1+4, Look 01 crystal bodice + Look 02, a 6 m light jade veil dropped to the four below; Thu + Sun Act II). Leon: "give them different moveable props" -> every piece now has a Prop row: fans / 3 gold chairs / 2 rolling gold mirrors / silk veil / 6 chairs + 6 gold chains / gold tray + the house pour / 4 chiffon lengths through the fog / gold ring behind the scrim / hand mirror balls on chains. Kit lines updated. Image v3-m15-staircase rendering (agent artlist-gen-5). Artifact v16.
- 2026-10-18: v3-m15-staircase.jpg landed (Seedream 5.0 Pro, 0 credits, QC PASS) and is on The Staircase card. Artifact v17. Scratch download in D:/New AI Directory/scratch-m15/ can be deleted.
- 2026-10-18: Leon: "give me some more storylines, like the pearl, like the jade, something around the story". Added section 05 THE STORIES: one storyline per night across the four acts, built from house material, no new pieces: 01 The Pearl (Tue/Sun; oyster->pearl->gift, a real South Sea pearl on the Velvet tray, Black Pearl pour, white-gold light), 02 The Vine (Thu; bud->bloom->fall, the veil = raceme, sage light all night, Jade Spritz), 03 The Stone (Sat when Cell Block rests; rough->cut->polish->set, Emerald Martini), 04 The Night Set (Wed/Fri/Sat; Cell Block = six house-own stories of why she stayed, which removes the Chicago grand-rights question; Jade Negroni), 05 Rare by Design (opening week; the room is the character). Week table gained a Story column; sections renumbered 06-08. Artifact v18.
- 2026-10-18: Leon: "more shots like this in the deck where you use the actual photos of our venue and add in the girls". Venue "photos" = the pre-opening nr-*.jpg renders (1600x900). artlist-gen.mjs image --ref <plate> with Seedream 5.0 Pro places the company into the room (ref attached 8/8, 0 credits). QC vs plates: ROOM 5 kept / 3 changed (r3,r5,r6: foreground furniture cleared), CRAFT 2 pass / 5 notes / 1 FAIL (r2 staircase: woman floating beside the stair, oversized). Added section 05 IN THE ROOM gallery (v4-r1,r4,r6,r7,r8). Re-rolling r1,r2,r3,r5,r7 as v5- with a stricter HEAD ("keep every table and chair exactly where it is, remove nothing, add no furniture, no guests added", exact headcounts, "no black"). Sections renumbered 06-09.
- 2026-10-18: v5 re-rolls QC: r7 bar KEPT room + gold chairs (on page, replaces v4-r7); r2 staircase fixed (on tread, scaled) but the stair is reframed larger (on page, it is the key shot); r5 mirror usable (on page); r3 DJ floor FAIL (orphan hand) and r1 stage FAIL (four behind her, not three) NOT used; v4-r1 stays. In-room gallery = 7 frames. Artifact v20. CEILING: Seedream 5.0 Pro with --ref keeps walls/camera but clears foreground furniture and reframes; for pixel-exact rooms use an EDIT model on the plate (Flow NB2 Pro "add people to this image", or composite) rather than regeneration.
- 2026-10-18 FLOW PLATE EDITS: scripts/flow2.mjs image-gen with the plate attached as the ingredient, Nano Banana 2.1, 16:9, project 6bb71da9 (not dedicated), 1376x768 out. flow-ref-generate.mjs is DEAD (targets old labs.google UI, composer stuck in video mode). QC vs plates: f1 stage NEAR-EXACT (back three ~25% too large, lead stands on a table), f2 stair NEAR-EXACT + PASS (balustrade sweep cut away for her), f3 DJ CHANGED (foreground tables cleared) but usable. All three beat Seedream. Pixel diff shows NB2 regenerates rather than copies (PSNR 17-20 dB) so "pixel-exact" is not achievable by generation; geometry registers, no reframe. Gallery now 8 frames (v6-f1/f2/f3 + v4-r4/r6/r8 + v5-r5/r7). Flow banner: running low on Flow credits (resets monthly). Artifact v21.
- 2026-10-18: Leon rejected the three Flow edits: stair woman placed outside/on the cut balustrade, stage lead standing on a table, DJ scene "doesnt make sense, its a dance party, turn down the light and bring out the party lights". Pulled v6-f1/f2/f3 from the gallery (v22, 5 frames). Re-rolling in Flow as v7- with explicit placement ("INSIDE the staircase on a real tread, balustrade passes in front of her legs", "all on the raised stage floor, nobody on a table") and a lighting-state instruction for the DJ (house lights near dark, booth lit from within, gold/emerald beams, haze, mirror-ball flecks, DJ present, guests dancing). LESSON: an edit prompt must state where feet go and what the light state is; "add people" alone is not a brief.
- 2026-10-18 v7 Flow re-rolls (after waiting for the Xsino fire-flow queue to leave :9223): f2 stair MEETS (balustrade intact, her inside it, hands on the rail, NEAR-EXACT room, PASS); f1 stage MEETS (all four on the stage floor, scaled smaller than the foreground chairs, NEAR-EXACT; note: her second fan floats with no visible hand); f3 DJ party MEETS lighting (house down, booth lit, gold/emerald beams, haze, mirror ball, DJ present) but two left-midground tables removed and guests not clearly dancing. All three on the page; gallery = 8 frames. Artifact v23.
- 2026-10-18 CAST: Leon: "if we want the girls to appear in normal lighting we need a character sheet of what they look like". Route: cast six women FROM THE APPROVED v3 FRAMES (not new faces): program/cast/src/c1..c6-face.jpg (2x crops) + cast-picks.json + cast-contact.jpg (sent to Leon). c1 long golden blonde (w1 left, the lead), c2 dark wavy (w1 middle), c3 black bob deep brown skin (chair middle), c4 platinum bob (chair right), c5 long chestnut (chair left), c6 black updo (after-dark far left). Masters via Flow NB2.1 "enhance this exact photo" -> cast/masters/c*-master.jpg (agent flow-masters). Then 3 panels each on Artlist --ref master (three-quarter, profile, full body in Look 01) -> cast/panels/; cast/build-sheets.py assembles cast/sheets/c*-sheet.jpg (2400x1350, ArchivoBlack). Working names Mara/Celine/Noor/Isla/Dani/Ava, rename at will. Then re-run in-room edits with the masters attached.
- 2026-10-18 (usage limit hit): six masters landed in program/cast/masters/ (Flow NB2.1, 1024x1024, 0 fails; agent closed a wedged Artlist tab on :9223). Sheets built from masters only -> program/cast/sheets/c1..c6-sheet.jpg with three-quarter / profile / full-body panels marked PENDING. NEXT SESSION: (1) Leon approves/swaps faces from masters-contact.jpg; (2) run 18 panels on Artlist --ref master (three-quarter, profile, full body Look 01 in her colourway) into cast/panels/ named c{n}-threequarter|profile|fullbody.jpg; (3) rerun build-sheets.py; (4) add a "The Company" section to program/index.html; (5) re-run the in-room Flow edits with the masters attached.
- 2026-10-19: resumed after the usage reset. Section 04 THE COMPANY added to program/index.html (six master cards + six cast sheets; later sections renumbered 05-10). Artifact v24 = masters + interim sheets (angle panels pending). Agent artlist-panels generating 18 panels (three-quarter / profile / full body Look 01) into cast/panels/ on Artlist Seedream --ref master; then rerun cast/build-sheets.py and republish.
- 2026-10-19: 18 cast panels landed on Artlist (0 credits). QC vs masters: identity HOLDS 17 / DRIFTS 1 (c1-profile, nose rounder) / WRONG 0; angles all as briefed; craft 11 PASS / 7 notes (hair clipped at top edge on head-and-shoulders panels, tight floor margin on fullbodies, c3-fullbody is one-shoulder not halter, c1 closed pumps). Sheets rebuilt with all panels -> cast/sheets/. Artifact v25. Optional re-rolls: c3-fullbody (halter), c1-profile, c6-threequarter (ponytail clipped). NEXT: re-run in-room Flow edits with masters attached (identity sentence first + camera line).

### v31 (2026-10-19) — D opens at the top
Leon: "when I open D I often have to scroll up to see the first parts of the animations". Cause: browser scroll restoration (and any stale #menu/#reserve hash) re-lands a reopened/reloaded tab mid-walk, inside the pinned sequence. Fix: a head script in `d.html` sets `history.scrollRestoration = manual`, strips a hash with replaceState, and `scrollTo(0,0)` on pageshow. Verified: reload from y=3000 -> scrollY 0 / chapter 01; open with #reserve -> scrollY 0.
NOTE: the session scratchpad `jade-motion/` lost its top-level html files and many assets between 10-05 and 10-19 (AppData temp is virtualised/cleaned); `d.html` and `index.html` were recovered from the artifact with Artifact read (the page comes back wrapped in a doctype skeleton — strip it before republishing). Assets still live in the artifact store; re-read them by path if a local build is needed again.
- 2026-10-19 CAST-LOCKED ROOMS (v8, Flow NB2.1, plate first + masters, composer took 6 chips): CAST 27/27 MATCH. On page: f1 stage, f3 DJ party, f4 banquette, f6 grand room, f7 bar (replacing v7-f1, v7-f3, v4-r4, v4-r6, v5-r7). KEPT previous: v7-f2 stair (v8 widened the stair shell + ghost body in the balustrade), v5-r5 mirror line (v8 mirrors reflect extra women, camera pulled back), v4-r8 corridor (v8-f8 FAILED: Flow "We noticed some unusual activity... browser extensions" anti-abuse tile; not re-fired; a human should look at the Flow tab first, cf. reference-flow-anti-abuse-hold-leon-account). Artifact v26. Flow credits banner still "running low".
- 2026-10-19: Leon on the v8 cast-locked rooms: "why does it look so fake now, the light is really off". Cause: the six masters are neutral-studio-lit; with 4-5 attached, NB2 copies their flat cool light onto the women, so they read pasted onto the warm room. Page REVERTED to the room-lit frames (v7-f1, v7-f3, v4-r4, v4-r6, v5-r7); artifact v27. FIX PLAN: relight the six masters under the house light (one Flow edit each from c*-master: same woman, warm amber tungsten from the side, dark emerald, moody contrast) -> cast/masters/c*-stage.jpg; re-run rooms with plate + stage masters + an explicit "lit only by the room light, same colour temperature and contrast" line; add a light-match check to QC (skin colour temperature vs room).
- 2026-10-19 CORRECTION: Leon: the neutral character sheets ARE the baseline so scene light can be applied; do NOT relight the masters. Fix = two-pass room generation: pass 1 room-lit frame with women placed (plate only, already accepted v7/v4/v5 frames); pass 2 per-woman identity edit on that frame with ONE master attached, "keep everything including the light on her, only her face becomes the reference". Test on the stage frame first (4 edits), then the rest.
- 2026-10-19 v32: Leon "not working" after v31. Tested the LIVE artifact in the embedded claude.ai viewer (anonymous, desktop 652px frame and 375px phone emulation): opening D from the hub lands at the top (hero + vines) both times. Likely cause: the hub cards still linked `d.html?v=17`, a URL his browser had cached from before the fix -> bumped all four hub links to `?v=31` (v32). If it still lands low for him, get WHERE he opens it (phone browser / desktop app pane / Chrome) + a screenshot; the sub-path URL `/artifact/<id>/d.html` needs a claude.ai sign-in in the built-in browser, so test through the hub root.
- 2026-10-19: NIGHT SET MOVED to D:/New AI Directory/Jade supper club/Night Set/ (Leon's instruction). program/ here is retired after the v9 face-pass chain lands; do not edit or publish from it.
- 2026-10-19: program/ removed (synced into Jade supper club/Night Set/, the only copy now).


## Current deal terms and timeline (2026-10-19)

**The ticket is 5% at ₱675,000 per point = ₱3,375,000.** The old ₱13M / 18% terms are gone
from the deck entirely. Implied valuation ₱67.5M, which is 6.5% cheaper per point than the
old ₱722,222. If this changes again, the figure appears on **five** pages — the Part III
divider, The Opportunity (hero, ticket card, horizon card, four table rows), and the whole
of The Return — so grep `3,375,000`, `675,000`, `5% Holder`, `5% Share` and `₱3.375M`.

**The derived figures are a rescale of the deck's own model, not of the new spreadsheet.**
Holder rows were scaled ×5/18 and payback / IRR / cumulative recomputed with
`scratchpad/recalc.py`, whose method reproduces the deck's previous 18% figures exactly
(57.5% / 3.58 yr / 15.23% and 282.4% / 1.72 yr / 60.30%). Keep that validation step if the
numbers move again — it is what makes the output trustworthy.

**The reference spreadsheet is NOT readable from this machine.**
`docs.google.com/spreadsheets/d/1RriSdHQxrFK9pRO6WBknHnjdgNXPz3JV` returns 401 on a plain
export and **"Access denied" / 403** through the logged-in `:9223` Chrome — that Google
account does not have access. Nothing from it has been used. Ask Leon to share it with the
account on `:9223`, or to export it, before building anything off "the new numbers".

**Timeline, as it now stands:** Oct = final design items installed · Nov = staff training and
soft launch · Dec = grand launch. The page is **The Road to December**
(`id="road-to-december"`). There is no longer a single "doors open" date — a soft launch and
a grand launch — so the old "8 Weeks to Doors" stat was dropped rather than recomputed.

**Known stale, deliberately left alone (not in the brief):**
- Year-1 revenue (₱76,928,570 base / ₱130,714,280 high) was modelled on a November opening
  and the opening is now December. Only the holder's slice was rescaled.
- The timeline's first rows read Now · Aug · Sep, two of which are in the past.
- `Already Committed ₱21M` and the ₱38M-vs-₱40,083,352 breakdown gap are both unchanged.


## The forecast workbook (2026-10-19) — read, but NOT applied

`Jade supper club/Current Jade Updates/Jade_Bar_Manila_Forecasts_UPDATED.xlsx`.
**Never copy it into `jade-manila/`** — that folder is served publicly at
next-frame.agency, and this is client financials.

It is a **single-year run-rate** model over four scenarios (Pessimistic ₱92,258,743 /
Pragmatic ₱131,526,514 / Optimistic Low ₱251,322,171 / Optimistic High ₱285,001,714).
**Both Optimistic columns are `#REF!`-broken** from the OpEx line down, and there is
**no Year 2–5 anywhere in the file** — so the deck's Five-Year Forecast, The Return,
payback and IRR cannot be sourced from it. Do not extrapolate those without a growth
rate from Leon.

**Leon's decision, 2026-10-19: leave the financial pages as published.** The workbook is
reference only. Revisit if he sends a multi-year build or repairs the Optimistic formulas.

Two things to carry forward: the workbook's **"Revenue Share %" 5% is an OPEX expense**,
not the investor's 5% equity — keep them separate; and its ₱35,483,903 "capital needed"
is **not** a contradiction of the deck's ₱38M, because construction sits at a 50% stage
payment (~₱3.5M still owed → ~₱39.0M).


## Deal terms as of 2026-10-19 (supersedes everything above)

- **Ticket:** 5% at ₱675,000 per point = **₱3,375,000**.
- **Distribution:** **70% of net profit, paid semi-annually** (was 90% annual).
- **Capex:** **₱34,000,000, buffered to ₱36,000,000** (was ₱38M).
- Five-year, 5% holder: distributions ₱4,424,159 base / ₱10,739,610 high; cumulative return
  31.1% / 218.2%; payback 4.11 / 2.03 yr; IRR 8.65% / 48.77%.

**IRR basis matters.** Those IRRs are on **annual timing**. The real semi-annual schedule
gives 9.44% / 55.96%. The conservative basis is published on purpose and the page says so.
Do not "correct" it upward without asking.

**Build page line items are knowingly stale.** They total ₱40,083,352 (the original costing)
against a ₱34M envelope. Leon is revising them himself; the page labels the schedule as
superseded. Do not rescale those line items.

**Trap fixed here — check for it elsewhere.** `.foot-note` is `position:absolute`, so **two
foot-notes in one sheet silently stack on top of each other** and only the last one in the
DOM is visible. The build page had this for weeks. If a sheet needs two notes, merge them or
make them static (`#the-return .foot-note` is already overridden to `static` for this reason).


## Capex position (2026-10-19 evening — current)

**₱38,000,000 total = ₱35,000,000 capex + ₱3,000,000 buffer.** This supersedes both the
original flat ₱38M and the ₱34M/₱36M wording that was briefly live. ₱35M ties to the
workbook's TOTAL CAPITAL NEEDED of ₱35,483,902.70.

**Pending itemisation — do not part-apply.** Leon gave two line corrections before switching
to sending a file: **Fashion Interiors custom furniture ₱4,000,000 → ₱2,600,000** and
**Air conditioning ₱2,500,000 → ₱1,400,000** (−₱2,500,000 combined, schedule would become
₱37,583,352). Applying only those two also shifts the leasehold base to ₱14,695,251, which
changes depreciation to ₱2,903,160/yr, NBV to ₱7,347,626, and from there net profit and every
distribution number on The Return. **Wait for the full file, then redo the schedule,
the classification percentages, depreciation and the model together.** The build page already
labels its allocation superseded, so nothing on it is misleading in the meantime.
