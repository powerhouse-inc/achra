'use client'
import { BookOpenCheck, BookOpenText, CheckCheck, FileText, InfoIcon } from 'lucide-react'
import { Fragment, startTransition, useActionState, useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { submitServiceRequestAction } from '@/modules/services/actions/service-request-actions'
import type { ServiceRequestFormState } from '@/modules/services/config/types'

import {
  STEPS,
  type StepValue,
  useServicePurchaseStep,
} from '@/modules/services/context/service-purchase-step-context'
import { Button } from '@/modules/shared/components/ui/button'
import { Form } from '@/modules/shared/components/ui/form'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { cn } from '@/modules/shared/lib/utils'
import SelectServices from '../select-services-purchase/components/select-services/select-services'
import { Plan } from '../select-services-purchase/components/types'
import { SummarySection } from '../summary/summary-section'
import Confirmation from './components/confirmation/confirmation'
import ProductInfo from './components/product-info/product-info'
import SelectOperator from './components/select-operator/select-operator'
import ServiceInfo from './components/service-info/service-info'

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
  'product-info': <InfoIcon className="size-6" />,
  'select-operator': <FileText className="size-6" />,
  'select-services': <BookOpenCheck className="size-6" />,
  summary: <BookOpenText className="size-6" />,
  confirmation: <CheckCheck className="size-6" />,
}

export interface ServicePurchaseFormValues {
  operatorId?: string
  name: string
  email: string
  legalEntity: string
  teamStructure: string
  anonymityLevel: string
  selectedPlan: Plan
  enabledSections: Record<SectionId, boolean>
}

export default function ServicePurchaseForm() {
  const [state, formAction, isPending] = useActionState(submitServiceRequestAction, initialState)

  const form = useForm<ServicePurchaseFormValues>({
    defaultValues: {
      operatorId: undefined,
      name: '',
      email: '',
      legalEntity: 'Swiss Association',
      teamStructure: 'Remote Team',
      anonymityLevel: 'High (Standard)',
      selectedPlan: Plan.Team,
      enabledSections: INITIAL_ENABLED_SECTIONS,
    },
  })
  const { activeStep, visitedSteps, goToStep, goBack } = useServicePurchaseStep()

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
    navigateToStep('select-services')
  }

  const handleGoBack = () => {
    goBack()
  }

  const onSubmit = (data: ServicePurchaseFormValues) => {
    // Improve this once real data its available
    const formData = new FormData()
    formData.append('name', data.name)
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
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event)
        }}
      >
        <div className="flex flex-col gap-8">
          <div className={cn('flex w-full justify-end', activeStep !== 'product-info' && 'hidden')}>
            <Button variant="default" onClick={handleSelectAnOperator}>
              Select an operator
            </Button>
          </div>
          <div className={cn('flex flex-col gap-8', activeStep === 'product-info' && 'gap-0')}>
            <Button
              variant="secondary"
              onClick={handleGoBack}
              className={cn('w-fit', activeStep === 'product-info' && 'hidden')}
            >
              Back
            </Button>
            <ServiceInfo light={activeStep !== 'product-info'} />
          </div>
          <Tabs
            value={activeStep}
            onValueChange={(value) => {
              goToStep(value as StepValue)
            }}
            className="w-full gap-8"
          >
            <TabsList className="h-fit w-full justify-between bg-transparent p-0">
              {STEPS.map((step, index) => {
                const isActive = activeStep === step.value
                const isVisited = visitedSteps.includes(step.value)

                return (
                  <Fragment key={step.value}>
                    <TabsTrigger
                      value={step.value}
                      className="flex h-12 w-fit flex-none items-center gap-0 overflow-hidden px-0 py-0 data-[state=active]:shadow-none dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none"
                    >
                      <div
                        className={cn(
                          'bg-border text-foreground/50 w-fit rounded-l-xl p-3 text-center text-lg/6 font-semibold',
                          isActive && 'bg-primary text-primary-foreground',
                          isVisited && !isActive && 'bg-primary/70 text-primary-foreground',
                        )}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={cn(
                          'text-foreground/50 border-border flex h-full items-center gap-2 rounded-r-xl border px-3',
                          isActive && 'text-primary border-primary dark:border-primary',
                          isVisited && !isActive && 'text-primary/70 border-primary/30',
                        )}
                      >
                        {STEP_ICONS[step.value]}
                        <span className="text-xl/6 font-bold">{step.label}</span>
                      </div>
                    </TabsTrigger>
                    {index < STEPS.length - 1 && (
                      <Separator
                        orientation="horizontal"
                        className={cn(
                          'bg-border h-0.5! w-8!',
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
                {step.value === 'select-services' && (
                  <SelectServices
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    onPlanChange={handlePlanChange}
                    onSectionToggle={handleSectionToggle}
                    onBack={() => {
                      navigateToStep('select-operator')
                    }}
                    onContinue={() => {
                      navigateToStep('summary')
                    }}
                  />
                )}
                {step.value === 'summary' && (
                  <SummarySection
                    selectedPlan={selectedPlan}
                    enabledSections={enabledSections}
                    onBack={() => {
                      navigateToStep('select-services')
                    }}
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
