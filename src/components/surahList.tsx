import surahdata from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json'
import { Surah } from '@/types'
import SurahCard from './surahCard'
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
  )
}
