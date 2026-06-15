/* NextFrame Listings — service worker
   Offline shell + faster loads. NEVER caches the API (cross-origin to the HF
   Space) or api-url.json, so the bot stays live; only the static shell is cached. */
const CACHE = "nf-listings-v1";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-180.png",
  "https://cdn.jsdelivr.net/npm/marked@12/marked.min.js",
  "https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putInCache(req, res) {
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy));
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Cross-origin: only cache the CDN libs (cache-first); leave the API alone.
  if (url.origin !== self.location.origin) {
    if (url.hostname === "cdn.jsdelivr.net") {
      e.respondWith(caches.match(req).then((c) => c || fetch(req).then((r) => putInCache(req, r))));
    }
    return; // API and everything else: straight to network, never cached
  }

  // api-url.json must always be fresh (the backend URL can change).
  if (url.pathname.endsWith("api-url.json")) return;

  // Navigations: network-first (so updates show), fall back to cached shell offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((r) => putInCache(req, r))
        .catch(() => caches.match(req).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  // Other same-origin GETs (icons, etc.): stale-while-revalidate.
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((r) => putInCache(req, r)).catch(() => cached);
      return cached || net;
    })
  );
});
