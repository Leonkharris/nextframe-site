# Layered delivery — Winfun777 / Midnight Circuit

Everything **above the background**, shipped as separate layers so the background can be swapped in any
editor. Nothing here is a mockup: the phone screens show **official PG Soft in-engine captures of
Fortune Tiger**, and the type is set in code.

## Read this first — green vs blue

**Both colours exist for both heroes. They are not equally safe.**

| Hero | Recommended | Also provided | Why |
|---|---|---|---|
| `champ-*` (arm + pouch) | **green** `#03F802` | blue `#0147FD` | subject is skin / gold / red — no green in it, so green keys clean |
| `phone-*` (hand + phone) | **blue** `#0147FD` | green `#03F802` | **Fortune Tiger's UI has a green spin button and a green win bar.** Keying green punches holes straight through the game. |

Keying the phone variant on green will eat the spin button. This was verified on the render, not
assumed — look at `phone-master-green.jpg` and you can see the button is the same green as the
backdrop. The green phone files exist because both colours were asked for and some editors are set up
for green only; they are **not** the safe default.

**The two colours are the same picture.** The off-recommendation plate is derived from the recommended
one by keying and re-flattening (`make-chroma-pair.js`), never regenerated — a second generation would
be a different arm, and then they would be two variants rather than two options on one asset.

**Better than either: don't key at all.** The `-overlay.png` statics and the alpha / fill+matte videos
carry real transparency, so there is no matte edge and no spill to clean up.

## What's in here

### Video layers (the main deliverable)
15 s, 1080x1920, 30 fps. **Every one carries a real alpha channel — verified with ffprobe, not assumed.**

| File | What | Codec / pix_fmt | Size |
|---|---|---|---|
| `layer-hero-alpha.mov` | hand + phone, **both moving**, live gameplay | ProRes 4444 `yuva444p12le` | 368 MB |
| `layer-hero-alpha-lossless.mov` | same | QuickTime RLE `argb` | 615 MB |
| `layer-type-alpha.mov` | headline / brand / CTA / compliance | ProRes 4444 `yuva444p12le` | 227 MB |
| `layer-type-alpha-lossless.mov` | same | QuickTime RLE `argb` | 59 MB |
| `layer-hero-bluescreen.mp4` | hero flattened on chroma blue | H.264 | 3.8 MB |
| `layer-hero-greenscreen.mp4` | hero flattened on chroma green | H.264 | 3.9 MB |
| `layer-hero-fill.mp4` + `layer-hero-matte.mp4` | **alpha as fill + matte** | H.264 | 5.7 + 3.7 MB |
| `layer-type-fill.mp4` + `layer-type-matte.mp4` | **alpha as fill + matte** | H.264 | 1.4 + 0.3 MB |

Stack hero, then type, over whatever background you like. No keying, so no matte edge and no spill.

### Fill + matte — alpha you can actually move around

The ProRes and RLE masters are 355 MB and 618 MB. Nothing that size goes on a web page, and GitHub
refuses a file over 100 MB outright, so the deck links a **fill + matte** pair instead:

- `<layer>-fill.mp4` — the RGB, alpha discarded
- `<layer>-matte.mp4` — the alpha channel as luma

Apply the matte as a **luma matte / track matte** over the fill. Every NLE has this; it is the standard
way alpha moved around before anyone shipped a 600 MB file. **Measured** against the ProRes master,
frame by frame: 98.8 % of alpha pixels within 2/255, 0.05 % off by more than 8 — the rest is edge
antialiasing. For 9.4 MB instead of 355 MB.

The fill's RGB is **undefined where alpha is zero**, so the fill on its own can show garbage outside the
subject. That is expected. Composite it through the matte.

The matte is encoded at a much lower CRF than the fill (12 vs 18). Compression error on a matte does
not read as softness, it reads as a halo along every edge — and the matte is small either way, so the
quality is nearly free.

**For the HERO, prefer the ProRes file** — it is now *smaller* than the lossless RLE (372 MB vs
616 MB). Both the hand and the game move, so no two frames repeat and RLE's run-length
compression has nothing to bite on. For the TYPE layer the reverse still holds: RLE is much smaller
(59 MB vs 227 MB) because it is mostly static type on transparency.

**The hand is live.** It is not a still with a moving screen: the blue plate was run through i2v so the
fingers adjust their grip, the wrist tilts and the phone drifts, then ping-ponged 5 s -> 15 s (a straight
loop would jump-cut back to frame one). The screen is tracked **per frame** by `track.py` and the game is
re-fitted to it every frame -- the phone moves ~31 px across and ~28 px down, so a static quad would
leave the game sliding off the glass.

