import type { MetadataRoute } from 'next'
import { getPublicUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const sitemap = getPublicUrl('/sitemap.xml')

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    ...(sitemap ? { sitemap } : {}),
  }
}
