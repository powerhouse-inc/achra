'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'
import { useHasDrive } from '@/modules/my-account/hooks/use-has-drive'
import { type SpinUpPersonaId, useSpinUpDrive } from '@/modules/onboarding/hooks/use-spin-up-drive'
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
import { AlreadyCompletedCard } from './already-completed-card'
import { DoneStep } from './done-step'
import { DriveCheckErrorCard } from './drive-check-error-card'
import { LoginRequiredCard } from './login-required-card'
import { PersonaCard } from './persona-card'
import { SpinUpStep } from './spin-up-step'

const TOTAL_STEPS = 3
const STEP_ESTIMATES = ['~30s', '~10s', ''] as const

type Step = 1 | 2 | 3

function GetStartedFlow() {
  const auth = useRenownAuth()

  // Renown's `"loading"` is the only true pre-init state. `"initial"` is the
  // resting "no session" state for a never-logged-in user and never advances
  // on its own, so treating it as loading would spin forever.
  const isAuthResolving = auth.status === 'loading'
  const isAuthenticated = auth.status === 'authorized' && Boolean(auth.address)

  const hasDriveQuery = useHasDrive()

  // Latches once the user finishes onboarding in this session. Spinning up a
  // drive invalidates the `GetBuilderDrives` query, flipping `hasDriveQuery.data`
  // to true — without this guard that would swap the just-earned DoneStep for the
  // generic "already completed" card the moment the drive is created.
  const [justCompleted, setJustCompleted] = useState(false)

  if (isAuthResolving) {
    return <FullPageSpinner />
  }

  if (!isAuthenticated) {
    return <LoginRequiredCard onLogin={auth.login} />
  }

  if (hasDriveQuery.isPending) {
    return <FullPageSpinner />
  }

  if (hasDriveQuery.isError) {
    return <DriveCheckErrorCard onRetry={() => void hasDriveQuery.refetch()} />
  }

  if (hasDriveQuery.data && !justCompleted) {
    return <AlreadyCompletedCard />
  }

  return (
    <OnboardingSteps
      onComplete={() => {
        setJustCompleted(true)
      }}
    />
  )
}

function FullPageSpinner() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <Loader2 className="text-muted-foreground size-6 animate-spin" aria-hidden="true" />
    </div>
  )
}

interface OnboardingStepsProps {
  onComplete: () => void
}

function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const auth = useRenownAuth()
  const [step, setStep] = useState<Step>(1)
  const [createdDrive, setCreatedDrive] = useState<BuilderDriveLink | null>(null)

  const form = useForm<StepOneValues>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      personaId: undefined as unknown as PersonaId,
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
  const isFormValid = stepOneSchema.safeParse(watched).success

  const { mutate: spinUpMutate, isError: spinUpFailed, error: spinUpError } = useSpinUpDrive()

  // Triggered by the Continue button (and the retry button) — an event handler,
  // not a mount effect — so React Strict Mode can't double-invoke it into two
  // drives. Step transitions live in the mutation's `onSuccess` callback.
  const submitSpinUp = useCallback(() => {
    // `personaId` is narrowed at the schema boundary: stepOneSchema rejects
    // 'organization', so by submit time it must be a SpinUpPersonaId.
    const personaId = form.getValues('personaId') as SpinUpPersonaId
    const name = form.getValues('displayName')
    setStep(2)
    spinUpMutate(
      { personaId, name },
      {
        onSuccess: (drive) => {
          setCreatedDrive(drive)
          onComplete()
          setStep(3)
        },
      },
    )
  }, [form, spinUpMutate, onComplete])

  const handleBackToStepOne = useCallback(() => {
    setStep(1)
  }, [])

  if (step === 3) {
    return (
      <div className="flex flex-col gap-6">
        <OnboardingProgress step={3} estimate={STEP_ESTIMATES[2]} />
        <DoneStep drive={createdDrive} />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-6">
        <OnboardingProgress step={2} estimate={STEP_ESTIMATES[1]} />
        <SpinUpStep
          isError={spinUpFailed}
          error={spinUpError}
          onRetry={submitSpinUp}
          onBack={handleBackToStepOne}
        />
      </div>
    )
  }

  function handlePersonaSelect(id: PersonaId) {
    form.setValue('personaId', id, { shouldValidate: true, shouldTouch: true })
  }

  function onSubmit() {
    submitSpinUp()
  }

  return (
    <div className="flex flex-col gap-6">
      <OnboardingProgress step={1} estimate={STEP_ESTIMATES[0]} />

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

            <div className="bg-muted/40 border-border flex flex-col items-stretch gap-4 border-t px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Stepper currentStep={1} />
              <Button type="submit" disabled={!isFormValid} className="gap-2 sm:w-fit">
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
      {estimate ? <span>{estimate}</span> : null}
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
