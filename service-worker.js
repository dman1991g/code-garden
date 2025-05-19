const CACHE_NAME = "webdev-pwa-v1";

const FILES_TO_CACHE = [
  "/",                  // root
  "/index.html",        // main page
  "/style.css",         // styling

  // HTML PDFs
  "/HTML/Module+1-+Introduction+to+Software_Web+Development.pdf",
  "/HTML/html-forms.pdf",

  // CSS PDFs
  "/CSS/css-basics.pdf",
  "/CSS/flexbox-guide.pdf",

  // JavaScript PDFs
  "/Javascript/js-basics.pdf",
  "/Javascript/dom-manipulation.pdf",

  // WordPress and React PDFs
  "/Wordpress and react/wp-intro.pdf",
  "/Wordpress and react/react-basics.pdf",

  // Fundamentals and common practices PDFs
  "/Fundamentals and common practices/web-best-practices.pdf",
  "/Fundamentals and common practices/git-and-github.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // activates SW immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
