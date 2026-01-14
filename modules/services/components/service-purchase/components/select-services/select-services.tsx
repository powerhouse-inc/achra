import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/marketplace-header'
import { ServicePurchaseSelects } from '../../../service-purchase-selects'
import { PricingCalculator } from '../service-catalog'

export default function SelectServices() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <ServicePurchaseSelects />
      <PricingCalculator />
    </div>
  )
}
