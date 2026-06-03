'use client'

import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Button } from '@/modules/shared/components/ui/button'

function SelectOperatorAction() {
  const { goToStep } = useServicePurchaseStep()

  function handleSelectOperator() {
    goToStep(ServicePurchaseStep.SelectOperator)
  }

  return (
    <div className="flex w-full justify-end">
      <Button variant="default" onClick={handleSelectOperator}>
        Select an operator
      </Button>
    </div>
  )
}

export { SelectOperatorAction }
