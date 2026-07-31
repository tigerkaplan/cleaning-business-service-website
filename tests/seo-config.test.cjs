const assert = require('node:assert/strict')
const { existsSync, readFileSync } = require('node:fs')
const { join } = require('node:path')
const test = require('node:test')

const websiteRoot = process.cwd()

function read(relativePath) {
  return readFileSync(join(websiteRoot, relativePath), 'utf8')
}

const seo = read('lib/seo.ts')
const layout = read('app/layout.tsx')
const sitemap = read('app/sitemap.ts')
const robots = read('app/robots.ts')
const structuredData = read('components/StructuredData.tsx')
const pagePaths = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/airbnb-cleaning/page.tsx',
  'app/deep-cleaning/page.tsx',
  'app/domestic-cleaning/page.tsx',
  'app/end-of-tenancy-cleaning/page.tsx',
  'app/gym-studio-cleaning/page.tsx',
  'app/office-cleaning/page.tsx',
  'app/booking-terms/page.tsx',
  'app/privacy-policy/page.tsx',
  'app/cookie-policy/page.tsx',
  'app/reviews/page.tsx',
]

test('global metadata provides a title template, description, Open Graph, Twitter and crawl defaults', () => {
  assert.match(layout, /title:\s*\{[\s\S]*default:[\s\S]*template:/)
  assert.match(layout, /description: SITE_DESCRIPTION/)
  assert.match(layout, /applicationName: SITE_NAME/)
  assert.match(layout, /openGraph:\s*\{[\s\S]*type: 'website'/)
  assert.match(layout, /twitter:\s*\{[\s\S]*card: 'summary'/)
  assert.match(layout, /robots:\s*\{[\s\S]*index: true,[\s\S]*follow: true/)
})

test('public route pages use shared unique title and description metadata', () => {
  for (const pagePath of pagePaths) {
    assert.match(read(pagePath), /createPageMetadata\(/, `${pagePath} should use page metadata`)
  }

  const services = read('content/services.ts')
  const expectedTitles = [
    'End-of-Tenancy Cleaning in Brighton & Hove',
    'Airbnb Cleaning in Brighton & Hove',
    'Office Cleaning in Brighton & Hove',
    'Domestic Cleaning in Brighton & Hove',
    'Deep Cleaning in Brighton & Hove',
    'Gym & Studio Cleaning in Brighton & Hove',
  ]

  for (const title of expectedTitles) assert.match(services, new RegExp(`title: '${title.replace(/[&]/g, '\\$&')}'`))
})

test('unverified origins do not create canonical, metadata-base or placeholder URL claims', () => {
  const seoSources = [seo, layout, sitemap, robots, structuredData, ...pagePaths.map(read)].join('\n')

  assert.match(seo, /PUBLIC_ORIGIN: URL \| undefined = undefined/)
  assert.doesNotMatch(seoSources, /metadataBase:\s*/)
  assert.doesNotMatch(seoSources, /alternates:\s*\{\s*canonical/)
  assert.doesNotMatch(seoSources, /localhost|example\.(com|test)|netlify/i)
})

test('sitemap and robots routes are safe while the public origin is unresolved', () => {
  const publicSources = [seo, layout, sitemap, robots, structuredData, ...pagePaths.map(read)].join('\n')

  for (const route of ['/', '/about', '/contact', '/end-of-tenancy-cleaning', '/reviews']) {
    assert.match(seo, new RegExp(`'${route.replace('/', '\\/')}'`))
  }

  assert.doesNotMatch(seo, /\/api\//)
  assert.match(sitemap, /PUBLIC_ROUTE_PATHS\.flatMap/)
  assert.match(sitemap, /getPublicUrl\(route\)/)
  assert.doesNotMatch(sitemap, /lastModified|changeFrequency|priority/)
  assert.match(robots, /allow: '\/'/)
  assert.match(robots, /disallow: '\/api\/'/)
  assert.match(robots, /sitemap \? \{ sitemap \} : \{\}/)
  assert.doesNotMatch(robots, /(?:[A-Za-z]:\\|\/Users\/|localhost)/i)
  assert.doesNotMatch(publicSources, /(?:[A-Za-z]:\\|\/Users\/|private[-_]?path|internal[-_]?output)/i)
})

test('structured data is safely serialised and excludes unsupported business claims', () => {
  assert.match(structuredData, /'@type': 'WebSite'/)
  assert.match(structuredData, /JSON\.stringify\(value\)\.replace\(\/</)
  assert.doesNotMatch(structuredData, /LocalBusiness|Organization|aggregateRating|review|PostalAddress|telephone|email|priceRange|areaServed|url:/i)
})

test('social metadata does not claim an unverified social image or account', () => {
  assert.ok(existsSync(join(websiteRoot, 'public', 'images', 'landing-page-office-cleaning-hero.svg')))
  const socialMetadata = [seo, layout, ...pagePaths.map(read)].join('\n')

  assert.doesNotMatch(socialMetadata, /images:\s*\[|twitter:\s*\{[\s\S]*site:|creator:/)
})
