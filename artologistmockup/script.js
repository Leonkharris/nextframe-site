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

  // ── hero scroll-pinned scene progress (Dream Land style) ─
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

      // Scene 1: visible 0 → 0.45, scales 1 → 1.2 (camera zoom-in)
      const s1Fade = 1 - ramp(p, 0.30, 0.50);
      const s1Scale = lerp(1.0, 1.22, ramp(p, 0.0, 0.55));

      // Scene 2: fades in 0.30 → 0.50, holds, fades out 0.70 → 0.90
      const s2In = ramp(p, 0.30, 0.50);
      const s2Out = 1 - ramp(p, 0.70, 0.90);
      const s2Fade = Math.min(s2In, s2Out);
      const s2Scale = lerp(0.94, 1.0, ramp(p, 0.30, 0.55));

      // Scene 3: fades in 0.65 → 0.92
      const s3Fade = ramp(p, 0.65, 0.92);
      const s3Y = lerp(80, 0, ramp(p, 0.65, 0.95));

      heroScroll.style.setProperty('--p', p.toFixed(3));
      heroScroll.style.setProperty('--scene1-o', s1Fade.toFixed(3));
      heroScroll.style.setProperty('--scene1-s', s1Scale.toFixed(3));
      heroScroll.style.setProperty('--scene2-o', s2Fade.toFixed(3));
      heroScroll.style.setProperty('--scene2-s', s2Scale.toFixed(3));
      heroScroll.style.setProperty('--scene3-o', s3Fade.toFixed(3));
      heroScroll.style.setProperty('--scene3-y', `${s3Y.toFixed(1)}px`);

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
