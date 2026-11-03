const CACHE_NAME = 'social-studies-v6';
const urlsToCache = [
  './',
  './index.html',
  './haftom.html',
  './hashtom.html',
  './nohom.html'
  './telegram.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
