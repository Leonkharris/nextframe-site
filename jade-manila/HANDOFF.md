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
