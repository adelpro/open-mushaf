"use client";
import SurahList from "../components/surahList";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedPage, _] = useLocalStorage<Number>("selectedPage", 1);
  useEffect(() => {
    if (selectedPage) {
      router.push(`/pages/${selectedPage}`);
    }
  }, [selectedPage, router]);
  return selectedPage ? (
    <></>
  ) : (
    <main className="min-h-screen p-5 sm:p-10 md:p-24">
      <SurahList />
    </main>
  );
}
