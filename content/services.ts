export type ServiceSlug =
  | 'end-of-tenancy-cleaning'
  | 'airbnb-cleaning'
  | 'office-cleaning'
  | 'domestic-cleaning'
  | 'deep-cleaning'
  | 'gym-studio-cleaning'

export interface ServicePageContent {
  slug: ServiceSlug
  title: string
  h1: string
  description: string
  opening: string
  included: string[]
  whoFor: string[]
  pricingNote: string
  howToBook: string[]
  faqs: { q: string; a: string }[]
  internalLinks: { href: string; label: string }[]
}

export const servicePages: Record<ServiceSlug, ServicePageContent> = {
  'end-of-tenancy-cleaning': {
    slug: 'end-of-tenancy-cleaning',
    title: 'End-of-Tenancy Cleaning in Brighton & Hove',
    h1: 'End-of-Tenancy Cleaning in Brighton & Hove',
    description: 'End-of-tenancy cleaning in Brighton & Hove for tenants, landlords and letting agents. Request a quote with property details, access notes and photos where possible.',
    opening: 'Checklist-based end-of-tenancy cleaning for tenants, landlords, letting agents and property managers. Share the property size, tenancy deadline, access details and photos so the quote is realistic before booking.',
    included: [
      'Kitchen surfaces, cupboard fronts, sink, taps and appliance exteriors',
      'Bathroom cleaning, toilets, sinks, showers, baths and mirrors',
      'Bedrooms and living areas dusted, wiped and vacuumed',
      'Skirting boards, switches, handles and high-touch areas',
      'Floors vacuumed and mopped where suitable',
      'Internal windows and glass where accessible',
      'Before/after photos where agreed',
    ],
    whoFor: ['Tenants moving out', 'Landlords preparing a property', 'Letting agents', 'Property managers', 'Students leaving rented accommodation'],
    pricingNote: 'Price depends on property size, condition, furnished/unfurnished status, appliance requirements, parking and access. Photos help us estimate more accurately.',
    howToBook: ['Send the quote form with postcode and preferred date', 'Add bedrooms, bathrooms and access notes', 'Share photos if possible', 'Receive a clear quote before booking', 'Confirm date, access and payment details'],
    faqs: [
      { q: 'Do you guarantee deposit return?', a: 'No cleaning company can guarantee a deposit decision. We clean to an agreed checklist and provide clear communication before booking.' },
      { q: 'Can you work with estate agents?', a: 'Yes. We can discuss access, key collection and completion photos before the job.' },
      { q: 'Do I need to send photos?', a: 'Photos are not always required, but they help avoid underquoting and make the scope clearer.' },
    ],
    internalLinks: [
      { href: '/deep-cleaning', label: 'Deep cleaning' },
      { href: '/domestic-cleaning', label: 'Domestic cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
  'airbnb-cleaning': {
    slug: 'airbnb-cleaning',
    title: 'Airbnb Cleaning in Brighton & Hove',
    h1: 'Airbnb & Short-Let Cleaning in Brighton & Hove',
    description: 'Airbnb and short-let turnover cleaning in Brighton & Hove for hosts, co-hosts and property managers. Request a quote with property details and turnaround times.',
    opening: 'Guest-ready turnover cleaning for Airbnb hosts, co-hosts and short-let property managers. We focus on practical presentation, reliable communication and clear turnaround details.',
    included: [
      'Bedrooms reset and surfaces cleaned',
      'Bathrooms cleaned and checked',
      'Kitchen surfaces, sink, appliance fronts and bins',
      'Floors vacuumed and mopped where suitable',
      'High-touch areas including handles and switches',
      'Basic presentation checks before guest arrival',
      'Completion photos where agreed',
    ],
    whoFor: ['Airbnb hosts', 'Short-let hosts', 'Co-hosts', 'Property managers', 'Holiday-let operators'],
    pricingNote: 'Price depends on property size, guest turnover frequency, linen requirements, access and turnaround window. Laundry and restocking requirements should be agreed separately.',
    howToBook: ['Send property details and postcode', 'Tell us your check-out and check-in times', 'Confirm access instructions', 'Agree cleaning scope and frequency', 'Book one-off or repeat turnover cleaning'],
    faqs: [
      { q: 'Can you clean between guest check-out and check-in?', a: 'Often yes, but it depends on timing, property size and availability. We confirm the realistic turnaround before booking.' },
      { q: 'Do you handle linen?', a: 'Linen requirements need to be agreed separately. The quote should state exactly what is included.' },
      { q: 'Can this be recurring?', a: 'Yes. Repeat turnover cleaning can be discussed once the first clean and access process are clear.' },
    ],
    internalLinks: [
      { href: '/deep-cleaning', label: 'Deep cleaning' },
      { href: '/end-of-tenancy-cleaning', label: 'End-of-tenancy cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
  'office-cleaning': {
    slug: 'office-cleaning',
    title: 'Office Cleaning in Brighton & Hove',
    h1: 'Office Cleaning in Brighton & Hove',
    description: 'Office cleaning in Brighton & Hove for small and medium businesses. Request a quote for weekly workplace cleaning, kitchens, washrooms and high-touch surfaces.',
    opening: 'Reliable workplace cleaning for small and medium offices. We keep the scope practical: desks, kitchens, washrooms, floors and high-touch surfaces, with frequency agreed around your working hours.',
    included: [
      'Desks and shared surfaces wiped where clear',
      'Kitchen and staff areas cleaned',
      'Washrooms cleaned and checked',
      'Bins emptied and liners replaced where supplied',
      'Floors vacuumed and mopped where suitable',
      'Door handles, switches and shared touchpoints',
      'Simple checklist for repeat visits',
    ],
    whoFor: ['Small offices', 'Creative studios', 'Consultancies', 'Local businesses', 'Shared workspaces'],
    pricingNote: 'Price depends on office size, frequency, washrooms, kitchen facilities, access times and supplies. Weekly or fortnightly cleaning can be quoted after scope is clear.',
    howToBook: ['Send office size and postcode', 'Share preferred cleaning days and times', 'Confirm access and alarm/key process', 'Agree cleaning checklist', 'Confirm recurring schedule and invoice details'],
    faqs: [
      { q: 'Can you clean outside office hours?', a: 'Yes, subject to availability and agreed access. Early morning or evening times can be discussed.' },
      { q: 'Do you provide supplies?', a: 'This depends on the quote. Supplies and consumables should be agreed before regular cleaning starts.' },
      { q: 'Can we start with a trial clean?', a: 'Yes. A one-off clean can help confirm scope before a recurring arrangement.' },
    ],
    internalLinks: [
      { href: '/gym-studio-cleaning', label: 'Gym & studio cleaning' },
      { href: '/deep-cleaning', label: 'Deep cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
  'domestic-cleaning': {
    slug: 'domestic-cleaning',
    title: 'Domestic Cleaning in Brighton & Hove',
    h1: 'Domestic Cleaning in Brighton & Hove',
    description: 'Domestic cleaning in Brighton & Hove for homes, flats and busy households. Request a quote for regular or one-off home cleaning.',
    opening: 'Practical home cleaning for flats and houses across Brighton & Hove. Suitable for one-off cleans, regular support or a reset when the home needs extra attention.',
    included: [
      'Kitchen surfaces, sink and appliance exteriors',
      'Bathroom cleaning',
      'Dusting and wiping accessible surfaces',
      'Vacuuming and mopping where suitable',
      'Bedrooms and living areas cleaned to agreed scope',
      'Bins emptied where agreed',
      'High-touch areas such as handles and switches',
    ],
    whoFor: ['Busy households', 'Flats and houses', 'People needing one-off support', 'Regular domestic cleaning clients', 'Move-in preparation'],
    pricingNote: 'Price depends on property size, frequency, condition, priorities and access. A regular clean can be quoted once the scope is clear.',
    howToBook: ['Send your postcode and property details', 'Tell us whether you need one-off or regular cleaning', 'Share priorities and access notes', 'Receive a quote', 'Confirm the date and cleaning scope'],
    faqs: [
      { q: 'Do you offer regular domestic cleaning?', a: 'Yes, subject to availability. Weekly, fortnightly or one-off cleaning can be discussed.' },
      { q: 'Can I choose priorities?', a: 'Yes. Tell us the rooms or tasks that matter most when requesting a quote.' },
      { q: 'Do I need to be home?', a: 'Not always. Access arrangements must be agreed clearly before the job.' },
    ],
    internalLinks: [
      { href: '/deep-cleaning', label: 'Deep cleaning' },
      { href: '/end-of-tenancy-cleaning', label: 'End-of-tenancy cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
  'deep-cleaning': {
    slug: 'deep-cleaning',
    title: 'Deep Cleaning in Brighton & Hove',
    h1: 'Deep Cleaning in Brighton & Hove',
    description: 'Deep cleaning in Brighton & Hove for homes and properties that need more thorough attention. Request a quote with details and photos where possible.',
    opening: 'A deeper room-by-room clean for properties that need more than a regular visit. Useful before moving in, after busy periods, or when kitchens, bathrooms and high-touch areas need focused work.',
    included: [
      'Kitchen surfaces, cupboards fronts, sink and appliance exteriors',
      'Bathroom scale, taps, tiles, shower screens and mirrors',
      'Skirting boards, switches, handles and high-touch points',
      'Dusting of accessible surfaces',
      'Vacuuming and mopping suitable floors',
      'Focused attention on built-up areas',
      'Before/after photos where agreed',
    ],
    whoFor: ['Move-in cleans', 'Homes needing a reset', 'Landlords preparing a property', 'Busy households', 'Properties after a long gap between cleans'],
    pricingNote: 'Price depends on size, condition, level of build-up, access and whether appliances or specialist areas are included. Photos are strongly recommended.',
    howToBook: ['Send the quote form', 'Describe the condition honestly', 'Share photos where possible', 'Agree the rooms and priorities', 'Confirm date, access and payment details'],
    faqs: [
      { q: 'Is deep cleaning the same as end-of-tenancy cleaning?', a: 'Not always. End-of-tenancy cleaning is usually tied to move-out standards, while deep cleaning is a more intensive clean for a lived-in property.' },
      { q: 'Can you clean appliances inside?', a: 'This depends on the quote. Oven, fridge or appliance interiors should be listed before booking.' },
      { q: 'How long does a deep clean take?', a: 'It depends on property size and condition. We estimate after receiving the details and photos where possible.' },
    ],
    internalLinks: [
      { href: '/domestic-cleaning', label: 'Domestic cleaning' },
      { href: '/end-of-tenancy-cleaning', label: 'End-of-tenancy cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
  'gym-studio-cleaning': {
    slug: 'gym-studio-cleaning',
    title: 'Gym & Studio Cleaning in Brighton & Hove',
    h1: 'Gym & Studio Cleaning in Brighton & Hove',
    description: 'Gym and studio cleaning in Brighton & Hove for small gyms, pilates studios, yoga studios, PT studios and boutique fitness spaces. Request a quote.',
    opening: 'Weekly hygiene cleaning for small gyms, pilates studios, yoga studios, PT studios and boutique fitness spaces. We help keep your studio fresh, hygienic and member-ready.',
    included: [
      'Exercise mats and equipment surfaces',
      'Gym, studio and changing room floors',
      'Mirrors and glass where accessible',
      'Toilets and washrooms',
      'Changing areas and showers',
      'Reception and waiting areas',
      'High-touch surfaces and equipment controls',
      'Bins and staff kitchen areas',
    ],
    whoFor: ['Pilates studios', 'Yoga studios', 'Personal training studios', 'Dance studios', 'Boxing and martial arts studios', 'Small independent gyms'],
    pricingNote: 'Price depends on floor area, facilities, mats/equipment, changing areas, showers, cleaning frequency and access times. Weekly contracts and one-off deep cleans can be quoted.',
    howToBook: ['Send studio size and location', 'Tell us class schedule and preferred cleaning times', 'Confirm facilities and cleaning priorities', 'Agree product/access requirements', 'Book one-off or recurring cleaning'],
    faqs: [
      { q: 'Can you clean before or after sessions?', a: 'Yes. Early morning, late evening and weekend slots can be discussed around class times.' },
      { q: 'What products do you use on mats and equipment?', a: 'We use appropriate products for the agreed surfaces. Tell us if your studio has specific product requirements.' },
      { q: 'Do you offer weekly contracts?', a: 'Yes. Weekly and fortnightly recurring cleaning can be arranged after the scope is agreed.' },
    ],
    internalLinks: [
      { href: '/office-cleaning', label: 'Office cleaning' },
      { href: '/deep-cleaning', label: 'Deep cleaning' },
      { href: '/contact', label: 'Request a quote' },
    ],
  },
}
