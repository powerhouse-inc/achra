'use client'

import { Button } from '@achra/ui/button'
import { ArrowRight } from 'lucide-react'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'

function ConfigureStepContinueButton() {
  const { goToStep } = useServicePurchaseStep()

  function handleContinue() {
    goToStep(ServicePurchaseStep.Summary)
  }

  return (
    <div className="flex w-full justify-end">
      <Button variant="default" onClick={handleContinue} className="group/link py-6! pr-14! pl-16!">
        Continue
        <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
      </Button>
    </div>
  )
}

export { ConfigureStepContinueButton }
