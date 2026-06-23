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
