'use client'

import { useForm, useWatch } from 'react-hook-form'

import { Form } from '@/modules/shared/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'

const STEPS = [
  { value: 'product-info', label: 'Product Info' },
  { value: 'select-operator', label: 'Select Operator' },
  { value: 'select-services', label: 'Select Services' },
  { value: 'summary', label: 'Summary' },
  { value: 'confirmation', label: 'Confirmation' },
] as const

type StepValue = (typeof STEPS)[number]['value']

export default function ServicePurchaseForm() {
  const form = useForm<{ step: StepValue }>({
    defaultValues: { step: STEPS[0].value },
  })

  const activeStep = useWatch({
    control: form.control,
    name: 'step',
  })

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
                className="group flex flex-col items-center gap-2 px-6 py-0 data-[state=active]:shadow-none"
              >
                <div className="group-data-[state=active]:bg-primary border-primary border-width-2 size-6 rounded-full border" />
                <span className="text-foreground/50 group-data-[state=active]:text-foreground text-xl/6 font-bold">
                  {step.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {STEPS.map((step) => (
            <TabsContent key={step.value} value={step.value} className="m-0">
              <p className="text-muted-foreground text-sm">{step.label} form content goes here.</p>
            </TabsContent>
          ))}
        </Tabs>
      </form>
    </Form>
  )
}
