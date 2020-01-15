if('serviceWorker' in navigator){
    // console.log("Service worker supported..!!");

    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('./sw-cached-site.js')
        .then( reg => console.log("sw registered successfully"))
        .catch( err => console.log(`error while registering service worker: ${err}`))
    })
}