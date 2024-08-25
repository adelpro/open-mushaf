import React from "react";
import surahdata from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json";
import SurahCard from "./surahCard";
import { Surah } from "@/types";
export default function SurahList() {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
    >
      {surahdata.map((surah: Surah) => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </div>
  );
}
