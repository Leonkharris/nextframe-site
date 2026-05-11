const logoOptions = [
  { id: "A", name: "Client Cut", style: "a", mark: "ml-red-white", accent: "#ef172f", family: "client sample", cut: "lightning-red" },
  { id: "B", name: "Cyan Blade", style: "b", mark: "ml-cyan-white", accent: "#13d6ff", family: "client sample", cut: "cyan" },
  { id: "C", name: "Red Strike", style: "c", mark: "ml-red-wing", accent: "#ef172f", family: "client sample", cut: "red" },
  { id: "D", name: "Double Slash", style: "d", mark: "ml-white-sharp", accent: "#ffffff", family: "slash wordmark", cut: "double" },
  { id: "E", name: "Broken Edge", style: "e", mark: "ml-blue-bolt", accent: "#13d6ff", family: "slash wordmark", cut: "jagged" },
  { id: "F", name: "Red Lightning", style: "f", mark: "ml-red-bar", accent: "#ef172f", family: "slash wordmark", cut: "lightning-red" },
  { id: "G", name: "Loop Slash", style: "g", mark: "ml-loop-cut", accent: "#13d6ff", family: "current ML", cut: "cyan" },
  { id: "H", name: "White Scar", style: "h", mark: "ml-white-wing", accent: "#ffffff", family: "client sample", cut: "white" },
  { id: "I", name: "Apex Cut", style: "i", mark: "ml-red-apex", accent: "#ef172f", family: "motorsport", cut: "red" },
  { id: "J", name: "Glitch Blade", style: "j", mark: "ml-cyan-block", accent: "#13d6ff", family: "glitch slash", cut: "glitch" },
  { id: "K", name: "Heavy Strike", style: "k", mark: "ml-box", accent: "#ffffff", family: "badge slash", cut: "double" },
  { id: "L", name: "Sharp Mono", style: "l", mark: "ml-blue-sharp", accent: "#13d6ff", family: "stage screen", cut: "jagged" },
  { id: "M", name: "Red Motorsport", style: "m", mark: "ml-red-wide", accent: "#ef172f", family: "motorsport", cut: "lightning-red" },
  { id: "N", name: "Blue Shock", style: "n", mark: "ml-shock", accent: "#13d6ff", family: "electric slash", cut: "lightning" },
  { id: "O", name: "Chrome Cut", style: "o", mark: "ml-chrome", accent: "#ffffff", family: "client sample", cut: "white" },
  { id: "P", name: "Club Scar", style: "p", mark: "ml-frame", accent: "#13d6ff", family: "DJ stage", cut: "cyan" },
  { id: "Q", name: "Infinity Rip", style: "q", mark: "ml-loop-cut", accent: "#13d6ff", family: "current ML", cut: "glitch" },
  { id: "R", name: "Razor Red", style: "r", mark: "ml-red-apex", accent: "#ef172f", family: "slash wordmark", cut: "red" },
  { id: "S", name: "Stage Slash", style: "s", mark: "ml-white-wing", accent: "#ffffff", family: "DJ stage", cut: "double" },
  { id: "T", name: "Final Cut", style: "t", mark: "ml-red-white", accent: "#13d6ff", family: "client sample", cut: "lightning" },
];

const markOptions = [
  { id: "ML1", name: "Sample Red M/L", mark: "ml-red-white", accent: "#ef172f", family: "client sample red/white" },
  { id: "ML2", name: "Razor White", mark: "ml-white-sharp", accent: "#ef172f", family: "white mark with red slash" },
  { id: "ML3", name: "Red Wing", mark: "ml-red-wing", accent: "#ef172f", family: "speed wing" },
  { id: "ML4", name: "Apex Red", mark: "ml-red-apex", accent: "#ef172f", family: "motorsport apex" },
  { id: "ML5", name: "Chrome Cut", mark: "ml-chrome", accent: "#ef172f", family: "chrome slash" },
  { id: "ML6", name: "Framed Strike", mark: "ml-box", accent: "#ef172f", family: "stage badge" },
  { id: "ML7", name: "Cyan M/L", mark: "ml-cyan-white", accent: "#13d6ff", family: "cyan/white split" },
  { id: "ML8", name: "Cyan Frame", mark: "ml-frame", accent: "#13d6ff", family: "neon frame" },
  { id: "ML9", name: "Shock Bolt", mark: "ml-shock", accent: "#13d6ff", family: "electric bolt" },
  { id: "ML10", name: "Wide Red", mark: "ml-red-wide", accent: "#ef172f", family: "wide motorsport" },
  { id: "ML11", name: "Cyan Block", mark: "ml-cyan-block", accent: "#13d6ff", family: "block slash" },
  { id: "ML12", name: "White Wing", mark: "ml-white-wing", accent: "#ef172f", family: "white speed wing" },
];

