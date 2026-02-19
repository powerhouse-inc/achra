import { notFound } from 'next/navigation'
import { FaqSection } from '@/modules/service-profile/components/faq'
import ProductInfo from '@/modules/service-purchase/components/service-purchase-form/components/product-info/product-info'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import { ServiceInfo } from '@/modules/shared/components/service-info'
import { PurchaseSection } from './components/purchase-section'
import { getResourceProfile } from './services/resource-profile'

interface ServiceProfileProps {
  serviceSlug: string
}

export default async function ServiceProfile({ serviceSlug }: ServiceProfileProps) {
  const resourceProfile = await getResourceProfile({ id: serviceSlug })
  const operatorId = resourceProfile?.operatorId

  const operator = await getResourceOperator({ id: operatorId })

  if (!resourceProfile || !operator) {
    notFound()
  }

  const faqFields = resourceProfile.faqFields ?? []

  return (
    <div className="flex flex-col gap-6">
      <ServiceInfo
        id={serviceSlug}
        showPurchaseButton
        showActionButtons
        title={resourceProfile.title}
        summary={resourceProfile.summary}
        thumbnailUrl={resourceProfile.thumbnailUrl}
        status={resourceProfile.status}
      />
      <ProductInfo
        description={resourceProfile.description}
        contentSections={resourceProfile.contentSections}
      />
      <PurchaseSection operator={operator} serviceSlug={serviceSlug} />
      {faqFields.length > 0 && <FaqSection faqFields={faqFields} />}
    </div>
  )
}
