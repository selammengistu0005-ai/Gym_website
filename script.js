/* ============================================================
   IRONFORGE GYM — script.js
   Features:
   - Sticky navbar with scroll state
   - Hamburger mobile menu
   - Animated stat counters
   - Scroll reveal animations
   - Contact form with validation & feedback
   - Newsletter form
   - Smooth active nav link highlight
   - Parallax hero slashes
   ============================================================ */

'use strict';

/* ========== NAVBAR — SCROLL STATE ========== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();


/* ========== HAMBURGER MENU ========== */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


/* ========== ACTIVE NAV LINK ON SCROLL ========== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
})();


/* ========== SCROLL REVEAL ========== */
(function initScrollReveal() {
  // Add reveal class to elements we want to animate
  const targets = [
    '.program-card',
    '.trainer-card',
    '.pricing-card',
    '.testi-card',
    '.gallery-item',
    '.about-text',
    '.about-visual',
    '.contact-info',
    '.contact-form-wrap',
    '.stat-item',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // stagger siblings slightly
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ========== ANIMATED STAT COUNTERS ========== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  let started = false;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const stepTime = 16;   // ~60fps
    const steps = Math.ceil(duration / stepTime);
    let current = 0;
    let step = 0;

    const tick = () => {
      step++;
      // Ease-out curve: fast start, slow end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(progress * target);
      el.textContent = current.toLocaleString();

      if (step < steps) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting) && !started) {
      started = true;
      counters.forEach(counter => animateCounter(counter));
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) observer.observe(statsBar);
})();


/* ========== PARALLAX HERO SLASHES ========== */
(function initParallax() {
  const slashes = document.querySelectorAll('.hero-yellow-slash');
  if (!slashes.length) return;

  // Only on non-mobile to avoid jank
  if (window.matchMedia('(max-width: 768px)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    slashes.forEach((slash, i) => {
      const speed = 0.08 + i * 0.04;
      slash.style.transform = `translateY(${scrollY * speed}px) rotate(${-18 + i * 4}deg)`;
    });
  }, { passive: true });
})();


/* ========== CONTACT FORM VALIDATION & SUBMISSION ========== */
(function initContactForm() {
  const submitBtn = document.getElementById('submitBtn');
  if (!submitBtn) return;

  const fields = {
    fname:   { el: document.getElementById('fname'),   label: 'First Name' },
    lname:   { el: document.getElementById('lname'),   label: 'Last Name' },
    email:   { el: document.getElementById('email'),   label: 'Email Address' },
    phone:   { el: document.getElementById('phone'),   label: 'Phone Number' },
    program: { el: document.getElementById('program'), label: 'Program' },
    message: { el: document.getElementById('message'), label: 'Your Goal' },
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val) => /^[\+\d\s\(\)\-]{7,20}$/.test(val);

  const setError = (el, msg) => {
    el.style.borderColor = '#CC0000';
    let errEl = el.parentNode.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.className = 'form-error';
      errEl.style.cssText = 'font-size:0.68rem;color:#CC0000;margin-top:0.3rem;letter-spacing:0.05em;';
      el.parentNode.appendChild(errEl);
    }
    errEl.textContent = msg;
  };

  const clearError = (el) => {
    el.style.borderColor = '';
    const errEl = el.parentNode.querySelector('.form-error');
    if (errEl) errEl.remove();
  };

  const clearAllErrors = () => {
    Object.values(fields).forEach(f => {
      if (f.el) clearError(f.el);
    });
  };

  // Live clear error on input
  Object.values(fields).forEach(f => {
    if (!f.el) return;
    f.el.addEventListener('input', () => clearError(f.el));
    f.el.addEventListener('change', () => clearError(f.el));
  });

  const validate = () => {
    let valid = true;

    Object.entries(fields).forEach(([key, f]) => {
      if (!f.el) return;
      const val = f.el.value.trim();

      if (!val) {
        setError(f.el, `${f.label} is required.`);
        valid = false;
        return;
      }

      if (key === 'email' && !validateEmail(val)) {
        setError(f.el, 'Please enter a valid email address.');
        valid = false;
        return;
      }

      if (key === 'phone' && !validatePhone(val)) {
        setError(f.el, 'Please enter a valid phone number.');
        valid = false;
        return;
      }

      clearError(f.el);
    });

    return valid;
  };

  const showSuccess = () => {
    const formWrap = document.querySelector('.contact-form');
    if (!formWrap) return;

    formWrap.innerHTML = `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-align:center;
        padding: 4rem 2rem;
        gap: 1.2rem;
      ">
        <div style="
          font-size:3rem;
          width:70px;height:70px;
          background:#FFD100;
          display:flex;align-items:center;justify-content:center;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
        ">✓</div>
        <h3 style="
          font-family:'Bebas Neue',sans-serif;
          font-size:2rem;
          color:#F0F0F0;
          letter-spacing:0.06em;
        ">MESSAGE SENT!</h3>
        <p style="
          font-size:0.9rem;
          color:#777;
          max-width:320px;
          line-height:1.7;
        ">We'll be in touch within 24 hours. Get ready — your journey starts now.</p>
        <p style="
          font-family:'Oswald',sans-serif;
          font-size:0.75rem;
          letter-spacing:0.15em;
          color:#FFD100;
        ">YOUR FIRST SESSION IS FREE 💪</p>
      </div>
    `;
  };

  submitBtn.addEventListener('click', () => {
    clearAllErrors();

    if (!validate()) {
      // Shake the button on error
      submitBtn.style.transform = 'translateX(-6px)';
      setTimeout(() => { submitBtn.style.transform = 'translateX(6px)'; }, 80);
      setTimeout(() => { submitBtn.style.transform = 'translateX(-4px)'; }, 160);
      setTimeout(() => { submitBtn.style.transform = 'translateX(4px)'; }, 240);
      setTimeout(() => { submitBtn.style.transform = ''; }, 320);
      return;
    }

    // Simulate sending
    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      showSuccess();
    }, 1400);
  });
})();


