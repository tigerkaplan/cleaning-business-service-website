import { QuoteForm } from '@/components/QuoteForm'
import { businessProfile } from '@/config/business'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata(
  'Request a Cleaning Quote',
  'Request a cleaning quote in Brighton & Hove. Share your property details, preferred date and photos so BrightShore Cleaning can review your enquiry.',
)

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>Request a cleaning quote</h1>
        <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6 }}>
          Tell us about your property and what you need cleaned. Share photos if possible — they help us estimate more accurately.
        </p>
      </div>
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem' }}>
        <QuoteForm />
      </div>
      <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
          We aim to respond within a few hours during business hours. Final price depends on property size, condition and access. Availability depends on location and date.
        </p>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '0.5rem' }}>
          Prefer to message directly? <strong>{businessProfile.phone}</strong> &middot; <strong>{businessProfile.email}</strong>
        </p>
      </div>
    </div>
  )
}
