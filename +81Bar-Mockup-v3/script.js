const header = document.querySelector("[data-header]");
const mobileBar = document.querySelector("[data-mobile-bar]");
const toast = document.querySelector("[data-toast]");
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const lazyVideos = [...document.querySelectorAll("[data-lazy-video]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setChromeState = () => {
  const pastHero = window.scrollY > window.innerHeight * 0.7;
  header?.classList.toggle("scrolled", window.scrollY > 24);
  mobileBar?.classList.toggle("show", pastHero);
};

window.addEventListener("scroll", setChromeState, { passive: true });
setChromeState();

const revealHashTarget = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  target?.classList.add("visible");
};

const alignHashTarget = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.setTimeout(() => {
    window.scrollTo({
      top: Math.max(target.offsetTop - 24, 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setChromeState();
  }, 80);
};

revealHashTarget();
alignHashTarget();
window.addEventListener("hashchange", () => {
  revealHashTarget();
  alignHashTarget();
});
window.addEventListener("load", alignHashTarget);

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
  window.setTimeout(() => toast?.classList.remove("show"), 3600);
  event.currentTarget.reset();
});

// Force play all autoplay videos on load and on first user interaction (safeguard against strict browser autoplay blocks)
const forcePlayAutoplayVideos = () => {
  const autoplayVideos = document.querySelectorAll("video[autoplay]");
  autoplayVideos.forEach((video) => {
    if (video.paused) {
      video.play().catch(() => {});
    }
  });
};

window.addEventListener("load", forcePlayAutoplayVideos);
document.addEventListener("DOMContentLoaded", forcePlayAutoplayVideos);

const triggerPlayOnInteraction = () => {
  forcePlayAutoplayVideos();
  document.removeEventListener("click", triggerPlayOnInteraction);
  document.removeEventListener("touchstart", triggerPlayOnInteraction);
  document.removeEventListener("scroll", triggerPlayOnInteraction);
};
document.addEventListener("click", triggerPlayOnInteraction);
document.addEventListener("touchstart", triggerPlayOnInteraction);
document.addEventListener("scroll", triggerPlayOnInteraction, { passive: true });
