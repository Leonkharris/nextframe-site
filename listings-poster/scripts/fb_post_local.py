"""Post published listings to the Next-Frame.Agency FB page from CLEAN egress.

WHY THIS RUNS LOCALLY (not in the HF Space): HF free Spaces run an SNI-based
egress firewall that blackholes TLS handshakes whose SNI is a Graph API host
(graph.facebook.com / b-graph.facebook.com). Proven: the SAME IP accepts
SNI=connect.facebook.net and drops SNI=graph.facebook.com. So the Space can
persist a published listing but can NEVER post it to the Graph API — an in-Space
post just hangs until timeout. This script runs the post from a machine with
clean egress (Leon's), reusing the Space's own storage/registry/fb_publish code
against the private dataset store. The Space's registry IS the queue.

  py -3.12 scripts/fb_post_local.py --id=<listing_id> [--dry-run] [--force]
  py -3.12 scripts/fb_post_local.py [--dry-run]     # drain: every published, unposted listing (<=1/day)
  py -3.12 scripts/fb_post_local.py --id=<id> --via=browser   # no token; posts via the Business Suite composer over CDP 9222

TWO POST MECHANISMS (same ledger, dedup and <=1/day anti-burst either way):
  Graph (default) : headless Graph API; needs NEXTFRAME_FB_PAGE_TOKEN. Posts photo when publishable, else text.
  --via=browser   : drives Leon's logged-in composer over CDP 9222 (scripts/fb_compose.mjs). No token.
                    TEXT-ONLY — the composer types the caption; it does not attach a photo (use Graph mode for photo posts).

TOKENS (Claude never handles the raw FB token — the script reads it, never prints it):
  HF store : .hf-token (already present; authenticates the private dataset)
  FB page  : env NEXTFRAME_FB_PAGE_TOKEN, else nextframe-listings-bot/.fb-token,
             else nextframe-agency/config/fb-page-token.txt (shared with the agency publisher)

Photos: web-scraped listing photos (source != "upload") are deliberately NOT
republished — registry._publishable withholds them (a rights guard), so such a
listing posts TEXT-only (caption + link). Agent-uploaded photos post as a photo.
"""
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # nextframe-listings-bot/
os.chdir(ROOT)
sys.path.insert(0, str(ROOT))


def _read(p):
    try:
        return Path(p).read_text(encoding="utf-8").strip()
    except Exception:
        return ""


# tokens must be in the environment BEFORE importing app.storage (it reads HF_TOKEN at import)
if not os.environ.get("HF_TOKEN"):
    os.environ["HF_TOKEN"] = _read(ROOT / ".hf-token")
if not os.environ.get("NEXTFRAME_FB_PAGE_TOKEN"):
    tok = _read(ROOT / ".fb-token") or _read(ROOT.parent / "nextframe-agency" / "config" / "fb-page-token.txt")
    if tok:
        os.environ["NEXTFRAME_FB_PAGE_TOKEN"] = tok

from app import fb_publish, registry, storage  # noqa: E402

LEDGER = "registry/fb-posted.json"             # store: {"ids":[...], "posts":[{id,post_id,url,at,via}]}
AGENCY_DRIP = ROOT.parent / "nextframe-agency" / "output" / "publishing" / "facebook-published-ledger.json"
SPACING_H = float(os.environ.get("NEXTFRAME_MIN_POST_SPACING_HOURS", "20"))
PAGE_ID = fb_publish.PAGE_ID
COMPOSER_JS = ROOT / "scripts" / "fb_compose.mjs"


def _now():
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def _load_ledger():
    d = storage._download(LEDGER) or {}
    if isinstance(d, list):            # legacy bare-list form
        d = {"ids": d}
    d.setdefault("ids", [])
    d.setdefault("posts", [])
    return d


def _ts(s):
    """ISO-ish string -> epoch seconds, best-effort; 0 on failure."""
    try:
        return time.mktime(time.strptime((s or "")[:19], "%Y-%m-%dT%H:%M:%S"))
    except Exception:
        return 0.0


def _hours_since_last(ledger):
    """Newest FB post to THIS page across both publishers (page-wide <=1/day).
    Reads the listings ledger and the agency drip ledger (same page)."""
    import json
    newest = max((_ts(p.get("at")) for p in ledger["posts"]), default=0.0)
    try:
        dl = json.loads(_read(AGENCY_DRIP) or "null")
        entries = dl if isinstance(dl, list) else (dl or {}).get("entries", [])
        newest = max([newest] + [_ts(e.get("publishedAt")) for e in entries])
    except Exception:
        pass
    # ponytail: uses local clock vs UTC stamps; the 20h floor swallows the <1h skew.
    return (time.time() - newest) / 3600.0 if newest else float("inf")


def _hero(card):
    """First publishable photo's bytes, or None (-> text-only post)."""
    for ref in card.get("photos") or []:
        b = storage.load_photo(ref["sid"], ref["idx"])
        if b:
            return b
    return None


def _canonical(permalink):
    """(post_id, url) from a raw FB permalink. post_id matches the Graph form
    '{PAGE_ID}_{fbid}'. Returns ('', permalink) when no numeric fbid is present
    (e.g. a /posts/pfbid... slug) — dedup still works off the listing id."""
    m = (re.search(r"/posts/(\d+)", permalink or "")
         or re.search(r"story_fbid=(\d+)", permalink or "")
         or re.search(r"[?&]fbid=(\d+)", permalink or ""))
    if m:
        fbid = m.group(1)
        return f"{PAGE_ID}_{fbid}", f"https://www.facebook.com/{PAGE_ID}/posts/{fbid}"
    return "", (permalink or "")


