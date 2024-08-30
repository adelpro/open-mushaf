import { Chapter } from '@/types'

import ChapterCard from './chapterCard'

type Props = {
  data: Chapter[]
}
export default function ChapterList({ data }: Props) {
  const chapterdata = data

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
      >
        {chapterdata.map((chapter: Chapter) => (
          <ChapterCard key={chapter.number} chapter={chapter} />
        ))}
      </div>
    </>
  )
}
