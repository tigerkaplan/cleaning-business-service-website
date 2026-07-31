import type { Metadata } from 'next'

export const SITE_NAME = 'BrightShore Cleaning'
export const SITE_DESCRIPTION =
  'Cleaning services for offices, homes and local spaces in Brighton & Hove. Request a quote with your property details.'

// A stable public origin has not yet been verified from public Website content.
// Keep URL-based SEO fields absent until one is explicitly established.
export const PUBLIC_ORIGIN: URL | undefined = undefined

export const PUBLIC_ROUTE_PATHS = [
  '/',
  '/about',
  '/contact',
  '/end-of-tenancy-cleaning',
  '/airbnb-cleaning',
  '/office-cleaning',
  '/gym-studio-cleaning',
  '/domestic-cleaning',
  '/deep-cleaning',
  '/booking-terms',
  '/privacy-policy',
  '/cookie-policy',
  '/reviews',
] as const

export function getPublicUrl(path: string) {
  return PUBLIC_ORIGIN ? new URL(path, PUBLIC_ORIGIN).toString() : undefined
}

export function createPageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}
