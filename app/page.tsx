import { createPageMetadata } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'
import { businessProfile } from '@/config/business'

export const metadata = createPageMetadata(
  'Professional Cleaning in Brighton & Hove',
  'Brightshore provides cleaning for offices, gyms, studios, landlords, short-let hosts and local organisations in Brighton & Hove. Request a quote with your property details.',
)

type ServiceIconName = 'home' | 'bed' | 'building' | 'fitness' | 'clinic' | 'spray'

const services: Array<{ title: string; href: string; desc: string; icon: ServiceIconName; image: string; alt: string }> = [
  {
    title: 'End-of-Tenancy Cleaning',
    href: '/end-of-tenancy-cleaning',
    desc: 'Move-out cleans that help secure your deposit.',
    icon: 'home',
    image: '/images/end-of-tenancy-cleaning.png',
    alt: 'End-of-tenancy cleaning in an empty home',
  },
  {
    title: 'Airbnb & Short-Let Cleaning',
    href: '/airbnb-cleaning',
    desc: 'Fast, reliable turnarounds for happy guests.',
    icon: 'bed',
    image: '/images/airbnb-short-let-cleaning.png',
    alt: 'Cleaner preparing a short-let bedroom',
  },
  {
    title: 'Office & Commercial Cleaning',
    href: '/office-cleaning',
    desc: 'Clean, professional spaces for your team and clients.',
    icon: 'building',
    image: '/images/office-commercial-cleaning.png',
    alt: 'Cleaner mopping an office reception',
  },
  {
    title: 'Gyms & Studios',
    href: '/gym-studio-cleaning',
    desc: 'Hygienic cleaning for gyms, fitness and wellness spaces.',
    icon: 'fitness',
    image: '/images/gym-studio-cleaning.png',
    alt: 'Cleaner wiping a gym training bench',
  },
  {
    title: 'Clinics & Local Organisations',
    href: '/office-cleaning',
    desc: 'Clean and safe environments you can trust.',
    icon: 'clinic',
    image: '/images/clinic-local-cleaning.png',
    alt: 'Cleaner wiping a clinic reception desk',
  },
  {
    title: 'Domestic & Deep Cleaning',
    href: '/deep-cleaning',
    desc: 'Regular or deep cleans for homes that deserve it.',
    icon: 'spray',
    image: '/images/domestic-deep-cleaning.png',
    alt: 'Cleaners vacuuming and cleaning a home',
  },
]

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.8 12 3l9 7.8" />
          <path d="M5.2 9.8V21h13.6V9.8" />
          <path d="M9.3 21v-6h5.4v6" />
        </svg>
      )
    case 'bed':
      return (
        <svg {...common}>
          <path d="M4 11V6.8A1.8 1.8 0 0 1 5.8 5h12.4A1.8 1.8 0 0 1 20 6.8V11" />
          <path d="M4 11h16a2 2 0 0 1 2 2v5H2v-5a2 2 0 0 1 2-2Z" />
          <path d="M7 11V9h4v2" />
          <path d="M13 11V9h4v2" />
        </svg>
      )
    case 'building':
      return (
        <svg {...common}>
          <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21" />
          <path d="M15 9h3.5A1.5 1.5 0 0 1 20 10.5V21" />
          <path d="M7 8h1.5M10.5 8H12M7 12h1.5M10.5 12H12M7 16h1.5M10.5 16H12" />
          <path d="M3 21h18" />
        </svg>
      )
    case 'fitness':
      return (
        <svg {...common}>
          <path d="M6 7v10M18 7v10M3.5 9.5v5M20.5 9.5v5M8 12h8" />
          <path d="M4 12h16" />
        </svg>
      )
    case 'clinic':
      return (
        <svg {...common}>
          <path d="M8 4v6a4 4 0 0 0 8 0V4" />
          <path d="M6 4h4M14 4h4" />
          <path d="M12 14v1.5a4.5 4.5 0 0 0 9 0V14" />
          <circle cx="21" cy="12.5" r="1.5" />
        </svg>
      )
    case 'spray':
      return (
        <svg {...common}>
          <path d="M9 3h6v3H9z" />
          <path d="M12 6v3" />
          <path d="M9 9h6l2 4v8H7v-8z" />
          <path d="M10 13h4" />
          <path d="M18 6h3M19 9l2 1M19 3l2-1" />
        </svg>
      )
  }
}

const trustPoints = [
  { title: 'Agreed cleaning scope', desc: 'Know what your quote includes.' },
  { title: 'Reliable & local team', desc: 'Brighton based, customer focused.' },
  { title: 'High standards', desc: 'We care about the details.' },
  { title: 'Flexible booking', desc: 'We work around your schedule.' },
]

const steps = [
  {
    title: 'Send your request',
    desc: 'Tell us what type of cleaning you need, your location and preferred date.',
  },
  {
    title: 'Get a clear quote',
    desc: 'We confirm the details, availability and estimated price before booking.',
  },
  {
    title: 'Confirm your booking',
    desc: 'Once agreed, your cleaning is scheduled.',
  },
]

const areas = ['Brighton', 'Hove', 'Kemptown', 'Preston Park', 'Portslade', 'Fiveways']

