'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { AuthGuard } from '@/modules/shared/components/auth-guard'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'
import { LoginPrompt } from './login-prompt'
import { RequestForm } from './request-form'
import { SubmitRequestFormSkeleton } from './submit-request-form-skeleton'

function SubmitRequestForm() {
  const { login } = useRenownAuth()
  const { drivesQuery, profileQuery, teamAdminDrive } = useMyBuilderProfile()

  // If the user already has a team-admin drive, the team name is set and its input
  // is hidden; if not, they enter a team name to create a new workspace. This
  // loading check waits only for drives if no profile is needed.
  const isResolving = drivesQuery.isLoading || profileQuery.isLoading

  return (
    <AuthGuard loginFallback={<LoginPrompt onLogin={login} />}>
      {isResolving ? (
        <SubmitRequestFormSkeleton />
      ) : (
        <RequestForm
          defaultName={profileQuery.data?.name ?? ''}
          defaultTeamName={teamAdminDrive?.driveName ?? ''}
        />
      )}
    </AuthGuard>
  )
}

export { SubmitRequestForm }
