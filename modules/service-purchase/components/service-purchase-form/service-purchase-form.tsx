'use client'
import { startTransition, Suspense, useActionState, useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type { ResourceTemplate_ResourceTemplateState } from '@/modules/__generated__/graphql/switchboard-generated'
import { submitServiceRequestAction } from '@/modules/services/actions/service-request-actions'
import type { ServiceRequestFormState } from '@/modules/services/config/types'

import {
  STEPS,
  type StepValue,
  useServicePurchaseStep,
} from '@/modules/services/context/service-purchase-step-context'
import { ServiceInfo } from '@/modules/shared/components/service-info'
import { Button } from '@/modules/shared/components/ui/button'
import { Form } from '@/modules/shared/components/ui/form'
import { Tabs, TabsContent } from '@/modules/shared/components/ui/tabs'
import { cn } from '@/modules/shared/lib/utils'
import { SERVICES_DATA } from '../../mock/mock-data'
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { PricingCalculatorSkeleton } from '../configure-services-purchase/components/service-catalog/pricing-calculator'
import { Plan } from '../configure-services-purchase/components/types'
import { SummarySection } from '../summary/summary-section'
import Confirmation from './components/confirmation/confirmation'
import ProductInfo from './components/product-info/product-info'
import SelectOperator from './components/select-operator/select-operator'
import { StepsTriggersList } from './components/steps-trigger/steps-triggers-list'

export const SECTION_IDS = {
  LEGAL_SETUP: 'legal-setup',
  RECURRING_OPERATIONAL: 'recurring-operational',
  FINANCE_PACK: 'finance-pack',
  HOSTING_SUITE: 'hosting-suite',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

const INITIAL_ENABLED_SECTIONS: Record<SectionId, boolean> = {
  [SECTION_IDS.LEGAL_SETUP]: true,
  [SECTION_IDS.RECURRING_OPERATIONAL]: true,
  [SECTION_IDS.FINANCE_PACK]: true,
  [SECTION_IDS.HOSTING_SUITE]: false,
}

const initialState: ServiceRequestFormState = {
  success: false,
}

export interface ServicePurchaseFormValues {
  operatorId?: string
  name: string
  teamName: string
  email: string
  legalEntity: string
  teamStructure: string
  anonymityLevel: string
  selectedPlan: Plan
  enabledSections: Record<SectionId, boolean>
}

export interface ServicePurchaseFormProps {
  resourceTemplate: ResourceTemplate_ResourceTemplateState
}

export default function ServicePurchaseForm({ resourceTemplate }: ServicePurchaseFormProps) {
  const [state, formAction, isPending] = useActionState(submitServiceRequestAction, initialState)
  const { activeStep, goToStep, goBack } = useServicePurchaseStep()

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
      selectedPlan: Plan.Team,
      enabledSections: INITIAL_ENABLED_SECTIONS,
    },
  })

  // Handle server response: navigate on success, reset dirty state on error
  useEffect(() => {
    if (state.success) {
      goToStep('confirmation')
    } else if (state.error || state.fieldErrors) {
      // Reset dirty state after failed submission so dirtyFields tracks changes since this submission
      form.reset(form.getValues(), { keepValues: true, keepErrors: true, keepDirty: false })
    }
  }, [state, goToStep, form])

  const { control, setValue } = form

  const name = useWatch({ control, name: 'name' })
  const email = useWatch({ control, name: 'email' })
  const selectedPlan = useWatch({ control, name: 'selectedPlan' })
  const enabledSections = useWatch({ control, name: 'enabledSections' })

  const handlePlanChange = useCallback(
    (plan: Plan) => {
      setValue('selectedPlan', plan)
    },
    [setValue],
  )

  const handleSectionToggle = useCallback(
    (sectionId: SectionId, enabled: boolean) => {
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

  const handleSelectServices = (operatorId: string) => {
    setValue('operatorId', operatorId)
    navigateToStep('configure-services')
  }

  const handleGoBack = () => {
    goBack()
  }

  const onSubmit = (data: ServicePurchaseFormValues) => {
    // Improve this once real data its available
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('teamName', data.teamName)
    formData.append('operatorId', data.operatorId ?? '')
    formData.append('email', data.email)
    formData.append('selectedPlan', selectedPlan)
    formData.append('enabledSections', JSON.stringify(enabledSections))
    formData.append(
      'configuration',
      JSON.stringify({
        legalEntity: data.legalEntity,
        teamStructure: data.teamStructure,
        anonymityLevel: data.anonymityLevel,
        snoFunction: 'Operational Hub',
      }),
    )

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event)
        }}
      >
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
                  <SelectOperator onSelectServices={handleSelectServices} />
                )}
                {step.value === 'configure-services' && (
                  <Suspense fallback={<PricingCalculatorSkeleton />}>
                    <ConfigureServices
                      selectedPlan={selectedPlan}
                      enabledSections={enabledSections}
                      onPlanChange={handlePlanChange}
                      onSectionToggle={handleSectionToggle}
                    />
                  </Suspense>
                )}
                {step.value === 'summary' && (
                  <SummarySection
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    actionState={state}
                    isPending={isPending}
                    servicesData={SERVICES_DATA}
                  />
                )}
                {step.value === 'confirmation' && <Confirmation name={name} email={email} />}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </form>
    </Form>
  )
}
