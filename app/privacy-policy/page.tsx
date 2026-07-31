import { businessProfile } from '@/config/business'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata(
  'Privacy Policy',
  'Read the BrightShore Cleaning privacy policy for quote requests, bookings and customer information.',
)

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Privacy Policy</h1>
      <div style={{ backgroundColor: 'var(--bg-soft)', borderRadius: '8px', padding: '1.5rem' }}>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          We collect contact and property details only to respond to quote requests, manage bookings and provide cleaning services. Customer details must not be sold or used for unrelated marketing. Before launch, the final legal/privacy wording and ICO registration position must be confirmed.
        </p>
      </div>
    </div>
  )
}
