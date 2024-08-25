self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "DOWNLOAD_OFFLINE") {
    console.log("sw: Downloading offline assets...");
    downloadOffline();
  }
});

async function downloadOffline() {
  const cache = await caches.open("mushaf-elmadina-offline-cache");
  for (let i = 1; i <= 604; i++) {
    const image = `/mushaf/mushaf-elmadina-warsh-azrak/${i}.png`;
    await cache.add(image);

    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "DOWNLOAD_PROGRESS",
          progress: i + 1,
          total: urlsToCache.length,
        });
      });
    });
  }

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "DOWNLOAD_COMPLETE",
        success: true,
      });
    });
  });
}
