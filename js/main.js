// ── Root path detection ──
const ROOT = (() => location.pathname.includes('/products/') ? '../' : './')();
const BASE_URL = 'https://mstk-production.up.railway.app';

function injectTopbar() {
  const el = document.createElement('div');
  el.className = 'topbar';
  el.innerHTML = `<div class="topbar-inner"><span>ООО «МСТК» — официальный дистрибьютор Bausch + Lomb в России</span><div class="topbar-contacts"><span>📍 г. Нижний Новгород, ул. Агрономическая, д. 52А</span><a href="tel:+78314281054">📞 +7 (831) 428-10-54</a><a href="mailto:mstknn@gmail.com">✉ mstknn@gmail.com</a></div></div>`;
  document.body.prepend(el);
}

function injectNav() {
  const r = ROOT;
  const el = document.createElement('nav');
  el.innerHTML = `
  <div class="progress-bar" id="progressBar"></div>
  <div class="nav-inner">

    <a href="${r}index.html" class="logo">
      <div class="logo-img-wrap">
        <img src="https://mstk-med.com/mstk/LOGO.png"
             alt="МСТК — официальный дистрибьютор Bausch + Lomb"
             width="140" height="46"
             onerror="this.outerHTML='<span style=\'font-family:var(--font-h);font-size:1.5rem;font-weight:700;color:var(--navy)\'>МСТК</span>'" />
      </div>
      <div class="logo-text">
        <strong>МСТК</strong>
        <small>Bausch + Lomb · Россия</small>
      </div>
    </a>

    <ul class="nav-links" role="navigation" aria-label="Главное меню">
      <li><a href="${r}about.html">О нас</a></li>
      <li class="nav-mega">
        <a href="${r}products/index.html" id="megaTrigger" aria-haspopup="true" aria-expanded="false">
          Продукция
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="transition:transform .2s" id="megaArrow"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </a>
      </li>
      <li><a href="${r}about.html#brands">Бренды</a></li>
      <li><a href="${r}contact.html" class="btn-nav">Связаться с нами</a></li>
    </ul>

    <div class="hamburger" id="hamburger" role="button" aria-label="Меню" tabindex="0">
      <span></span><span></span><span></span>
    </div>
  </div>

  <div class="mega-wrap" id="megaWrap" role="region" aria-label="Меню продукции">
    <div class="mega-inner">
      <div class="mega-col">
        <div class="mega-col-title">Интраокулярные линзы</div>
        <ul>
          <li><a href="${r}products/envista.html">ENVISTA® <span class="tag">Моно</span></a></li>
          <li><a href="${r}products/envista-toric.html">enVista™ Toric <span class="tag">Торик</span></a></li>
          <li><a href="${r}products/luxgood.html">LuxGood™ <span class="tag">Preloaded</span></a></li>
          <li><a href="${r}products/luxgood-toric.html">LuxGood™ Toric <span class="tag">Торик</span></a></li>
          <li><a href="${r}products/luxsmart.html">LuxSmart™ <span class="tag">EDOF</span></a></li>
          <li><a href="${r}products/luxsmart-toric.html">LuxSmart™ Toric <span class="tag">EDOF+</span></a></li>
          <li><a href="${r}products/akreos.html">Akreos® AO <span class="tag">Гидро</span></a></li>
        </ul>
      </div>
      <div class="mega-col">
        <div class="mega-col-title">Оборудование</div>
        <ul>
          <li><a href="${r}products/equipment.html">Stellaris Elite™</a></li>
          <li><a href="${r}products/surgery.html">Хирургические наборы</a></li>
        </ul>
        <div class="mega-col-title" style="margin-top:1.5rem">Материалы</div>
        <ul>
          <li><a href="${r}products/silicone.html">Силиконовые масла</a></li>
          <li><a href="${r}products/silicone.html">EYEFILL® H.D.</a></li>
          <li><a href="${r}products/silicone.html">БСС раствор</a></li>
        </ul>
      </div>
      <div class="mega-col">
        <div class="mega-col-title">Сервис</div>
        <ul>
          <li><a href="${r}products/service.html">Техническое обслуживание</a></li>
          <li><a href="${r}products/service.html">Ремонт Stellaris</a></li>
          <li><a href="${r}products/service.html">Оригинальные запчасти</a></li>
        </ul>
        <div style="margin-top:1.5rem;background:var(--sky);border-radius:12px;padding:1rem 1.2rem;">
          <div style="font-size:.78rem;font-weight:600;color:var(--navy);margin-bottom:.3rem;">Нужна консультация?</div>
          <div style="font-size:.78rem;color:var(--muted);margin-bottom:.8rem;line-height:1.5;">Подберём оптимальное решение для вашей клиники</div>
          <a href="${r}contact.html" style="display:inline-block;background:var(--blue);color:#fff;text-decoration:none;padding:.45rem 1rem;border-radius:8px;font-size:.78rem;font-weight:600;font-family:var(--font-b);">Связаться →</a>
        </div>
      </div>
      <div class="mega-footer">
        <p>🏆 Официальный дистрибьютор Bausch + Lomb в России с 2006 года · 100+ клиник · 40 000+ ИОЛ в год</p>
        <a href="${r}products/index.html">Весь каталог →</a>
      </div>
    </div>
  </div>`;
  document.body.insertBefore(el, document.body.children[1]);
}