/* ========== NEWSLETTER FORM ========== */
(function initNewsletter() {
  const newsletterBtn = document.querySelector('.newsletter-input button');
  const newsletterInput = document.querySelector('.newsletter-input input');
  if (!newsletterBtn || !newsletterInput) return;

  newsletterBtn.addEventListener('click', () => {
    const val = newsletterInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val || !emailRegex.test(val)) {
      newsletterInput.style.borderColor = '#CC0000';
      newsletterInput.placeholder = 'Enter a valid email';
      setTimeout(() => {
        newsletterInput.style.borderColor = '';
        newsletterInput.placeholder = 'Your email';
      }, 2000);
      return;
    }

    newsletterBtn.textContent = '✓';
    newsletterBtn.style.background = '#F0F0F0';
    newsletterInput.value = '';
    newsletterInput.placeholder = 'You\'re in. Stay sharp.';
    newsletterInput.disabled = true;
    newsletterBtn.disabled = true;
  });

  newsletterInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') newsletterBtn.click();
  });
})();


/* ========== PROGRAM CARD HOVER TILT ========== */
(function initCardTilt() {
  const cards = document.querySelectorAll('.program-card');
  if (!cards.length) return;

  // Skip on touch devices
  if ('ontouchstart' in window) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* ========== CLAW TEXT FLICKER EFFECT ========== */
(function initClawFlicker() {
  const clawText = document.querySelector('.claw-text');
  if (!clawText) return;

  // Subtle random flicker on the red glow — gives it a live, electric feel
  let flickerTimeout;

  const flicker = () => {
    const intensity = 0.5 + Math.random() * 0.5;
    const spread = 20 + Math.random() * 20;
    clawText.style.textShadow = `
      0 0 ${spread}px rgba(204, 0, 0, ${0.4 * intensity}),
      0 0 ${spread * 2}px rgba(204, 0, 0, ${0.2 * intensity}),
      2px 2px 0px #7a0000,
      -1px -1px 0px #4a0000
    `;
    const nextDelay = 1500 + Math.random() * 3000;
    flickerTimeout = setTimeout(flicker, nextDelay);
  };

  // Start after hero animation completes
  flickerTimeout = setTimeout(flicker, 2000);

  // Clean up if element leaves DOM
  const observer = new MutationObserver(() => {
    if (!document.contains(clawText)) {
      clearTimeout(flickerTimeout);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();


/* ========== HERO SECTION ENTRANCE ========== */
(function initHeroEntrance() {
  // The hero elements animate via CSS (opacity:0 + animation keyframes)
  // This just ensures the page starts at the top
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
})();


/* ========== ACTIVE NAV LINK STYLE (CSS injection) ========== */
(function injectActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: #FFD100 !important;
    }
    .nav-links a.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ========== CONSOLE SIGNATURE ========== */
console.log(
  '%c⚡ IRONFORGE GYM %c— Built for Champions ',
  'background:#FFD100;color:#050505;font-family:monospace;font-size:14px;font-weight:bold;padding:6px 12px;',
  'color:#FFD100;font-family:monospace;font-size:13px;padding:6px 4px;'
);

/* ========== BODY TYPE SELECTOR ========== */
(function initBodyTypeSelector() {

  const canvas        = document.getElementById('bodytypeCanvas');
  const stateStart    = document.getElementById('stateStart');
  const stateSelect   = document.getElementById('stateSelect');
  const stateResult   = document.getElementById('stateResult');
  const startBtn      = document.getElementById('canvasStartBtn');
  const backBtn       = document.getElementById('canvasBackBtn');
  const cards         = document.querySelectorAll('.bodytype-card');
  const resultImg     = document.getElementById('resultImg');
  const resultName    = document.getElementById('resultTypeName');
  const resultGoal    = document.getElementById('resultGoal');
  const resultExercises = document.getElementById('resultExercises');

  if (!canvas || !startBtn) return;

  /* ---- EXERCISE DATA ---- */
  const bodyData = {
    skinny: {
      label: 'SKINNY',
      goal: 'Goal: Build mass & strength',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781352462/skinny_photo_rengyx.png',
      exercises: [
        { name: 'Barbell Squat',    sets: '4 sets × 8 reps' },
        { name: 'Deadlift',         sets: '4 sets × 6 reps' },
        { name: 'Bench Press',      sets: '4 sets × 8 reps' },
        { name: 'Overhead Press',   sets: '3 sets × 10 reps' },
        { name: 'Pull-Ups',         sets: '3 sets × 8 reps' },
        { name: 'Dumbbell Rows',    sets: '3 sets × 10 reps' },
      ]
    },
    athletic: {
      label: 'ATHLETIC',
      goal: 'Goal: Performance & conditioning',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781352454/athletic_photo_yqnusn.png',
      exercises: [
        { name: 'Power Cleans',          sets: '4 sets × 5 reps' },
        { name: 'Box Jumps',             sets: '4 sets × 8 reps' },
        { name: 'Weighted Pull-Ups',     sets: '4 sets × 6 reps' },
        { name: 'Sprint Intervals',      sets: '6 rounds × 30s' },
        { name: 'Bulgarian Split Squat', sets: '3 sets × 10 reps' },
        { name: 'Plank Variations',      sets: '3 sets × 45s' },
      ]
    },
    average: {
      label: 'AVERAGE',
      goal: 'Goal: Tone & balanced fitness',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781352466/average_photo_f5vyxa.png',
      exercises: [
        { name: 'Dumbbell Circuit',    sets: '3 sets × 12 reps' },
        { name: 'Incline Push-Ups',    sets: '3 sets × 15 reps' },
        { name: 'Goblet Squat',        sets: '3 sets × 12 reps' },
        { name: 'Cable Rows',          sets: '3 sets × 12 reps' },
        { name: 'Treadmill Intervals', sets: '20 minutes' },
        { name: 'Core Superset',       sets: '3 sets × 15 reps' },
      ]
    },
    stocky: {
      label: 'STOCKY',
      goal: 'Goal: Strength & mobility',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781352470/stocky_photo_brugfm.png',
      exercises: [
        { name: 'Powerlifting Squats',   sets: '5 sets × 5 reps' },
        { name: 'Romanian Deadlift',     sets: '4 sets × 8 reps' },
        { name: "Farmer's Carry",        sets: '4 rounds × 30m' },
        { name: 'Hip Flexor Stretches',  sets: 'Daily routine' },
        { name: 'Lateral Band Walks',    sets: '3 sets × 15 reps' },
        { name: 'Kettlebell Swings',     sets: '4 sets × 12 reps' },
      ]
    },
    plussize: {
      label: 'PLUS SIZE',
      goal: 'Goal: Gradual fat loss & strength',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781352462/plussize_photo_vumzr5.png',
      exercises: [
        { name: 'Walking',                sets: '30 minutes daily' },
        { name: 'Resistance Band Squats', sets: '3 sets × 15 reps' },
        { name: 'Seated Dumbbell Press',  sets: '3 sets × 12 reps' },
        { name: 'Bodyweight Rows',        sets: '3 sets × 10 reps' },
        { name: 'Swimming or Cycling',    sets: '20 minutes' },
        { name: 'Stretching Routine',     sets: 'Daily routine' },
      ]
    },
    obese: {
      label: 'OBESE',
      goal: 'Goal: Foundation & joint-friendly movement',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_180/v1781353287/obesse_photo_kartxq.png',
      exercises: [
        { name: 'Chair Squats',            sets: '3 sets × 10 reps' },
        { name: 'Wall Push-Ups',           sets: '3 sets × 12 reps' },
        { name: 'Seated Leg Raises',       sets: '3 sets × 15 reps' },
        { name: 'Water Aerobics',          sets: '20 minutes' },
        { name: 'Gentle Walking',          sets: '20 minutes daily' },
        { name: 'Breathing & Mobility',    sets: 'Daily routine' },
      ]
    },
  };

  /* ---- STATE SWITCHER ---- */
const showState = (stateEl) => {
    [stateStart, stateSelect, stateResult].forEach(s => {
      s.classList.remove('visible');
      s.classList.add('hidden');
    });
    setTimeout(() => {
      stateEl.classList.remove('hidden');
      requestAnimationFrame(() => stateEl.classList.add('visible'));
    }, 120);
  };

  /* ---- PRELOAD IMAGES when section enters viewport ---- */
  const preloadImages = () => {
    Object.values(bodyData).forEach(data => {
      const img = new Image();
      img.src = data.img;
    });
  };

  const preloadObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      preloadImages();
      preloadObserver.disconnect();
    }
  }, { rootMargin: '200px' });

  const section = document.querySelector('.bodytype');
  if (section) preloadObserver.observe(section);

  /* ---- START BUTTON ---- */
startBtn.addEventListener('click', () => {
    canvas.classList.add('expanded');
    document.body.style.overflow = 'hidden';
    showState(stateSelect);
  });

  /* ---- BODY TYPE CARD CLICK ---- */
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const data = bodyData[type];
      if (!data) return;

      // Fade out non-selected cards
      cards.forEach(c => {
        if (c !== card) {
          c.classList.add('faded');
        } else {
          c.classList.add('selected');
        }
      });

      // Short pause for transition effect, then show result
      setTimeout(() => {
        // Populate result state
        resultImg.src = data.img;
        resultImg.alt = data.label;
        resultName.textContent = data.label;
        resultGoal.textContent = data.goal;

        // Build exercise list
        resultExercises.innerHTML = data.exercises.map(ex => `
          <div class="exercise-item">
            <span class="exercise-name">${ex.name}</span>
            <span class="exercise-sets">${ex.sets}</span>
          </div>
        `).join('');

        showState(stateResult);
      }, 420);
    });
  });

  /* ---- BACK BUTTON ---- */
backBtn.addEventListener('click', () => {
    cards.forEach(c => {
      c.classList.remove('faded', 'selected');
    });
    showState(stateSelect);
  });

  /* ---- CLOSE BUTTON — collapse canvas back ---- */
  const closeBtn = document.getElementById('canvasCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      canvas.classList.remove('expanded');
      document.body.style.overflow = '';
      cards.forEach(c => c.classList.remove('faded', 'selected'));
      showState(stateStart);
    });
  }

  /* ---- ESCAPE KEY — collapse canvas ---- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && canvas.classList.contains('expanded')) {
      canvas.classList.remove('expanded');
      document.body.style.overflow = '';
      cards.forEach(c => c.classList.remove('faded', 'selected'));
      showState(stateStart);
    }
  });
  
  })();

  /* ========== PROGRAM DETAIL MODAL ========== */
