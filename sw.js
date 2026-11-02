importScripts('lines.js');
const V = 'lyg-v3';
const ASSETS = ['./', './index.html', './lines.js', './manifest.webmanifest', './icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];

function idbGet(k) {
  return new Promise((res) => {
    try {
      const r = indexedDB.open('lyg', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => {
        try {
          const q = r.result.transaction('kv', 'readonly').objectStore('kv').get(k);
          q.onsuccess = () => res(q.result || null);
          q.onerror = () => res(null);
        } catch (e) { res(null); }
      };
      r.onerror = () => res(null);
    } catch (e) { res(null); }
  });
}

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((r) => { const cp = r.clone(); caches.open(V).then((c) => c.put('./index.html', cp)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((r) => { const cp = r.clone(); caches.open(V).then((c) => c.put(req, cp)); return r; }))
  );
});

/* Push bez obsahu: větu si service worker vybere sám podle hodiny na telefonu. */
self.addEventListener('push', (e) => {
  e.waitUntil((async () => {
    const cfg = await idbGet('cfg');
    const d = new Date();
    const h = d.getHours();
    const custom = cfg && cfg.hours && cfg.hours[h] && cfg.hours[h].t;
    const line = self.lygLine(d, custom);
    await self.registration.showNotification(line, {
      body: String(h).padStart(2, '0') + ':00',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      tag: 'lyg-hour',
      renotify: true,
      vibrate: [80, 60, 80, 60, 160],
      data: { url: './' }
    });
  })());
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((l) => (l.length ? l[0].focus() : self.clients.openWindow('./'))));
});