function injectMobileNav() {
  const r = ROOT;
  const el = document.createElement('div');
  el.className = 'mobile-nav'; el.id = 'mobileNav';
  el.innerHTML = `<button class="mobile-nav-close" id="mobileClose">✕</button>
    <a href="${r}index.html">Главная</a>
    <a href="${r}about.html">О нас</a>
    <details class="mobile-nav-group"><summary>Продукция</summary>
      <details class="mobile-nav-group" style="margin-left:1rem"><summary>ИОЛ</summary>
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
      <a href="${r}products/silicone.html">Масла и растворы</a>
      <a href="${r}products/service.html">Обслуживание</a>
    </details>
    <a href="${r}contact.html" class="btn-primary">Связаться с нами</a>`;
  document.body.appendChild(el);
}

function injectFooter() {
  const r = ROOT;
  const el = document.createElement('footer');
  el.innerHTML = `<div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo"><img src="https://mstk-med.com/mstk/LOGO.png" alt="МСТК" width="160" height="40" loading="lazy"/></div>
        <p class="footer-about">ООО «Медицинские Современные Технологии и Консалтинг» — официальный дистрибьютор Bausch&nbsp;+&nbsp;Lomb в России с 2006 года.</p>
        <div style="margin-top:1.2rem;display:flex;gap:.8rem;">
          <a href="https://wa.me/79200684117?text=Здравствуйте!%20Хочу%20узнать%20о%20продукции%20МСТК." style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:#25D366;border-radius:50%;color:#fff;text-decoration:none;" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="tel:+78314281054" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:rgba(255,255,255,.1);border-radius:50%;color:#fff;text-decoration:none;font-size:1.1rem;" aria-label="Телефон">📞</a>
          <a href="mailto:mstknn@gmail.com" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:rgba(255,255,255,.1);border-radius:50%;color:#fff;text-decoration:none;font-size:1.1rem;" aria-label="Email">✉</a>
        </div>
      </div>
      <div class="footer-col"><h4>Продукция</h4><ul>
        <li><a href="${r}products/iol.html">ИОЛ — Каталог</a></li>
        <li><a href="${r}products/equipment.html">Stellaris Elite™</a></li>
        <li><a href="${r}products/silicone.html">Силиконовые масла</a></li>
        <li><a href="${r}products/surgery.html">Хирургия</a></li>
        <li><a href="${r}products/service.html">Сервис</a></li>
      </ul></div>
      <div class="footer-col"><h4>Компания</h4><ul>
        <li><a href="${r}about.html">О нас</a></li>
        <li><a href="${r}products/index.html">Вся продукция</a></li>
        <li><a href="${r}contact.html">Контакты</a></li>
      </ul></div>
      <div class="footer-col"><h4>Контакты</h4>
        <address>г. Нижний Новгород,<br>ул. Агрономическая, д. 52А<br><br>
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

function injectFloatingWidgets() {
  // WhatsApp
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/79200684117?text=Здравствуйте!%20Хочу%20узнать%20о%20продукции%20МСТК.';
  wa.className = 'wa-float'; wa.target = '_blank'; wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label','Написать в WhatsApp');
  wa.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(wa);

  // Callback widget
  const cb = document.createElement('div');
  cb.className = 'callback-widget'; cb.id = 'callbackWidget';
  cb.innerHTML = `
    <button class="callback-toggle" id="callbackToggle">📞 <span>Обратный звонок</span></button>
    <div class="callback-form" id="callbackForm">
      <div class="callback-form-header"><strong>Перезвоним за 15 минут</strong><button id="callbackClose">✕</button></div>
      <input type="tel" id="callbackPhone" placeholder="+7 (___) ___-__-__"/>
      <button class="callback-submit" onclick="submitCallback()">Позвоните мне</button>
    </div>`;
  document.body.appendChild(cb);

  // Back to top
  const top = document.createElement('button');
  top.className = 'back-to-top'; top.id = 'backToTop'; top.innerHTML = '↑'; top.setAttribute('aria-label','Наверх');
  document.body.appendChild(top);
}

// ── JSON-LD SEO ──
function injectStructuredData() {
  const schemas = [{
    "@context":"https://schema.org","@type":"MedicalOrganization",
    "name":"ООО «Медицинские Современные Технологии и Консалтинг»","alternateName":"МСТК",
    "url":BASE_URL,"logo":"https://mstk-med.com/mstk/LOGO.png",
    "description":"Официальный дистрибьютор Bausch + Lomb в России. Офтальмологическое оборудование и ИОЛ с 2006 года.",
    "foundingDate":"2006-10-20",
    "address":{"@type":"PostalAddress","streetAddress":"ул. Агрономическая, д. 52А","addressLocality":"Нижний Новгород","addressCountry":"RU"},
    "contactPoint":[{"@type":"ContactPoint","telephone":"+7-831-428-10-54","contactType":"customer service","availableLanguage":"Russian"}],
    "email":"mstknn@gmail.com","sameAs":["https://mstk-med.com"]
  }];

  const path = location.pathname;
  if (path.includes('/products/') && !path.endsWith('index.html') && !path.endsWith('iol.html')) {
    const img = document.querySelector('.img-main img');
    const desc = document.querySelector('.lead');
    schemas.push({
      "@context":"https://schema.org","@type":"Product",
      "name": document.querySelector('h1')?.textContent || document.title,
      "description": desc?.textContent || '',
      "image": img?.src || '',
      "brand":{"@type":"Brand","name":"Bausch + Lomb"},
      "offers":{"@type":"Offer","priceCurrency":"RUB","availability":"https://schema.org/InStock","seller":{"@type":"Organization","name":"МСТК"}}
    });
  }

  const breadParts = [{ name:'Главная', url:BASE_URL }];
  if (path.includes('/products/')) {
    breadParts.push({ name:'Продукция', url:BASE_URL+'/products/index.html' });
    const h1 = document.querySelector('h1')?.textContent;
    if (h1 && !path.endsWith('index.html')) breadParts.push({ name:h1, url:BASE_URL+path });
  } else if (path.includes('/about')) breadParts.push({ name:'О нас', url:BASE_URL+'/about.html' });
  else if (path.includes('/contact')) breadParts.push({ name:'Контакты', url:BASE_URL+'/contact.html' });

  if (breadParts.length > 1) schemas.push({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement": breadParts.map((p,i) => ({"@type":"ListItem","position":i+1,"name":p.name,"item":p.url}))
  });

  schemas.forEach(s => {
    const sc = document.createElement('script'); sc.type = 'application/ld+json';
    sc.textContent = JSON.stringify(s); document.head.appendChild(sc);
  });
}

// ── Progress bar ──
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive:true });
}

// ── Animated counters ──
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    new IntersectionObserver(([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 2000;
      function tick(now) {
        const p = Math.min((now-start)/dur, 1);
        const v = target * (1-Math.pow(1-p,3));
        el.textContent = (Number.isInteger(target) ? Math.floor(v) : v.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }, { threshold:0.5 }).observe(el);
  });
}

// ── 3D Tilt cards ──
function initTiltCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(900px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateY(-4px)`;
      card.style.boxShadow = `${-x*15}px ${-y*15}px 40px rgba(27,95,193,.18)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform=''; card.style.boxShadow=''; });
  });
}

// ── Particles ──
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.45';
  hero.style.position = hero.style.position || 'relative';
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, pts;
  const resize = () => { W = canvas.width = hero.offsetWidth; H = canvas.height = hero.offsetHeight; };
  const init = () => { pts = Array.from({length:55}, () => ({ x:Math.random()*W, y:Math.random()*H, dx:(Math.random()-.5)*.5, dy:(Math.random()-.5)*.5, r:Math.random()*1.5+.5, a:Math.random()*.5+.2 })); };
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(123,174,238,${p.a})`; ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>W) p.dx*=-1; if(p.y<0||p.y>H) p.dy*=-1;
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<110) { ctx.beginPath(); ctx.strokeStyle=`rgba(123,174,238,${.15*(1-d/110)})`; ctx.lineWidth=.6; ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); }, {passive:true});
}

