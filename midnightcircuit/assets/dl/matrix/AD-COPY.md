# Ad copy — P-Site test, 16 live cells

## SPECS — build to these, every unit, no exceptions

Every creative below ships in **all five display sizes plus the two video formats**. A unit over its
cap is rejected by the network, so the cap is part of the design, not a step at the end.

### The ad platform's own picker — this is the authority

Taken off the live campaign setup screen, not from the media kit PDF:

- **Ad Format:** Display · In-Stream Video · **Pop** · **Out-stream Video**
- **Format Type** (Display): Banner · **Scrollable** *(mobile only)* · **Native**
- **Ad Type:** Static Banner · **Video Banner** — *these take **different** dimension lists*
- **Ad Dimensions — Static Banner (5):** `300×250` · `950×250` · `468×60` · `305×99` · `300×100`
- **Ad Dimensions — Video Banner (7):** the same five **plus `970×90` and `320×480`**
- **Content Category:** Straight · Gay · Trans — **Straight** for this buy
- **Gender:** All · Male · Female

| Format | Size | Cap | Notes |
|---|---|---|---|
| Banner | **300 × 250** | ≤ 300 KB | the workhorse — most inventory |
| Banner | **950 × 250** | ≤ 300 KB | the landscape frame |
| Banner | **468 × 60** | ≤ 300 KB | 7.8:1, sixty pixels tall — the hardest unit in the set |
| Banner | **305 × 99** | ≤ 300 KB | brand slab + kicker only |
| Banner | **300 × 100** | ≤ 300 KB | same job as 305 × 99 |
| Interstitial video | 300 × 250 / 320 × 480 | **≤ 1 MB** | 15 s typical |
| **In-stream video pre-roll** | **16:9, 1080p** | **≤ 500 MB**, 5–30 s | MP4/MPG/MOV/AVI/WMV · desktop + mobile |
| Shorties | **1080 × 1920 (9:16)** | ≤ 500 MB, 5–30 s | the vertical film slot |
| Pop-under | — | — | **carries no creative** — a traffic format, not a design brief |

### ⚠ Static and Video Banner take DIFFERENT size lists — audited against both

Every file in `READY-TO-POST/`, checked by actual pixel dimensions and split by type:

**Static Banner — now complete.**

| Size | Files |
|---|---|
| 300 × 250 | 7 |
| 950 × 250 | 2 |
| 305 × 99 | 2 |
| **468 × 60** | **1 — was missing, now built** |
| **300 × 100** | **1 — was missing, now built** |

But **9 static images sit at sizes a Static Banner cannot be**:

- **320 × 480 — 6 static JPGs.** This size *is* accepted, but **only as a Video Banner**. A JPG at
  320 × 480 has nowhere to go.
- **300 × 150 — 3 static JPGs.** Not accepted under either ad type. The picker offers 300 × **100**.

**Video Banner — 2 of 7 sizes covered.**

| Size | Files |
|---|---|
| 300 × 250 | 13 ✅ |
| 320 × 480 | 13 ✅ |
| 305 × 99 · 468 × 60 · 300 × 100 · 950 × 250 · **970 × 90** | **none** |

The five missing video sizes are all **wide and short**, and they should **not** be cropped out of
the 9:16 film — a 970 × 90 slice of a vertical frame is a letterbox of someone's forearm. They want
rendering from a wide layout as short loops, the same way the wide statics already are. That is a
build task, not a transcode.

Both missing **static** sizes are built and under cap (`poster-b468.jpg` 9 KB, `poster-b100.jpg`
9 KB).
The 468 × 60 needed its own lockup and the decorative flame suppressed — anchored to the same right
edge as the kicker, with no room to drop below it, the flame rendered straight over the last letter
and the unit read **"WIN BIGGE🔥"**. Caught by looking at it at delivered size, which is the only way
these get caught.

### Formats nothing has been built for yet

- **Out-stream Video** — an ad format in the picker. No creative in the kit addresses it.
- **Native** — needs a headline + description + image in the site's own styling, not a banner.
- **Scrollable** (mobile) — a distinct mobile format type.
- **Video Banner** — video inside banner dimensions, as opposed to a static one.
- **Pop** — correctly has **no creative options at all**; selecting it leaves only Content Category
  and Gender. It is a traffic format, not a design brief.

### ⚠ The pre-roll slot is 16:9 and every film we have is 9:16

The media kit's **In-Stream Video Pre-Roll** spec is **16:9 at 1080p**. Checked on disk, all three of
our films are **1080 × 1920**:

