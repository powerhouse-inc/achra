'use client'

import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Button } from '@/modules/shared/components/ui/button'

function ConfigureStepContinueButton() {
  const { goToStep } = useServicePurchaseStep()

  function handleContinue() {
    goToStep(ServicePurchaseStep.Summary)
  }

  return (
    <div className="flex w-full justify-end">
      <Button variant="default" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  )
}

export { ConfigureStepContinueButton }
