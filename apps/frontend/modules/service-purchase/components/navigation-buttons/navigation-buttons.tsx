'use client'

import { ArrowRight } from 'lucide-react'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Button } from '@/modules/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'

function continueDisabledHint(step: ServicePurchaseStep): string | null {
  if (step === ServicePurchaseStep.Summary) {
    return 'Fill out the form and request a quote to continue.'
  }
  return null
}

function NavigationButtons() {
  const { activeStep, goBack, goToStep } = useServicePurchaseStep()

  const isConfirmation = activeStep === ServicePurchaseStep.Confirmation
  const isContinueEnabled =
    activeStep === ServicePurchaseStep.SelectOperator ||
    activeStep === ServicePurchaseStep.ConfigureServices
  const continueDisabledReason = !isContinueEnabled ? continueDisabledHint(activeStep) : null

  function handleContinue() {
    if (activeStep === ServicePurchaseStep.SelectOperator) {
      goToStep(ServicePurchaseStep.ConfigureServices)
      return
    }
    goToStep(ServicePurchaseStep.Summary)
  }

  const continueButton = (
    <Button
      variant="default"
      disabled={!isContinueEnabled}
      onClick={handleContinue}
      className="group/link pr-7! pl-8!"
    >
      Continue
      <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
    </Button>
  )

  return (
    <div className="flex items-center justify-between gap-2 sm:justify-normal">
      <Button variant="secondary" onClick={goBack} className="w-fit">
        Back
      </Button>
      {!isConfirmation &&
        (continueDisabledReason ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-not-allowed" tabIndex={0}>
                {continueButton}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              {continueDisabledReason}
            </TooltipContent>
          </Tooltip>
        ) : (
          continueButton
        ))}
    </div>
  )
}

export { NavigationButtons }
