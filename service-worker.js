/*
  MAAR NO FAP — Service Worker
  Strategy:
    - App shell (HTML/manifest/icons) is precached on install so the app
      opens and works fully offline after the first successful visit.
    - Runtime requests use "network falling back to cache" for the shell
      (so updates are picked up quickly when online) and
      "cache falling back to network" for static assets (icons, fonts).
    - This service worker NEVER touches recovery data. All recovery data
      lives in the user's chosen folder (File System Access API) or, as a
      fallback, in localStorage — neither of which the service worker can
      or does read/cache.
*/

const APP_VERSION = 'maar-no-fap-v1.0.0';
const SHELL_CACHE = APP_VERSION + '-shell';
const RUNTIME_CACHE = APP_VERSION + '-runtime';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon-16x16.png',
  './icons/favicon-32x32.png',
  './icons/apple-touch-icon.png',
  './icons/android-chrome-192.png',
  './icons/android-chrome-512.png',
  './icons/maskable-icon-512.png',
  './favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .catch((err) => console.warn('[SW] Precache failed (will retry at runtime):', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('maar-no-fap-') && k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Let the page force-activate a waiting worker after showing an "update ready" prompt.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // App shell / navigations: network-first so updates land quickly, offline falls back to cache.
  if (sameOrigin && (isNavigationRequest(request) || SHELL_ASSETS.some((a) => url.pathname.endsWith(a.replace('./', '/'))))) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const copy = networkResponse.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          return networkResponse;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // Everything else (fonts, external static assets): cache-first, refresh in background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
