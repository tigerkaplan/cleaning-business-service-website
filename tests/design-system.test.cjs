const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = process.cwd()
const globals = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8')
const header = fs.readFileSync(path.join(root, 'components/Header.tsx'), 'utf8')
const stickyBar = fs.readFileSync(path.join(root, 'components/StickyMobileBar.tsx'), 'utf8')
const home = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8')

test('design system uses Brightshore teal (#0F766E) as the primary colour', () => {
  assert.match(globals, /--brand-primary:\s*#0F766E;/)
  assert.match(globals, /var\(--brand-primary\)/)
})

test('design system does not use the superseded #3A1078 teal/dark-header tokens', () => {
  assert.doesNotMatch(globals, /#3A1078/)
  assert.doesNotMatch(globals, /#0F6E56/)
})

test('header is mobile-first: nav and desktop CTA hidden by default, shown at 900px', () => {
  assert.match(globals, /\.site-header__nav,\s*\n?\s*\.site-header__cta\s*{\s*\n?\s*display:\s*none;/)
  assert.match(globals, /@media \(min-width: 900px\)/)
  assert.match(globals, /\.site-header__menu-button/)
  assert.match(globals, /\.site-header__drawer/)
})

test('navbar is sticky so phone, WhatsApp and quote access stay reachable', () => {
  assert.match(header, /className="site-header"/)
  assert.match(globals, /\.site-header\s*\{[\s\S]*position:\s*sticky;/)
  assert.match(globals, /\.site-header\s*\{[\s\S]*top:\s*0;/)
  assert.match(globals, /\.site-header\s*\{[\s\S]*z-index:\s*9990;/)
})

test('header includes the required Brightshore nav and identifies the service area', () => {
  assert.match(header, /Home/)
  assert.match(header, /Services/)
  assert.match(header, /About Us/)
  assert.match(header, /Reviews/)
  assert.match(header, /Booking Terms/)
  assert.match(header, /Contact/)
  assert.match(header, /top-contact-strip/)
  assert.match(header, /Brighton &amp; Hove/)
  assert.doesNotMatch(header, /Serving Brighton/)
  assert.doesNotMatch(header, /service-area-strip/)
})

test('sticky mobile CTA bar follows the locked Call Now | Request a Quote | WhatsApp order', () => {
  assert.match(stickyBar, /Call Now/)
  assert.match(stickyBar, /Request a Quote/)
  assert.match(stickyBar, /WhatsApp/)
  assert.match(stickyBar, /sticky-mobile-bar__primary/)
})

test('sticky bar is mobile-only and floating WhatsApp button is hidden on mobile', () => {
  assert.match(globals, /\.sticky-mobile-bar\s*{/)
  assert.match(globals, /\.float-whatsapp\s*{\s*\n?\s*display:\s*none;/)
})

test('homepage hero leads with Request a Quote, Call Now and WhatsApp in that order', () => {
  const heroSection = home.slice(home.indexOf('{/* Hero */}'), home.indexOf('{/* Trust signal card'))
  const quoteIdx = heroSection.indexOf('Request a Quote')
  const callIdx = heroSection.indexOf('Call {businessProfile.phone}')
  const waIdx = heroSection.indexOf('WhatsApp')
  assert.ok(quoteIdx > -1 && callIdx > quoteIdx && waIdx > callIdx, 'expected Request a Quote, then Call phone number, then WhatsApp')
})


test('homepage uses the mobile-first service-led H1 and a real landing hero image asset', () => {
  assert.match(home, /Professional cleaning/)
  assert.match(home, /in Brighton &amp; Hove/)
  assert.match(home, /brightshore-cleaning-homepage-hero\.png/)
  assert.doesNotMatch(home, /Serving Brighton &amp; Hove and nearby areas/)
})


test('homepage service cards use unique React keys even when multiple cards link to the same route', () => {
  assert.match(home, /<Link key=\{s\.title\} href=\{s\.href\} className="service-card">/)
  assert.doesNotMatch(home, /<Link key=\{s\.href\} href=\{s\.href\} className="service-card">/)
})



test('homepage service cards use polished mobile-first card structure and inline SVG icons', () => {
  assert.match(home, /function ServiceIcon\(\{ name \}: \{ name: ServiceIconName \}\)/)
  assert.match(home, /<div className="service-card__content">/)
  assert.match(home, /className="service-card__cta"/)
  assert.match(globals, /\.service-card\s*\{[\s\S]*grid-template-columns:\s*60px minmax\(0, 1fr\);/)
  assert.match(globals, /\.service-card\s*\{[\s\S]*border-radius:\s*1\.4rem;/)
  assert.match(globals, /\.service-card__icon\s*\{[\s\S]*linear-gradient\(135deg, #E6F5F2 0%, #FFFFFF 100%\)/)
  assert.match(globals, /\.service-card__cta\s*\{[\s\S]*border-radius:\s*999px;/)
})

test('homepage how-it-works section uses the light landing-page background and teal three-card pattern', () => {
  assert.match(home, /how-it-works__kicker">Booking/)
  assert.match(home, /How It Works/)
  assert.match(home, /Send your request/)
  assert.match(home, /Get a clear quote/)
  assert.match(home, /Confirm your booking/)
  assert.match(globals, /\.how-it-works\s*\{[\s\S]*linear-gradient\(120deg, #FFFFFF 0%, #F5FAF9 55%, #E6F5F2 100%\)/)
  assert.match(globals, /\.step-item\s*\{[\s\S]*background:\s*#fff;/)
  assert.match(globals, /\.step-item__number\s*\{[\s\S]*background:\s*#E6F5F2;/)
  assert.match(globals, /\.steps-list\s*\{[\s\S]*display:\s*grid;/)
  assert.doesNotMatch(globals, /#2DD4BF/)
  assert.doesNotMatch(globals, /\.step-item\s*\{[\s\S]*background:\s*rgba\(255, 255, 255, 0\.1\);/)
})

test('homepage includes a mobile-first FAQ section before the final quote CTA', () => {
  assert.match(home, /const homeFaqs = \[/)
  assert.match(home, /Questions before you request a quote/)
  assert.match(home, /How do I get a cleaning quote\?/)
  assert.match(home, /Can I call or WhatsApp instead of filling in the form\?/)
  assert.match(home, /Do you need photos before quoting\?/)
  assert.match(home, /What happens after I send a request\?/)
  const faqIdx = home.indexOf('{/* FAQ */}')
  const bottomCtaIdx = home.indexOf('{/* Bottom CTA */}')
  assert.ok(faqIdx > -1 && bottomCtaIdx > faqIdx, 'expected homepage FAQ before the final quote panel')
  assert.match(globals, /\.faq-section\s*\{/)
  assert.match(globals, /\.faq-item summary/)
})


test('service pages present existing pricing, booking and FAQ details with a quote action', () => {
  const servicePage = fs.readFileSync(path.join(root, 'components/ServicePage.tsx'), 'utf8')
  for (const field of ['service.pricingNote', 'service.howToBook.map', 'service.faqs.map']) assert.ok(servicePage.includes(field))
  assert.match(servicePage, /Request a Quote/)
  assert.doesNotMatch(servicePage, /Keep service pages short|Internal links/)
})