(function initProgramModal() {

  const overlay   = document.getElementById('programModalOverlay');
  const modal     = document.getElementById('programModal');
  const closeBtn  = document.getElementById('programModalClose');
  const content   = document.getElementById('programModalContent');
  const cards     = document.querySelectorAll('.program-card');

  if (!overlay || !modal || !content || !cards.length) return;

  /* ---- PROGRAM DATA ---- */
  const programData = {
    strength: {
      title: 'STRENGTH TRAINING',
      desc: 'Build raw power and muscle through progressive overload, compound lifts, and expert programming designed for all levels. Our strength program focuses on the big fundamentals — squat, bench, deadlift, and overhead press — layered with accessory work to build a body that performs as good as it looks.',
      level: 'Beginner – Advanced',
      duration: '60 min',
      calories: '400–600 kcal',
    },
    hiit: {
      title: 'HIIT',
      desc: 'High-intensity interval training that burns maximum calories, shreds fat, and pushes your cardiovascular system to the edge. Short, brutal bursts of effort followed by active recovery — designed to torch fat and build conditioning fast.',
      level: 'All Levels',
      duration: '30–45 min',
      calories: '500–700 kcal',
    },
    cardio: {
      title: 'CARDIO & ENDURANCE',
      desc: 'Improve stamina, heart health, and athletic endurance with structured cardio sessions tailored to your fitness goals. From steady-state runs to interval rows, build the engine that fuels everything else.',
      level: 'Beginner – Intermediate',
      duration: '45 min',
      calories: '350–550 kcal',
    },
    personal: {
      title: 'PERSONAL TRAINING',
      desc: '1-on-1 sessions with a certified trainer. Personalized plans, real accountability, and results that speak for themselves. Every session is built around your body, your goals, and your schedule.',
      level: 'All Levels',
      duration: '60 min',
      calories: '300–500 kcal',
    },
    nutrition: {
      title: 'NUTRITION COACHING',
      desc: 'Fuel your performance with science-backed nutrition plans, macro tracking, and meal strategy built around your body. Pair this with any training program for compounding results.',
      level: 'Supplement to Training',
      duration: 'Ongoing',
      calories: 'Custom plan',
    },
    mma: {
      title: 'MMA & COMBAT',
      desc: 'Train like a fighter. Boxing, kickboxing, and grappling fundamentals combined with elite-level conditioning work. Build power, reflexes, and a fighter\'s mindset.',
      level: 'Intermediate – Advanced',
      duration: '60–75 min',
      calories: '600–800 kcal',
    },
  };

  /* ---- BUILD MODAL CONTENT ---- */
  const buildContent = (program) => {
    const data = programData[program];
    if (!data) return '';

    return `
      <div class="modal-hero">
        <div class="modal-hero-text">
          <p class="modal-eyebrow">PROGRAM OVERVIEW</p>
          <h2 class="modal-title">${data.title}</h2>
          <p class="modal-desc">${data.desc}</p>
        </div>
      </div>

      <div class="modal-badges">
        <div class="modal-badge">
          <span class="modal-badge-icon">📊</span>
          <div>
            <p class="modal-badge-label">LEVEL</p>
            <p class="modal-badge-value">${data.level}</p>
          </div>
        </div>
        <div class="modal-badge">
          <span class="modal-badge-icon">⏱️</span>
          <div>
            <p class="modal-badge-label">DURATION</p>
            <p class="modal-badge-value">${data.duration}</p>
          </div>
        </div>
        <div class="modal-badge">
          <span class="modal-badge-icon">🔥</span>
          <div>
            <p class="modal-badge-label">CALORIE BURN</p>
            <p class="modal-badge-value">${data.calories}</p>
          </div>
        </div>
      </div>

      <a href="#contact" class="btn-primary modal-cta">JOIN THIS PROGRAM</a>
    `;
  };

  /* ---- OPEN MODAL ---- */
  const openModal = (program) => {
    content.innerHTML = buildContent(program);
    overlay.classList.add('open');
    document.body.classList.add('modal-open');
  };

  /* ---- CLOSE MODAL ---- */
  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  /* ---- CARD CLICK ---- */
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const program = card.dataset.program;
      openModal(program);
    });
  });

  /* ---- CLOSE TRIGGERS ---- */
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  /* ---- CLOSE MODAL CTA ALSO CLOSES (since it's an anchor link) ---- */
  content.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-cta')) closeModal();
  });

})();

