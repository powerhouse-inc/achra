'use client'

import { ProductInfoSkeleton } from '@/modules/service-purchase/components/product-info'
import { StepsTriggerListSkeleton } from '@/modules/service-purchase/components/service-purchase-wizard/steps-trigger'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { ServiceInfoSkeleton } from '@/modules/services/components/service-info'
import { PageContent } from '@/modules/shared/components/page-containers'

function PurchaseLoadingFallbackSkeleton() {
  return (
    <PageContent className="gap-6" aria-busy="true">
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex w-full flex-col gap-8">
          <StepsTriggerListSkeleton activeStep={ServicePurchaseStep.ProductInfo} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <ServiceInfoSkeleton showSelectOperatorAction />
            </div>
          </div>

          <div className="m-0 flex flex-col gap-2">
            <ProductInfoSkeleton />
          </div>
        </div>
      </div>
    </PageContent>
  )
}

export { PurchaseLoadingFallbackSkeleton }