// ── Parallax ──
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => { if(window.scrollY < hero.offsetHeight) hero.style.backgroundPositionY = (window.scrollY*.3)+'px'; }, {passive:true});
}

// ── Typewriter ──
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = ['интраокулярные линзы','Stellaris Elite™','силиконовые масла','сервисное обслуживание'];
  let wi=0,ci=0,del=false;
  function tick() {
    const w=words[wi];
    if (!del) { el.textContent=w.slice(0,++ci); if(ci===w.length){del=true;return setTimeout(tick,1800);} }
    else { el.textContent=w.slice(0,--ci); if(ci===0){del=false;wi=(wi+1)%words.length;return setTimeout(tick,300);} }
    setTimeout(tick, del?55:85);
  }
  tick();
}

// ── Lightbox ──
function initLightbox() {
  const imgs = [...document.querySelectorAll('.img-main img,.product-detail-imgs-row img')];
  if (!imgs.length) return;
  const ov = document.createElement('div'); ov.className='lightbox-overlay';
  ov.innerHTML=`<button class="lightbox-close" id="lbClose">✕</button><button class="lightbox-prev" id="lbPrev">‹</button><img class="lightbox-img" id="lbImg" src="" alt=""/><button class="lightbox-next" id="lbNext">›</button>`;
  document.body.appendChild(ov);
  let cur=0;
  const open=i=>{cur=i;document.getElementById('lbImg').src=imgs[i].src;ov.classList.add('active');document.body.style.overflow='hidden';};
  const close=()=>{ov.classList.remove('active');document.body.style.overflow='';};
  imgs.forEach((img,i)=>{img.style.cursor='zoom-in';img.addEventListener('click',()=>open(i));});
  document.getElementById('lbClose').addEventListener('click',close);
  document.getElementById('lbPrev').addEventListener('click',()=>open((cur-1+imgs.length)%imgs.length));
  document.getElementById('lbNext').addEventListener('click',()=>open((cur+1)%imgs.length));
  ov.addEventListener('click',e=>{if(e.target===ov)close();});
  document.addEventListener('keydown',e=>{if(!ov.classList.contains('active'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open((cur-1+imgs.length)%imgs.length);if(e.key==='ArrowRight')open((cur+1)%imgs.length);});
}

// ── Floating CTA on product pages ──
function initFloatingCTA() {
  const p=location.pathname;
  if(!p.includes('/products/')||p.endsWith('index.html')||p.endsWith('iol.html')) return;
  const el=document.createElement('div'); el.className='floating-cta'; el.id='floatingCta';
  el.innerHTML=`<span>Запросить прайс-лист</span><a href="../contact.html" class="floating-cta-btn">Получить цену →</a>`;
  document.body.appendChild(el);
  window.addEventListener('scroll',()=>el.classList.toggle('visible',window.scrollY>350),{passive:true});
}

// ── Back to top ──
function initBackToTop() {
  const btn=document.getElementById('backToTop');
  if(!btn) return;
  window.addEventListener('scroll',()=>btn.classList.toggle('visible',window.scrollY>500),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// ── Scroll fade-up ──
function initScrollAnimations() {
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*80);obs.unobserve(e.target);}});
  },{threshold:.08});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
}

