// EXEC — main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Email forms ──
  const forms = document.querySelectorAll('.email-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      const val = input ? input.value.trim() : '';

      if (!input || !val || !val.includes('@')) {
        if (input) {
          input.style.borderColor = 'rgba(255,80,80,0.5)';
          setTimeout(() => input.style.borderColor = '', 2000);
        }
        return;
      }

      if (btn) {
        btn.textContent = 'QUEUED';
        btn.style.background = '#1a1a1a';
        btn.style.color = '#888';
        btn.disabled = true;
      }
      input.value = '';
      input.placeholder = 'YOU\'RE IN THE LIST';
      input.disabled = true;
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

  // ── Checkout CTA / Shopify buy button ──
  const atcBtn = document.querySelector('.add-to-cart');
  const shopifyConfig = window.EXEC_SHOPIFY_BUY_BUTTON;

  function ensureShopifySdk() {
    return new Promise((resolve, reject) => {
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[data-shopify-buy-sdk]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.dataset.shopifyBuySdk = 'true';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function openShopifyCheckout() {
    if (!shopifyConfig) return;
    await ensureShopifySdk();
    const client = window.ShopifyBuy.buildClient({
      domain: shopifyConfig.domain,
      storefrontAccessToken: shopifyConfig.storefrontAccessToken,
    });

    const product = await client.product.fetch(shopifyConfig.productId);
    const activeSize = document.querySelector('.size-btn.active');
    const size = activeSize ? activeSize.getAttribute('data-size') : null;
    const variant = product.variants.find(v => {
      const title = (v.title || '').toUpperCase();
      return size && (title === size || title.includes(size));
    }) || product.variants[0];

    if (variant && variant.checkoutUrl) {
      window.location.href = variant.checkoutUrl;
      return;
    }

    const cart = await client.checkout.create();
    await client.checkout.addLineItems(cart.id, [{ variantId: variant.id, quantity: 1 }]);
    window.location.href = cart.webUrl;
  }

  if (atcBtn) {
    atcBtn.addEventListener('click', async (e) => {
      const activeSize = document.querySelector('.size-btn.active');
      const sizeGrid = document.querySelector('.size-grid');
      if (!activeSize) {
        e.preventDefault();
        if (sizeGrid) {
          sizeGrid.style.outline = '1px solid rgba(255,80,80,0.4)';
          setTimeout(() => sizeGrid.style.outline = '', 2000);
        }
        return;
      }

      if (shopifyConfig) {
        e.preventDefault();
        try {
          atcBtn.textContent = 'OPENING CHECKOUT';
          await openShopifyCheckout();
        } catch (err) {
          console.error(err);
          atcBtn.textContent = 'TRY CHECKOUT AGAIN';
        }
      }
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
