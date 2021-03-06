'use strict';

let cn = '1.22';
let cacheWhiteList = ['1.22'];
let assetsList = [
    '/index.html',
    '/assets/js/jquery.min.js',
    '/assets/js/lodash.min.js',
    '/assets/css/animate.css',
    '/assets/css/bootstrap-grid.css',
    '/assets/css/bootstrap-grid.css.map',
    '/assets/css/bootstrap-grid.min.css',
    '/assets/css/bootstrap-grid.min.css.map',
    '/assets/css/bootstrap-reboot.css',
    '/assets/css/bootstrap-reboot.css.map',
    '/assets/css/bootstrap-reboot.min.css',
    '/assets/css/bootstrap-reboot.min.css.map',
    '/assets/css/bootstrap-social.css',
    '/assets/css/bootstrap-social.less',
    '/assets/css/bootstrap.css',
    '/assets/css/bootstrap.css.map',
    '/assets/css/bootstrap.min.css',
    '/assets/css/bootstrap.min.css.map',
    '/assets/css/style.css',
    '/assets/css/style2.css',
    '/assets/js/bootstrap.bundle.js',
    '/assets/js/bootstrap.bundle.js.map',
    '/assets/js/bootstrap.bundle.min.js',
    '/assets/js/bootstrap.bundle.min.js.map',
    '/assets/js/bootstrap.js',
    '/assets/js/bootstrap.js.map',
    '/assets/js/bootstrap.min.js',
    '/assets/js/bootstrap.min.js.map',
    '/assets/js/jquery-3.3.1.min.js',
    '/assets/images/capstone1preview.png',
    '/assets/images/capstone2preview.png',
    '/assets/images/capstone3preview.png',
    '/assets/images/cba95865.video.gif',
    '/assets/images/faviconportfolio.png',
    '/assets/images/forfavicon2.jpg',
    '/assets/images/forfavicon3.jpg',
    '/assets/images/github.png',
    '/assets/images/github.svg',
    '/assets/images/gitlab.png',
    '/assets/images/icon-512x512.png',
    '/assets/images/icon-384x384.png',
    '/assets/images/icon-256x256.png',
    '/assets/images/icon-192x192.png',
    '/assets/images/icon1.png',
    '/assets/images/icon2.png',
    '/assets/images/icon3.png',
    '/assets/images/linkedin.png',
    '/assets/images/mb-bg.jpeg',
    '/assets/images/me.jpg',
    '/assets/images/me2.png',
    '/assets/videos/programming.mp4'
];

// Install Event
self.addEventListener('install', event => {
    // Open the cache
    event.waitUntil(caches.open(cn)
        .then(cache => {
            // Fetch all the assets from the array
            return cache.addAll(assetsList);
        }).then(() => {
            console.log("done caching");
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                //Fallback to network
                return response || fetch(event.request);
            })
            // .catch(r => {
            //     let method = event.request.method;

            //     if (method !== 'POST') {
            //         return caches.match('index.html');
            //     }

            // })

            .catch(() => {
                return caches.open(cn)
                    .then((cache) => {
                        return cache.match('index.html');
                    });
            })

    );
});

// Remove Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheWhiteList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
}); 