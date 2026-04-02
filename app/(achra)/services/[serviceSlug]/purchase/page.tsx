import { notFound } from 'next/navigation'
import { LeavePageGuard } from '@/modules/service-purchase/components/leave-page-guard'
import { ServicePurchaseWizard } from '@/modules/service-purchase/components/service-purchase-wizard'
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
      <ServicePurchaseStoreProvider services={services}>
        <ServicePurchaseWizard resourceTemplate={resourceTemplate} operator={operator} />
        {ff.LEAVE_PAGE_GUARD_ENABLED && <LeavePageGuard />}
        <StepUrlSync />
      </ServicePurchaseStoreProvider>
    </PageContent>
  )
}