| file | actual | fits |
|---|---|---|
| `preroll-1080x1920.mp4` | 1080 × 1920 | Shorties only |
| `winfun777_free-spin-car-wash_1080x1920_28s.mp4` | 1080 × 1920 | Shorties only |
| `setE-film-1080x1920.mp4` | 1080 × 1920 | Shorties only |

They are correct for **Shorties** and wrong for **in-stream pre-roll** — and one of them is *named*
`preroll`, which is exactly how the wrong file gets trafficked into the wrong slot. **Rename it or
re-cut it before anything ships.**

A 16:9 version is a **re-layout, not a crop**: the hero is a vertical phone in a vertical frame, and
centre-cropping it to 16:9 throws away the headline and the compliance strip. The build is
resolution-driven, so a 1920 × 1080 stage with its own lockup is the fix — budget it as real work.

**Non-negotiable on every single unit:**

- **18+ / play-responsibly strip** present and legible. This is a gambling ad; the strip is not
  decoration, and a crop that loses it fails the placement.
- **Legible at the delivered size, not zoomed in.** 305 × 99 is 99 pixels tall — a headline scaled
  down from the tall layout swallows the whole frame. The short units get their own lockup.
- **Audience is 84.5% mobile.** Judge every unit at phone size before it ships.
- **Video must carry an audio stream** even when silent — the network rejects a file with no audio
  track at all.

The build pipeline in `../17-ref-ads/` enforces the caps and prints a per-file pass/fail; the
delivery manifest in `../READY-TO-POST/README.md` re-checks them on every rebuild.

---

Final copy for every cell of the test grid, with the asset that serves it and what is still missing.

**P1 and P2 share the same creative and the same copy.** Only the tracking link differs — that pair
is what separates placement performance from creative performance. So there are **8 distinct
creatives**, each trafficked twice.

Every suggestive line below passes the same test: **both readings are literally true of the
product.** Where a line only works dirty, it is not here.

---

## What the client's own creative already establishes

Three reference units came over: the **150% First Deposit Bonus** banner, the **Win a RealDoll®**
banner, and a **WinFun777 display unit**. They settle three things that were otherwise guesses.

**The house look is CREAM, not black.** All three are champagne / rose-gold grounds with 3D-rendered
objects — a brushed safe, a ribboned gift box, stacks of gold coins, soft bloom. Earlier work in this
kit went dark-ground / gold-figure. **The new units should match the client, not the kit**: on a
tube-site page, which is near-black, a cream banner is the thing that pops anyway, so matching the
client costs nothing and buys consistency.

**The real offer stack, in the client's words** — use these, do not invent benefits:

- 150% Welcome Bonus **+ up to $1,000 Bonus**
- **5% instant betting rebate**
- **$55 treasure chest per friend** (referral)
- Daily, weekly & monthly **VIP rewards**
- "Fast withdrawals, secure payments"

That last line matters most: it is the client's own substantiation for the **Safety** theme, so the
Safety copy below uses their wording instead of claims I would have had to make up.

**The $1,000 cap and the 5% rebate are not in the test grid at all.** Both are strong, concrete
numbers and neither has a cell. Worth a backup link if the four themes under-deliver.

---

## 1 · Safety — Normal  `PH_SAFE_N_P1` / `PH_SAFE_N_P2`

> ### Your Money. Your Privacy. Protected.
> Fast withdrawals. Secure payments.
>
> **[ PLAY SECURE ]**

**The subline is the client's own wording**, lifted from their display unit — so it is a claim they
already make, not one written for them.

**Visual:** a 3D brushed-metal safe, shut, with a padlock and stacked coins — the **same render
language as their 150% banner**, on the champagne ground, reusing that banner's safe outright. No
person.
**Status:** **new creative required**, but cheap: it is the 150% banner's own safe, re-staged.
Nothing in the kit covers Safety yet.
**Why it should work here:** this audience is browsing somewhere they would not want on a statement.
Privacy is not a soft benefit on this inventory — it is the objection.

*Alt headline:* **Discreet. Encrypted. Yours.**

---

## 2 · Safety — Suggestive  `PH_SAFE_S_P1` / `PH_SAFE_S_P2`

> ### PLAY SAFE. ALWAYS.
> Protected deposits. Protected privacy.
>
> **[ PLAY IT SAFE ]**

**Visual:** a single **sealed foil square** at the centre, lit like a hero product, with casino chips
and a slot reel edge around it. The foil reads as both a condom wrapper and a chip — that ambiguity
*is* the ad. Nothing is depicted; the viewer completes it.
**Status:** **new creative required.**
**Hard constraint:** sealed, always. An opened wrapper changes the read from *protection* to *act*,
which is the exact line the brief says not to cross.

