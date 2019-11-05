var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
  self.addEventListener("activate", function(event) {
    /* Just like with the install event, event.waitUntil blocks activate on a promise.
       Activation will fail unless the promise is fulfilled.
    */
  
    event.waitUntil(
      caches
        /* This method returns a promise which will resolve to an array of available
           cache keys.
        */
        .keys()
        .then(function (keys) {
          // We return a promise that settles when all outdated caches are deleted.
          return Promise.all(
            keys
              .filter(function (key) {
                // Filter by keys that don't start with the latest version prefix.
                return !key.startsWith(version);
              })
              .map(function (key) {
                /* Return a promise that's fulfilled
                   when each outdated cache is deleted.
                */
                return caches.delete(key);
              })
          );
        })
        .then(function() {
        })
    );
  });