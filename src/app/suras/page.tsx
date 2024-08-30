import SuraList from '@/components/suraList'
import { Sura } from '@/types'

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
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json`
  const surasData: Sura[] = (await fetch(url, {
    cache: 'force-cache',
  }).then((res) => res.json())) as Sura[]
  return (
    <div className="container m-2">
      <SuraList data={surasData} />
    </div>
  )
}
