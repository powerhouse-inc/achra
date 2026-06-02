'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useState } from 'react'
import { useTeamAdminDrive } from '@/modules/shared/hooks/use-team-admin-drive'
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

  const { drivesQuery, hasTeamAdminDrive } = useTeamAdminDrive()

  // Tracks if onboarding was just completed in this session, preventing the UI
  // from showing the "already completed" message right after drive creation.
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

  if (drivesQuery.isPending) {
    return <FullPageSpinner />
  }

  if (drivesQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <DriveCheckErrorCard onRetry={() => void drivesQuery.refetch()} />
      </div>
    )
  }

  if (hasTeamAdminDrive && !justCompleted) {
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
