/* Party Life MNL home v2: ask box, live map, covers + news + events rail, areas and numbers. Data is read live; nothing is hard-coded but the five covers. */
(function () {
  'use strict';
  var B = '/partylife/';
  var $ = function (s) { return document.querySelector(s); };
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(new Date());   // YYYY-MM-DD in Manila
  var fmt = function (d, o) { return new Date(d + 'T00:00:00Z').toLocaleDateString('en-PH', Object.assign({ timeZone: 'UTC' }, o)); };
  var getJSON = function (u) { return fetch(u).then(function (r) { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }); };
  var upcoming = function (e) { return e.date && e.date.length >= 10 && (e.end || e.date) >= today; };
  var isTonight = function (e) { return e.date <= today && (e.end || e.date) >= today; };

  /* ---------- nav ---------- */
  var tg = $('.nav-toggle'), links = $('#nav-links');
  tg.addEventListener('click', function () { var o = links.classList.toggle('open'); tg.setAttribute('aria-expanded', String(o)); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); tg.setAttribute('aria-expanded', 'false'); } });

  /* ---------- ask box -> concierge ---------- */
  function ask(q) {
    q = String(q || '').trim(); if (!q) { $('#ask-q').focus(); return; }
    if (window.PLAsk) window.PLAsk(q);
    else { var b = document.getElementById('plc-open'); if (b) b.click(); }
  }
  $('#ask').addEventListener('submit', function (e) { e.preventDefault(); ask($('#ask-q').value); });
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-q]'); if (b) ask(b.dataset.q); });
  var PH = ['rooftop bar in BGC', 'salsa night', 'cheap drinks Poblacion'], pi = 0, inp = $('#ask-q');
  if (!RM) setInterval(function () { if (document.activeElement !== inp && !inp.value) inp.placeholder = PH[pi = (pi + 1) % PH.length]; }, 2600);

  /* ---------- rail: covers + latest news + upcoming events ---------- */
  var COVERS = [
    ['h01', 'Office Escape Wednesdays, Mansion, February 2023'], ['h02', 'Kao went full Menagerie, Newport World Resorts, October 2023'],
    ['h03', 'Glasses up, White Banana, November 2023'], ['h04', 'Pink hair, red stage, H Club, December 2023'], ['h05', 'H Club rings in 2024, New Year 2024']
  ];
  var wm = '<img src="' + B + 'img/logo/partylife-wordmark-ink.svg" alt="" width="794" height="100">';
  function coverCard(c) {
    return '<li><a class="rc cv" href="' + B + 'history/" aria-label="Cover: ' + esc(c[1]) + '"><video muted loop playsinline preload="none" poster="' + B + 'home-v2/media/cover-' + c[0] + '.jpg" src="' + B + 'home-v2/media/cover-' + c[0] + '.mp4"></video></a></li>';
  }
  function eventCard(e) {
    var tn = isTonight(e), chip = tn ? 'Tonight' : fmt(e.date, { weekday: 'short' });
    var price = e.price ? e.price.split(/;|\(/)[0].trim() : '';
    return '<li><a class="rc ev" href="' + B + 'tonight/"><span class="d">' + chip + '</span><span class="day">' + fmt(e.date, { day: 'numeric' }) + '<small>' + fmt(e.date, { month: 'short', year: 'numeric' }) + '</small></span>'
      + '<h3>' + esc(e.name) + '</h3><span class="m">' + esc([e.venue_name, e.area].filter(Boolean).join(' · ')) + '</span>'
      + (price ? '<span class="p">' + esc(price) + '</span>' : '') + '<span class="foot">' + wm + '<span>' + (e.verified ? 'Confirmed' : 'Unconfirmed') + '</span></span></a></li>';
  }
  function newsCard(n) {
    return '<li><a class="rc nw" href="' + esc(n.url) + '" target="_blank" rel="noopener"><span class="d">' + fmt(n.date, { day: 'numeric', month: 'short' }) + '</span><span class="cat">' + esc(n.category + (n.area ? ' · ' + n.area : '')) + '</span>'
      + '<h3>' + esc(n.headline) + '</h3><span class="t">' + esc(n.detail) + '</span><span class="src">' + esc(n.source) + '</span></a></li>';
  }
  Promise.all([getJSON(B + 'data/events.json'), getJSON(B + 'data/news.json')]).then(function (r) {
    var evs = r[0].events.filter(upcoming).sort(function (a, b) { return a.date.localeCompare(b.date); }).slice(0, 8);
    var news = r[1].news.filter(function (n) { return n.date <= today; }).sort(function (a, b) { return b.date.localeCompare(a.date); }).slice(0, 5);
    var html = [], c = COVERS.slice(), e = evs.slice(), n = news.slice();
    while (c.length || e.length || n.length) {   // cover, event, news, event, then repeat: covers lead so they are in view first
      if (c.length) html.push(coverCard(c.shift()));
      if (e.length) html.push(eventCard(e.shift()));
      if (n.length) html.push(newsCard(n.shift()));
      if (e.length) html.push(eventCard(e.shift()));
    }
    if (!evs.length) html.splice(1, 0, '<li><a class="rc nw" href="https://ig.me/m/partylifemnl?text=WHATSON" target="_blank" rel="noopener"><span class="d">Quiet week</span><h3>Nothing on the calendar yet</h3><span class="t">DM "WHATSON" and we will tell you where to go.</span></a></li>');
    $('#rail').innerHTML = html.join('');
    wireCovers();
    stat('ev', evs.length ? r[0].events.filter(upcoming).length : 0);
  }).catch(function () { $('#rail').innerHTML = '<li><span class="rc nw"><h3>The calendar did not load</h3><span class="t">Reload the page.</span></span></li>'; });

  var paused = RM;
  function wireCovers() {
    var vids = [].slice.call(document.querySelectorAll('.rc.cv video'));
    var vis = new Map();
    var play = function (v) { if (!paused) { var p = v.play(); if (p) p.catch(function () {}); } };
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { vis.set(x.target, x.isIntersecting); x.isIntersecting ? play(x.target) : x.target.pause(); }); }, { threshold: .25 });
    vids.forEach(function (v) {
      io.observe(v);
      var a = v.parentNode;
      a.addEventListener('mouseenter', function () { if (!RM) { var p = v.play(); if (p) p.catch(function () {}); } });
      a.addEventListener('mouseleave', function () { if (paused || !vis.get(v)) v.pause(); });
    });
    var pb = $('#rail-pause');
    pb.textContent = paused ? 'Play covers' : 'Pause covers'; pb.setAttribute('aria-pressed', String(paused));
    pb.addEventListener('click', function () {
      paused = !paused; pb.textContent = paused ? 'Play covers' : 'Pause covers'; pb.setAttribute('aria-pressed', String(paused));
      vids.forEach(function (v) { paused ? v.pause() : vis.get(v) && play(v); });
    });
  }
  var rail = $('#rail');
  var step = function (d) { var li = rail.querySelector('li'); rail.scrollBy({ left: d * (li ? li.offsetWidth + 14 : 260) * 2, behavior: RM ? 'auto' : 'smooth' }); };
  $('#rail-prev').addEventListener('click', function () { step(-1); });
  $('#rail-next').addEventListener('click', function () { step(1); });

  /* ---------- numbers + areas (places.json) ---------- */
  var AREAS = { poblacion: ['Poblacion', 'Makati'], 'makati-cbd': ['Makati CBD', 'Salcedo, Legazpi, Greenbelt'], bgc: ['BGC', 'Taguig'],
    kapitolyo: ['Kapitolyo', 'Capitol Commons, Pasig'], ortigas: ['Ortigas', 'Pasig'], mandaluyong: ['Mandaluyong', 'Shaw and Pioneer'],
    'san-juan': ['Greenhills', 'San Juan'], 'quezon-city': ['Quezon City', 'Morato, Katipunan, Maginhawa'], manila: ['Malate and Manila', 'Malate, Ermita, Binondo'],
    'bay-area': ['Pasay Bay Area', 'Mall of Asia'], 'entertainment-city': ['Entertainment City', 'Okada, Solaire, City of Dreams'],
    south: ['Alabang and the south', 'Muntinlupa, Las Piñas, BF'], marikina: ['Marikina', 'Marikina City'] };
  var NUM = {};
  function stat(k, v, label) {
    if (label) NUM[k] = [v, label]; else if (NUM[k]) NUM[k][0] = v; else NUM[k] = [v, 'Events coming up'];
    var order = ['venues', 'map', 'areas', 'ev'];
    $('#nums').innerHTML = order.filter(function (x) { return NUM[x]; }).map(function (x) { return '<div><b>' + NUM[x][0].toLocaleString('en-PH') + '</b><span>' + NUM[x][1] + '</span></div>'; }).join('');
  }
  getJSON(B + 'places/places.json').then(function (ps) {
    var cnt = {}; ps.forEach(function (p) { cnt[p.a] = (cnt[p.a] || 0) + 1; });
    var keys = Object.keys(AREAS).filter(function (k) { return cnt[k]; }).sort(function (a, b) { return cnt[b] - cnt[a]; });
    $('#areas').innerHTML = keys.map(function (k) { return '<li><a href="' + B + 'area/' + k + '/"><b>' + AREAS[k][0] + '</b><small>' + AREAS[k][1] + '</small><i>' + cnt[k].toLocaleString('en-PH') + ' venues</i></a></li>'; }).join('');
    stat('venues', ps.length, 'Venues listed'); stat('areas', keys.length, 'Areas covered');
  }).catch(function () {});

  /* ---------- map ---------- */
  var KIND = { club: ['Club'], bar: ['Bar', 'Cocktail bar', 'Pub and sports bar', 'Wine bar'], rooftop: ['Rooftop'], live: ['Live music'], ktv: ['KTV and karaoke'] };
  var LBL = { bgc: 'BGC', poblacion: 'Poblacion', 'makati-cbd': 'Makati', manila: 'Malate', 'quezon-city': 'QC', 'bay-area': 'Pasay', 'entertainment-city': 'Ent. City',
    ortigas: 'Ortigas', kapitolyo: 'Kapitolyo', mandaluyong: 'Mandaluyong', 'san-juan': 'Greenhills', south: 'Alabang', marikina: 'Marikina' };
  function initMap() {
    if (!window.L || !L.markerClusterGroup) { $('#map-status').textContent = 'The map did not load. Reload the page.'; return; }
    var touch = matchMedia('(pointer: coarse)').matches;
    var map = L.map('map', { zoomControl: true, scrollWheelZoom: false, dragging: !touch, tap: true, minZoom: 10, maxZoom: 18 });
    // CARTO basemaps now answer "API key required" (checked 29 Oct 2026); Esri World Street Map has the clearest street labels without a key
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18, attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a>, HERE, Garmin, &copy; OpenStreetMap contributors'
    }).addTo(map);
    map.setView([14.5555, 121.0335], innerWidth < 861 ? 14 : 15);   // Makati CBD, Poblacion, BGC at street-name zoom
    var st = $('#map-status');
    if (touch) {
      st.textContent = 'Tap the map to move it';
      map.once('click', function () { map.dragging.enable(); st.textContent = ''; });
    }
    map.on('focus click', function () { map.scrollWheelZoom.enable(); });
    map.on('blur mouseout', function () { map.scrollWheelZoom.disable(); });

    var vIcon = L.divIcon({ className: '', html: '<span class="pin pin-v"></span>', iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -8] });
    var cluster = L.markerClusterGroup({ chunkedLoading: true, showCoverageOnHover: false, maxClusterRadius: 60, spiderfyOnMaxZoom: true,
      iconCreateFunction: function (c) { var n = c.getChildCount(), s = n < 20 ? 'S' : n < 100 ? 'm' : 'l', px = n < 20 ? 36 : n < 100 ? 44 : 54;
        return L.divIcon({ className: '', html: '<span class="clu ' + s + '" style="width:' + px + 'px;height:' + px + 'px">' + n + '</span>', iconSize: [px, px] }); } });
    var evLayer = L.layerGroup().addTo(map), lblPane = map.createPane('lbl');
    lblPane.style.zIndex = 640; lblPane.style.pointerEvents = 'none';
    map.createPane('ev').style.zIndex = 660;   // red event pins sit above area labels and clusters
    map.addLayer(cluster);

    Promise.all([getJSON(B + 'home-v2/map.json'), getJSON(B + 'data/events.json').catch(function () { return { events: [] }; })]).then(function (r) {
      var V = r[0].v, E = r[0].e.filter(function (e) { return (e.e || e.d) >= today; });
      var ev = {}; r[1].events.forEach(function (e) { ev[e.id] = e; });
      var markers = V.map(function (p) {
        var m = L.marker([p.y, p.x], { icon: vIcon, title: p.n, keyboard: false });
        m.bindPopup(function () { return '<div class="pop"><b>' + esc(p.n) + '</b><span class="m">' + esc(p.k) + ' · ' + esc((AREAS[p.a] || [p.a])[0]) + (p.r ? ' · ' + p.r + ' ★' : '') + '</span><a class="go" href="' + B + 'places/' + p.s + '/">Open the venue page</a></div>'; });
        m._k = p.k; return m;
      });
      // area labels at each area's median point
      var by = {}; V.forEach(function (p) { (by[p.a] = by[p.a] || []).push(p); });
      var med = function (a) { a = a.slice().sort(function (x, y) { return x - y; }); return a[a.length >> 1]; };
      Object.keys(by).forEach(function (k) { if (!LBL[k] || by[k].length < 10) return;
        L.marker([med(by[k].map(function (p) { return p.y; })), med(by[k].map(function (p) { return p.x; }))], { pane: 'lbl', interactive: false, keyboard: false,
          icon: L.divIcon({ className: 'area-lbl', html: '<span>' + LBL[k] + '</span>', iconSize: [0, 0] }) }).addTo(map); });
      function drawEvents(onlyTonight) {
        evLayer.clearLayers();
        var list = E.filter(function (e) { return !onlyTonight || (e.d <= today && (e.e || e.d) >= today); });
        list.forEach(function (e) {
          var now = e.d <= today, full = ev[e.i] || {};
          var ic = L.divIcon({ className: '', html: '<span class="pin pin-e' + (now ? ' now' : '') + '"></span>', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] });
          L.marker([e.y, e.x], { icon: ic, title: e.n, pane: 'ev' }).bindPopup('<div class="pop"><span class="d">' + (now ? 'Tonight' : fmt(e.d, { weekday: 'short', day: 'numeric', month: 'short' })) + '</span><b>' + esc(e.n) + '</b><span class="m">' + esc(e.v) + (e.p ? ' · ' + esc(e.p.split(/;|\(/)[0].trim()) : '') + '</span>'
            + (full.notes ? '<span class="m">' + esc(full.notes.length > 90 ? full.notes.slice(0, 87).replace(/\s+\S*$/, '') + '...' : full.notes) + '</span>' : '')
            + '<a class="go" href="' + (e.s ? B + 'places/' + e.s + '/' : B + 'tonight/') + '">' + (e.s ? 'Open the venue page' : 'See it on Tonight') + '</a></div>').addTo(evLayer);
        });
        if (onlyTonight && list.length) map.fitBounds(list.map(function (e) { return [e.y, e.x]; }), { maxZoom: 15, padding: [60, 60] });
        return list.length;
      }
      function apply(f) {
        cluster.clearLayers();
        if (f === 'tonight') {
          var n = drawEvents(true);
          if (!n) { drawEvents(false); st.textContent = 'Nothing pinned for tonight. Red pins show the next events.'; }
          else st.textContent = n + (n === 1 ? ' event' : ' events') + ' tonight';
          return;
        }
        drawEvents(false);
        var ms = f === 'all' ? markers : markers.filter(function (m) { return KIND[f].indexOf(m._k) >= 0; });
        cluster.addLayers(ms);
        if (!touch || map.dragging.enabled()) st.textContent = '';
      }
      apply('all');
      stat('map', V.length, 'Venues on the map');
      $('#map-chips').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#map-chips button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply(b.dataset.f);
      });
    }).catch(function () { st.textContent = 'The venue map did not load. Reload the page.'; });

    var wrap = $('#mapwrap'), fb = $('#map-full');
    function full(on) {
      wrap.classList.toggle('is-full', on); document.body.classList.toggle('map-open', on);
      fb.textContent = on ? 'Close full map' : 'Open full map'; fb.setAttribute('aria-pressed', String(on));
      if (on) { map.dragging.enable(); map.scrollWheelZoom.enable(); }
      setTimeout(function () { map.invalidateSize(); }, 50);
    }
    fb.addEventListener('click', function () { full(!wrap.classList.contains('is-full')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('is-full')) full(false); });
  }

  /* ---------- scroll reveal ---------- */
  if (!RM && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-rv');
    var ro = new IntersectionObserver(function (es) { es.forEach(function (x) { if (!x.isIntersecting) return; var el = x.target, sib = [].indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(sib, 6) * 70 + 'ms'; el.classList.add('in'); ro.unobserve(el); }); }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { ro.observe(el); });
  }

  initMap();
})();
