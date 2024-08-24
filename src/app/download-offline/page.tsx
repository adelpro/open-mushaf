import React from "react";
import DownloadOffline from "./downloadOffline";

export async function generateMetadata() {
  const title = "Open-Mushaf - Download Offline";
  const description = "تنزيل المعطيات";
  const openGraph = {
    title,
    description,
  };

  return {
    title,
    description,
    openGraph,
  };
}
export default function Page() {
  return <DownloadOffline />;
}
