const fs = require('fs');
const { createDir, resolvePublicPath } = require('./_utils');

const swContent = `importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  workbox.routing.registerRoute(
    /.*\.(?:css|js|)/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets",
    })
  );
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
}
`;

module.exports = () => {
  const path = resolvePublicPath('service-worker.js');
  createDir(resolvePublicPath());
  fs.writeFileSync(path, swContent);
}