'use client'

import { useForm, useWatch } from 'react-hook-form'

import { Form } from '@/modules/shared/components/ui/form'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'

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
              <TabsContent key={step.value} value={step.value} className="m-0 flex flex-col gap-2">
                <p className="text-foreground text-lg/6 font-bold">{step.label}</p>
                <span className="text-foreground text-base/6">
                  Lorem ipsum dolor sit amet consectetur. At risus ipsum tincidunt proin feugiat
                  elit amet. Iaculis adipiscing semper sit ac gravida odio. Turpis faucibus magna eu
                  vel velit. Eleifend rhoncus amet urna in nascetur tellus est tellus proin.
                  Ultrices habitasse viverra turpis quisque sit vel. Pretium sit quam at convallis.
                  Nullam faucibus elementum rhoncus vel luctus. Elementum id dictum condimentum
                  velit. Ultricies nisl et pellentesque aliquet erat suspendisse nulla nec.
                  Pellentesque sed dui et ac tellus blandit quis. Odio nunc lorem elementum purus
                  lobortis commodo. Elementum blandit nulla vulputate est nisi eu aliquam tortor
                  montes. Lectus sagittis massa varius lacus laoreet. Massa ac id euismod eu felis.
                  Malesuada id morbi massa ultricies morbi ipsum sagittis libero felis. Posuere
                  risus justo morbi aliquam elementum nulla egestas volutpat. Mi elit praesent
                  tellus eros felis tortor orci sit. Aliquam nec eget augue habitant in nisi.
                  Fringilla morbi fringilla auctor nunc pulvinar amet turpis in. Sit pulvinar nisl
                  ante tristique quam. Tempor scelerisque ac tincidunt justo. Consequat nec cras
                  elementum egestas tristique. Pharetra aliquet hac proin amet semper vitae velit.
                  Enim odio id elementum lobortis cras justo sit aliquet suspendisse. Mollis nisl
                  nunc in elit in egestas. Porttitor tellus rhoncus felis odio scelerisque. Pulvinar
                  eros gravida viverra sed lobortis enim at sit leo. Ut massa diam proin consequat
                  enim est curabitur. Adipiscing cursus imperdiet sit amet nulla tincidunt viverra
                  ullamcorper eu. Auctor senectus fermentum amet aliquet sed urna pulvinar. Nulla eu
                  nisi risus consequat ut. Aenean mi dictum vel egestas est nunc. Nunc viverra nunc
                  tempus ipsum. Fames ut at in tincidunt viverra hendrerit dui diam. Viverra morbi
                  tellus aliquet in dui metus. Sit proin ullamcorper vitae mauris tempor ante
                  volutpat arcu. Purus imperdiet at placerat elementum risus urna donec. Vitae odio
                  cras in sodales. Mauris orci gravida vitae arcu ornare nunc. Lorem tellus in lorem
                  odio lobortis. Turpis platea morbi et viverra tellus bibendum. Facilisis vel
                  sapien imperdiet nunc congue quisque auctor eu purus. Lorem diam pretium bibendum
                  neque viverra sem nisl adipiscing. Ornare enim lacinia pellentesque fringilla
                  quis. Et donec sodales in consequat morbi. Cursus vulputate tellus neque eu orci
                  ac congue. Gravida nibh non lectus leo tristique diam.
                </span>
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
