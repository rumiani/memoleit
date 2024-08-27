self.addEventListener('install', (event) => {
    console.log('Service Worker Installed');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated');
    return self.clients.claim();
  });
  
  self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'CHECK_STATUS') {
      const result = await checkAndUpdateStatus();
      event.ports[0].postMessage(result);
    }
  });
  
  async function checkAndUpdateStatus() {
    // Using IndexedDB directly as Dexie is not available in Service Worker
    const dbRequest = indexedDB.open('MyDatabase', 1);
  
    return new Promise((resolve, reject) => {
      dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction('status', 'readwrite');
        const objectStore = transaction.objectStore('status');
  
        const getRequest = objectStore.get(1); // Assuming the status object has an ID of 1
        getRequest.onsuccess = function(event) {
          const data = event.target.result;
          if (data && data.status === true) {
            data.status = false; // Update the status to false
            const updateRequest = objectStore.put(data);
            updateRequest.onsuccess = function() {
              resolve('Status updated to false');
            };
            updateRequest.onerror = function() {
              reject('Failed to update status');
            };
          } else {
            resolve('Status is already false or not found');
          }
        };
        getRequest.onerror = function() {
          reject('Failed to get status');
        };
      };
      dbRequest.onerror = function() {
        reject('Failed to open database');
      };
    });
  }
  