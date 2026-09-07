# PATCH NOTES — Jade Manila media kit

> Newest first. Append, never rewrite.

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
