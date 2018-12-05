console.log('I am the worker');

const cacheName = 'shell-content-v1';
const dataCacheName = 'movieData-v1';

var filesToCache = [
  '/styles/inline.css',
  '/index.js',
  '/src/components/movie-search.js',
  '/images/popcorn.ping',
  '/offline.html',
  '/'
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


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      console.log(keyList)
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Fixes a corner case in which the app wasn't returning the latest data.
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'http://www.omdbapi.com/?apikey=aba065d3';
  console.log('*', e.request.url)
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * movie data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy.
     */
    e.respondWith(
      caches.open(dataCacheName)
        .then(cache => {
          return fetch(e.request)
            .then(response =>{
              cache.put(e.request.url, response.clone());
              return response;
            })
        })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy.
     */
    e.respondWith(
      caches.match(e.request)
      .then( response => {
        return response || fetch(e.request);
      })
    );
  }
});