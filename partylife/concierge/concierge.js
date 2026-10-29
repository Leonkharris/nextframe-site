/* Ask Party Life: client-side concierge for the Party Life MNL static site.
   No backend, no keys, no tracking. The parser and ranker are pure functions (exported for concierge/selftest.mjs);
   the widget lazy-loads concierge/index.json and data/events.json when the panel first opens. */
(function (root) {
  'use strict';
  if (root.PartyLifeConcierge) return;

  /* ---------- text helpers ---------- */
  function norm(s) {
    return ' ' + String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ') + ' ';
  }

  /* ---------- areas: real keys from area/*, synonyms people actually type ---------- */
  var AREA_LABEL = { poblacion: 'Poblacion', 'makati-cbd': 'Makati CBD', bgc: 'BGC', kapitolyo: 'Kapitolyo', ortigas: 'Ortigas', mandaluyong: 'Mandaluyong',
    'san-juan': 'Greenhills', 'quezon-city': 'Quezon City', manila: 'Malate/Manila', 'bay-area': 'Mall of Asia', 'entertainment-city': 'Entertainment City',
    south: 'Alabang/South', marikina: 'Marikina' };
  var AREA_WORDS = [
    [['bgc'], 'bgc|bonifacio global city|bonifacio|taguig|fort bonifacio|the fort|high street|uptown|mckinley|burgos circle|forbes town|forbestown'],
    [['poblacion'], 'poblacion|p burgos|burgos street|jupiter street'],
    [['poblacion', 'makati-cbd'], 'makati|makati city'],
    [['makati-cbd'], 'makati cbd|greenbelt|salcedo|legazpi|rockwell|chino roces|ayala'],
    [['ortigas'], 'ortigas|ortigas center'],
    [['kapitolyo'], 'kapitolyo|capitol commons'],
    [['kapitolyo', 'ortigas'], 'pasig'],
    [['mandaluyong'], 'mandaluyong|shaw|shaw boulevard|pioneer'],
    [['san-juan'], 'greenhills|san juan'],
    [['quezon-city'], 'qc|quezon city|quezon|maginhawa|tomas morato|morato|timog|katipunan|cubao|eastwood|diliman|up village|teachers village'],
    [['manila'], 'malate|ermita|binondo|intramuros|remedios|manila city'],
    [['bay-area'], 'pasay|moa|mall of asia|bay area|newport'],
    [['entertainment-city'], 'entertainment city|okada|solaire|city of dreams|paranaque'],
    [['south'], 'alabang|muntinlupa|bf homes|las pinas|molito|the south|south metro'],
    [['marikina'], 'marikina']
  ];
  var AREA_PHRASES = [];
  AREA_WORDS.forEach(function (row) { row[1].split('|').forEach(function (ph) { AREA_PHRASES.push([' ' + ph + ' ', row[0]]); }); });
  AREA_PHRASES.sort(function (a, b) { return b[0].length - a[0].length; });   // longest first: "makati cbd" wins over "makati"

  /* returns {areas, rest}: area keys found in a normalised string, and the string with those phrases removed */
  function takeAreas(s) {
    var found = [];
    AREA_PHRASES.forEach(function (ap) {
      if (s.indexOf(ap[0]) >= 0) {
        s = s.split(ap[0]).join(' ');
        ap[1].forEach(function (k) { if (found.indexOf(k) < 0) found.push(k); });
      }
    });
    return { areas: found, rest: s };
  }

  /* ---------- categories and vibes ---------- */
  // q: what the visitor types; kinds: the "k" field in the index; text: matched against name + category + what's-on notes
  var CATS = [
    { id: 'rooftop', q: /\b(rooftop|roof top|roof deck|roofdeck|sky bar|skybar)\b/, kinds: ['Rooftop'], text: /rooftop|roof ?deck|sky ?(bar|lounge)/ },
    { id: 'club', q: /\b(clubs?|nightclubs?|dancing|dance|dj|techno|edm|rave|raves)\b/, kinds: ['Club'], text: /\bclub\b|nightclub|\bdjs?\b|techno/, ev: /club|party|rave|dj|techno/ },
    { id: 'karaoke', q: /\b(karaoke|ktv|videoke|sing|singing)\b/, kinds: ['KTV and karaoke'], text: /karaoke|ktv|videoke/ },
    { id: 'live', q: /\b(live music|live band|live bands|bands?|gigs?|live)\b/, kinds: ['Live music'], text: /live (music|band|gig|entertainment)|gigs?\b|\bbands?\b/, ev: /concert|live|band|gig/ },
    { id: 'jazz', q: /\bjazz\b/, kinds: [], text: /jazz/ },
    { id: 'salsa', q: /\b(salsa|bachata|latin|kizomba|tango)\b/, kinds: [], text: /salsa|bachata|latin|kizomba/ },
    { id: 'trivia', q: /\b(trivia|quiz)\b/, kinds: [], text: /trivia|quiz/ },
    { id: 'openmic', q: /\bopen mic(?:e|rophone)?\b/, kinds: [], text: /open mic/ },
    { id: 'singles', q: /\b(speed dating|singles|mixers?|meet people|make friends)\b/, kinds: [], text: /speed dat|singles|mixer/ },
    { id: 'lgbtq', q: /\b(lgbtq?|gay|queer|drag|pride|bakla)\b/, kinds: [], text: /lgbt|gay|queer|drag|pride|bakla/ },
    { id: 'sports', q: /\b(sports bar|sports|nba|ufc|football|basketball)\b/, kinds: ['Pub and sports bar'], text: /sports/ },
    { id: 'cocktail', q: /\b(cocktails?|mixology|speakeasy|martinis?|negroni)\b/, kinds: ['Cocktail bar'], text: /cocktail|speakeasy|mixolog/ },
    { id: 'beer', q: /\b(beers?|craft beer|brewery|brewpub|pubs?|taproom)\b/, kinds: ['Pub and sports bar'], text: /beer|brew|taproom|\bpub\b/ },
    { id: 'wine', q: /\bwine\b/, kinds: ['Wine bar'], text: /wine/ },
    { id: 'comedy', q: /\b(comedy|stand up|standup)\b/, kinds: ['Comedy'], text: /comedy|stand-?up/ }
  ];
  var FLAGS = {
    nocover: /\b(no cover|no cover charge|free entry|free entrance|free admission|no entrance fee|no door charge)\b/,
    cheap: /\b(cheap|cheapest|budget|affordable|inexpensive|happy hour|promo|promos)\b/,
    fancy: /\b(fancy|upscale|luxury|luxurious|classy|high end|premium|expensive|special occasion)\b/,
    quiet: /\b(quiet|chill|chilled|relaxed|lowkey|low key|romantic|date|intimate|calm|conversation)\b/
  };
  var STOP = /^(a|an|the|in|on|at|for|to|of|and|or|with|near|around|nearby|me|my|i|we|is|are|any|some|good|best|place|places|bar|bars|spot|spots|where|find|show|want|looking|go|night|nights|drinks?|there|that|has|have|open|can|get|what|whats|nice|great|somewhere|manila)$/;

  /* ---------- query parser (no DOM) ---------- */
  function parseQuery(text) {
    var a = takeAreas(norm(text)), s = a.rest;
    var out = { areas: a.areas, cats: [], flags: { cheap: false, fancy: false, quiet: false, nocover: false },
      time: { tonight: false, openNow: false, late: false, after: null }, terms: [] };
    function take(rx) { var m = rx.exec(s); if (m) s = s.replace(rx, ' '); return m; }

    var am = /\b(after|past|till|until|til)\s+(\d{1,2})(?:\s?(a|p)\s?m)?\b/.exec(s);   // "after 2am" -> closes after 2am; bare 2-9 read as am
    if (am && am[3] !== 'p') {
      var n = +am[2];
      if (n === 12) { out.time.after = 1440; s = s.replace(am[0], ' '); }
      else if (n >= 1 && (n <= 9 || am[3] === 'a')) { out.time.after = 1440 + n * 60; s = s.replace(am[0], ' '); }
    }
    if (take(/\b(open now|right now|currently open|now)\b/)) out.time.openNow = true;
    if (take(/\b(tonight|tonite|this evening|today)\b/)) out.time.tonight = true;
    if (take(/\b(late|late night|open late|after hours|afterhours|all night|after midnight|midnight)\b/)) out.time.late = true;

    CATS.forEach(function (c) { if (take(c.q)) out.cats.push(c.id); });
    Object.keys(FLAGS).forEach(function (f) { if (take(FLAGS[f])) out.flags[f] = true; });
    s.trim().split(' ').forEach(function (w) { if (w.length >= 3 && !STOP.test(w) && !/^\d+$/.test(w)) out.terms.push(w); });
    return out;
  }

  /* ---------- hours: weekly rules ("Tu-Sa 19:00-3:00", "Mon-Sat 6pm-2am") and Google snapshots ("Closed · Opens 7 pm") ---------- */
  var D = '(?:mon|tue|wed|thu|fri|sat|sun|mo|tu|we|th|fr|sa|su)[a-z]*';
  var DR = D + '(?:\\s*[-\u2013]\\s*' + D + ')?';
  var DSPEC = '(?:' + DR + '\\s*,\\s*)*' + DR;
  var RULE_SPLIT = new RegExp(';|(?<=[\\dm+])\\s*,\\s*(?=' + DSPEC + '\\s+\\d)', 'i');
  var DAY_PREFIX = new RegExp('^((?:' + DR + '\\s*,?\\s*)+)', 'i');
  var T = '(\\d{1,2})(?::(\\d{2}))?\\s*([ap]m)?';
  var DAYNUM = { su: 0, mo: 1, tu: 2, we: 3, th: 4, fr: 5, sa: 6 };

  function tmin(h, m, ap) {
    h = +h; m = +(m || 0);
    if (ap) { ap = ap.toLowerCase(); if (ap === 'pm' && h < 12) h += 12; if (ap === 'am' && h === 12) h = 0; }
    return h * 60 + m;
  }
  function daySet(spec) {
    var set = {};
    spec.split(',').forEach(function (tok) {
      var p = tok.trim().toLowerCase().split(/\s*[-\u2013]\s*/);
      var from = DAYNUM[p[0].slice(0, 2)];
      if (from == null) return;
      var to = p[1] ? DAYNUM[p[1].slice(0, 2)] : from;
      for (var d = from, i = 0; i < 7; i++, d = (d + 1) % 7) { set[d] = 1; if (d === to) break; }
    });
    return Object.keys(set).map(Number);
  }
  /* -> {always, segs:[{d,o,c}], openHint, closeHint}; minutes since 00:00, c > 1440 runs past midnight, null = not stated */
  function parseHours(str) {
    var r = { always: false, segs: [], openHint: null, closeHint: null };
    if (!str) return r;
    var s = String(str).replace(/\s*[\u00b7]?\s*\+63[\d\s]+/g, '').trim();
    if (/24\/7|open 24 hours/i.test(s)) { r.always = true; return r; }
    if (/^(open|closed|closes|opens|reopens)\b/i.test(s)) {   // a snapshot taken on one day: gives a typical time, not a schedule
      var m = new RegExp('opens?(?: soon)?\\W*(\\d{1,2})(?::(\\d{2}))?\\s*([ap]m)', 'i').exec(s);
      if (m) r.openHint = tmin(m[1], m[2], m[3]);
      m = new RegExp('closes(?: soon)?\\W*(\\d{1,2})(?::(\\d{2}))?\\s*([ap]m)', 'i').exec(s);
      if (m) { var c = tmin(m[1], m[2], m[3]); r.closeHint = c < 720 ? c + 1440 : c; }
      return r;
    }
    s.replace(/^PH\s*,\s*/i, '').split(RULE_SPLIT).forEach(function (rule) {
      rule = rule.trim().replace(/^PH\s*,\s*/i, '');
      var dm = DAY_PREFIX.exec(rule), days = dm ? daySet(dm[1]) : [0, 1, 2, 3, 4, 5, 6], rest = dm ? rule.slice(dm[0].length) : rule;
      if (/\b(off|closed)\b/i.test(rest) && !/\d/.test(rest)) return;
      var seen = false, m, rx = new RegExp(T + '\\s*[-\u2013]\\s*' + T, 'g');
      while ((m = rx.exec(rest))) {
        seen = true;
        var o = tmin(m[1], m[2], m[3]), c = tmin(m[4], m[5], m[6]);
        if (c <= o) c += 1440;
        days.forEach(function (d) { r.segs.push({ d: d, o: o, c: c }); });
      }
      if (seen) return;
      if ((m = new RegExp('(?:from\\s+)?' + T + '\\s*\\+|from\\s+' + T, 'i').exec(rest))) {
        var oo = m[1] != null ? tmin(m[1], m[2], m[3]) : tmin(m[4], m[5], m[6]);
        days.forEach(function (d) { r.segs.push({ d: d, o: oo, c: null }); });
      } else if ((m = new RegExp('\\bto\\s+' + T, 'i').exec(rest))) {
        var cc = tmin(m[1], m[2], m[3]); if (cc < 720) cc += 1440;
        days.forEach(function (d) { r.segs.push({ d: d, o: null, c: cc }); });
      }
    });
    r.segs.forEach(function (sg) {   // a day that runs to 24:00 and the next day's 00:00-03:00 are one late night
      if (sg.c !== 1440) return;
      r.segs.forEach(function (nx) { if (nx.d === (sg.d + 1) % 7 && nx.o === 0 && nx.c > 0 && nx.c < 1440) sg.c = 1440 + nx.c; });
    });
    return r;
  }
  /* 'open' | 'closed' | 'unknown' for a parsed schedule at weekday dow (0 = Sunday), minute-of-day min */
  function openState(h, dow, min) {
    if (h.always) return 'open';
    if (!h.segs.length) return 'unknown';
    var prev = (dow + 6) % 7, open = false, unk = false;
    h.segs.forEach(function (s) {
      if (s.d === dow) {
        if (s.o == null) unk = true;
        else if (s.c == null) { if (min >= s.o) unk = true; }
        else if (min >= s.o && min < s.c) open = true;
      }
      if (s.d === prev) {
        if (s.c != null && min + 1440 < s.c) open = true;
        else if (s.c == null && min < 360) unk = true;
      }
    });
    return open ? 'open' : unk ? 'unknown' : 'closed';
  }
  /* latest closing time (minutes, > 1440 = after midnight) for the day, else the week, else a snapshot hint; Infinity = 24h */
  function lateClose(h, dow) {
    if (h.always) return Infinity;
    var best = null, any = null;
    h.segs.forEach(function (s) {
      if (s.c == null) return;
      if (s.d === dow && (best == null || s.c > best)) best = s.c;
      if (any == null || s.c > any) any = s.c;
    });
    return best != null ? best : any != null ? any : h.closeHint;
  }
  function clock(min) {
    var m = min % 1440, h = Math.floor(m / 60), mi = m % 60;
    if (m === 0) return 'midnight';
    return ((h % 12) || 12) + (mi ? ':' + ('0' + mi).slice(-2) : '') + (h < 12 ? 'am' : 'pm');
  }

  /* ---------- Manila clock ---------- */
  function manilaNow(d) {
    var f = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit' });
    var p = {}; f.formatToParts(d || new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute, date: p.year + '-' + p.month + '-' + p.day };
  }
  function addDays(date, n) { var t = new Date(date + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }

  /* ---------- ranking ---------- */
  function catById(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
  function placeText(p) { return (p._t = p._t || ((p.n || '') + ' ' + (p.c || '') + ' ' + (p.e || '')).toLowerCase()); }
  function cheapPrice(x) {   // one peso sign, or a stated figure of 300 or less
    if (priceTier(x) === 1) return true;
    var m = String(x || '').replace(/(\d),(\d)/g, '$1$2').match(/(?:₱|\bp)\s?(\d{2,4})\b/gi) || [];
    return m.some(function (t) { return +t.replace(/\D/g, '') <= 300; });
  }
  function priceTier(x) { var m = /^\s*(\u20b1+)\s*$/.exec(x || ''); return m ? m[1].length : 0; }

  function scorePlace(p, q, now) {
    p._h = p._h || parseHours(p.h);
    var sc = 0, why = {}, hit = 0, text = placeText(p);
    q.cats.forEach(function (id) {
      var c = catById(id);
      if (c.kinds.indexOf(p.k) >= 0 || c.text.test(text)) {
        hit++; sc += c.kinds.indexOf(p.k) >= 0 ? 45 : 30;   // the venue's own kind beats a mention in its notes
        if (c.text.test(text) && p.e && c.text.test(p.e.toLowerCase())) { sc += 15; why.note = p.e; }
      }
    });
    var state = openState(p._h, now.dow, now.min), lc = lateClose(p._h, now.dow), est = false;
    if (lc == null && (p.k === 'Club' || p.k === 'KTV and karaoke')) { lc = 27 * 60; est = true; }   // guide: clubs run to 3-5am
    var need = q.time.after != null ? q.time.after : q.time.late ? 26 * 60 : null;
    if (need != null && lc != null) sc += lc >= need ? (est ? 12 : 30) : -35;
    if (lc != null && !est && lc > 1440 || lc === Infinity) why.till = lc;
    if (q.time.openNow) sc += state === 'open' ? 40 : state === 'closed' ? -100 : 0;
    else if (q.time.tonight && state === 'closed' && p._h.segs.length && !p._h.segs.some(function (s) { return s.d === now.dow; })) sc -= 40;
    if (state === 'open') why.open = true;
    if (!p._h.segs.length && p._h.openHint != null) why.opens = p._h.openHint;
    var tier = priceTier(p.x), pt = (p.x || '').toLowerCase();
    if (q.flags.cheap) {
      if (cheapPrice(p.x)) sc += 15;
      if (tier >= 3) sc -= 20;
      sc += p.k === 'Pub and sports bar' ? 8 : p.k === 'KTV and karaoke' ? 6 : p.k === 'Bar' ? 4 : 0;
      if (p.a === 'quezon-city' || p.a === 'marikina') sc += 4;
    }
    if (q.flags.fancy) {
      if (tier >= 3) sc += 15;
      sc += /Rooftop|Cocktail bar|Wine bar/.test(p.k) ? 8 : 0;
      if (p.r >= 4.5) sc += 5;
    }
    if (q.flags.quiet) {
      sc += { 'Wine bar': 15, 'Cocktail bar': 12, Rooftop: 5, Club: -25, 'KTV and karaoke': -20, 'Event venue': -10, 'Pub and sports bar': -8 }[p.k] || 0;
      if (/lounge/.test(text)) sc += 8;
    }
    if (q.flags.nocover) {
      sc += { Bar: 10, 'Cocktail bar': 10, 'Pub and sports bar': 10, 'Wine bar': 10, Club: q.cats.indexOf('club') >= 0 ? 0 : -30, 'Event venue': -10 }[p.k] || 0;
      if (/cover/.test(pt)) sc -= 20;
      else why.nocover = true;
    }
    q.terms.forEach(function (t) { if ((p.n || '').toLowerCase().indexOf(t) >= 0) sc += 25; else if (text.indexOf(t) >= 0) sc += 8; });
    if (p.r) sc += (p.r - 3) * 8;
    if (p.v) sc += Math.min(Math.log10(p.v + 1), 4) * 3;
    return { p: p, score: sc, hit: hit, state: state, why: why };
  }

  function reasonLine(it, q) {
    var p = it.p, w = it.why, parts = [p.k, AREA_LABEL[p.a] || p.a];
    if (w.till === Infinity) parts.push('open 24 hours');
    else if (w.till != null) parts.push('open till ' + clock(w.till));
    else if (w.opens != null) parts.push('opens around ' + clock(w.opens));
    if (it.state === 'open' && q.time.openNow) parts.push('open now');
    if (w.nocover) parts.push(p.k === 'Club' ? 'cover not listed, ask at the door' : 'bars rarely charge cover');
    if (w.note) parts.push(w.note.length > 70 ? w.note.slice(0, 67).replace(/\s+\S*$/, '') + '...' : w.note);
    else if (q.flags.cheap && cheapPrice(p.x)) parts.push(p.x);
    return parts.join(', ');
  }

  /* -> {items (top 6), relaxed: null | 'category' | 'time'} ; every item has a reason line */
  function rank(q, places, now, max) {
    max = max || 6;
    var base = places.filter(function (p) { return !q.areas.length || q.areas.indexOf(p.a) >= 0; });
    var scored = base.map(function (p) { return scorePlace(p, q, now); });
    function pick(needHit, needOpen) {
      return scored.filter(function (it) { return (!needHit || it.hit > 0) && (!needOpen || it.state !== 'closed'); });
    }
    var list = pick(q.cats.length > 0, q.time.openNow), relaxed = null;
    if (!list.length && q.cats.length) { list = pick(false, q.time.openNow); relaxed = 'category'; }
    if (!list.length && q.time.openNow) { list = pick(false, false); relaxed = 'time'; }
    list.sort(function (a, b) { return b.score - a.score || (b.p.v || 0) - (a.p.v || 0); });
    return { items: list.slice(0, max).map(function (it) { it.reason = reasonLine(it, q); return it; }), relaxed: relaxed };
  }

  /* Tonight events (data/events.json) that match, next 7 days, soonest first */
  function pickEvents(q, events, now, max) {
    if (!q.areas.length && !q.cats.length && !q.time.tonight) return [];
    var to = addDays(now.date, 7), out = [];
    (events || []).forEach(function (e) {
      if (!e.date || e.date.length < 10) return;
      var end = e.end || e.date;
      if (end < now.date || e.date > to) return;
      if (q.flags.nocover && e.price) return;
      var etext = (e.name + ' ' + (e.type || '') + ' ' + (e.music || '') + ' ' + (e.notes || '') + ' ' + (e.venue_name || '')).toLowerCase();
      if (q.areas.length) {
        var ea = takeAreas(norm((e.area || '') + ' ' + (e.venue_name || ''))).areas;
        if (!ea.some(function (k) { return q.areas.indexOf(k) >= 0; })) return;
      }
      if (q.cats.length && !q.cats.some(function (id) { var c = catById(id); return (c.ev || c.text).test(etext); })) return;
      out.push({ e: e, today: e.date <= now.date && end >= now.date });
    });
    out.sort(function (a, b) { return (b.today - a.today) || a.e.date.localeCompare(b.e.date); });
    return out.slice(0, max || 3);
  }

  var api = { parseQuery: parseQuery, parseHours: parseHours, openState: openState, lateClose: lateClose, manilaNow: manilaNow, rank: rank, pickEvents: pickEvents, clock: clock, AREA_LABEL: AREA_LABEL };
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;
  root.PartyLifeConcierge = api;

  /* ---------- widget ---------- */
  var BASE = '/partylife/', DM = 'https://ig.me/m/partylifemnl';
  var EXAMPLES = ['rooftop bar in BGC open late', 'cheap drinks Poblacion tonight', 'salsa night', 'quiet bar for a date near Makati'];
  var CSS = [
    '#plc-open{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:9000;min-height:48px;padding:0 18px;background:var(--spot,#e4002b);color:var(--paper,#f3f0ea);border:0;font:500 15px var(--cover,sans-serif);letter-spacing:.08em;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.5)}',
    '#plc-panel{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:calc(max(16px,env(safe-area-inset-bottom)) + 58px);z-index:9001;width:min(420px,calc(100vw - 32px));max-height:min(78vh,680px);overflow-y:auto;overflow-x:hidden;background:var(--ink-2,#141414);color:var(--paper,#f3f0ea);border:1px solid var(--rule,#2b2a28);padding:16px;font:15px/1.45 var(--sans,sans-serif)}',
    '#plc-panel[hidden]{display:none}',
    '#plc-panel *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere}',
    '#plc-panel .plc-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}',
    '#plc-panel h2{margin:0;font:500 22px/1 var(--cover,sans-serif);text-transform:uppercase;letter-spacing:.02em}',
    '#plc-panel label{display:block;font:500 11px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--paper-2,#a9a49b);margin-bottom:6px}',
    '#plc-panel .plc-row{display:flex;gap:8px}',
    '#plc-q{flex:1;width:100%;background:var(--ink,#0a0a0a);color:var(--paper,#f3f0ea);border:1px solid var(--rule,#2b2a28);font:16px var(--sans,sans-serif);padding:10px 12px;min-height:44px}',
    '#plc-panel button{font:500 14px var(--cover,sans-serif);letter-spacing:.06em;text-transform:uppercase;cursor:pointer;min-height:44px;padding:0 14px;background:var(--spot,#e4002b);color:var(--paper,#f3f0ea);border:1px solid var(--spot,#e4002b)}',
    '#plc-panel button.plc-x{background:transparent;border-color:var(--rule,#2b2a28);min-width:44px;padding:0;font-size:20px;line-height:1}',
    '#plc-panel .plc-ex{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 4px}',
    '#plc-panel .plc-ex button{background:transparent;border-color:var(--rule,#2b2a28);color:var(--paper-2,#a9a49b);font:500 12px var(--mono,monospace);letter-spacing:.04em;text-transform:none;min-height:36px;text-align:left}',
    '#plc-panel button:focus-visible,#plc-panel a:focus-visible,#plc-q:focus-visible,#plc-open:focus-visible{outline:2px solid var(--foil,#c9a45c);outline-offset:2px}',
    '#plc-res h3{margin:14px 0 6px;font:500 11px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--spot,#e4002b)}',
    '#plc-res ul{list-style:none;margin:0;padding:0}',
    '#plc-res li{border-top:1px solid var(--rule,#2b2a28);padding:10px 0;display:grid;gap:2px}',
    '#plc-res li a.plc-n{font:500 18px/1.15 var(--cover,sans-serif);text-transform:uppercase;text-decoration:none}',
    '#plc-res li a.plc-n:hover{color:var(--spot,#e4002b)}',
    '#plc-res .plc-why,#plc-res .plc-msg{color:var(--paper-2,#a9a49b);font-size:14px}',
    '#plc-panel .plc-fb{margin:14px 0 0;padding-top:12px;border-top:1px solid var(--rule,#2b2a28);font-size:14px;color:var(--paper-2,#a9a49b)}',
    '#plc-panel .plc-fb a{color:var(--paper,#f3f0ea)}',
    '@media (max-width:480px){#plc-panel{left:8px;right:8px;width:auto;bottom:calc(max(16px,env(safe-area-inset-bottom)) + 56px)}}'
  ].join('');

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }
  function init() {
    if (document.getElementById('plc-open')) return;   // idempotent
    var st = el('style', { id: 'plc-css' }); st.textContent = CSS; document.head.appendChild(st);
    var btn = el('button', { id: 'plc-open', type: 'button', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-controls': 'plc-panel' }, 'Ask Party Life');
    var panel = el('div', { id: 'plc-panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'plc-title', hidden: '' });
    var top = el('div', { class: 'plc-top' });
    top.appendChild(el('h2', { id: 'plc-title' }, 'Ask Party Life'));
    var x = el('button', { type: 'button', class: 'plc-x', 'aria-label': 'Close' }, '\u00d7'); top.appendChild(x);
    var form = el('form', { role: 'search' });
    form.appendChild(el('label', { for: 'plc-q' }, 'Where do you want to go tonight?'));
    var row = el('div', { class: 'plc-row' });
    var input = el('input', { id: 'plc-q', type: 'text', autocomplete: 'off', enterkeyhint: 'search', placeholder: 'rooftop bar in BGC open late' });
    row.appendChild(input); row.appendChild(el('button', { type: 'submit' }, 'Ask')); form.appendChild(row);
    var ex = el('div', { class: 'plc-ex' });
    EXAMPLES.forEach(function (t) { ex.appendChild(el('button', { type: 'button' }, t)); });
    var res = el('div', { id: 'plc-res', 'aria-live': 'polite', tabindex: '-1' });
    var fb = el('p', { class: 'plc-fb' });
    panel.appendChild(top); panel.appendChild(form); panel.appendChild(ex); panel.appendChild(res); panel.appendChild(fb);
    document.body.appendChild(panel); document.body.appendChild(btn);

    var data = null, loading = null;
    function fetchJSON(u) { return fetch(u).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
    function load() {
      return loading || (loading = Promise.all([fetchJSON(BASE + 'concierge/index.json'), fetchJSON(BASE + 'data/events.json').catch(function () { return { events: [] }; })])
        .then(function (r) { data = { places: r[0], events: r[1].events || [] }; return data; }));
    }
    function setFallback(query) {
      fb.textContent = 'Did not find it? DM ';
      fb.appendChild(el('a', { href: DM + (query ? '?text=' + encodeURIComponent('Looking for: ' + query) : ''), target: '_blank', rel: 'noopener' }, '@partylifemnl on Instagram'));
      fb.appendChild(document.createTextNode('.'));
    }
    function card(title, href, why) {
      var li = el('li'); li.appendChild(el('a', { class: 'plc-n', href: href }, title)); li.appendChild(el('span', { class: 'plc-why' }, why)); return li;
    }
    function render(query) {
      res.textContent = '';
      var q = parseQuery(query), now = manilaNow(new Date());
      var r = rank(q, data.places, now), evs = pickEvents(q, data.events, now);
      if (evs.length) {
        res.appendChild(el('h3', {}, 'On soon')); var ul = el('ul');
        evs.forEach(function (o) {
          var e = o.e, when = o.today ? 'Tonight' : new Date(e.date + 'T00:00:00Z').toLocaleDateString('en-PH', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
          ul.appendChild(card(e.name, BASE + 'tonight/', [when, e.venue_name, e.price].filter(Boolean).join(', ')));
        });
        res.appendChild(ul);
      }
      if (r.items.length) {
        res.appendChild(el('h3', {}, r.relaxed === 'time' ? 'Nothing confirmed open now. Best bets' : r.relaxed ? 'No exact match. Closest' : 'Top picks')); var ul2 = el('ul');
        r.items.forEach(function (it) { ul2.appendChild(card(it.p.n, BASE + 'places/' + it.p.s + '/', it.reason)); });
        res.appendChild(ul2);
      } else if (!evs.length) res.appendChild(el('p', { class: 'plc-msg' }, 'Nothing matched that.'));
      setFallback(query);
      res.focus();
    }
    function ask(query) {
      query = query.trim(); if (!query) { input.focus(); return; }
      input.value = query; res.textContent = ''; res.appendChild(el('p', { class: 'plc-msg' }, 'Looking...'));
      load().then(function () { render(query); }, function () {
        res.textContent = ''; res.appendChild(el('p', { class: 'plc-msg' }, 'Could not load the venue list. Check your connection and try again.')); loading = null;
      });
    }
    function focusables() { return [].filter.call(panel.querySelectorAll('button,input,a[href]'), function (n) { return !n.disabled && n.offsetParent !== null; }); }
    function open() {
      panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); setFallback('');
      load().catch(function () {});   // lazy: first open only
      input.focus();
    }
    function close() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    root.PLAsk = function (q) { if (panel.hidden) open(); ask(String(q || '')); };   // page hook: open the panel with a query (home-v2 ask box)
    btn.addEventListener('click', function () { panel.hidden ? open() : close(); });
    x.addEventListener('click', close);
    form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
    ex.addEventListener('click', function (e) { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); });
    document.addEventListener('keydown', function (e) {
      if (panel.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (!panel.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(typeof window !== 'undefined' ? window : this);
