'use client'

import { Button } from '@achra/ui/button'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'

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
