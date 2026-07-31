import { businessProfile } from '@/config/business'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata(
  'Booking Terms',
  'Booking terms for BrightShore Cleaning, including quote confirmation, scope, access and payment arrangements.',
)

export default function BookingTermsPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Booking Terms</h1>
      <div style={{ backgroundColor: 'var(--bg-soft)', borderRadius: '8px', padding: '1.5rem' }}>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          Quotes are confirmed before any booking is accepted. Final price depends on property size, condition, access, parking and requested cleaning scope. Payment terms, cancellation rules and access details must be agreed before the job starts.
        </p>
      </div>
    </div>
  )
}
