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
    "11": ("inspire", "T1", "#B4472E", "#D9A441", "El Perseverante", "The Persistent"),
    "12": ("love", "T1", "#C97B4A", "#1F3A5F", "Media Historia", "Half the Story"),
    "13": ("love", "T1", "#2F5D8A", "#C97B4A", "La Otra Mitad", "The Other Half"),
    "14": ("inspire", "T1", "#5A6E4A", "#D9A441", "El Soñador", "The Dreamer"),
    "15": ("inspire", "T1", "#6E7A4A", "#C8A24B", "El Viajero", "The Traveler"),
    "16": ("inspire", "T3", "#9B8AB8", "#C0C0C0", "La Matriarca", "The Matriarch"),
    "17": ("inspire", "T3", "#8A6E4A", "#C0C0C0", "El Patrón", "The Patron"),
    "18": ("inspire", "T3", "#8A7A4A", "#B98A5E", "La Gente del Campo", "The Field Folk"),
}

# ---- character -> owning film (story id) ; supporting/orphan ids stay unmapped ----
STORY_OF = {
    "01": "01",              # Carlos      -> Coin of Destiny
    "02": "02", "03": "02",  # Don Emilio, Lucía -> Grandfather
    "06": "07",              # Kairo       -> Wheel of Destiny
    "11": "03",              # Diego       -> Every Day a New Opportunity
    "12": "04", "13": "04",  # Camila, Tomás -> Two Strangers
    "14": "05",              # Mateo       -> The Dream
    "15": "06",              # Santiago    -> The Journey
}

# retired characters — kept in profiles/ for history but excluded from the codex cast.
# 04 Valentina Cruz + 05 Andrés Molina were the original "Two Strangers" leads; the film
# was recast to Camila (12) + Tomás (13) ("Two Cities, One Festival"), so 04/05 are orphans.
EXCLUDE = {"04", "05"}

# anime-roster leads: contact-sheet # -> role label
LEADS = {
    "13": "Kairo · Spinner", "23": "Nyx · Gatekeeper", "36": "Vega · Wheel Keeper",
    "43": "Fortuna · Spirit", "44": "XSINO girl · brand face",
}

# anime-roster names: contact-sheet # -> character name (all 46 designs)
NAMES = {
    "00": "Momo", "01": "Rai", "02": "Indi", "03": "Aurea", "04": "Yura",
    "05": "Sol", "06": "Ecks", "07": "Cinder", "08": "Ren", "09": "Echo",
    "10": "Eterna", "11": "Ryu", "12": "Jax", "13": "Kairo", "14": "Yuzu",
    "15": "Rook", "16": "Kilo", "17": "Spike", "18": "Draco", "19": "Pip",
    "20": "Vela", "21": "Cobra", "22": "Amber", "23": "Nyx", "24": "Blaze",
    "25": "Riot", "26": "Viper", "27": "Nova", "28": "Rosa", "29": "Oni",
    "30": "Silva", "31": "Usagi", "32": "Poppy", "33": "Yuki", "34": "Kai",
    "35": "Ao", "36": "Vega", "37": "Vireo", "38": "Ivy", "39": "Rin",
    "40": "Mara", "41": "Lumen", "42": "Tora", "43": "Fortuna",
    "44": "XSINO girl", "45": "Volt",
}

PROP_ES = "【PROPUESTA】"
PROP_EN_RE = re.compile(r"^\[PROPOSAL\]\s*")

# ---- generation-prompt wiring (foundation item 6) ----
# story id -> pipeline out-folder that holds the authored per-shot prompts/ files.
SID_OUT = {
    "01": "01_the_coin_of_destiny",
    "02": "02_the_grandfather_and_his_gran",
    "03": "03_every_day_a_new_opportunity",
    "04": "04_two_strangers",
    "05": "05_the_dream",
    "06": "06_the_journey",
    "07": "07_the_wheel_of_destiny",
}
# total runtime of each film's cut (seconds) — fallback when the oneshot has no beat markers.
SID_CUT = {"01": 30, "02": 38, "03": 60, "04": 37, "05": 35, "06": 38, "07": 40,
           "08": 30, "09": 40, "10": 40, "11": 40}

# neutral style/quality tail used only when the authored seedance prompt file is absent.
GEN_STYLE_EN = "ultra-realistic cinematic film, mood-appropriate lighting and color grade, shallow depth of field, subtle film grain, authentic and emotional"
GEN_STYLE_ES = "cine ultrarrealista, iluminación y gradación acordes al tono, poca profundidad de campo, grano de película sutil, auténtico y emotivo"
GEN_QUALITY_EN = "4K ultra HD, sharp clarity, stable picture; keep every face and wardrobe consistent with the attached character board and references, no distortion, no warping; generate without subtitles"
GEN_QUALITY_ES = "4K ultra HD, nitidez, imagen estable; mantén cada rostro y vestuario consistentes con la ficha de personaje y las referencias adjuntas, sin distorsión, sin deformaciones; genera sin subtítulos"


