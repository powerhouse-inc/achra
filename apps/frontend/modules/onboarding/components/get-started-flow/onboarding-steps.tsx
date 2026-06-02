'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'
import { type SpinUpPersonaId, useSpinUpDrive } from '@/modules/onboarding/hooks/use-spin-up-drive'
import { TOTAL_STEPS } from '@/modules/onboarding/lib/constants'
import type { PersonaId } from '@/modules/onboarding/lib/personas'
import { stepOneSchema, type StepOneValues } from '@/modules/onboarding/lib/schemas'
import { ChooseRoleStep } from './choose-role-step'
import { DoneStep } from './done-step'
import { OnboardingShell } from './onboarding-shell'
import { SpinUpStep } from './spin-up-step'

type Phase = 'choose-role' | 'spinning-up' | 'done'

interface OnboardingStepsProps {
  onComplete: () => void
}

function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const auth = useRenownAuth()
  const [phase, setPhase] = useState<Phase>('choose-role')
  const [createdDrive, setCreatedDrive] = useState<BuilderDriveLink | null>(null)

  // The form lives here, above the per-phase content, so its values survive when
  // the user bounces to the spin-up view and back (e.g. after a retry).
  const form = useForm<StepOneValues>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      personaId: undefined as unknown as PersonaId,
      displayName: '',
    },
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

  const {
    mutate: spinUpMutate,
    isPending: spinUpPending,
    isError: spinUpFailed,
    error: spinUpError,
  } = useSpinUpDrive()

  // Triggered by the Continue button (and the retry button) — an event handler,
  // not a mount effect — so React Strict Mode can't double-invoke it into two
  // drives. Phase transitions live in the mutation's `onSuccess` callback.
  const submitSpinUp = useCallback(() => {
    // `personaId` is narrowed at the schema boundary: stepOneSchema rejects
    // 'organization', so by submit time it must be a SpinUpPersonaId.
    const personaId = form.getValues('personaId') as SpinUpPersonaId
    const name = form.getValues('displayName')
    setPhase('spinning-up')
    spinUpMutate(
      // `ensName` is the fallback prefix for builders who leave the name field
      // empty — the drive is labelled with their ENS over a bare wallet address.
      { personaId, name, ensName: auth.ensName },
      {
        onSuccess: (drive) => {
          setCreatedDrive(drive)
          onComplete()
          setPhase('done')
        },
      },
    )
  }, [form, spinUpMutate, onComplete, auth.ensName])

  const handleBackToChooseRole = useCallback(() => {
    setPhase('choose-role')
  }, [])

  // Creating the drive is step 3 in progress, so the stepper marks it active and
  // shows a spinner. Once it succeeds, currentStep passes the last step so every
  // node — including step 3 — renders as done.
  const currentStep = phase === 'done' ? TOTAL_STEPS + 1 : phase === 'spinning-up' ? TOTAL_STEPS : 2
  const isCreatingDrive = phase === 'spinning-up' && spinUpPending

  return (
    <OnboardingShell currentStep={currentStep} loading={isCreatingDrive}>
      {phase === 'done' ? (
        <DoneStep drive={createdDrive} />
      ) : phase === 'spinning-up' ? (
        <SpinUpStep
          isError={spinUpFailed}
          error={spinUpError}
          onRetry={submitSpinUp}
          onBack={handleBackToChooseRole}
        />
      ) : (
        <ChooseRoleStep form={form} onSubmit={submitSpinUp} />
      )}
    </OnboardingShell>
  )
}

export { OnboardingSteps }
