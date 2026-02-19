import { notFound } from 'next/navigation'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import { ServicePurchaseStepProvider } from '@/modules/services/context/service-purchase-step-context'
import ServicePurchaseForm from './components/service-purchase-form/service-purchase-form'
import { getResourceTemplate } from './services/resource-template'
import { getServiceOfferings } from './services/service-offerings'

interface ServicePurchaseProps {
  serviceSlug: string
}

export default async function ServicePurchase({ serviceSlug }: ServicePurchaseProps) {
  const resourceTemplate = await getResourceTemplate({ id: serviceSlug })
  const operator = await getResourceOperator({ id: resourceTemplate?.operatorId })
  const services = await getServiceOfferings()

  if (!resourceTemplate || !operator) {
    notFound()
  }

  return (
    <ServicePurchaseStepProvider>
      <ServicePurchaseForm
        resourceTemplate={resourceTemplate}
        operator={operator}
        services={services}
      />
    </ServicePurchaseStepProvider>
  )
}
