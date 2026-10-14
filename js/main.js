/* =============================================================================
   VÉRTICE — JavaScript principal (vanilla, sin dependencias)
   Organizado en módulos independientes que se inicializan de forma segura:
     1. Encabezado con estado al hacer scroll
     2. Menú de navegación móvil
     3. Carrusel de producto accesible
     4. Validación del formulario de contacto
     5. Utilidades (año del pie de página, animaciones de aparición)
   ===========================================================================*/
'use strict';

/* ---------------------------------------------------------------------------
   1. Encabezado: refuerza el fondo al hacer scroll
--------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------------------------------------------------------------------------
   2. Menú de navegación móvil
   Gestiona aria-expanded, cierre con Escape y al hacer clic fuera.
--------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al elegir un enlace o al salir del área
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return;
    if (!event.target.closest('[data-nav]') && !event.target.closest('[data-nav-toggle]')) {
      close();
    }
  });
}

/* ---------------------------------------------------------------------------
   3. Carrusel de producto
   Accesible por teclado (flechas), botones, puntos y gestos táctiles.
   El avance automático respeta "prefers-reduced-motion" y se pausa al
   interactuar o al ocultarse la pestaña.
--------------------------------------------------------------------------- */
function initCarousel() {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const track = root.querySelector('[data-carousel-track]');
  const viewport = root.querySelector('[data-carousel-viewport]');
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dotsBox = root.querySelector('[data-carousel-dots]');
  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  const AUTOPLAY_MS = 6000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;

  // Crea los puntos de navegación dinámicamente
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1} de ${slides.length}`);
    dot.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(dot);
    return dot;
  });

  /** Muestra la diapositiva indicada y sincroniza el estado accesible. */
  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
    dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === index)));
  }

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  prevBtn.addEventListener('click', () => { prev(); restart(); });
  nextBtn.addEventListener('click', () => { next(); restart(); });

  // Navegación por teclado dentro del área del carrusel
  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { next(); restart(); }
    if (event.key === 'ArrowLeft') { prev(); restart(); }
  });

  // Gestos táctiles: deslizar a izquierda o derecha
  let touchStartX = 0;
  viewport.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 50) return;
    delta < 0 ? next() : prev();
    restart();
  }, { passive: true });

  // Avance automático (desactivado si el usuario prefiere menos movimiento)
  function start() {
    if (reduceMotion) return;
    stop();
    timer = window.setInterval(next, AUTOPLAY_MS);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function restart() { start(); }

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  goTo(0);
  start();
}

/* ---------------------------------------------------------------------------
   4. Formulario de contacto
   Validación en el cliente con reglas por campo, mensajes accesibles
   (aria-invalid + role="alert") y estado de envío. El backend real debe
   reemplazar la simulación de "enviarFormulario".
--------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitBtn = form.querySelector('.form-submit');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRe = /^[+]?[\d\s().-]{7,20}$/;

  /** Reglas de validación: cada función devuelve un mensaje o cadena vacía. */
  const rules = {
    nombre: (v) => {
      if (!v.trim()) return 'Ingresa tu nombre completo.';
      if (v.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    },
    email: (v) => {
      if (!v.trim()) return 'Ingresa tu correo corporativo.';
      if (!emailRe.test(v.trim())) return 'Ingresa un correo válido, por ejemplo nombre@empresa.com.';
      return '';
    },
    telefono: (v) => {
      if (!v.trim()) return ''; // Campo opcional
      if (!phoneRe.test(v.trim())) return 'Ingresa un teléfono válido (solo números y +).';
      return '';
    },
    empresa: (v) => {
      if (!v.trim()) return 'Ingresa el nombre de tu empresa.';
      if (v.trim().length < 2) return 'El nombre de la empresa es demasiado corto.';
      return '';
    },
    producto: (v) => (v ? '' : 'Selecciona el producto de tu interés.'),
    mensaje: (v) => {
      if (!v.trim()) return 'Cuéntanos brevemente qué necesitas.';
      if (v.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
      return '';
    },
    privacidad: (_, el) => (el.checked ? '' : 'Debes aceptar la política de tratamiento de datos.'),
  };

  /** Valida un campo y refleja el resultado en la interfaz. */
  function validateField(el) {
    const rule = rules[el.name];
    if (!rule) return true;

    const message = rule(el.value, el);
    const errorBox = form.querySelector(`[data-error-for="${el.name}"]`);

    if (message) {
      el.setAttribute('aria-invalid', 'true');
      if (errorBox) errorBox.textContent = message;
      return false;
    }

    el.removeAttribute('aria-invalid');
    if (errorBox) errorBox.textContent = '';
    return true;
  }

  const fields = Array.from(form.elements).filter((el) => rules[el.name]);

  fields.forEach((el) => {
    // Valida al salir del campo; revalida en vivo solo si ya estaba marcado con error
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(el);
    });
    el.addEventListener('change', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(el);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Trampa anti-spam: si el campo oculto tiene valor, se descarta silenciosamente
    if (form.elements.website && form.elements.website.value) {
      showStatus('No pudimos procesar la solicitud.', 'error');
      return;
    }

    const invalid = fields.filter((el) => !validateField(el));

    if (invalid.length) {
      showStatus('Revisa los campos marcados antes de continuar.', 'error');
      invalid[0].focus();
      return;
    }

    sendForm();
  });

  /** Simula el envío. En producción, aquí va el fetch al backend/CRM. */
  function sendForm() {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    window.setTimeout(() => {
      showStatus('¡Gracias! Recibimos tu solicitud y te contactaremos en menos de 48 horas.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud';
    }, 900);
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.classList.toggle('is-success', type === 'success');
    status.classList.toggle('is-error', type === 'error');
  }
}

/* ---------------------------------------------------------------------------
   5. Utilidades
--------------------------------------------------------------------------- */

/** Actualiza el año del pie de página automáticamente. */
function initFooterYear() {
  const target = document.querySelector('[data-year]');
  if (target) target.textContent = new Date().getFullYear();
}

/** Aparición suave de secciones al hacer scroll (opcional y accesible). */
function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.section-head, .benefit-card, .testimonial, .carousel');
  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 500ms ease, transform 500ms ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------------
   Inicialización
--------------------------------------------------------------------------- */
function init() {
  initHeaderScroll();
  initMobileNav();
  initCarousel();
  initContactForm();
  initFooterYear();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
