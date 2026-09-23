self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
  // Let the browser do its default thing
  // We just need a registered SW for PWA installability
});
