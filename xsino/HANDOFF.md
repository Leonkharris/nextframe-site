# XSINO / HeavenOnline — codex deploy notes

⚠️ This is only the **deployed mirror** of the interactive codex (GitHub Pages).
The **source-of-truth hand-off** lives in the project, not here:
`Lucifer gaming/Xsino/HANDOFF.md` — read that for full state, rules, and next actions.

_Last updated: 2026-07-29._

## What's live here
Two-brand content engine (Lucifer Gaming): **XSINO** (cyberpunk casino) + **HeavenOnline** (celestial sibling).
Bilingual English-first / Spanish. Live codex: **https://next-frame.agency/xsino/**

- **6 stories × 4 shots, paired EN+ES = 48 clips**, Seedance 1080p 9:16, all mounted.
  Brand map: **01/02/03 = XSINO** · **04/05/06 = HeavenOnline**.
- **46-character roster** (thumbnails live); **4 golden character boards** mounted in the roster
  lightbox — Kairo, Nyx, Vega, Fortuna (slots 13/23/36/43). 42 remaining.
- Board foundation for all 7 stories: `assets/charboards/`, `assets/motionboards/`, `assets/emotionboards/` (01–07).

## Deploy
Codex is **filesystem-driven** — `build_xsino.py` regenerates `data.js` by discovering assets by path.
Never hand-edit `data.js`. Source codex mirrors here via `cp -r 04_Interactive_Codex/. nextframe-site/xsino/`;
from `nextframe-site/`, commit **only `xsino/`** (`git add -- xsino/` — the repo has ~335 unrelated files, never sweep them), then `git push`. Pages CDN caches ~10 min.
