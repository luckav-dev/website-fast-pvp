import { MetadataRoute } from 'next'
import { serverConfig } from '@/lib/config'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastpvp.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/players',
    '/leaderboard',
    '/rules',
    '/staff',
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'hourly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}

