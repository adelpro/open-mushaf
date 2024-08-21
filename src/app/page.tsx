"use client";

import ListHeader from "@/components/listHeader";
import SurahList from "../components/surahList";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedPage, _] = useLocalStorage<Number>("selectedPage", 1);
  if (selectedPage) {
    return router.push(`/pages/${selectedPage}`);
  }
  return (
    <main className="min-h-screen p-5 sm:p-10 md:p-24">
      <ListHeader />
      <SurahList />
    </main>
  );
}
