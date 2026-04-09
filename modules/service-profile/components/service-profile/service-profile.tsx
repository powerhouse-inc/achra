import { notFound } from 'next/navigation'
import { FaqSection } from '@/modules/service-profile/components/faq'
import { ProductInfo } from '@/modules/service-purchase/components/product-info'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import {
  ActionButtons,
  BookCallButton,
  PurchaseButton,
  ServiceInfo,
} from '@/modules/services/components/service-info'
import { getResourceProfile } from '../../services/resource-profile'
import { PurchaseSection } from '../purchase-section/purchase-section'

interface ServiceProfileProps {
  serviceSlug: string
}

async function ServiceProfile({ serviceSlug }: ServiceProfileProps) {
  const resourceProfile = await getResourceProfile({ id: serviceSlug })

  if (!resourceProfile) {
    notFound()
  }

  const operatorId = resourceProfile.operatorId

  const operator = operatorId ? await getResourceOperator({ id: operatorId }) : undefined

  const faqFields = resourceProfile.faqFields ?? []

  return (
    <div className="flex flex-col gap-6">
      <ServiceInfo
        id={serviceSlug}
        title={resourceProfile.title}
        summary={resourceProfile.summary}
        thumbnailUrl={resourceProfile.thumbnailUrl}
        actions={<ActionButtons infoLink={resourceProfile.infoLink} />}
      >
        <BookCallButton />
        <PurchaseButton
          serviceId={serviceSlug}
          operatorId={resourceProfile.operatorId}
          status={resourceProfile.status}
        />
      </ServiceInfo>
      <ProductInfo
        description={resourceProfile.description}
        contentSections={resourceProfile.contentSections}
      />
      {operator && <PurchaseSection operator={operator} serviceSlug={serviceSlug} />}
      {faqFields.length > 0 && <FaqSection faqFields={faqFields} />}
    </div>
  )
}

export { ServiceProfile }
