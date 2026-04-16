import { getServicesWithOfferings } from '../../services/services-service'
import { ServicesPageContent } from './services-page-content'

async function ServicesListSection() {
  const enrichedServices = await getServicesWithOfferings()

  return <ServicesPageContent enrichedServices={enrichedServices} />
}

export { ServicesListSection }
