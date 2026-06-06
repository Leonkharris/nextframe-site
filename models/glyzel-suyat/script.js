const bookingForm = document.querySelector("[data-booking-form]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
