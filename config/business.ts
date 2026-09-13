// Owner-confirmed brand; historical environment names cannot override it.
const brand = 'Brightshore'
const unresolved = (value: string) => !value || /\[|\]|TBC|TBD|example\.|localhost|0{6}|447700000000/i.test(value)
function publicSiteUrl(value: string) {
  if (unresolved(value)) return undefined
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`)
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.') || /^\d[\d.]+$/.test(url.hostname)) return undefined
    return url.origin
  } catch { return undefined }
}
const siteUrl = publicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || '')
const rawPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || ''
const rawEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || ''
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || ''
const phone = !unresolved(rawPhone) && /^\+?[\d\s()-]{10,20}$/.test(rawPhone) ? rawPhone : '[PHONE]'
const email = !unresolved(rawEmail) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : '[EMAIL]'
const whatsappNumber = !unresolved(rawWhatsApp) && /^\d{10,15}$/.test(rawWhatsApp) ? rawWhatsApp : ''
export const businessProfile = {
  businessName: brand,
  tradingName: brand,
  shortName: brand,
  seoName: `${brand} Cleaning`,
  domain: siteUrl ? new URL(siteUrl).hostname : '[BRAND_DOMAIN]',
  siteUrl, email, phone, whatsappNumber,
  phoneHref: phone === '[PHONE]' ? undefined : `tel:${phone.replace(/[^+\d]/g, '')}`,
  emailHref: email === '[EMAIL]' ? undefined : `mailto:${email}`,
  whatsappHref: whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined,
  location: 'Brighton & Hove',
  serviceArea: 'Brighton & Hove',
  country: 'UK',
  // Domain configuration alone is not proof of end-to-end intake acceptance.
  isIndexable: Boolean(siteUrl && process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true'),
}
export const serviceAreaPostcodes = ['BN1', 'BN2', 'BN3', 'BN41']
