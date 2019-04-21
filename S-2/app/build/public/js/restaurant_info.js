!function o(i,u,c){function s(n,e){if(!u[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var a=u[n]={exports:{}};i[n][0].call(a.exports,function(e){var t=i[n][1][e];return s(t||e)},a,a.exports,o,i,u,c)}return u[n].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,t,n){"use strict";var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();var a,o,i=e("idb"),u=(a=i)&&a.__esModule?a:{default:a},c=function(){function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n)}return r(n,null,[{key:"openDatabase",value:function(){return u.default.open("restaurants",1,function(e){e.createObjectStore("restaurants",{keyPath:"id"})})}},{key:"getCachedMessages",value:function(){return(o=this.openDatabase()).then(function(e){if(e)return e.transaction("restaurants").objectStore("restaurants").getAll()})}},{key:"setLastUpdated",value:function(e){localStorage.setItem("lastUpdated",e)}},{key:"fetchRestaurants",value:function(t){this.getCachedMessages().then(function(e){if(0<e.length)return t(null,e);fetch("http://localhost:1337/restaurants",{credentials:"same-origin"}).then(function(e){return e.json()}).then(function(n){return o.then(function(e){if(e){var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.forEach(function(e){return t.put(e)}),t.openCursor(null,"prev").then(function(e){return e.advance(30)}).then(function e(t){if(t)return t.delete(),t.continue().then(e)})}}),t(null,n)})}).catch(function(e){t(e,null)})}},{key:"fetchRestaurantById",value:function(r,a){n.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t.find(function(e){return e.id==r});n?a(null,n):a("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(r,a){n.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t.filter(function(e){return e.cuisine_type==r});a(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,a){n.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t.filter(function(e){return e.neighborhood==r});a(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,a,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t;"all"!=r&&(n=n.filter(function(e){return e.cuisine_type==r})),"all"!=a&&(n=n.filter(function(e){return e.neighborhood==a})),o(null,n)}})}},{key:"fetchNeighborhoods",value:function(a){n.fetchRestaurants(function(e,n){var r,t;e?a(e,null):(r=n.map(function(e,t){return n[t].neighborhood}),t=r.filter(function(e,t){return r.indexOf(e)==t}),a(null,t))})}},{key:"fetchCuisines",value:function(a){n.fetchRestaurants(function(e,n){var r,t;e?a(e,null):(r=n.map(function(e,t){return n[t].cuisine_type}),t=r.filter(function(e,t){return r.indexOf(e)==t}),a(null,t))})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return 10==e.id?"./build/public/images/10.webp":"./build/public/images/"+e.photograph+".webp"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:n.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:8000/data/restaurants.json"}}]),n}();t.exports=c},{idb:3}],2:[function(e,t,n){"use strict";var r,a=e("./dbhelper"),o=(r=a)&&r.__esModule?r:{default:r};document.addEventListener("DOMContentLoaded",function(e){initMap()}),window.initMap=function(){i(function(e,t){if(e)console.error(e);else{mapboxgl.accessToken="pk.eyJ1IjoibWZhcmciLCJhIjoiY2p1ZDloNmRiMDR3MDN5bXk5ZmUzdTRodiJ9.7Tp8zK2yRKBICT5Ry9q64Q";var n=new mapboxgl.Map({container:"locsMap",style:"mapbox://styles/mapbox/streets-v11",center:t.latlng,zoom:12}),r=document.createElement("div");r.className="marker";new mapboxgl.Marker(r,{offset:[0,-23]}).setLngLat(t.latlng).addTo(n);d(),o.default.mapMarkerForRestaurant(self.restaurant,self.map)}})};var i=function(n){if(self.restaurant)return console.log("already fetched"),void n(null,self.restaurant);var e=f("id");e?o.default.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(u(),n(null,t)):console.error(e)}):(error="No restaurant id in URL",n(error,null))},u=function(){var e=arguments.length<=0||void 0===arguments[0]?self.restaurant:arguments[0];document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=document.getElementById("restaurant-img");t.alt=e.name+" restaurant image",t.src=o.default.imageUrlForRestaurant(e),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&c(),s()},c=function(){var e=arguments.length<=0||void 0===arguments[0]?self.restaurant.operating_hours:arguments[0],t=document.getElementById("restaurant-hours");for(var n in e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);var o=document.createElement("td");o.innerHTML=e[n],r.appendChild(o),t.appendChild(r)}},s=function(){var e=arguments.length<=0||void 0===arguments[0]?self.restaurant.reviews:arguments[0],t=document.getElementById("reviews-container"),n=document.createElement("h2");if(n.className="reviews-label",n.innerHTML=e.length+" Reviews",t.appendChild(n),!e){var r=document.createElement("p");return r.innerHTML="No reviews yet!",void t.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(l(e))}),t.appendChild(a)},l=function(e){var t=document.createElement("li");t.className="reviewContainer";var n=document.createElement("div");n.className="reviewer-details-container",t.appendChild(n);var r=Math.floor(16777215*Math.random()).toString(16),a=document.createElement("div");a.className="user-profile-pic",a.setAttribute("style","background-color:#"+r+";"),a.innerHTML=e.name.charAt(0),n.appendChild(a);var o=document.createElement("div");o.className="review-details-container",n.appendChild(o);var i=document.createElement("div");i.className="name-rate-container",o.appendChild(i);var u=document.createElement("p");u.innerHTML=e.name,i.appendChild(u);var c=document.createElement("div");c.setAttribute("aria-label","Rating "+e.rating),c.className="rating-container";for(var s="",l=e.rating,d=5-l;1<=l;)s+='<i class="star-yellow" aria-hidden="true">&starf;</i>',l--;for(;1<=d;)s+='<i class="star-white" aria-hidden="true">&starf;</i>',d--;c.innerHTML=s,i.appendChild(c);var f=document.createElement("p");f.innerHTML=e.date,f.setAttribute("aria-label","Review date"),f.className="review-date",o.appendChild(f);var p=document.createElement("p");p.innerHTML='<span class="review-date" aria-label="Review date">'+e.date+"</span>"+e.comments,p.className="comment",t.appendChild(p);var h=document.createElement("div");return h.className="break",h.setAttribute("aria-hidden",!0),t.appendChild(h),t},d=function(){var e=arguments.length<=0||void 0===arguments[0]?self.restaurant:arguments[0],t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.setAttribute("aria-label","Breadcrumb"),t.setAttribute("role","navigation"),t.appendChild(n)},f=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null};window.onscroll=function(){var e=document.getElementById("breadcrumb");(void 0).scrollY<=12?e.className="":e.className="scroll"}},{"./dbhelper":1}],3:[function(e,p,t){"use strict";!function(){function i(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function o(n,r,a){var o,e=new Promise(function(e,t){i(o=n[r].apply(n,a)).then(e,t)});return e.request=o,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return o(this[n],e,arguments)})})}function n(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function r(e,r,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[r],(t=o(e,n,arguments)).then(function(e){if(e)return new u(e,t.request)});var e,t})})}function a(e){this._index=e}function u(e,t){this._cursor=e,this._request=t}function c(e){this._store=e}function s(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function l(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new s(n)}function d(e){this._db=e}e(a,"_index",["name","keyPath","multiEntry","unique"]),t(a,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),r(a,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(u,"_cursor",["direction","key","primaryKey","value"]),t(u,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(u.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),i(t._request).then(function(e){if(e)return new u(e,t._request)})})})}),c.prototype.createIndex=function(){return new a(this._store.createIndex.apply(this._store,arguments))},c.prototype.index=function(){return new a(this._store.index.apply(this._store,arguments))},e(c,"_store",["name","keyPath","indexNames","autoIncrement"]),t(c,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),r(c,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(c,"_store",IDBObjectStore,["deleteIndex"]),s.prototype.objectStore=function(){return new c(this._tx.objectStore.apply(this._tx,arguments))},e(s,"_tx",["objectStoreNames","mode"]),n(s,"_tx",IDBTransaction,["abort"]),l.prototype.createObjectStore=function(){return new c(this._db.createObjectStore.apply(this._db,arguments))},e(l,"_db",["name","version","objectStoreNames"]),n(l,"_db",IDBDatabase,["deleteObjectStore","close"]),d.prototype.transaction=function(){return new s(this._db.transaction.apply(this._db,arguments))},e(d,"_db",["name","version","objectStoreNames"]),n(d,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(o){[c,a].forEach(function(e){e.prototype[o.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],r=this._store||this._index,a=r[o].apply(r,t.slice(0,-1));a.onsuccess=function(){n(a.result)}}})}),[a,c].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var r=this,a=[];return new Promise(function(t){r.iterateCursor(e,function(e){e?(a.push(e.value),void 0===n||a.length!=n?e.continue():t(a)):t(a)})})})});var f={open:function(e,t,n){var r=o(indexedDB,"open",[e,t]),a=r.request;return a.onupgradeneeded=function(e){n&&n(new l(a.result,e.oldVersion,a.transaction))},r.then(function(e){return new d(e)})},delete:function(e){return o(indexedDB,"deleteDatabase",[e])}};void 0!==p?p.exports=f:self.idb=f}()},{}]},{},[2]);
//# sourceMappingURL=restaurant_info.js.map
