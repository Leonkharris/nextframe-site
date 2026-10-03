# PATCH NOTES — Jade Manila media kit

> Newest first. Append, never rewrite.

## 2026-10-03 — Brand Guidelines V01 applied across the whole kit

Source: `Jade supper club/Current Jade Updates/Jade Brand Guidelines V01 .pdf` (21pp,
Illustrator, 2 Oct 2026) + `Jade logos with icons.zip`.

**The typeface question is answered.** §08 names them, and the PDF's embedded font table
confirms it — no more guessing from glyph shapes:
- Primary: **Acumin Variable Concept, Extra Condensed, Black** (H1/H2)
- Alternative: **Futura Bold** (H3)
- Body: **Figtree Regular**

Acumin and Futura are licensed desktop faces with no webfont here, so the build substitutes
**Archivo at `font-stretch:62%` / weight 900** (its wdth axis goes to 62, which is why it
matches where Oswald/Anton cannot) and **Jost 700** (a Futura revival, already loaded).
**Figtree is the brand face itself** and is free on Google Fonts — that one is exact.
Bodoni Moda is gone: the brand system has no serif outside the logo artwork.

**Palette** — all six primaries + accents, straight from §07:
Woodsmoke `#09110c` · Jade Green `#032316` · Spring Green `#21725f` · Verdigris `#3fbba1` ·
Almond `#ebdec4` · White Smoke `#f6f5f1` · Gold (gradient `#663400→#fcebc3`, solid `#b9a04b`)
· Brass `#5c2a00`. Derived three working tones the book does not name, by mixing its own
values: `#9aa59e` muted type, `#0a2b1c` raised panel, `#104333` panel border.
310 hardcoded colours remapped; **every colour in the deck is now a brand value**.

**Logo — the artwork, not an imitation.** Pulled the primary wordmark, the secondary
(JADE / TODD ENGLISH / MANILA) and the vine icon as true vector out of the guidelines PDF,
then baked the three approved colourways (§03: white on dark, spring green on white smoke,
gold on jade green) into self-contained files. The shipped cream `#f3ead9` wordmark was a
**recolour, which §04 explicitly forbids** — now white on the cover, gold on the back.
The supplied zip is flat RGB PNGs with baked white/black backgrounds and no alpha, so it is
kept as reference only; the vector extraction is what ships.

**Traps worth remembering**
- `currentColor` does nothing through `<img>` — colourways must be baked per file.
- The new marks carry a small intrinsic viewBox (196×74 vs the old 690×259), so
  `width:100%` collapsed to 196px inside a shrink-wrapped parent. Widths are now pinned in px.
- One off-palette gold (`#c29a55`) was hiding **URL-encoded as `%23c29a55`** inside a data-URI
  SVG in `press.css`. A plain hex scan misses these — scan `%23` too.

**Also applied**
- Divider ornament was a generic `✦`; it now carries the brand icon.
- Back cover gained the address from §08's hierarchy example — *G/F, RCBC Savings Bank
  Corporate Center, 26th & 25th Street, BGC* — plus `jadebarmanila.com`. **Leon: confirm the
  address, it appears in the book as a typography specimen rather than a contact block.**
- Cover gained the brand line **"Rare by design"**.
- Voice audit against §01.3 passed with nothing to fix: no *cheap/deals/vibes/hottest*, no
  mention of Bali, no exclamation marks anywhere in 3,441 words.

Verified: 23 sheets, 0 overflowing, 0 broken images, only Archivo/Jost/Figtree in use.
`press.css?v=15`.

## 2026-09-08 (later) — Gallery accuracy + page overflow

**Mislabelled gallery tiles** (client spotted two, an audit of all ten found a third)
- The Cellar showed an arched dining niche -> `cellar-wall.jpg` (wine racked on green marble).
- The Spiral Stair showed a banquette room with **no stair in frame** -> `spiral-stair.jpg`.
- The Chef's Counter photo is banquettes against a botanical mural. The deck's copy never
  describes a chef's counter — the only "counter" is *The Onyx Counter*, the Jade Bar's own
  subtitle, and Quick Facts lists Grand Room / Bar / Stage / Mezzanine / Cigar Lounge / Cellar.
  Renamed the tile **The Mural Wall** rather than generate a room that may not exist. If the venue
  does have one, generate on the brand-plate lane and rename back.
