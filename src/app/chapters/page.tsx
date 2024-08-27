import ChapterList from '@/components/chapterList'
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
export default function Page() {
  return (
    <div className="container m-2">
      <ChapterList />
    </div>
  )
}