def demojibake(s):
    """Repair UTF-8-read-as-Latin-1 double-encoding (JARDÃN -> JARDÍN). Guarded: only
    applies when the tell-tale mangle bytes are present and the round-trip succeeds."""
    if not s or not re.search(r"Ã|â€|Â", s):
        return s
    try:
        return s.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


def extract_dialog(text):
    """Pull spoken lines (quoted text) out of an action line. Handles straight and curly quotes."""
    if not text:
        return ""
    qs = re.findall(r"[“\"«]([^“”\"«»]{1,240}?)[”\"»]", text)
    return "  /  ".join(q.strip() for q in qs if q.strip())


def compute_timecodes(oneshot_txt, n_shots, fallback_total):
    """Per-shot timestamp windows. Prefer the oneshot's authored beat markers (0-3s, 3-6s...)
    when their count matches the shot count; else divide the cut runtime evenly."""
    marks = re.findall(r"(\d+)\s*[-–—]\s*(\d+)\s*s", oneshot_txt or "")
    if n_shots and len(marks) == n_shots:
        return ["{}–{}s".format(a, b) for a, b in marks]
    total = max((int(b) for _, b in marks), default=0) or fallback_total or (n_shots * 5)
    step = (total / n_shots) if n_shots else 5
    return ["{}–{}s".format(round(i * step), round((i + 1) * step)) for i in range(n_shots)]


def read_gen_prompt(sid, nn, lang):
    """The authored per-shot generation prompt (Higgsfield/Seedance), de-mojibaked. '' if absent."""
    of = SID_OUT.get(sid)
    if not of:
        return ""
    p = os.path.join(ROOT, "10_Pipeline", "out", of, "prompts", "shot{}.seedance.{}.txt".format(nn, lang))
    if os.path.exists(p):
        return demojibake(read(p).strip())
    return ""


