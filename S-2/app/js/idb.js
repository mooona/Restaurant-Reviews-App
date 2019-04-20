/*
 * IndexedDB
 */

// Create the IndexedDB database.
function createIndexedDB() {
  // Checking for IndexedDB support.
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB.');
    return null;
  }
  // Opening a database.
  return idb.open('pwa-resto-db1', 3, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
      case 1:
        // Creating restaurants' object store.
        if (!upgradeDb.objectStoreNames.contains('restaurants')) {
          console.log('Creating restaurants\' object store.');
          const restaurantsOS =
            upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
        }
      case 2:
        // Creating reviews' object store.
        if (!upgradeDb.objectStoreNames.contains('reviews')) {
          console.log('Creating reviews\' new object store');
          const restaurantsOS =
            upgradeDb.createObjectStore('reviews', {keyPath: 'id'});
        }
    }
  });
}

// DB object.
const dbPromise = createIndexedDB();

/**
 * Writes restaurants data to object-store-restaurants.
 */
function saveRestaurantsDataLocally(restaurants) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readwrite');
    const store = tx.objectStore('restaurants');
    // Don't use Promise.all when there's only one restaurant.
    if (restaurants.length > 1) {
      return Promise.all(restaurants.map(restaurant => store.put(restaurant)))
      .catch(() => {
        tx.abort();
        throw Error('Restaurants failed to be added to the store.');
      });
    } else {
      store.put(restaurants);
    }
  });
}

// Getting restaurants data
function getLocalRestaurantsData() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');
    return store.getAll();
  });
}

// Getting restaurant by id
function getLocalRestaurantByIdData(id) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');
    return store.get(parseInt(id));
  });
}
