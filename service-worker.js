var cacheName = "lessonsapp-v1";
var cacheFiles = [
  "docs/index.html",
  "docs/product.js",
  "docs/style.css",
  "lessonapp.webmanifest",
  "docs/images/piano class.jpg",
  "docs/images/dance class.jpg",
  "docs/images/language.jfif",
  "docs/images/social.jfif",
  "docs/images/swim.jpg",
  "docs/images/tennis.jpg",
  "docs/images/arts.jpg",
  "docs/images/vlogging.jpg",
  "docs/images/math.jpg",
  "docs/images/LessonsApp_logo.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all the files");
      return cache.addAll(cacheFiles);
    })
  );
});



self.addEventListener('fetch', function (e) {  
  e.respondWith(    
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache, 
      return r || fetch(e.request).then(function (response) {
        // add the new file to cache
        return caches.open(cacheName).then(function (cache) {          
          cache.put(e.request, response.clone());
          return response;        
        });      
      });    
    })  
    );
  });
