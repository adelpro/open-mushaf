import { CreativeWork, Graph, WithContext } from 'schema-dts'

type Page = {
  title: string
  index: string
}

export const generateStructuredDataGraph = (page: Page): Graph | null => {
  const { index, title } = page
  const appURL =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000'
  if (!page) {
    return null
  }
  const structuredData: WithContext<CreativeWork> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: title,
    url: `${appURL}/mushaf/${index}/`,
    image: {
      '@type': 'ImageObject',
      url: `${appURL}/mushaf-data/mushaf-elmadina-warsh-azrak/${index}.png`,
    },
    description: `Page ${index} of the Mushaf Quran`,
    datePublished: new Date().toISOString(),
  }
  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [structuredData],
  }
  return graph
}
