import { ServiceInfo } from '@/modules/shared/components/service-info'
import ProductInfo from '../service-purchase/components/service-purchase-form/components/product-info/product-info'
import { PurchaseSection } from './components/purchase-section'

export default function ServiceProfile() {
  return (
    <div className="flex flex-col gap-6">
      <ServiceInfo showPurchaseButton showActionButtons />
      <ProductInfo />
      <PurchaseSection />
    </div>
  )
}
