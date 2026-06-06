const header = document.querySelector("[data-header]");
const mobileCta = document.querySelector("[data-mobile-cta]");
const toast = document.querySelector("[data-toast]");
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setChromeState = () => {
  const pastCover = window.scrollY > window.innerHeight * 0.7;
  header?.classList.toggle("scrolled", window.scrollY > 24);
  mobileCta?.classList.toggle("show", pastCover);
};

window.addEventListener("scroll", setChromeState, { passive: true });
setChromeState();

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
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const forcePlayVideos = () => {
  if (reducedMotion) return;
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.play().catch(() => {});
  });
};

document.addEventListener("DOMContentLoaded", forcePlayVideos);
window.addEventListener("load", forcePlayVideos);
document.addEventListener("click", forcePlayVideos, { once: true });
document.addEventListener("touchstart", forcePlayVideos, { once: true, passive: true });

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 3800);
  event.currentTarget.reset();
});
