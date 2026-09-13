import { businessProfile } from '@/config/business'

export function StickyMobileBar() {
  const telHref = businessProfile.phoneHref
  const waHref = businessProfile.whatsappHref

  return (
    <nav className="sticky-mobile-bar" style={{ gridTemplateColumns: `repeat(${1 + Number(Boolean(telHref)) + Number(Boolean(waHref))}, minmax(0, 1fr))` }} aria-label="Quick contact actions">
      {telHref && <a href={telHref}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call Now
      </a>}
      <a href="/contact" className="sticky-mobile-bar__primary">
        Request a Quote
      </a>
      {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.734 5.47 2.018 7.77L0 32l8.43-2.21A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.12a13.06 13.06 0 01-6.657-1.82l-.476-.283-4.944 1.296 1.32-4.824-.31-.494A13.072 13.072 0 012.88 16C2.88 9.304 8.304 3.88 16 3.88S29.12 9.304 29.12 16 23.696 29.12 16 29.12z" />
        </svg>
        WhatsApp
      </a>}
    </nav>
  )
}
