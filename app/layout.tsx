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
    default: `Cleaning services for offices, homes and local spaces | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `Cleaning services for offices, homes and local spaces | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: `Cleaning services for offices, homes and local spaces | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <WebsiteStructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="sticky-bar-spacer" aria-hidden="true" />
        <WhatsAppButton phoneNumber={businessProfile.whatsappNumber} />
        <StickyMobileBar />
      </body>
    </html>
  )
}