def assemble_prompt(sh, lang):
    """Clean fallback prompt built from the story-source fields when no authored file exists."""
    if lang == "en":
        return ("Scene: {slug}. Action: {act} Movement & camera: {mv} Emotion: {emo} "
                "Style: {sty}. Narration (deep, calm cinematic voice): \"{vo}\" — starts at 0s and "
                "finishes before the clip ends, never cut off. {q}.").format(
            slug=sh.get("slug_en", ""), act=sh.get("action_en", ""), mv=sh.get("move_en", ""),
            emo=sh.get("emo_en", ""), sty=GEN_STYLE_EN, vo=sh.get("vo_en", ""), q=GEN_QUALITY_EN)
    return ("Escena: {slug}. Acción: {act} Movimiento y cámara: {mv} Emoción: {emo} "
            "Estilo: {sty}. Narración (voz cinematográfica profunda y serena): \"{vo}\" — comienza en 0s y "
            "termina antes de que acabe el clip, nunca cortada. {q}.").format(
        slug=sh.get("slug_es", ""), act=sh.get("action_es", ""), mv=sh.get("move_es", ""),
        emo=sh.get("emo_es", ""), sty=GEN_STYLE_ES, vo=sh.get("vo_es", ""), q=GEN_QUALITY_ES)


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
        "film": STORY_OF.get(pid, ""),
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
    oneshot = {"es": "", "en": ""}
    shots, cur_shot, mode = [], None, None
    for line in txt.splitlines():
        if re.match(r"#\s*LOGLINE", line):
            mode = "logline"; continue
        if re.match(r"#\s*THESIS", line):
            mode = "thesis"; continue
        if re.match(r"#\s*ONESHOT-EN", line):
            mode = "oneshot_en"; continue
        if re.match(r"#\s*ONESHOT-ES", line):
            mode = "oneshot_es"; continue
        if mode == "oneshot_en" and line.strip() and not line.startswith("#"):
            oneshot["en"] = (oneshot["en"] + " " + line.strip()).strip(); continue
        if mode == "oneshot_es" and line.strip() and not line.startswith("#"):
            oneshot["es"] = (oneshot["es"] + " " + line.strip()).strip(); continue
        m = re.match(r"##\s*SHOT:\s*(\d+)\s*｜\s*(.+)", line)
        if m:
            if cur_shot: shots.append(cur_shot)
            nn = m.group(1)
            parts = [x.strip() for x in m.group(2).split("｜")]
            slug_es = parts[0]
            slug_en = parts[1] if len(parts) > 1 else parts[0]
            cur_shot = {"n": int(nn), "slug_es": slug_es, "slug_en": slug_en,
                        "action_es": "", "action_en": "", "vo_es": "", "vo_en": ""}
            found_frame = None
            found_sceneboard = None
            for ext in [".png", ".jpg", ".jpeg", ".webp"]:
                frame_full = os.path.join(os.path.dirname(__file__), "assets", "frames", sid, f"shot{nn}{ext}")
                if os.path.exists(frame_full):
                    found_frame = f"assets/frames/{sid}/shot{nn}{ext}"
                    break
            for ext in [".png", ".jpg", ".jpeg", ".webp"]:
                sb_full = os.path.join(os.path.dirname(__file__), "assets", "sceneboards", sid, f"shot{nn}{ext}")
                if os.path.exists(sb_full):
                    found_sceneboard = f"assets/sceneboards/{sid}/shot{nn}{ext}"
                    break
            found_moveboard = None
            for ext in [".png", ".jpg", ".jpeg", ".webp"]:
                mb_full = os.path.join(os.path.dirname(__file__), "assets", "moveboards", sid, f"shot{nn}{ext}")
                if os.path.exists(mb_full):
                    found_moveboard = f"assets/moveboards/{sid}/shot{nn}{ext}"
                    break
            found_video = None
            for ext in [".mp4", ".webm"]:
                video_full = os.path.join(os.path.dirname(__file__), "assets", "videos", sid, f"shot{nn}{ext}")
                if os.path.exists(video_full):
                    found_video = f"assets/videos/{sid}/shot{nn}{ext}"
                    break
            found_video_es = None
            for ext in [".mp4", ".webm"]:
                video_es_full = os.path.join(os.path.dirname(__file__), "assets", "videos", sid, f"shot{nn}_es{ext}")
                if os.path.exists(video_es_full):
                    found_video_es = f"assets/videos/{sid}/shot{nn}_es{ext}"
                    break
            found_motion_ref = None  # foundation item 5 (optional): real-world movement reference clip/still
            for ext in [".mp4", ".webm", ".png", ".jpg", ".jpeg", ".webp", ".gif"]:
                mr_full = os.path.join(os.path.dirname(__file__), "assets", "motionrefs", sid, f"shot{nn}{ext}")
                if os.path.exists(mr_full):
                    found_motion_ref = f"assets/motionrefs/{sid}/shot{nn}{ext}"
                    break
            if found_frame:
                cur_shot["frame"] = found_frame
            if found_sceneboard:
                cur_shot["sceneboard"] = found_sceneboard
            if found_moveboard:
                cur_shot["moveboard"] = found_moveboard
            if found_video:
                cur_shot["video"] = found_video
            if found_video_es:
                cur_shot["video_es"] = found_video_es
            if found_motion_ref:
                cur_shot["motion_ref"] = found_motion_ref
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
        bm = re.match(r"(MOVE-ES|MOVE-EN|EMO-ES|EMO-EN|ONSCREEN-ES|ONSCREEN-EN):\s*(.*)", line)
        if bm and mode == "shot" and cur_shot:
            cur_shot[bm.group(1).lower().replace("-", "_")] = bm.group(2).strip(); continue
    if cur_shot: shots.append(cur_shot)

    char_board = None
    for ext in [".png", ".jpg", ".jpeg", ".webp"]:
        cb_full = os.path.join(os.path.dirname(__file__), "assets", "charboards", sid, f"board{ext}")
        if os.path.exists(cb_full):
            char_board = f"assets/charboards/{sid}/board{ext}"
            break

    story_board = None
    for ext in [".png", ".jpg", ".jpeg", ".webp"]:
        sb_full = os.path.join(os.path.dirname(__file__), "assets", "storyboards", sid, f"board{ext}")
        if os.path.exists(sb_full):
            story_board = f"assets/storyboards/{sid}/board{ext}"
            break

    motion_board = None  # foundation item 2: per-story movement board (camera + subject motion)
    for ext in [".png", ".jpg", ".jpeg", ".webp"]:
        mob_full = os.path.join(os.path.dirname(__file__), "assets", "motionboards", sid, f"board{ext}")
        if os.path.exists(mob_full):
            motion_board = f"assets/motionboards/{sid}/board{ext}"
            break

    emotion_board = None  # foundation item 3: per-story emotional beat board
    for ext in [".png", ".jpg", ".jpeg", ".webp"]:
        eb_full = os.path.join(os.path.dirname(__file__), "assets", "emotionboards", sid, f"board{ext}")
        if os.path.exists(eb_full):
            emotion_board = f"assets/emotionboards/{sid}/board{ext}"
            break

    oneshot_video = None
    for ext in [".mp4", ".webm"]:
        ov_full = os.path.join(os.path.dirname(__file__), "assets", "videos", sid, f"oneshot{ext}")
        if os.path.exists(ov_full):
            oneshot_video = f"assets/videos/{sid}/oneshot{ext}"
            break

    # the 15s x 5 cut: five long takes that tell the whole story in five beats, mounted as
    # take<n>_<beat_slug>.mp4 so the beat name travels with the file and needs no second source.
    takes = []
    vdir = os.path.join(os.path.dirname(__file__), "assets", "videos", sid)
    if os.path.isdir(vdir):
        for fn in sorted(os.listdir(vdir)):
            tm = re.match(r"take(\d+)_(.+)\.(?:mp4|webm)$", fn)
            if tm:
                takes.append({
                    "n": int(tm.group(1)),
                    "label": tm.group(2).replace("_", " ").title(),
                    "src": f"assets/videos/{sid}/{fn}",
                })
        takes.sort(key=lambda t: t["n"])

    # foundation item 6: attach a copy-paste generation prompt to every shot. Prefer the authored
    # per-shot Seedance prompt (de-mojibaked); fall back to a clean prompt assembled from the story
    # source. Timestamps come from the oneshot beat markers; dialog from the action-line quotes.
    timecodes = compute_timecodes(oneshot.get("en", ""), len(shots), SID_CUT.get(sid))
    # foundation item 6 · on-screen text: the XSINO signature closes every film like a signature
    # (brand rule 2 — brand appears at the end). Story 07's source authors it explicitly; apply the
    # same closing tagline to every story's final shot when its own source didn't author on-screen text.
    BRAND_SIGNATURE_EN = "Luck begins with the next decision."
    BRAND_SIGNATURE_ES = "La suerte empieza en la próxima decisión."
    last_i = len(shots) - 1
    for i, sh in enumerate(shots):
        nn = f"{sh['n']:02d}"
        onscreen_en = sh.get("onscreen_en", "")
        onscreen_es = sh.get("onscreen_es", "")
        if i == last_i and not onscreen_en:
            onscreen_en = BRAND_SIGNATURE_EN
            onscreen_es = BRAND_SIGNATURE_ES
        sh["gen"] = {
            "time": timecodes[i] if i < len(timecodes) else "",
            "dialog_en": extract_dialog(sh.get("action_en", "")),
            "dialog_es": extract_dialog(sh.get("action_es", "")),
            "onscreen_en": onscreen_en,
            "onscreen_es": onscreen_es,
            "prompt_en": read_gen_prompt(sid, nn, "en") or assemble_prompt(sh, "en"),
            "prompt_es": read_gen_prompt(sid, nn, "es") or assemble_prompt(sh, "es"),
        }

    return {
        "id": story_id, "title_es": title_es, "title_en": title_en,
        "pillar": pillar, "brand": brand, "logline": logline, "thesis": thesis,
        "oneshot": oneshot, "oneshot_video": oneshot_video, "takes": takes,
        "shots": shots, "char_board": char_board,
        "story_board": story_board,
        "motion_board": motion_board, "emotion_board": emotion_board,
    }


