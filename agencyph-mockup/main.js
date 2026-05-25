/* ========================================================================= */
/* ⚜️ THE AGENCY PH — INTERACTIVE MOTION ENGINE & GRAPHIC LOGIC ⚜️
/* Production-Ready Custom Behaviors
/* ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHorizontalScrollIntercept();
  initScrollSpy();
  initFormInteractions();
});

/* ========================================================================= */
/* 1. TACTILE CUSTOM DESKTOP CURSOR ENGINE */
/* ========================================================================= */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = cursor.querySelector('.cursor-dot');
  const circle = cursor.querySelector('.cursor-circle');
  
  if (!cursor || !dot || !circle) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;

  // Track coordinates instantly
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant tracking for inner pointer dot
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth delayed magnetic drag for outer ring (Lag effect)
  function updateCirclePosition() {
    const ease = 0.15; // Elastic damping coordinate coefficient
    
    circleX += (mouseX - circleX) * ease;
    circleY += (mouseY - circleY) * ease;
    
    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;
    
    requestAnimationFrame(updateCirclePosition);
  }
  requestAnimationFrame(updateCirclePosition);

  // Hook hover nodes trigger state transformations
  const interactiveSelectors = 'a, button, .registry-card, .lookbook-catalog-spread, .blueprint-spread, input, select, textarea, [role="button"]';

  
  function applyCursorHovers() {
    const items = document.querySelectorAll(interactiveSelectors);
    items.forEach(item => {
      // Avoid duplicate event attachments
      if (item.classList.contains('cursor-hooked')) return;
      item.classList.add('cursor-hooked');

      item.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }

  applyCursorHovers();

  // Watch for dynamic DOM changes to apply hovers (Form resets, success templates, etc.)
  const observer = new MutationObserver(applyCursorHovers);
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ========================================================================= */
/* 2. SHOWCASE CINEMATIC FULLSCREEN MODAL CONTROLS */
/* ========================================================================= */
function openShowcaseModal() {
  const modal = document.getElementById('showcase-modal');
  const video = document.getElementById('showcase-video');
  
  if (!modal || !video) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop standard window scrolling

  // Start play overlay cinema
  video.currentTime = 0;
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Playback engine require user interaction first: ", error);
    });
  }
}

function closeShowcaseModal() {
  const modal = document.getElementById('showcase-modal');
  const video = document.getElementById('showcase-video');
  
  if (!modal || !video) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable standard scrolling
  video.pause();
}

// Modal closing keybind hook
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeShowcaseModal();
  }
});

/* ========================================================================= */
/* 3. MANILA ARCHITECTURAL REGISTRY: HORIZONTAL LOOKBOOK INTERCEPT */
/* ========================================================================= */
function initHorizontalScrollIntercept() {
  const lookbook = document.getElementById('lookbook-scroll');
  const progress = document.querySelector('.scroll-progress');
  
  if (!lookbook) return;

  // Intercept standard vertical scroll of mousewheel over lookbook container
  lookbook.addEventListener('wheel', (e) => {
    // Only intercept if screen is desktop width
    if (window.innerWidth > 991) {
      e.preventDefault();
      
      // Multiplier enhances speed and scrolling feel on high-res mice
      const scrollSpeedMultiplier = 1.2;
      lookbook.scrollLeft += e.deltaY * scrollSpeedMultiplier;
      
      updateProgressBar(lookbook, progress);
    }
  });

  // Update progress bar on scroll events (covers touchpad swipes and key navigation)
  lookbook.addEventListener('scroll', () => {
    updateProgressBar(lookbook, progress);
  });
}

function updateProgressBar(lookbook, progress) {
  if (!progress) return;
  const maxScroll = lookbook.scrollWidth - lookbook.clientWidth;
  if (maxScroll <= 0) return;
  
  const percentage = (lookbook.scrollLeft / maxScroll) * 100;
  progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
}

/* ========================================================================= */
/* 4. CARD MINI-LOOP AUTOPLAY CONTROL */
/* ========================================================================= */
function startCardVideo(videoId) {
  const video = document.getElementById(videoId);
  if (!video) return;

  // Mute video loops for ambient noise prevention
  video.muted = true;
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Autoplay blocker handle
    });
  }
}

function stopCardVideo(videoId) {
  const video = document.getElementById(videoId);
  if (!video) return;
  
  video.pause();
}

/* ========================================================================= */
/* 5. PRIVÉE PORTAL INTERACTIVE FORM SUBMISSIONS */
/* ========================================================================= */
function initFormInteractions() {
  // Line focus highlights logic is automated by CSS :focus-within.
  // Input validations and custom screen state switching is set up here.
}

function handleFormSubmission(event) {
  event.preventDefault(); // Stop standard form refresh
  
  const form = document.getElementById('application-form');
  const success = document.getElementById('success-screen');
  
  if (!form || !success) return;

  // Hide form with transition wipe
  form.classList.add('hidden');
  
  // Wait brief period for opacity fade-out transition, then toggle display
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
    
    // Trigger success active slide-up
    setTimeout(() => {
      success.classList.add('active');
    }, 50);
  }, 300);
}

function resetFormState() {
  const form = document.getElementById('application-form');
  const success = document.getElementById('success-screen');
  
  if (!form || !success) return;

  // Fade out success screen
  success.classList.remove('active');
  
  setTimeout(() => {
    success.style.display = 'none';
    form.style.display = 'flex';
    form.reset(); // Reset input fields
    
    // Trigger form active fade-in
    setTimeout(() => {
      form.classList.remove('hidden');
    }, 50);
  }, 300);
}

/* ========================================================================= */
/* 6. EDITORIAL SCROLL SPY: FLOATING RAIL SYNCHRONIZER */
/* ========================================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    // We sample active position 35% down the viewport height for visual center feel
    const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      
      if (scrollPosition >= top && scrollPosition < (top + height)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
