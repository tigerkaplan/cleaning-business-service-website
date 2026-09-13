import { createPageMetadata } from '@/lib/seo'
import { businessProfile } from '@/config/business'
import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'

const service = servicePages['domestic-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function DomesticCleaningPage() {
  return <ServicePage service={service} />
}