def _post_browser(card):
    """Post the caption via the Business Suite composer (CDP 9222), no token.
    Returns {ok, post_id, url, ...} like fb_publish.post_listing. Text-only."""
    caption = fb_publish.build_caption(card)
    fd, capfile = tempfile.mkstemp(prefix="fbcap_", suffix=".txt")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(caption)
        try:
            proc = subprocess.run(["node", str(COMPOSER_JS), capfile],
                                  capture_output=True, text=True, timeout=180, cwd=str(ROOT))
        except FileNotFoundError:
            return {"ok": False, "reason": "node not found on PATH"}
        except subprocess.TimeoutExpired:
            return {"ok": False, "reason": "composer timed out (180s)"}
        out = {}
        for line in (proc.stdout or "").splitlines():
            if "=" in line:
                k, v = line.split("=", 1)
                out[k.strip()] = v.strip()
        if out.get("OK") != "1":
            return {"ok": False, "reason": out.get("REASON") or (proc.stderr or "composer failed")[:200]}
        post_id, url = _canonical(out.get("PERMALINK", ""))
        return {"ok": True, "post_id": post_id, "url": url,
                "confirmed": out.get("CONFIRMED") == "1", "shot": out.get("SCREENSHOT", "")}
    finally:
        try:
            os.unlink(capfile)
        except Exception:
            pass


def _post_one(listing_id, ledger, dry=False, via="graph"):
    if listing_id in ledger["ids"]:
        return f"SKIP {listing_id}: already posted"
    rec = storage.load_record(listing_id)
    if not rec:
        return f"SKIP {listing_id}: no record in store"
    card = registry.build_card(rec)
    hero = _hero(card)
    kind = "photo" if hero else "text"
    # browser mode types the caption only — a publishable photo would be silently dropped
    note = (f"NOTE {listing_id}: browser mode is text-only — the publishable photo is NOT attached "
            f"(use Graph/token mode for a photo post).\n") if (via == "browser" and hero) else ""
    if dry:
        return f"{note}DRY {listing_id}: {via}/{kind} post\n--- caption ---\n{fb_publish.build_caption(card)}"
    res = _post_browser(card) if via == "browser" else fb_publish.post_listing(card, hero)
    if not res.get("ok"):
        return f"FAIL {listing_id}: {res.get('reason')}"
    ledger["ids"].append(listing_id)
    ledger["posts"].append({"id": listing_id, "post_id": res.get("post_id", ""),
                            "url": res.get("url", ""), "at": _now(), "via": via})
    storage._upload_json(LEDGER, ledger)
    if res.get("url"):
        return f"{note}LIVE {listing_id}: {res['url']}"
    # posted, but no clean permalink auto-captured (browser-mode ceiling) — dedup is safe regardless
    return (f"{note}LIVE {listing_id}: posted — permalink not auto-captured; the newest row here is it:\n"
            f"  https://business.facebook.com/latest/posts/published_posts?asset_id={PAGE_ID}")


def _selfcheck():
    assert _canonical("https://www.facebook.com/412573595264820/posts/122212719764456006") == (
        f"{PAGE_ID}_122212719764456006", f"https://www.facebook.com/{PAGE_ID}/posts/122212719764456006")
    assert _canonical("https://www.facebook.com/permalink.php?story_fbid=122212719764456006&id=412573595264820")[0] \
        == f"{PAGE_ID}_122212719764456006"
    assert _canonical("https://www.facebook.com/NextFrameHQ/posts/pfbid02abcXYZ") == (
        "", "https://www.facebook.com/NextFrameHQ/posts/pfbid02abcXYZ")
    assert _canonical("") == ("", "")
    print("fb_post_local selfcheck OK")


def main():
    # captions carry ₱ / 📍 — force UTF-8 so print() can't crash on a cp1252 console
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    argv = sys.argv[1:]
    if "--selfcheck" in argv:
        _selfcheck()
        return
    dry = "--dry-run" in argv
    force = "--force" in argv
    via = "browser" if "--via=browser" in argv else "graph"
    only = next((a.split("=", 1)[1] for a in argv if a.startswith("--id=")), "")

    if not storage.enabled():
        print("ABORT: no HF_TOKEN (.hf-token missing) — cannot read the store.")
        sys.exit(2)
    if not dry and via == "graph" and not fb_publish._token():
        print("NO FB TOKEN: set NEXTFRAME_FB_PAGE_TOKEN, or create nextframe-listings-bot/.fb-token")
        print("(same long-lived Page token the agency publisher uses), or post with --via=browser.")
        sys.exit(2)

    ledger = _load_ledger()

    if only:
        if not (dry or force):
            h = _hours_since_last(ledger)
            if h < SPACING_H:
                print(f"HOLDING (anti-burst): last FB post {h:.1f}h ago < {SPACING_H}h. Use --force to override.")
                sys.exit(0)
        print(_post_one(only, ledger, dry, via))
        return

    # drain: post the oldest unposted published listing (one per run honours <=1/day)
    published = [c.get("id") for c in registry.load_registry(force=True) if isinstance(c, dict)]
    pending = [i for i in reversed(published) if i and i not in ledger["ids"]]  # oldest first
    if not pending:
        print("Nothing to post: every published listing is already on the page.")
        return
    if not dry:
        h = _hours_since_last(ledger)
        if h < SPACING_H:
            print(f"HOLDING (anti-burst): last FB post {h:.1f}h ago < {SPACING_H}h. {len(pending)} waiting.")
            sys.exit(0)
    print(_post_one(pending[0], ledger, dry, via))
    if dry and len(pending) > 1:
        print(f"...(+{len(pending) - 1} more waiting; drain posts one per run to honour <=1/day)")


if __name__ == "__main__":
    main()
