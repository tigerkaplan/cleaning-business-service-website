import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'
import { createPageMetadata } from '@/lib/seo'

const service = servicePages['domestic-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function DomesticCleaningPage() {
  return <ServicePage service={service} />
}
