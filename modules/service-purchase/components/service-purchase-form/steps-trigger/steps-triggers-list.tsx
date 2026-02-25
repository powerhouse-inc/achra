'use client'

import { BookOpenCheck, BookOpenText, CheckCheck, FileText, InfoIcon } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { SERVICE_PURCHASE_STEPS_ENTRIES } from '@/modules/service-purchase/config/constants'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Separator } from '@/modules/shared/components/ui/separator'
import { TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { cn } from '@/modules/shared/lib/utils'

const STEP_ICONS: Record<ServicePurchaseStep, ReactNode> = {
  [ServicePurchaseStep.ProductInfo]: <InfoIcon className="size-4 lg:size-6" />,
  [ServicePurchaseStep.SelectOperator]: <FileText className="size-4 lg:size-6" />,
  [ServicePurchaseStep.ConfigureServices]: <BookOpenCheck className="size-4 lg:size-6" />,
  [ServicePurchaseStep.Summary]: <BookOpenText className="size-4 lg:size-6" />,
  [ServicePurchaseStep.Confirmation]: <CheckCheck className="size-4 lg:size-6" />,
}

function StepsTriggersList() {
  const { activeStep, hasVisitedStep, isStepDisabled } = useServicePurchaseStep()

  return (
    <TabsList className="h-fit w-full justify-center bg-transparent p-0 md:justify-between">
      {SERVICE_PURCHASE_STEPS_ENTRIES.map((step, index) => {
        const isActive = activeStep === step.value
        const isVisited = hasVisitedStep(step.value)

        return (
          <Fragment key={step.value}>
            <TabsTrigger
              value={step.value}
              className={cn(
                'md:border-border md:data-[state=active]:border-primary dark:md:data-[state=active]:border-primary flex h-8 w-8 flex-none items-center gap-0 overflow-hidden rounded-full border-none px-0 py-0 data-[state=active]:shadow-none md:h-6.5 md:w-fit md:rounded-lg md:border-solid lg:h-10 2xl:h-12 2xl:rounded-xl dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none',
                isVisited && !isActive && 'md:border-primary/70 dark:md:border-primary/70',
              )}
              disabled={isStepDisabled(step.value)}
            >
              <div
                className={cn(
                  'bg-border text-foreground/50 w-full rounded-l-full rounded-r-full p-1 text-center text-xs/5.5 font-semibold md:w-fit md:rounded-l-lg md:rounded-r-none lg:p-2.75 lg:text-base/6 2xl:rounded-l-xl 2xl:p-3 2xl:text-lg/6',
                  isActive && 'bg-primary text-primary-foreground',
                  isVisited && !isActive && 'bg-primary/70 text-primary-foreground',
                )}
              >
                {index + 1}
              </div>
              <div
                className={cn(
                  'text-foreground/50 hidden h-full items-center gap-1 rounded-r-lg px-1 md:flex xl:px-2 2xl:gap-2 2xl:rounded-r-xl 2xl:px-3',
                  isActive && 'text-primary',
                  isVisited && !isActive && 'text-primary/70',
                )}
              >
                {STEP_ICONS[step.value]}
                <span className="text-xs/4.5 font-medium lg:text-base/6 lg:font-semibold 2xl:text-xl/6 2xl:font-bold">
                  {step.label}
                </span>
              </div>
            </TabsTrigger>
            {index < SERVICE_PURCHASE_STEPS_ENTRIES.length - 1 && (
              <Separator
                orientation="horizontal"
                className={cn(
                  'bg-border mx-1 h-0.5! max-w-8! flex-1',
                  hasVisitedStep(SERVICE_PURCHASE_STEPS_ENTRIES[index + 1].value) && 'bg-primary',
                )}
              />
            )}
          </Fragment>
        )
      })}
    </TabsList>
  )
}

export { StepsTriggersList }
