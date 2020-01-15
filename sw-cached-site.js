const currentCacheName = 'v1';

//call install event
self.addEventListener('install', (e) => {
    console.log("SW: Installed cache site");

});

// activate event
self.addEventListener('activate', (e) => {
    console.log("SW: Activated");

    //remove unwanted caches
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
        fetch(e.request)
            .then(res => {
                //Make copy of response
                const resClone = res.clone();
                //Open cache
                caches.open(currentCacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(e.request, resClone);
                    });

                return res;
            })
            .catch(() => caches.match(e.request).then(res => res))
    );
});