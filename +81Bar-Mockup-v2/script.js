const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const toast = document.querySelector("[data-toast]");
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const lazyVideos = [...document.querySelectorAll("[data-lazy-video]")];
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
const canvas = document.querySelector("[data-atmosphere]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

const setMenuState = (open) => {
  nav?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

const revealHashTarget = () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  target?.classList.add("visible");
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
revealHashTarget();
window.addEventListener("hashchange", revealHashTarget);

menuToggle?.addEventListener("click", () => {
  setMenuState(!nav?.classList.contains("open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuState(false);
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting && !reducedMotion) {
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src;
          }

          video.play().catch(() => {});
          return;
        }

        video.pause();
      });
    },
    { rootMargin: "180px 0px", threshold: 0.16 },
  );

  lazyVideos.forEach((video) => videoObserver.observe(video));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const updateParallax = () => {
  if (reducedMotion || !parallaxItems.length) return;

  const center = window.innerHeight / 2;

  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const offset = Math.max(-18, Math.min(18, (center - itemCenter) * 0.035));
    item.style.setProperty("--parallax-y", `${offset}px`);
  });
};

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax, { passive: true });
updateParallax();

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 3400);
  event.currentTarget.reset();
});

const drawAtmosphere = () => {
  if (!canvas || reducedMotion) return;

  const context = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const motes = Array.from({ length: 28 }, () => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.00045 + Math.random() * 0.0007,
    size: 0.8 + Math.random() * 2.4,
    hue: Math.random() > 0.62 ? 37 : 5,
  }));
  let width = 0;
  let height = 0;
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

    motes.forEach((mote) => {
      mote.y -= mote.speed;
      mote.x += Math.sin(frame * 0.008 + mote.y * 18) * 0.00042;

      if (mote.y < -0.05) {
        mote.y = 1.08;
        mote.x = Math.random();
      }

      context.beginPath();
      context.fillStyle = `hsla(${mote.hue}, 62%, 62%, 0.3)`;
      context.arc(mote.x * width, mote.y * height, mote.size, 0, Math.PI * 2);
      context.fill();
    });

    window.requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  tick();
};

drawAtmosphere();
