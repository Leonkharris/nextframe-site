/* CyberDealer HUD — floating AI host widget.
 * Vanilla JS, zero dependencies, one <script> tag to inject (see README.md).
 * Talks to the FastAPI service: POST /chat, POST /track/click.
 *
 * Deliberately NOT here: game-event listeners, session-length promo triggers,
 * "lucky streak" mechanics — see architecture.md § Design boundaries.
 */
(function () {
  "use strict";

  if (window.__cdhLoaded) return;
  window.__cdhLoaded = true;

  /* ---------------- config ---------------- */
  var cfg = {
    apiBase: "http://127.0.0.1:8791",
    brand: "Xsino",
    title: "NEON · Floor Host",
    greeting: "Hey, I'm NEON — the floor host. Ask me about games, deposits, withdrawals or current promos. 18+ only, play responsibly.",
    accent: "#00e5ff",
    accent2: "#ff2d95",
    zIndex: 2147483000
  };
  var userCfg = window.CyberDealerHUD || {};
  for (var k in userCfg) {
    if (Object.prototype.hasOwnProperty.call(userCfg, k)) cfg[k] = userCfg[k];
  }
  cfg.apiBase = String(cfg.apiBase).replace(/\/+$/, "");

  /* ---------------- session identity ---------------- */
  function newId() {
    try { return crypto.randomUUID(); }
    catch (e) { return "cdh-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10); }
  }
  var sessionId = null;
  try { sessionId = localStorage.getItem("cdh_session"); } catch (e) {}
  if (!sessionId) {
    sessionId = newId();
    try { localStorage.setItem("cdh_session", sessionId); } catch (e) {}
  }

  /* ---------------- transcript persistence (display only) ---------------- */
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem("cdh_history") || "[]"); }
    catch (e) { return []; }
  }
  function saveHistory() {
    try { localStorage.setItem("cdh_history", JSON.stringify(history.slice(-30))); }
    catch (e) {}
  }
  var history = loadHistory(); // [{r: "user"|"bot", t: text, ref: {code,url}|null}]

  /* ---------------- styles ---------------- */
  var css =
    ".cdh-root{position:fixed;right:18px;bottom:18px;z-index:" + cfg.zIndex + ";" +
      "font-family:'Segoe UI',system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.4;}" +
    ".cdh-root *{box-sizing:border-box;margin:0;padding:0;}" +

    ".cdh-orb{width:56px;height:56px;border-radius:50%;cursor:pointer;border:2px solid " + cfg.accent + ";" +
      "background:radial-gradient(circle at 30% 30%,#1a2340,#0b0f1a);display:flex;align-items:center;justify-content:center;" +
      "box-shadow:0 0 18px " + cfg.accent + "66,0 4px 14px rgba(0,0,0,.5);transition:transform .15s ease;}" +
    ".cdh-orb:hover{transform:scale(1.07);}" +
    ".cdh-orb span{color:" + cfg.accent + ";font-size:24px;text-shadow:0 0 8px " + cfg.accent + ";}" +

    ".cdh-panel{display:none;flex-direction:column;width:340px;max-width:calc(100vw - 24px);height:480px;" +
      "max-height:calc(100vh - 40px);background:#0b0f1a;border:1px solid " + cfg.accent + "55;border-radius:14px;" +
      "overflow:hidden;box-shadow:0 0 26px " + cfg.accent + "40,0 12px 34px rgba(0,0,0,.6);}" +
    ".cdh-open .cdh-panel{display:flex;}" +
    ".cdh-open .cdh-orb{display:none;}" +

    ".cdh-head{display:flex;align-items:center;gap:10px;padding:12px 14px;" +
      "background:linear-gradient(90deg," + cfg.accent + "22,transparent 60%),#101627;border-bottom:1px solid " + cfg.accent + "33;}" +
    ".cdh-dot{width:9px;height:9px;border-radius:50%;background:" + cfg.accent + ";box-shadow:0 0 8px " + cfg.accent + ";}" +
    ".cdh-title{flex:1;color:#eaf6ff;font-weight:600;letter-spacing:.4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}" +
    ".cdh-min{background:none;border:1px solid " + cfg.accent + "55;color:" + cfg.accent + ";width:26px;height:26px;" +
      "border-radius:7px;cursor:pointer;font-size:15px;line-height:1;}" +
    ".cdh-min:hover{background:" + cfg.accent + "22;}" +

    ".cdh-msgs{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:8px;" +
      "background:radial-gradient(ellipse at top," + cfg.accent2 + "0d,transparent 55%),#0b0f1a;}" +
    ".cdh-msg{max-width:82%;padding:8px 12px;border-radius:12px;color:#eaf6ff;word-wrap:break-word;white-space:pre-wrap;}" +
    ".cdh-msg-bot{align-self:flex-start;background:#161e33;border:1px solid " + cfg.accent + "2e;border-bottom-left-radius:4px;}" +
    ".cdh-msg-user{align-self:flex-end;background:" + cfg.accent2 + "2b;border:1px solid " + cfg.accent2 + "55;border-bottom-right-radius:4px;}" +

    ".cdh-ref{display:inline-block;margin-top:8px;padding:8px 12px;border-radius:9px;text-decoration:none;" +
      "color:#0b0f1a;font-weight:700;background:linear-gradient(90deg," + cfg.accent + "," + cfg.accent2 + ");" +
      "box-shadow:0 0 12px " + cfg.accent + "55;}" +
    ".cdh-ref:hover{filter:brightness(1.12);}" +

    ".cdh-typing{align-self:flex-start;color:" + cfg.accent + ";padding:2px 12px;letter-spacing:3px;}" +

    ".cdh-inrow{display:flex;gap:8px;padding:10px;border-top:1px solid " + cfg.accent + "33;background:#101627;}" +
    ".cdh-in{flex:1;background:#0b0f1a;border:1px solid " + cfg.accent + "44;border-radius:9px;color:#eaf6ff;" +
      "padding:9px 11px;outline:none;font:inherit;}" +
    ".cdh-in:focus{border-color:" + cfg.accent + ";box-shadow:0 0 8px " + cfg.accent + "44;}" +
    ".cdh-send{background:" + cfg.accent + ";border:none;border-radius:9px;color:#0b0f1a;font-weight:700;" +
      "padding:0 16px;cursor:pointer;}" +
    ".cdh-send:disabled{opacity:.5;cursor:default;}" +

    ".cdh-foot{text-align:center;color:#5d6c8a;font-size:11px;padding:5px 8px 8px;background:#101627;}";

  var styleEl = document.createElement("style");
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  /* ---------------- DOM ---------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.appendChild(document.createTextNode(text));
    return n;
  }

  var root = el("div", "cdh-root");

  var orb = el("button", "cdh-orb");
  orb.type = "button";
  orb.setAttribute("aria-label", "Open " + cfg.title);
  orb.appendChild(el("span", null, "♦")); // ♦

  var panel = el("div", "cdh-panel");

  var head = el("div", "cdh-head");
  head.appendChild(el("div", "cdh-dot"));
  head.appendChild(el("div", "cdh-title", cfg.title));
  var minBtn = el("button", "cdh-min", "–"); // –
  minBtn.type = "button";
  minBtn.setAttribute("aria-label", "Minimize");
  head.appendChild(minBtn);

  var msgs = el("div", "cdh-msgs");

  var inRow = el("div", "cdh-inrow");
  var input = el("input", "cdh-in");
  input.type = "text";
  input.placeholder = "Ask the host…";
  input.maxLength = 500;
  var sendBtn = el("button", "cdh-send", "Send");
  sendBtn.type = "button";
  inRow.appendChild(input);
  inRow.appendChild(sendBtn);

  var foot = el("div", "cdh-foot", "AI host · 18+ · Play responsibly");

  panel.appendChild(head);
  panel.appendChild(msgs);
  panel.appendChild(inRow);
  panel.appendChild(foot);
  root.appendChild(panel);
  root.appendChild(orb);

  /* ---------------- tracking ---------------- */
  function track(kind, data) {
    var payload = { session_id: sessionId };
    for (var p in data) {
      if (Object.prototype.hasOwnProperty.call(data, p)) payload[p] = data[p];
    }
    var body = JSON.stringify(payload);
    var url = cfg.apiBase + "/track/" + kind;
    try {
      if (navigator.sendBeacon &&
          navigator.sendBeacon(url, new Blob([body], { type: "application/json" }))) return;
    } catch (e) {}
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------------- messages ---------------- */
  function renderMsg(role, text, ref) {
    var m = el("div", "cdh-msg " + (role === "user" ? "cdh-msg-user" : "cdh-msg-bot"), text);
    if (ref && ref.url && ref.code) {
      m.appendChild(el("br"));
      var a = el("a", "cdh-ref", "Claim code " + ref.code + " →");
      a.href = ref.url;
      a.rel = "noopener";
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        track("click", { code: ref.code, target: ref.url });
        window.open(ref.url, "_blank", "noopener");
      });
      m.appendChild(a);
    }
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addMsg(role, text, ref) {
    renderMsg(role, text, ref || null);
    history.push({ r: role, t: text, ref: ref || null });
    saveHistory();
  }

  var typingEl = null;
  function typing(on) {
    if (on && !typingEl) {
      typingEl = el("div", "cdh-typing", "●●●");
      msgs.appendChild(typingEl);
      msgs.scrollTop = msgs.scrollHeight;
    } else if (!on && typingEl) {
      msgs.removeChild(typingEl);
      typingEl = null;
    }
  }

  /* ---------------- chat flow ---------------- */
  var busy = false;

  function send() {
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    addMsg("user", text);
    busy = true;
    sendBtn.disabled = true;
    typing(true);

    fetch(cfg.apiBase + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message: text })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (d) {
        typing(false);
        addMsg("bot", d.reply, d.referral || null);
      })
      .catch(function () {
        typing(false);
        addMsg("bot", "Host link is offline — try again in a moment.");
      })
      .then(function () {
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") send();
  });

  /* ---------------- open / minimize ---------------- */
  orb.addEventListener("click", function () {
    root.classList.add("cdh-open");
    if (history.length === 0) addMsg("bot", cfg.greeting);
    input.focus();
  });
  minBtn.addEventListener("click", function () {
    root.classList.remove("cdh-open");
  });

  /* ---------------- boot ---------------- */
  function boot() {
    document.body.appendChild(root);
    for (var i = 0; i < history.length; i++) {
      renderMsg(history[i].r, history[i].t, history[i].ref);
    }
  }
  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
