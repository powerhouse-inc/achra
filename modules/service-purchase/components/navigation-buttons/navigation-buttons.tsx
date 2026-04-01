'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { useServicePurchaseStep } from '../../providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '../../types'

interface NavigationButtonsProps {
  isFooter?: boolean
}

function NavigationButtons({ isFooter }: NavigationButtonsProps) {
  const { activeStep, goToStep, goBack } = useServicePurchaseStep()

  const handleGoToSelectOperator = () => {
    goToStep(ServicePurchaseStep.SelectOperator)
  }
  const handleGoBack = () => {
    goBack()
  }
  const handleGoToSummary = () => {
    goToStep(ServicePurchaseStep.Summary)
  }

  return (
    <div
      className={cn({
        'mb-8': activeStep !== ServicePurchaseStep.ProductInfo && !isFooter,
        'mb-6 lg:mb-8': activeStep === ServicePurchaseStep.ProductInfo && !isFooter,
        hidden: isFooter && activeStep !== ServicePurchaseStep.ConfigureServices,
      })}
    >
      {activeStep === ServicePurchaseStep.ProductInfo ? (
        <div className={cn('flex w-full justify-end')}>
          <Button variant="default" onClick={handleGoToSelectOperator}>
            Select an operator
          </Button>
        </div>
      ) : (
        <div className="flex">
          {!isFooter && (
            <Button variant="secondary" onClick={handleGoBack} className={cn('w-fit')}>
              Back
            </Button>
          )}

          {activeStep === ServicePurchaseStep.ConfigureServices && (
            <Button variant="default" onClick={handleGoToSummary} className="ml-auto">
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { NavigationButtons }
