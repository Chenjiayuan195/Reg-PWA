var storageKey = 'PWA'

var cacheList = [
  '/',
  "index.html",
  "css/reg.css",
  'js/RegTest.js',
  "bc.png"
]

self.addEventListener('install',function(e){
  e.waitUnit(
    caches.open(storageKey).then(function(cache){
      cache.addAll(cacheList).then(function(){
        self.skipWaiting();
      })
    })
  )
})
