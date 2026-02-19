import { notFound } from 'next/navigation'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import { ServicePurchaseStepProvider } from '@/modules/services/context/service-purchase-step-context'
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

  const operator = await getResourceOperator({ id: operatorId })

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
