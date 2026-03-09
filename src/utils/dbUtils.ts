
// IndexedDB utility for permanent data storage

// Database configuration
const DB_NAME = 'housePriceNavigatorDB';
const DB_VERSION = 1;

// Store (table) names
const STORES = {
  USERS: 'users',
  PREDICTIONS: 'predictions',
  SUBSCRIPTIONS: 'subscriptions',
};

/**
 * Initialize the database
 * @returns Promise that resolves when DB is ready
 */
export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', (event.target as IDBRequest).error);
      reject(new Error('Could not open database'));
    };

    request.onsuccess = () => {
      console.log('Database opened successfully');
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      
      // Create object stores (tables) if they don't exist
      if (!db.objectStoreNames.contains(STORES.USERS)) {
        const userStore = db.createObjectStore(STORES.USERS, { keyPath: 'id' });
        userStore.createIndex('username', 'username', { unique: true });
        userStore.createIndex('email', 'email', { unique: true });
      }
      
      if (!db.objectStoreNames.contains(STORES.PREDICTIONS)) {
        const predictionStore = db.createObjectStore(STORES.PREDICTIONS, { keyPath: 'id' });
        predictionStore.createIndex('userId', 'userId', { unique: false });
        predictionStore.createIndex('date', 'date', { unique: false });
      }
      
      if (!db.objectStoreNames.contains(STORES.SUBSCRIPTIONS)) {
        const subscriptionStore = db.createObjectStore(STORES.SUBSCRIPTIONS, { keyPath: 'id' });
        subscriptionStore.createIndex('userId', 'userId', { unique: true });
      }
      
      console.log('Database setup complete');
    };
  });
};

/**
 * Get a database connection
 * @returns Promise that resolves with the database connection
 */
const getDBConnection = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
  });
};

/**
 * Generic function to add an item to a store
 * @param storeName The store to add to
 * @param item The item to add
 * @returns Promise that resolves with the ID of the added item
 */
export const addItem = async <T>(storeName: string, item: T): Promise<IDBValidKey> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const request = store.add(item);
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = (event) => {
      console.error(`Error adding item to ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Generic function to update an item in a store
 * @param storeName The store to update
 * @param item The item to update
 * @returns Promise that resolves when the update is complete
 */
export const updateItem = async <T>(storeName: string, item: T): Promise<void> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const request = store.put(item);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = (event) => {
      console.error(`Error updating item in ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Generic function to get an item from a store by ID
 * @param storeName The store to query
 * @param id The ID of the item
 * @returns Promise that resolves with the item
 */
export const getItem = async <T>(storeName: string, id: IDBValidKey): Promise<T | undefined> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    
    const request = store.get(id);
    
    request.onsuccess = () => {
      resolve(request.result as T);
    };
    
    request.onerror = (event) => {
      console.error(`Error getting item from ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Generic function to get all items from a store
 * @param storeName The store to query
 * @returns Promise that resolves with an array of items
 */
export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result as T[]);
    };
    
    request.onerror = (event) => {
      console.error(`Error getting items from ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Generic function to get items by an index
 * @param storeName The store to query
 * @param indexName The index to query by
 * @param value The value to look for
 * @returns Promise that resolves with an array of matching items
 */
export const getItemsByIndex = async <T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    
    const request = index.getAll(value);
    
    request.onsuccess = () => {
      resolve(request.result as T[]);
    };
    
    request.onerror = (event) => {
      console.error(`Error getting items by index from ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Generic function to delete an item from a store
 * @param storeName The store to delete from
 * @param id The ID of the item to delete
 * @returns Promise that resolves when the deletion is complete
 */
export const deleteItem = async (storeName: string, id: IDBValidKey): Promise<void> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = (event) => {
      console.error(`Error deleting item from ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Clear all data from a store
 * @param storeName The store to clear
 * @returns Promise that resolves when the store is cleared
 */
export const clearStore = async (storeName: string): Promise<void> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const request = store.clear();
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = (event) => {
      console.error(`Error clearing store ${storeName}:`, (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Export specific constants
export { STORES };
