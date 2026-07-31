import Link from 'next/link'
import type { ServicePageContent } from '@/content/services'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#374151', lineHeight: 1.55 }}>
          <span style={{ color: 'var(--brand-primary)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ServicePage({ service }: { service: ServicePageContent }) {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
        {service.h1}
      </h1>

      <p style={{ fontSize: '17px', color: '#374151', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        {service.opening}
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>What&apos;s included</h2>
        <CheckList items={service.included} />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Who it&apos;s for</h2>
        <CheckList items={service.whoFor} />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>Next step</h2>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
          For pricing, availability and booking details, use the quote form, call or WhatsApp. Keep service pages short and move detailed questions to the main homepage FAQ.
        </p>
      </section>

      <div style={{ backgroundColor: 'var(--brand-primary)', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Ready to get a quote?</h2>
        <p style={{ color: '#DDD6FE', fontSize: '15px', marginBottom: '1.5rem' }}>Tell us about the property and we will get back to you promptly.</p>
        <Link href="/contact" style={{ backgroundColor: '#fff', color: 'var(--brand-primary)', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
          Request a quote
        </Link>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>Service area</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
          Serving Brighton, Hove and nearby areas including BN1, BN2, BN3 and BN41 postcodes. Availability depends on location and date.
        </p>
      </section>

      <section>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Internal links</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {service.internalLinks.map((item) => (
            <Link key={item.href} href={item.href} style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--brand-primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
