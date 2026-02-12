import { notFound } from 'next/navigation'
import { ServicePurchaseStepProvider } from '@/modules/services/context/service-purchase-step-context'

import ServicePurchaseForm from './components/service-purchase-form/service-purchase-form'
import { getResourceTemplate } from './services/resource-template'

interface ServicePurchaseProps {
  docId: string
}

export default async function ServicePurchase({ docId }: ServicePurchaseProps) {
  const resourceTemplate = await getResourceTemplate(docId)

  if (!resourceTemplate) {
    notFound()
  }

  return (
    <ServicePurchaseStepProvider>
      <ServicePurchaseForm resourceTemplate={resourceTemplate} />
    </ServicePurchaseStepProvider>
  )
}
