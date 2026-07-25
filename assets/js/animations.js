(function () {
  'use strict';

  // Fade-in / slide-up on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Staggered children (cards, diff items, steps)
  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var children = entry.target.querySelectorAll('.reveal-child');
        children.forEach(function (child, i) {
          child.style.transitionDelay = (i * 120) + 'ms';
          child.classList.add('visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-stagger').forEach(function (el) {
    staggerObserver.observe(el);
  });

  // Hero entrance animation
  var hero = document.querySelector('[class*="-hero-content"]');
  if (hero) {
    hero.classList.add('hero-animate');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('hero-visible');
      });
    });
  }

  // Subtle parallax on hero background
  var heroBg = document.querySelector('[class*="-hero-bg"]');
  if (heroBg && window.innerWidth > 768) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrolled = window.pageYOffset;
          heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) scale(1.05)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Counter animation
  document.querySelectorAll('.count-up').forEach(function (el) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1600;
          var start = 0;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(el);
  });
})();
