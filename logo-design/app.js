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
  { id: "ML01", name: "Generated Loop", asset: "assets/top-logos/ml01.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML02", name: "Blade Loop", asset: "assets/top-logos/ml02.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML03", name: "Double Ring", asset: "assets/top-logos/ml03.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML04", name: "Capsule Link", asset: "assets/top-logos/ml04.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML05", name: "Octane Link", asset: "assets/top-logos/ml05.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML06", name: "Lightning Italic", asset: "assets/top-logos/ml06.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML07", name: "Circle Strike", asset: "assets/top-logos/ml07.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML08", name: "Capsule Badge", asset: "assets/top-logos/ml08.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML09", name: "Twin Rings", asset: "assets/top-logos/ml09.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML10", name: "Bolt Infinity", asset: "assets/top-logos/ml10.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML11", name: "Paint Loop", asset: "assets/top-logos/ml11.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML12", name: "Red Bolt Rings", asset: "assets/top-logos/ml12.png", accent: "#ef172f", family: "generated concept board" },
  { id: "ML13", name: "Red Line ML", asset: "assets/top-logos/ml13.png", accent: "#ef172f", family: "generated concept board" },
  { id: "ML14", name: "Orbit Bolt", asset: "assets/top-logos/ml14.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML15", name: "Speed Capsule", asset: "assets/top-logos/ml15.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML16", name: "Split Slash", asset: "assets/top-logos/ml16.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML17", name: "Hex Badge", asset: "assets/top-logos/ml17.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML18", name: "North Loop", asset: "assets/top-logos/ml18.png", accent: "#ffffff", family: "generated concept board" },
  { id: "ML19", name: "Cyan Bolt Loop", asset: "assets/top-logos/ml19.png", accent: "#13d6ff", family: "generated concept board" },
  { id: "ML20", name: "Heavy Slash", asset: "assets/top-logos/ml20.png", accent: "#ffffff", family: "generated concept board" },
];

const backgroundOptions = [
  { id: "cyan-ink", name: "Liquid Cyan Pour", className: "bg-cyan-ink", thumb: "thumb-cyan-ink" },
  { id: "cream-wipe", name: "Cream Liquid Wash", className: "bg-cream-wipe", thumb: "thumb-cream-wipe" },
  { id: "stage-burst", name: "Blue Paint Bloom", className: "bg-cyan-ink", thumb: "thumb-stage-burst" },
  { id: "red-laser", name: "Red Ink Slash", className: "bg-red-laser", thumb: "thumb-red-laser" },
  { id: "smoke-sweep", name: "Smoke Paint Sweep", className: "bg-smoke-sweep", thumb: "thumb-smoke-sweep" },
  { id: "white-flash", name: "White Paint Reveal", className: "bg-white-flash", thumb: "thumb-white-flash" },
  { id: "halftone-pulse", name: "Halftone Paint Pulse", className: "bg-halftone-pulse", thumb: "thumb-halftone-pulse" },
  { id: "particle-field", name: "Paint Speckle Field", className: "bg-particle-field", thumb: "thumb-particle-field" },
  { id: "blade-storm", name: "Red Paint Storm", className: "bg-red-laser", thumb: "thumb-blade-storm" },
  { id: "electric-grid", name: "Cyan Ink Grid", className: "bg-signal-tunnel", thumb: "thumb-electric-grid" },
  { id: "signal-tunnel", name: "Liquid Screen Grid", className: "bg-signal-tunnel", thumb: "thumb-signal-tunnel" },
  { id: "slash-tunnel", name: "Ink Slash Tunnel", className: "bg-particle-field", thumb: "thumb-slash-tunnel" },
];