/* ========== MUSCLE EXERCISE CANVAS ========== */
(function initMuscleCanvas() {

  const canvas        = document.getElementById('muscleCanvas');
  const closeBtn      = document.getElementById('muscleCanvasClose');
  const statePills    = document.getElementById('muscleStatePills');
  const stateDetail   = document.getElementById('muscleStateDetail');
  const pillsWrap     = document.getElementById('musclePillsWrap');
  const pillsWrapDet  = document.getElementById('musclePillsWrapDetail');
  const exercisesPanel = document.getElementById('muscleExercisesPanel');
  const ctaBtns       = document.querySelectorAll('.muscle-cta');

  if (!canvas || !ctaBtns.length) return;

  /* ---- DATA: pills + exercise images per muscle ---- */
  const canvasData = {
    chest: {
      color: 'rgba(255, 100, 60, 0.9)', colorSoft: 'rgba(255, 100, 60, 0.15)',
      categories: [
        {
          name: 'Upper Chest', icon: '🎯',
          exercises: [
            { name: 'Incline Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781427991/incline_pushup_n0a7e7.png', howto: 'Place your hands on a raised surface (bench or step), feet on the floor. Lower your chest toward the surface with elbows at 45°, then push back up. Targets the lower portion of the upper chest with reduced strain.' },
            { name: 'Decline Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781428781/decline_pushup_mqalj7.png', howto: 'Place your feet on a raised surface and hands on the floor, body in a straight line. Lower your chest toward the floor, then push back up. Elevating the feet shifts more load onto the upper chest and shoulders.' },
            { name: 'Decline Pike Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781428822/decline_pike_pushup_heczbo.png', howto: 'From a pike position with feet elevated and hips raised, bend your elbows to lower your head toward the floor, then press back up. Combines upper chest and shoulder activation with a strong overhead pressing pattern.' },
          ],
        },
        {
          name: 'Middle Chest', icon: '🎯',
          exercises: [
            { name: 'Diamond Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781434512/dimond_pushup_nfq2bl.png', howto: 'Place your hands together under your chest forming a diamond shape with your thumbs and index fingers. Lower your chest toward your hands, keeping elbows close to your body, then push back up. Heavily emphasizes the middle chest and triceps.' },
            { name: 'Incline Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781427991/incline_pushup_n0a7e7.png', howto: 'Place your hands on a raised surface (bench or step), feet on the floor. Lower your chest toward the surface with elbows at 45°, then push back up. A controlled, joint-friendly variation that still builds chest strength.' },
            { name: 'Standard Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781427991/incline_pushup_n0a7e7.png', howto: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your core tight, then push back up. The fundamental bodyweight chest builder.' },
          ],
        },
        {
          name: 'Lower Chest', icon: '🎯',
          exercises: [
            { name: 'Chest Dips', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781438764/chest_dips_lthlgb.png', howto: 'Support yourself on parallel bars or a dip station, lean your torso forward, and lower your body by bending your elbows until you feel a stretch in your chest. Push back up to the starting position. Leaning forward emphasizes the lower chest.' },
            { name: 'Standard Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781438809/standard_pushup_vntu8n.png', howto: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your core tight, then push back up. A foundational movement that builds overall chest strength.' },
            { name: 'Diamond Push-Up', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781434512/dimond_pushup_nfq2bl.png', howto: 'Place your hands together under your chest forming a diamond shape with your thumbs and index fingers. Lower your chest toward your hands, keeping elbows close to your body, then push back up. Adds extra triceps and inner chest emphasis.' },
          ],
        },
      ],
    },
    back: {
      color: 'rgba(80, 160, 255, 0.9)', colorSoft: 'rgba(80, 160, 255, 0.15)',
      categories: [
        {
          name: 'Lats', icon: '🎯',
          exercises: [
            { name: 'Pulldown', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781441821/pulldown_nhbaww.png', howto: 'Sit at a pulldown machine or use a band anchored overhead. Grip the bar/handles wider than shoulder-width, pull it down toward your chest while squeezing your shoulder blades together, then control it back up. Targets the lats for width and pulling strength.' },
          ],
        },
        {
          name: 'Traps', icon: '🎯',
          exercises: [
            { name: 'Prone T-Raises', img: 'https://res.cloudinary.com/dhoymhers/image/upload/v1781443990/prone_raises_iuaaw7.png', howto: 'Lie face down on a bench or the floor with arms extended out to the sides forming a T shape. Raise your arms upward, squeezing your shoulder blades together, then lower back down with control. Engages the traps and rear delts to build upper back thickness.' },
          ],
        },
        { name: 'Rhomboids', icon: '🎯', exercises: [] },
        { name: 'Lower Back', icon: '🎯', exercises: [] },
      ],
    },
    shoulder: {
      color: 'rgba(255, 209, 0, 0.9)', colorSoft: 'rgba(255, 209, 0, 0.15)',
      categories: [
        { name: 'Front Delt', icon: '🎯', exercises: [] },
        { name: 'Side Delt', icon: '🎯', exercises: [] },
        { name: 'Rear Delt', icon: '🎯', exercises: [] },
      ],
    },
    arm: {
      color: 'rgba(160, 80, 255, 0.9)', colorSoft: 'rgba(160, 80, 255, 0.15)',
      categories: [
        { name: 'Biceps', icon: '💪', exercises: [] },
        { name: 'Triceps', icon: '💪', exercises: [] },
        { name: 'Forearm', icon: '💪', exercises: [] },
      ],
    },
    abs: {
      color: 'rgba(60, 200, 140, 0.9)', colorSoft: 'rgba(60, 200, 140, 0.15)',
      categories: [
        { name: 'Upper Abs', icon: '🎯', exercises: [] },
        { name: 'Lower Abs', icon: '🎯', exercises: [] },
      ],
    },
    leg: {
      color: 'rgba(60, 200, 255, 0.9)', colorSoft: 'rgba(60, 200, 255, 0.15)',
      categories: [
        { name: 'Quads', icon: '🦵', exercises: [] },
        { name: 'Hamstrings', icon: '🦵', exercises: [] },
        { name: 'Calves', icon: '🦵', exercises: [] },
        { name: 'Glutes', icon: '🦵', exercises: [] },
      ],
    },
  };

  let currentMuscle = null;

  /* ---- BUILD PILLS HTML ---- */
  const buildPills = (muscle) => {
    const d = canvasData[muscle];
    return d.categories.map(cat => `
      <button class="muscle-pill" data-category="${cat.name}"
        style="--pill-color: ${d.color}; --pill-color-soft: ${d.colorSoft};">
        <span class="muscle-pill-icon">${cat.icon}</span>
        <span class="muscle-pill-label">${cat.name}</span>
        <span class="muscle-pill-arrow">→</span>
      </button>
    `).join('');
  };

  /* ---- BUILD EXERCISES PANEL HTML (CAROUSEL) ---- */
  const buildExercises = (muscle, categoryName) => {
    const d = canvasData[muscle];
    const cat = d.categories.find(c => c.name === categoryName);

    if (!cat || !cat.exercises.length) {
      return `<p style="color:#6A6A72; font-family:'Barlow',sans-serif; font-size:0.95rem;">Exercises for ${categoryName} coming soon.</p>`;
    }

    const cards = cat.exercises.map((ex, i) => `
      <div class="muscle-exercise-card" data-index="${i}" style="--pill-color: ${d.color}; --pill-color-soft: ${d.colorSoft};">
        <img class="muscle-exercise-img" src="${ex.img}" alt="${ex.name}" loading="lazy" />
        <p class="muscle-exercise-name">${ex.name}</p>
        <p class="muscle-exercise-howto">${ex.howto || ''}</p>
      </div>
    `).join('');

    const dots = cat.exercises.map((ex, i) => `
      <span class="muscle-carousel-dot" data-index="${i}" style="--pill-color: ${d.color};"></span>
    `).join('');

    const navArrows = cat.exercises.length > 1 ? `
      <button class="muscle-carousel-nav prev" style="--pill-color: ${d.color};">‹</button>
      <button class="muscle-carousel-nav next" style="--pill-color: ${d.color};">›</button>
    ` : '';

    return `
      <div class="muscle-carousel" data-active="0">
        ${cards}
        ${navArrows}
        <div class="muscle-carousel-dots">${dots}</div>
      </div>
    `;
  };

  /* ---- WIRE CAROUSEL NAV / DOTS / CLICK-TO-FRONT ---- */
  const wireCarousel = (panel) => {
    const carousel = panel.querySelector('.muscle-carousel');
    if (!carousel) return;

    const cards = [...carousel.querySelectorAll('.muscle-exercise-card')];
    const dots  = [...carousel.querySelectorAll('.muscle-carousel-dot')];
    const prevBtn = carousel.querySelector('.muscle-carousel-nav.prev');
    const nextBtn = carousel.querySelector('.muscle-carousel-nav.next');
    const total = cards.length;

    const render = () => {
      const active = parseInt(carousel.dataset.active, 10);
      cards.forEach((card, i) => {
        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        if (i === active) {
          card.classList.add('is-active');
        } else if (i === (active - 1 + total) % total) {
          card.classList.add('is-prev');
        } else if (i === (active + 1) % total) {
          card.classList.add('is-next');
        } else {
          card.classList.add('is-hidden');
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
    };

    const goTo = (index) => {
      carousel.dataset.active = ((index % total) + total) % total;
      render();
    };

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('is-active')) {
          goTo(parseInt(card.dataset.index, 10));
        }
      });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
    });

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(parseInt(carousel.dataset.active, 10) - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(parseInt(carousel.dataset.active, 10) + 1));

    render();
  };

  /* ---- WIRE PILL CLICKS (works for both states) ---- */
  const wirePills = (container) => {
    container.querySelectorAll('.muscle-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const category = pill.dataset.category;

        /* mark active */
        container.querySelectorAll('.muscle-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        /* populate detail state */
        pillsWrapDet.innerHTML = buildPills(currentMuscle);
        wirePills(pillsWrapDet);
        pillsWrapDet.querySelectorAll('.muscle-pill').forEach(p => {
          if (p.dataset.category === category) p.classList.add('active');
        });

        exercisesPanel.innerHTML = buildExercises(currentMuscle, category);
        wireCarousel(exercisesPanel);

        /* switch states */
        statePills.classList.add('hidden');
        stateDetail.classList.remove('hidden');
        stateDetail.classList.add('visible');
      });
    });
  };

  /* ---- OPEN CANVAS ---- */
  const openCanvas = (muscle) => {
    currentMuscle = muscle;

    pillsWrap.innerHTML = buildPills(muscle);
    wirePills(pillsWrap);

    statePills.classList.remove('hidden');
    stateDetail.classList.remove('visible');
    stateDetail.classList.add('hidden');

    canvas.classList.add('open');
    document.body.classList.add('modal-open');
  };

  /* ---- CLOSE CANVAS ---- */
  const closeCanvas = () => {
    canvas.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  /* ---- WIRE CTA BUTTONS ---- */
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      openCanvas(btn.dataset.muscle);
    });
  });

  /* ---- CLOSE TRIGGERS ---- */
  if (closeBtn) closeBtn.addEventListener('click', closeCanvas);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && canvas.classList.contains('open')) closeCanvas();
  });

})();
