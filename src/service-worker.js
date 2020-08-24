importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  workbox.precaching.precacheAndRoute([]);

  // Cache images 
  workbox.routing.registerRoute(
    /(.*)images(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  // Cache css & js
  workbox.routing.registerRoute(
    // cache js, css, scc files
    /.*\.(?:css|js|)/,
    // use cache but update in the background ASAP
    new workbox.strategies.StaleWhileRevalidate({
      // use a custom cache name
      cacheName: "assets",
    })
  );

  // Add offline analytics
  workbox.googleAnalytics.initialize();
  /* Install a new service worker and have it update
  and control a web page as soon as possible
  */
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
}