- Both correct images already existed in `img/`, simply never wired up. Audit the whole set, not
  the one tile that was reported.

**Page overflow — three sheets were silently clipping**
- `from-the-kitchen` lost **65px** off its bottom row (nobody had noticed), `rooms-details` 3px,
  `the-return` 4px. All 23 sheets now measure zero overflow.
- Cause chain: my longer "The Cigar Lounge · Cigars & Nightcaps" caption wrapped to two lines and
  pushed the grid past the page; the menu standfirst did the same.

**Preview film**
- Caption claimed "1:11" for a 43.7s film -> now `0:44`. It does carry an AAC stereo track, so
  "Sound on" is accurate. Frame-sampled it: no old branding anywhere, so it survives the rebrand.

### Three layout traps in this deck — read before editing
1. **`.sheet` is a fixed 1056px page with `overflow:hidden`.** Add a line of copy and it clips
   silently — nothing errors, content just disappears off the bottom. Measure after any text change.
2. **`press.css?v=N` must be bumped** or stylesheet edits never reach the browser. It sat at v=11
   all session, so an earlier CSS fix appeared to do nothing.
3. **The gallery heights live in the inline `<style>` in index.html**, which overrides `press.css`
   (`.gal-hero img{height:318px}`, `.gal-item img{height:120px}`, `.gal-grid` is 4 columns).
   Editing press.css for these is a no-op.

## 2026-09-08 — Menu, timeline, cost figures

**Menu (page 10)**
- Replaced Todd English's other-restaurant dishes with Jade Manila's own opening menu: Jade Seafood
  Tower (hero) + Caviar Cannoli, Toro Cornetto, Uni Carbonara, Lobster Paccheri, Truffle Agnolotti,
  Miso Black Cod, A5 Wagyu Tagliata, Charcoal Lobster, Foie Gras Fried Rice.
