import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { StickyMobileBar } from '@/components/StickyMobileBar'
import { WebsiteStructuredData } from '@/components/StructuredData'
import { businessProfile } from '@/config/business'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: `Professional Cleaning in Brighton & Hove | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `Professional Cleaning in Brighton & Hove | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: `Professional Cleaning in Brighton & Hove | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <WebsiteStructuredData />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <div className="sticky-bar-spacer" aria-hidden="true" />
        {businessProfile.whatsappHref && <WhatsAppButton phoneNumber={businessProfile.whatsappNumber} />}
        <StickyMobileBar />
      </body>
    </html>
  )
}
