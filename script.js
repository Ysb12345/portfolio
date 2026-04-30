/* ============================================================
   PORTFOLIO SCRIPT - Yashraj Boralkar
   Modern, interactive portfolio JavaScript
============================================================ */

'use strict';

// ─── DOM Ready ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateExperience();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initProficiencyBars();
  initContactForm();
  initBackToTop();
  initActiveNavLinks();
  initHamburger();
  initSmoothScroll();
});

// ─── UPDATE EXPERIENCE DYNAMICALLY ───────────────────────────
function updateExperience() {
  const startDate = new Date(2023, 8, 1); // September 2023
  const now = new Date();
  
  const totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const expString = years + '.' + months;
  
  const heroExp = document.getElementById('heroExp');
  if (heroExp) {
    heroExp.innerHTML = expString + '<span class="stat-plus">+</span>';
    heroExp.setAttribute('data-target', expString);
  }
  
  const aboutExp = document.getElementById('aboutExp');
  if (aboutExp) {
    aboutExp.textContent = expString;
  }

  // Update the meta description dynamically
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = metaDesc.content.replace(/\d+\.\d+ years of experience/, expString + ' years of experience');
  }
}



// ─── NAVBAR ──────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

// ─── HAMBURGER MENU ──────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── ACTIVE NAV LINKS ────────────────────────────────────────
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

// ─── TYPING EFFECT ───────────────────────────────────────────
function initTypingEffect() {
  const element = document.getElementById('typedText');
  if (!element) return;

  const texts = [
    'Business Analyst',
    'Agile Champion',
    'Requirement Expert',
    'Stakeholder Bridge',
    'Problem Solver'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      element.textContent = currentText.substring(0, charIndex);
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1200);
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function initScrollReveal() {
  // Add reveal classes to elements
  const revealMap = [
    // General section items
    { selector: '.section-header', cls: 'reveal' },
    { selector: '.timeline-item', cls: 'reveal' },
    { selector: '.project-card', cls: 'reveal' },
    { selector: '.skill-category', cls: 'reveal' },
    { selector: '.edu-card', cls: 'reveal' },
    { selector: '.contact-card', cls: 'reveal' },
    { selector: '.about-content', cls: 'reveal-right' },
    { selector: '.about-visual', cls: 'reveal-left' },
    { selector: '.highlight-item', cls: 'reveal' },
    { selector: '.proficiency-section', cls: 'reveal' },
    { selector: '.contact-form-wrap', cls: 'reveal-right' },
    { selector: '.contact-info', cls: 'reveal-left' },
    { selector: '.availability-badge', cls: 'reveal' },
  ];

  revealMap.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(cls);
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ─── PROFICIENCY BARS ────────────────────────────────────────
function initProficiencyBars() {
  const bars = document.querySelectorAll('.prof-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

// ─── CONTACT FORM ────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    firstName: { required: true, minLen: 2, label: 'First Name' },
    lastName: { required: true, minLen: 2, label: 'Last Name' },
    email: { required: true, type: 'email', label: 'Email' },
    subject: { required: true, minLen: 3, label: 'Subject' },
    message: { required: true, minLen: 10, label: 'Message' }
  };

  function validateField(id, config) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(`${id}Err`);
    const value = input.value.trim();
    let errorMsg = '';

    if (config.required && !value) {
      errorMsg = `${config.label} is required.`;
    } else if (config.minLen && value.length < config.minLen) {
      errorMsg = `${config.label} must be at least ${config.minLen} characters.`;
    } else if (config.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMsg = 'Please enter a valid email address.';
    }

    if (errorMsg) {
      input.classList.add('error');
      errorEl.textContent = errorMsg;
      errorEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('error');
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
      return true;
    }
  }

  // Real-time validation
  Object.entries(fields).forEach(([id, config]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(id, config));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(id, config);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const results = Object.entries(fields).map(([id, config]) => validateField(id, config));
    const allValid = results.every(Boolean);

    if (!allValid) return;

    // Simulate form submission
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
      formSuccess.classList.add('visible');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
        submitBtn.disabled = false;
        formSuccess.classList.remove('visible');
      }, 4000);
    }, 1500);
  });
}

// ─── BACK TO TOP ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── HOVER PARTICLE EFFECT ON HERO ───────────────────────────
(function initHeroInteractivity() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    const orb1 = hero.querySelector('.orb-1');
    const orb2 = hero.querySelector('.orb-2');
    if (orb1) orb1.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.2}px, ${-y * 0.2}px)`;
  });
})();

// ─── SKILL PILL HOVER RIPPLE ─────────────────────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(37,99,235,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.5s ease-out forwards;
      pointer-events: none;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ─── PROJECT CARD TILT EFFECT ────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ─── COUNTER ANIMATION FOR STATS ─────────────────────────────
function animateCounter(element, targetNum, targetString, duration = 1500, isFloat = false) {
  let start = 0;
  const step = targetNum / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= targetNum) {
      start = targetNum;
      clearInterval(timer);
      element.textContent = targetString;
      return;
    }
    element.textContent = isFloat ? start.toFixed(1) : Math.floor(start);
  }, 16);
}

// Observe hero stats
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        let rawText = el.getAttribute('data-target') || el.textContent;
        const text = rawText.replace(/[^0-9.]/g, '');
        const num = parseFloat(text);
        const isFloat = text.includes('.');
        const plus = el.querySelector('.stat-plus');
        
        el.textContent = isFloat ? '0.0' : '0';
        if (plus) el.appendChild(plus);
        setTimeout(() => {
          const textNode = el.firstChild;
          animateCounter(textNode || el, num, text, 1200, isFloat);
        }, 300);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ─── PAGE LOADED CLASS ───────────────────────────────────────
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
