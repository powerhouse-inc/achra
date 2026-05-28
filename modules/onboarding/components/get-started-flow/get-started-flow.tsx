'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useState } from 'react'
import { useHasDrive } from '@/modules/my-account/hooks/use-has-drive'
import { AlreadyCompletedCard } from './already-completed-card'
import { ConnectAccountStep } from './connect-account-step'
import { DriveCheckErrorCard } from './drive-check-error-card'
import { FullPageSpinner } from './full-page-spinner'
import { OnboardingShell } from './onboarding-shell'
import { OnboardingSteps } from './onboarding-steps'

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

  // Step 1 of the stepper: until the wallet is connected, the shell shows the
  // login CTA with "Connect your account" active.
  if (!isAuthenticated) {
    return (
      <OnboardingShell currentStep={1}>
        <ConnectAccountStep onLogin={auth.login} />
      </OnboardingShell>
    )
  }

  if (hasDriveQuery.isPending) {
    return <FullPageSpinner />
  }

  if (hasDriveQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <DriveCheckErrorCard onRetry={() => void hasDriveQuery.refetch()} />
      </div>
    )
  }

  if (hasDriveQuery.data && !justCompleted) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <AlreadyCompletedCard />
      </div>
    )
  }

  return (
    <OnboardingSteps
      onComplete={() => {
        setJustCompleted(true)
      }}
    />
  )
}

export { GetStartedFlow }
