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

const backgroundOptions = [
  { id: "cyan-ink", name: "Cyan Ink Wipe", className: "bg-cyan-ink", thumb: "thumb-cyan-ink" },
  { id: "particle-field", name: "Particle Field", className: "bg-particle-field", thumb: "thumb-particle-field" },
  { id: "cream-wipe", name: "Cream Blue Wipe", className: "bg-cream-wipe", thumb: "thumb-cream-wipe" },
  { id: "red-laser", name: "Red Laser Sweep", className: "bg-red-laser", thumb: "thumb-red-laser" },
  { id: "halftone-pulse", name: "Halftone Pulse", className: "bg-halftone-pulse", thumb: "thumb-halftone-pulse" },
  { id: "signal-tunnel", name: "Signal Tunnel", className: "bg-signal-tunnel", thumb: "thumb-signal-tunnel" },
  { id: "smoke-sweep", name: "Smoke Light Sweep", className: "bg-smoke-sweep", thumb: "thumb-smoke-sweep" },
  { id: "white-flash", name: "White Flash Reveal", className: "bg-white-flash", thumb: "thumb-white-flash" },
];

const state = {
  logoId: "A",
  backgroundId: "cyan-ink",
  animate: true,
  darkLogo: false,
  notes: JSON.parse(localStorage.getItem("manuelLegendNotes") || "{}"),
};

const recipientEmail = "hello@next-frame.agency";

const stage = document.getElementById("stage");
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

