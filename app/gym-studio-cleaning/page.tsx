import { ServicePage } from '@/components/ServicePage'
import { servicePages } from '@/content/services'
import { createPageMetadata } from '@/lib/seo'

const service = servicePages['gym-studio-cleaning']

export const metadata = createPageMetadata(service.title, service.description)

export default function GymStudioCleaningPage() {
  return <ServicePage service={service} />
}
