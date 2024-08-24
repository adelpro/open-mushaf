import { useEffect, useState } from "react";

const useDownloadassetsOffLine = () => {
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "DOWNLOAD_PROGRESS") {
          setProgress(event.data.progress);
          setTotal(event.data.total);
          setStatus(
            `Downloading images (${event.data.progress}/${event.data.total})...`
          );
        }

        if (event.data && event.data.type === "DOWNLOAD_COMPLETE") {
          setStatus("Images downloaded successfully!");
          setProgress(event.data.total);
        }
      });
    }
  }, []);

  const downloadAssets = () => {
    setStatus("Starting download...");
    if (
      window !== undefined &&
      "serviceWorker" in navigator &&
      navigator.serviceWorker.controller
    ) {
      navigator.serviceWorker.controller.postMessage({
        type: "DOWNLOAD_OFFLINE",
      });
    }
  };
  return {
    downloadAssets,
    status,
    progress,
    total,
  };
};
export default useDownloadassetsOffLine;
