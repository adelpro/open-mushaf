import ChapterList from "@/components/chapterList";
import React from "react";
export async function generateMetadata() {
  const title = "Open-Mushaf - chapters";
  const description = "قائمة الأجزاء";
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
export default function Chapters() {
  return (
    <div className="container m-2">
      <ChapterList />
    </div>
  );
}
