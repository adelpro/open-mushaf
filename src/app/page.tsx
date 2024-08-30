import { Sura } from '@/types'

import Home from './home'

export const metadata = generateMetadata()

function generateMetadata() {
  const title = 'Open-Mushaf'
  const description = 'المحف المفتوح المصدر'
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
  const data: Sura[] = (await fetch(url, {
    cache: 'force-cache',
  }).then((res) => res.json())) as Sura[]
  return <Home data={data} />
}
