const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const packageButtons = document.querySelectorAll("[data-package]");
const packageResult = document.querySelector("[data-package-result]");
const bookingForm = document.querySelector("[data-booking-form]");
const toast = document.querySelector("[data-toast]");
const spotlight = document.querySelector("[data-spotlight]");
const eventTickets = Array.from(document.querySelectorAll("[data-event-ticket]"));
const tiltCards = Array.from(document.querySelectorAll("[data-tilt-card]"));
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const canvas = document.querySelector("[data-laser-canvas]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const packages = {
  lounge: {
    title: "VIP Table",
    text: "Best for 4-6 guests who want a clear spot, bottle service, and easy access to the main room.",
  },
  birthday: {
    title: "Birthday Table",
    text: "Built for birthday groups that need entrance flow, table placement, bottles, photos, and a smoother host experience.",
  },
  event: {
    title: "Private Event",
    text: "For brand nights, guest DJ appearances, company parties, and bigger groups that need a proper event coordinator.",
  },
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    packageButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selected = packages[button.dataset.package];
    packageResult.innerHTML = `<strong>${selected.title}</strong><span>${selected.text}</span>`;
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
});

const header = document.querySelector("[data-header]");

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  },
  { passive: true }
);

window.addEventListener(
  "pointermove",
  (event) => {
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    spotlight?.style.setProperty("--mx", x);
    spotlight?.style.setProperty("--my", y);
  },
  { passive: true }
);

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
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

if (eventTickets.length && !prefersReducedMotion) {
  let activeTicket = 0;

  window.setInterval(() => {
    eventTickets[activeTicket]?.classList.remove("active");
    activeTicket = (activeTicket + 1) % eventTickets.length;
    eventTickets[activeTicket]?.classList.add("active");
  }, 2200);
}

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
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (canvas && !prefersReducedMotion) {
  const context = canvas.getContext("2d");
  const lasers = Array.from({ length: 9 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.0015 + Math.random() * 0.0025,
    angle: -0.6 + Math.random() * 1.2,
    width: 80 + Math.random() * 220,
    hue: index % 3 === 0 ? 200 : 218,
  }));
  const particles = Array.from({ length: 54 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.8 + Math.random() * 2.4,
    speed: 0.0008 + Math.random() * 0.0018,
    alpha: 0.18 + Math.random() * 0.4,
  }));

  const resizeCanvas = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * pixelRatio);
    canvas.height = Math.floor(window.innerHeight * pixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const draw = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < -0.03) {
        particle.y = 1.03;
        particle.x = Math.random();
      }

      context.beginPath();
      context.fillStyle = `rgba(142, 220, 255, ${particle.alpha})`;
      context.arc(particle.x * width, particle.y * height, particle.r, 0, Math.PI * 2);
      context.fill();
    });

    lasers.forEach((laser) => {
      laser.x += Math.cos(laser.angle) * laser.speed;
      laser.y += Math.sin(laser.angle) * laser.speed;

      if (laser.x > 1.18 || laser.x < -0.18 || laser.y > 1.18 || laser.y < -0.18) {
        laser.x = Math.random() * 0.28;
        laser.y = 0.12 + Math.random() * 0.82;
        laser.angle = -0.38 + Math.random() * 0.76;
      }

      const x = laser.x * width;
      const y = laser.y * height;
      const endX = x + Math.cos(laser.angle) * laser.width;
      const endY = y + Math.sin(laser.angle) * laser.width;
      const gradient = context.createLinearGradient(x, y, endX, endY);

      gradient.addColorStop(0, "rgba(63, 140, 255, 0)");
      gradient.addColorStop(0.5, `hsla(${laser.hue}, 100%, 72%, 0.42)`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      context.beginPath();
      context.strokeStyle = gradient;
      context.lineWidth = 1.2 + Math.random() * 0.8;
      context.moveTo(x, y);
      context.lineTo(endX, endY);
      context.stroke();
    });

    requestAnimationFrame(draw);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  requestAnimationFrame(draw);
}
