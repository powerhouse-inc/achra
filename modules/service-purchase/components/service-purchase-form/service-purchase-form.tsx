'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { Suspense, useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type {
  BuilderProfileState,
  RsResourceTemplate,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  STEPS,
  type StepValue,
  useServicePurchaseStep,
} from '@/modules/services/context/service-purchase-step-context'
import { ServiceInfo } from '@/modules/shared/components/service-info'
import { Button } from '@/modules/shared/components/ui/button'
import { Tabs, TabsContent } from '@/modules/shared/components/ui/tabs'
import { cn } from '@/modules/shared/lib/utils'
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { PricingCalculatorSkeleton } from '../configure-services-purchase/components/service-catalog/pricing-calculator'
import { SummaryStep } from '../summary-step'
import Confirmation from './components/confirmation/confirmation'
import ProductInfo from './components/product-info/product-info'
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
  const { activeStep, goToStep, goBack } = useServicePurchaseStep()
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
      selectedPlan: '',
      enabledSections: {},
    },
  })

  const { control, setValue } = form

  // Sync operatorId from URL query state
  useEffect(() => {
    if (!operatorIdFromUrl) return
    setValue('operatorId', operatorIdFromUrl)
    goToStep('configure-services')
    void setOperatorIdFromUrl(null)
  }, [operatorIdFromUrl, setValue, goToStep, setOperatorIdFromUrl])

  const name = useWatch({ control, name: 'name' })
  const email = useWatch({ control, name: 'email' })
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

  // Navigation handlers
  const navigateToStep = (stepValue: StepValue) => {
    goToStep(stepValue)
  }

  const handleSelectAnOperator = () => {
    navigateToStep('select-operator')
  }

  const handleConfigureServices = (operatorId: string) => {
    setValue('operatorId', operatorId)
    navigateToStep('configure-services')
  }

  const handleGoBack = () => {
    goBack()
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className={cn('flex w-full justify-end', activeStep !== 'product-info' && 'hidden')}>
        <Button variant="default" onClick={handleSelectAnOperator}>
          Select an operator
        </Button>
      </div>
      <div className={cn('flex flex-col gap-8', activeStep === 'product-info' && 'gap-0')}>
        <div className="flex">
          <Button
            variant="secondary"
            onClick={handleGoBack}
            className={cn('w-fit', activeStep === 'product-info' && 'hidden')}
          >
            Back
          </Button>

          <div
            className={cn(
              'flex w-full items-start justify-end',
              activeStep !== 'configure-services' && 'hidden',
            )}
          >
            <Button
              variant="default"
              onClick={() => {
                navigateToStep('summary')
              }}
            >
              Continue
            </Button>
          </div>
        </div>
        <ServiceInfo
          id={resourceTemplate.id}
          light={activeStep !== 'product-info'}
          title={resourceTemplate.title}
          summary={resourceTemplate.summary}
          thumbnailUrl={resourceTemplate.thumbnailUrl}
          status={resourceTemplate.status}
        />
      </div>
      <Tabs
        value={activeStep}
        onValueChange={(value) => {
          goToStep(value as StepValue)
        }}
        className="w-full gap-8"
      >
        <StepsTriggersList />
        {STEPS.map((step) => (
          <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
            {step.value === 'product-info' && (
              <ProductInfo
                description={resourceTemplate.description}
                contentSections={resourceTemplate.contentSections}
              />
            )}
            {step.value === 'select-operator' && (
              <SelectOperator onConfigureServices={handleConfigureServices} operator={operator} />
            )}
            {step.value === 'configure-services' && (
              <Suspense fallback={<PricingCalculatorSkeleton />}>
                <ConfigureServices
                  selectedPlan={selectedPlan}
                  enabledSections={enabledSections}
                  onPlanChange={handlePlanChange}
                  onSectionToggle={handleSectionToggle}
                  servicesData={services[0]}
                />
              </Suspense>
            )}
            {step.value === 'summary' && <SummaryStep />}
            {step.value === 'confirmation' && <Confirmation name={name} email={email} />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