const state = {
  markId: "ML01",
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

function drawLiquidBlob(ctx, x, y, rx, ry, color, alpha, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(rx, ry);
  const gradient = ctx.createRadialGradient(-0.18, -0.12, 0.02, 0, 0, 1);
  gradient.addColorStop(0, color.replace("ALPHA", String(alpha)));
  gradient.addColorStop(0.42, color.replace("ALPHA", String(alpha * 0.72)));
  gradient.addColorStop(0.72, color.replace("ALPHA", String(alpha * 0.26)));
  gradient.addColorStop(1, color.replace("ALPHA", "0"));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPaintRibbon(ctx, t, w, h, color, alpha, phase = 0, verticalOffset = 0) {
  const move = ((t * 0.07 + phase * 260) % (w * 1.8)) - w * 0.55;
  const y = h * (0.42 + verticalOffset + Math.sin(t * 0.001 + phase) * 0.08);
  const thickness = h * (0.16 + Math.sin(t * 0.0017 + phase) * 0.04);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 32;
  ctx.beginPath();
  ctx.moveTo(move - w * 0.18, y + thickness);
  ctx.bezierCurveTo(move + w * 0.16, y - thickness * 1.2, move + w * 0.46, y + thickness * 0.8, move + w * 0.82, y - thickness * 0.35);
  ctx.lineTo(move + w * 0.9, y + thickness * 0.45);
  ctx.bezierCurveTo(move + w * 0.52, y + thickness * 1.6, move + w * 0.2, y + thickness * 0.5, move - w * 0.22, y + thickness * 1.85);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPaintDrips(ctx, t, w, h, color, count = 30) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  for (let i = 0; i < count; i += 1) {
    const lane = (i * 37) % 101;
    const x = (lane / 100) * w + Math.sin(t * 0.0012 + i) * 28;
    const y = ((i * 53 + t * (0.018 + (i % 5) * 0.006)) % (h + 140)) - 70;
    const radius = 2 + (i % 6) * 1.1;
    ctx.globalAlpha = 0.08 + (i % 4) * 0.035;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 0.8, radius * (1.2 + (i % 3) * 0.7), 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawLiquidPaint(ctx, t, w, h, palette = "cyan") {
  const cyan = palette === "red" ? "rgba(239,23,47,ALPHA)" : "rgba(19,214,255,ALPHA)";
  const warm = palette === "cream" ? "rgba(239,230,204,ALPHA)" : "rgba(255,255,255,ALPHA)";
  const dark = "rgba(4,6,7,ALPHA)";
  const accent = palette === "red" ? "rgba(255,255,255,ALPHA)" : "rgba(239,23,47,ALPHA)";
  const flow = Math.sin(t * 0.00072);
  const flowB = Math.cos(t * 0.00058);

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  drawLiquidBlob(ctx, w * (0.18 + flow * 0.08), h * (0.28 + flowB * 0.08), w * 0.42, h * 0.48, cyan, 0.72, -0.4 + flow * 0.28);
  drawLiquidBlob(ctx, w * (0.76 + flowB * 0.07), h * (0.66 + flow * 0.08), w * 0.36, h * 0.42, palette === "cream" ? dark : warm, palette === "cream" ? 0.66 : 0.46, 0.35 + flowB * 0.32);
  drawLiquidBlob(ctx, w * (0.52 + Math.sin(t * 0.00047) * 0.09), h * (0.5 + Math.cos(t * 0.00051) * 0.08), w * 0.52, h * 0.28, accent, 0.22, -0.22);
  drawLiquidBlob(ctx, w * (0.42 + Math.cos(t * 0.00062) * 0.16), h * (0.82 + Math.sin(t * 0.0008) * 0.08), w * 0.5, h * 0.18, cyan, 0.32, 0.08);
  ctx.globalCompositeOperation = "lighter";
  drawPaintRibbon(ctx, t, w, h, palette === "red" ? "#ef172f" : "#13d6ff", 0.34, 0.2, -0.18);
  drawPaintRibbon(ctx, t * 0.82, w, h, palette === "red" ? "#ffffff" : "#efe6cc", 0.24, 1.4, 0.2);
  drawPaintRibbon(ctx, t * 1.08, w, h, palette === "red" ? "#ef172f" : "#13d6ff", 0.38, 2.1, 0.06);
  drawPaintDrips(ctx, t, w, h, palette === "red" ? "#ef172f" : "#13d6ff", 52);
  drawPaintDrips(ctx, t * 0.7, w, h, "#ffffff", 28);
  ctx.restore();
}

function drawCyanInk(ctx, t, w, h) {
  drawLiquidPaint(ctx, t, w, h, "cyan");
  drawInkBlob(ctx, w * (0.18 + Math.sin(t * 0.0007) * 0.04), h * 0.28, w * 0.26, "rgba(19,214,255,ALPHA)", 0.72);
  drawInkBlob(ctx, w * (0.74 + Math.cos(t * 0.0009) * 0.05), h * 0.68, w * 0.22, "rgba(239,230,204,ALPHA)", 0.58);
  const sweep = ((t * 0.085) % (w * 1.8)) - w * 0.4;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.34, -h * 0.12, "#13d6ff", 10, 0.55);
  drawGlowLine(ctx, sweep + w * 0.42, h * 1.04, sweep + w * 0.72, -h * 0.16, "#ffffff", 4, 0.28);
}

function drawRedLaser(ctx, t, w, h) {
  drawLiquidPaint(ctx, t, w, h, "red");
  const sweep = ((t * 0.12) % (w * 1.7)) - w * 0.36;
  drawGlowLine(ctx, sweep, h * 1.1, sweep + w * 0.22, -h * 0.2, "#ef172f", 8, 0.9);
  drawGlowLine(ctx, -w * 0.1, h * (0.68 + Math.sin(t * 0.0012) * 0.08), w * 1.05, h * (0.48 + Math.cos(t * 0.001) * 0.05), "#ef172f", 5, 0.76);
  drawGlowLine(ctx, w * 0.18, h * 1.12, w * 0.84, -h * 0.1, "#ffffff", 3, 0.25);
  drawHalftone(ctx, t, w, h, "rgba(239,23,47,0.18)");
}

function drawCreamWipe(ctx, t, w, h) {
  drawLiquidPaint(ctx, t, w, h, "cream");
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
  drawLiquidPaint(ctx, t, w, h, "cyan");
  drawInkBlob(ctx, w * (0.28 + Math.sin(t * 0.0008) * 0.1), h * 0.62, w * 0.32, "rgba(255,255,255,ALPHA)", 0.24);
  drawInkBlob(ctx, w * (0.7 + Math.cos(t * 0.0009) * 0.1), h * 0.35, w * 0.26, "rgba(19,214,255,ALPHA)", 0.2);
  drawGlowLine(ctx, ((t * 0.08) % (w * 1.4)) - w * 0.2, h * 1.1, ((t * 0.08) % (w * 1.4)) + w * 0.16, -h * 0.1, "#ffffff", 7, 0.28);
}

function drawWhiteFlash(ctx, t, w, h) {
  drawLiquidPaint(ctx, t, w, h, "cream");
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

function drawClientHalftone(ctx, t, w, h, color = "rgba(19,214,255,0.34)") {
  ctx.save();
  const gap = 18;
  for (let y = h * 0.08; y < h * 0.94; y += gap) {
    for (let x = w * 0.58; x < w * 1.02; x += gap) {
      const edgeFade = Math.min(1, Math.max(0, (x - w * 0.58) / (w * 0.22)));
      const pulse = 0.65 + Math.sin(t * 0.0018 + x * 0.017 + y * 0.021) * 0.35;
      ctx.globalAlpha = 0.07 + edgeFade * pulse * 0.22;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + Math.sin(t * 0.0009 + y) * 6, y, 1.6 + pulse * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawClientPaintLoop(ctx, t, w, h, variant = "cyan") {
  const isDark = variant === "dark" || variant === "red";
  const isRed = variant === "red";
  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  const base = ctx.createLinearGradient(0, 0, w, h);
  if (isDark) {
    base.addColorStop(0, "#030607");
    base.addColorStop(0.54, "#071015");
    base.addColorStop(1, "#020303");
  } else {
    base.addColorStop(0, "#efe6cc");
    base.addColorStop(0.54, "#f6efd9");
    base.addColorStop(1, "#101316");
  }
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  const flow = Math.sin(t * 0.00055);
  const sweep = ((t * 0.035) % (w * 1.35)) - w * 0.25;
  const mainColor = isRed ? "rgba(239,23,47,ALPHA)" : "rgba(19,214,255,ALPHA)";
  const secondary = isRed ? "rgba(255,255,255,ALPHA)" : "rgba(239,230,204,ALPHA)";

  drawLiquidBlob(ctx, w * (0.18 + flow * 0.06), h * 0.42, w * 0.42, h * 0.54, mainColor, isDark ? 0.48 : 0.72, -0.18);
  drawLiquidBlob(ctx, w * (0.72 - flow * 0.04), h * 0.6, w * 0.34, h * 0.32, secondary, isDark ? 0.28 : 0.54, 0.2);

  ctx.globalAlpha = isDark ? 0.42 : 0.72;
  ctx.fillStyle = isRed ? "#ef172f" : "#13d6ff";
  ctx.beginPath();
  ctx.moveTo(sweep - w * 0.24, h * 0.22);
  ctx.bezierCurveTo(sweep + w * 0.18, h * 0.08, sweep + w * 0.38, h * 0.46, sweep + w * 0.88, h * 0.28);
  ctx.lineTo(sweep + w * 0.95, h * 0.48);
  ctx.bezierCurveTo(sweep + w * 0.5, h * 0.66, sweep + w * 0.19, h * 0.42, sweep - w * 0.28, h * 0.62);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.globalCompositeOperation = "lighter";
  drawPaintRibbon(ctx, t * 0.72, w, h, isRed ? "#ef172f" : "#13d6ff", isDark ? 0.2 : 0.28, 0.6, -0.08);
  drawPaintRibbon(ctx, t * 0.58, w, h, "#ffffff", isDark ? 0.1 : 0.18, 1.8, 0.18);
  drawClientHalftone(ctx, t, w, h, isRed ? "rgba(239,23,47,0.34)" : "rgba(19,214,255,0.34)");
  drawPaintDrips(ctx, t * 0.42, w, h, isRed ? "#ef172f" : "#13d6ff", 18);
  ctx.restore();
}

function drawLoopFrame(t) {
  const rect = stage.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  loopCtx.clearRect(0, 0, w, h);
  loopCtx.save();
  if (state.backgroundId === "cyan-ink") {
    drawClientPaintLoop(loopCtx, t, w, h, "cyan");
  } else if (state.backgroundId === "cream-wipe") {
    drawClientPaintLoop(loopCtx, t, w, h, "cream");
  } else if (state.backgroundId === "stage-burst") {
    drawClientPaintLoop(loopCtx, t, w, h, "dark");
  } else if (state.backgroundId === "red-laser") {
    drawClientPaintLoop(loopCtx, t, w, h, "red");
  } else if (state.backgroundId === "halftone-pulse") {
    drawClientPaintLoop(loopCtx, t, w, h, "dark");
    drawHalftone(loopCtx, t, w, h);
  } else if (state.backgroundId === "signal-tunnel") {
    drawClientPaintLoop(loopCtx, t, w, h, "dark");
    drawClientHalftone(loopCtx, t, w, h);
  } else if (state.backgroundId === "smoke-sweep") {
    drawClientPaintLoop(loopCtx, t, w, h, "cream");
    drawSmoke(loopCtx, t, w, h);
  } else if (state.backgroundId === "white-flash") {
    drawClientPaintLoop(loopCtx, t, w, h, "cream");
  } else if (state.backgroundId === "particle-field") {
    drawClientPaintLoop(loopCtx, t, w, h, "dark");
    drawParticles(loopCtx, t, w, h, 0.45);
  } else if (state.backgroundId === "blade-storm") {
    drawClientPaintLoop(loopCtx, t, w, h, "red");
  } else if (state.backgroundId === "electric-grid") {
    drawClientPaintLoop(loopCtx, t, w, h, "dark");
  } else if (state.backgroundId === "slash-tunnel") {
    drawClientPaintLoop(loopCtx, t, w, h, "cyan");
  } else {
    drawClientPaintLoop(loopCtx, t, w, h, "cyan");
  }
  loopCtx.restore();
  requestAnimationFrame(drawLoopFrame);
}

function markSvg(option) {
  const common = `viewBox="0 0 240 120" role="img" aria-label="${option.name} mark"`;
  const type = option.mark;
  if (option.asset) {
    return `<div class="logo-mark generated-logo-mark" style="--accent:${option.accent}"><img src="${option.asset}" alt="${option.name} mark" /></div>`;
  }
  const shadow = `<path class="mark-shadow" d="M34 96h175l-13 13H19z"/>`;
  const spark = (accent = "var(--accent)") => `<path fill="${accent}" d="M29 99h162l-15 12H11z"/>`;
  const loopOutline = (width = 8, color = "currentColor", opacity = 0.82) =>
    `<path d="M118 60C98 38 78 27 58 27C38 27 24 40 24 60C24 81 39 93 60 93C82 93 99 78 118 60" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/><path d="M122 60C141 42 158 27 180 27C201 27 216 40 216 60C216 80 202 93 182 93C160 93 141 82 122 60" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
  const loopLetters = (width = 10, color = "currentColor") =>
    `<g fill="${color}"><path d="M52 82V39h13l20 19 20-19h13v43h-13V58L90 76H80L65 58v24z"/><path d="M146 39h14v30h31v13h-45z"/></g>`;
  const loopDiagonal = (width = 10, color = "currentColor", opacity = 1) =>
    `<path d="M103 78 150 39" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="square" opacity="${opacity}"/>`;
  const loopCut = (color = "var(--accent)") =>
    `<path fill="${color}" d="M37 85 207 38 195 53 25 99z"/>`;

  const loopOriginal = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.78)}${loopDiagonal(6, "currentColor", 0.55)}${loopLetters()}</svg>`;

  const loopBold = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(10, "currentColor", 0.72)}${loopDiagonal(7, "currentColor", 0.45)}${loopLetters()}<path d="M136 85h54" stroke="currentColor" stroke-width="6" stroke-linecap="square"/></svg>`;

  const loopRedCut = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.76)}${loopCut("#ef172f")}${loopDiagonal(5, "currentColor", 0.38)}${loopLetters()}</svg>`;

  const loopCyanCut = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.76)}${loopCut("#13d6ff")}${loopDiagonal(5, "currentColor", 0.38)}${loopLetters()}</svg>`;

  const loopHard = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M23 61 45 29h42l33 31 33-31h42l23 32-24 31h-40l-34-31-34 31H45z" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="miter" opacity=".72"/>${loopLetters()}</svg>`;

  const loopCircle = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M59 25a35 35 0 1 0 0 70c22 0 40-19 61-35 21-16 39-35 61-35a35 35 0 1 1 0 70c-22 0-41-19-61-35C100 44 81 25 59 25Z" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".72"/>${loopDiagonal(5, "currentColor", 0.38)}${loopLetters()}</svg>`;

  const loopUnderline = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.76)}${loopDiagonal(5, "currentColor", 0.38)}${loopLetters()}<path fill="#ef172f" d="M52 98h145l-13 12H38z"/></svg>`;

  const loopChrome = () =>
    `<svg ${common} class="ml-loop-mark"><defs><linearGradient id="chrome-${option.id}" x1="0" x2="1"><stop offset="0" stop-color="currentColor"/><stop offset=".45" stop-color="#9aa4ad"/><stop offset=".62" stop-color="currentColor"/><stop offset="1" stop-color="#eef7ff"/></linearGradient></defs>${loopOutline(8, `url(#chrome-${option.id})`, 0.78)}${loopDiagonal(5, `url(#chrome-${option.id})`, 0.42)}${loopLetters(10, `url(#chrome-${option.id})`)}</svg>`;

  const loopNeon = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M118 60C98 38 78 27 58 27C38 27 24 40 24 60C24 81 39 93 60 93C82 93 99 78 118 60M122 60C141 42 158 27 180 27C201 27 216 40 216 60C216 80 202 93 182 93C160 93 141 82 122 60" fill="none" stroke="#13d6ff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity=".24"/>${loopOutline(7, "currentColor", 0.8)}${loopDiagonal(5, "currentColor", 0.38)}${loopLetters()}<path fill="#13d6ff" d="M42 100h154l-11 10H29z"/></svg>`;

  const loopCompact = () =>
    `<svg ${common} class="ml-loop-mark" viewBox="0 0 240 120">${loopOutline(7, "currentColor", 0.76)}${loopDiagonal(5, "currentColor", 0.35)}${loopLetters()}</svg>`;

  const loopStage = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.76)}${loopDiagonal(5, "currentColor", 0.36)}${loopLetters()}<path fill="#ef172f" d="M14 57h61l-11 12H3zm158 0h65l-13 12h-66z"/></svg>`;

  const loopMono = () =>
    `<svg ${common} class="ml-loop-mark">${loopOutline(8, "currentColor", 0.78)}${loopDiagonal(5, "currentColor", 0.35)}${loopLetters()}</svg>`;

  const blockLetters = (color = "currentColor") =>
    `<g fill="${color}"><path d="M34 90 55 30h25l39 37 39-37h28l-20 60h-24l11-34-29 30h-13L82 56 70 90z"/><path d="M164 30h29l-14 39h39l-8 21h-69z"/></g>`;

  const splitRings = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M61 25a35 35 0 1 0 0 70a35 35 0 1 0 0-70" fill="none" stroke="currentColor" stroke-width="8" opacity=".78"/><path d="M179 25a35 35 0 1 0 0 70a35 35 0 1 0 0-70" fill="none" stroke="currentColor" stroke-width="8" opacity=".78"/><path fill="currentColor" d="M48 79V42h12l20 19 20-19h12v37H99V60L84 76h-8L61 60v19zM149 42h14v25h31v12h-45z"/><path fill="#ef172f" d="M95 82 198 34l-14 16L82 97z"/></svg>`;

  const linkedCapsule = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M30 60c0-22 14-34 38-34h33l19 20 19-20h33c24 0 38 12 38 34s-14 34-38 34h-33l-19-20-19 20H68c-24 0-38-12-38-34Z" fill="none" stroke="currentColor" stroke-width="8" opacity=".74"/><path fill="currentColor" d="M52 80V40h13l20 20 20-20h13v40h-13V58L89 76h-8L65 58v22zM148 40h14v27h30v13h-44z"/><path fill="#13d6ff" d="M108 91h84l-11 11H96z"/></svg>`;

  const blockItalic = () =>
    `<svg ${common} class="ml-loop-mark"><path class="mark-shadow" d="M34 95h176l-13 13H18z"/>${blockLetters("currentColor")}<path fill="#ef172f" d="M25 96h170l-12 12H12z"/><path fill="#ef172f" d="M172 26h47l-17 14h-35z"/></svg>`;

  const framedBadge = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M32 24h176l-22 72H32z" fill="none" stroke="currentColor" stroke-width="8" opacity=".82"/><path fill="currentColor" d="M55 80V41h14l20 20 20-20h14v39h-14V59L93 76h-8L69 59v21zM150 41h15v27h31v12h-46z"/><path fill="var(--accent)" d="M42 92h145l-10 11H31z"/></svg>`;

  const twinCircle = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M61 60m-37 0a37 37 0 1 0 74 0a37 37 0 1 0-74 0M179 60m-37 0a37 37 0 1 0 74 0a37 37 0 1 0-74 0" fill="none" stroke="currentColor" stroke-width="7" opacity=".78"/><path fill="currentColor" d="M43 79V42h12l20 20 20-20h12v37H95V61L80 76h-8L56 61v18zM150 42h14v25h30v12h-44z"/><path fill="#ef172f" d="M99 77 143 43l7 8-43 34z"/></svg>`;

  const razorBox = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M31 29h178v62H31z" fill="none" stroke="currentColor" stroke-width="6" opacity=".75"/><path fill="currentColor" d="M45 83V37h17l24 22 24-22h17v46h-16V59L91 80H80L60 59v24zM151 37h17v30h35v16h-52z"/><path fill="#ef172f" d="M16 76 226 35l-17 18L6 91z"/></svg>`;

  const ribbonLink = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M30 83c30-48 55-57 90-23s61 27 91-22" fill="none" stroke="#13d6ff" stroke-width="11" stroke-linecap="round" opacity=".72"/><path d="M30 38c30 49 57 55 90 22s61-27 91 23" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" opacity=".82"/><path fill="currentColor" d="M54 80V42h13l19 19 19-19h13v38h-13V60L90 76h-8L67 60v20zM148 42h14v26h30v12h-44z"/></svg>`;

  const stageDiamond = () =>
    `<svg ${common} class="ml-loop-mark"><path d="M120 17 212 60 120 103 28 60z" fill="none" stroke="currentColor" stroke-width="8" opacity=".72"/><path fill="currentColor" d="M57 80V41h14l49 35 49-35h15v39h-15V59l-42 28h-14L72 59v21z"/><path fill="var(--accent)" d="M139 42h43l-13 12h-31z"/></svg>`;

  const slashMl = () =>
    `<svg ${common} class="ml-loop-mark"><path fill="currentColor" d="M30 88 56 31h31l33 32 33-32h56l-42 57h-34l18-28-27 24h-12L85 60 72 88zM163 31h49l-15 20h-22l-27 37h-31l13-20h16z"/><path fill="#ef172f" d="M14 76 220 37l-17 18L4 91z"/></svg>`;

  const cleanMono = () =>
    `<svg ${common} class="ml-loop-mark"><path fill="currentColor" d="M43 84V36h16l61 38 61-38h16v48h-17V58l-52 31h-16L60 58v26z"/><path d="M31 27h178M31 94h178" stroke="currentColor" stroke-width="6" opacity=".58"/></svg>`;

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
    "reference-loop": loopOriginal(),
    "infinity-blade": loopRedCut(),
    "liquid-link": ribbonLink(),
    "arena-badge": framedBadge(),
    "chrome-block": chromeMark("currentColor", "currentColor", "#f0142f"),
    "red-wing": wingMark("#f0142f", "currentColor", "#f0142f"),
    "cyan-wing": wingMark("#13d6ff", "currentColor", "#13d6ff"),
    "diamond-link": stageDiamond(),
    "bolt-link": boltMark("#f0142f", "currentColor", "#f0142f"),
    "orbit-ml": loopCircle(),
    "wide-motorsport": wideMark("#f0142f", "currentColor", "#f0142f"),
    "hex-cut": frameMark("currentColor", "currentColor", "#13d6ff"),
    "ribbon-ml": linkedCapsule(),
    "slash-mono": slashMl(),
    "twin-lens": twinCircle(),
    "stage-crown": blockItalic(),
    "minimal-link": cleanMono(),
    "paint-strike": loopCyanCut(),
    "loop-original": loopOriginal(),
    "loop-bold": loopBold(),
    "loop-red-cut": loopRedCut(),
    "loop-cyan-cut": loopCyanCut(),
    "loop-hard": loopHard(),
    "loop-circle": loopCircle(),
    "loop-underline": loopUnderline(),
    "loop-chrome": loopChrome(),
    "loop-neon": loopNeon(),
    "loop-compact": loopCompact(),
    "loop-stage": loopStage(),
    "loop-mono": loopMono(),
    "split-rings": splitRings(),
    "linked-capsule": linkedCapsule(),
    "block-italic": blockItalic(),
    "framed-badge": framedBadge(),
    "twin-circle": twinCircle(),
    "razor-box": razorBox(),
    "ribbon-link": ribbonLink(),
    "stage-diamond": stageDiamond(),
    "slash-ml": slashMl(),
    "clean-mono": cleanMono(),
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

  return `<div class="logo-mark" style="--accent:${option.accent}">${templates[type]}</div>`;
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
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error(result.message || `Feedback send failed: ${response.status}`);
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
    selectionOutput.textContent = `${text}\n\nStatus: feedback send needs setup. Use the newest FormSubmit activation email, then send again from the live site.`;
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
