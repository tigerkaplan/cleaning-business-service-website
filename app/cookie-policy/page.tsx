import { createPageMetadata } from '@/lib/seo'
import { businessProfile } from '@/config/business'

export const metadata = createPageMetadata(
  'Cookie Policy',
  'Read the Brightshore cookie policy and how essential cookies support the Website.',
)

export default function CookiePolicyPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Cookie Policy</h1>
      <div style={{ backgroundColor: 'var(--bg-soft)', borderRadius: '8px', padding: '1.5rem' }}>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '1rem' }}>
          {businessProfile.tradingName} uses cookies only where needed to keep the website working properly.
        </p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '1rem' }}>
          At this stage, this website does not use analytics or marketing cookies by default. Essential cookies may be used for website security, quote form protection, basic functionality and spam prevention.
        </p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '1rem' }}>
          Analytics or marketing cookies will only be added later if the business decides to use tools such as analytics, advertising pixels or tracking scripts. If those tools are added, the website will ask for cookie consent before those cookies are set.
        </p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          You can control or delete cookies through your browser settings. For questions about this Cookie Policy, contact{' '}
          <a href={businessProfile.emailHref} style={{ color: 'var(--brand-primary)' }}>{businessProfile.email}</a>.
        </p>
      </div>
    </div>
  )
}
