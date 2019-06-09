'use strict';
import DBHelper from './dbhelper.js';
let restaurants,
    neighborhoods,
    cuisines,
    loc;

var mymarker;
var locsMap;
var markers = [];

let dbPromise = DBHelper.openDatabase;
let openObjectStore = DBHelper.openObjectStore;

const triggerFavoriteRequestQueueSync = function () {
  navigator.serviceWorker.ready.then(function (swRegistration) {
    swRegistration.sync.register('favqueue');
  });
}

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
  setEventListeners();
    initMap();

});
/**
 * Update page and map for current restaurants.
 */
var updateRestaurants = () => {
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');
    const cIndex = cSelect.selectedIndex;
    const nIndex = nSelect.selectedIndex;

    const cuisine = cSelect[cIndex].value;
    const neighborhood = nSelect[nIndex].value;

    DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
        if (error) { // Got an error!
            console.error(error+" fetch error");
        } else {
            resetRestaurants(restaurants);
            fillRestaurantsHTML();
            loc=restaurants[0].latlng;
            locsMap.flyTo({
                center: loc
            });
            addMarkersToMap(restaurants);
        }
    })

}

var setEventListeners = () => {
  var neighborHoodSelect = document.getElementById('neighborhoods-select');
  neighborHoodSelect.addEventListener('change', function () {
    updateRestaurants();

  });

  var cuisineSelect = document.getElementById('cuisines-select');
  cuisineSelect.addEventListener('change', function () {
    updateRestaurants();
  });
}

/**
 * Fetch all neighborhoods and set their HTML.
 */
var fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
var fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
var fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
var fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize map box map, called from HTML.
 */
window.initMap = () => {
     loc = {
       lat:40.722216
     ,
         lng:
             -73.987501};

    mapboxgl.accessToken = 'pk.eyJ1IjoibWZhcmciLCJhIjoiY2p1ZDloNmRiMDR3MDN5bXk5ZmUzdTRodiJ9.7Tp8zK2yRKBICT5Ry9q64Q';
    mymap(loc);
    updateRestaurants();
}

/**
 * Update page and map for current restaurants.
 */
var updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
var mymap = (loc) => {
    locsMap = new mapboxgl.Map({
        container: 'locsMap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: loc, // starting position
        zoom: 11.12// starting zoom
    });
}
var resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  markers.forEach(m => m.setMap(null));
  markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
var fillRestaurantsHTML = (restaurants = self.restaurants) => {
  let tabIndex = 3;
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant, tabIndex));
    tabIndex++;
  });

  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
}

/**
 * Create restaurant HTML.
 */
var createRestaurantHTML = (restaurant, tabIndex) => {
  const restaurantId = restaurant.id;

  const isRestaurantFavorite = (restaurant.is_favorite == 'true');

  const li = document.createElement('li');
    li.className = 'restaurant-Card';
    const imgFavContainer = document.createElement('div');
    li.append(imgFavContainer);
    imgFavContainer.className="imageFavContainer";

    const favoriteButton = document.createElement('button');
    favoriteButton.className="favIcon";
   // favoriteButton.setAttribute ('markFav', '3');
    imgFavContainer.append(favoriteButton);

    const imgContainer = document.createElement('div');
    imgContainer.className = 'restaurant-img-container';
    imgFavContainer.append(imgContainer);
  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = restaurant.name + " image";
    imgContainer.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  name.className = 'restaurant-name';
  li.append(name);

  if (isRestaurantFavorite) {
    favoriteButton.setAttribute('favorised', '');
    favoriteButton.setAttribute('aria-label', `Remove ${restaurant.name} from favorites`);
    favoriteButton.setAttribute ('markFav', true);
  } else {
    favoriteButton.setAttribute('aria-label', `Mark ${restaurant.name} as favorite`);
      favoriteButton.setAttribute ('markFav', false);
  }

  favoriteButton.setAttribute('restaurantId', restaurantId);
  favoriteButton.setAttribute('restaurantname', restaurant.name);
  favoriteButton.id = `favoriteButton${restaurantId}`;



  favoriteButton.addEventListener('click', toggleFavorite);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  neighborhood.className = 'restaurant-details';
  li.append(neighborhood);

  const address = document.createElement('address');
  address.innerHTML = restaurant.address;
  address.className = 'restaurant-address';
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.className = 'restaurant-page-link';
  more.setAttribute('aria-label', `for more details about ${restaurant.name}'s restaurant click here`);
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)



  return li
}

const toggleFavorite = function (event) {
    const restaurantId = parseInt(this.getAttribute('restaurantId'));
    const favoriteButton = document.getElementById(`favoriteButton${restaurantId}`);
    const isFavorised = favoriteButton.hasAttribute('favorised');
    const restaurantName = favoriteButton.getAttribute('restaurantname');
    if (isFavorised) {
        favoriteButton.removeAttribute('favorised');
        favoriteButton.setAttribute('aria-label', `Mark ${restaurantName} as favorite`);
        favoriteButton.setAttribute ('markFav', false);
    } else {
        favoriteButton.setAttribute('favorised', '');
        favoriteButton.setAttribute('aria-label', `Remove ${restaurantName} from favorites`);
        favoriteButton.setAttribute ('markFav', true);
    }
    dbPromise.then(function (db) {
        var restaurantStore = DBHelper.openObjectStore(db, 'restaurants', 'readonly')
        return restaurantStore.get(restaurantId);
    }).then(restaurant => {
        const isFavorite = !(restaurant.is_favorite == 'true');
        restaurant.is_favorite = isFavorite.toString();
        return dbPromise.then(function (db) {
            var restaurantStore = openObjectStore(db, 'restaurants', 'readwrite');
            var favStore = openObjectStore(db, 'favqueue', 'readwrite');
            restaurantStore.put(restaurant);
            restaurant.url = `http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=${isFavorite}`;
            restaurant.method = "put";
            favStore.put(restaurant, restaurant.id);
            restaurantStore.complete;
            return favStore.complete
        }).then(() => {
            return triggerFavoriteRequestQueueSync()
        }).catch((err) => console.log(err))
    })
};

/**
 * Add markers for current restaurants to the map.
 */
var addMarkersToMap = (restaurants = self.restaurants) => {
    restaurants.forEach(restaurant => {
        var el = document.createElement('div');
        el.className = 'marker';
          mymarker =new mapboxgl.Marker(el, { offset: [0, -23] }).setLngLat(restaurant.latlng).addTo(locsMap);
        el.addEventListener('click', function(e) {
            var activeItem = document.getElementsByClassName('active');
            // 1. Fly to the point
            // 2. Close all other popups and display popup for clicked store
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            e.stopPropagation();
            window.location.href=DBHelper.urlForRestaurant(restaurant);
        });
    });
}
/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
var resetRestaurants = (restaurants) => {
    // Remove all restaurants
    self.restaurants = [];
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';
    self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
var fillRestaurantsHTML = (restaurants = self.restaurants) => {
    const ul = document.getElementById('restaurants-list');
    ul.className = 'restaurant-Cards-Container';
    restaurants.forEach(restaurant => {
        ul.append(createRestaurantHTML(restaurant));
    });
    addMarkersToMap();
}
