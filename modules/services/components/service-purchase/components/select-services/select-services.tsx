import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/marketplace-header'
import { ServicePurchaseSelects } from '../../../service-purchase-selects'

export default function SelectServices() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <ServicePurchaseSelects />
      <div>PricingCalculator</div>
    </div>
  )
}
