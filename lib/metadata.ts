import type { Metadata } from 'next'
import { businessProfile } from '@/config/business'

const BRAND = businessProfile.shortName
const LOCATION = businessProfile.location

export function buildMetadata({
  title,
  description,
}: {
  title: string
  description: string
}): Metadata {
  return {
    title: { absolute: `${title} | ${businessProfile.seoName}` },
    description,
    openGraph: {
      title: `${title} | ${businessProfile.seoName}`,
      description,
      locale: 'en_GB',
      type: 'website',
    },
  }
}

export const SITE = {
  BRAND,
  LOCATION,
  PHONE: businessProfile.phone,
  EMAIL: businessProfile.email,
  WA_NUMBER: businessProfile.whatsappNumber,
  DOMAIN: businessProfile.domain,
}
