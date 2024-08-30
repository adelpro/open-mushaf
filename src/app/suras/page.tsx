import SuraList from '@/components/suraList'

export async function generateMetadata() {
  const title = 'Open-Mushaf - Suras'
  const description = 'قائمة السور'
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
  return (
    <div className="container m-2">
      <SuraList />
    </div>
  )
}
