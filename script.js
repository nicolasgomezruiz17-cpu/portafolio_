/* ============================================================
   PORTAFOLIO DIGITAL — script.js
   Navbar scroll, tabs, rúbricas, back-to-top, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR: shrink on scroll ── */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ── MOBILE MENU TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Mobile: toggle dropdown on click (not hover)
  document.querySelectorAll('.nav-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open-mobile');
      }
    });
  });

  // Close menu when a nav link (non-dropdown) is clicked
  navLinks.querySelectorAll('a:not(.nav-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


  /* ── SMOOTH SCROLL with navbar offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const navH = navbar.offsetHeight;
      const progressBar = document.querySelector('.progress-section');
      const progressH = progressBar ? progressBar.offsetHeight : 0;
      const offset = navH + progressH + 8;

      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── ANTECEDENTES TABS ── */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.getElementById('tab-' + target);
      if (content) content.classList.add('active');
    });
  });


  /* ── RÚBRICAS TABS ── */
  const rubricBtns    = document.querySelectorAll('.rubric-tab-btn');
  const rubricContents = document.querySelectorAll('.rubric-content');

  rubricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.rubric;

      rubricBtns.forEach(b => b.classList.remove('active'));
      rubricContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });


  /* ── BACK TO TOP ── */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── PROGRESS BAR: highlight active momento on scroll ── */
  const momentoSections = [
    { id: 'identificando', index: 0 },
    { id: 'referenciando', index: 1 },
    { id: 'disenando',     index: 2 },
    { id: 'creditos',      index: 3 },
  ];

  const progressItems = document.querySelectorAll('.progress-item');

  function updateProgress() {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let active = -1;

    momentoSections.forEach(({ id, index }) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        active = index;
      }
    });

    progressItems.forEach((item, i) => {
      item.classList.toggle('active', i <= active);
    });
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  /* ── INTERSECTION OBSERVER: fade-in on scroll ── */
  const observeEls = document.querySelectorAll(
    '.cause-card, .rae-card, .justify-card, .theory-item, ' +
    '.tech-feature-card, .instrument-card, .step, .level-card, ' +
    '.pedagogy-card, .author-card, .population-card, .norm-group'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  observeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });


  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 80;
    let current = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

});
