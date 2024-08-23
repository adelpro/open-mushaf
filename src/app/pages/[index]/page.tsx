"use client";

import { useSearchParams } from "next/navigation";
import MushafPage from "@/components/mushafPage";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import { defaultNumberOfPages } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";

export default function Page({ params }: { params: { index: string } }) {
  const router = useRouter();
  const { index } = params;
  const searchParams = useSearchParams();

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
    <div className="flex flex-col justify-center items-center m-5">
      <MushafPage index={index} />
    </div>
  );
}
