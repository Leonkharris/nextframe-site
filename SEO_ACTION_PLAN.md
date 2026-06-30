# next-frame.agency — SEO Action Plan (target: 90+)

Baseline audit (claude-seo, 2026-06-30): **~53/100**. This file is the living
checklist for the improvement → check → redeploy loop.

## Scoring snapshot
| Category | Baseline | Target |
|---|---|---|
| Technical SEO | 61 | 90 |
| Performance (lab) | 78 | 90 |
| Schema | 65 | 95 |
| On-Page | 50 | 90 |
| Content / E-E-A-T | 41 / 32 | 85 / 85 |
| AI Search (GEO) | 31 | 85 |
| Images | 45 | 85 |
| **Overall** | **~53** | **90+** |

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
- [ ] Self-referencing `hreflang="en-PH"` on all pages

## Phase 2 — Needs YOUR data (blocks 90)
- [ ] **Phone number** → add `telephone` to schema + visible footer on every page
- [ ] **Named founder + short bio** → `/about/` page + Article `author` = Person
- [ ] **≥1 real client result** (e.g. "X listings → Y inquiries in Z weeks") per service page — the single biggest E-E-A-T lever
- [ ] **Business email / contact** → footer + Privacy contact
- [ ] **Privacy Policy + Terms** pages (need contact email; PH Data Privacy Act)
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
