# PATCH NOTES — Jade Manila media kit

> Newest first. Append, never rewrite.

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
