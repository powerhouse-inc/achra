import { notFound } from 'next/navigation'
import { LeavePageGuard } from '@/modules/service-purchase/components/leave-page-guard'
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

  const [operator, services] = await Promise.all([
    getResourceOperator({ id: resourceTemplate?.operatorId }),
    getServiceOfferings({
      operatorId: resourceTemplate?.operatorId,
      resourceTemplateId: resourceTemplate?.id,
    }),
  ])

  if (!resourceTemplate || !operator || !services) {
    notFound()
  }

  return (
    <PageContent className="gap-6">
      {/* @ts-expect-error - TODO: fix this by recoming the commedted section in the graphql query once fixed in the API */}
      <ServicePurchaseStoreProvider services={services}>
        {ff.LEAVE_PAGE_GUARD_ENABLED && <LeavePageGuard />}
        <StepUrlSync>
          <div className="flex flex-col gap-6 lg:gap-8">
            <ServiceHeader resourceTemplate={resourceTemplate} />
            <ServicePurchaseForm resourceTemplate={resourceTemplate} operator={operator} />
          </div>
        </StepUrlSync>
      </ServicePurchaseStoreProvider>
    </PageContent>
  )
}
