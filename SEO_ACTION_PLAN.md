# next-frame.agency — SEO Action Plan (target: 90+)

Baseline audit (claude-seo, 2026-06-30): **~53/100**. This file is the living
checklist for the improvement → check → redeploy loop.

## Scoring snapshot (measured across 6 deployed iterations)
| Category | Baseline | Now | Target | Ceiling note |
|---|---|---|---|---|
| Technical SEO | 61 | 77 | 90 | security headers need Cloudflare |
| Performance (lab) | 78 | 78 | 90 | homepage SPA bundle (app source) |
| Schema | 41 | 80 | 95 | telephone + openingHours (owner) |
| On-Page | 50 | ~76 | 90 | — |
| Content Quality | 41 | 74 | 85 | vs-traditional still <1500w |
| E-E-A-T | 32 | 60 | 85 | phone, client results, off-site |
| AI Search (GEO) | 31 | 62 | 85 | YouTube, backlinks, off-site mentions |
| Images | 45 | 45 | 85 | homepage SPA images (app source) |
| **Overall** | **~53** | **~74** | **90+** | **90 needs off-site + real data** |

**On-page ceiling reached (~74-76).** The remaining gap to 90 is NOT code:
off-site authority (Google Business Profile + reviews, backlinks/press,
a YouTube channel), real client results with numbers, a phone number,
and a domain email. None can be produced by editing this repo.

---

## Phase 1 — Zero-data wins (I can do, no input needed)
- [x] Deploy `/pricing/` (was built but never committed → live 404)  *(commit f0d1c82)*
- [x] Homepage title 92→58 chars, meta description 219→154  *(f0d1c82)*
- [x] Add `priceRange` to homepage LocalBusiness schema  *(f0d1c82)*
- [x] Add `Article` schema to both article pages  *(0f2735b)*
- [x] Add `og:image`/`twitter:image` to 5 pages (blank social shares)  *(0f2735b)*
- [x] Enrich real-estate `Service` node + `@id` reference to org  *(0f2735b)*
- [x] canonical + robots + `lang=en-PH` on free-resources & intake  *(0f2735b)*
- [x] Create `/llms.txt` (GEO discoverability)
- [x] Expand thin service pages with truthful process/FAQ content (toward 800 words)
- [ ] Add `datePublished`/`dateModified` to remaining page schemas
- [ ] Internal-linking pass (cross-link all service pages + footers)
- [x] Self-referencing `hreflang="en-PH"` on all content pages

## Phase 2 — Needs YOUR data (blocks 90)
- [x] **Phone number** — +639620789661 in Organization/LocalBusiness schema + contactPoint; visible tel: links on homepage/About/Terms/Privacy (2026-07-02)
- [x] **Founder + About** — Leon Harris bio on `/about/`, Person JSON-LD (#leon-harris), Article `author` now = Person, homepage org `founder` ref. (Optional: add a photo.)
- [~] **Client roster** — real "Selected work" list (Jade Supper Club, Maison Rouge, Radisson Red, Tokyo Rocks, Luxe Loop, West Gallery Place, Cork Elite, Damansara Heights) on /about + 2 service pages. STILL want ≥1 result with numbers + a logo strip/testimonial.
- [ ] **Business email / contact** → footer + Privacy contact
- [x] **Privacy Policy + Terms** pages — created; contact routed via /intake/ form. Add a real business email when available.
- [ ] Google Business Profile (Makati) linked via `sameAs` + LocalBusiness
- [ ] Decision: `noindex` the app shells `/listings/` + `/logo-design/`?

## Phase 3 — Infra / app-source (outside this repo)
- [ ] Security headers (CSP, X-Content-Type-Options, etc.) via free Cloudflare proxy
- [ ] Homepage `og:image` → a real content image, not the logo (rename file, drop the `%20` spaces)
- [ ] Fix "Manuel Legend Selector" chip label (lives in the compiled JS app source)
- [ ] Homepage image fixes: width/height on all imgs, `loading="lazy"`, swap YouTube `maxresdefault`→`mqdefault` (~650 KB), lite-youtube facade

## Loop protocol
1. Apply a batch of fixes (Phase 1 → 2 → 3).
2. Verify locally (JSON-LD valid, UTF-8 clean, tags present).
3. Commit. **Deploy = `git push origin main`** (needs your push or granted permission).
4. Re-run `/seo audit https://next-frame.agency`; record new scores here.
5. Repeat until Overall ≥ 90.

**Realistic ceiling without Phase 2 data: ~mid-to-high 70s.** Phase 2 is what
clears 90 — most of it is trust/E-E-A-T signals only the business owner can supply.