// ── Mobile menu ──
function initMobileMenu() {
  document.getElementById('hamburger')?.addEventListener('click',()=>{document.getElementById('mobileNav')?.classList.add('open');document.body.style.overflow='hidden';});
  document.getElementById('mobileClose')?.addEventListener('click',()=>{document.getElementById('mobileNav')?.classList.remove('open');document.body.style.overflow='';});
}

// ── Callback widget ──
function initCallbackWidget() {
  document.getElementById('callbackToggle')?.addEventListener('click',()=>document.getElementById('callbackForm')?.classList.toggle('open'));
  document.getElementById('callbackClose')?.addEventListener('click',()=>document.getElementById('callbackForm')?.classList.remove('open'));
}
window.submitCallback = function() {
  const btn=document.querySelector('.callback-submit');
  btn.textContent='✓ Ждите звонка!'; btn.style.background='#16a34a';
  setTimeout(()=>{document.getElementById('callbackForm')?.classList.remove('open');btn.textContent='Позвоните мне';btn.style.background='';},2500);
};
window.handleSubmit = function(e) {
  e.preventDefault(); const btn=e.target, orig=btn.textContent;
  btn.textContent='✓ Заявка отправлена!'; btn.style.background='#16a34a';
  setTimeout(()=>{btn.textContent=orig;btn.style.background='';},3000);
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  injectTopbar(); injectNav(); injectMobileNav(); injectFooter(); injectFloatingWidgets();
  injectStructuredData();
  initProgressBar(); initScrollAnimations(); initCounters(); initTiltCards();
  initParticles(); initParallax(); initTypewriter(); initLightbox();
  initFloatingCTA(); initBackToTop(); initCallbackWidget();
  // Active nav
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href')?.split('/').pop()||'')&&a.getAttribute('href')!=='#'){
      a.style.cssText='color:var(--blue)!important;background:var(--sky)!important;';
    }
  });
});

