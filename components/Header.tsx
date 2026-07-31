'use client'

import Link from 'next/link'
import { useState } from 'react'
import { businessProfile } from '@/config/business'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Booking Terms', href: '/booking-terms' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop contact strip — location is kept quieter in footer/service pages, not shouted above the fold */}
      <div className="top-contact-strip">
        <div className="top-contact-strip__inner">
          <span>Mon – Sat: 8am – 6pm</span>
          <a href={`tel:${businessProfile.phone.replace(/\s+/g, '')}`}>{businessProfile.phone}</a>
          <a href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a>
        </div>
      </div>

      <header className="site-header">
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            gap: '0.5rem',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                <path d="M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                <path d="M12 3l1.5 3L17 7" />
              </svg>
            </span>
            <span style={{ fontWeight: 700, fontSize: '17px', color: 'var(--brand-primary)' }}>{businessProfile.shortName}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '-4px' }}>Cleaning</span>
          </Link>

          {/* Desktop nav */}
          <nav className="site-header__nav" style={{ gap: '1.5rem', alignItems: 'center' }} aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontSize: '14px', color: 'var(--text)', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="site-header__cta"
            style={{
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Request a Quote
          </Link>

          {/* Mobile: call + whatsapp icons + menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <a
              href={`tel:${businessProfile.phone.replace(/\s+/g, '')}`}
              aria-label="Call Now"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}
              className="site-header__menu-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${businessProfile.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wa-green)' }}
              className="site-header__menu-button"
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.734 5.47 2.018 7.77L0 32l8.43-2.21A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.12a13.06 13.06 0 01-6.657-1.82l-.476-.283-4.944 1.296 1.32-4.824-.31-.494A13.072 13.072 0 012.88 16C2.88 9.304 8.304 3.88 16 3.88S29.12 9.304 29.12 16 23.696 29.12 16 29.12z" />
              </svg>
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="site-header__menu-button"
              style={{ color: 'var(--text)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {open && (
          <div className="site-header__drawer">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: '15px', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid #f3f4f6' }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              style={{ display: 'block', marginTop: '1rem', textAlign: 'center', backgroundColor: 'var(--brand-primary)', color: '#fff', padding: '12px', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}
            >
              Request a Quote
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
