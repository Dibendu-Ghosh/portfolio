/**
 * DIBENDU GHOSH - ACADEMIC & ENGINEERING FOLIO SCRIPT
 * Aesthetic: Clean Off-White, Black & Aristocratic Maroon
 * Features: Typewriter, Theme Switcher, Mobile Nav,
 * Directional Downward & Upward Scroll Reveal Animations,
 * Active Nav Observer, Skill Bar Fill, Copy to Clipboard, Form Dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initThemeToggle();
  initMobileNav();
  initDirectionalScrollEffects();
  initSkillBars();
  initSmoothNavScroll();
  initCurrentYear();
});

/* ===================================================================
   1. SCHOLARLY TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typingText');
  if (!targetElement) return;

  const roles = [
    'B.Tech CSE (AI & ML) Scholar',
    'Newton School of Technology × ADYPU',
    'Machine Learning & Statistical Theory',
    'Algorithmic Logic & Computer Science',
    'Principled Software Engineering'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 38;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, pauseStart);
        return;
      }
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* ===================================================================
   2. THEME TOGGLE (OFF-WHITE DAY / CHARCOAL MAHOGANY NIGHT)
   =================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('folio-theme') || 'vintage-cream';
  if (savedTheme === 'midnight-mahogany') {
    body.classList.remove('vintage-cream');
    body.classList.add('midnight-mahogany');
  } else {
    body.classList.add('vintage-cream');
    body.classList.remove('midnight-mahogany');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('midnight-mahogany')) {
        body.classList.remove('midnight-mahogany');
        body.classList.add('vintage-cream');
        localStorage.setItem('folio-theme', 'vintage-cream');
      } else {
        body.classList.remove('vintage-cream');
        body.classList.add('midnight-mahogany');
        localStorage.setItem('folio-theme', 'midnight-mahogany');
      }
    });
  }
}

/* ===================================================================
   3. MOBILE NAVIGATION MENU
   =================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
}

/* ===================================================================
   4. DIRECTIONAL DOWNWARD & UPWARD SCROLL REVEAL ANIMATIONS
   =================================================================== */
function initDirectionalScrollEffects() {
  const backToTop = document.getElementById('backToTop');
  const revealElements = document.querySelectorAll('[data-reveal]');
  let lastScrollY = window.pageYOffset;

  // Track scroll direction (downward vs upward)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY < lastScrollY - 4) {
      document.body.classList.add('scrolling-up');
      document.body.classList.remove('scrolling-down');
    } else if (currentScrollY > lastScrollY + 4) {
      document.body.classList.add('scrolling-down');
      document.body.classList.remove('scrolling-up');
    }

    lastScrollY = currentScrollY;

    // Back to top button visibility
    if (backToTop) {
      if (currentScrollY > 380) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  }, { passive: true });

  // Directional Reveal Observer
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Reset when scrolling far out of view to allow repeated fluid reveal
          const rect = entry.target.getBoundingClientRect();
          if (rect.top > window.innerHeight + 100 || rect.bottom < -100) {
            entry.target.classList.remove('revealed');
          }
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Active section tracking on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   5. SMOOTH NAV LINK SCROLLING
   =================================================================== */
function initSmoothNavScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Accurate smooth scroll taking fixed navbar height into consideration
        const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 75;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight + 10);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active class on nav links
        document.querySelectorAll('.nav-link').forEach(l => {
          if (l.getAttribute('href') === '#' + targetId) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ===================================================================
   6. SKILL BAR ANIMATION ON VIEW
   =================================================================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  function triggerBars() {
    fills.forEach(fill => {
      const width = fill.style.getPropertyValue('--width');
      if (width) {
        fill.style.width = width;
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerBars();
        }
      });
    }, { threshold: 0.15 });

    const skillSection = document.getElementById('skills');
    if (skillSection) {
      skillObserver.observe(skillSection);
    } else {
      triggerBars();
    }
  } else {
    triggerBars();
  }
}

/* ===================================================================
   7. COPY TO CLIPBOARD HELPER
   =================================================================== */
window.copyText = function(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Recorded';
    buttonElement.style.color = 'var(--maroon-primary)';
    buttonElement.style.borderColor = 'var(--maroon-primary)';

    setTimeout(() => {
      buttonElement.innerHTML = originalHtml;
      buttonElement.style.color = '';
      buttonElement.style.borderColor = '';
    }, 2200);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};

/* ===================================================================
   8. FORM SUBMISSION (LETTER DISPATCH)
   =================================================================== */
window.handleFormSubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  const targetEmail = 'ankitghosh1983@gmail.com';
  const mailSubject = encodeURIComponent(`Collegiate Communication: ${subject}`);
  const mailBody = encodeURIComponent(
    `Dear Dibendu Ghosh,\n\n${message}\n\nRespectfully,\n${name}\nReturn Address: ${email}`
  );

  const mailtoLink = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

  const toast = document.getElementById('formToast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  window.location.href = mailtoLink;
};

/* ===================================================================
   9. FOOTER CURRENT YEAR
   =================================================================== */
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
