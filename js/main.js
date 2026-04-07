// ── Detect root path (for pages inside /products/) ──
const ROOT = (() => {
  const d = document.currentScript?.src || '';
  return d.includes('/products/') || location.pathname.includes('/products/') ? '../' : './';
})();

// ── Inject topbar ──
function injectTopbar() {
  const el = document.createElement('div');
  el.className = 'topbar';
  el.innerHTML = `<div class="topbar-inner">
    <span>ООО «Медицинские Современные Технологии и Консалтинг» — г. Нижний Новгород</span>
    <div class="topbar-contacts">
      <span>📍 ул. Агрономическая, д. 52А</span>
      <a href="tel:+78314281054">📞 +7 (831) 428-10-54</a>
      <a href="mailto:mstknn@gmail.com">✉ mstknn@gmail.com</a>
    </div>
  </div>`;
  document.body.prepend(el);
}

// ── Inject nav ──
function injectNav() {
  const r = ROOT;
  const el = document.createElement('nav');
  el.innerHTML = `
  <div class="nav-inner">
    <a href="${r}index.html" class="logo">
      <img src="https://mstk-med.com/mstk/LOGO.png" alt="МСТК" />
      <div class="logo-text">
        <strong>МСТК</strong>
        <small>Bausch + Lomb Distributor</small>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="${r}about.html">О нас</a></li>
      <li>
        <a href="${r}products/index.html">Продукция ▾</a>
        <ul>
          <li>
            <a href="${r}products/iol.html">ИОЛ ▸</a>
            <ul>
              <li><a href="${r}products/envista.html">ENVISTA®</a></li>
              <li><a href="${r}products/envista-toric.html">enVista™ Toric</a></li>
              <li><a href="${r}products/luxgood.html">LuxGood™</a></li>
              <li><a href="${r}products/luxgood-toric.html">LuxGood™ Toric</a></li>
              <li><a href="${r}products/luxsmart.html">LuxSmart™</a></li>
              <li><a href="${r}products/luxsmart-toric.html">LuxSmart™ Toric</a></li>
              <li><a href="${r}products/akreos.html">Akreos® AO</a></li>
            </ul>
          </li>
          <li><a href="${r}products/equipment.html">Оборудование (Stellaris)</a></li>
          <li><a href="${r}products/surgery.html">Хирургия</a></li>
          <li><a href="${r}products/silicone.html">Силиконовые масла и растворы</a></li>
          <li><a href="${r}products/service.html">Обслуживание</a></li>
        </ul>
      </li>
      <li><a href="${r}contact.html" class="btn-nav">Связаться с нами</a></li>
    </ul>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>`;
  document.body.insertBefore(el, document.body.children[1]);
}

// ── Inject mobile nav ──
function injectMobileNav() {
  const r = ROOT;
  const el = document.createElement('div');
  el.className = 'mobile-nav';
  el.id = 'mobileNav';
  el.innerHTML = `
    <button class="mobile-nav-close" id="mobileClose">✕</button>
    <a href="${r}index.html">Главная</a>
    <a href="${r}about.html">О нас</a>
    <details class="mobile-nav-group">
      <summary>Продукция</summary>
      <details class="mobile-nav-group" style="margin-left:1rem">
        <summary>ИОЛ</summary>
        <a href="${r}products/envista.html">ENVISTA®</a>
        <a href="${r}products/envista-toric.html">enVista™ Toric</a>
        <a href="${r}products/luxgood.html">LuxGood™</a>
        <a href="${r}products/luxgood-toric.html">LuxGood™ Toric</a>
        <a href="${r}products/luxsmart.html">LuxSmart™</a>
        <a href="${r}products/luxsmart-toric.html">LuxSmart™ Toric</a>
        <a href="${r}products/akreos.html">Akreos® AO</a>
      </details>
      <a href="${r}products/equipment.html">Оборудование (Stellaris)</a>
      <a href="${r}products/surgery.html">Хирургия</a>
      <a href="${r}products/silicone.html">Силиконовые масла и растворы</a>
      <a href="${r}products/service.html">Обслуживание</a>
    </details>
    <a href="${r}contact.html" class="btn-primary">Связаться с нами</a>`;
  document.body.appendChild(el);
}

// ── Inject footer ──
function injectFooter() {
  const r = ROOT;
  const el = document.createElement('footer');
  el.innerHTML = `
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="https://mstk-med.com/mstk/LOGO.png" alt="МСТК" />
        </div>
        <p class="footer-about">ООО «Медицинские Современные Технологии и Консалтинг» — официальный дистрибьютор Bausch&nbsp;+&nbsp;Lomb в России с 2006 года.</p>
      </div>
      <div class="footer-col">
        <h4>Продукция</h4>
        <ul>
          <li><a href="${r}products/iol.html">ИОЛ — Каталог</a></li>
          <li><a href="${r}products/equipment.html">Stellaris Elite</a></li>
          <li><a href="${r}products/silicone.html">Силиконовые масла</a></li>
          <li><a href="${r}products/surgery.html">Хирургия</a></li>
          <li><a href="${r}products/service.html">Сервис</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Компания</h4>
        <ul>
          <li><a href="${r}about.html">О нас</a></li>
          <li><a href="${r}products/index.html">Вся продукция</a></li>
          <li><a href="${r}contact.html">Контакты</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Контакты</h4>
        <address>
          г. Нижний Новгород,<br>ул. Агрономическая, д. 52А<br><br>
          <a href="tel:+78314281054">+7 (831) 428-10-54</a><br>
          <a href="https://wa.me/79200684117">+7 920 068 41 17 (WA)</a><br>
          <a href="mailto:mstknn@gmail.com">mstknn@gmail.com</a>
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2006–2025 ООО «Медицинские Современные Технологии и Консалтинг»</span>
      <a href="${r}contact.html">Реквизиты по запросу</a>
    </div>
  </div>`;
  document.body.appendChild(el);
}

// ── Inject WA button ──
function injectWA() {
  const el = document.createElement('a');
  el.href = 'https://wa.me/79200684117';
  el.className = 'wa-float';
  el.target = '_blank';
  el.rel = 'noopener';
  el.setAttribute('aria-label', 'WhatsApp');
  el.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(el);
}

// ── Init all ──
document.addEventListener('DOMContentLoaded', () => {
  injectTopbar();
  injectNav();
  injectMobileNav();
  injectFooter();
  injectWA();

  // Mobile menu
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobileNav')?.classList.add('open');
  });
  document.getElementById('mobileClose')?.addEventListener('click', () => {
    document.getElementById('mobileNav')?.classList.remove('open');
  });

  // Fade-up animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// ── Form handler ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  const orig = btn.textContent;
  btn.textContent = '✓ Заявка отправлена!';
  btn.style.background = '#16a34a';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
}
