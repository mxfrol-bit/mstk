from pathlib import Path
from bs4 import BeautifulSoup
from html import escape as esc
import shutil,json
ROOT=Path(__file__).resolve().parent
ORIGINAL=ROOT/'source-content'
OUT=ROOT.parent/'public'
OUT.mkdir(exist_ok=True)
ARROW='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>'
DIAG='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5"/></svg>'
def btn(text,href,kind='primary'):return f'<a class="button {kind}" href="{href}">{text}{ARROW}</a>'
def logo():return '<span class="brand-mark" aria-hidden="true"><i></i><i></i></span><span class="brand-name">МСТК<span>медицинские технологии</span></span>'
def header(active=''):
 links=[('Продукция','/products/index.html','products'),('О компании','/about.html','about'),('Сервис','/products/service.html','service'),('Контакты','/contact.html','contact')]
 return f'''<a class="skip" href="#main">Перейти к содержанию</a><header class="site-header"><a href="/" class="brand" aria-label="МСТК — главная">{logo()}</a><nav aria-label="Основная навигация" class="desktop-nav">{''.join(f'<a href="{u}" '+('aria-current="page"' if active==a else '')+f'>{t}</a>' for t,u,a in links)}</nav><a class="header-contact" href="/contact.html">Обсудить задачу {DIAG}</a><button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Открыть меню"><span></span><span></span></button></header><nav id="mobile-nav" class="mobile-nav" aria-label="Мобильная навигация" hidden>{''.join(f'<a href="{u}">{t}{ARROW}</a>' for t,u,a in links)}<a href="tel:+78314281054">+7 (831) 428-10-54</a></nav>'''
def footer():return f'''<footer class="site-footer"><div class="footer-top"><a class="brand" href="/">{logo()}</a><p>Медицинские современные<br>технологии и консалтинг</p><a href="mailto:mstknn@gmail.com" class="footer-email">mstknn@gmail.com {DIAG}</a></div><div class="footer-grid"><p>Нижний Новгород<br>ул. Агрономическая, 52А<br><span>Пн–Пт, 9:00–18:00</span></p><div><a href="/products/index.html">Продукция</a><a href="/about.html">О компании</a><a href="/products/service.html">Сервис</a></div><div><a href="tel:+78314281054">+7 (831) 428-10-54</a><a href="https://wa.me/79200684117" target="_blank" rel="noopener noreferrer">WhatsApp {DIAG}</a><a href="/contact.html">Контакты</a></div></div><div class="footer-bottom"><span>© МСТК, 2026</span><span>Оборудование и материалы для специалистов здравоохранения</span><a href="#top" aria-label="В начало страницы">Наверх ↑</a></div></footer>'''
def cta():return f'''<section class="cta-band"><span class="eyebrow">Следующий шаг</span><div><h2>Ваша задача.<br><span>Наше решение.</span></h2><div><p>Подберём оборудование и материалы<br>для вашей клиники.</p>{btn('Обсудить сотрудничество','/contact.html','white')}</div></div></section>'''
def page(path,title,desc,body,active='',cls=''):
 media=BeautifulSoup(body,'html.parser')
 for img in media.find_all('img'):
  src=img.get('src','')
  if src in ['/assets/iris.webp','/assets/optical-hero.webp']:
   parent=img.parent
   if 'about-feature' in parent.get('class',[]):
    wrapper=media.new_tag('div',attrs={'class':'about-picture'})
    img.wrap(wrapper);parent=wrapper
   parent['data-artwork-motion']='iris' if 'iris.webp' in src else 'optical'
   parent['class']=parent.get('class',[])+['artwork-motion']
  else:
   img['class']=img.get('class',[])+['motion-image']
   img['data-image-motion']=''
 body=str(media)
 oldpath=ORIGINAL/path
 old=BeautifulSoup(oldpath.read_text(),'html.parser') if oldpath.exists() else None
 og=old.find('meta',property='og:image') if old else None
 scene_script='<script type="module" src="/js/hero-motion.js?v=5"></script>' if 'data-artwork-motion' in body else ''
 ogtag=f'<meta property="og:image" content="{esc(og["content"])}">' if og else ''
 html=f'''<!doctype html><html lang="ru" id="top"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f6f8fc"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><link rel="canonical" href="https://mstk-production.up.railway.app/{'' if path=='index.html' else path}"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}">{ogtag}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;450;500;600&family=Onest:wght@400;450;500;550;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/site.css?v=5"><script defer src="/js/site.js?v=5"></script>{scene_script}</head><body class="{cls}">{header(active)}<main id="main">{body}</main>{footer()}</body></html>'''
 dest=OUT/path;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(html)
