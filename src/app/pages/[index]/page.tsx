"use client";

import surahdata from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json";
import { useSearchParams } from "next/navigation";
import ListHeader from "@/components/listHeader";
import MushafPage from "@/components/mushafPage";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import { numberOfPages } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";

export default function Page({ params }: { params: { index: string } }) {
  const router = useRouter();
  const { index } = params;
  const searchParams = useSearchParams();
  const number = searchParams.get("number");

  // Pages navigation limitation
  if (Number(index) < 1) {
    router.push("/pages/1");
  }

  if (Number(index) > numberOfPages) {
    router.push(`/pages/${numberOfPages}`);
  }
  //

  useHotkeys("ArrowLeft", () => {
    if (Number(index) >= numberOfPages) return;
    router.push(`/pages/${Number(index) + 1}`);
  });
  useHotkeys("ArrowRight", () => {
    if (Number(index) <= 1) return;
    router.push(`/pages/${Number(index) - 1}`);
  });

  return (
    <div className="flex flex-col justify-center items-center m-5">
      <ListHeader />
      {number && (
        <h2 className="text-2xl text-center">
          {surahdata[Number(number) - 1].name}
        </h2>
      )}
      <MushafPage index={index} />
    </div>
  );
}
