'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { ConfigureServicesSkeleton } from '@/modules/service-purchase/components/configure-services-step/configure-services'
import { ConfirmationStepSkeleton } from '@/modules/service-purchase/components/confirmation-step'
import { ProductInfoSkeleton } from '@/modules/service-purchase/components/product-info'
import { SelectOperatorStepSkeleton } from '@/modules/service-purchase/components/select-operator-step'
import { StepsTriggerListSkeleton } from '@/modules/service-purchase/components/service-purchase-wizard/steps-trigger'
import { SummaryStepSkeleton } from '@/modules/service-purchase/components/summary-step'
import {
  SERVICE_PURCHASE_DEFAULT_STEP,
  SERVICE_PURCHASE_STEP_VALUES,
} from '@/modules/service-purchase/lib/constants'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { ServiceInfoSkeleton } from '@/modules/services/components/service-info'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function PurchaseLoadingSkeleton() {
  const [step] = useQueryState(
    'step',
    parseAsStringEnum(SERVICE_PURCHASE_STEP_VALUES).withDefault(SERVICE_PURCHASE_DEFAULT_STEP),
  )

  const activeStep = step as ServicePurchaseStep
  const isProductInfo = activeStep === ServicePurchaseStep.ProductInfo
  const isSelectOperator = activeStep === ServicePurchaseStep.SelectOperator
  const showNavButtons = !isProductInfo

  function renderStepContent() {
    switch (activeStep) {
      case ServicePurchaseStep.ProductInfo:
        return <ProductInfoSkeleton />
      case ServicePurchaseStep.SelectOperator:
        return <SelectOperatorStepSkeleton />
      case ServicePurchaseStep.ConfigureServices:
        return <ConfigureServicesSkeleton />
      case ServicePurchaseStep.Summary:
        return <SummaryStepSkeleton />
      case ServicePurchaseStep.Confirmation:
        return <ConfirmationStepSkeleton />
      default:
        return <ProductInfoSkeleton />
    }
  }

  return (
    <PageContent className="gap-6" aria-busy="true">
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Mirrors ServicePurchaseWizard: Tabs w-full gap-8 */}
        <div className="flex w-full flex-col gap-8">
          {/* StepsTriggersList */}
          <StepsTriggerListSkeleton activeStep={activeStep} />

          {/* ServiceInfo row + NavigationButtons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <ServiceInfoSkeleton
                isCompacted={!isProductInfo}
                showOperatorBadge={!isProductInfo && !isSelectOperator}
                showSelectOperatorAction={isProductInfo}
              />
            </div>
            {showNavButtons && (
              <div className="shrink-0">
                {/* Back + Continue */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-16 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              </div>
            )}
          </div>

          {/* TabsContent */}
          <div className="m-0 flex flex-col gap-2">{renderStepContent()}</div>
        </div>
      </div>
    </PageContent>
  )
}

export { PurchaseLoadingSkeleton }
