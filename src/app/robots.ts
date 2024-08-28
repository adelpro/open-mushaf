import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const appURL =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${appURL}/sitemap.xml`,
  }
}
