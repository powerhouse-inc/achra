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
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { PricingCalculatorSkeleton } from '../configure-services-purchase/components/service-catalog/pricing-calculator'
import { ConfirmationStep } from '../confirmation-step'
import { ProductInfo } from '../product-info'
import { SummaryStep } from '../summary-step'
import SelectOperator from './components/select-operator/select-operator'
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
  enabledSections: Record<string, boolean>
}

export interface ServicePurchaseFormProps {
  resourceTemplate: RsResourceTemplate
  operator: BuilderProfileState
  services: RsServiceOffering[]
}

export default function ServicePurchaseForm({
  resourceTemplate,
  operator,
  services,
}: Readonly<ServicePurchaseFormProps>) {
  const defaultActivePlan = services[0].tiers[1].name
  const { activeStep, goToStep } = useServicePurchaseStep()
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
      enabledSections: {},
    },
  })

  const { control, setValue } = form

  // TODO: the operatorId is not in the URL, is this necessary?
  // Sync operatorId from URL query state
  useEffect(() => {
    if (!operatorIdFromUrl) return
    setValue('operatorId', operatorIdFromUrl)
    goToStep(ServicePurchaseStep.ConfigureServices)
    void setOperatorIdFromUrl(null)
  }, [operatorIdFromUrl, setValue, goToStep, setOperatorIdFromUrl])

  const selectedPlan = useWatch({ control, name: 'selectedPlan' })
  const enabledSections = useWatch({ control, name: 'enabledSections' })

  const handlePlanChange = useCallback(
    (plan: string) => {
      setValue('selectedPlan', plan)
    },
    [setValue],
  )

  const handleSectionToggle = useCallback(
    (sectionId: string, enabled: boolean) => {
      setValue('enabledSections', {
        ...enabledSections,
        [sectionId]: enabled,
      })
    },
    [enabledSections, setValue],
  )

  const handleConfigureServices = (operatorId: string) => {
    setValue('operatorId', operatorId)
    goToStep(ServicePurchaseStep.ConfigureServices)
  }

  return (
    <Tabs
      value={activeStep}
      onValueChange={(value) => {
        goToStep(value as ServicePurchaseStep)
      }}
      className="w-full gap-8"
    >
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
            <SelectOperator onConfigureServices={handleConfigureServices} operator={operator} />
          )}
          {step.value === ServicePurchaseStep.ConfigureServices && (
            <Suspense fallback={<PricingCalculatorSkeleton />}>
              <ConfigureServices
                selectedPlan={selectedPlan}
                enabledSections={enabledSections}
                onPlanChange={handlePlanChange}
                onSectionToggle={handleSectionToggle}
                servicesData={services[0]}
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
