console.log('I am the worker');
var cacheName = 'shell-content';
var filesToCache = [
  '/styles/inline.css',
  '/index.js',
  '/images/popcorn.ping',
  '/offline.html',
  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
});