**Corner bleed is FIXED PIXELS, and every axis has its own value** (`BLEED_X = 8, BLEED_Y = 10, BLEED_BOT = 12` here, plate space) — not a
ratio. The tracker lands inside the glass (rounded corners + anti-aliased edge below threshold), and a
ratio over-shoots the short axis: 3.75 % on a tall screen is ~37 px vertically vs ~17 px horizontally,
which pushed the art past the top bezel. The leak is also asymmetric — ~8 px left, ~5 px right, none at
the top. **Verify with `_scanh.py`/`_scanv.py`, not by eye**: it tests for NEUTRAL white, because a plain brightness
threshold mistakes the game's gold (253,255,234) for plate leak (250,246,254).

**The bottom bleeds nearly four times the top, and the top is not zero either.** An earlier pass
recorded "essentially nothing at the top" — that was measured with a horizontal row scan, which walks
straight past a band that only exists AT the top. Scanning vertically (`_scanv.py`) found ~16 output px
of bare plate at the bottom edge and ~13 px at the top corners. A single symmetric `by` cannot cover
both without over-shooting, which is why there are now three constants.

**Scan in BOTH axes before calling an edge clean.** `_scanh.py` reads a row, `_scanv.py` reads a
column; each is blind to a band that runs parallel to it. Both test for NEUTRAL white (`|R-B| <= 10`)
so the game's gold is not mistaken for plate. A real leak sits at the SAME coordinate in every scan
line — game highlights move from line to line.

**The game is fitted to the screen's full WIDTH, not cover-cropped.** The capture is ~0.58 aspect
against a ~0.45 screen, so `object-fit: cover` was chopping ~25 % off the sides and taking the win bar
and the balance row with it. It is now a sharp layer at full width over a blurred copy of the same
frame, feathered at 3.5 %/96.5 % so the join dissolves instead of showing a seam.

**Gotcha, if you ever re-key this:** `despill=type=blue` destroys white. White has maximum blue, so
despill pulls its blue channel down and turns the phone screen cream. That silently broke screen
tracking on the first pass (`area=0` on all 450 frames). **Track on the raw frames BEFORE keying**, then
key separately -- which is what `prep-hand.js` + `track.py` now do.

**There is no WebM.** This ffmpeg build has no VP8/VP9 alpha support: both encoders accept
`-pix_fmt yuva420p`, return `yuv420p`, and drop the transparency **silently, with no warning**.
`-auto-alt-ref 0` does not fix it. If a web-native alpha video is needed later, that needs an ffmpeg
built with libvpx alpha support.

**The game on the glass is real moving video, not stills.** A 15 s window (22-37 s) of an actual
Fortune Rabbit session: reels spinning, then the counter climbing **BIG WIN -> MEGA WIN -> SUPER MEGA
WIN 620.00**. Source clip kept as `gameplay-fortune-rabbit-source.mp4`, frames in `gameplay/`.
Swap the game by dropping a new frame sequence into `gameplay/` and re-running — the warp is unchanged.

**PROVENANCE — needs a decision.** This footage was cropped out of a capture in
`D:/One Touch/S5.com/assets/` (MWCash / S5.com — a *different* operator). The crop removes every MWCash
mark, and the game itself is PG Soft's Fortune Rabbit, which Winfun777 genuinely carries. But it is
another operator's recording, so it carries the same PG Soft IP question as the rest of the kit **plus**
a provenance one. Confirm before this traffics.

**If you key the bluescreen file, use similarity ~0.16.** Tested: at `0.22` the key eats the phone's
black bezel and bleeds the background through the fingernails; at `0.10` blue survives in the corners.
`0.16` keeps the bezel and the nails clean with the background fully gone:

```
ffmpeg -i layer-hero-bluescreen.mp4 -vf "chromakey=0x0147FD:0.16:0.04" ...
```

This is exactly the fiddling the alpha versions save you — prefer them.

### Static layers
For every unit size (`master` 1080×1350, `i320`, `b300`, `b150`, `b950`, `b305`):

- `<variant>-<unit>-overlay.png` — **type / brand / CTA only, with alpha.** Stack straight over anything.
- `<variant>-<unit>-green.jpg` / `-blue.jpg` — hero + type flattened on chroma, ready to key.

### Source plates
`plate-blue-phone.png`, `motion-hand-blue.mp4` (the i2v hand clip), `hand/` (keyed alpha frames),
`plate-green-phone.png`, `hero-green-arm.png`, `base-blue-phone.png` (phone plate with the game
composited on the glass).

## Notes for compositing

- **No scrim is baked into the chroma versions.** A dark gradient over chroma crushes it to `(1,62,1)`
  at the bottom of the frame and the key falls apart there. Add your own scrim over your own background —
  the type layers are designed to sit on something darker than mid-grey.
- The game is a **separate warped layer** on the phone glass, corner-matched to the screen with a
  per-edge pixel bleed so no plate edge shows. To swap in a different title, drop a new capture into
  `../17-ref-ads/games/` and re-run — no regeneration needed.
- Rebuild statics with `node build.js`, video layers with `node build-layers.js`.

## Still open

The game art is **PG Soft's IP**, not Winfun777's. Operators routinely advertise the titles they carry,
but provider assets normally carry usage terms in the operator agreement — worth a yes from the client
before this ships.
