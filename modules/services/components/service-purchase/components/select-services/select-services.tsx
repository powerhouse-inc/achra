import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/marketplace-header'

export default function SelectServices() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <div>ServicePurchaseSelects</div>
      <div>PricingCalculator</div>
    </div>
  )
}
