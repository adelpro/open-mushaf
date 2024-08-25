import { useState } from "react";
import { defaultNumberOfPages } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";
const useDownloadassetsOffLine = () => {
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const total = defaultNumberOfPages;

  const downloadAssets = async () => {
    setStatus("بدء التحميل...");
    // fetch all images in public/mushaf/mushaf-elmadina-warsh-azrak from 1.png to 604.png the the baground
    const cache = await caches.open("mushaf-elmadina-warsh-azrak-cache");
    let progress = 0;

    for (let i = 1; i <= total; i++) {
      const url = `/mushaf/mushaf-elmadina-warsh-azrak/${i}.png`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
          progress++;
          setProgress(progress);
          setStatus(`تحميل الصورة (${progress}/${total})...`);
        } else {
          console.error(`فشل في تحميل ${url}: ${response.statusText}`);
        }
      } catch {}
    }
    setStatus("تم التحميل بنجاح");
  };
  return {
    downloadAssets,
    status,
    progress,
    total,
  };
};
export default useDownloadassetsOffLine;
