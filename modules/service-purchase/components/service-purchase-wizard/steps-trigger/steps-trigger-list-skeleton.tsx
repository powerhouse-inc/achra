import { Fragment } from 'react'
import { SERVICE_PURCHASE_STEPS_ENTRIES } from '@/modules/service-purchase/config/constants'
import type { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Separator } from '@/modules/shared/components/ui/separator'
import { StepTriggerSkeleton } from './step-trigger-skeleton'

interface StepsTriggerListSkeletonProps {
  activeStep?: ServicePurchaseStep
}

function StepsTriggerListSkeleton({ activeStep }: StepsTriggerListSkeletonProps) {
  const activeIndex =
    activeStep !== undefined
      ? SERVICE_PURCHASE_STEPS_ENTRIES.findIndex((entry) => entry.value === activeStep)
      : 0
  const resolvedActiveIndex = activeIndex >= 0 ? activeIndex : 0

  return (
    <div className="flex h-fit w-full items-center justify-center bg-transparent p-0 md:justify-between">
      {Array.from({ length: 5 }).map((_, index) => (
        // Note: It is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          <StepTriggerSkeleton active={index === resolvedActiveIndex} />
          {index < 4 && (
            <Separator orientation="horizontal" className="bg-border h-0.5! max-w-8! flex-1" />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export { StepsTriggerListSkeleton }
