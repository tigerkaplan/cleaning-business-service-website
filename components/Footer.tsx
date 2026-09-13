import Link from 'next/link'
import { businessProfile } from '@/config/business'

const services = [
  { label: 'End-of-Tenancy Cleaning', href: '/end-of-tenancy-cleaning' },
  { label: 'Airbnb & Short-Let Cleaning', href: '/airbnb-cleaning' },
  { label: 'Office Cleaning', href: '/office-cleaning' },
  { label: 'Gym & Studio Cleaning', href: '/gym-studio-cleaning' },
  { label: 'Domestic Cleaning', href: '/domestic-cleaning' },
  { label: 'Deep Cleaning', href: '/deep-cleaning' },
]

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
  { label: 'Booking Terms', href: '/booking-terms' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--brand-primary-dark)', color: '#CCFBF1' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '0.5rem' }}>{businessProfile.tradingName}</p>
            <p style={{ fontSize: '14px', color: '#99F6E4', lineHeight: 1.6 }}>
              Professional cleaning services for offices, homes and local spaces. Reliable, trusted and local.
            </p>
            <p style={{ fontSize: '13px', color: '#CCFBF1', marginTop: '1rem' }}>
              <a href={businessProfile.phoneHref} style={{ color: '#CCFBF1', textDecoration: 'none' }}>
                {businessProfile.phone}
              </a>
            </p>
            <p style={{ fontSize: '13px', color: '#CCFBF1' }}>
              <a href={businessProfile.emailHref} style={{ color: '#CCFBF1', textDecoration: 'none' }}>
                {businessProfile.email}
              </a>
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: '14px', color: '#99F6E4', textDecoration: 'none' }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '14px', color: '#99F6E4', textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #0F766E', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '13px', color: '#99F6E4' }}>
            &copy; {new Date().getFullYear()} {businessProfile.tradingName}. Brighton &amp; Hove.
          </p>
          <p style={{ fontSize: '13px', color: '#99F6E4' }}>
            Serving BN1, BN2, BN3 and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  )
}
