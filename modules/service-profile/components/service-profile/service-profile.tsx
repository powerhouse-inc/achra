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
import { ServiceSectionsCard } from '@/modules/services/components/services-card-list-section/service-sections-card'
import RecursiveIcon from '@/modules/shared/components/svgs/recursive.svg'
import SettingsIcon from '@/modules/shared/components/svgs/settings.svg'
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
        details={
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
            <ServiceSectionsCard
              icon={SettingsIcon}
              title="Formation & Setup"
              items={resourceProfile.setupServices}
            />
            <ServiceSectionsCard
              icon={RecursiveIcon}
              title="Recurring Services"
              items={resourceProfile.recurringServices}
            />
          </div>
        }
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
