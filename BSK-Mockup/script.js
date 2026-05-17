const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const cursorLight = document.querySelector("[data-cursor-light]");
const toast = document.querySelector("[data-toast]");
const packageResult = document.querySelector("[data-package-result]");
const packageButtons = [...document.querySelectorAll("[data-package]")];
const deckCards = [...document.querySelectorAll("[data-deck-card]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const canvas = document.querySelector("[data-fx-canvas]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const packageCopy = {
  table: {
    title: "VIP Table",
    text: "Best for groups who want a reserved spot, bottle service, and a smoother entrance path before arrival.",
  },
  birthday: {
    title: "Birthday Night",
    text: "For celebrants who want the night to feel planned, photogenic, and easy for friends to join.",
  },
  event: {
    title: "Private Event",
    text: "For brand nights, crew takeovers, and private bookings that need a room, floor energy, and a clear guest path.",
  },
};

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

menuToggle?.addEventListener("click", () => {
  const open = !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.package;
    const copy = packageCopy[key];

    packageButtons.forEach((item) => item.classList.toggle("active", item === button));

    if (copy && packageResult) {
      packageResult.innerHTML = `<strong>${copy.title}</strong><span>${copy.text}</span>`;
    }
  });
});

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 3200);
  event.currentTarget.reset();
});

document.addEventListener("pointermove", (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  document.documentElement.style.setProperty("--mx", x);
  document.documentElement.style.setProperty("--my", y);
});

document.querySelectorAll("[data-tilt-card]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--ry", `${x * 7}deg`);
    card.style.setProperty("--rx", `${y * -7}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

let activeDeck = 0;

if (!reducedMotion && deckCards.length > 1) {
  window.setInterval(() => {
    deckCards[activeDeck].classList.remove("active");
    activeDeck = (activeDeck + 1) % deckCards.length;
    deckCards[activeDeck].classList.add("active");
  }, 2200);
}

const drawFx = () => {
  if (!canvas || reducedMotion) return;

  const context = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.001 + Math.random() * 0.0018,
    size: 0.8 + Math.random() * 2.4,
    hue: Math.random() > 0.45 ? 315 : 210,
  }));
  let width = 0;
  let height = 0;
  let raf = 0;
  let frame = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const tick = () => {
    frame += 1;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += Math.sin(frame * 0.01 + particle.y * 20) * 0.0006;

      if (particle.y < -0.05) {
        particle.y = 1.08;
        particle.x = Math.random();
      }

      context.beginPath();
      context.fillStyle = `hsla(${particle.hue}, 100%, 68%, 0.42)`;
      context.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2);
      context.fill();
    });

    for (let i = 0; i < 5; i += 1) {
      const y = ((frame * (0.3 + i * 0.06) + i * 180) % (height + 220)) - 110;
      const gradient = context.createLinearGradient(0, y, width, y + 80);
      gradient.addColorStop(0, "rgba(255, 60, 199, 0)");
      gradient.addColorStop(0.5, "rgba(255, 60, 199, 0.16)");
      gradient.addColorStop(1, "rgba(63, 186, 255, 0)");

      context.strokeStyle = gradient;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-80, y + i * 18);
      context.lineTo(width + 80, y + 96 - i * 10);
      context.stroke();
    }

    raf = window.requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  tick();

  return () => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
};

drawFx();
