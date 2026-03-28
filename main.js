(function() {
  'use strict';

  // -- Nav scroll state --
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // -- Mobile menu --
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const mobileQuery = window.matchMedia('(max-width: 700px)');

  function syncMobileNav() {
    if (mobileQuery.matches) {
      if (!navLinks.classList.contains('open')) navLinks.hidden = true;
    } else {
      navLinks.hidden = false;
    }
  }
  syncMobileNav();
  mobileQuery.addEventListener('change', syncMobileNav);

  function closeMenu() {
    navLinks.classList.remove('open');
    if (mobileQuery.matches) navLinks.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  function openMenu() {
    navLinks.hidden = false;
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on scroll
  window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('open')) closeMenu();
  }, { passive: true });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });

  // -- Active section highlighting --
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '-64px 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // -- Intersection Observer for reveal animations --
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  // -- Smooth reveal on load for hero --
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120);
    });
  });

  // -- Smooth FAQ expand/collapse --
  document.querySelectorAll('.faq-item').forEach(details => {
    const answer = details.querySelector('.faq-item__answer');
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';

    function syncFaq(open) {
      if (open) {
        const h = answer.scrollHeight;
        answer.style.maxHeight = h + 'px';
        answer.style.opacity = '1';
        answer.addEventListener('transitionend', function handler() {
          answer.style.maxHeight = 'none';
          answer.removeEventListener('transitionend', handler);
        }, { once: true });
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(() => {
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
        });
      }
    }

    details.addEventListener('toggle', () => syncFaq(details.open));

    // Set initial state
    if (details.open) {
      answer.style.maxHeight = 'none';
      answer.style.opacity = '1';
    } else {
      answer.style.maxHeight = '0';
      answer.style.opacity = '0';
    }
  });

  // -- Contact terminal typing animation --
  const terminal = document.querySelector('.contact-terminal__body');
  if (terminal) {
    const lines = [
      { type: 'prompt', text: 'C:\\Users\\Edward>' },
      { type: 'cmd', text: ' type about.txt' },
      { type: 'break' },
      { type: 'break' },
      { type: 'line', label: 'Name:', value: 'Edward Williams' },
      { type: 'line', label: 'Location:', value: 'Dallas, TX' },
      { type: 'line', label: 'Origin:', value: 'Houston, TX' },
      { type: 'line', label: 'Focus:', value: 'Full-Stack & AI Integration' },
      { type: 'line', label: 'Stack:', value: 'Vue 3 + Node + MongoDB + Claude/GPT/Gemini' },
      { type: 'break' },
      { type: 'prompt', text: 'C:\\Users\\Edward>' },
      { type: 'cmd', text: ' echo %STATUS%' },
      { type: 'break' },
      { type: 'accent', text: 'Building things that work. Shipping to production.' },
      { type: 'break' },
      { type: 'prompt', text: 'C:\\Users\\Edward>' },
      { type: 'cursor', text: '_' },
    ];

    let terminalAnimated = false;

    function typeTerminal() {
      if (terminalAnimated) return;
      terminalAnimated = true;
      terminal.innerHTML = '';
      let delay = 0;
      const typeSpeed = 25;
      const lineDelay = 80;

      lines.forEach(line => {
        if (line.type === 'break') {
          delay += lineDelay;
          setTimeout(() => {
            terminal.appendChild(document.createElement('br'));
          }, delay);
        } else if (line.type === 'prompt') {
          const charDelay = delay;
          setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'prompt';
            span.textContent = line.text;
            terminal.appendChild(span);
          }, charDelay);
          delay += lineDelay;
        } else if (line.type === 'cmd') {
          const text = line.text;
          for (let i = 0; i < text.length; i++) {
            const charDelay = delay + i * typeSpeed;
            ((ch, d) => {
              setTimeout(() => {
                // Create or find the cmd span
                let cmdSpan = terminal.querySelector('.cmd-typing');
                if (!cmdSpan) {
                  cmdSpan = document.createElement('span');
                  cmdSpan.className = 'cmd cmd-typing';
                  terminal.appendChild(cmdSpan);
                }
                cmdSpan.textContent += ch;
              }, d);
            })(text[i], charDelay);
          }
          delay += text.length * typeSpeed + lineDelay;
          // Remove typing class and add line break
          setTimeout(() => {
            const cmdSpan = terminal.querySelector('.cmd-typing');
            if (cmdSpan) cmdSpan.classList.remove('cmd-typing');
            terminal.appendChild(document.createElement('br'));
          }, delay);
        } else if (line.type === 'line') {
          const charDelay = delay;
          setTimeout(() => {
            const labelSpan = document.createElement('span');
            labelSpan.className = 'output';
            labelSpan.textContent = line.label;
            terminal.appendChild(labelSpan);

            const space = document.createTextNode(' ');
            terminal.appendChild(space);

            const valueSpan = document.createElement('span');
            valueSpan.className = 'accent';
            valueSpan.textContent = line.value;
            terminal.appendChild(valueSpan);

            terminal.appendChild(document.createElement('br'));
          }, charDelay);
          delay += lineDelay;
        } else if (line.type === 'accent') {
          const charDelay = delay;
          setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'accent';
            span.textContent = line.text;
            terminal.appendChild(span);
            terminal.appendChild(document.createElement('br'));
          }, charDelay);
          delay += lineDelay;
        } else if (line.type === 'cursor') {
          const charDelay = delay;
          setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'dim';
            span.textContent = line.text;
            terminal.appendChild(span);
          }, charDelay);
        }
      });
    }

    // Trigger animation when terminal scrolls into view
    const terminalEl = document.querySelector('.contact-terminal');
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeTerminal();
          terminalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    terminalObserver.observe(terminalEl);
  }

  // -- Dark mode toggle --
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    function syncThemeButton() {
      const isDark = document.documentElement.classList.contains('dark-theme');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }

    // Check saved preference or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark-theme');
    }
    syncThemeButton();

    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-theme');
      const isDark = document.documentElement.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      syncThemeButton();
    });
  }

})();
