'use client'

import type { RsResourceTemplate } from '@/modules/__generated__/graphql/switchboard-generated'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-step-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { ServiceInfo } from '@/modules/services/components/service-info'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

interface ServiceHeaderProps {
  resourceTemplate: RsResourceTemplate
}

function ServiceHeader({ resourceTemplate }: Readonly<ServiceHeaderProps>) {
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
    <>
      <div
        className={cn(
          'flex w-full justify-end',
          activeStep !== ServicePurchaseStep.ProductInfo && 'hidden',
        )}
      >
        <Button variant="default" onClick={handleGoToSelectOperator}>
          Select an operator
        </Button>
      </div>
      <div
        className={cn(
          'flex flex-col gap-8',
          activeStep === ServicePurchaseStep.ProductInfo && 'gap-0',
        )}
      >
        <div className="flex">
          <Button
            variant="secondary"
            onClick={handleGoBack}
            className={cn('w-fit', activeStep === ServicePurchaseStep.ProductInfo && 'hidden')}
          >
            Back
          </Button>

          <div
            className={cn(
              'flex w-full items-start justify-end',
              activeStep !== ServicePurchaseStep.ConfigureServices && 'hidden',
            )}
          >
            <Button variant="default" onClick={handleGoToSummary}>
              Continue
            </Button>
          </div>
        </div>
        <ServiceInfo
          id={resourceTemplate.id}
          light={activeStep !== ServicePurchaseStep.ProductInfo}
          title={resourceTemplate.title}
          summary={resourceTemplate.summary}
          thumbnailUrl={resourceTemplate.thumbnailUrl}
          status={resourceTemplate.status}
        />
      </div>
    </>
  )
}

export { ServiceHeader }
