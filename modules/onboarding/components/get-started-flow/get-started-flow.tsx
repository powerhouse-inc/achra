'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { type PersonaId, PERSONAS } from '@/modules/onboarding/lib/personas'
import { stepOneSchema, type StepOneValues } from '@/modules/onboarding/lib/schemas'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/shared/components/ui/form'
import { Input } from '@/modules/shared/components/ui/input'
import { Progress } from '@/modules/shared/components/ui/progress'
import { cn } from '@/modules/shared/lib/utils'
import { PersonaCard } from './persona-card'
import { SignInPrompt } from './sign-in-prompt'
import { StepComingSoon } from './step-coming-soon'

const TOTAL_STEPS = 3

type Step = 1 | 2

function GetStartedFlow() {
  const auth = useRenownAuth()
  const isAuthenticated = auth.status === 'authorized' && Boolean(auth.address)
  const [step, setStep] = useState<Step>(1)

  const form = useForm<StepOneValues>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      personaId: undefined as unknown as PersonaId,
      email: '',
      displayName: '',
    },
    mode: 'onTouched',
  })

  // Prefill the display name once we know who the user is. `setValue` with
  // `shouldDirty: false` keeps the form's "untouched" state so validation
  // doesn't fire on first paint.
  useEffect(() => {
    if (!auth.displayName) return
    const current = form.getValues('displayName')
    if (current && current.length > 0) return
    form.setValue('displayName', auth.displayName, { shouldDirty: false, shouldTouch: false })
  }, [auth.displayName, form])

  const watched = useWatch({ control: form.control })
  const selectedPersonaId = watched.personaId
  const selectedPersona = PERSONAS.find((p) => p.id === selectedPersonaId)
  const isFormValid = stepOneSchema.safeParse(watched).success
  const canContinue = isAuthenticated && isFormValid

  if (step === 2 && selectedPersona) {
    return (
      <div className="flex flex-col gap-6">
        <OnboardingProgress step={2} estimate="~10s" />
        <StepComingSoon
          onBack={() => {
            setStep(1)
          }}
          personaTitle={selectedPersona.title}
        />
      </div>
    )
  }

  function handlePersonaSelect(id: PersonaId) {
    form.setValue('personaId', id, { shouldValidate: true, shouldTouch: true })
  }

  function onSubmit() {
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <OnboardingProgress step={1} estimate="~30s" />

      <Card className="gap-0 overflow-hidden py-0">
        <Form {...form}>
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              void form.handleSubmit(onSubmit)(event)
            }}
            className="flex flex-col"
          >
            <div className="px-8 pt-8 pb-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Get started
              </p>
              <h1 className="mt-1.5 text-3xl font-semibold tracking-tight">
                Choose your role on Achra
              </h1>
              <p className="text-muted-foreground mt-2 max-w-lg text-sm">
                We&apos;ll spin up a Connect drive tailored to what you&apos;re here to do.
              </p>
            </div>

            <div className="flex flex-col gap-6 px-8 py-6">
              <FormField
                control={form.control}
                name="personaId"
                render={() => (
                  <FormItem className="gap-3">
                    <div
                      role="radiogroup"
                      aria-label="Choose your role"
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      {PERSONAS.map((persona) => (
                        <PersonaCard
                          key={persona.id}
                          persona={persona}
                          selected={selectedPersonaId === persona.id}
                          onSelect={() => {
                            handlePersonaSelect(persona.id)
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isAuthenticated ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormDescription>We&apos;ll send your drive link here.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="e.g. alex.eth"
                            autoComplete="nickname"
                          />
                        </FormControl>
                        <FormDescription>
                          Shown on your drive and any offerings. Editable later.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <SignInPrompt onSignIn={auth.login} />
              )}
            </div>

            <div className="bg-muted/40 border-border flex flex-col items-stretch gap-4 border-t px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Stepper currentStep={1} />
              <Button type="submit" disabled={!canContinue} className="gap-2 sm:w-fit">
                Continue
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

interface OnboardingProgressProps {
  step: number
  estimate: string
}

function OnboardingProgress({ step, estimate }: OnboardingProgressProps) {
  const percent = Math.round((step / TOTAL_STEPS) * 100)
  return (
    <div className="text-muted-foreground flex items-center gap-3 text-xs">
      <span className="font-medium">
        Step {step} of {TOTAL_STEPS}
      </span>
      <Progress value={percent} className="h-1 flex-1" />
      <span>{estimate}</span>
    </div>
  )
}

interface StepperProps {
  currentStep: number
}

function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      {Array.from({ length: TOTAL_STEPS }, (_, index) => index + 1).map((step) => {
        const isDone = step < currentStep
        const isActive = step === currentStep
        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={cn(
                'flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold',
                isActive && 'border-primary bg-primary text-primary-foreground',
                isDone && 'border-status-success bg-status-success text-white',
                !isActive && !isDone && 'border-input bg-background',
              )}
            >
              {isDone ? <Check className="size-3" aria-hidden="true" /> : step}
            </span>
            {step < TOTAL_STEPS ? <span className="bg-border h-px w-6" aria-hidden="true" /> : null}
          </div>
        )
      })}
    </div>
  )
}

export { GetStartedFlow }
