# XSINO / HeavenOnline — Production Hand-off

**If we run out of paid credits, everything below continues on FREE lanes.** All scripts,
prompts, canon, and character art are on disk; nothing here needs me or Higgsfield credits to finish.

_Last updated: 2026-07-09._

---

## 1. What this is
Two-brand content engine (Lucifer Gaming): **XSINO** (cyberpunk casino) + **HeavenOnline**
(celestial sibling). Mirror of Project Kinmuku. Bilingual **English-first / Spanish**.
Live codex: **https://next-frame.agency/xsino/**

## 2. Status board
| Deliverable | State | Location |
|---|---|---|
| Brand bible + official brand facts (EN/ES) | ✅ done | `99_Source_Files/bible/` |
| 7 storyboards (6 official films + anime Wheel), 5s segments | ✅ done | `99_Source_Files/stories/NN.md` |
| Shot-packs: 5s Seedance + keyframe prompts, **EN + ES** | ✅ done | `10_Pipeline/out/<story>/` |
| Interactive codex (English-first, manual palette/fonts/logo) | ✅ live | `04_Interactive_Codex/` → `nextframe-site/xsino/` |
| **Real character pool (Leon's 46 originals)** | ✅ canon | `Xsino anime Universe/Shonen Anime Style Cyberpunk/` |
| Character catalog + contact sheet | ✅ done | `Xsino anime Universe/CHARACTER_INDEX.md` · `CHARACTER_CONTACT_SHEET.png` |
| Character prompts + art direction (follow references + manual) | ✅ done | `Xsino anime Universe/CHARACTER_PROMPTS.md` · `ANIME_ART_DIRECTION.md` |
| Codex cast portraits = real character art | ✅ live | `04_.../assets/portraits/{06,07,08,10}.png` |
| **Lead assignments (which of 46 = Kairo/Nyx/Vega/Fortuna)** | ⏳ PENDING Leon | proposed in `CHARACTER_INDEX.md` |
| AI-generated cast + batch-01 marketing art | 🗄️ archived (off-model, superseded) | `marketing_assets/_generated_archive/` |
| Keyframes per shot (7 films × ~12) | ⏳ pending (Film 01 ✅ done) | run from shot-packs (free Artlist) |
| Seedance video clips | ⏳ pending (Film 01 ✅ done) | run from shot-packs |

## 3. Rules + two sources of truth for ALL art
**Read `CHARACTER_RULES.md` first** — the standard for every character/clip/post (21+ only, mixed LatAm/Polynesian, use the references, brand palette, English-first, no "you'll win"). Then:
1. **Character references** — the 46 real designs in `Shonen Anime Style Cyberpunk/` (filenames are export junk; every file is a character). The reference PNGs ARE the art — use directly, never invent a look.
2. **Graphic manual** — `Logos and assets/Grafic manual (Xsino).pdf`: cyberpunk purple/pink/cyan + glows (gold only for the Wheel/luck-moment); fonts Venus Rising / Ethnocentric / Conthrax / Spy Agency + Montserrat; gradient-X logo; neon city / casino / gate / X+S coin elements. (HeavenOnline manual = black+gold celestial.)

## 4. Generation lanes (cheapest first)
1. **Artlist — FREE / unlimited** (Nano Banana 2 Lite image, Seedance 2.0 Mini video), :9223 browser:
   ```
   node scripts/artlist-gen.mjs image "<prompt>" --out "<dir>"
   node scripts/artlist-gen.mjs video "<prompt>" --start "<keyframe.png>" --out "<dir>"
   ```
   ⚠️ `--ref` (image reference) is currently BROKEN → run prompt-only. NB2 Lite outputs wide aspect; crop to 9:16 for posts.
   💡 *Note: The video script now automatically clears the previous start frame from the composer to prevent consecutive run upload collisions.*
2. **Pollinations — FREE** (`scripts/pollinations-gen.mjs`) — concept/backdrops fallback.
3. **Higgsfield — PAID** (`mcp__4fe6467d…` nano_banana_pro, ~2 cr/img) — hero/identity shots only. **This is the credit that can run out — everything else is free.**

## 5. How to finish a film — all free
Pack per story `NN` is in `10_Pipeline/out/<NN_slug>/`:
1. **Keyframes:** each `prompts/shotNN.keyframe.en.txt` (or `.es`) → `artlist-gen.mjs image … --out frames/` → `shotNN.png`.
2. **Video (5s clips):** each `prompts/shotNN.seedance.en.txt` (or `.es`) → `artlist-gen.mjs video … --start frames/shotNN.png --out clips/`. Carry each clip's last frame into the next `--start` for continuity.
3. **VO:** `vo_en.txt` / `vo_es.txt` → neural voice only (Chloe/Chatterbox). VO lines are locked canon.
4. **Edit:** stitch in order; VO + the music cue in each prompt; hold each ⭐ KEY MOMENT on the gold beat; overlay on-screen text (Seedance renders WITHOUT subtitles); end on the brand logo close.

Regenerate all packs after any screenplay/subject edit: `node 10_Pipeline/build_shotpack.mjs --all`.

## 6. The 7 films (5s segments, EN+ES prompts ready)
- **XSINO:** 01 The Coin of Destiny · 02 The Grandfather and His Granddaughter · 03 Every Day a New Opportunity · 07 The Wheel of Destiny (anime, carries Kairo's real look)
- **HeavenOnline:** 04 Two Strangers · 05 The Dream · 06 The Journey
Exact closing VO lines are canon — `99_Source_Files/bible/official_brand.md`.

## 7. Characters — use the references, don't regenerate
- Canonical art = the 46 PNGs in `Shonen Anime Style Cyberpunk/`. Catalog + descriptions: `CHARACTER_INDEX.md` (+ visual `CHARACTER_CONTACT_SHEET.png`).
- Proposed leads (CONFIRM): Kairo=`Layer 1 (7) 3.png`, Nyx=`freepik__background__20262.png`, Vega=`pattern-1.png`, Fortuna=`pattern.png`, brand-face=`xsino girl 1.png`.
- On-model scene/keyframe prompts (EN+ES) for each lead: `CHARACTER_PROMPTS.md`. Do NOT use `_generated_archive/` — off-model.

## 8. Deploy
`cp -r 04_Interactive_Codex/. nextframe-site/xsino/` → from `nextframe-site/`, commit **only `xsino/`** (the repo has ~335 unrelated uncommitted files — never sweep them) → `git push`. GitHub Pages CDN caches ~10 min; hard-refresh to see updates.

## 9. Next actions waiting on Leon
1. Confirm the 4 lead file→role assignments → point prompts, portraits, and the pipeline in one pass.
2. Review Film 01 (The Coin of Destiny) on next-frame.agency/xsino and confirm if we should start Film 02 keyframes and video clips.
3. Optional: expand the codex Cast into a browsable gallery of all 46.
