import { getServices } from '../../services/services-service'
import { ServicesPageContent } from './services-page-content'

export async function ServicesListSection() {
  const services = await getServices()

  return <ServicesPageContent services={services} />
}
