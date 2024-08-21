import React from "react";
import chapterdata from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/chapter.json";
import ChapterCard from "./chapterCard";
import { Chapter } from "@/types";
export default function ChapterList() {
  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
      >
        {chapterdata.map((chapter: Chapter) => (
          <ChapterCard key={chapter.number} chapter={chapter} />
        ))}
      </div>
    </>
  );
}
