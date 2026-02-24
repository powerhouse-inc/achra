'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { Suspense, useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type {
  BuilderProfileState,
  RsResourceTemplate,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-step-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { Tabs, TabsContent } from '@/modules/shared/components/ui/tabs'
import { SERVICE_PURCHASE_STEPS_ENTRIES } from '../../config/constants'
import {
  useComputedTiers,
  useSelectedTier,
  useServicePurchaseActions,
} from '../../providers/service-purchase-store-provider'
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { PricingCalculatorSkeleton } from '../configure-services-purchase/components/service-catalog/pricing-calculator'
import { ConfirmationStep } from '../confirmation-step'
import { ProductInfo } from '../product-info'
import { SelectOperatorStep } from '../select-operator-step'
import { SummaryStep } from '../summary-step'
import { StepsTriggersList } from './components/steps-trigger/steps-triggers-list'

export interface ServicePurchaseFormValues {
  operatorId?: string
  name: string
  teamName: string
  email: string
  legalEntity: string
  teamStructure: string
  anonymityLevel: string
  selectedPlan?: string
}

export interface ServicePurchaseFormProps {
  resourceTemplate: RsResourceTemplate
  operator: BuilderProfileState
  services: RsServiceOffering
}

export default function ServicePurchaseForm({
  resourceTemplate,
  operator,
  services,
}: Readonly<ServicePurchaseFormProps>) {
  const { setSelectedTier } = useServicePurchaseActions()
  const selectedTier = useSelectedTier()
  const defaultActivePlan = selectedTier.name
  const { activeStep, goToStep, visitedSteps, resetPostConfigureSteps } = useServicePurchaseStep()
  const [operatorIdFromUrl, setOperatorIdFromUrl] = useQueryState(
    'operatorId',
    parseAsString.withDefault(''),
  )

  const form = useForm<ServicePurchaseFormValues>({
    mode: 'onChange',
    defaultValues: {
      operatorId: undefined,
      name: '',
      teamName: '',
      email: '',
      legalEntity: 'Swiss Association',
      teamStructure: 'Remote Team',
      anonymityLevel: 'High (Standard)',
      selectedPlan: defaultActivePlan,
    },
  })

  const { control, setValue } = form

  const tiers = useComputedTiers()

  // TODO: the operatorId is not in the URL, is this necessary?
  // Note: It is when the user clicks on the "Configure Services" button in an operator card from another page.
  // Sync operatorId from URL query state
  useEffect(() => {
    if (!operatorIdFromUrl) return
    setValue('operatorId', operatorIdFromUrl)
    goToStep(ServicePurchaseStep.ConfigureServices)
    void setOperatorIdFromUrl(null)
  }, [operatorIdFromUrl, setValue, goToStep, setOperatorIdFromUrl])

  const selectedPlan = useWatch({ control, name: 'selectedPlan' })
  const selectedOperatorId = useWatch({ control, name: 'operatorId' })

  const handlePlanChange = useCallback(
    (planName: string) => {
      const tier = tiers.find((t) => t.name === planName)
      if (!tier) return
      setValue('selectedPlan', planName)
      setSelectedTier(tier.id)
    },
    [tiers, setSelectedTier, setValue],
  )

  const handleOnSelectOperator = (operatorId: string) => {
    const hasPreviousOperator = selectedOperatorId !== undefined
    const isDifferentOperator = selectedOperatorId !== operatorId

    const hasVisitedSummaryOrConfirmation =
      visitedSteps.includes(ServicePurchaseStep.Summary) ||
      visitedSteps.includes(ServicePurchaseStep.Confirmation)

    if (hasPreviousOperator && isDifferentOperator && hasVisitedSummaryOrConfirmation) {
      resetPostConfigureSteps()
    }
    setValue('operatorId', operatorId)
    goToStep(ServicePurchaseStep.ConfigureServices)
  }

  // Note: In the near future there will be more than one operator, by then we will need to modify this function accordingly, selecting the operator by default if none is selected.
  const handleTabsNavigation = useCallback(
    (value: string) => {
      if (!selectedOperatorId) {
        setValue('operatorId', operator.id)
      }
      goToStep(value as ServicePurchaseStep)
    },
    [selectedOperatorId, setValue, goToStep, operator.id],
  )

  return (
    <Tabs value={activeStep} onValueChange={handleTabsNavigation} className="w-full gap-8">
      <StepsTriggersList />
      {SERVICE_PURCHASE_STEPS_ENTRIES.map((step) => (
        <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
          {step.value === ServicePurchaseStep.ProductInfo && (
            <ProductInfo
              description={resourceTemplate.description}
              contentSections={resourceTemplate.contentSections}
            />
          )}
          {step.value === ServicePurchaseStep.SelectOperator && (
            <SelectOperatorStep onSelectOperator={handleOnSelectOperator} operator={operator} />
          )}
          {step.value === ServicePurchaseStep.ConfigureServices && (
            <Suspense fallback={<PricingCalculatorSkeleton />}>
              <ConfigureServices
                selectedPlan={selectedPlan}
                onPlanChange={handlePlanChange}
                servicesData={services}
                operator={operator}
              />
            </Suspense>
          )}
          {step.value === ServicePurchaseStep.Summary && <SummaryStep operator={operator} />}
          {step.value === ServicePurchaseStep.Confirmation && <ConfirmationStep />}
        </TabsContent>
      ))}
    </Tabs>
  )
}
