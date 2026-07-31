import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'
import { createPageMetadata } from '@/lib/seo'

const service = servicePages['airbnb-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function AirbnbCleaningPage() {
  return <ServicePage service={service} />
}
