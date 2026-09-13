import { createPageMetadata } from '@/lib/seo'
import { businessProfile } from '@/config/business'
import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'

const service = servicePages['deep-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function DeepCleaningPage() {
  return <ServicePage service={service} />
}
