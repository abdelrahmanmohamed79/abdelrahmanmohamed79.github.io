(function () {
    'use strict';
  
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    // Mobile menu toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
  
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  
    // Header scroll effect
    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    // Fade-in sections on scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = { rootMargin: '-5% 0px -5% 0px', threshold: 0 };
  
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
        }
      });
    }, observerOptions);
  
    const style = document.createElement('style');
    style.textContent = [
      '.section { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }',
      '.section[data-visible="true"] { opacity: 1; transform: translateY(0); }'
    ].join(' ');
    document.head.appendChild(style);
  
    sections.forEach(function (section) {
      observer.observe(section);
    });
  })();
  