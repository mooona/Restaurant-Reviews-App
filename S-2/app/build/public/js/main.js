!function a(u,i,s){function c(n,e){if(!i[n]){if(!u[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var o=i[n]={exports:{}};u[n][0].call(o.exports,function(e){var t=u[n][1][e];return c(t||e)},o,o.exports,a,u,i,s)}return i[n].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,n){"use strict";var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();var o,a,u=e("idb"),i=(o=u)&&o.__esModule?o:{default:o},s=function(){function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n)}return r(n,null,[{key:"openDatabase",value:function(){return i.default.open("restaurants",1,function(e){e.createObjectStore("restaurants",{keyPath:"id"})})}},{key:"getCachedMessages",value:function(){return(a=this.openDatabase()).then(function(e){if(e)return e.transaction("restaurants").objectStore("restaurants").getAll()})}},{key:"setLastUpdated",value:function(e){localStorage.setItem("lastUpdated",e)}},{key:"fetchRestaurants",value:function(t){this.getCachedMessages().then(function(e){if(0<e.length)return t(null,e);fetch("http://localhost:1337/restaurants",{credentials:"same-origin"}).then(function(e){return e.json()}).then(function(n){return a.then(function(e){if(e){var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.forEach(function(e){return t.put(e)}),t.openCursor(null,"prev").then(function(e){return e.advance(30)}).then(function e(t){if(t)return t.delete(),t.continue().then(e)})}}),t(null,n)})}).catch(function(e){t(e,null)})}},{key:"fetchRestaurantById",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.find(function(e){return e.id==r});n?o(null,n):o("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.filter(function(e){return e.cuisine_type==r});o(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.filter(function(e){return e.neighborhood==r});o(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,o,a){n.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t;"all"!=r&&(n=n.filter(function(e){return e.cuisine_type==r})),"all"!=o&&(n=n.filter(function(e){return e.neighborhood==o})),a(null,n)}})}},{key:"fetchNeighborhoods",value:function(o){n.fetchRestaurants(function(e,n){var r,t;e?o(e,null):(r=n.map(function(e,t){return n[t].neighborhood}),t=r.filter(function(e,t){return r.indexOf(e)==t}),o(null,t))})}},{key:"fetchCuisines",value:function(o){n.fetchRestaurants(function(e,n){var r,t;e?o(e,null):(r=n.map(function(e,t){return n[t].cuisine_type}),t=r.filter(function(e,t){return r.indexOf(e)==t}),o(null,t))})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return 10==e.id?"./build/public/images/10.webp":"./build/public/images/"+e.photograph+".webp"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:n.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:8000/data/restaurants.json"}}]),n}();t.exports=s},{idb:3}],2:[function(e,t,n){"use strict";var r,u,o=e("./dbhelper.js"),c=(r=o)&&r.__esModule?r:{default:r},i=void 0;document.addEventListener("DOMContentLoaded",function(e){s(),f(),a(),initMap()});var a=function(){document.getElementById("neighborhoods-select").addEventListener("change",function(){h()}),document.getElementById("cuisines-select").addEventListener("change",function(){h()})},s=function(){c.default.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,l())})},l=function(){var e=arguments.length<=0||void 0===arguments[0]?self.neighborhoods:arguments[0],n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},f=function(){c.default.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,d())})},d=function(){var e=arguments.length<=0||void 0===arguments[0]?self.cuisines:arguments[0],n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})};window.initMap=function(){i={lat:40.722216,lng:-73.987501},mapboxgl.accessToken="pk.eyJ1IjoibWZhcmciLCJhIjoiY2p1ZDloNmRiMDR3MDN5bXk5ZmUzdTRodiJ9.7Tp8zK2yRKBICT5Ry9q64Q",p(i),h()};var p=function(e){u=new mapboxgl.Map({container:"locsMap",style:"mapbox://styles/mapbox/streets-v11",center:e,zoom:11.12})},h=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,r=t.selectedIndex,o=e[n].value,a=t[r].value;c.default.fetchRestaurantByCuisineAndNeighborhood(o,a,function(e,t){e?console.error(e):(y(t),v(),i=t[0].latlng,u.flyTo({center:i}),m(t))})},m=function(){(arguments.length<=0||void 0===arguments[0]?self.restaurants:arguments[0]).forEach(function(t){var e=document.createElement("div");e.className="marker",new mapboxgl.Marker(e,{offset:[0,-23]}).setLngLat(t.latlng).addTo(u),e.addEventListener("click",function(e){document.getElementsByClassName("active");e.stopPropagation(),window.location.href=c.default.urlForRestaurant(t)})})},y=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.restaurants=e},v=function(){var e=arguments.length<=0||void 0===arguments[0]?self.restaurants:arguments[0],t=document.getElementById("restaurants-list");t.className="restaurant-Cards-Container",e.forEach(function(e){t.append(function(e,t){var n=document.createElement("li");n.className="restaurant-Card";var r=document.createElement("div");r.className="restaurant-img-container",n.append(r);var o=document.createElement("img");o.className="restaurant-img",o.src=c.default.imageUrlForRestaurant(e),o.alt=e.name+" image",r.append(o);var a=document.createElement("h1");a.innerHTML=e.name,a.className="restaurant-name",n.append(a);var u=document.createElement("p");u.innerHTML=e.neighborhood,u.className="restaurant-details",n.append(u);var i=document.createElement("address");i.innerHTML=e.address,i.className="restaurant-address",n.append(i);var s=document.createElement("a");return s.innerHTML="View Details",s.className="restaurant-page-link",s.setAttribute("aria-label","for more details about "+e.name+"'s restaurant click here"),s.href=c.default.urlForRestaurant(e),n.append(s),n}(e))}),m()}},{"./dbhelper.js":1}],3:[function(e,p,t){"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function a(n,r,o){var a,e=new Promise(function(e,t){u(a=n[r].apply(n,o)).then(e,t)});return e.request=a,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return a(this[n],e,arguments)})})}function n(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function r(e,r,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[r],(t=a(e,n,arguments)).then(function(e){if(e)return new i(e,t.request)});var e,t})})}function o(e){this._index=e}function i(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function c(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function l(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new c(n)}function f(e){this._db=e}e(o,"_index",["name","keyPath","multiEntry","unique"]),t(o,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),r(o,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(i,"_cursor",["direction","key","primaryKey","value"]),t(i,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(i.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new i(e,t._request)})})})}),s.prototype.createIndex=function(){return new o(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new o(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),r(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),c.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(c,"_tx",["objectStoreNames","mode"]),n(c,"_tx",IDBTransaction,["abort"]),l.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(l,"_db",["name","version","objectStoreNames"]),n(l,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new c(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(a){[s,o].forEach(function(e){e.prototype[a.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],r=this._store||this._index,o=r[a].apply(r,t.slice(0,-1));o.onsuccess=function(){n(o.result)}}})}),[o,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var r=this,o=[];return new Promise(function(t){r.iterateCursor(e,function(e){e?(o.push(e.value),void 0===n||o.length!=n?e.continue():t(o)):t(o)})})})});var d={open:function(e,t,n){var r=a(indexedDB,"open",[e,t]),o=r.request;return o.onupgradeneeded=function(e){n&&n(new l(o.result,e.oldVersion,o.transaction))},r.then(function(e){return new f(e)})},delete:function(e){return a(indexedDB,"deleteDatabase",[e])}};void 0!==p?p.exports=d:self.idb=d}()},{}]},{},[2]);
//# sourceMappingURL=main.js.map