const backgroundOptions = [
  { id: "cyan-ink", name: "Cyan Ink Wipe", className: "bg-cyan-ink", thumb: "thumb-cyan-ink" },
  { id: "particle-field", name: "Particle Field", className: "bg-particle-field", thumb: "thumb-particle-field" },
  { id: "cream-wipe", name: "Cream Blue Wipe", className: "bg-cream-wipe", thumb: "thumb-cream-wipe" },
  { id: "red-laser", name: "Red Laser Sweep", className: "bg-red-laser", thumb: "thumb-red-laser" },
  { id: "halftone-pulse", name: "Halftone Pulse", className: "bg-halftone-pulse", thumb: "thumb-halftone-pulse" },
  { id: "signal-tunnel", name: "Signal Tunnel", className: "bg-signal-tunnel", thumb: "thumb-signal-tunnel" },
  { id: "smoke-sweep", name: "Smoke Light Sweep", className: "bg-smoke-sweep", thumb: "thumb-smoke-sweep" },
  { id: "white-flash", name: "White Flash Reveal", className: "bg-white-flash", thumb: "thumb-white-flash" },
  { id: "blade-storm", name: "Blade Storm", className: "bg-red-laser", thumb: "thumb-blade-storm" },
  { id: "electric-grid", name: "Electric Grid", className: "bg-signal-tunnel", thumb: "thumb-electric-grid" },
  { id: "stage-burst", name: "Stage Burst", className: "bg-cyan-ink", thumb: "thumb-stage-burst" },
  { id: "slash-tunnel", name: "Slash Tunnel", className: "bg-particle-field", thumb: "thumb-slash-tunnel" },
];

const state = {
  markId: "ML1",
  logoId: "A",
  backgroundId: "cyan-ink",
  animate: true,
  darkLogo: false,
  notes: JSON.parse(localStorage.getItem("manuelLegendNotes") || "{}"),
};

const recipientEmail = "nextframe.ai.agency@gmail.com";
const feedbackEndpoint = `https://formsubmit.co/ajax/${recipientEmail}`;

const stage = document.getElementById("stage");
const loopCanvas = document.getElementById("loopCanvas");
const loopCtx = loopCanvas.getContext("2d");
const markGrid = document.getElementById("markGrid");
const logoGrid = document.getElementById("logoGrid");
const backgroundGrid = document.getElementById("backgroundGrid");
const comboLabel = document.getElementById("comboLabel");
const notes = document.getElementById("notes");
const selectionOutput = document.getElementById("selectionOutput");
const animationToggle = document.getElementById("animationToggle");
const invertToggle = document.getElementById("invertToggle");
const emailFeedback = document.getElementById("emailFeedback");
const whatsappFeedback = document.getElementById("whatsappFeedback");
const copyFeedback = document.getElementById("copyFeedback");
const downloadFeedback = document.getElementById("downloadFeedback");