function markSvg(option) {
  const common = `viewBox="0 0 240 120" role="img" aria-label="${option.name} mark"`;
  const type = option.mark;

  const templates = {
    "ml-red-white": `<svg ${common}><path class="mark-red" d="M18 92 48 25h40l34 39 30-39h70l-54 67h-43l26-35-38 35h-20L75 56 60 92z"/><path class="mark-white" d="M138 25h84l-54 67h-48z"/><path class="mark-shadow" d="M57 92h111l-8 12H49z"/></svg>`,
    "ml-cyan-white": `<svg ${common}><path class="mark-white" d="M20 92 52 26h39l30 38 32-38h66l-52 66h-42l23-34-35 34H93L76 58 62 92z"/><path class="mark-cyan" d="M137 25h19l-40 67H97zM181 25h38l-51 67h-28z"/></svg>`,
    "ml-red-wing": `<svg ${common}><path class="mark-red" d="M17 91 52 25h39l30 35 30-35h28l-52 66h-31L76 59 61 91z"/><path class="mark-white" d="M150 25h72l-55 66h-45z"/><path class="mark-white" d="M190 36h36l-24 18h-29z"/></svg>`,
    "ml-white-sharp": `<svg ${common}><path class="mark-white" d="M18 90 50 27h40l30 34 31-34h72l-55 63h-43l25-30-34 30H94L76 59 61 90z"/><path class="mark-accent" d="M39 101h160l-15 12H23z"/></svg>`,
    "ml-blue-bolt": `<svg ${common}><path class="mark-white" d="M22 91 51 25h38l31 39 32-39h65l-52 66h-42l22-35-34 35H92L75 56 61 91z"/><path class="mark-cyan" d="m130 10-31 48h26l-20 52 62-70h-31z"/></svg>`,
    "ml-red-bar": `<svg ${common}><path class="mark-red" d="M18 88 48 31h47l25 33 30-33h65l-48 57h-42l20-29-30 29H94L75 61 61 88z"/><path class="mark-white" d="M150 31h65l-48 57h-42z"/><path class="mark-red" d="M28 19h177l-11 13H17zm-8 72h183l-13 14H7z"/></svg>`,
    "ml-loop-cut": `<svg ${common}><path class="mark-cyan-stroke" d="M27 61 C50 24 86 24 120 60 C154 96 190 96 213 59"/><path class="mark-white-stroke" d="M27 59 C50 96 86 96 120 60 C154 24 190 24 213 61"/><path class="mark-white" d="M111 35h18v50h-18z"/></svg>`,
    "ml-white-wing": `<svg ${common}><path class="mark-white" d="M15 91 49 25h41l31 37 31-37h72l-54 66h-45l25-33-36 33H94L75 58 60 91z"/><path class="mark-accent" d="M31 97h177l-22 15H10z"/></svg>`,
    "ml-red-apex": `<svg ${common}><path class="mark-red" d="M20 90 55 24h40l27 38 31-38h67l-52 66h-43l24-33-35 33H94L76 58 61 90z"/><path class="mark-white" d="M147 24h73l-52 66h-43z"/><path class="mark-red" d="M42 14h175l-25 15H31z"/></svg>`,
    "ml-cyan-block": `<svg ${common}><path class="mark-white" d="M22 91 51 26h39l30 38 32-38h67l-52 65h-42l22-34-33 34H93L76 57 62 91z"/><path class="mark-cyan" d="M25 52h68l-8 15H17zm119 0h79l-10 15h-82z"/></svg>`,
    "ml-box": `<svg ${common}><path class="mark-white-stroke" d="M37 24h166v72H37z"/><path class="mark-white" d="M65 82V39h31l24 26 25-26h30v43h-24V61l-24 21h-14L89 61v21z"/><path class="mark-accent" d="M204 45 230 60 204 75z"/></svg>`,
    "ml-blue-sharp": `<svg ${common}><path class="mark-white" d="M20 91 51 25h39l29 39 33-39h67l-52 66h-43l23-34-34 34H93L75 57 61 91z"/><path class="mark-cyan" d="M154 25h65l-11 14h-42z"/></svg>`,
    "ml-red-wide": `<svg ${common}><path class="mark-red" d="M13 87 46 31h50l24 31 30-31h78l-48 56h-46l19-28-34 28H92L73 62 57 87z"/><path class="mark-white" d="M151 31h77l-48 56h-46z"/></svg>`,
    "ml-shock": `<svg ${common}><path class="mark-white" d="M21 91 51 25h39l30 38 32-38h66l-52 66h-42l23-34-34 34H93L75 57 61 91z"/><path class="mark-cyan" d="m132 6-27 47h25l-17 61 48-76h-25z"/></svg>`,
    "ml-chrome": `<svg ${common}><path class="mark-white" d="M20 91 50 26h39l31 38 32-38h68l-52 65h-43l23-34-34 34H93L75 57 61 91z"/><path class="mark-shadow" d="M22 91h146l-8 11H16z"/><path class="mark-accent" d="M51 26h151l-10 12H45z"/></svg>`,
    "ml-frame": `<svg ${common}><path class="mark-white-stroke" d="M41 25h158v70H41z"/><path class="mark-white" d="M67 82V39h30l23 28 24-28h30v43h-23V61l-24 21h-14L90 61v21z"/><path class="mark-cyan" d="M44 98h152l-12 12H32z"/></svg>`,
    loop: `<svg ${common}><path class="mark-stroke" d="M30 62 C53 18 92 18 120 60 C148 102 187 102 210 58"/><path class="mark-stroke" d="M30 58 C54 102 92 102 120 60 C148 18 187 18 210 62"/><path class="mark-accent" d="M105 18h18v84h-18z"/></svg>`,
    blade: `<svg ${common}><path class="mark-fill" d="M22 96 56 20h35l31 42 31-42h54L165 96h-34l22-39-31 33h-8L84 57 65 96z"/><path class="mark-accent" d="M28 104 220 16l-18 25L10 116z"/></svg>`,
    chrome: `<svg ${common}><path class="mark-accent" d="M20 94 54 22h38l27 41 31-41h42l-31 72h-34l16-37-24 27h-10L85 57 70 94z"/><path class="mark-fill" d="M162 22h54l-52 72h-38z"/></svg>`,
    shield: `<svg ${common}><path class="mark-accent-stroke" d="M120 14 196 38 183 91 120 112 57 91 44 38z"/><path class="mark-fill" d="M67 87V34h30l23 34 24-34h29v53h-24V61l-21 24h-16L91 61v26z"/></svg>`,
    stack: `<svg ${common}><path class="mark-fill" d="M44 24h37l39 42 39-42h37v72h-31V57l-36 39h-18L75 57v39H44z"/><path class="mark-accent" d="M30 16h180v9H30zm0 79h180v9H30z"/></svg>`,
    speed: `<svg ${common}><path class="mark-fill" d="M31 90 62 26h28l31 35 31-35h58l-55 64h-34l25-28-22 21h-9L91 60 78 90z"/><path class="mark-accent" d="M0 78h72l-8 13H0zm168-44h72l-12 15h-73z"/></svg>`,
    signal: `<svg ${common}><path class="mark-stroke" d="M29 60 C51 25 82 25 119 60 C156 95 189 95 211 60"/><path class="mark-accent-stroke" d="M29 60 C51 95 82 95 119 60 C156 25 189 25 211 60"/><path class="mark-fill" d="M112 37h16v46h-16z"/></svg>`,
    stamp: `<svg ${common}><path class="mark-stroke" d="M42 25h156v70H42z"/><path class="mark-fill" d="M67 82V38h27l26 28 26-28h27v44h-21V57l-25 25h-14L88 57v25z"/></svg>`,
    angular: `<svg ${common}><path class="mark-fill" d="M34 94 60 25h37l24 43 25-43h58v22h-39l-33 47h-24L75 47 58 94z"/><path class="mark-accent" d="M132 94 194 25h22l-62 69z"/></svg>`,
    laser: `<svg ${common}><path class="mark-fill" d="M27 94 58 25h36l26 40 27-40h62L166 94h-37l20-34-24 27h-11L88 58 72 94z"/><path class="mark-accent" d="M15 25h210l-10 13H5zm-5 73h206l-12 13H0z"/></svg>`,
    crest: `<svg ${common}><path class="mark-stroke" d="M120 16 184 48v37l-64 25-64-25V48z"/><path class="mark-fill" d="M75 84V39h29l16 22 17-22h28v45h-22V63l-17 21h-12L97 63v21z"/></svg>`,
    festival: `<svg ${common}><path class="mark-fill" d="M52 96 52 28 87 28 120 69 153 28 188 28 188 96 158 96 158 67 132 96 108 96 82 67 82 96z"/><path class="mark-accent" d="M30 16h180l-24 14H54z"/></svg>`,
    wide: `<svg ${common}><path class="mark-fill" d="M13 88 45 32h50l26 32 27-32h79l-31 56h-42l17-29-34 29h-28L76 59 58 88z"/><path class="mark-accent" d="M24 95h192l-11 12H13z"/></svg>`,
    split: `<svg ${common}><path class="mark-fill" d="M37 96V24h34l50 50 49-50h34v72h-29V62l-42 34h-25L66 62v34z"/><path class="mark-accent" d="M24 50h74l-14 18H10zm118 0h85l-14 18h-88z"/></svg>`,
    premium: `<svg ${common}><path class="mark-accent-stroke" d="M120 16 201 60 120 104 39 60z"/><path class="mark-fill" d="M73 78V43h24l23 23 24-23h23v35h-18V60l-23 18h-12L91 60v18z"/></svg>`,
    column: `<svg ${common}><path class="mark-fill" d="M68 96V24h30l22 32 22-32h30v72h-25V61l-21 35h-12L93 61v35z"/><path class="mark-stroke" d="M39 19h162M39 101h162"/></svg>`,
    electric: `<svg ${common}><path class="mark-stroke" d="M28 61 C51 18 89 19 120 60 C151 101 190 102 212 59"/><path class="mark-stroke" d="M28 59 C51 102 89 101 120 60 C151 19 190 18 212 61"/><path class="mark-accent" d="m128 10-24 45h24l-17 55 42-66h-25z"/></svg>`,
    apex: `<svg ${common}><path class="mark-fill" d="M31 93 67 25h30l24 36 30-36h62L164 93h-38l23-32-27 25h-10L87 59 69 93z"/><path class="mark-accent" d="M55 20h161L187 40H43zm-29 80h159l-28 18H16z"/></svg>`,
    heavy: `<svg ${common}><path class="mark-stroke" d="M46 23h148v74H46z"/><path class="mark-fill" d="M65 84V36h31l24 29 24-29h31v48h-25V62l-23 22h-14L90 62v22z"/><path class="mark-accent" d="M31 60 52 43v34zM209 43l21 17-21 17z"/></svg>`,
    clean: `<svg ${common}><path class="mark-fill" d="M50 91V29h34l36 39 36-39h34v62h-27V62l-34 29h-18L77 62v29z"/><path class="mark-accent" d="M47 101h146v8H47z"/></svg>`,
  };

  return `<div class="logo-mark">${templates[type]}</div>`;
}

