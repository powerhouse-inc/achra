import { notFound } from 'next/navigation'
import { ServiceHeader } from '@/modules/service-purchase/components/service-header'
import { ServicePurchaseForm } from '@/modules/service-purchase/components/service-purchase-form/service-purchase-form'
import { ServicePurchaseStepProvider } from '@/modules/service-purchase/providers/service-purchase-step-provider'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { getResourceOperator } from '@/modules/service-purchase/services/resource-operator'
import { getResourceTemplate } from '@/modules/service-purchase/services/resource-template'
import { getServiceOfferings } from '@/modules/service-purchase/services/service-offerings'
import { PageContent } from '@/modules/shared/components/page-containers'

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
      <ServicePurchaseStoreProvider facets={services.facetTargets} services={services}>
        <ServicePurchaseStepProvider>
          <div className="flex flex-col gap-6 lg:gap-8">
            <ServiceHeader resourceTemplate={resourceTemplate} />
            <ServicePurchaseForm resourceTemplate={resourceTemplate} operator={operator} />
          </div>
        </ServicePurchaseStepProvider>
      </ServicePurchaseStoreProvider>
    </PageContent>
  )
}