---

## 3 · Big Win — Normal  `PH_WIN_N_P1` / `PH_WIN_N_P2`

> ### CHASE THE BIG WIN
> 777 · Jackpots · Real cash payouts
>
> **[ SPIN NOW ]**

**Visual:** jackpot meter, 777, gold coins erupting, high multiplier figures.
**Status:** **covered.** The Set F pre-roll is this ad already — real Fortune Rabbit gameplay with the
counter climbing BIG WIN → MEGA WIN → SUPER MEGA WIN 620.00. Swap the end-card line to
"CHASE THE BIG WIN" and it ships.

---

## 4 · Big Win — Suggestive  `PH_WIN_S_P1` / `PH_WIN_S_P2`

> ### GET CLOSER TO THE BIG O.
> Big Odds. Bigger Wins.
>
> **[ SPIN NOW ]**

**Recommended over the alternatives, and here is why.** "BIG O" is the strongest line in the whole
set because **the subline defuses it honestly** — Big **O**dds. The innocent reading is not a
stretch bolted on afterwards; it is the actual mechanic being advertised. That is the same structure
as the street-poster reference: it reads two ways and both are true of the product.

*Alt 1:* **READY FOR THE BIG FINISH?** / Hit the Jackpot. *(from the brief — good, but the innocent
reading is weaker: "big finish" has no product meaning on its own)*
*Alt 2:* **GO HARD. WIN BIGGER.** *(what the existing poster already says)*

**Visual:** a jackpot meter **a tick from bursting**, champagne spray, a heavy coin eruption. No
figure needed.
**Status:** **covered, with a copy change.** The Set F poster is this cell — same joke, same
register. It currently reads GO HARD / WIN BIGGER; re-render with the BIG O lockup to test the
stronger line. Both the phone and champagne-arm cuts work, and the champagne-arm one is *already*
the "about to burst / spray" image the brief asks for.

---

## 5 · Promo A, 150% — Normal  `PH_150_N_P1` / `PH_150_N_P2`

> ### 150% FIRST DEPOSIT BONUS
> Boost Your Bankroll & Start Winning Today
>
> **[ CLAIM BONUS ]**

**Visual:** vault + gift box + coins — the client's existing creative.
**Status:** **covered** by the client's own asset. Client wording, unchanged.

---

## 6 · Promo A, 150% — Suggestive  `PH_150_S_P1` / `PH_150_S_P2`

> ### MAKE YOUR FIRST TIME 150% BETTER
> First Deposit Bonus up to 150%
>
> **[ CLAIM BONUS ]**

**Status:** **new creative required.**
**Why this one is nearly free:** "First Deposit" supplies the pun by itself — the line needs no
euphemism, and the innocent reading is the literal offer. Keep the visual *restrained* for exactly
that reason: the words are doing the work, so the picture should stay premium (gold, vault, deep
red) rather than add a second nudge. Two nudges is where it turns cheap.

*Alt:* **YOUR FIRST TIME, 150% BETTER.**

---

## 7 · Promo B, RealDoll — Normal  `PH_RD_N_P1` / `PH_RD_N_P2`

> ### WIN A REALDOLL®
> Play → Earn → Enter
>
> **[ PLAY NOW ]**

**Visual:** gift box, coins, slot elements, the three-step entry flow. **No model** — that is what
makes this the "normal" arm and keeps the A/B honest.
**Status:** **covered** by the client's existing creative.

---

## 8 · Promo B, RealDoll — Suggestive  `PH_RD_S_P1` / `PH_RD_S_P2`

> ### YOUR FANTASY COULD BECOME REAL
> Play. Earn. Enter for a Chance to Win a RealDoll®.
>
> **[ PLAY NOW ]**

**Visual:** the existing creative with the model.
**Status:** **covered** by the client's existing creative.
**Note from the brief:** this promotion is *already* adult-facing, so the second version should get a
more **seductive line**, not a more explicit image. Do not escalate the picture.

*Alt:* **TAKE HER HOME.** — lands hard with this audience, and stays literally true (you can win the
prize and take it home). Worth a backup link if the client is comfortable; it is the most forward
line in the set.

---

---

## Proposed · Promotion C — redeem credit for the site you are already on

**This is the strongest offer idea in the brief, and it is not in the grid yet.**

