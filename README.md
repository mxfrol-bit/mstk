# МСТК — Сайт (Static)

Полностью статический сайт без Joomla/Modex. Деплой через GitHub + Vercel/Netlify за 2 минуты.

## Структура

```
mstk-site/
├── index.html        ← весь сайт в одном файле
└── README.md
```

## Деплой через Vercel (рекомендуется)

1. **Загрузите на GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial MSTK site"
   git remote add origin https://github.com/ВАШ_ЛОГИН/mstk-site.git
   git push -u origin main
   ```

2. **Подключите Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Import Project → выберите репо `mstk-site`
   - Framework: **Other** (просто статика)
   - Deploy → готово!

3. **Свой домен:**  
   В Vercel → Domains → добавьте `mstk-med.com`  
   Обновите DNS у регистратора: CNAME → `cname.vercel-dns.com`

## Деплой через Netlify

1. Перетащите папку `mstk-site` на [app.netlify.com/drop](https://app.netlify.com/drop)  
2. Получите URL вида `random-name.netlify.app` мгновенно.
3. Настройте домен в Site Settings → Domain Management.

## Что нужно заменить/настроить

- **Форма контакта:** сейчас показывает уведомление но не отправляет данные.  
  Варианты подключения:
  - [Formspree](https://formspree.io) — добавьте `action="https://formspree.io/f/XXXX"` к форме
  - [EmailJS](https://emailjs.com) — 200 писем/месяц бесплатно
  - Свой backend на FastAPI/Railway

- **Карта Google Maps:** обновите embed-ссылку с точными координатами офиса

- **Изображения:** при желании замените ссылки на локальные файлы в папке `/img`

- **Логотип:** если `LOGO.png` будет недоступен на старом домене — положите в папку `/img/logo.png` и обновите `src`

## Технологии

- Чистый HTML5 / CSS3 / Vanilla JS
- Шрифты: Google Fonts (Cormorant Garamond + IBM Plex Sans)
- Нет фреймворков, нет зависимостей
- Responsive: адаптивный для мобильных
- Animations: CSS + Intersection Observer
