import type { MetadataRoute } from 'next'
import { getPublicUrl, PUBLIC_ROUTE_PATHS } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTE_PATHS.flatMap((route) => {
    const url = getPublicUrl(route)
    return url ? [{ url }] : []
  })
}