def product_image(key):
 name=key+'-object-v3.webp'
 return '/assets/products/'+name
def stats():return '''<div class="stats"><div><strong>2006<span>год</span></strong><p>начало нашей истории</p></div><div><strong>100<span>+</span></strong><p>клиник по всей России</p></div><div><strong>40 000<span>+</span></strong><p>интраокулярных линз в год</p></div><div><strong>103</strong><p>аппарата на обслуживании</p></div></div>'''
def home():
 body=f'''<section class="home-hero"><div class="hero-art" data-artwork-motion><img class="hero-fallback" src="/assets/optical-hero.webp" width="1536" height="1024" alt="Свет преломляется в прозрачной оптической линзе с синим ободом" fetchpriority="high"></div><div class="hero-content"><div class="eyebrow"><span class="status-dot"></span> Технологии для офтальмохирургии</div><h1>В фокусе —<br><em>ясное зрение.</em></h1><p>Соединяем возможности мировой<br class="desktop-only"> офтальмологии с задачами вашей клиники.</p><div class="hero-actions">{btn('Найти решение','/products/index.html')}<a class="text-link" href="/about.html">Знакомьтесь, МСТК {DIAG}</a></div></div><button class="motion-toggle" type="button" aria-pressed="true" hidden>Ⅱ Пауза</button><div class="hero-bottom"><span>Точность. Технологии. Доверие.</span><a href="#solutions">Откройте новые возможности ↓</a></div><div class="optical-label"><span>01 / OPTICAL PRECISION</span><small>Искусство видеть больше</small></div></section><div class="partner-line"><span>Официальный дистрибьютор в России</span><strong>Bausch <b>+</b> Lomb</strong><span class="partner-note">Мировые технологии.<br>Рядом с вашей клиникой.</span></div><section class="solutions section" id="solutions"><div class="section-head"><div><span class="eyebrow">01 — Наши решения</span><h2>Всё для точности.<br><span>Всё для зрения.</span></h2></div><p>От интраокулярной линзы до оснащения операционной. Помогаем выбрать решение и сопровождаем его в работе.</p></div><div class="solution-grid"><a href="/products/index.html#lenses" class="solution-card lens-card"><div class="card-top"><span>01 / ИНТРАОКУЛЯРНЫЕ ЛИНЗЫ</span><span class="round-arrow">{DIAG}</span></div><img src="{product_image("luxgood")}" width="960" height="960" alt="Интраокулярная линза LuxGood" loading="lazy"><div class="card-bottom"><h3>Маленькая линза.<br>Большие возможности.</h3><p>Монофокальные, торические и EDOF-решения</p></div></a><a href="/products/equipment.html" class="solution-card equipment-card"><div class="card-top"><span>02 / ХИРУРГИЧЕСКИЕ СИСТЕМЫ</span><span class="round-arrow">{DIAG}</span></div><img src="{product_image("stellaris")}" width="960" height="960" alt="Офтальмологическая система Stellaris Elite" loading="lazy"><div class="card-bottom"><h3>Технологии<br>в руках хирурга.</h3><p>Stellaris Elite™ для переднего и заднего сегментов</p></div></a></div><div class="solution-links"><a href="/products/silicone.html"><span>03</span><div><h3>Материалы для хирургии</h3><p>Силиконовые масла, растворы и инструменты</p></div>{DIAG}</a><a href="/products/service.html"><span>04</span><div><h3>Сервис и поддержка</h3><p>Чтобы технологии работали каждый день</p></div>{DIAG}</a></div></section><section class="vision-section"><div class="vision-picture"><img src="/assets/iris.webp" width="1536" height="1024" alt="Макрофотография голубой радужки глаза" loading="lazy"><span>У каждой технологии есть человеческий смысл.</span></div><div class="vision-copy"><span class="eyebrow">02 — О компании</span><h2>За каждым решением —<br><em>чьё-то зрение.</em></h2><p>Мы работаем с клиниками, в которых возвращают людям возможность видеть. Поэтому для нас важна каждая деталь: от выбора материалов до точной работы оборудования.</p><p>МСТК — официальный дистрибьютор Bausch + Lomb в России. Поставляем офтальмологическое оборудование и расходные материалы с 2006 года.</p>{btn('Ближе познакомиться','/about.html','outline')}</div></section><section class="section numbers-section"><span class="eyebrow">Доверие, которое измеряется делом</span>{stats()}</section>{cta()}'''
 page('index.html','МСТК — Технологии ясного зрения','Оборудование, интраокулярные линзы и материалы для офтальмохирургии. Официальный дистрибьютор Bausch + Lomb в России.',body,cls='home')

