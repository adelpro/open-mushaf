import SurahList from "@/components/surahList";
import React from "react";

export async function generateMetadata() {
  const title = "Open-Mushaf - Surahs";
  const description = "قائمة السور";
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
  return (
    <div className="container m-2">
      <SurahList />
    </div>
  );
}
