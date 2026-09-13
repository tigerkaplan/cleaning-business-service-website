import { createPageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { businessProfile } from '@/config/business'

export const metadata = createPageMetadata(
  'Customer Reviews',
  'Customer reviews for Brightshore. Reviews will be shown only when genuine customer feedback is available.',
)

export default function ReviewsPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Reviews</h1>
      <div style={{ backgroundColor: 'var(--bg-soft)', borderRadius: '8px', padding: '2rem' }}>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          Customer reviews are pending. We do not display placeholder ratings or review counts — real reviews will
          appear here once collected.
        </p>
      </div>
      <Link
        href="/contact"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          backgroundColor: 'var(--brand-primary)',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '16px',
          textDecoration: 'none',
        }}
      >
        Request a Quote
      </Link>
    </div>
  )
}
