import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'
import { createPageMetadata } from '@/lib/seo'

const service = servicePages['end-of-tenancy-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function EndOfTenancyCleaningPage() {
  return <ServicePage service={service} />
}
