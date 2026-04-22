// EXEC — main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Email form ──
  const forms = document.querySelectorAll('.email-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      const val = input.value.trim();

      if (!val || !val.includes('@')) {
        input.style.borderColor = 'rgba(255,80,80,0.5)';
        setTimeout(() => input.style.borderColor = '', 2000);
        return;
      }

      btn.textContent = 'QUEUED';
      btn.style.background = '#1a1a1a';
      btn.style.color = '#888';
      input.value = '';
      input.placeholder = 'YOU\'RE IN THE LIST';
      input.disabled = true;
      btn.disabled = true;
    });
  });

  // ── Size selector ──
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Add to cart (pre-launch → email capture) ──
  const atcBtn = document.querySelector('.add-to-cart');
  if (atcBtn) {
    atcBtn.addEventListener('click', () => {
      const hasSize = document.querySelector('.size-btn.active');
      if (!hasSize) {
        const sizeGrid = document.querySelector('.size-grid');
        sizeGrid.style.outline = '1px solid rgba(255,80,80,0.4)';
        setTimeout(() => sizeGrid.style.outline = '', 2000);
        return;
      }

      atcBtn.textContent = 'DROP ALERT SET —';
      atcBtn.style.background = '#1a1a1a';
      atcBtn.style.color = '#888888';
      atcBtn.style.cursor = 'default';
      atcBtn.disabled = true;
    });
  }

  // ── Accordion ──
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const toggle = header.querySelector('.accordion-toggle');
      const isOpen = header.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling.classList.remove('open');
        h.querySelector('.accordion-toggle').textContent = '+';
      });

      if (!isOpen) {
        header.classList.add('open');
        body.classList.add('open');
        toggle.textContent = '−';
      }
    });
  });

  // ── Ticker duplicate for seamless loop ──
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += tickerInner.innerHTML;
  }

  // ── Nav scroll effect ──
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
      } else {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.05)';
      }
    }, { passive: true });
  }

  // ── Subtle entrance animation ──
  const hero = document.querySelector('.hero-title');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    hero.style.transition = 'opacity 800ms ease, transform 800ms ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  }

});