// ══════════════════════════════════════════
// BOTTOM NAVIGATION BAR (mobile)
// ══════════════════════════════════════════
function injectBottomNav() {
  const r = ROOT;
  const path = location.pathname;
  const isHome     = path === '/' || path.endsWith('index.html') && !path.includes('/products/');
  const isProducts = path.includes('/products/');
  const isAbout    = path.includes('/about');
  const isContact  = path.includes('/contact');

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Мобильная навигация');
  nav.innerHTML = `<div class="bottom-nav-inner">
    <a href="${r}index.html" class="bottom-nav-item ${isHome?'active':''}" aria-label="Главная">
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Главная
    </a>
    <a href="${r}products/index.html" class="bottom-nav-item ${isProducts?'active':''}" aria-label="Продукция">
      <svg viewBox="0 0 24 24"><rect x="2" y="3" width="7" height="7" rx="1"/><rect x="15" y="3" width="7" height="7" rx="1"/><rect x="2" y="14" width="7" height="7" rx="1"/><rect x="15" y="14" width="7" height="7" rx="1"/></svg>
      Продукция
    </a>
    <a href="${r}about.html" class="bottom-nav-item ${isAbout?'active':''}" aria-label="О нас">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      О нас
    </a>
    <a href="${r}contact.html" class="bottom-nav-item bottom-nav-cta" aria-label="Контакты">
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 5.72 5.72l1.56-1.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Звонок
    </a>
  </div>`;
  document.body.appendChild(nav);
}

// ══════════════════════════════════════════
// TOUCH SWIPE for Lightbox
// ══════════════════════════════════════════
function initTouchSwipe() {
  const ov = document.querySelector('.lightbox-overlay');
  if (!ov) return;
  let startX = 0;
  ov.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive:true });
  ov.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) document.getElementById('lbNext')?.click();
      else document.getElementById('lbPrev')?.click();
    }
  });
}

// ══════════════════════════════════════════
// SWIPE SCROLL HINT for product grids
// ══════════════════════════════════════════
function initSwipeCards() {
  if (window.innerWidth > 768) return;
  // Add swipe-scroll class to card grids with 3+ cards on catalog pages
  const grids = document.querySelectorAll('.card-grid');
  grids.forEach(grid => {
    const cards = grid.querySelectorAll('.product-card');
    if (cards.length >= 3) {
      // Insert swipe hint before grid
      const hint = document.createElement('div');
      hint.className = 'swipe-hint';
      hint.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Листайте вправо';
      grid.parentNode.insertBefore(hint, grid);
      grid.classList.add('swipe-scroll');
    }
  });
}

