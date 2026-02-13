import ProductInfo from '@/modules/service-purchase/components/service-purchase-form/components/product-info/product-info'
import { FaqSection } from '@/modules/services/components/service-profile/components/faq'
import { ServiceInfo } from '@/modules/shared/components/service-info'
import { SERVICES_CARDS_MOCK } from '../../mocks/services'
import { PurchaseSection } from './components/purchase-section'

export default function ServiceProfile() {
  const service = SERVICES_CARDS_MOCK[0]
  return (
    <div className="flex flex-col gap-6">
      <ServiceInfo
        id={service.id}
        showPurchaseButton
        showActionButtons
        title={service.title}
        description={service.description}
        thumbnailUrl={service.thumbnailUrl}
        status={service.status}
      />
      <ProductInfo summary={service.summary} contentSections={service.contentSections} />
      <PurchaseSection />
      <FaqSection />
    </div>
  )
}
