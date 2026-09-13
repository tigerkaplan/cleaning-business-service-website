import { createPageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { businessProfile } from '@/config/business'

export const metadata = createPageMetadata(
  'About Brightshore',
  'Learn about Brightshore, a Brighton & Hove cleaning service for homes, rentals, short-let properties and small businesses.',
)

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>
        About {businessProfile.tradingName}
      </h1>
      <div style={{ backgroundColor: 'var(--bg-soft)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          We are building a local Brighton & Hove cleaning service focused on clear quotes, reliable communication and practical cleaning support for homes, rentals, short-let properties and small businesses.
        </p>
      </div>
      <Link href="/contact" style={{ backgroundColor: 'var(--brand-primary)', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}>
        Request a quote
      </Link>
    </div>
  )
}
