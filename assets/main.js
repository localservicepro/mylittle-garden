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

    /* ---- Before/after comparison slider (pointer + keyboard) ---- */
    document.querySelectorAll('[data-ba-slider]').forEach(function (slider) {
      var handle = slider.querySelector('.ba-slider__handle');
      var dragging = false;

      function clamp(v) { return Math.max(0, Math.min(100, v)); }
      function posFromX(clientX) {
        var r = slider.getBoundingClientRect();
        return clamp(((clientX - r.left) / r.width) * 100);
      }
      function setPos(v) {
        slider.style.setProperty('--pos', v + '%');
        if (handle) handle.setAttribute('aria-valuenow', Math.round(v));
      }
      function current() {
        return parseFloat(getComputedStyle(slider).getPropertyValue('--pos')) || 50;
      }

      function start(e) {
        dragging = true;
        slider.classList.add('is-dragging', 'is-touched');
        setPos(posFromX(e.clientX));
        if (slider.setPointerCapture && e.pointerId != null) {
          try { slider.setPointerCapture(e.pointerId); } catch (err) {}
        }
        e.preventDefault();
      }
      function move(e) { if (dragging) setPos(posFromX(e.clientX)); }
      function end() { if (!dragging) return; dragging = false; slider.classList.remove('is-dragging'); }

      slider.addEventListener('pointerdown', start);
      slider.addEventListener('pointermove', move);
      slider.addEventListener('pointerup', end);
      slider.addEventListener('pointercancel', end);
      window.addEventListener('pointerup', end);

      if (handle) {
        handle.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            slider.classList.add('is-touched');
            setPos(clamp(current() + (e.key === 'ArrowLeft' ? -4 : 4)));
            e.preventDefault();
          }
        });
      }

      // One-time gentle intro sweep (JS-animated, no CSS transition needed)
      setPos(50);
      var played = false;
      function animateTo(target, dur, done) {
        if (dragging) { if (done) done(); return; }
        var from = current(), t0 = null;
        function step(ts) {
          if (dragging) return;               // user grabbed it — hand over control
          if (t0 === null) t0 = ts;
          var t = Math.min(1, (ts - t0) / dur);
          var e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
          setPos(from + (target - from) * e);
          if (t < 1) requestAnimationFrame(step); else if (done) done();
        }
        requestAnimationFrame(step);
      }
      function sweep() {
        if (played) return; played = true;
        animateTo(74, 550, function () {
          animateTo(28, 650, function () { animateTo(50, 650); });
        });
      }
      if ('IntersectionObserver' in window) {
        var io2 = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { setTimeout(sweep, 350); io2.unobserve(en.target); } });
        }, { threshold: 0.35 });
        io2.observe(slider);
      } else { sweep(); }
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
