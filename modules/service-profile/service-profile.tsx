import { notFound } from 'next/navigation'
import { FaqSection } from '@/modules/service-profile/components/faq'
import ProductInfo from '@/modules/service-purchase/components/service-purchase-form/components/product-info/product-info'
import { ServiceInfo } from '@/modules/shared/components/service-info'
import { getResourceOperator } from '@/modules/shared/services/resource-operator'
import { PurchaseSection } from './components/purchase-section'
import { getResourceProfile } from './services/resource-profile'

interface ServiceProfileProps {
  docId: string
}

export default async function ServiceProfile({ docId }: ServiceProfileProps) {
  const resourceProfile = await getResourceProfile(docId)
  const operatorId = resourceProfile?.operatorId

  const operator = await getResourceOperator(operatorId)

  if (!resourceProfile || !operator) {
    notFound()
  }

  const faqFields = resourceProfile.faqFields ?? []

  return (
    <div className="flex flex-col gap-6">
      <ServiceInfo
        id={docId}
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
      <PurchaseSection operator={operator} docId={docId} />
      {faqFields.length > 0 && <FaqSection faqFields={faqFields} />}
    </div>
  )
}
