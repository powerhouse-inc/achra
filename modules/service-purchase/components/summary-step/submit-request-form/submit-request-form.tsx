'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { driveNamePrefix } from '@/modules/sdk'
import { AuthGuard } from '@/modules/shared/components/auth-guard'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { LoginPrompt } from './login-prompt'
import { RequestForm } from './request-form'

function SubmitRequestForm() {
  const { displayName, login } = useRenownAuth()
  const { data: drives } = useUserDrives()

  // The team-admin drive leads the sorted list; prefill the team name with its
  // builder-identity prefix ("vitalik.eth Team Admin" → "vitalik.eth") rather
  // than the full label, so the drive-type suffix doesn't leak into the field.
  const teamName = driveNamePrefix(drives?.[0]?.driveName ?? '')

  return (
    <AuthGuard loginFallback={<LoginPrompt onLogin={login} />}>
      <RequestForm defaultName={displayName ?? ''} defaultTeamName={teamName} />
    </AuthGuard>
  )
}

export { SubmitRequestForm }
