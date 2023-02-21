var cacheName = "lessonsapp-v1";
var cacheFiles = [
  "index.html",
  "product.js",
  "style.css",
  "lessonapp.webmanifest",
  "images/piano class.jpg",
  "images/dance class.jpg",
  "images/language.jfif",
  "images/social.jfif",
  "images/swim.jpg",
  "images/tennis.jpg",
  "images/arts.jpg",
  "images/vlogging.jpg",
  "images/math.jpg",
  "images/LessonsApp_logo.png",
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
