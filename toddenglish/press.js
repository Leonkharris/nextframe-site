/* Screen-only motion layer. Never runs in headless capture (navigator.webdriver)
   or for reduced-motion users, so PDF render and sheet screenshots stay static. */
(function () {
  if (navigator.webdriver) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-anim');

  // Hero parallax — cover photo drifts slower than the page, text lifts away.
  var cover = document.querySelector('.sheet--cover');
  var coverImg = document.querySelector('.cover-photo > img');
  var blocks = document.querySelector('.cover-blocks');
  var ticking = false;
  function parallax() {
    ticking = false;
    if (!cover || !coverImg) return;
    var r = cover.getBoundingClientRect();
    if (r.bottom < 0) return;
    var p = Math.min(1, Math.max(0, -r.top / r.height)); // 0 at top, 1 scrolled past
    coverImg.style.transform = 'scale(1.12) translateY(' + (p * 9) + '%)';
    if (blocks) {
      blocks.style.transform = 'translateY(' + (p * -60) + 'px)';
      blocks.style.opacity = String(1 - p * 0.9);
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }, { passive: true });
  // let the browser paint the initial scale(1.22) first, so the zoom-out transitions
  requestAnimationFrame(function () { requestAnimationFrame(parallax); });

  // Sheet reveal — each page fades up as it enters the viewport.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.sheet:not(.sheet--cover)').forEach(function (s) { io.observe(s); });
})();
