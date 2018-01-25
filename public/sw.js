import('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('venari').then(function (cache) {
      return cache.addAll([
        '/',
        '/client/css/venariLogo.png',
        '/client/css/phpThumb_generated_thumbnailico',
        'client/css/download.png',
        '/dist/index.js',
        '/index.html',
        '/client/css/index.css',
        '/manifest.webmanifest'
        
        
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(

    caches.match(event.request).then(function (response) {

      return response || fetch(event.request);

    })

  );

});
