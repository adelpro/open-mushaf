import { Surah } from '@/types'

import SurahCard from './surahCard'
export default async function SurahList() {
  const surahdata: Surah[] = (await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json`
  ).then((res) => res.json())) as Surah[]
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
  )
}
