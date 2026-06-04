'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useOperatorDrive } from '@/modules/shared/hooks/use-operator-drive'
import { useTeamAdminDrive } from '@/modules/shared/hooks/use-team-admin-drive'
import { AlreadyCompletedCard } from './already-completed-card'
import { AlreadyOperatorCard } from './already-operator-card'
import { ConnectAccountStep } from './connect-account-step'
import { DriveCheckErrorCard } from './drive-check-error-card'
import { FullPageSpinner } from './full-page-spinner'
import { OnboardingShell } from './onboarding-shell'
import { OnboardingSteps } from './onboarding-steps'
import { UpgradeToOperatorCard } from './upgrade-to-operator-card'

// Bridges the operator intent across Renown's login, which does a full-page
// redirect that drops the query string (see the `operatorIntent` handling below).
const INTENT_KEY = 'achra:offer-services-intent'

function GetStartedFlow() {
  const auth = useRenownAuth()
  const searchParams = useSearchParams()

  // Renown's `"loading"` is the only true pre-init state. `"initial"` is the
  // resting "no session" state for a never-logged-in user and never advances
  // on its own, so treating it as loading would spin forever.
  const isAuthResolving = auth.status === 'loading'
  const isAuthenticated = auth.status === 'authorized' && Boolean(auth.address)

  const { drivesQuery, hasTeamAdminDrive } = useTeamAdminDrive()
  const { operatorDrive, hasOperatorDrive } = useOperatorDrive()

  // Operator intent comes from the hero's "Offer Services" link
  // (`/get-started?intent=operator`). `auth.login` does a full-page redirect to
  // Renown that returns to a bare pathname, so the query string is gone for the
  // (unauthenticated) new-user case. Bridge it through sessionStorage: rehydrate
  // from the param or storage (lazy init avoids a flicker for already-auth'd
  // users), persist on the pre-login visit, and clear once it's back in state.
  const [operatorIntent] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      searchParams.get('intent') === 'operator' ||
      window.sessionStorage.getItem(INTENT_KEY) === 'operator'
    )
  })

  useEffect(() => {
    if (searchParams.get('intent') === 'operator') {
      window.sessionStorage.setItem(INTENT_KEY, 'operator')
    } else if (operatorIntent) {
      // Back from login (param gone) with intent now in state — clear it so a
      // later plain visit to /get-started isn't treated as operator intent.
      window.sessionStorage.removeItem(INTENT_KEY)
    }
  }, [searchParams, operatorIntent])

  // Tracks if onboarding was just completed in this session, preventing the UI
  // from showing the "already completed" message right after drive creation.
  const [justCompleted, setJustCompleted] = useState(false)

  // The upgrade dialog's open state lives here so a successful upgrade — which
  // refetches the drives list and flips `hasOperatorDrive` — can't swap the
  // upgrade card for the "already operator" card while the dialog is still open.
  const [upgradeOpen, setUpgradeOpen] = useState(false)

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
    // Operator intent (from the hero): show the operator-aware result instead of
    // the generic "already completed" card.
    if (operatorIntent) {
      if (hasOperatorDrive && !upgradeOpen) {
        return (
          <div className="mx-auto w-full max-w-xl">
            <AlreadyOperatorCard operatorDriveLink={operatorDrive?.driveLink} />
          </div>
        )
      }
      return (
        <div className="mx-auto w-full max-w-xl">
          <UpgradeToOperatorCard open={upgradeOpen} onOpenChange={setUpgradeOpen} />
        </div>
      )
    }

    return (
      <div className="mx-auto w-full max-w-xl">
        <AlreadyCompletedCard />
      </div>
    )
  }

  return (
    <OnboardingSteps
      defaultPersonaId={operatorIntent ? 'operator' : undefined}
      onComplete={() => {
        setJustCompleted(true)
      }}
    />
  )
}

export { GetStartedFlow }
