# -*- coding: utf-8 -*-
"""
XSINO — Interactive Codex data builder.
Deterministic, zero-LLM. Mirrors Project Kinmuku's build_kinmuku.py architecture,
but parses XSINO's bilingual ES/EN source files (brand bible, character profiles,
story storyboards) into a single data.js consumed by index.html.

Run:  python build_xsino.py
"""
import os, re, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC  = os.path.join(ROOT, "99_Source_Files")
OUT  = os.path.join(os.path.dirname(__file__), "data.js")

# ---- curation layer (Fable) : brand meta ----
META = {
    "brand": "XSINO",
    "tagline_en": "Where the next decision changes everything",
    "tagline_es": "Donde la próxima decisión lo cambia todo",
    "thesis_en": "Luck begins with the next decision.",
    "thesis_es": "La suerte empieza en la próxima decisión.",
    "market_en": "Online casino — Mexico & Latin America",
    "market_es": "Casino en línea — México y Latinoamérica",
    "format_en": "Vertical 9:16 · 15–40s",
    "format_es": "Vertical 9:16 · 15–40s",
    "brands": [
        {"key": "xsino", "name": "XSINO",
         "tone_en": "Cyberpunk casino — Mexico & LatAm; neon purple/pink/cyan, gold for the luck-moment",
         "tone_es": "Casino cyberpunk — México y LatAm; neón morado/rosa/cian, oro para el momento de suerte"},
        {"key": "heaven", "name": "HeavenOnline",
         "tone_en": "Sibling brand — celestial luxury, black + gold + white, warm & romantic",
         "tone_es": "Marca hermana — lujo celestial, negro + oro + blanco, cálida y romántica"},
    ],
}

# ---- pillars (key, es, en, accent, accent2, icon) ----
PILLARS = [
    {"key": "inspire", "es": "Historias que Inspiran", "en": "Stories That Inspire",
     "accent": "#D9A441", "accent2": "#E8C87A", "icon": "✦"},
    {"key": "love", "es": "Amores Imposibles", "en": "Impossible Love Stories",
     "accent": "#4C8C86", "accent2": "#E0A46A", "icon": "♥"},
    {"key": "anime", "es": "Universo Anime XSINO", "en": "XSINO Anime Universe",
     "accent": "#E24D9C", "accent2": "#34C6E0", "icon": "◈"},
    {"key": "whatif", "es": "¿Y Si...?", "en": "What If...?",
     "accent": "#E8B84B", "accent2": "#F6D98A", "icon": "?"},
]

# ---- character curation : id -> (pillarKey, priority, color, color2, alias_es, alias_en) ----
CURATION = {
    "01": ("inspire", "T0", "#3B5A78", "#D9A441", "El Mecánico", "The Mechanic"),
    "02": ("inspire", "T1", "#6B4A2E", "#C8A24B", "El Abuelo", "The Grandfather"),
    "03": ("inspire", "T1", "#B98A5E", "#E8C87A", "La Nieta", "The Granddaughter"),
    "04": ("love", "T2", "#4C8C86", "#EDE6D4", "Extraña A", "Stranger A"),
    "05": ("love", "T2", "#E0A46A", "#2E2A2A", "Extraño B", "Stranger B"),
    "06": ("anime", "T1", "#34C6E0", "#E8B84B", "El Girador", "The Spinner"),
    "07": ("anime", "T2", "#7A4FA0", "#E8B84B", "El Guardián de la Rueda", "The Wheel Keeper"),
    "08": ("anime", "T2", "#E24D9C", "#0B0E17", "El Guardián de la Puerta", "The Gatekeeper"),
    "09": ("whatif", "T0", "#E8B84B", "#0B0E17", "La Suerte", "Luck"),
    "10": ("anime", "T3", "#E8B84B", "#B0E0E6", "Fortuna", "Fortune"),
}

PROP_ES = "【PROPUESTA】"
PROP_EN_RE = re.compile(r"^\[PROPOSAL\]\s*")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def mk_pair(es, en):
    es, en = es.strip(), en.strip()
    prop = es.startswith(PROP_ES) or bool(PROP_EN_RE.match(en))
    es = es.replace(PROP_ES, "").strip()
    en = PROP_EN_RE.sub("", en).strip()
    return {"es": es, "en": en, "proposal": prop}


# ---------- generic bilingual section parser (bible files + character profiles) ----------
# Shared shape: "## SECTION: ES｜EN" header, followed by alternating "ES: ..." / "EN: ..." lines.
def parse_sections(txt):
    sections, cur = [], None
    for line in txt.splitlines():
        m = re.match(r"##\s*SECTION:\s*(.+)", line)
        if m:
            parts = [x.strip() for x in m.group(1).split("｜")]
            cur = {"es": parts[0], "en": parts[1] if len(parts) > 1 else parts[0], "pairs": []}
            sections.append(cur)
            continue
        sm = re.match(r"ES:\s*(.*)", line)
        if sm and cur is not None:
            cur["pairs"].append({"es": sm.group(1).strip(), "en": ""})
            continue
        em = re.match(r"EN:\s*(.*)", line)
        if em and cur is not None and cur["pairs"] and cur["pairs"][-1]["en"] == "":
            cur["pairs"][-1] = mk_pair(cur["pairs"][-1]["es"], em.group(1).strip())
    return sections


