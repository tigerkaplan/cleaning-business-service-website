import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'
import { createPageMetadata } from '@/lib/seo'

const service = servicePages['deep-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function DeepCleaningPage() {
  return <ServicePage service={service} />
}