const rand = (seed) => {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const random = rand(1987);
const particles = Array.from({ length: 170 }, (_, index) => ({
  x: random(),
  y: random(),
  r: 0.8 + random() * 2.6,
  speed: 0.04 + random() * 0.22,
  drift: -0.24 + random() * 0.48,
  phase: random() * Math.PI * 2,
  cyan: index % 3 === 0,
}));

function resizeLoopCanvas() {
  const rect = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  loopCanvas.width = Math.max(1, Math.floor(rect.width * dpr));
  loopCanvas.height = Math.max(1, Math.floor(rect.height * dpr));
  loopCanvas.style.width = `${rect.width}px`;
  loopCanvas.style.height = `${rect.height}px`;
  loopCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawGlowLine(ctx, x1, y1, x2, y2, color, width, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width * 4;
  ctx.shadowColor = color;
  ctx.shadowBlur = width * 5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.lineWidth = width;
  ctx.shadowBlur = width * 1.5;
  ctx.stroke();
  ctx.restore();
}

function drawParticles(ctx, t, w, h, density = 1) {
  for (const p of particles) {
    const x = ((p.x * w + Math.sin(t * 0.0008 + p.phase) * 34 + t * p.drift * density * 0.03) % w + w) % w;
    const y = ((p.y * h + t * p.speed * density) % h + h) % h;
    const flicker = 0.38 + Math.sin(t * 0.004 + p.phase) * 0.28;
    ctx.globalAlpha = Math.max(0.12, flicker);
    ctx.fillStyle = p.cyan ? "#13d6ff" : "#f7fbff";
    ctx.beginPath();
    ctx.arc(x, y, p.r * density, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawHalftone(ctx, t, w, h, color = "rgba(19,214,255,0.34)") {
  const gap = 22 + Math.sin(t * 0.0016) * 5;
  ctx.fillStyle = color;
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      const cx = x + ((t * 0.018) % gap);
      const pulse = 0.7 + Math.sin((x + y) * 0.02 + t * 0.004) * 0.5;
      ctx.globalAlpha = 0.08 + pulse * 0.15;
      ctx.beginPath();
      ctx.arc(cx, y, 1.1 + pulse * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawInkBlob(ctx, x, y, r, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, color.replace("ALPHA", String(alpha)));
  gradient.addColorStop(0.52, color.replace("ALPHA", String(alpha * 0.55)));
  gradient.addColorStop(1, color.replace("ALPHA", "0"));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawCyanInk(ctx, t, w, h) {
  drawInkBlob(ctx, w * (0.18 + Math.sin(t * 0.0007) * 0.04), h * 0.28, w * 0.26, "rgba(19,214,255,ALPHA)", 0.72);
  drawInkBlob(ctx, w * (0.74 + Math.cos(t * 0.0009) * 0.05), h * 0.68, w * 0.22, "rgba(239,230,204,ALPHA)", 0.58);
  const sweep = ((t * 0.085) % (w * 1.8)) - w * 0.4;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.34, -h * 0.12, "#13d6ff", 10, 0.55);
  drawGlowLine(ctx, sweep + w * 0.42, h * 1.04, sweep + w * 0.72, -h * 0.16, "#ffffff", 4, 0.28);
}

function drawRedLaser(ctx, t, w, h) {
  const sweep = ((t * 0.12) % (w * 1.7)) - w * 0.36;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.22, -h * 0.2, "#ef172f", 8, 0.9);
  drawGlowLine(ctx, -w * 0.1, h * (0.68 + Math.sin(t * 0.0012) * 0.08), w * 1.05, h * (0.48 + Math.cos(t * 0.001) * 0.05), "#ef172f", 5, 0.76);
  drawGlowLine(ctx, w * 0.18, h * 1.12, w * 0.84, -h * 0.1, "#ffffff", 3, 0.25);
  drawHalftone(ctx, t, w, h, "rgba(239,23,47,0.18)");
}

function drawCreamWipe(ctx, t, w, h) {
  drawInkBlob(ctx, w * 0.22, h * (0.2 + Math.sin(t * 0.001) * 0.08), w * 0.33, "rgba(19,214,255,ALPHA)", 0.62);
  drawInkBlob(ctx, w * 0.8, h * (0.72 + Math.cos(t * 0.0011) * 0.06), w * 0.28, "rgba(4,6,7,ALPHA)", 0.68);
  const sweep = ((t * 0.07) % (w * 1.5)) - w * 0.2;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.17, -h * 0.12, "#13d6ff", 14, 0.36);
}

function drawTunnel(ctx, t, w, h) {
  const centerX = w / 2;
  const centerY = h / 2;
  for (let i = 0; i < 26; i += 1) {
    const offset = ((i * 46 + t * 0.08) % (w * 1.2)) - w * 0.1;
    const alpha = 0.12 + (i % 4) * 0.035;
    drawGlowLine(ctx, offset, 0, centerX + (offset - centerX) * 0.18, centerY, "#13d6ff", 2, alpha);
    drawGlowLine(ctx, offset, h, centerX + (offset - centerX) * 0.18, centerY, "#13d6ff", 2, alpha);
  }
  drawInkBlob(ctx, centerX, centerY, w * 0.28, "rgba(19,214,255,ALPHA)", 0.22);
}

function drawSmoke(ctx, t, w, h) {
  drawInkBlob(ctx, w * (0.28 + Math.sin(t * 0.0008) * 0.1), h * 0.62, w * 0.32, "rgba(255,255,255,ALPHA)", 0.24);
  drawInkBlob(ctx, w * (0.7 + Math.cos(t * 0.0009) * 0.1), h * 0.35, w * 0.26, "rgba(19,214,255,ALPHA)", 0.2);
  drawGlowLine(ctx, ((t * 0.08) % (w * 1.4)) - w * 0.2, h * 1.1, ((t * 0.08) % (w * 1.4)) + w * 0.16, -h * 0.1, "#ffffff", 7, 0.28);
}

function drawWhiteFlash(ctx, t, w, h) {
  const sweep = ((t * 0.16) % (w * 1.6)) - w * 0.3;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.18, -h * 0.12, "#ffffff", 13, 0.72);
  drawGlowLine(ctx, sweep + w * 0.1, h * 1.1, sweep + w * 0.28, -h * 0.12, "#13d6ff", 5, 0.34);
}

function drawEnergyShards(ctx, t, w, h, color = "#13d6ff", count = 18, speed = 0.11) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  for (let i = 0; i < count; i += 1) {
    const lane = i / count;
    const x = ((lane * w * 1.7 + t * speed + Math.sin(i * 2.11) * 120) % (w * 1.35)) - w * 0.18;
    const y = (Math.sin(t * 0.0011 + i * 1.7) * 0.24 + 0.5) * h;
    const length = 70 + ((i * 17) % 120);
    const thickness = 2 + (i % 4);
    ctx.globalAlpha = 0.18 + (i % 5) * 0.045;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y - length * 0.16);
    ctx.lineTo(x + length + 24, y - length * 0.16 + thickness);
    ctx.lineTo(x + 18, y + thickness * 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawStageBars(ctx, t, w, h, color = "#13d6ff") {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 28; i += 1) {
    const x = (i / 27) * w;
    const height = h * (0.12 + Math.abs(Math.sin(t * 0.0027 + i * 0.74)) * 0.34);
    const alpha = 0.08 + Math.abs(Math.sin(t * 0.0035 + i)) * 0.18;
    const gradient = ctx.createLinearGradient(x, h, x, h - height);
    const barColor = color.startsWith("rgb(")
      ? color.replace("rgb", "rgba").replace(")", `,${alpha})`)
      : color === "#ef172f"
        ? `rgba(239,23,47,${alpha})`
        : `rgba(19,214,255,${alpha})`;
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, barColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - 2, h - height, 4, height);
  }
  ctx.restore();
}

function drawSlashTunnel(ctx, t, w, h, color = "#13d6ff") {
  const cx = w / 2;
  const cy = h / 2;
  for (let i = 0; i < 18; i += 1) {
    const scale = ((i * 0.11 + t * 0.00032) % 1);
    const width = w * (0.12 + scale * 0.9);
    const height = h * (0.08 + scale * 0.54);
    const alpha = (1 - scale) * 0.22;
    drawGlowLine(ctx, cx - width * 0.5, cy + height * 0.5, cx + width * 0.5, cy - height * 0.5, color, 2 + scale * 8, alpha);
    drawGlowLine(ctx, cx - width * 0.45, cy - height * 0.45, cx + width * 0.45, cy + height * 0.45, "#ffffff", 1 + scale * 4, alpha * 0.5);
  }
}

function drawLoopFrame(t) {
  const rect = stage.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  loopCtx.clearRect(0, 0, w, h);
  loopCtx.save();
  loopCtx.globalCompositeOperation = "lighter";
  if (state.backgroundId === "red-laser") {
    drawRedLaser(loopCtx, t, w, h);
    drawEnergyShards(loopCtx, t, w, h, "#ef172f", 22, 0.16);
  } else if (state.backgroundId === "cream-wipe") {
    drawCreamWipe(loopCtx, t, w, h);
    drawStageBars(loopCtx, t, w, h, "rgb(19,214,255)");
  } else if (state.backgroundId === "halftone-pulse") {
    drawHalftone(loopCtx, t, w, h);
    drawCyanInk(loopCtx, t, w, h);
    drawSlashTunnel(loopCtx, t, w, h, "#13d6ff");
  } else if (state.backgroundId === "signal-tunnel") {
    drawTunnel(loopCtx, t, w, h);
    drawStageBars(loopCtx, t, w, h, "rgb(19,214,255)");
  } else if (state.backgroundId === "smoke-sweep") {
    drawSmoke(loopCtx, t, w, h);
    drawEnergyShards(loopCtx, t, w, h, "#ffffff", 14, 0.08);
  } else if (state.backgroundId === "white-flash") {
    drawWhiteFlash(loopCtx, t, w, h);
    drawSlashTunnel(loopCtx, t, w, h, "#ffffff");
  } else if (state.backgroundId === "particle-field") {
    drawParticles(loopCtx, t, w, h, 1.35);
    drawHalftone(loopCtx, t, w, h, "rgba(19,214,255,0.18)");
    drawEnergyShards(loopCtx, t, w, h, "#13d6ff", 16, 0.06);
  } else if (state.backgroundId === "blade-storm") {
    drawRedLaser(loopCtx, t, w, h);
    drawEnergyShards(loopCtx, t, w, h, "#ef172f", 34, 0.22);
    drawSlashTunnel(loopCtx, t, w, h, "#ef172f");
  } else if (state.backgroundId === "electric-grid") {
    drawTunnel(loopCtx, t, w, h);
    drawStageBars(loopCtx, t, w, h, "rgb(19,214,255)");
    drawEnergyShards(loopCtx, t, w, h, "#13d6ff", 24, 0.18);
  } else if (state.backgroundId === "stage-burst") {
    drawCyanInk(loopCtx, t, w, h);
    drawStageBars(loopCtx, t, w, h, "rgb(239,23,47)");
    drawWhiteFlash(loopCtx, t * 0.7, w, h);
  } else if (state.backgroundId === "slash-tunnel") {
    drawSlashTunnel(loopCtx, t, w, h, "#13d6ff");
    drawEnergyShards(loopCtx, t, w, h, "#ffffff", 24, 0.13);
    drawHalftone(loopCtx, t, w, h, "rgba(19,214,255,0.16)");
  } else {
    drawCyanInk(loopCtx, t, w, h);
    drawEnergyShards(loopCtx, t, w, h, "#13d6ff", 16, 0.1);
  }
  drawParticles(loopCtx, t, w, h, state.backgroundId === "particle-field" ? 1.4 : 0.82);
  loopCtx.restore();
  requestAnimationFrame(drawLoopFrame);
}

function markSvg(option) {
  const common = `viewBox="0 0 240 120" role="img" aria-label="${option.name} mark"`;
  const type = option.mark;
  const shadow = `<path class="mark-shadow" d="M34 96h175l-13 13H19z"/>`;
  const spark = (accent = "var(--accent)") => `<path fill="${accent}" d="M29 99h162l-15 12H11z"/>`;

  const sampleMark = (primary = "#f0142f", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-sample">${shadow}<path fill="${primary}" d="M18 91 51 24h36l32 35 32-35h42l-30 67h-34l16-39-27 32h-13L80 54 64 91z"/><path fill="${secondary}" d="M159 24h61l-47 67h-55l15-23h22l30-44z"/><path fill="${accent}" d="M98 98h82l-13 12H82z"/></svg>`;

  const wingMark = (primary = "#f0142f", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-wing">${shadow}<path fill="${primary}" d="M7 88 42 27h45l31 30 31-30h44l-29 61h-35l15-34-25 25h-13L80 54 62 88z"/><path fill="${secondary}" d="M160 27h61l-17 21h-24l-29 40h-48l15-23h18z"/><path fill="${accent}" opacity=".95" d="M0 76h62l-10 15H0zm176-45h64l-15 17h-64z"/></svg>`;

  const razorMark = (primary = "currentColor", secondary = "currentColor", accent = "#f0142f") =>
    `<svg ${common} class="ml-mark ml-razor">${shadow}<path fill="${primary}" d="M27 91V26h34l59 42 58-42h35v65h-31V59l-48 32h-28L58 59v32z"/><path fill="${accent}" d="M8 75 229 35l-17 17L0 91z"/><path fill="${secondary}" opacity=".86" d="M168 26h45v17h-30v48h-31V57z"/></svg>`;

  const boltMark = (primary = "#13d6ff", secondary = "currentColor", accent = "#f0142f") =>
    `<svg ${common} class="ml-mark ml-bolt">${shadow}<path fill="${primary}" d="M19 92 50 25h37l32 39 32-39h39l-29 67h-34l16-37-25 31h-12L80 55 64 92z"/><path fill="${secondary}" d="M164 25h57l-43 67h-54l15-23h21l27-44z"/><path fill="${accent}" d="m122 10-20 45h24l-19 56 55-72h-28z"/></svg>`;

  const bracketMark = (primary = "#f0142f", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-bracket">${shadow}<path fill="${primary}" d="M35 90V28h34l50 39 49-39h34v62h-30V58l-42 32h-23L65 58v32z"/><path fill="${secondary}" d="M159 28h52v20h-22v42h-30z"/><path fill="${accent}" d="M15 18h193l-15 13H0zm21 77h193l-16 14H21z"/></svg>`;

  const apexMark = (primary = "#f0142f", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-apex">${shadow}<path fill="${primary}" d="M23 92 62 23h33l25 39 32-39h61l-50 69h-38l22-31-27 25h-11L86 58 68 92z"/><path fill="${secondary}" d="M160 23h58l-16 21h-22l-31 48h-49l16-25h20z"/><path fill="${accent}" d="M51 18h164l-27 19H39zm-30 81h158l-27 18H10z"/></svg>`;

  const frameMark = (primary = "#13d6ff", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-frame"><path class="mark-white-stroke" d="M31 21h177l-21 78H31z"/><path fill="${primary}" d="M46 88 68 33h30l22 31 25-31h35l-22 55h-29l12-30-22 27h-10L86 58 74 88z"/><path fill="${secondary}" d="M158 33h43l-34 55h-40l13-20h16l20-35z"/><path fill="${accent}" d="M26 95h158l-13 11H13z"/></svg>`;

  const wideMark = (primary = "#f0142f", secondary = "currentColor", accent = primary) =>
    `<svg ${common} class="ml-mark ml-wide">${shadow}<path fill="${primary}" d="M8 89 42 31h48l30 29 30-29h80l-31 58h-43l17-30-34 30h-29L76 59 58 89z"/><path fill="${secondary}" d="M166 31h58l-37 58h-48l14-21h18l22-37z"/><path fill="${accent}" d="M20 96h198l-11 13H8z"/></svg>`;

  const chromeMark = (primary = "currentColor", secondary = "currentColor", accent = "#f0142f") =>
    `<svg ${common} class="ml-mark ml-chrome">${shadow}<path fill="${primary}" d="M23 91 57 25h36l27 38 31-38h39l-29 66h-33l15-36-25 30h-11L83 55 67 91z"/><path fill="${secondary}" d="M160 25h58l-45 66h-53l15-23h20l29-43z"/><path fill="${accent}" d="M12 79 229 30l-20 20L0 95z"/></svg>`;

  const templates = {
    "ml-red-white": sampleMark("#f0142f", "currentColor", "#f0142f"),
    "ml-cyan-white": sampleMark("#13d6ff", "currentColor", "#13d6ff"),
    "ml-red-wing": wingMark("#f0142f", "currentColor", "#f0142f"),
    "ml-white-sharp": razorMark("currentColor", "currentColor", "#f0142f"),
    "ml-blue-bolt": boltMark("#13d6ff", "currentColor", "#f0142f"),
    "ml-red-bar": bracketMark("#f0142f", "currentColor", "#f0142f"),
    "ml-loop-cut": wingMark("#13d6ff", "currentColor", "#13d6ff"),
    "ml-white-wing": wingMark("currentColor", "currentColor", "#f0142f"),
    "ml-red-apex": apexMark("#f0142f", "currentColor", "#f0142f"),
    "ml-cyan-block": bracketMark("#13d6ff", "currentColor", "#13d6ff"),
    "ml-box": frameMark("#f0142f", "currentColor", "#f0142f"),
    "ml-blue-sharp": apexMark("#13d6ff", "currentColor", "#13d6ff"),
    "ml-red-wide": wideMark("#f0142f", "currentColor", "#f0142f"),
    "ml-shock": boltMark("#13d6ff", "currentColor", "#13d6ff"),
    "ml-chrome": chromeMark("currentColor", "currentColor", "#f0142f"),
    "ml-frame": frameMark("#13d6ff", "currentColor", "#13d6ff"),
    loop: wingMark("#13d6ff", "currentColor", "#13d6ff"),
    blade: wingMark("#f0142f", "currentColor", "#f0142f"),
    chrome: chromeMark("currentColor", "currentColor", "#f0142f"),
    shield: frameMark("#f0142f", "currentColor", "#f0142f"),
    stack: bracketMark("currentColor", "currentColor", "#13d6ff"),
    speed: wingMark("#f0142f", "currentColor", "#f0142f"),
    signal: sampleMark("#13d6ff", "currentColor", "#13d6ff"),
    stamp: frameMark("currentColor", "currentColor", "#f0142f"),
    angular: apexMark("#f0142f", "currentColor", "#f0142f"),
    laser: razorMark("currentColor", "currentColor", "#f0142f"),
    crest: frameMark("#f0142f", "currentColor", "#f0142f"),
    festival: wideMark("#13d6ff", "currentColor", "#13d6ff"),
    wide: wideMark("#f0142f", "currentColor", "#f0142f"),
    split: bracketMark("#13d6ff", "currentColor", "#f0142f"),
    premium: chromeMark("currentColor", "currentColor", "#f0142f"),
    column: sampleMark("currentColor", "currentColor", "#13d6ff"),
    electric: boltMark("#13d6ff", "currentColor", "#f0142f"),
    apex: apexMark("#f0142f", "currentColor", "#f0142f"),
    heavy: frameMark("#f0142f", "currentColor", "#f0142f"),
    clean: sampleMark("currentColor", "currentColor", "#13d6ff"),
  };

  return `<div class="logo-mark">${templates[type]}</div>`;
}

function lockupHtml(option, mini = false, markOption = selectedMark(), showMark = true) {
  const slash = `<i class="slash cut-${option.cut}"></i>`;
  return `
    <div class="logo-lockup logo-style-${option.style}${mini ? "" : state.animate ? " animate" : ""}${state.darkLogo && !mini ? " dark-mode" : ""}" style="--accent:${option.accent}">
      ${showMark ? markSvg(markOption) : ""}
      <div class="wordmark">
        <span>Manuel</span>
        <span>Legend</span>
        ${slash}
      </div>
      <div class="handle">@manuel_Legend</div>
    </div>
  `;
}

function selectedLogo() {
  return logoOptions.find((option) => option.id === state.logoId) || logoOptions[0];
}

function selectedMark() {
  return markOptions.find((option) => option.id === state.markId) || markOptions[0];
}

function selectedBackground() {
  return backgroundOptions.find((option) => option.id === state.backgroundId) || backgroundOptions[0];
}

function comboKey() {
  return `${state.markId}__${state.logoId}__${state.backgroundId}`;
}

function renderMarkGrid() {
  markGrid.innerHTML = markOptions
    .map((option) => `
      <button type="button" class="logo-card${option.id === state.markId ? " is-selected" : ""}" data-mark="${option.id}" style="--accent:${option.accent}">
        <div class="mini-logo mark-only">${markSvg(option)}</div>
        <div class="card-caption"><strong>${option.id}</strong><span>${option.name}</span></div>
      </button>
    `)
    .join("");
}

function renderLogoGrid() {
  logoGrid.innerHTML = logoOptions
    .map((option) => `
      <button type="button" class="logo-card${option.id === state.logoId ? " is-selected" : ""}" data-logo="${option.id}" style="--accent:${option.accent}">
        <div class="mini-logo text-only">${lockupHtml(option, true, selectedMark(), false)}</div>
        <div class="card-caption"><strong>${option.id}</strong><span>${option.name}</span></div>
      </button>
    `)
    .join("");
}

function renderBackgroundGrid() {
  backgroundGrid.innerHTML = backgroundOptions
    .map((option) => `
      <button type="button" class="bg-card${option.id === state.backgroundId ? " is-selected" : ""}" data-bg="${option.id}">
        <div class="bg-thumb ${option.thumb}"></div>
        <div class="bg-caption"><strong>${option.name}</strong></div>
      </button>
    `)
    .join("");
}

function updatePreview() {
  const mark = selectedMark();
  const logo = selectedLogo();
  const bg = selectedBackground();
  stage.className = `stage ${bg.className}`;
  document.querySelector(".stage > .logo-lockup").outerHTML = lockupHtml(logo, false, mark, true);
  document.querySelector(".stage > .logo-lockup").id = "logoLockup";
  comboLabel.textContent = `${mark.id} + Text ${logo.id} + ${bg.name}`;
  notes.value = state.notes[comboKey()] || "";
  selectionOutput.textContent = outputText();
  animationToggle.textContent = state.animate ? "Animation On" : "Animation Off";
  animationToggle.classList.toggle("is-active", state.animate);
  invertToggle.textContent = state.darkLogo ? "Light Logo" : "Dark Logo";
  invertToggle.classList.toggle("is-active", state.darkLogo);
  renderMarkGrid();
  renderLogoGrid();
  renderBackgroundGrid();
}

function outputText() {
  const mark = selectedMark();
  const logo = selectedLogo();
  const bg = selectedBackground();
  return [
    "MANUEL LEGEND SELECTION",
    `Top ML logo: ${mark.id} - ${mark.name}`,
    `Text design: ${logo.id} - ${logo.name}`,
    `Background loop: ${bg.name}`,
    `Top logo family: ${mark.family}`,
    `Text family: ${logo.family}`,
    `Render layers: mark=${mark.id}, text=${logo.id}, background=${bg.id}`,
    `Animation preview: ${state.animate ? "On" : "Off"}`,
    `Logo color preview: ${state.darkLogo ? "Dark" : "Light"}`,
    `Notes: ${state.notes[comboKey()] || "(none yet)"}`,
  ].join("\n");
}

function feedbackPayload() {
  const mark = selectedMark();
  const logo = selectedLogo();
  const bg = selectedBackground();
  return {
    project: "Manuel Legend",
    format: "16:9",
    selectedTopLogo: `${mark.id} - ${mark.name}`,
    selectedTextDesign: `${logo.id} - ${logo.name}`,
    selectedBackground: bg.name,
    topLogoFamily: mark.family,
    textFamily: logo.family,
    animationPreview: state.animate,
    darkLogoPreview: state.darkLogo,
    renderSpec: {
      markId: mark.id,
      textDesignId: logo.id,
      backgroundId: bg.id,
      aspectRatio: "16:9",
      targetExport: "mp4",
      layerOrder: ["background loop", "top ML logo", "Manuel Legend wordmark", "handle"],
    },
    notes: state.notes[comboKey()] || "",
    allNotes: state.notes,
  };
}

function feedbackText() {
  return outputText();
}

function encodedFeedbackText() {
  return encodeURIComponent(feedbackText());
}

markGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mark]");
  if (!button) return;
  state.markId = button.dataset.mark;
  updatePreview();
});

logoGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-logo]");
  if (!button) return;
  state.logoId = button.dataset.logo;
  updatePreview();
});

backgroundGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-bg]");
  if (!button) return;
  state.backgroundId = button.dataset.bg;
  updatePreview();
});

