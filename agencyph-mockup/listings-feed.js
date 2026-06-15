/* =========================================================================
   THE AGENCY PH — LIVE REGISTRY FEED
   Pulls listings published from the NextFrame Listings Engine and injects
   them into the horizontal Registry as native "blueprint spread" cards.
   Fails silently (keeps the curated showcase cards) if the engine is asleep.
   ========================================================================= */

const LISTINGS_API = "https://nextframe-ai-listings-bot.hf.space";

function escHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function buildSpecGrid(card) {
  const rows = [
    ["LOCATION", card.location],
    ["VOLUME MAP", card.volume_map],
    ["DESIGN CLASS", card.design_class],
    ["STATUS CODE", card.status],
  ];
  return rows.map(([label, value]) => `
    <div class="spec-grid-item">
      <span class="label">${escHtml(label)}</span>
      <span class="value">${escHtml(value || "—")}</span>
    </div>`).join("");
}

function buildVisualPane(card) {
  const first = (card.photo_paths || [])[0];
  if (first) {
    const src = LISTINGS_API + first;
    return `
      <div class="blueprint-image-wrapper">
        <img src="${escHtml(src)}" alt="${escHtml(card.title)}" loading="lazy"
             style="width:100%;height:100%;object-fit:cover;display:block"
             onerror="this.style.display='none'">
        <div class="card-filter"></div>
        <span class="aperture-plate-id font-mono">SCAN_${escHtml(card.plate)} // LIVE</span>
      </div>`;
  }
  // No photo yet — tasteful dark plate placeholder in the brand language.
  return `
    <div class="blueprint-image-wrapper"
         style="display:flex;align-items:center;justify-content:center;
                background:linear-gradient(135deg,#141414,#1d1d1d)">
      <span class="font-serif" style="font-size:3rem;color:#3a3a3a;letter-spacing:.1em">
        ${escHtml(card.plate)}</span>
      <div class="card-filter"></div>
      <span class="aperture-plate-id font-mono">SCAN_${escHtml(card.plate)} // LIVE</span>
    </div>`;
}

function buildSpread(card, plateNo) {
  const el = document.createElement("div");
  el.className = "blueprint-spread";
  el.dataset.listingId = card.id || "";
  const where = card.coord_label || card.location || "";
  el.innerHTML = `
    <div class="blueprint-header-metrics font-mono">
      <span>PLATE ${escHtml(card.plate)}-${escHtml(plateNo)}${where ? " // " + escHtml(where) : ""}</span>
      <span class="crimson-text">LIVE REGISTER</span>
    </div>
    <div class="blueprint-inner-grid">
      <div class="blueprint-visual-pane">${buildVisualPane(card)}</div>
      <div class="blueprint-details-pane">
        <div class="spread-header font-mono">
          <span class="reg-id">REG_NO: ${escHtml(card.reg_no || "NF")}</span>
          <span class="reg-conf">NEWLY LISTED</span>
        </div>
        <h3 class="spread-title font-serif">${escHtml(card.title)}</h3>
        <div class="blueprint-spec-grid font-mono">${buildSpecGrid(card)}</div>
        <p class="spread-desc font-sans">${escHtml(card.description || "")}</p>
        <div class="spread-action-row">
          <a href="#privee" class="spread-action font-mono">REQUEST BRIEFING LEDGER &rarr;</a>
        </div>
      </div>
    </div>`;
  return el;
}

async function loadLiveRegistry() {
  const lookbook = document.getElementById("lookbook-scroll");
  if (!lookbook) return;
  let data;
  try {
    const r = await fetch(LISTINGS_API + "/api/registry", { cache: "no-store" });
    if (!r.ok) return;
    data = await r.json();
  } catch (_) {
    return; // engine asleep / offline — keep the curated showcase cards
  }
  const listings = Array.isArray(data && data.listings) ? data.listings : [];
  if (!listings.length) return;

  // Build newest-first and insert ahead of the curated showcase spreads so
  // the agency's real active inventory leads the Registry.
  const prevWidth = lookbook.scrollWidth;
  const before = lookbook.scrollLeft;
  const frag = document.createDocumentFragment();
  listings.forEach((card, i) => {
    const plateNo = String(i + 1).padStart(2, "0") + ".L";
    frag.appendChild(buildSpread(card, plateNo));
  });
  lookbook.insertBefore(frag, lookbook.firstChild);

  // Prepending shifts the visible content right; if the user had already
  // scrolled, anchor their view and recompute the progress bar from the real
  // position (don't snap it to 0%).
  const delta = lookbook.scrollWidth - prevWidth;
  if (before > 0) lookbook.scrollLeft = before + delta;
  const progress = document.querySelector(".scroll-progress");
  const maxScroll = lookbook.scrollWidth - lookbook.clientWidth;
  if (progress) {
    progress.style.width = (maxScroll > 0
      ? Math.min(100, Math.max(0, (lookbook.scrollLeft / maxScroll) * 100))
      : 0) + "%";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadLiveRegistry);
} else {
  loadLiveRegistry();
}
