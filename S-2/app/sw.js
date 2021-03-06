importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

/**
 * Workbox 3.1.0
 * Workbox - https://developers.google.com/web/tools/workbox/
 * Codelab - https://codelabs.developers.google.com/codelabs/workbox-lab/
 *
 * Workbox creates a configuration file (in this case workbox-config.js) that
 * workbox-cli uses to generate service workers.

 * The importScripts call imports the workbox-sw.js library so the workbox
 * object gives our service worker access to all the Workbox modules.
 */

if (workbox) {
    console.log(`Workbox loaded.`);

    // Debugging Workbox
    // Force production builds
    workbox.setConfig({ debug: false });
    // Custom Cache Names
    // https://developers.google.com/web/tools/workbox/guides/configure-workbox
    workbox.core.setCacheNameDetails({
        prefix: 'pwa',
        suffix: 'v1'
    });

    // cache-first handler.
    workbox.precaching.precacheAndRoute([
        {
            "url": "CSS/fonts/Muli-Regular.ttf",
            "revision": "d80f1393f3ffecd0773bfee4aadfbf76"
        },
        {
            "url": "CSS/fonts/Quicksand-Regular.ttf",
            "revision": "f46f486edefeba66ac4b538dd593d656"
        },
        {
            "url": "CSS/fonts/Raleway-Regular.ttf",
            "revision": "84abe14c9756256a4b91300ba3e4ec62"
        },
        {
            "url": "CSS/style.css",
            "revision": "d1f5f42291774b5503fb90f65899e425"
        },
        {
            "url": "index.html",
            "revision": "1d1f7a1a7d4375f86d5f64196aab8833"
        },
        {
            "url": "js/dbhelper.js",
            "revision": "d2a8cc9ce3717d36736362cbe3c55e61"
        },
        {
            "url": "js/main.js",
            "revision": "4aeb5b1263fb725f8ff2f77081837543"
        },
        {
            "url": "js/restaurant_info.js",
            "revision": "f0f6dde276ac7c4bcc258e6686871ee1"
        },
        {
            "url": "mapBox/mabBox.js",
            "revision": "a0497221361a5ab2c1d73cbd40d62912"
        },
        {
            "url": "mapBox/mapBox.css",
            "revision": "7cc1e6125e83776334068445de06f97d"
        },
        {
            "url": "restaurant.html",
            "revision": "046ad07e9aa6fa041e4dbd189bcebaf5"
        },
        {
            "url": "sw.js",
            "revision": "4c30d60e4bbcaa226db28a0cbc5dbf2d"
        },
        {
            "url": "img/1.jpg",
            "revision": "8488eb3d53cd65ca7aa0ad3adaca9fe3"
        },
        {
            "url": "img/10.jpg",
            "revision": "a3da623e6976c1a1a8430e880d8c4ebf"
        },
        {
            "url": "img/192.png",
            "revision": "8f0b0ca8c392ee44b35f22ecf039df61"
        },
        {
            "url": "img/2.jpg",
            "revision": "26c8673b0d2522e9b1bd5619d724f546"
        },
        {
            "url": "img/3.jpg",
            "revision": "e155af0ee52ea467937f2790219c7cfe"
        },
        {
            "url": "img/4.jpg",
            "revision": "aa790d38f03a0ba4e8d17f7cd33c6949"
        },
        {
            "url": "img/5.jpg",
            "revision": "87c19586fd12ffb537131194ae8991fe"
        },
        {
            "url": "img/512.png",
            "revision": "84f77d2cd44a1495302a5df8e101debc"
        },
        {
            "url": "img/6.jpg",
            "revision": "15e1663f80823a136be5a173e1df84dd"
        },
        {
            "url": "img/7.jpg",
            "revision": "aaad45230c438c42620c3e455deea8f0"
        },
        {
            "url": "img/8.jpg",
            "revision": "dda59503c872cc546a9f817d12e77372"
        },
        {
            "url": "img/9.jpg",
            "revision": "63b2022e6885e07267484c92f10c74bd"
        },
        {
            "url": "img/favicon.png",
            "revision": "1ecf53bb2b7b15009492ab60d7edc99d"
        },
        {
            "url": "img/marker.svg",
            "revision": "c7a9062f9f39a167ace8a7de3c692c23"
        },
        {
            "url": "manifest.json",
            "revision": "3795599f2271a1193eae80c281674248"
        }
    ]);


    // Images
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'cache-images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                })
            ]
        })
    );

    // RestaurantsDetails
    workbox.routing.registerRoute(
        new RegExp('restaurant.html(.*)'),
        workbox.strategies.networkFirst({
            cacheName: 'cache-restaurants',
            cacheableResponse: {statuses: [0, 200]}
        })
    );

} else {
    console.log(`Workbox failed to load.`);
}
