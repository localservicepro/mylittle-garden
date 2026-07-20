/* My Little Garden Helper — interactions
   Vanilla JS, no dependencies. Webflow-friendly (can be re-created with
   Webflow interactions, or dropped in as custom code). */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Mobile navigation ---- */
    var navToggle = document.querySelector('[data-nav-toggle]');
    var mobileNav = document.querySelector('[data-mobile-nav]');
    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', function () {
        var open = mobileNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ---- FAQ accordion ---- */
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var btn = item.querySelector('.faq__q');
      var panel = item.querySelector('.faq__a');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        // Optional single-open behaviour within a list
        var list = item.closest('.faq__list');
        if (list && !isOpen) {
          list.querySelectorAll('.faq__item.is-open').forEach(function (openItem) {
            openItem.classList.remove('is-open');
            var p = openItem.querySelector('.faq__a');
            var b = openItem.querySelector('.faq__q');
            if (p) p.style.maxHeight = null;
            if (b) b.setAttribute('aria-expanded', 'false');
          });
        }
        item.classList.toggle('is-open');
        if (item.classList.contains('is-open')) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        } else {
          panel.style.maxHeight = null;
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    /* ---- Reveal on scroll ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- Before/after comparison slider ---- */
    document.querySelectorAll('[data-ba-slider]').forEach(function (slider) {
      var range = slider.querySelector('.ba-slider__range');
      if (!range) return;
      var set = function (v) { slider.style.setProperty('--pos', v + '%'); };
      set(range.value);
      range.addEventListener('input', function () {
        slider.classList.add('is-dragging', 'is-touched');
        set(range.value);
      });
      var release = function () { slider.classList.remove('is-dragging'); };
      range.addEventListener('pointerup', release);
      range.addEventListener('pointercancel', release);
      range.addEventListener('mouseleave', release);

      // One-time gentle intro sweep when it scrolls into view
      var played = false;
      var playSweep = function () {
        if (played) return; played = true;
        var steps = [78, 26, 50], i = 0;
        var tick = function () {
          if (i >= steps.length) return;
          set(steps[i]); range.value = steps[i]; i++;
          setTimeout(tick, 750);
        };
        setTimeout(tick, 350);
      };
      if ('IntersectionObserver' in window) {
        var io2 = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { playSweep(); io2.unobserve(e.target); } });
        }, { threshold: 0.4 });
        io2.observe(slider);
      } else { playSweep(); }
    });

    /* ---- Quote form (demo submit — swap action for Webflow/Formspree later) ---- */
    var form = document.querySelector('[data-quote-form]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var card = form.closest('.quote-card') || form.parentNode;
        var success = card.querySelector('[data-form-success]');
        form.classList.add('is-hidden');
        if (success) success.classList.remove('is-hidden');
      });
    }
  });
})();
