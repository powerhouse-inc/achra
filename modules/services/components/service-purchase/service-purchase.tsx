import { ServicePurchaseStepProvider } from '@/modules/services/context/service-purchase-step-context'

import ServicePurchaseForm from './components/service-purchase-form/service-purchase-form'

export default function ServicePurchase() {
  return (
    <ServicePurchaseStepProvider>
      <ServicePurchaseForm />
    </ServicePurchaseStepProvider>
  )
}