CATALOG=[
 ('envista','enVista®','Монофокальная ИОЛ','Гидрофобный акрил. Безаберрационная AO-оптика.','envista'),
 ('envista-toric','enVista® Toric','Торическая ИОЛ','Коррекция астигматизма с безаберрационной оптикой.','envista-toric'),
 ('luxgood','LuxGood™','Монофокальная ИОЛ','Предустановленная линза с инжектором Accuject™ Pro.','luxgood'),
 ('luxgood-toric','LuxGood™ Toric','Торическая ИОЛ','Предзагруженная торическая линза платформы Lux.','luxgood-toric'),
 ('luxsmart','LuxSmart™','EDOF-линза','Углублённый фокус и Pure Refractive Optics.','luxsmart'),
 ('luxsmart-toric','LuxSmart™ Toric','Торическая EDOF-линза','Углублённый фокус с коррекцией астигматизма.','luxsmart-toric'),
 ('akreos','Akreos® AO','Монофокальная ИОЛ','Гидрофильный акрил. Четырёхточечная фиксация.','akreos')]
def intro(tag,title,desc,crumb=''):
 return f'<section class="page-intro"><div class="breadcrumb"><a href="/">Главная</a><span>/</span>{crumb}<span>{tag}</span></div><span class="eyebrow">{tag}</span><h1>{title}</h1><p>{desc}</p></section>'
def product_card(item):
 slug,name,tag,desc,img=item
 alt=name
 return f'<a class="catalog-card" href="/products/{slug}.html"><div class="catalog-image"><img src="{product_image(img)}" width="960" height="960" alt="{alt} — предметная 3D-визуализация" loading="lazy"></div><div class="catalog-text"><span class="product-type">{tag}</span><h3>{name}</h3><p>{desc}</p><span class="catalog-more">О модели {DIAG}</span></div></a>'
