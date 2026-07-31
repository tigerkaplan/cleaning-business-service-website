// Locked values from cleaning business project rules — do not change.
export type Urgency = 'High' | 'Medium' | 'Low'
export type CustomerPhotos = 'Requested' | 'Received' | 'Not needed'

export type LeadSource =
  | 'Website'
  | 'Email'
  | 'WhatsApp'
  | 'Phone'
  | 'Manual'
  | 'Referral'
  | 'Google Business Profile'
  | 'Facebook'
  | 'Nextdoor'
  | 'Gumtree'
  | 'Local outreach'

export type LeadChannel =
  | 'Form'
  | 'Email'
  | 'WhatsApp'
  | 'Phone'
  | 'SMS'
  | 'In person'
  | 'DM'

export type ServiceType =
  | 'End of Tenancy'
  | 'Airbnb / Short-Let'
  | 'Office Cleaning'
  | 'Domestic'
  | 'Deep Clean'
  | 'Gym & Studio'
  | 'Other'

export interface QuoteRequestInput {
  name: string
  phone: string
  email: string
  service_type: ServiceType
  postcode: string
  property_type?: string | null
  bedrooms?: number | string | null
  bathrooms?: number | string | null
  preferred_date?: string | null
  urgency: Urgency

  // Current / legacy form fields accepted by server
  access_notes?: string | null
  parking_access?: string | null
  photo_url?: string | null
  photo_link?: string | null

  message?: string | null
  consent: boolean

  // Honeypot. Must be empty.
  website?: string | null
}

export interface InboundSubmissionInsert {
  source: LeadSource
  channel: LeadChannel
  urgency: Urgency

  name: string
  phone: string
  email: string

  service_type: ServiceType
  postcode: string
  property_type?: string | null
  bedrooms?: number | null
  bathrooms?: number | null
  preferred_date?: string | null

  access_notes?: string | null
  customer_photos: CustomerPhotos

  message?: string | null
  consent: boolean

  raw_message?: Record<string, unknown>
}