def parse_roster():
    idx = os.path.join(ROOT, "Xsino anime Universe", "CHARACTER_INDEX.md")
    if not os.path.exists(idx):
        return []
    here = os.path.dirname(__file__)
    out = []
    for m in re.finditer(r"^\|\s*(\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|", read(idx), re.M):
        n = m.group(1)
        webp = f"assets/roster/{n}.webp"
        hi = f"assets/roster/{n}_hi.jpg"
        # thumb = the light .webp that is already live (the _hi.jpg 404s on the CDN).
        # hi = the full-res sheet for click-to-enlarge, falling back to .webp if absent.
        hi = hi if os.path.exists(os.path.join(here, hi)) else webp
        # Two style lanes. board = 3D-realistic golden board (assets/roster/NN_board.*);
        # board_arcane = Arcane painterly-3D board (assets/roster/NN_board_arcane.*).
        # Drop either file in and it auto-mounts on rebuild; the codex shows Arcane first.
        def _board(suffix):
            for ext in (".webp", ".png", ".jpg", ".jpeg"):
                cand = f"assets/roster/{n}_board{suffix}{ext}"
                if os.path.exists(os.path.join(here, cand)):
                    return cand
            return ""
        board = _board("")
        board_arcane = _board("_arcane")
        out.append({"n": n, "name": NAMES.get(n, ""), "thumb": webp, "hi": hi,
                    "board": board, "board_arcane": board_arcane,
                    "desc": m.group(3).strip(), "lead": LEADS.get(n, "")})
    return out


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

    characters = [parse_character(pid) for pid in list_ids("profiles") if pid not in EXCLUDE]
    stories = [parse_story(sid) for sid in list_ids("stories")]
    roster = parse_roster()

    data = {
        "meta": META,
        "pillars": pillars,
        "characters": characters,
        "stories": stories,
        "roster": roster,
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
