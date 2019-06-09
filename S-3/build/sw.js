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
    "revision": "5bdd606601e6acaf1007b8c353453f55"
  },
  {
    "url": "index.html",
    "revision": "1a301f08c48efe3f68043e8c14db355d"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "dc3894e818415493d8c3a6379d2ea24c"
  },
  {
    "url": "js/main.js",
    "revision": "83c3ddc0a39d3037d72ddb20759e5706"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "d6f942a3a5a0b44db4c51bdd546855da"
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
    "revision": "688d91a83ef8710400e00afe8b50ee99"
  },
  {
    "url": "sw.js",
    "revision": "5228972b1e5263faf4321622eb6e7d05"
  },
  {
    "url": "img/1.jpg",
    "revision": "8488eb3d53cd65ca7aa0ad3adaca9fe3"
  },
  {
    "url": "img/1.webp",
    "revision": "5c65e4855aeacab9ba45be0a980c946f"
  },
  {
    "url": "img/10.jpg",
    "revision": "a3da623e6976c1a1a8430e880d8c4ebf"
  },
  {
    "url": "img/10.webp",
    "revision": "352270bc2eeee409d586f5f4ef33c94e"
  },
  {
    "url": "img/192.png",
    "revision": "8f0b0ca8c392ee44b35f22ecf039df61"
  },
  {
    "url": "img/192.webp",
    "revision": "a407a1e883ee91042aec6739200f2c29"
  },
  {
    "url": "img/2.jpg",
    "revision": "26c8673b0d2522e9b1bd5619d724f546"
  },
  {
    "url": "img/2.webp",
    "revision": "f4900019b0ca9b29a185b8f159c192a7"
  },
  {
    "url": "img/3.jpg",
    "revision": "e155af0ee52ea467937f2790219c7cfe"
  },
  {
    "url": "img/3.webp",
    "revision": "e8db1e0f187e9c56ab2b86d3b04d25d6"
  },
  {
    "url": "img/4.jpg",
    "revision": "aa790d38f03a0ba4e8d17f7cd33c6949"
  },
  {
    "url": "img/4.webp",
    "revision": "44fad1f08296a1303bf4fc228cfdcd18"
  },
  {
    "url": "img/5.jpg",
    "revision": "87c19586fd12ffb537131194ae8991fe"
  },
  {
    "url": "img/5.webp",
    "revision": "b61909f08754ee188f14a538f818f060"
  },
  {
    "url": "img/512.png",
    "revision": "84f77d2cd44a1495302a5df8e101debc"
  },
  {
    "url": "img/512.webp",
    "revision": "b90293a3c3e83b948df0205e1d89bfb2"
  },
  {
    "url": "img/6.jpg",
    "revision": "15e1663f80823a136be5a173e1df84dd"
  },
  {
    "url": "img/6.webp",
    "revision": "5be2adc42233b7a6dea58f5fabbaec56"
  },
  {
    "url": "img/7.jpg",
    "revision": "aaad45230c438c42620c3e455deea8f0"
  },
  {
    "url": "img/7.webp",
    "revision": "9cf8c0228e27c34768778c086b346056"
  },
  {
    "url": "img/8.jpg",
    "revision": "dda59503c872cc546a9f817d12e77372"
  },
  {
    "url": "img/8.webp",
    "revision": "a51d6b3317408f23efd3e135b37ee56e"
  },
  {
    "url": "img/9.jpg",
    "revision": "63b2022e6885e07267484c92f10c74bd"
  },
  {
    "url": "img/9.webp",
    "revision": "a2699423ee418f80a8546388d254967d"
  },
  {
    "url": "img/Favicon-active.svg",
    "revision": "40575c2e13a734c0df7aef0635354d37"
  },
  {
    "url": "img/favicon.png",
    "revision": "1ecf53bb2b7b15009492ab60d7edc99d"
  },
  {
    "url": "img/Favicon.svg",
    "revision": "8401675a9abea589d2d7ceefb69eb1e2"
  },
  {
    "url": "img/favicon.webp",
    "revision": "ad1a728479f4b06d2a8fdd441e44d99e"
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
