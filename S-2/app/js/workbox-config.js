module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{html,css,js,json,ttf,jpg,svg,png}"
  ],
  "globIgnores": [
    "sw-src.js",
    "workbox-config.js"
  ],
  "swSrc": "sw-src.js",
  "swDest": "../sw.js"
};
