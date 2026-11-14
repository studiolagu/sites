/* MR Usinagem — script.js (Vanilla JS) */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5549984093283';

  function buildWhatsAppLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Menu móvel ---------- */
  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('menu');
    if (!toggle || !nav) return;

    var desktop = window.matchMedia('(min-width: 1024px)');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      nav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    function onChange() { if (desktop.matches) setOpen(false); }
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else desktop.addListener(onChange);
  }

  /* ---------- Cabeçalho ao rolar ---------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function update() { header.classList.toggle('is-scrolled', window.scrollY > 10); }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Animações de entrada + Contadores ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 900;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(eased * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          var counter = entry.target.querySelector('[data-count]');
          if (counter) animateCounter(counter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Galeria: Filtros + Lightbox ---------- */
  function initGallery() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        items.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) item.classList.add('is-visible');
        });
      });
    });

    var lightbox = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    var lbCaption = document.getElementById('lightbox-caption');
    if (!lightbox || !lbImg || !lbCaption) return;

    var visibleTriggers = [];
    var currentIndex = 0;

    function openLightbox(trigger) {
      visibleTriggers = Array.prototype.slice.call(
        document.querySelectorAll('.gallery-item:not(.is-hidden) .gallery-trigger')
      );
      currentIndex = visibleTriggers.indexOf(trigger);
      if (currentIndex < 0) currentIndex = 0;
      showSlide(currentIndex);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    function showSlide(index) {
      if (!visibleTriggers.length) return;
      currentIndex = (index + visibleTriggers.length) % visibleTriggers.length;
      var t = visibleTriggers[currentIndex];
      lbImg.src = t.getAttribute('data-src');
      lbImg.alt = t.querySelector('img').alt;
      lbCaption.textContent = t.getAttribute('data-caption') || '';
    }

    document.querySelectorAll('.gallery-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () { openLightbox(trigger); });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { showSlide(currentIndex - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { showSlide(currentIndex + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      else if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFaq() {
    var questions = document.querySelectorAll('.faq-q');
    questions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var item = btn.closest('.faq-item');
        var answer = item.querySelector('.faq-a');

        questions.forEach(function (other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            other.closest('.faq-item').classList.remove('is-open');
            other.closest('.faq-item').querySelector('.faq-a').hidden = true;
          }
        });

        btn.setAttribute('aria-expanded', String(!expanded));
        item.classList.toggle('is-open', !expanded);
        answer.hidden = expanded;
      });
    });
  }

  /* ---------- Formulário Simplificado ---------- */
  function initForm() {
    var form = document.getElementById('form-contato');
    if (!form) return;
    var status = document.getElementById('form-status');

    var rules = {
      nome: function (v) { return v.trim().length >= 2 ? '' : 'Informe seu nome.'; },
      necessidade: function (v) { return v.trim().length >= 5 ? '' : 'Descreva brevemente o que precisa estampar.'; }
    };

    function setError(name, message) {
      var field = form.elements[name];
      var out = document.getElementById(name + '-erro');
      var wrap = field.closest('.field');
      if (out) out.textContent = message;
      wrap.classList.toggle('has-error', Boolean(message));
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateField(name) {
      var msg = rules[name](form.elements[name].value);
      setError(name, msg);
      return !msg;
    }

    Object.keys(rules).forEach(function (name) {
      var el = form.elements[name];
      el.addEventListener('blur', function () { validateField(name); });
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('has-error')) validateField(name);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
      });
      if (firstInvalid) {
        status.textContent = 'Preencha os campos obrigatórios destacados.';
        firstInvalid.focus();
        return;
      }

      var segmento = form.elements.segmento.value;
      var lines = [
        'Olá! Vim pelo site da MR Usinagem e gostaria de solicitar um orçamento.',
        '',
        'Nome: ' + form.elements.nome.value.trim()
      ];
      if (segmento) lines.push('Segmento: ' + segmento);
      lines.push('Necessidade: ' + form.elements.necessidade.value.trim());

      var url = buildWhatsAppLink(lines.join('\n'));
      status.textContent = 'Abrindo o WhatsApp com sua mensagem...';
      var win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
    });
  }

  function initYear() {
    var el = document.getElementById('ano');
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    document.documentElement.classList.add('js');
    try {
      initMenu();
      initHeader();
      initReveal();
      initGallery();
      initFaq();
      initForm();
      initYear();
    } catch (err) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      if (window.console) console.error(err);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