function lockupHtml(option, mini = false) {
  const slash = `<i class="slash cut-${option.cut}"></i>`;
  return `
    <div class="logo-lockup logo-style-${option.style}${mini ? "" : state.animate ? " animate" : ""}${state.darkLogo && !mini ? " dark-mode" : ""}" style="--accent:${option.accent}">
      ${markSvg(option)}
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

function selectedBackground() {
  return backgroundOptions.find((option) => option.id === state.backgroundId) || backgroundOptions[0];
}

function comboKey() {
  return `${state.logoId}__${state.backgroundId}`;
}

function renderLogoGrid() {
  logoGrid.innerHTML = logoOptions
    .map((option) => `
      <button type="button" class="logo-card${option.id === state.logoId ? " is-selected" : ""}" data-logo="${option.id}" style="--accent:${option.accent}">
        <div class="mini-logo">${lockupHtml(option, true)}</div>
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
  const logo = selectedLogo();
  const bg = selectedBackground();
  stage.className = `stage ${bg.className}`;
  document.querySelector(".stage > .logo-lockup").outerHTML = lockupHtml(logo);
  document.querySelector(".stage > .logo-lockup").id = "logoLockup";
  comboLabel.textContent = `Logo ${logo.id} + ${bg.name}`;
  notes.value = state.notes[comboKey()] || "";
  selectionOutput.textContent = outputText();
  animationToggle.textContent = state.animate ? "Animation On" : "Animation Off";
  animationToggle.classList.toggle("is-active", state.animate);
  invertToggle.textContent = state.darkLogo ? "Light Logo" : "Dark Logo";
  invertToggle.classList.toggle("is-active", state.darkLogo);
  renderLogoGrid();
  renderBackgroundGrid();
}

function outputText() {
  const logo = selectedLogo();
  const bg = selectedBackground();
  return [
    "MANUEL LEGEND SELECTION",
    `Logo: ${logo.id} - ${logo.name}`,
    `Background loop: ${bg.name}`,
    `Logo family: ${logo.family}`,
    `Animation preview: ${state.animate ? "On" : "Off"}`,
    `Logo color preview: ${state.darkLogo ? "Dark" : "Light"}`,
    `Notes: ${state.notes[comboKey()] || "(none yet)"}`,
  ].join("\n");
}

function feedbackPayload() {
  const logo = selectedLogo();
  const bg = selectedBackground();
  return {
    project: "Manuel Legend",
    format: "16:9",
    selectedLogo: `${logo.id} - ${logo.name}`,
    selectedBackground: bg.name,
    logoFamily: logo.family,
    animationPreview: state.animate,
    darkLogoPreview: state.darkLogo,
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

emailFeedback.addEventListener("click", () => {
  const logo = selectedLogo();
  const subject = encodeURIComponent(`Manuel Legend selection - Logo ${logo.id}`);
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${encodedFeedbackText()}`;
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

updatePreview();
