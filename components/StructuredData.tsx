import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

type JsonLd = Record<string, unknown>

function serialiseJsonLd(value: JsonLd) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function StructuredData({ value }: { value: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(value) }}
    />
  )
}

export function WebsiteStructuredData() {
  return (
    <StructuredData
      value={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
      }}
    />
  )
}
