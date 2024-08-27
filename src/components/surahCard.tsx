import backgroundSurahCardLeft from '@/asset/background-surah-list-left.png'
import { Surah } from '@/types'
import Link from 'next/link'
type Props = {
  surah: Surah
}

export default function SurahCard({ surah }: Props) {
  return (
    <Link
      className="flex flex-col p-1 pr-4 text-slate-600 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer w-full sm:max-w-md"
      href={`/mushaf/${surah.startingPage}?number=${surah.number}`}
    >
      <div
        className="flex gap-5 bg-contain bg-no-repeat rounded-lg"
        style={{
          backgroundImage: `url('${backgroundSurahCardLeft.src}')`,
        }}
      >
        <span className={`text-lg font-bold flex items-center`}>
          {surah.number}
        </span>
        <div className={`flex flex-col gap-2 justify-end`}>
          <div className="flex gap-2 justify-center items-center">
            <p className={`text-2xl font-semibold`}>{surah.name}</p>
            <span>-</span>
            <p className={`text-sm`}>{surah.numberOfAyahs} آيات</p>
          </div>
          <p className={`text-sm text-gray-500 italic`}>
            {surah.englishName} - {surah.englishNameTranslation}
          </p>
        </div>
      </div>
    </Link>
  )
}