def inner_pages():
 # Catalogue retains every product route.
 body=intro('Продукция','Точность начинается<br><em>с правильного выбора.</em>','Оборудование, линзы и расходные материалы для офтальмологической хирургии.')
 body+='''<nav class="catalog-nav" aria-label="Разделы каталога"><a href="#lenses">Интраокулярные линзы <span>07</span></a><a href="#equipment">Оборудование</a><a href="#materials">Материалы</a><a href="/products/service.html">Сервис ↗</a></nav>'''
 body+='<section class="section catalog-section" id="lenses"><div class="catalog-section-title"><h2>Интраокулярные линзы</h2><span class="eyebrow">01 / Bausch + Lomb</span></div><div class="catalog-grid">'+''.join(product_card(i) for i in CATALOG)+'</div></section>'
 body+=f'<section class="section catalog-section" id="equipment"><div class="catalog-section-title"><h2>Хирургические системы</h2><span class="eyebrow">02 / Оборудование</span></div><a class="equipment-feature" href="/products/equipment.html"><div><span class="eyebrow">Stellaris Elite™</span><h3>Одна платформа.<br>Широкий спектр<br>возможностей.</h3><p>Система для катарактальной и витреоретинальной хирургии.</p><span class="button primary">О системе {ARROW}</span></div><img src="{product_image("stellaris")}" width="960" height="960" alt="Stellaris Elite" loading="lazy"></a></section>'
 body+=f'<section class="section catalog-section" id="materials"><div class="catalog-section-title"><h2>Материалы и инструменты</h2><span class="eyebrow">03 / Всё для операции</span></div><div class="material-links"><a href="/products/silicone.html"><span class="eyebrow">01 / Материалы</span><h3>Силиконовые масла<br>и растворы</h3><p>Тампонада, вискоэластики и ирригационные растворы</p>{DIAG}</a><a href="/products/surgery.html"><span class="eyebrow">02 / Инструменты</span><h3>Хирургические наборы<br>и расходные материалы</h3><p>Для факоэмульсификации и витреоретинальной хирургии</p>{DIAG}</a></div></section>{cta()}'
 page('products/index.html','Каталог решений — МСТК','Интраокулярные линзы Bausch + Lomb, Stellaris Elite, хирургические материалы и сервис МСТК.',body,'products')
 # Preserve detailed clinical specifications from the existing company site.
 for item in CATALOG+[('equipment','Stellaris Elite™','Хирургическая система','Офтальмологическая платформа для переднего и заднего сегментов.','stellaris')]:
  slug,name,tag,short,img=item
  s=BeautifulSoup((ORIGINAL/f'products/{slug}.html').read_text(),'html.parser')
  lead=s.select_one('.product-detail .lead');features=s.select_one('.product-features');specs=s.select_one('.specs-accordion')
  fulllead=lead.get_text(' ',strip=True) if lead else short
  desc=s.select_one('.page-hero p');desc=desc.get_text(' ',strip=True) if desc else short
  fs=''.join(f'<li>{esc(li.get_text(" ",strip=True))}</li>' for li in features.select('li')) if features else ''
  spec_html=''
  if specs:
   for n,d in enumerate(specs.select('details')):
    summary=d.select_one('summary');content=d.select_one('.specs-content')
    spec_html+=f'<details'+(' open' if n==0 else '')+f'><summary>{esc(summary.get_text(" ",strip=True))}<span>+</span></summary><div class="spec-content">{str(content) if content else ""}</div></details>'
  photo_alt=name
  body=f'<div class="product-breadcrumb breadcrumb"><a href="/">Главная</a><span>/</span><a href="/products/index.html">Продукция</a><span>/</span><span>{name}</span></div><section class="product-hero"><div class="product-photo {"device-photo" if slug=="equipment" else ""}"><span class="eyebrow">Bausch + Lomb</span><img src="{product_image(img)}" width="960" height="960" alt="{photo_alt}" fetchpriority="high"><span class="photo-caption">3D-визуализация</span></div><div class="product-summary"><a class="back-link" href="/products/index.html">← Весь каталог</a><span class="eyebrow">{tag}</span><h1>{name}</h1><p class="product-lead">{esc(desc)}</p><div class="product-contact">{btn("Запросить предложение","/contact.html?product="+slug)}<span>Подбор и поставка для вашей клиники</span></div><div class="product-support-note"><span class="status-dot"></span> Официальный дистрибьютор в России</div></div></section><section class="section product-info"><div><span class="eyebrow">О решении</span><h2>Детали имеют<br><em>значение.</em></h2><p>{esc(fulllead)}</p><ul class="feature-list">{fs}</ul></div><div class="spec-panel"><h3>Характеристики</h3>{spec_html}</div></section><section class="product-next"><a href="/products/index.html">{ARROW}<span>Продолжить знакомство<br><strong>Все решения МСТК</strong></span></a><a href="/contact.html">{DIAG}<span>Поможем с выбором<br><strong>Связаться со специалистом</strong></span></a></section>'
  page(f'products/{slug}.html',name+' — МСТК',desc,body,'products',cls='product-page')
 # Company.
 body=intro('О компании','Технологии меняются.<br><em>Доверие остаётся.</em>','Медицинские современные технологии и консалтинг. Работаем для офтальмологических клиник с 2006 года.')
 body+=f'<section class="about-feature"><div><span class="eyebrow">МСТК / С 2006 года</span><h2>Рядом с теми,<br>кто помогает<br><em>видеть.</em></h2><p>ООО «Медицинские Современные Технологии и Консалтинг» основано 20 октября 2006 года. Мы — официальный дистрибьютор Bausch + Lomb в России.</p><p>Сотрудничаем с государственными и частными клиниками. Поставляем оборудование и материалы, помогаем подобрать решения и поддерживаем технику в работе.</p></div><img src="/assets/iris.webp" width="1536" height="1024" alt="Голубая радужка глаза крупным планом"></section><section class="section">{stats()}</section><section class="section partnership"><span class="eyebrow">Технологическое партнёрство</span><div><h2>Bausch <em>+</em> Lomb</h2><p>Мировой производитель медицинских изделий для офтальмологии. В нашем каталоге — хирургические системы, интраокулярные линзы и материалы для офтальмологических вмешательств.</p></div></section><section class="section approach"><span class="eyebrow">Как мы работаем</span><div class="approach-row"><span>01</span><h3>Разбираемся в задаче</h3><p>Учитываем профиль клиники и потребности специалистов.</p></div><div class="approach-row"><span>02</span><h3>Комплектуем решение</h3><p>Подбираем оборудование, линзы и расходные материалы.</p></div><div class="approach-row"><span>03</span><h3>Остаёмся на связи</h3><p>Помогаем с эксплуатацией и техническим обслуживанием.</p></div></section>{cta()}'
 page('about.html','О компании — МСТК','МСТК — официальный дистрибьютор Bausch + Lomb в России с 2006 года. Оборудование, материалы и сервис для офтальмологии.',body,'about')
 # Service.
 service_items=[('Плановое обслуживание','Профилактика, проверка систем, калибровка и обновление программного обеспечения.'),('Диагностика и ремонт','Определяем причину неисправности и восстанавливаем работу оборудования.'),('Оригинальные компоненты','Заменяем изношенные детали запчастями производителя.'),('Поддержка специалистов','Помогаем разобраться в работе оборудования и планировать обслуживание.')]
 body=intro('Сервис','Точность требует<br><em>заботы.</em>','Техническое обслуживание и ремонт хирургических систем Stellaris. Поддержка на всём пути работы оборудования.')
 body+=f'<section class="service-feature"><div><span class="eyebrow">Собственная сервисная служба</span><h2>Чтобы каждый день<br>начинался<br>с уверенности.</h2><p>Сертифицированные инженеры, оригинальные запчасти и гарантия на работы. Обслуживаем 103 хирургических аппарата.</p>{btn("Обсудить обслуживание","/contact.html?product=service")}</div><div class="service-device"><img src="{product_image("stellaris")}" width="960" height="960" alt="Система Stellaris Elite" loading="lazy"><span>103<small>аппарата на обслуживании</small></span></div></section><section class="section service-list"><div class="section-head"><h2>Полный цикл<br><em>поддержки.</em></h2><p>Плановое ТО, срочный ремонт на месте или в сервисном центре — под задачи вашей клиники.</p></div>'+''.join(f'<div class="approach-row"><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></div>' for i,(t,d) in enumerate(service_items))+f'</section>{cta()}'
 page('products/service.html','Сервис Stellaris — МСТК','Техническое обслуживание и ремонт Stellaris. Сервисная служба МСТК, оригинальные детали и гарантия на работы.',body,'service')
 # Materials and surgery retain full source descriptions and lists.
 for slug,title,desc in [('silicone','Материалы, которым<br><em>доверяют.</em>','Силиконовые масла, вискоэластики и растворы для офтальмохирургии.'),('surgery','Каждый инструмент —<br><em>продолжение руки.</em>','Наборы для факоэмульсификации, хирургические инструменты и расходные материалы.')]:
  s=BeautifulSoup((ORIGINAL/f'products/{slug}.html').read_text(),'html.parser')
  body=intro('Хирургические материалы',title,desc,'<a href="/products/index.html">Продукция</a><span>/</span>')
  if slug=='silicone':
   cards=s.select('.product-card')
   body+='<section class="section material-details">'
   for i,c in enumerate(cards):
    heading=c.select_one('h3,h4,.product-card-title');texts=[p.get_text(' ',strip=True) for p in c.select('p,.product-card-desc')]
    title_c=heading.get_text(' ',strip=True) if heading else ['Силиконовое масло','EYEFILL® H.D.','БСС раствор'][i]
    features=c.select_one('ul')
    if i==1:texts=['Высокодисперсный вискоэластик. Содержит 2% гидроксипропилметилцеллюлозы (HPMC) в физиологическом солевом растворе.']
    body+=f'<article><span class="eyebrow">0{i+1} / Материалы</span><h2>{esc(title_c)}</h2>'+''.join(f'<p>{esc(t)}</p>' for t in texts)+(str(features) if features else '')+(f'<figure class="material-figure"><img class="material-image" src="{product_image("eyefill")}" width="960" height="960" alt="Прозрачный вискоэластичный материал — 3D-образ" loading="lazy"><figcaption>Вискоэластичный материал · 3D-образ</figcaption></figure><a class="manufacturer-link" href="https://www.bauschsurgical.eu/products/cataract/viscoelastics/eyefillr-hd/" target="_blank" rel="noopener noreferrer">Информация производителя ↗</a>' if i==1 else '')+btn('Уточнить наличие','/contact.html?product=silicone','outline')+'</article>'
   body+='</section>'
  else:
   features=s.select_one('.product-features');f=str(features) if features else ''
   text=s.select_one('section p')
   body+=f'<section class="section surgery-section"><div><span class="eyebrow">Для операционной</span><h2>Всё необходимое.<br>В одном решении.</h2><p>{esc(text.get_text(" ",strip=True)) if text else "Поставляем хирургические наборы и расходные материалы для офтальмологических операций. Поможем уточнить состав комплекта под вашу систему и методику."}</p>{f}{btn("Подобрать комплектацию","/contact.html?product=surgery")}</div><div class="surgery-visual"><img src="/assets/optical-hero.webp" width="1536" height="1024" alt="Преломление света в оптическом стекле"><span>Точность складывается из деталей.</span></div></section>'
   sections=s.select('section')
   if len(sections)>1:
    lists=sections[1].select('li');body+='<section class="section"><h2>Полный спектр<br>хирургических материалов</h2><ul class="feature-list">'+''.join(f'<li>{esc(li.get_text(" ",strip=True))}</li>' for li in lists)+'</ul></section>'
  body+=cta();page(f'products/{slug}.html',('Силиконовые масла и растворы' if slug=='silicone' else 'Хирургические материалы')+' — МСТК',desc,body,'products')
 # Contact form prepares an explicit email draft: the original site has no receiving API.
 body=intro('Контакты','Давайте найдём<br><em>ваше решение.</em>','Расскажите о задаче. Поможем с выбором оборудования, материалов и сервисным обслуживанием.')
 opts=''.join(f'<option value="{x[0]}">{x[1]}</option>' for x in CATALOG)+''.join(f'<option value="{k}">{v}</option>' for k,v in [('equipment','Stellaris Elite™'),('silicone','Масла и растворы'),('surgery','Хирургические материалы'),('service','Техническое обслуживание'),('other','Другая задача')])
 body+=f'''<section class="section contact-section"><div class="contact-details"><span class="eyebrow">Будем на связи</span><a class="contact-big" href="tel:+78314281054">+7 (831) 428-10-54</a><a class="contact-big email-big" href="mailto:mstknn@gmail.com">mstknn@gmail.com {DIAG}</a><div class="contact-address"><span class="eyebrow">Наш адрес</span><p>Нижний Новгород,<br>ул. Агрономическая, 52А</p><a class="text-link" href="https://yandex.ru/maps/?text=Нижний%20Новгород%20Агрономическая%2052А" target="_blank" rel="noopener noreferrer">Открыть карту {DIAG}</a></div><div class="contact-hours"><span class="status-dot"></span><span>Пн–Пт, 9:00–18:00</span></div><a class="button outline" href="https://wa.me/79200684117" target="_blank" rel="noopener noreferrer">Написать в WhatsApp {DIAG}</a></div><form class="contact-form" id="contact-form"><span class="eyebrow">Ваша задача</span><h2>Начнём знакомство.</h2><div class="form-row"><label>Ваше имя *<input name="name" autocomplete="name" placeholder="Имя и фамилия" required maxlength="120"></label><label>Должность<input name="position" placeholder="Ваша должность" maxlength="120"></label></div><label>Клиника / организация *<input name="company" autocomplete="organization" placeholder="Название клиники" required maxlength="160"></label><div class="form-row"><label>Телефон *<input name="phone" type="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required minlength="7" maxlength="30"></label><label>Email<input name="email" type="email" autocomplete="email" placeholder="mail@clinic.ru" maxlength="160"></label></div><label>Что вас интересует?<select name="product"><option value="">Выберите решение</option>{opts}</select></label><label>О задаче<textarea name="message" placeholder="Что нужно подобрать или обсудить?" rows="3" maxlength="3000"></textarea></label><button class="button primary" type="submit">Подготовить письмо {ARROW}</button><p class="form-note">Откроется письмо на mstknn@gmail.com. Проверьте его и отправьте из своего почтового приложения.</p><p class="form-status" role="status" aria-live="polite"></p></form></section>'''
 page('contact.html','Контакты — МСТК','Свяжитесь с МСТК: +7 (831) 428-10-54, mstknn@gmail.com. Нижний Новгород, Агрономическая, 52А.',body,'contact')
 page('404.html','Страница не найдена — МСТК','Перейдите к каталогу решений МСТК.',intro('404','Нужен другой<br><em>фокус.</em>','Этой страницы нет. Продолжите знакомство с нашими решениями.')+'<section class="section">'+btn('Открыть каталог','/products/index.html')+'</section>')

home()
inner_pages()
for folder in ['css','js','assets']:
 if (ROOT/folder).exists():shutil.copytree(ROOT/folder,OUT/folder,dirs_exist_ok=True)
print('Built all 16 pages')
