'use client'
import { useCallback, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Form } from '@/modules/shared/components/ui/form'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import ProductInfo from '../product-info/product-info'
import SelectServices from '../select-services-purchase/select-services/select-services'
import type { PricingPlan } from '../select-services-purchase/types'

const STEPS = [
  { value: 'product-info', label: 'Product Info' },
  { value: 'select-operator', label: 'Select Operator' },
  { value: 'select-services', label: 'Select Services' },
  { value: 'summary', label: 'Summary' },
  { value: 'confirmation', label: 'Confirmation' },
] as const

type StepValue = (typeof STEPS)[number]['value']

const STEP_NUMBER_MAP: Record<StepValue, number> = {
  'product-info': 1,
  'select-operator': 2,
  'select-services': 3,
  summary: 4,
  confirmation: 5,
}

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

export default function ServicePurchaseForm() {
  const form = useForm<{ step: StepValue }>({
    defaultValues: { step: STEPS[0].value },
  })

  // Shared state for PricingCalculator selections
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>('team')
  const [enabledSections, setEnabledSections] =
    useState<Record<SectionId, boolean>>(INITIAL_ENABLED_SECTIONS)

  const activeStep = useWatch({
    control: form.control,
    name: 'step',
  })

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
    form.setValue('step', stepValue)
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
        <div className="flex flex-col gap-10">
          <Tabs
            value={activeStep}
            onValueChange={(value) => {
              form.setValue('step', value as StepValue)
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
              <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
                {step.value === 'product-info' && <ProductInfo />}
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
                {!['product-info', 'select-services'].includes(step.value) && (
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
      </form>
    </Form>
  )
}
