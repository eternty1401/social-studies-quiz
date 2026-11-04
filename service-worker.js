// عدد نسخه رو دوباره یکی زیاد کن (مثلاً v15)
const CACHE_NAME = 'social-studies-v39';

// لیست فایل‌هایی که برای حالت آفلاین ذخیره میشن
const urlsToCache = [
  './',
  './index.html',
  './haftom.html',
  './hashtom.html',
  './nohom.html',
  './telegram.js',
  './ai-bot.js'
];

// ۱. نصب: به مرورگر میگه فوراً خودت رو فعال کن و منتظر نمون!
self.addEventListener('install', event => {
  self.skipWaiting(); // 👈 این خط جادوییه! (نادیده گرفتن کش قدیمی)
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ۲. فعال‌سازی: فایل‌های قدیمی رو پاک میکنه و کنترل صفحه رو در دست میگیره
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // پاک کردن کش‌های قدیمی
          }
        })
      );
    }).then(() => self.clients.claim()) // 👈 کنترل فوری صفحه
  );
});

// ۳. دریافت (Fetch): استراتژی "اول اینترنت، بعد کش"
self.addEventListener('fetch', event => {
  // اگر کاربر درخواست باز کردن یک صفحه (HTML) رو داشت:
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request) // 👈 اول برو از اینترنت بگیر
        .then(response => {
          // اگر نسخه جدید اومد، همون رو نشون بده و توی کش هم آپدیت کن
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // فقط اگر اینترنت قطع بود، از کش بخون
          return caches.match(event.request);
        })
    );
  } else {
    // برای بقیه فایل‌ها (عکس، استایل، اسکریپت) اول کش رو چک کن (برای سرعت)
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