Every other promotion asks the viewer to leave what they are doing and go gamble for a reward that
belongs to a different world — cash, a bonus, a doll shipped to their house. This one pays out in
**the thing they opened the tab for**. The reward is native to the moment, which no other offer here
can say.

> ### PLAY SLOTS. GET PREMIUM.
> Earn credit you can spend right here.
>
> **[ START EARNING ]**

*Alt 1:* **YOUR SPINS PAY FOR YOUR SUBSCRIPTION.**
*Alt 2:* **STOP PAYING FOR PREMIUM. START WINNING IT.**
*Alt 3 (suggestive arm):* **FINISH ON US.** — the innocent reading is literally the offer: we cover
the bill. It is the most forward line in the set; backup link, client's call.

**Visual:** the two worlds in one frame — a slot reel and a play button, or coins resolving into a
credit card / gift-code. Cream and rose-gold per the house look; nothing explicit, because the *idea*
is the adult part.

**Why it is worth a cell:** a tube-site visitor converting on a casino ad has to cross a wide gap —
different intent, different session, a deposit. A reward denominated in **premium credit** narrows
that gap to almost nothing. If any offer in this test beats the 150%, I would expect it to be this.

### Before it can run — and this is a real dependency, not a formality

Paying out in credit for a specific adult platform means **either a commercial arrangement with that
platform, or buying gift codes on the open market and reselling them as a prize.** Those are very
different things legally and operationally:

- **Named partnership** — you can use the brand name and logo in the creative. Strongest version.
- **Unofficial gift codes** — the promotion works, but the creative **cannot** use the platform's
  name or marks. The copy then has to say *"premium credit"* generically, which is weaker but still
  far better than cash.

The lines above are written to survive the second case: **none of them names a platform.** "Get
Premium", "your subscription", "right here" all work on the inventory without borrowing a trademark.
If the partnership lands, the name can be dropped in and the line gets sharper.

Also: gambling-to-media-credit may read as a **cash-equivalent prize** in some US states, which is a
promotions-compliance question for the client's counsel, not a creative one. Flagging it early
because it determines whether this is a 4-link block or a backup test.

**Slotting it in:** there is no free block — 16 cells are committed. It runs on **backup links
(`PH_BK_01`–`04`)** as a 2-creative × 2-placement test, which is exactly what the backups are for,
and the use gets recorded in Notes.

---

## What has to be made

| # | Cell | Creative | State |
|---|---|---|---|
| 1 | Safety — Normal | shield / vault / privacy | **make** |
| 2 | Safety — Suggestive | sealed foil square + chips | **make** |
| 3 | Big Win — Normal | Set F pre-roll | have — end-card line change |
| 4 | Big Win — Suggestive | Set F poster | have — re-render with BIG O lockup |
| 5 | 150% — Normal | client asset | have |
| 6 | 150% — Suggestive | restrained gold / vault | **make** |
| 7 | RealDoll — Normal | client asset | have |
| 8 | RealDoll — Suggestive | client asset | have |

**Three new creatives and two copy changes** closes the whole grid.

All three new units build on the **client's champagne / rose-gold 3D look**, not the dark-ground
style used earlier in this kit — see the section above.

**Needed to build them:** the three reference units came through as chat images, not files. The
layered source for the **safe**, the **gift box** and the **coin stacks** (or just the banners at
full resolution) would let the Safety and 150%-Suggestive units reuse the client's own renders
instead of approximating them — which is the difference between on-brand and nearly-on-brand.

Every new unit still has to come in the Midnight Circuit sizes — 300×250, 305×99, 300×150, 950×250,
320×480 — under the 300 KB image cap and the 1 MB video cap, with the 18+ / play-responsibly strip
intact. The build pipeline in `../17-ref-ads/` already enforces all of that.

---

## Compliance flags, for the client not for me to decide

- **RealDoll®** — largely settled by the sample. The client's own banner carries the official
  **RealDoll® wordmark and the "Authentic. Realistic. Iconic." tagline**, which is brand-supplied
  lockup, not something an affiliate would mock up. So the partnership evidently exists; what is
  still worth one line of written confirmation is that it covers **paid acquisition creative on
  adult-tube inventory**, which is narrower than permission to run the promotion.
- **The condom-wrapper execution** is the one most likely to be bounced by an ad-network reviewer,
  even though nothing is depicted. The backup links exist for exactly this; if it bounces, the
  Safety-Suggestive slot falls back to the restrained "Discreet. Encrypted. Yours." line.
- PG Soft game art on any unit remains the open IP question already in `HANDOFF.md`.