- Photography generated on the Flow free lane (Nano Banana 2), 10/10 first attempt, zero credits.
- **v1 was rejected and regenerated.** v1 prompts described the look in words ("dark emerald and brass,
  moody low-key") and produced generic dark-restaurant food on arbitrary plates. v2 attaches the brand's
  own `img/brand-plate.jpg` as a bound reference chip, so every dish sits on the real cream/green-rim
  plate in the logo deck's warm soft light. Lesson: attach the artwork, don't describe it.
- Standfirst rewritten — it claimed "signature plates from Todd English's own restaurants", no longer true.

**The Road to October (page 14)**
- Sep = structure complete, fit-out begins, hiring under way · Oct = fit-out + staff training (no figures)
  · Nov = doors open, first week. Removed the "Yr 1 / First Twelve Months" item.
- Already Committed -> ₱21M. Removed "The Long Poles" card and the "44 Opening Roster" stat.
- Stat band now: Nov / Opens Week One · 8 Weeks to Doors · ₱38M Total Project Cost.

**Structure**
- Removed "The Build, Phase by Phase" (a placeholder page). Deck renumbered **23 -> 22 pages**: every
  page marker, the contents list, and the "Twenty-three pages" copy. Verified contiguous 2-22, no
  duplicates, single total.

**Cost figures — READ THIS**
- Stated total project cost is now **₱38,000,000**: the Opportunity "Ticket" card, the Part III divider
  ("A ₱38 million build"), the page title ("Where the ₱38 Million Goes") and the stat band.
- **The itemised line items still total ₱40,083,352 and were NOT touched** — nobody has supplied which
  ₱2.08M came out, and inventing line items on an investor deck is not acceptable. A factual note on the
  cost page states both numbers. **This is the one known-open item: it needs the client's revised
  breakdown.**

## 2026-09-07 (later still) — Real logo artwork, not a font imitation

- **Root fix:** the wordmark was being re-created in Bodoni Moda + Jost. It is now the ACTUAL vector
  art, extracted from page 1 of the logo deck with PyMuPDF (11 paths, no raster, ~4KB) and cropped to
  the logo bbox -> `img/jade-manila-logo.svg`. The real "J" descends below the baseline with a hook;
  no web font reproduces that, which is why every CSS attempt drifted.
- Applied to ALL THREE wordmark spots: hero title, Page-1 cover card, and the contact heading.
  The text lockup classes (.v7l, .v7l-city, .cn-first, .cn-city) are retired.
- **Re-font:** dropped Great Vibes entirely — the brand deck contains no script face. The one
  remaining script element ("the story" eyebrow) is now the brand's tracked sans caps, and the font
  is no longer downloaded.
- Verified: the PDF has NO embedded fonts and NO text layer (all glyphs are outlines), so the brand
  typeface NAMES are not recoverable from the file. Deck keeps Bodoni Moda (Didone, same family as
  the logo serif) + Jost (geometric, same family as MANILA) — matched by character, not by name.

## 2026-09-07 (later) — Logo corrected to the page-1 primary

- Lockup `JADE / BY TODD ENGLISH / MANILA` -> **`JADE / MANILA`**, matching page 1 of the logo deck.
- Proportions matched to the actual artwork rather than a description of it: MANILA at 0.28x JADE
  font-size, tracking tuned to ~0.52x its width, gap tightened to sit as one block, and the sub-line
  **centred** under JADE (cover card is now text-align:center). Optical centres within 2px.
- Root cause of the miss: the first pass was implemented from a written summary of the logo deck.
  The PDF was never rendered and looked at. It is now (PyMuPDF -> PNG; poppler is not installed).

## 2026-09-07 — Rebrand to Jade Manila + slide changes

**Branding**
- Logo lockup replaced in both the animated v7 hero title and the static Page-1 cover:
  `JADE / Supper Club` (Bodoni + green Great Vibes script) → **`JADE / BY TODD ENGLISH / MANILA`**
  (Bodoni over tracked Jost small-caps). Green `#54c79a` script dropped; wordmark unified to the
  original cream `#f3ead9`. New CSS: `.v7l-sub` / `.v7l-city` (inline style), `.cn-chef` / `.cn-city`
  (press.css). Removed the orphaned `.cn-last` rules my change created.
- Brand-label sweep: `Jade Supper Club · Manila` → `Jade · Manila` (16 page headers);
  all other `Jade Supper Club` → `Jade Manila` (title, meta, alts, plate captions, footers,
  quote credit, contact, investment copy). Seal arc → `JADE · BY TODD ENGLISH · MANILA`;
  seal monogram `JS` → `J`; marquee `Jade Supper Club` → `Jade Manila`.
- **"Supper club" removed as a concept, not just a name** (5 copy rewrites): hero sub → "emerald-and-brass
  room"; pull-quote → "Jade is not a restaurant with a band"; Quick Facts → "Concept · Dinner, live
  music, late bar"; editorial caption → "begins with dinner"; margin copy → "Jade sells a room and a night".

**Slides**
- "The Salon" → **"The Cigar Lounge · Cigars & Nightcaps"** (teaser card, Page-17 gallery, Quick Facts rooms list).
- Story heading → *"When the iconic Bank Bar closed, Jade by Todd English found its new home."* (3 lines at 40px, verified no collision with the `the story` script flourish).
- Agenda 6:30 "The Ice Bar" → **"Cocktails & Caviar"** (specialty cocktail hour, set menu).
- Editorial plate → generated `gen/jade-editorial-live-v1.jpg` (singer on the floor, band on the mezzanine; base render jade-01).
- Grand Room plate → generated `gen/jade-grandroom-dj-v1.jpg` (DJ booth under the arch, dancing crowd; base render jade-02).
- Final renders in: rooms teaser (jade-04 bar / jade-11 cigar lounge / jade-02 floor / jade-01 mezzanine),
  cover photo (jade-00), banquette run (jade-06), gallery cigar-lounge tile (jade-11).

**Known regression (accepted)**
- Hover videos 14 → **13**. The gallery Cigar Lounge tile moved off `img/nr-private-dining.jpg`, which
  is in the `CLIPS` array, so it lost its hover clip. Traded deliberately for the correct room.

**Not done**
- Not deployed. Remaining gallery tiles left on `img/nr-*.jpg` to preserve their hover videos.
