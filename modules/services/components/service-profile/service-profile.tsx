import ProductInfo from '../service-purchase/components/service-purchase-form/components/product-info/product-info'
import { PurchaseSection } from './components/purchase-section'
import ServiceInfoProfile from './components/service-info-profile'

export default function ServiceProfile() {
  return (
    <div className="flex flex-col gap-6">
      <ServiceInfoProfile />
      <ProductInfo />
      <PurchaseSection />
    </div>
  )
}
