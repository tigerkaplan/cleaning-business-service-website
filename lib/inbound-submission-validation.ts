import type { InboundSubmissionInsert, QuoteRequestInput, ServiceType, Urgency } from '@/types/inbound-submission'

export const SERVICE_TYPES: ServiceType[] = [
  'End of Tenancy',
  'Airbnb / Short-Let',
  'Office Cleaning',
  'Domestic',
  'Deep Clean',
  'Gym & Studio',
  'Other',
]

export const URGENCY_VALUES: Urgency[] = ['High', 'Medium', 'Low']

export const QUOTE_REQUEST_LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  postcode: 12,
  property_type: 80,
  preferred_date: 30,
  parking_access: 300,
  photo_url: 500,
  message: 1500,
} as const

export type QuoteRequestField = keyof QuoteRequestInput

export type ValidationResult =
  | { ok: true; payload: InboundSubmissionInsert }
  | { ok: false; errors: Partial<Record<QuoteRequestField, string>> }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+\d][\d\s().-]*$/
const UK_POSTCODE_PATTERN = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function cleanOptional(value: unknown): string | null {
  const cleaned = asString(value)
  return cleaned.length > 0 ? cleaned : null
}

function limit(value: string | null, max: number): string | null {
  if (!value) return null
  return value.slice(0, max)
}

function exceeds(value: unknown, max: number) {
  return asString(value).length > max
}

function parseCount(value: unknown, max: number): number | null {
  if (value === null || value === undefined || value === '') return null

  if (typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= max) {
    return value
  }

  const raw = asString(value)

  if (!/^\d+$/.test(raw)) {
    return null
  }

  const parsed = Number.parseInt(raw, 10)

  return Number.isInteger(parsed) && parsed >= 0 && parsed <= max ? parsed : null
}

export function validateQuoteRequest(input: unknown): ValidationResult {
  const data = (input || {}) as Partial<QuoteRequestInput> & Record<string, unknown>
  const errors: Partial<Record<QuoteRequestField, string>> = {}

  // Honeypot spam field. Real users should never fill this.
  if (asString(data.website)) {
    errors.website = 'Spam protection failed.'
  }

  const name = asString(data.name)
  const phone = asString(data.phone)
  const email = asString(data.email).toLowerCase()
  const postcode = asString(data.postcode).toUpperCase()
  const serviceType = data.service_type as ServiceType
  const urgency = (data.urgency || 'Medium') as Urgency

  const bedrooms = parseCount(data.bedrooms, 8)
  const bathrooms = parseCount(data.bathrooms, 8)

  if (!name) {
    errors.name = 'Enter your full name.'
  } else if (name.length > QUOTE_REQUEST_LIMITS.name) {
    errors.name = `Name must be ${QUOTE_REQUEST_LIMITS.name} characters or fewer.`
  }

  if (!phone) {
    errors.phone = 'Enter a phone number.'
  } else if (
    phone.length > QUOTE_REQUEST_LIMITS.phone ||
    !PHONE_PATTERN.test(phone) ||
    (phone.match(/\d/g) || []).length < 7
  ) {
    errors.phone = 'Enter a valid phone number using at least 7 digits.'
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  } else if (email.length > QUOTE_REQUEST_LIMITS.email) {
    errors.email = `Email address must be ${QUOTE_REQUEST_LIMITS.email} characters or fewer.`
  }

  if (!SERVICE_TYPES.includes(serviceType)) {
    errors.service_type = 'Select a service.'
  }

  if (!postcode) {
    errors.postcode = 'Enter the property postcode.'
  } else if (postcode.length > QUOTE_REQUEST_LIMITS.postcode || !UK_POSTCODE_PATTERN.test(postcode)) {
    errors.postcode = 'Enter a valid UK postcode.'
  }

  if (!URGENCY_VALUES.includes(urgency)) {
    errors.urgency = 'Select a valid urgency.'
  }

  if (data.consent !== true) {
    errors.consent = 'Confirm that we may use these details to respond to your request.'
  }

  if (data.bedrooms !== null && data.bedrooms !== undefined && data.bedrooms !== '' && bedrooms === null) {
    errors.bedrooms = 'Bedrooms must be a whole number.'
  }

  if (data.bathrooms !== null && data.bathrooms !== undefined && data.bathrooms !== '' && bathrooms === null) {
    errors.bathrooms = 'Bathrooms must be a whole number.'
  }

  if (exceeds(data.property_type, QUOTE_REQUEST_LIMITS.property_type)) {
    errors.property_type = `Property type must be ${QUOTE_REQUEST_LIMITS.property_type} characters or fewer.`
  }

  if (exceeds(data.preferred_date, QUOTE_REQUEST_LIMITS.preferred_date)) {
    errors.preferred_date = `Preferred date must be ${QUOTE_REQUEST_LIMITS.preferred_date} characters or fewer.`
  }

  if (exceeds(data.parking_access ?? data.access_notes, QUOTE_REQUEST_LIMITS.parking_access)) {
    errors.parking_access = `Access notes must be ${QUOTE_REQUEST_LIMITS.parking_access} characters or fewer.`
  }

  if (exceeds(data.photo_url ?? data.photo_link, QUOTE_REQUEST_LIMITS.photo_url)) {
    errors.photo_url = `Photo link must be ${QUOTE_REQUEST_LIMITS.photo_url} characters or fewer.`
  }

  if (exceeds(data.message, QUOTE_REQUEST_LIMITS.message)) {
    errors.message = `Additional details must be ${QUOTE_REQUEST_LIMITS.message} characters or fewer.`
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  const photoUrl = cleanOptional(data.photo_url ?? data.photo_link)

  return {
    ok: true,
    payload: {
      source: 'Website',
      channel: 'Form',
      urgency,

      name,
      phone,
      email,

      service_type: serviceType,
      postcode,
      property_type: limit(cleanOptional(data.property_type), QUOTE_REQUEST_LIMITS.property_type),
      bedrooms,
      bathrooms,
      preferred_date: limit(cleanOptional(data.preferred_date), QUOTE_REQUEST_LIMITS.preferred_date),

      access_notes: limit(cleanOptional(data.parking_access ?? data.access_notes), QUOTE_REQUEST_LIMITS.parking_access),
      customer_photos: photoUrl ? 'Received' : 'Requested',

      message: limit(cleanOptional(data.message), QUOTE_REQUEST_LIMITS.message),
      consent: true,

      raw_message: {
        ...data,
        photo_url: photoUrl,
      },
    },
  }
}
