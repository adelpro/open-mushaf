import ChapterList from '@/components/chapterList'
import { Chapter } from '@/types'
export async function generateMetadata() {
  const title = 'Open-Mushaf - chapters'
  const description = 'قائمة الأجزاء'
  const openGraph = {
    title,
    description,
  }

  return {
    title,
    description,
    openGraph,
  }
}
export default async function Page() {
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/chapter.json`

  const chaptersData: Chapter[] = (await fetch(url, {
    cache: 'force-cache',
  }).then((res) => res.json())) as Chapter[]
  return (
    <div className="container m-2">
      <ChapterList data={chaptersData} />
    </div>
  )
}
