const cacheName = 'grid-radio-cache-v1';
const resourcesToCache = [
    '/',
    '/index.html',
    '/bootstrap.min.css',
    '/leaflet.css',
    '/Control.FullScreen.css',
    '/easy-button.css',
    '/leaflet.js',
    '/L.Maidenhead.js',
    '/Control.FullScreen.js',
    '/easy-button.js',
    '/proj4.js',
    '/manifest.json'
];

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheName
  })
);

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
