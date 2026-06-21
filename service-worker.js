// Cleanup worker for old Hugo Nuo service worker registrations.
// It intentionally does not cache assets; it only removes legacy caches and
// unregisters itself so stale workers stop serving outdated resources.

const CACHE_PREFIX = "hugo-nuo-";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.indexOf(CACHE_PREFIX) === 0)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
