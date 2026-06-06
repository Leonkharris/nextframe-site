const bookingForm = document.querySelector("[data-booking-form]");
const siteHeader = document.querySelector("[data-header]");
const mobileCta = document.querySelector("[data-mobile-cta]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const lazyVideos = Array.from(document.querySelectorAll("[data-lazy-video]"));

document.documentElement.classList.add("reveal-ready");

const buildMailto = (form) => {
  const data = new FormData(form);
  const lines = [
    "Booking request for Glyzel Suyat",
    "",
    `Name / brand: ${data.get("name") || ""}`,
    `Project type: ${data.get("project") || ""}`,
    `Shoot date or range: ${data.get("date") || ""}`,
    `Location: ${data.get("location") || ""}`,
    `Contact: ${data.get("contact") || ""}`,
    "",
    "Brief:",
    data.get("brief") || "",
    "",
    "Portfolio page: https://next-frame.agency/models/glyzel-suyat/",
  ];

  const subject = encodeURIComponent("Booking request for Glyzel Suyat");
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:suyatglyzel@gmail.com?subject=${subject}&body=${body}`;
};

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const mailto = buildMailto(bookingForm);
  window.__lastBookingMailto = mailto;
  window.location.href = mailto;
});

const setPageChrome = () => {
  const scrolled = window.scrollY > 24;
  const pastCover = window.scrollY > window.innerHeight * 0.72;
  siteHeader?.classList.toggle("scrolled", scrolled);
  mobileCta?.classList.toggle("show", pastCover);
};

setPageChrome();
window.addEventListener("scroll", setPageChrome, { passive: true });
window.addEventListener("resize", setPageChrome);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && !reducedMotion) {
          video.muted = true;
          video.defaultMuted = true;
          video.loop = true;
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          video.play().catch(() => {});
          return;
        }
        video.pause();
      });
    },
    { rootMargin: "180px 0px", threshold: 0.18 },
  );

  lazyVideos.forEach((video) => videoObserver.observe(video));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
  lazyVideos.forEach((video) => {
    if (!reducedMotion) video.play().catch(() => {});
  });
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
document.addEventListener("touchstart", forcePlayVideos, { once: true, passive: true });
document.addEventListener("click", forcePlayVideos, { once: true });
