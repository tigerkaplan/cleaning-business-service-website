const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || ''
const rawDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || ''
const rawBusinessName = process.env.NEXT_PUBLIC_BUSINESS_NAME?.trim() || 'BrightShore'
const rawTradingName = process.env.NEXT_PUBLIC_TRADING_NAME?.trim() || `${rawBusinessName} Cleaning`

function normaliseDomain(domain: string) {
  return domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function normaliseSiteUrl(value: string, domain: string) {
  if (value) return value.replace(/\/$/, '')
  const cleanedDomain = normaliseDomain(domain)
  return cleanedDomain ? `https://${cleanedDomain}` : 'http://localhost:3000'
}

const siteUrl = normaliseSiteUrl(rawSiteUrl, rawDomain)
const domain = normaliseDomain(rawDomain || siteUrl)

export const businessProfile = {
  businessName: rawBusinessName,
  tradingName: rawTradingName,
  shortName: process.env.NEXT_PUBLIC_SHORT_NAME?.trim() || rawBusinessName,
  domain,
  siteUrl,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || 'hello@example.com',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || 'Phone TBC',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || '447700000000',
  location: 'Brighton & Hove',
  serviceArea: 'Brighton, Hove and nearby areas',
  country: 'UK',
  isProductionConfigured: Boolean(
    process.env.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_BUSINESS_NAME &&
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL &&
    process.env.NEXT_PUBLIC_BUSINESS_PHONE
  ),
}

export const serviceAreaPostcodes = ['BN1', 'BN2', 'BN3', 'BN41']
