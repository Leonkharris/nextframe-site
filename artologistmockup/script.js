// The Artologist mockup v2 — premium gallery interactivity
(function () {
  // ── mobile menu ─────────────────────────────────────────
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ── header scroll state ─────────────────────────────────
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 32) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── scroll-reveal (IntersectionObserver) ────────────────
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ── GSAP portal parallax (Dream Land technique: 2-layer push-through) ──
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const heroScrollEl = document.querySelector('[data-hero-scroll]');
    if (heroScrollEl) {
      const portalTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroScrollEl,
          start: 'top top',
          // Portal phase ends at ~60% of total scroll — after that the sanctum + cards take over
          end: () => '+=' + (heroScrollEl.offsetHeight * 0.6),
          scrub: 1
        }
      });

      // Background: subtle 1.0 → 1.3 zoom — forces depth perception
      portalTL.to('.portal-bg', { scale: 1.3, ease: 'none' }, 0);

      // Foreground: aggressive 1.0 → 5.0 zoom + fade-out at the end
      // The CSS mask scales with the image — as it grows, the portal hole gets
      // bigger and bigger, revealing more of the background gallery behind.
      portalTL.to('.portal-fg', { scale: 5.5, opacity: 0, ease: 'none' }, 0);

      // Title fades + drifts upward as we push through
      portalTL.to('.portal-title', { opacity: 0, y: -80, ease: 'power2.in' }, 0);

      // Background fades to black in the last 30% of the portal phase so it
      // doesn't bleed through the sanctum title content
      portalTL.to('.portal-bg-wrap', { opacity: 0, ease: 'power2.in' }, 0.7);
      portalTL.to('.hero-atmosphere', { opacity: 0, ease: 'power1.in' }, 0.7);
    }
  }

  // ── hero scroll-pinned scene progress (sanctum + cards) ─
  const heroScroll = document.querySelector('[data-hero-scroll]');
  if (heroScroll) {
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    // Map progress in [s,e] to [0,1], outside returns clamped 0 or 1
    const ramp = (p, s, e) => clamp((p - s) / (e - s), 0, 1);

    let raf = null;
    const update = () => {
      const rect = heroScroll.getBoundingClientRect();
      const total = heroScroll.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const p = total > 0 ? scrolled / total : 0;

      // 5-phase arc:
      //   Scene 1 (corridor vista)   visible 0.00 → 0.18, slow zoom-in
      //   Scene 2p (doorway portal)  fades 0.16 → 0.24, holds 0.24 → 0.30, fades 0.30 → 0.36
      //   Scene 3c (threshold cross) fades 0.34 → 0.42, holds 0.42 → 0.48, fades 0.48 → 0.54
      //   Scene 2  (sanctum + title) fades 0.52 → 0.62, holds 0.62 → 0.78, fades 0.78 → 0.84
      //   Scene 3  (floating cards)  fades 0.82 → 0.94

      // SCENE 1
      const s1Fade  = 1 - ramp(p, 0.14, 0.22);
      const s1Scale = lerp(1.0, 1.18, ramp(p, 0.0, 0.22));

      // SCENE 2p (doorway portal)
      const s2pIn   = ramp(p, 0.16, 0.24);
      const s2pOut  = 1 - ramp(p, 0.30, 0.36);
      const s2pFade = Math.min(s2pIn, s2pOut);
      const s2pScale = lerp(1.05, 1.0, ramp(p, 0.16, 0.30));

      // SCENE 3c (threshold cross)
      const s3cIn   = ramp(p, 0.34, 0.42);
      const s3cOut  = 1 - ramp(p, 0.48, 0.54);
      const s3cFade = Math.min(s3cIn, s3cOut);
      const s3cScale = lerp(1.04, 1.0, ramp(p, 0.34, 0.48));

      // SCENE 2 — title hero (the sanctum, where the big title lands)
      // Appears AFTER the portal push-through completes (~60% scroll)
      const s2In   = ramp(p, 0.58, 0.72);
      const s2Out  = 1 - ramp(p, 0.84, 0.92);
      const s2Fade = Math.min(s2In, s2Out);
      const s2Scale = lerp(0.94, 1.0, ramp(p, 0.58, 0.72));

      // SCENE 3 — floating cards
      const s3Fade = ramp(p, 0.88, 0.98);
      const s3Y    = lerp(80, 0, ramp(p, 0.88, 1.00));

      // Atmosphere overlay — peaks in phase 4 (the sanctum)
      const atmFade = Math.min(ramp(p, 0.36, 0.56), 1 - ramp(p, 0.78, 0.86)) * 0.5;

      heroScroll.style.setProperty('--p', p.toFixed(3));
      heroScroll.style.setProperty('--scene1-o', s1Fade.toFixed(3));
      heroScroll.style.setProperty('--scene1-s', s1Scale.toFixed(3));
      heroScroll.style.setProperty('--scene2p-o', s2pFade.toFixed(3));
      heroScroll.style.setProperty('--scene2p-s', s2pScale.toFixed(3));
      heroScroll.style.setProperty('--scene3c-o', s3cFade.toFixed(3));
      heroScroll.style.setProperty('--scene3c-s', s3cScale.toFixed(3));
      heroScroll.style.setProperty('--scene2-o', s2Fade.toFixed(3));
      heroScroll.style.setProperty('--scene2-s', s2Scale.toFixed(3));
      heroScroll.style.setProperty('--scene3-o', s3Fade.toFixed(3));
      heroScroll.style.setProperty('--scene3-y', `${s3Y.toFixed(1)}px`);
      heroScroll.style.setProperty('--atm-o', atmFade.toFixed(3));

      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ── stat counter (count-up on reveal) ───────────────────
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (Number.isNaN(target)) return;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.round(target * easeOut(t));
        el.textContent = String(value);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  // ── hero 3D tilt on cursor ──────────────────────────────
  const tiltCard = document.querySelector('[data-tilt]');
  const tiltInner = tiltCard ? tiltCard.querySelector('.hero-card-inner') : null;
  if (tiltCard && tiltInner && !window.matchMedia('(hover: none)').matches) {
    let raf = null;
    let tx = -3, ty = 2;
    let cx = -3, cy = 2;
    let inside = false;

    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tx = (0.5 - py) * 16;
      ty = (px - 0.5) * 18;
      tiltInner.style.setProperty('--gx', `${px * 100}%`);
      tiltInner.style.setProperty('--gy', `${py * 100}%`);
      inside = true;
      if (!raf) raf = requestAnimationFrame(tickTilt);
    });
    tiltCard.addEventListener('mouseleave', () => {
      tx = -3; ty = 2;
      inside = false;
      if (!raf) raf = requestAnimationFrame(tickTilt);
    });
    const tickTilt = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      tiltInner.style.setProperty('--tilt-x', `${cx}deg`);
      tiltInner.style.setProperty('--tilt-y', `${cy}deg`);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 || inside) {
        raf = requestAnimationFrame(tickTilt);
      } else {
        raf = null;
      }
    };
  }

  // ── hero background parallax (mouse) ────────────────────
  const hero = document.querySelector('[data-hero]');
  const parallaxLayers = hero ? hero.querySelectorAll('[data-parallax]') : [];
  if (hero && parallaxLayers.length && !window.matchMedia('(hover: none)').matches) {
    let mx = 0.5, my = 0.5;
    let cx = 0.5, cy = 0.5;
    let raf = null;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
      if (!raf) raf = requestAnimationFrame(tickParallax);
    });
    hero.addEventListener('mouseleave', () => {
      mx = 0.5; my = 0.5;
      if (!raf) raf = requestAnimationFrame(tickParallax);
    });
    const tickParallax = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      parallaxLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.parallax) || 0;
        const x = (cx - 0.5) * depth * 200;
        const y = (cy - 0.5) * depth * 200;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) {
        raf = requestAnimationFrame(tickParallax);
      } else {
        raf = null;
      }
    };
  }

  // ── custom cursor ───────────────────────────────────────
  const cursor = document.querySelector('[data-cursor]');
  const isCoarse = window.matchMedia('(hover: none)').matches;
  if (cursor && !isCoarse) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x, cy = y;
    document.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
    });
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverables = document.querySelectorAll('[data-cursor-hover], a, button');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }
})();
