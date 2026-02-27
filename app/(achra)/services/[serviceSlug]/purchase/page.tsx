import { notFound } from 'next/navigation'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import { ServiceHeader } from '@/modules/service-purchase/components/service-header'
import { ServicePurchaseForm } from '@/modules/service-purchase/components/service-purchase-form/service-purchase-form'
import { StepUrlSync } from '@/modules/service-purchase/components/step-url-sync'
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
      {/* TODO:Remove this cast as when the api its ready */}
      <ServicePurchaseStoreProvider services={services as unknown as RsServiceOffering}>
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
