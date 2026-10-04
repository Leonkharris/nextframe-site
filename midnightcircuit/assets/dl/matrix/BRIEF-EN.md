# P-Site Ad Creative Test — English brief

Translation and consolidation of **《P 站廣告素材與 Tracking Link 規劃》** plus the
**PH Ad Test Link Matrix** workbook. The Chinese doc carries the *reasoning*; the workbook carries the
*grid*. Neither alone is the brief, so both are merged here.

---

## The test in one line

The client frames it as **three campaign themes**, with Promotion running **two offers**:

1. **Security** — platform security, reliability, building user trust
2. **Big Wins** — high multipliers, jackpots, big-win content
3. **Promotion** — promotional offers, to drive registrations and deposits (two offers, A and B)

Each gets **2 creatives × 2 placements**, so registration and conversion can be read per
creative-and-placement combination:

| | links |
|---|---|
| Security | 4 |
| Big Wins | 4 |
| Promotion A | 4 |
| Promotion B | 4 |
| Backup | 4 |
| **Total** | **20** |

Because Promotion splits into two offers, the grid is **four 4-link blocks** — which is why the
workbook lists four themes while the campaign plan names three. Same twenty links either way.

| Theme | Creative A — Normal | Creative B — Suggestive / double-meaning | Links |
|---|---|---|---|
| **Safety** 安全 | Platform safety, fund safety, privacy protection | Tie "safe" to condoms / safe sex — e.g. **PLAY SAFE** | 4 |
| **Big Win** 爆獎 | Jackpot, high multipliers, big wins, gold coins | Tie "big win" to climax / reaching the peak — e.g. **READY FOR THE BIG FINISH?** | 4 |
| **Promotion** | The offer itself | Same offer, presented with an adult / seductive framing | 8 |
| **Backup** 備用 | — | — | 4 |
| | | **Total** | **20** |

The Promotion row is 8 because there are **two** live promotions, each getting the full 4:

- **Promotion A — 150% First Deposit Bonus**
- **Promotion B — Win a RealDoll®**

---

## The rule that governs every suggestive execution

From the source doc, and it is the most important line in it:

> 不要直接呈現性行為，反而會讓廣告看起來比較廉價。
> **Don't depict the sex act directly — it actually makes the ad look cheap.**

The suggestion lives in the **composition and the wordplay**, never in the depiction. On this
inventory the audience has already seen explicit material; an ad that tries to out-explicit the
surrounding content loses, and reads as low-rent. A clean graphic with a line that means two things
wins, because the viewer does the work and enjoys having done it.

The working test for a suggestive line: **both readings must be literally true of the product.** If
the innocent reading is a stretch, it is not a pun, it is just a dirty line with a logo on it.

---

## Creative direction, per theme

### Safety 安全

- **Normal:** "Your Money. Your Privacy. Protected."
  Visual: shield, lock, vault — funds and privacy security.
- **Suggestive:** "PLAY SAFE. ALWAYS."
  Visual: an **unopened condom wrapper** alongside chips / slot elements, so the frame reads as
  *safe sex × safe gambling platform* at the same time. Explicitly **not** a depiction of sex.

### Big Win 爆獎

- **Normal:** "CHASE THE BIG WIN"
  Visual: jackpot, 777, gold coins bursting, high multipliers.
- **Suggestive, option 1:** "READY FOR THE BIG FINISH? / Hit the Jackpot."
- **Suggestive, option 2:** "GET CLOSER TO THE BIG O. / Big Odds. Bigger Wins."
  Visual: no explicit content needed — a jackpot meter **about to burst**, champagne spraying, a
  heavy coin eruption. The imagery carries the association on its own.

### Promotion

- Normal = the two offers as they already run.
- Suggestive = the same two offers, re-angled:
  - **150%** → the **"first time"** double meaning, which "First Deposit" sets up almost by itself.
  - **RealDoll** → **Fantasy / Dream / Take Her Home** — the kind of hint this audience reads
    instantly.
- Note in the source: the RealDoll promotion is **already adult-facing**, so it does not need to be
  pushed further. Its second version should get a more *seductive* line, not a more explicit image.

---

## The resulting test grid

```
Safety                  Normal×P1  Normal×P2  Suggestive×P1  Suggestive×P2  = 4
Big Win                 Normal×P1  Normal×P2  Suggestive×P1  Suggestive×P2  = 4
Promotion A – 150%      Normal×P1  Normal×P2  Suggestive×P1  Suggestive×P2  = 4
Promotion B – RealDoll  Normal×P1  Normal×P2  Suggestive×P1  Suggestive×P2  = 4
Backup                                                                      = 4
                                                                     TOTAL = 20
```

---

## Tracking code format

`PH_[Theme]_[Version]_[Placement]` — e.g. `PH_SAFE_N_P1`

- Theme: `SAFE` · `WIN` · `150` · `RD` · `BK` (backup)
- Version: `N` = Normal 正常版 · `S` = Suggestive 性暗示版
- Placement: `P1` · `P2`

Backups are for replacing a rejected creative, scaling a winner into a new slot, or a new placement.
**Record every backup use in the Notes column** — an unlabelled backup link is an unreadable result.

---

## Two things to be clear about before this runs

**P1 and P2 are the same creative in two different slots.** The copy does not change between them;
only the tracking link does. The pair exists to separate *placement* performance from *creative*
performance. If P1 and P2 ever carry different artwork, the whole grid stops being readable.

**RealDoll® is a third party's registered trademark** (Abyss Creations). Using the name and the ®
in paid creative is the client's call and needs to sit on an actual agreement for that promotion.
Flagging it, not blocking it.

---

Source files: `PH Ad Test Link Matrix.xlsx`, `P 站廣告素材與 Tracking Link 規劃.docx`,
plus the 20 registration links supplied in-thread (channel IDs 48–67).
