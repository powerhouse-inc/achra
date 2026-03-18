import { notFound } from 'next/navigation'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import { LeavePageGuard } from '@/modules/service-purchase/components/leave-page-guard'
import { NavigationButtons } from '@/modules/service-purchase/components/navigation-buttons'
import { ServiceHeader } from '@/modules/service-purchase/components/service-header'
import { ServicePurchaseForm } from '@/modules/service-purchase/components/service-purchase-form/service-purchase-form'
import { StepUrlSync } from '@/modules/service-purchase/components/step-url-sync'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import { getResourceTemplate } from '@/modules/service-purchase/services/resource-template'
import { getServiceOfferings } from '@/modules/service-purchase/services/service-offerings'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'

interface ServicePurchasePageProps {
  params: Promise<{ serviceSlug: string }>
}

export default async function ServicePurchasePage({ params }: ServicePurchasePageProps) {
  const { serviceSlug } = await params
  const resourceTemplate = await getResourceTemplate({ id: serviceSlug })

  if (!resourceTemplate?.operatorId?.trim()) {
    // it is required a resource template to have an operatorId
    notFound()
  }

  const [operator, services] = await Promise.all([
    getResourceOperator({ id: resourceTemplate.operatorId }),
    getServiceOfferings({
      operatorId: resourceTemplate.operatorId,
      resourceTemplateId: resourceTemplate.id,
    }),
  ])

  if (!operator || !services) {
    notFound()
  }

  return (
    <PageContent className="gap-6">
      <ServicePurchaseStoreProvider services={services as unknown as RsServiceOffering}>
        <div className="flex flex-col gap-6 lg:gap-8">
          <div>
            <NavigationButtons />
            <ServiceHeader resourceTemplate={resourceTemplate} />
          </div>
          <ServicePurchaseForm resourceTemplate={resourceTemplate} operator={operator} />
          <NavigationButtons isFooter />
        </div>

        {ff.LEAVE_PAGE_GUARD_ENABLED && <LeavePageGuard />}
        <StepUrlSync />
      </ServicePurchaseStoreProvider>
    </PageContent>
  )
}
