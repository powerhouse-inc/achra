'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { ConfigureServicesSkeleton } from '@/modules/service-purchase/components/configure-services-step/configure-services'
import { ConfirmationStepSkeleton } from '@/modules/service-purchase/components/confirmation-step'
import { ProductInfoSkeleton } from '@/modules/service-purchase/components/product-info'
import { SelectOperatorStepSkeleton } from '@/modules/service-purchase/components/select-operator-step'
import { ServiceHeaderSkeleton } from '@/modules/service-purchase/components/service-header'
import { StepsTriggerListSkeleton } from '@/modules/service-purchase/components/service-purchase-form/steps-trigger'
import { SummaryStepSkeleton } from '@/modules/service-purchase/components/summary-step'
import {
  SERVICE_PURCHASE_DEFAULT_STEP,
  SERVICE_PURCHASE_STEP_VALUES,
} from '@/modules/service-purchase/config/constants'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { PageContent } from '@/modules/shared/components/page-containers'

function PurchaseLoadingSkeleton() {
  const [step] = useQueryState(
    'step',
    parseAsStringEnum(SERVICE_PURCHASE_STEP_VALUES).withDefault(SERVICE_PURCHASE_DEFAULT_STEP),
  )

  const activeStep = step as ServicePurchaseStep

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
    <PageContent className="gap-6">
      <div className="flex flex-col gap-6 lg:gap-8">
        <ServiceHeaderSkeleton step={activeStep} />
        <div className="flex w-full flex-col gap-8">
          <StepsTriggerListSkeleton activeStep={activeStep} />
          <div className="m-0 flex flex-col gap-2">{renderStepContent()}</div>
        </div>
      </div>
    </PageContent>
  )
}

export { PurchaseLoadingSkeleton }