notes.addEventListener("input", () => {
  state.notes[comboKey()] = notes.value.trim();
  localStorage.setItem("manuelLegendNotes", JSON.stringify(state.notes));
  selectionOutput.textContent = outputText();
});

animationToggle.addEventListener("click", () => {
  state.animate = !state.animate;
  updatePreview();
});

invertToggle.addEventListener("click", () => {
  state.darkLogo = !state.darkLogo;
  updatePreview();
});

emailFeedback.addEventListener("click", async () => {
  if (emailFeedback.dataset.sending === "true") return;
  const mark = selectedMark();
  const logo = selectedLogo();
  const bg = selectedBackground();
  const text = feedbackText();
  const payload = feedbackPayload();
  const formData = new FormData();
  formData.append("_subject", `Manuel Legend feedback - ${mark.id} / Text ${logo.id} / ${bg.name}`);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("project", payload.project);
  formData.append("top_ml_logo", payload.selectedTopLogo);
  formData.append("text_design", payload.selectedTextDesign);
  formData.append("background_loop", payload.selectedBackground);
  formData.append("render_layers", JSON.stringify(payload.renderSpec));
  formData.append("notes", payload.notes || "(none)");
  formData.append("feedback", text);

  emailFeedback.dataset.sending = "true";
  emailFeedback.textContent = "Sending...";
  selectionOutput.textContent = `${text}\n\nStatus: sending feedback...`;
  try {
    const response = await fetch(feedbackEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Feedback send failed: ${response.status}`);
    }
    emailFeedback.textContent = "Feedback Sent";
    selectionOutput.textContent = `${text}\n\nStatus: feedback sent`;
  } catch (error) {
    console.error(error);
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // The visible status below is the fallback when browser permissions block direct send and clipboard.
    }
    emailFeedback.textContent = "Send Failed";
    selectionOutput.textContent = `${text}\n\nStatus: direct send was blocked by the browser. The feedback was copied when possible. Try again from the live site.`;
  } finally {
    window.setTimeout(() => {
      emailFeedback.dataset.sending = "false";
      emailFeedback.textContent = "Send Feedback";
    }, 1800);
  }
});

whatsappFeedback.addEventListener("click", () => {
  window.open(`https://wa.me/?text=${encodedFeedbackText()}`, "_blank", "noopener,noreferrer");
});

copyFeedback.addEventListener("click", async () => {
  const text = feedbackText();
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      throw new Error("Clipboard API unavailable");
    }
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  copyFeedback.textContent = "Copied";
  window.setTimeout(() => {
    copyFeedback.textContent = "Copy Feedback";
  }, 1200);
});

downloadFeedback.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(feedbackPayload(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `manuel-legend-selection-${state.logoId}-${state.backgroundId}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
});

resizeLoopCanvas();
window.addEventListener("resize", resizeLoopCanvas);
requestAnimationFrame(drawLoopFrame);
updatePreview();
window.getManuelLegendRenderSpec = feedbackPayload;
