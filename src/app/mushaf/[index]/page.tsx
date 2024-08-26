import PageByIndex from './pageByIndex'

export async function generateMetadata() {
  const title = 'Open-Mushaf - مصحف المدينة المنورة - ورش'
  const description = 'صفحات المصحف'
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

export default function Page({ params }: { params: { index: string } }) {
  return <PageByIndex params={params} />
}