# ---------- character profiles ----------
def parse_character(pid):
    txt = read(os.path.join(SRC, "profiles", f"{pid}.md"))
    header = re.search(r"# HEADER:\s*(.+)", txt)
    parts = [x.strip() for x in header.group(1).split("｜")]
    name = parts[1] if len(parts) > 1 else ""
    pillar, priority, color, color2, alias_es, alias_en = CURATION.get(
        pid, ("", "", "#888", "#aaa", "", ""))
    return {
        "id": pid, "name": name,
        "pillar": pillar, "priority": priority,
        "color": color, "color2": color2,
        "alias_es": alias_es, "alias_en": alias_en,
        "sections": parse_sections(txt),
    }


# ---------- story storyboards ----------
def parse_story(sid):
    txt = read(os.path.join(SRC, "stories", f"{sid}.md"))
    header = re.search(r"# HEADER:\s*(.+)", txt)
    hparts = [x.strip() for x in header.group(1).split("｜")]
    story_id = hparts[0]
    title_es = hparts[1] if len(hparts) > 1 else ""
    title_en = hparts[2] if len(hparts) > 2 else title_es
    pillar_m = re.search(r"^#\s*PILLAR:\s*(.+)$", txt, re.M)
    pillar = pillar_m.group(1).strip() if pillar_m else ""
    brand_m = re.search(r"^#\s*BRAND:\s*(\w+)", txt, re.M)
    brand = brand_m.group(1).strip().lower() if brand_m else "xsino"

    logline = {"es": "", "en": ""}
    thesis = {"es": "", "en": ""}
    shots, cur_shot, mode = [], None, None
    for line in txt.splitlines():
        if re.match(r"#\s*LOGLINE", line):
            mode = "logline"; continue
        if re.match(r"#\s*THESIS", line):
            mode = "thesis"; continue
        m = re.match(r"##\s*SHOT:\s*(\d+)\s*｜\s*(.+)", line)
        if m:
            if cur_shot: shots.append(cur_shot)
            cur_shot = {"n": int(m.group(1)), "slug": m.group(2).strip(),
                        "action_es": "", "action_en": "", "vo_es": "", "vo_en": ""}
            mode = "shot"
            continue
        sm = re.match(r"ES:\s*(.*)", line)
        if sm:
            if mode == "logline": logline["es"] = sm.group(1).strip()
            elif mode == "thesis": thesis["es"] = sm.group(1).strip()
            elif mode == "shot" and cur_shot: cur_shot["action_es"] = sm.group(1).strip()
            continue
        em = re.match(r"EN:\s*(.*)", line)
        if em:
            if mode == "logline": logline["en"] = em.group(1).strip()
            elif mode == "thesis": thesis["en"] = em.group(1).strip()
            elif mode == "shot" and cur_shot: cur_shot["action_en"] = em.group(1).strip()
            continue
        vs = re.match(r"VO-ES:\s*(.*)", line)
        if vs and mode == "shot" and cur_shot:
            cur_shot["vo_es"] = vs.group(1).strip(); continue
        ve = re.match(r"VO-EN:\s*(.*)", line)
        if ve and mode == "shot" and cur_shot:
            cur_shot["vo_en"] = ve.group(1).strip(); continue
    if cur_shot: shots.append(cur_shot)

    return {
        "id": story_id, "title_es": title_es, "title_en": title_en,
        "pillar": pillar, "brand": brand, "logline": logline, "thesis": thesis, "shots": shots,
    }


def list_ids(dirname):
    d = os.path.join(SRC, dirname)
    ids = [f[:-3] for f in os.listdir(d) if re.fullmatch(r"\d+\.md", f)]
    return sorted(ids)


def main():
    bible = {
        "brand": parse_sections(read(os.path.join(SRC, "bible", "brand_bible.md"))),
        "official": parse_sections(read(os.path.join(SRC, "bible", "official_brand.md"))),
        "pillars": parse_sections(read(os.path.join(SRC, "bible", "pillars.md"))),
        "visual": parse_sections(read(os.path.join(SRC, "bible", "visual_language.md"))),
        "pipeline": parse_sections(read(os.path.join(SRC, "bible", "production_pipeline.md"))),
    }

    pillars = []
    for p in PILLARS:
        sec = next((s for s in bible["pillars"] if s["es"] == p["es"]), None)
        entry = dict(p)
        entry["pairs"] = sec["pairs"] if sec else []
        pillars.append(entry)

    characters = [parse_character(pid) for pid in list_ids("profiles")]
    stories = [parse_story(sid) for sid in list_ids("stories")]

    data = {
        "meta": META,
        "pillars": pillars,
        "characters": characters,
        "stories": stories,
        "bible": bible,
    }
    js = "window.XSINO_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)

    print(f"characters={len(characters)} stories={len(stories)} pillars={len(pillars)} "
          f"bible_brand={len(bible['brand'])} bible_pillars={len(bible['pillars'])} "
          f"bible_visual={len(bible['visual'])} bible_pipeline={len(bible['pipeline'])}")
    print("wrote data.js ({} bytes)".format(os.path.getsize(OUT)))


if __name__ == "__main__":
    main()
