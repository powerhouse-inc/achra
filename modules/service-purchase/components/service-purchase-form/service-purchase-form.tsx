'use client'
import { useSearchParams } from 'next/navigation'
import { startTransition, Suspense, useActionState, useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type {
  BuilderProfile_BuilderProfileState,
  ResourceTemplate_ResourceTemplateState,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
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
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { PricingCalculatorSkeleton } from '../configure-services-purchase/components/service-catalog/pricing-calculator'
import { SummarySection } from '../summary'
import Confirmation from './components/confirmation/confirmation'
import ProductInfo from './components/product-info/product-info'
import SelectOperator from './components/select-operator/select-operator'
import { StepsTriggersList } from './components/steps-trigger/steps-triggers-list'

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
  selectedPlan?: string
  enabledSections: Record<string, boolean>
}

export interface ServicePurchaseFormProps {
  resourceTemplate: ResourceTemplate_ResourceTemplateState
  operator: BuilderProfile_BuilderProfileState
  services: RsServiceOffering[]
}

export default function ServicePurchaseForm({
  resourceTemplate,
  operator,
  services,
}: Readonly<ServicePurchaseFormProps>) {
  const [state, formAction, isPending] = useActionState(submitServiceRequestAction, initialState)
  const { activeStep, goToStep, goBack } = useServicePurchaseStep()
  const operatorIdFromUrl = useSearchParams().get('operatorId')

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

  // Handle server response: navigate on success, reset dirty state on error
  useEffect(() => {
    if (state.success) {
      goToStep('confirmation')
    } else if (state.error || state.fieldErrors) {
      // Reset dirty state after failed submission so dirtyFields tracks changes since this submission
      form.reset(form.getValues(), { keepValues: true, keepErrors: true, keepDirty: false })
    }
  }, [state, goToStep, form])

  // Sync operatorId from URL only when it changes (primitive dependency to avoid render loop)
  useEffect(() => {
    if (!operatorIdFromUrl) return
    setValue('operatorId', operatorIdFromUrl)
    goToStep('configure-services')
  }, [operatorIdFromUrl, setValue, goToStep])

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

  const onSubmit = (data: ServicePurchaseFormValues) => {
    // Improve this once real data its available
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('teamName', data.teamName)
    formData.append('operatorId', data.operatorId ?? '')
    formData.append('email', data.email)
    formData.append('selectedPlan', data.selectedPlan ?? '')
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
                  <SelectOperator
                    onConfigureServices={handleConfigureServices}
                    operator={operator}
                  />
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
                {step.value === 'summary' && (
                  <SummarySection
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    actionState={state}
                    isPending={isPending}
                    servicesData={services[0]}
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