const homeFaqs = [
  {
    q: 'How do I get a cleaning quote?',
    a: 'Use the quote form to send the service type, postcode, property size, preferred date and optional photos.',
  },
  {
    q: 'Can I call or WhatsApp instead of filling in the form?',
    a: 'Use the contact details shown when available, or send the quote form. For accurate pricing, we may still ask for photos and key property details.',
  },
  {
    q: 'Do you need photos before quoting?',
    a: 'Photos are not always required, but they make the quote more accurate. They are useful for end-of-tenancy, deep cleaning, move-in / move-out and larger commercial jobs.',
  },
  {
    q: 'Do you clean offices, gyms, studios and local organisations?',
    a: 'Yes. We clean local homes, offices, gyms, studios, landlords, short-let hosts, non-clinical clinic areas and small organisations.',
  },
  {
    q: 'Can you clean outside normal opening hours?',
    a: 'Yes, where availability and access allow. Offices, gyms and studios can request early morning, evening or weekend cleaning when sending an enquiry.',
  },
  {
    q: 'Do you guarantee deposit return for end-of-tenancy cleaning?',
    a: 'No cleaning company can control a landlord or agent deposit decision. We agree the cleaning scope before booking and recommend sharing checklist requirements and photos before quoting.',
  },
  {
    q: 'Is the price fixed before booking?',
    a: 'The quote is confirmed before the booking is accepted. Final price depends on property size, condition, access, parking and the agreed cleaning scope.',
  },
  {
    q: 'What happens after I send a request?',
    a: 'We check the details, ask any missing questions, confirm availability and send the next step. You can review the quote before agreeing a booking.',
  },
]

export default function HomePage() {
  const telHref = businessProfile.phoneHref
  const waHref = businessProfile.whatsappHref

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">Brightshore &middot; Brighton &amp; Hove</p>
            <h1 className="home-hero__title">
              Professional cleaning <span>in Brighton &amp; Hove</span>
            </h1>
            <p className="home-hero__subtitle">
              For homes, workplaces and short-let properties.
            </p>

            <div className="home-hero__actions" aria-label="Main contact actions">
              <Link href="/contact" className="home-hero__button home-hero__button--primary">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              {telHref && <a href={telHref} className="home-hero__button home-hero__button--secondary">
                Call {businessProfile.phone}
              </a>}
              {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer" className="home-hero__button home-hero__button--secondary home-hero__button--whatsapp">
                WhatsApp Us
              </a>}
            </div>
          </div>

          <div className="home-hero__image-wrap" aria-label="Clean office hero image">
            <Image
              width={1672} height={940}
              priority
              sizes="(min-width: 980px) 620px, 100vw"
              className="home-hero__image"
              src="/images/brightshore-cleaning-homepage-hero.png"
              alt="Professional cleaners preparing a bright workspace in Brighton and Hove"
            />
            {telHref && <div className="home-hero__call-card" aria-label="Call for a cleaning quote">
              <span aria-hidden="true">☎</span>
              <div>
                <strong>Call for a quote</strong>
                <a href={telHref}>{businessProfile.phone}</a>
              </div>
            </div>}
          </div>
        </div>
      </section>

      {/* Trust signal card — directly under hero per mobile-first order */}
      <section className="trust-band" aria-label="Trust points">
        <div className="trust-band__inner">
          {trustPoints.map((t) => (
            <div key={t.title} className="trust-band__item">
              <span className="trust-band__icon" aria-hidden="true">✓</span>
              <div>
                <strong>{t.title}</strong>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services-overview">
        <div className="services-overview__inner">
          <p className="section-kicker">Our services</p>
          <h2>Cleaning services tailored to your space</h2>
          <div className="services-grid">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="service-card">
                <Image src={s.image} alt={s.alt} width={600} height={400} sizes="(min-width: 980px) 190px, (min-width: 640px) 45vw, 100vw" className="service-card__image" />
                <div className="service-card__icon">
                  <ServiceIcon name={s.icon} />
                </div>
                <div className="service-card__content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <span className="service-card__cta">View service <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" aria-labelledby="how-it-works-title">
        <div className="how-it-works__inner">
          <p className="how-it-works__kicker">Booking</p>
          <h2 id="how-it-works-title">How It Works</h2>
          <div className="steps-list">
            {steps.map((step, i) => (
              <article key={step.title} className="step-item">
                <div className="step-item__number" aria-hidden="true">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="areas-section">
        <div className="areas-section__inner">
          <h2>Areas covered</h2>
          <p>We operate primarily across Brighton &amp; Hove, including:</p>
          <div className="areas-list">
            {areas.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
          <p className="areas-section__note">Availability depends on location and date. Contact us to confirm.</p>
        </div>
      </section>


      {/* FAQ */}
      <section className="faq-section" aria-labelledby="homepage-faq-title">
        <div className="faq-section__inner">
          <div className="faq-section__intro">
            <p className="section-kicker">FAQ</p>
            <h2 id="homepage-faq-title">Questions before you request a quote</h2>
            <p>
              These answers remove the main booking friction: price, photos, access, service type and what happens after enquiry.
            </p>
          </div>
          <div className="faq-list">
            {homeFaqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="quote-panel">
        <div className="quote-panel__inner">
          <div>
            <p className="section-kicker">Get a quote</p>
            <h2>Tell us what you need cleaned</h2>
            <p>Send a few details and we will come back with the next step.</p>
            <ul>
              <li>Clear next steps</li>
              <li>No obligation</li>
              <li>Transparent pricing</li>
            </ul>
          </div>
          <div className="quote-panel__card">
            <h3>Request a cleaning quote</h3>
            <p>The more details you share, the more accurate we can be.</p>
            <Link href="/contact" className="home-hero__button home-hero__button--primary">Request a Quote →</Link>
            {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer" className="home-hero__button home-hero__button--secondary home-hero__button--whatsapp">WhatsApp Us</a>}
          </div>
        </div>
      </section>
    </>
  )
}
