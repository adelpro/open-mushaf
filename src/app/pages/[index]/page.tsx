"use client";

import { useRouter } from "next/navigation";
import { defaultNumberOfPages } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";
import { useHotkeys } from "react-hotkeys-hook";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const MushafPage = dynamic(() => import("@/components/mushafPage"), {
  suspense: true,
  loading: () => (
    <div className="flex flex-col justify-center items-center m-5">
      <div className="animate-pulse h-96 w-full bg-gray-300 rounded-lg"></div>
    </div>
  ),
});

export default function Page({ params }: { params: { index: string } }) {
  const router = useRouter();
  const { index } = params;

  // Pages navigation limitation
  if (Number(index) < 1) {
    router.push("/pages/1");
  }

  if (Number(index) > defaultNumberOfPages) {
    router.push(`/pages/${defaultNumberOfPages}`);
  }
  //

  useHotkeys("ArrowLeft", () => {
    if (Number(index) >= defaultNumberOfPages) return;
    router.push(`/pages/${Number(index) + 1}`);
  });
  useHotkeys("ArrowRight", () => {
    if (Number(index) <= 1) return;
    router.push(`/pages/${Number(index) - 1}`);
  });

  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center m-5">
          <div className="animate-pulse h-96 w-full bg-gray-300 rounded-lg"></div>
        </div>
      }
    >
      <MushafPage index={index} />
    </Suspense>
  );
}
