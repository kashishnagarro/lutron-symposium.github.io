const currentCacheName = 'v2';

cacheAssets = [
    'index.html',
    'about.html',
    '/js/main.js',
    '/css/style.css'
];

// //call install event
self.addEventListener('install', (e) => {
    console.log("SW: Installed site");

    e.waitUntil(
        caches.open(currentCacheName)
            .then(cache => {
                console.log("caching assets");
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// // activate event
self.addEventListener('activate', (e) => {
    console.log("SW: Activated site");

//     //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if (cache != currentCacheName) {
                        console.log("SW: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// call fetch event
self.addEventListener('fetch', e => {
    console.log("SW: Fetching");

    e.respondWith(
        // when there is failure for request then return response from cache
        fetch(e.request).catch(() =>
            caches.match(e.request))
    );
});