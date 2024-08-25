"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SurahList from "@/components/surahList";

export default function Home() {
  const [index, _] = useLocalStorage<string>("index", "1");
  const router = useRouter();
  const [showSurahList, setShowSurahList] = useState(false);

  useEffect(() => {
    if (index !== "1") {
      setShowSurahList(true);
      setTimeout(() => {
        router.replace(`/mushaf/${index}`);
      }, 100);
    }
  }, [index]);

  return (
    <main className="container m-2">{showSurahList && <SurahList />}</main>
  );
}
