import { notFound } from 'next/navigation'

import { generateStructuredDataGraph } from '@/utils/generateStructuredDataGraph'

import PageByIndex from './pageByIndex'

type Params = {
  index: string
}

export async function generateStaticParams() {
  // Generate a list of indices for all pages
  const paths = Array.from({ length: 604 }, (_, i) => ({
    index: (i + 1).toString(),
  }))

  return paths.map((index) => ({
    params: index,
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { index } = params
  if (!index) {
    return notFound()
  }
  const title = `Open-Mushaf - مصحف المدينة المنورة - ورش (${index})`
  const description = `Open-Mushaf - مصحف المدينة المنورة - ورش (${index})`
  const url = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
  const imageURL = `/mushaf-data/mushaf-elmadina-warsh-azrak/${index}.png`
  const OGImage = {
    url,
    width: 430,
    height: 616,
    alt: `Open-Mushaf - مصحف المدينة المنورة - ورش - (${index})`,
  }
  const openGraph = {
    title,
    description,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    type: 'website',
    locale: 'ar',
    url: imageURL,
    images: [OGImage],
  }
  const twitter = {
    card: 'summary_large_image',
    title,
    description,
    images: [OGImage],
  }

  return {
    title,
    description,
    openGraph,
    twitter,
  }
}

export default async function Page({ params }: { params: Params }) {
  const { index } = params
  const structuredDataGraph = generateStructuredDataGraph({
    title: 'مصحف المدينة المنورة - ورش',
    index,
  })

  if (!structuredDataGraph) {
    return <PageByIndex params={{ index }} />
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataGraph),
        }}
      />
      <PageByIndex params={{ index }} />
    </>
  )
}
