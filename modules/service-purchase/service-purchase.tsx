import { notFound } from 'next/navigation'
import { ServicePurchaseStepProvider } from '@/modules/services/context/service-purchase-step-context'
import { getResourceOperator } from '@/modules/shared/services/resource-operator'
import ServicePurchaseForm from './components/service-purchase-form/service-purchase-form'
import { getResourceTemplate } from './services/resource-template'
import { getServiceOfferings } from './services/service-offerings'

interface ServicePurchaseProps {
  docId: string
}

export default async function ServicePurchase({ docId }: ServicePurchaseProps) {
  const resourceTemplate = await getResourceTemplate(docId)
  const services = await getServiceOfferings()

  const operatorId = resourceTemplate?.operatorId

  const operator = await getResourceOperator(operatorId)

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
