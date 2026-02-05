'use client'
import { BookOpenCheck, BookOpenText, CheckCheck, FileText, InfoIcon } from 'lucide-react'
import { Fragment, startTransition, useActionState, useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

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
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { cn } from '@/modules/shared/lib/utils'
import ConfigureServices from '../configure-services-purchase/components/configure-services/configure-services'
import { Plan } from '../configure-services-purchase/components/types'
import { SummarySection } from '../summary/summary-section'
import Confirmation from './components/confirmation/confirmation'
import ProductInfo from './components/product-info/product-info'
import SelectOperator from './components/select-operator/select-operator'

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

const STEP_ICONS = {
  'product-info': <InfoIcon className="size-4 lg:size-6" />,
  'select-operator': <FileText className="size-4 lg:size-6" />,
  'configure-services': <BookOpenCheck className="size-4 lg:size-6" />,
  summary: <BookOpenText className="size-4 lg:size-6" />,
  confirmation: <CheckCheck className="size-4 lg:size-6" />,
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

export default function ServicePurchaseForm() {
  const [state, formAction, isPending] = useActionState(submitServiceRequestAction, initialState)
  const { activeStep, visitedSteps, goToStep, goBack } = useServicePurchaseStep()

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

            <ServiceInfo light={activeStep !== 'product-info'} />
          </div>
          <Tabs
            value={activeStep}
            onValueChange={(value) => {
              goToStep(value as StepValue)
            }}
            className="w-full gap-8"
          >
            <TabsList className="h-fit w-full justify-center bg-transparent p-0 md:justify-between">
              {STEPS.map((step, index) => {
                const isActive = activeStep === step.value
                const isVisited = visitedSteps.includes(step.value)

                return (
                  <Fragment key={step.value}>
                    <TabsTrigger
                      value={step.value}
                      className="flex h-8 w-8 flex-none items-center gap-0 overflow-hidden px-0 py-0 data-[state=active]:shadow-none md:h-6.5 md:w-fit lg:h-10 2xl:h-12 dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none"
                    >
                      <div
                        className={cn(
                          'bg-border text-foreground/50 w-full rounded-l-full rounded-r-full p-1 text-center text-xs/5.5 font-semibold md:w-fit md:rounded-l-lg md:rounded-r-none lg:p-2.75 lg:text-base/6 2xl:rounded-l-xl 2xl:p-3 2xl:text-lg/6',
                          isActive && 'bg-primary text-primary-foreground',
                          isVisited && !isActive && 'bg-primary/70 text-primary-foreground',
                        )}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={cn(
                          'text-foreground/50 border-border hidden h-full items-center gap-1 rounded-r-lg border px-1 md:flex xl:px-2 2xl:gap-2 2xl:rounded-r-xl 2xl:px-3',
                          isActive && 'text-primary border-primary dark:border-primary',
                          isVisited && !isActive && 'text-primary/70 border-primary/30',
                        )}
                      >
                        {STEP_ICONS[step.value]}
                        <span className="text-xs/4.5 font-medium lg:text-base/6 lg:font-semibold 2xl:text-xl/6 2xl:font-bold">
                          {step.label}
                        </span>
                      </div>
                    </TabsTrigger>
                    {index < STEPS.length - 1 && (
                      <Separator
                        orientation="horizontal"
                        className={cn(
                          'bg-border mx-1 h-0.5! max-w-8! flex-1',
                          visitedSteps.includes(STEPS[index + 1].value) && 'bg-primary',
                        )}
                      />
                    )}
                  </Fragment>
                )
              })}
            </TabsList>

            {STEPS.map((step) => (
              <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
                {step.value === 'product-info' && <ProductInfo />}
                {step.value === 'select-operator' && (
                  <SelectOperator onSelectServices={handleSelectServices} />
                )}
                {step.value === 'configure-services' && (
                  <ConfigureServices
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    onPlanChange={handlePlanChange}
                    onSectionToggle={handleSectionToggle}
                  />
                )}
                {step.value === 'summary' && (
                  <SummarySection
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    actionState={state}
                    isPending={isPending}
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
