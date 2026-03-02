'use client'

import type { RsResourceTemplate } from '@/modules/__generated__/graphql/switchboard-generated'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { ServiceInfo } from '@/modules/services/components/service-info'

interface ServiceHeaderProps {
  resourceTemplate: RsResourceTemplate
}

function ServiceHeader({ resourceTemplate }: Readonly<ServiceHeaderProps>) {
  const { activeStep } = useServicePurchaseStep()

  return (
    <ServiceInfo
      id={resourceTemplate.id}
      light={activeStep !== ServicePurchaseStep.ProductInfo}
      title={resourceTemplate.title}
      summary={resourceTemplate.summary}
      thumbnailUrl={resourceTemplate.thumbnailUrl}
      status={resourceTemplate.status}
    />
  )
}

export { ServiceHeader }