// ══════════════════════════════════════════
// FOOTER ACCORDION on mobile
// ══════════════════════════════════════════
function initFooterAccordion() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll('.footer-col').forEach(col => {
    const h4 = col.querySelector('h4');
    const ul = col.querySelector('ul, address');
    if (!h4 || !ul) return;
    ul.style.display = 'none';
    h4.style.cursor = 'pointer';
    h4.innerHTML += ' <span style="float:right;font-weight:300;font-size:1.1rem">+</span>';
    h4.addEventListener('click', () => {
      const open = ul.style.display !== 'none';
      ul.style.display = open ? 'none' : '';
      h4.querySelector('span').textContent = open ? '+' : '−';
    });
  });
}

// ══════════════════════════════════════════
// VIEWPORT HEIGHT FIX (iOS Safari 100vh bug)
// ══════════════════════════════════════════
function fixVH() {
  const setVH = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  setVH();
  window.addEventListener('resize', setVH, { passive:true });
}

// ══════════════════════════════════════════
// PULL TO REFRESH feel (visual only)
// ══════════════════════════════════════════
function initTouchFeedback() {
  // Add active state ripple on touch for product cards
  document.querySelectorAll('.product-card, .btn-primary, .btn-outline').forEach(el => {
    el.addEventListener('touchstart', () => el.style.opacity = '.85', { passive:true });
    el.addEventListener('touchend', () => el.style.opacity = '', { passive:true });
    el.addEventListener('touchcancel', () => el.style.opacity = '', { passive:true });
  });
}

// ══════════════════════════════════════════
// STICKY PRODUCT HEADER (mobile product pages)
// ══════════════════════════════════════════
function initStickyProductTitle() {
  if (window.innerWidth > 768) return;
  const h1 = document.querySelector('.product-detail-content h1, .page-hero h1');
  if (!h1) return;
  const sticky = document.createElement('div');
  sticky.style.cssText = 'position:fixed;top:58px;left:0;right:0;z-index:90;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);padding:.6rem 1.2rem;border-bottom:1px solid var(--border);font-family:var(--font-h);font-size:1rem;color:var(--navy);font-weight:600;transform:translateY(-100%);transition:transform .3s;box-shadow:0 2px 12px rgba(7,20,43,.07);display:flex;align-items:center;justify-content:space-between;gap:1rem;';
  sticky.innerHTML = `<span>${h1.textContent.slice(0,40)}${h1.textContent.length>40?'…':''}</span><a href="${ROOT}contact.html" style="background:var(--blue);color:#fff;text-decoration:none;padding:.4rem .9rem;border-radius:100px;font-family:var(--font-b);font-size:.75rem;font-weight:600;white-space:nowrap;">Узнать цену</a>`;
  document.body.appendChild(sticky);
  const pageHero = document.querySelector('.page-hero');
  if (!pageHero) return;
  window.addEventListener('scroll', () => {
    const heroBottom = pageHero.getBoundingClientRect().bottom;
    sticky.style.transform = heroBottom < 60 ? 'translateY(0)' : 'translateY(-100%)';
  }, { passive:true });
}

// Add bottom nav and mobile features to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function mobileInit() {
  injectBottomNav();
  initTouchSwipe();
  initSwipeCards();
  initFooterAccordion();
  fixVH();
  // Slight delay for touch feedback (after cards are ready)
  setTimeout(initTouchFeedback, 300);
  setTimeout(initStickyProductTitle, 200);
});

// ══════════════════════════════════════════
// MEGA MENU LOGIC
// ══════════════════════════════════════════
function initMegaMenu() {
  const trigger = document.getElementById('megaTrigger');
  const wrap    = document.getElementById('megaWrap');
  const arrow   = document.getElementById('megaArrow');
  const nav     = document.querySelector('nav');
  if (!trigger || !wrap) return;

  let closeTimer = null;

  function open() {
    clearTimeout(closeTimer);
    wrap.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
    nav.style.boxShadow = 'none';
  }
  function close() {
    closeTimer = setTimeout(() => {
      wrap.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      if (arrow) arrow.style.transform = '';
      nav.style.boxShadow = '';
    }, 120);
  }

  // Hover on trigger
  trigger.parentElement.addEventListener('mouseenter', open);
  trigger.parentElement.addEventListener('mouseleave', close);

  // Hover on mega panel itself — keep open
  wrap.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  wrap.addEventListener('mouseleave', close);

  // Click toggle (for keyboard/touch)
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    wrap.classList.contains('open') ? close() : open();
  });

  // Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) close();
  });
}

document.addEventListener('DOMContentLoaded', initMegaMenu);
