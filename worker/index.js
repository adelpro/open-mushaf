self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "DOWNLOAD_OFFLINE") {
    downloadOffline();
  }
});

async function downloadOffline() {
  console.log("downloadOffline function:");
  const cache = await caches.open("mushaf-elmadina-warsh-azrak-offline-cache");
  const urlsToCache = [
    "/mushaf/mushaf-elmadina-warsh-azrak/1.png",
    // Add more URLs as needed
  ];

  for (let i = 0; i < urlsToCache.length; i++) {
    await cache.add(urlsToCache[i]);
    console.log(`Added ${urlsToCache[i]}`);
    /* self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "DOWNLOAD_PROGRESS",
          progress: i + 1,
          total: urlsToCache.length,
        });
      });
    }); */
  }
}
