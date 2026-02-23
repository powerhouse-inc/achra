import { ProductInfoSkeleton } from '@/modules/service-purchase/components/service-purchase-form/components/product-info/product-info-skeleton'
import ServiceInfoSkeleton from '@/modules/shared/components/service-info/service-info-skeleton'
import { FaqSectionSkeleton } from '../faq'
import { PurchaseSectionSkeleton } from '../purchase-section'

function ServiceProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Service info section */}
      <ServiceInfoSkeleton />

      {/* Product information section */}
      <ProductInfoSkeleton />

      <PurchaseSectionSkeleton />

      {/* FAQ section */}
      <FaqSectionSkeleton />
    </div>
  )
}

export { ServiceProfileSkeleton }
