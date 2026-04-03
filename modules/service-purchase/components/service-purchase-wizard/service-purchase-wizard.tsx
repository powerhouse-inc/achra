'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { Suspense, useCallback } from 'react'
import type {
  BuilderProfileState,
  RsResourceTemplate,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { BookCallButton, ServiceInfo } from '@/modules/services/components/service-info'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { Tabs, TabsContent } from '@/modules/shared/components/ui/tabs'
import {
  SERVICE_PURCHASE_STEP_VALUES,
  SERVICE_PURCHASE_STEPS_ENTRIES,
} from '../../config/constants'
import {
  ConfigureServices,
  ConfigureServicesSkeleton,
} from '../configure-services-step/configure-services'
import { ConfirmationStep } from '../confirmation-step'
import { NavigationButtons } from '../navigation-buttons'
import { ProductInfo } from '../product-info'
import { SelectOperatorAction } from '../select-operator-action'
import { SelectOperatorStep } from '../select-operator-step'
import { SummaryStep } from '../summary-step'
import { OperatorBadge } from './operator-badge'
import { StepsTriggersList } from './steps-trigger/steps-triggers-list'

export interface ServicePurchaseWizardProps {
  resourceTemplate: RsResourceTemplate
  operator: BuilderProfileState
}

function ServicePurchaseWizard({
  resourceTemplate,
  operator,
}: Readonly<ServicePurchaseWizardProps>) {
  const { activeStep, goToStep } = useServicePurchaseStep()
  // Read step from URL directly so the first render (before zustand persist hydrates) has the
  // correct visual state, preventing the big-image → small-circle flicker on page refresh.
  const [urlStep] = useQueryState('step', parseAsStringEnum(SERVICE_PURCHASE_STEP_VALUES))

  const isProductInfo = (urlStep ?? activeStep) === ServicePurchaseStep.ProductInfo

  const handleOnSelectOperator = (_operatorId: string) => {
    // TODO: implement the logic to select the operator once we add support for multiple operators
    goToStep(ServicePurchaseStep.ConfigureServices)
  }

  const handleTabsNavigation = useCallback(
    (value: string) => {
      // Note: In the near future there will be more than one operator, by then we will need to
      // modify this function accordingly, selecting the operator by default if none is selected.
      goToStep(value as ServicePurchaseStep)
    },
    [goToStep],
  )

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <Tabs value={activeStep} onValueChange={handleTabsNavigation} className="w-full gap-8">
        <StepsTriggersList />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <ServiceInfo
              id={resourceTemplate.id}
              isCompacted={!isProductInfo}
              title={resourceTemplate.title}
              summary={resourceTemplate.summary}
              thumbnailUrl={resourceTemplate.thumbnailUrl}
              operator={
                ![ServicePurchaseStep.ProductInfo, ServicePurchaseStep.SelectOperator].includes(
                  activeStep,
                ) ? (
                  <OperatorBadge operator={operator} />
                ) : undefined
              }
              actions={isProductInfo ? <SelectOperatorAction /> : undefined}
            >
              <BookCallButton />
            </ServiceInfo>
          </div>
          {!isProductInfo && (
            <div className="shrink-0">
              <NavigationButtons />
            </div>
          )}
        </div>

        {SERVICE_PURCHASE_STEPS_ENTRIES.map((step) => (
          <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
            {step.value === ServicePurchaseStep.ProductInfo && (
              <ProductInfo
                description={resourceTemplate.description}
                contentSections={resourceTemplate.contentSections}
                faqFields={resourceTemplate.faqFields}
              />
            )}
            {step.value === ServicePurchaseStep.SelectOperator && (
              <SelectOperatorStep onSelectOperator={handleOnSelectOperator} operator={operator} />
            )}
            {step.value === ServicePurchaseStep.ConfigureServices && (
              <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the service configuration. Please try again later.">
                <Suspense fallback={<ConfigureServicesSkeleton />}>
                  <ConfigureServices />
                </Suspense>
              </ErrorBoundaryWithPresets>
            )}
            {step.value === ServicePurchaseStep.Summary && (
              <SummaryStep
                templateTitle={resourceTemplate.title}
                templateSubtitle={resourceTemplate.subtitle}
              />
            )}
            {step.value === ServicePurchaseStep.Confirmation && <ConfirmationStep />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export { ServicePurchaseWizard }
