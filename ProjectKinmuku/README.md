# 金無垢 · Interactive Codex

A clickable, game-style interface that mounts the entire Project Kinmuku bible —
characters, world rules, the Eight Precepts, episode plan, the bilingual story, the
production pipeline, and the glossary — in one place, with an EN / 中文 / 雙語 toggle.

## Open it
Just double-click **`index.html`**. It runs offline in any modern browser; no build, no server.
(Or serve the folder: `python -m http.server 8123` then open `http://localhost:8123`.)

## What's inside
- **總覽 Hub** — landing screen + the "Diminishing Loop" infographic.
- **角色 Cast** — the 15 characters as a roster (filter by archetype or Part One). Click any
  card for the full sheet: base, name etymology, temperament, appearance, background, Part One
  arc, relationships, key lines, voice notes, future hooks, production checklist.
- **世界 World / 修行 Precepts / 分集 Episodes / 製作 Production / 詞彙 Glossary** — the story bible.
- **故事 Story** — the prologue + 13 chapters, line-aligned Chinese / English.

## Character portraits (drop-in)
Each roster card and character sheet shows a kanji "seal" medallion by default. To replace it
with real concept art, drop a file named by the character's two-digit id into
**`assets/portraits/`** — e.g. `assets/portraits/01.png` for Akaza Genki. It appears
automatically; no code change needed. (Portrait cards read best at ~3:4, e.g. 600×800.)

| id | 角色 | Romaji | id | 角色 | Romaji | id | 角色 | Romaji |
|----|------|--------|----|------|--------|----|------|--------|
| 01 | 赤座玄鬼 | Akaza Genki | 06 | 鞍馬白嶺 | Kurama Hakurei | 11 | 黒縁 | Kuroberi |
| 02 | 九條白蓮 | Kujō Byakuren | 07 | 霜月澄 | Shimotsuki Sumi | 12 | 紅緒 | Benio |
| 03 | 大江炎馬 | Ōe Enma | 08 | 綾女 | Ayame | 13 | 玉藻静香 | Tamamo Shizuka |
| 04 | 茨木義牙 | Ibaraki Giga | 09 | 白妙 | Shirotae | 14 | 峰 | Mine |
| 05 | 鞍馬烏嶽 | Kurama Ugaku | 10 | 碧吉 | Aokichi | 15 | 黒潮 | Kuroshio |

## Regenerate the data
The interface reads `data.js`, which is built deterministically (zero LLM cost) from the
existing source files by **`build_kinmuku.py`**. After editing any profile, chapter, or
bible doc, run:

```
python build_kinmuku.py
```

It re-parses `99_工作源檔_Source_Files/` (profiles + chapters), the Translation Bible, and the
World / Episode / Pipeline docx, then rewrites `data.js`. The HTML never needs touching.
