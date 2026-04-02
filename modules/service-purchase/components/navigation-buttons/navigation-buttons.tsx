'use client'

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
      className="w-fit"
    >
      Continue
    </Button>
  )

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" onClick={goBack} className="w-fit">
        Back
      </Button>
      {continueDisabledReason ? (
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
      )}
    </div>
  )
}

export { NavigationButtons }
