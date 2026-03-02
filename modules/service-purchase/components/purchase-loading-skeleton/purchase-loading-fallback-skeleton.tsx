'use client'

import { ProductInfoSkeleton } from '@/modules/service-purchase/components/product-info'
import { ServiceHeaderSkeleton } from '@/modules/service-purchase/components/service-header'
import { StepsTriggerListSkeleton } from '@/modules/service-purchase/components/service-purchase-form/steps-trigger'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { PageContent } from '@/modules/shared/components/page-containers'

function PurchaseLoadingFallbackSkeleton() {
  return (
    <PageContent className="gap-6">
      <div className="flex flex-col gap-6 lg:gap-8">
        <ServiceHeaderSkeleton step={ServicePurchaseStep.ProductInfo} />
        <div className="flex w-full flex-col gap-8">
          <StepsTriggerListSkeleton activeStep={ServicePurchaseStep.ProductInfo} />
          <div className="m-0 flex flex-col gap-2">
            <ProductInfoSkeleton />
          </div>
        </div>
      </div>
    </PageContent>
  )
}

export { PurchaseLoadingFallbackSkeleton }
