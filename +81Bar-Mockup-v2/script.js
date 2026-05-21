const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const toast = document.querySelector("[data-toast]");
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const lazyVideos = [...document.querySelectorAll("[data-lazy-video]")];
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

const alignHashTarget = () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  const align = () => window.scrollTo({ top: target.offsetTop, behavior: "auto" });
  window.setTimeout(align, 80);
  window.setTimeout(align, 420);
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
revealHashTarget();
alignHashTarget();
window.addEventListener("hashchange", revealHashTarget);
window.addEventListener("hashchange", alignHashTarget);
window.addEventListener("load", alignHashTarget);

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

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 3400);
  event.currentTarget.reset();
});
