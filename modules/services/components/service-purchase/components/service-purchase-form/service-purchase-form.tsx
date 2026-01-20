'use client'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  STEP_NUMBER_MAP,
  STEPS,
  type StepValue,
  useServicePurchaseStep,
} from '@/modules/services/context/service-purchase-step-context'
import { Form } from '@/modules/shared/components/ui/form'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { Summary } from '../../select-services-purchase/summary'
import SelectServices from '../select-services-purchase/select-services/select-services'
import ProductInfo from './components/product-info/product-info'
import SelectOperator from './components/select-operator/select-operator'
import ServiceInfo from './components/service-info/service-info'
import type { PricingPlan } from '../select-services-purchase/types'

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

interface ServicePurchaseFormValues {
  operatorId?: string
}

export default function ServicePurchaseForm() {
  const form = useForm<ServicePurchaseFormValues>({
    defaultValues: {
      operatorId: undefined,
    },
  })
  const { activeStep, goToStep } = useServicePurchaseStep()

  // Shared state for PricingCalculator selections
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>('team')
  const [enabledSections, setEnabledSections] =
    useState<Record<SectionId, boolean>>(INITIAL_ENABLED_SECTIONS)

  const handlePlanChange = useCallback((plan: PricingPlan) => {
    setSelectedPlan(plan)
  }, [])

  const handleSectionToggle = useCallback((sectionId: SectionId, enabled: boolean) => {
    setEnabledSections((prev) => ({
      ...prev,
      [sectionId]: enabled,
    }))
  }, [])

  // Navigation handlers
  const navigateToStep = (stepValue: StepValue) => {
    goToStep(stepValue)
  }

  const handleSelectAnOperator = () => {
    navigateToStep('select-operator')
  }

  const handleSelectServices = (operatorId: string) => {
    form.setValue('operatorId', operatorId)
    navigateToStep('select-services')
  }

  const onSubmit = form.handleSubmit(() => {
    // TODO: replace with real submit handler
  })

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          void onSubmit(event)
        }}
      >
        <div className="flex flex-col gap-6">
          {activeStep === 'product-info' && <ServiceInfo />}
          <div className="flex flex-col gap-10">
            <Tabs
              value={activeStep}
              onValueChange={(value) => {
                goToStep(value as StepValue)
              }}
              className="w-full"
            >
              <TabsList className="h-fit w-full bg-transparent px-18">
                {STEPS.map((step) => (
                  <TabsTrigger
                    key={step.value}
                    value={step.value}
                    className="group flex flex-col items-center gap-2 px-6 py-0 data-[state=active]:shadow-none dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none"
                  >
                    <div className="group-data-[state=active]:bg-primary border-primary border-width-2 size-6 rounded-full border" />
                    <span className="text-foreground/50 group-data-[state=active]:text-foreground text-xl/6 font-bold">
                      {step.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {STEPS.map((step) => (
                <TabsContent
                  key={step.value}
                  value={step.value}
                  className="m-0 flex flex-col gap-2"
                >
                  {step.value === 'product-info' && (
                    <ProductInfo onSelectAnOperator={handleSelectAnOperator} />
                  )}
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
                    <Summary
                      selectedPlan={selectedPlan}
                      enabledSections={enabledSections}
                      onBack={() => {
                        navigateToStep('select-services')
                      }}
                    />
                  )}
                  {!['product-info', 'select-services', 'summary', 'select-operator'].includes(
                    step.value,
                  ) && (
                    <>
                      <p className="text-foreground text-lg/6 font-bold">{step.label}</p>
                      <span className="text-foreground text-base/6">In progress...</span>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
            <div className="flex w-full flex-col gap-2 px-16 pt-2">
              <span className="text-foreground/50 h-fit self-center text-lg/6 font-bold">
                Step <span className="text-foreground">{STEP_NUMBER_MAP[activeStep]}</span> of{' '}
                {STEPS.length}
              </span>
              <Separator />
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
