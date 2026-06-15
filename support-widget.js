/* ============================================================
   IRONFORGE GYM — support-widget.js
   Floating customer support widget (FAQ / FIND / HOW TO)
   Self-contained IIFE — injects its own CSS, HTML, and logic.
   ============================================================ */

(function ironforgeSupportWidget() {
  'use strict';

  /* ============================================================
     1. DATA
     ============================================================ */

  const FAQ_DATA = [
    {
      q: 'What are your gym hours?',
      a: `
        <p>We're open most of the day, every day, so you can train on your schedule:</p>
        <ul>
          <li><strong>Mon–Fri:</strong> 5:00 AM – 11:00 PM</li>
          <li><strong>Sat–Sun:</strong> 6:00 AM – 9:00 PM</li>
        </ul>
        <p><strong>Tip:</strong> Early mornings and late evenings are usually the quietest times to train.</p>
      `,
    },
    {
      q: 'Do you offer a free trial?',
      a: `
        <p>Yes! Your <strong>first session is completely free</strong> — no strings attached.</p>
        <ul>
          <li>Fill out the contact form on this page</li>
          <li>Pick the program you're interested in</li>
          <li>A trainer will reach out within <strong>24 hours</strong> to schedule it</li>
        </ul>
      `,
    },
    {
      q: 'What should I bring for my first visit?',
      a: `
        <p>Come prepared and comfortable — we'll handle the rest:</p>
        <ul>
          <li><strong>Workout clothes</strong> & supportive training shoes</li>
          <li>A <strong>water bottle</strong> (refill stations available)</li>
          <li>A small <strong>towel</strong> for equipment</li>
          <li>A positive mindset — that's the most important part 💪</li>
        </ul>
      `,
    },
    {
      q: 'What membership plans do you offer?',
      a: `
        <p>We keep things simple with a few flexible tiers, found in our <strong>Pricing</strong> section:</p>
        <ul>
          <li><strong>Basic</strong> — gym floor access & open hours</li>
          <li><strong>Pro</strong> — adds group classes & nutrition guidance</li>
          <li><strong>Elite</strong> — full access plus personal training sessions</li>
        </ul>
        <p>Use the <strong>FIND</strong> tab to jump straight to the Pricing section.</p>
      `,
    },
    {
      q: 'Do you offer personal training?',
      a: `
        <p>Absolutely — our <strong>Personal Training</strong> program pairs you 1-on-1 with a certified coach.</p>
        <ul>
          <li><strong>Duration:</strong> 60 minute sessions</li>
          <li><strong>Level:</strong> All levels welcome</li>
          <li>Fully personalized plan built around your goals & schedule</li>
        </ul>
        <p>Check the <strong>Trainers</strong> section to see who's available.</p>
      `,
    },
  ];

  const FIND_DATA = [
    { label: 'Body Type Tool', icon: '🧍', target: '#bodytype', desc: 'Find your starting point & a custom plan' },
    { label: 'Programs', icon: '🏋️', target: '#programs', desc: 'Strength, HIIT, MMA & more' },
    { label: 'Trainers', icon: '🧑‍🏫', target: '#trainers', desc: 'Meet our certified coaches' },
    { label: 'Pricing', icon: '💳', target: '#pricing', desc: 'Membership plans & rates' },
    { label: 'Gallery', icon: '🖼️', target: '#gallery', desc: 'A look inside the gym' },
    { label: 'Contact / Join', icon: '📩', target: '#contact', desc: 'Sign up for your free session' },
  ];

  /* Exercises pulled from existing script.js canvas data — fast Cloudinary images */
  const HOWTO_DATA = [
    {
      name: 'Standard Push-Up',
      icon: '💪',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781438809/standard_pushup_vntu8n.png',
      steps: [
        'Start in a plank position with hands placed slightly wider than shoulder-width.',
        'Keep your body in a straight line from head to heels — engage your core.',
        'Lower your chest toward the floor by bending your elbows to about 45°.',
        'Push back up to the starting position, fully extending your arms.',
        'Repeat for the desired number of reps, breathing out as you push up.',
      ],
    },
    {
      name: 'Diamond Push-Up',
      icon: '💎',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781434512/dimond_pushup_nfq2bl.png',
      steps: [
        'Get into a plank position and place your hands together under your chest.',
        'Form a diamond shape with your thumbs and index fingers touching.',
        'Keep your elbows close to your body as you lower your chest toward your hands.',
        'Push back up to the starting position, squeezing your triceps and chest.',
        'Keep your core tight throughout to protect your lower back.',
      ],
    },
    {
      name: 'Chest Dips',
      icon: '🔻',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781438764/chest_dips_lthlgb.png',
      steps: [
        'Grip the parallel bars and lift yourself up with arms fully extended.',
        'Lean your torso slightly forward to target the lower chest.',
        'Lower your body slowly by bending your elbows until you feel a stretch.',
        'Push back up to the starting position without locking out aggressively.',
        'Keep movements controlled — avoid swinging or using momentum.',
      ],
    },
    {
      name: 'Lat Pulldown',
      icon: '⬇️',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781441821/pulldown_nhbaww.png',
      steps: [
        'Sit at the machine and grip the bar wider than shoulder-width.',
        'Sit tall, brace your core, and keep a slight lean back.',
        'Pull the bar down toward your upper chest, leading with your elbows.',
        'Squeeze your shoulder blades together at the bottom of the movement.',
        'Slowly control the bar back up to the starting position.',
      ],
    },
    {
      name: 'Reverse Snow Angels',
      icon: '🧊',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781446780/reverse_snow_angels_yz0w1r.png',
      steps: [
        'Lie face down on the floor or a mat with arms extended overhead.',
        'Keep your palms facing down and legs straight behind you.',
        'Sweep your arms outward and down toward your hips in a wide arc.',
        'Squeeze your shoulder blades together as your arms reach your sides.',
        'Reverse the motion back overhead with control and repeat.',
      ],
    },
    {
      name: 'Prone T-Raises',
      icon: '✈️',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781443990/prone_raises_iuaaw7.png',
      steps: [
        'Lie face down with arms extended out to your sides, forming a T shape.',
        'Keep your thumbs pointing up and a slight bend in your elbows.',
        'Raise both arms upward, squeezing your shoulder blades together.',
        'Hold briefly at the top, focusing on your upper back muscles.',
        'Lower back down with control and repeat.',
      ],
    },
    {
      name: 'Incline Push-Up',
      icon: '⬆️',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781427991/incline_pushup_n0a7e7.png',
      steps: [
        'Place your hands on a raised surface like a bench, box, or step.',
        'Walk your feet back so your body forms a straight diagonal line.',
        'Lower your chest toward the surface, keeping elbows at about 45°.',
        'Push back up to full arm extension without locking out hard.',
        'Great beginner-friendly variation — easier than a standard push-up.',
      ],
    },
    {
      name: 'Decline Pike Push-Up',
      icon: '🔺',
      img: 'https://res.cloudinary.com/dhoymhers/image/upload/f_auto,q_auto,w_400/v1781428822/decline_pike_pushup_heczbo.png',
      steps: [
        'Place your feet on an elevated surface and hands on the floor.',
        'Raise your hips into a pike position, forming an inverted V shape.',
        'Bend your elbows to lower your head toward the floor.',
        'Press back up to the starting position, engaging shoulders and upper chest.',
        'Keep movements slow and controlled to protect your shoulders.',
      ],
    },
  ];

  /* ============================================================
     2. STYLES
     ============================================================ */

  const style = document.createElement('style');
  style.textContent = `
    /* ---------- TRIGGER BUTTON ---------- */
    .ifg-support-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 2000;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid rgba(255, 209, 0, 0.35);
      background: rgba(20, 20, 20, 0.55);
      backdrop-filter: blur(14px) saturate(160%);
      -webkit-backdrop-filter: blur(14px) saturate(160%);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow:
        0 8px 30px rgba(0, 0, 0, 0.45),
        0 0 0 0 rgba(255, 209, 0, 0.5);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      animation: ifgPulse 2.6s ease-in-out infinite;
    }

    .ifg-support-btn:hover {
      transform: translateY(-3px) scale(1.05);
      border-color: #FFD100;
    }

    .ifg-support-btn svg {
      width: 26px;
      height: 26px;
      fill: none;
      stroke: #FFD100;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.3s ease;
    }

    .ifg-support-btn.active svg {
      transform: rotate(90deg) scale(0.9);
    }

    @keyframes ifgPulse {
      0%, 100% { box-shadow: 0 8px 30px rgba(0,0,0,0.45), 0 0 0 0 rgba(255, 209, 0, 0.35); }
      50% { box-shadow: 0 8px 30px rgba(0,0,0,0.45), 0 0 0 10px rgba(255, 209, 0, 0); }
    }

    /* close icon */
    .ifg-icon-close { display: none; }
    .ifg-support-btn.active .ifg-icon-chat { display: none; }
    .ifg-support-btn.active .ifg-icon-close { display: block; }

    /* ---------- PANEL ---------- */
    .ifg-panel {
      position: fixed;
      bottom: 96px;
      left: 24px;
      z-index: 2000;
      width: 360px;
      max-width: calc(100vw - 32px);
      max-height: 70vh;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 15, 15, 0.55);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.55),
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        inset 0 0 40px rgba(255, 209, 0, 0.03);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.28s ease, transform 0.28s ease;
    }

    .ifg-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .ifg-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.1rem 1.2rem 0.9rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      flex-shrink: 0;
    }

    .ifg-panel-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.3rem;
      letter-spacing: 0.08em;
      color: #F0F0F0;
    }

    .ifg-panel-title span { color: #FFD100; }

    .ifg-back-btn {
      font-family: 'Oswald', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #aaa;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      transition: color 0.2s;
    }

    .ifg-back-btn:hover { color: #FFD100; }
    .ifg-back-btn.hidden { display: none; }

    .ifg-panel-body {
      padding: 1rem;
      overflow-y: auto;
      flex: 1;
    }

    .ifg-panel-body::-webkit-scrollbar { width: 6px; }
    .ifg-panel-body::-webkit-scrollbar-thumb {
      background: rgba(255, 209, 0, 0.3);
      border-radius: 10px;
    }

    /* ---------- MAIN MENU ---------- */
    .ifg-menu {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.7rem;
    }

    .ifg-menu-btn {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 0.9rem 1rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
      color: #F0F0F0;
      font-family: 'Oswald', sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }

    .ifg-menu-btn:hover {
      border-color: rgba(255, 209, 0, 0.4);
      background: rgba(255, 209, 0, 0.06);
      transform: translateX(2px);
    }

    .ifg-menu-icon {
      font-size: 1.3rem;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: rgba(255, 209, 0, 0.1);
      flex-shrink: 0;
    }

    .ifg-menu-arrow {
      margin-left: auto;
      color: #FFD100;
      font-size: 1rem;
    }

    /* ---------- FAQ ---------- */
    .ifg-faq-item {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      margin-bottom: 0.6rem;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.02);
    }

    .ifg-faq-q {
      width: 100%;
      text-align: left;
      padding: 0.85rem 1rem;
      background: none;
      border: none;
      color: #F0F0F0;
      font-family: 'Barlow', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.6rem;
    }

    .ifg-faq-q:hover { color: #FFD100; }

    .ifg-faq-q-icon {
      color: #FFD100;
      font-size: 0.9rem;
      flex-shrink: 0;
      transition: transform 0.25s ease;
    }

    .ifg-faq-item.open .ifg-faq-q-icon { transform: rotate(45deg); }

    .ifg-faq-a {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .ifg-faq-item.open .ifg-faq-a {
      max-height: 600px;
    }

    .ifg-faq-a-inner {
      padding: 0 1rem 1rem;
      font-size: 0.82rem;
      color: #ccc;
      line-height: 1.7;
    }

    .ifg-faq-a-inner p { margin-bottom: 0.5rem; }
    .ifg-faq-a-inner ul { padding-left: 1.1rem; list-style: disc; margin-bottom: 0.5rem; }
    .ifg-faq-a-inner li { margin-bottom: 0.3rem; }
    .ifg-faq-a-inner strong { color: #FFD100; }

    /* ---------- FIND ---------- */
    .ifg-find-item {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.02);
      margin-bottom: 0.6rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }

    .ifg-find-item:hover {
      border-color: rgba(255, 209, 0, 0.4);
      background: rgba(255, 209, 0, 0.06);
      transform: translateX(2px);
    }

    .ifg-find-icon { font-size: 1.2rem; flex-shrink: 0; }

    .ifg-find-label {
      font-family: 'Oswald', sans-serif;
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      color: #F0F0F0;
      text-transform: uppercase;
    }

    .ifg-find-desc {
      font-size: 0.72rem;
      color: #888;
      margin-top: 0.15rem;
    }

    /* ---------- HOW TO — exercise grid ---------- */
    .ifg-howto-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
    }

    .ifg-howto-card {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      padding: 0.7rem 0.6rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }

    .ifg-howto-card:hover {
      border-color: rgba(255, 209, 0, 0.4);
      background: rgba(255, 209, 0, 0.06);
      transform: translateY(-2px);
    }

    .ifg-howto-card-icon { font-size: 1.4rem; margin-bottom: 0.35rem; }

    .ifg-howto-card-name {
      font-family: 'Oswald', sans-serif;
      font-size: 0.72rem;
      letter-spacing: 0.06em;
      color: #F0F0F0;
      text-transform: uppercase;
      line-height: 1.3;
    }

    /* ---------- HOW TO — detail ---------- */
    .ifg-howto-detail-img-wrap {
      width: 100%;
      aspect-ratio: 4/3;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.03);
      margin-bottom: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ifg-howto-detail-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .ifg-howto-detail-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      letter-spacing: 0.06em;
      color: #FFD100;
      margin-bottom: 0.7rem;
    }

    .ifg-howto-steps {
      padding-left: 1.2rem;
      list-style: decimal;
      color: #ccc;
      font-size: 0.82rem;
      line-height: 1.8;
    }

    .ifg-howto-steps li { margin-bottom: 0.5rem; }
    .ifg-howto-steps li::marker { color: #FFD100; font-weight: 700; }

    /* ---------- generic empty/fade ---------- */
    .ifg-fade-in {
      animation: ifgFadeIn 0.25s ease;
    }

    @keyframes ifgFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ---------- MOBILE ---------- */
    @media (max-width: 480px) {
      .ifg-panel {
        left: 12px;
        right: 12px;
        bottom: 88px;
        width: auto;
      }
      .ifg-support-btn {
        bottom: 16px;
        left: 16px;
        width: 54px;
        height: 54px;
      }
    }
  `;
  document.head.appendChild(style);

  /* ============================================================
     3. HTML INJECTION
     ============================================================ */

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button class="ifg-support-btn" id="ifgSupportBtn" aria-label="Open support">
      <svg class="ifg-icon-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <svg class="ifg-icon-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>

    <div class="ifg-panel" id="ifgPanel">
      <div class="ifg-panel-header">
        <button class="ifg-back-btn hidden" id="ifgBackBtn">← BACK</button>
        <div class="ifg-panel-title" id="ifgPanelTitle">FORGE <span>ASSISTANT</span></div>
        <div style="width:24px;"></div>
      </div>
      <div class="ifg-panel-body" id="ifgPanelBody"></div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const btn = document.getElementById('ifgSupportBtn');
  const panel = document.getElementById('ifgPanel');
  const body = document.getElementById('ifgPanelBody');
  const title = document.getElementById('ifgPanelTitle');
  const backBtn = document.getElementById('ifgBackBtn');

  /* ============================================================
     4. VIEW RENDERERS
     ============================================================ */

  const setTitle = (text) => {
    title.innerHTML = text;
  };

  const renderMenu = () => {
    backBtn.classList.add('hidden');
    setTitle('FORGE <span>ASSISTANT</span>');
    body.innerHTML = `
      <div class="ifg-menu ifg-fade-in">
        <button class="ifg-menu-btn" data-view="faq">
          <span class="ifg-menu-icon">❓</span>
          FAQ
          <span class="ifg-menu-arrow">→</span>
        </button>
        <button class="ifg-menu-btn" data-view="find">
          <span class="ifg-menu-icon">🧭</span>
          FIND
          <span class="ifg-menu-arrow">→</span>
        </button>
        <button class="ifg-menu-btn" data-view="howto">
          <span class="ifg-menu-icon">📖</span>
          HOW TO
          <span class="ifg-menu-arrow">→</span>
        </button>
      </div>
    `;

    body.querySelectorAll('.ifg-menu-btn').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const view = b.dataset.view;
        if (view === 'faq') renderFaq();
        if (view === 'find') renderFind();
        if (view === 'howto') renderHowtoGrid();
      });
    });
  };

  const renderFaq = () => {
    backBtn.classList.remove('hidden');
    setTitle('<span>FAQ</span>');
    body.innerHTML = `
      <div class="ifg-fade-in">
        ${FAQ_DATA.map((item, i) => `
          <div class="ifg-faq-item" data-index="${i}">
            <button class="ifg-faq-q">
              ${item.q}
              <span class="ifg-faq-q-icon">+</span>
            </button>
            <div class="ifg-faq-a">
              <div class="ifg-faq-a-inner">${item.a}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    body.querySelectorAll('.ifg-faq-item').forEach((item) => {
      const qBtn = item.querySelector('.ifg-faq-q');
      qBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('open');
      });
    });

    backBtn.onclick = renderMenu;
  };

  const renderFind = () => {
    backBtn.classList.remove('hidden');
    setTitle('<span>FIND</span> YOUR WAY');
    body.innerHTML = `
      <div class="ifg-fade-in">
        ${FIND_DATA.map((item, i) => `
          <div class="ifg-find-item" data-index="${i}">
            <span class="ifg-find-icon">${item.icon}</span>
            <div>
              <div class="ifg-find-label">${item.label}</div>
              <div class="ifg-find-desc">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    body.querySelectorAll('.ifg-find-item').forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = document.querySelector(FIND_DATA[i].target);
        if (target) {
          closePanel();
          setTimeout(() => {
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          }, 250);
        }
      });
    });

    backBtn.onclick = renderMenu;
  };

  const renderHowtoGrid = () => {
    backBtn.classList.remove('hidden');
    setTitle('<span>HOW TO</span>');
    body.innerHTML = `
      <div class="ifg-howto-grid ifg-fade-in">
        ${HOWTO_DATA.map((ex, i) => `
          <div class="ifg-howto-card" data-index="${i}">
            <div class="ifg-howto-card-icon">${ex.icon}</div>
            <div class="ifg-howto-card-name">${ex.name}</div>
          </div>
        `).join('')}
      </div>
    `;

    body.querySelectorAll('.ifg-howto-card').forEach((card, i) => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        renderHowtoDetail(i);
      });
    });

    backBtn.onclick = renderMenu;
  };

  const renderHowtoDetail = (index) => {
    const ex = HOWTO_DATA[index];
    backBtn.classList.remove('hidden');
    setTitle(ex.name);
    body.innerHTML = `
      <div class="ifg-fade-in">
        <div class="ifg-howto-detail-img-wrap">
          <img class="ifg-howto-detail-img" src="${ex.img}" alt="${ex.name}" loading="lazy" decoding="async" />
        </div>
        <ol class="ifg-howto-steps">
          ${ex.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    `;

    backBtn.onclick = renderHowtoGrid;
  };

  /* ============================================================
     5. OPEN / CLOSE LOGIC
     ============================================================ */

  const openPanel = () => {
    panel.classList.add('open');
    btn.classList.add('active');
    renderMenu();
  };

  const closePanel = () => {
    panel.classList.remove('open');
    btn.classList.remove('active');
  };

  btn.addEventListener('click', () => {
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  panel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closePanel();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      panel.classList.contains('open') &&
      !panel.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closePanel();
    }
  });

  /* ============================================================
     6. PRELOAD HOW-TO IMAGES (fast load when opened)
     ============================================================ */
  const preloadHowtoImages = () => {
    HOWTO_DATA.forEach((ex) => {
      const img = new Image();
      img.src = ex.img;
    });
  };

  // Preload after initial page load is idle, so it doesn't compete with hero assets
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadHowtoImages, { timeout: 4000 });
  } else {
    setTimeout(preloadHowtoImages, 2500);
  }

})();
