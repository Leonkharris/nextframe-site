const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const toast = document.querySelector("[data-toast]");
const roomResult = document.querySelector("[data-room-result]");
const roomButtons = [...document.querySelectorAll("[data-room]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const canvas = document.querySelector("[data-fx-canvas]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobileViewport = window.matchMedia("(max-width: 760px)");
const desktopOnlyVideos = [...document.querySelectorAll("[data-desktop-video]")];
const lazyVideos = [...document.querySelectorAll("[data-lazy-video]")];

const roomCopy = {
  vip1: {
    title: "VIP Room 1",
    text: "For up to 8 guests, with early and late-night room blocks for intimate celebrations.",
  },
  vip2: {
    title: "VIP Room 2",
    text: "For up to 10 guests, with more space for birthdays, team nights, and small takeovers.",
  },
  venue: {
    title: "Full Venue",
    text: "For brand nights and large private celebrations, with the full +81 room held for your guests.",
  },
};

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

const setMenuState = (open) => {
  nav?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

menuToggle?.addEventListener("click", () => {
  setMenuState(!nav?.classList.contains("open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuState(false);
  }
});

const setResponsiveVideoState = () => {
  desktopOnlyVideos.forEach((video) => {
    if (mobileViewport.matches || reducedMotion) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  });
};

mobileViewport.addEventListener("change", setResponsiveVideoState);
setResponsiveVideoState();

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting && !reducedMotion) {
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src;
          }

          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "180px 0px", threshold: 0.18 },
  );

  lazyVideos.forEach((video) => {
    video.pause();
    videoObserver.observe(video);
  });
} else if (reducedMotion) {
  lazyVideos.forEach((video) => video.pause());
}

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.room;
    const copy = roomCopy[key];

    roomButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    if (copy && roomResult) {
      roomResult.innerHTML = `<strong>${copy.title}</strong><span>${copy.text}</span>`;
    }
  });
});

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 3200);
  event.currentTarget.reset();
});

document.querySelectorAll("[data-tilt-card]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--ry", `${x * 7}deg`);
    card.style.setProperty("--rx", `${y * -7}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const drawFx = () => {
  if (!canvas || reducedMotion) return;

  const context = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const sparks = Array.from({ length: 38 }, () => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.001 + Math.random() * 0.0016,
    size: 0.7 + Math.random() * 2.2,
    hue: Math.random() > 0.5 ? 6 : 188,
  }));
  let width = 0;
  let height = 0;
  let raf = 0;
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

    sparks.forEach((spark) => {
      spark.y -= spark.speed;
      spark.x += Math.sin(frame * 0.012 + spark.y * 20) * 0.0007;

      if (spark.y < -0.05) {
        spark.y = 1.08;
        spark.x = Math.random();
      }

      context.beginPath();
      context.fillStyle = `hsla(${spark.hue}, 100%, 64%, 0.36)`;
      context.arc(spark.x * width, spark.y * height, spark.size, 0, Math.PI * 2);
      context.fill();
    });

    raf = window.requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  tick();
};

drawFx();
