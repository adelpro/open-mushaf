import { MetadataRoute } from 'next'
export default function Sitemap(): MetadataRoute.Sitemap {
  let pagesArray = []
  const appURL =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000'
  for (let i = 1; i <= 604; i++) {
    pagesArray.push({
      url: appURL + '/mushaf/mushaf-elmadina-warsh-azrak/' + i + '.png',
      lastModified: new Date(),
    })
  }

  return [
    // Home Page
    {
      url: appURL,
      lastModified: new Date(),
    },
    // About Page
    {
      url: appURL + '/about',
      lastModified: new Date(),
    },
    // Contact Page
    {
      url: appURL + '/contact',
      lastModified: new Date(),
    },
    ...pagesArray,
  ]
}
