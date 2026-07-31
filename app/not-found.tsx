import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: 'var(--brand-primary)', marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '2rem' }}>
        The page you are looking for does not exist. You can return to the homepage or request a cleaning quote.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--brand-primary)', padding: '12px 22px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
        <Link href="/contact" style={{ backgroundColor: 'var(--brand-primary)', color: '#fff', padding: '12px 22px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Request a quote</Link>
      </div>
    </div>
  )
}
