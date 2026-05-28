'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { AuthGuard } from '@/modules/shared/components/auth-guard'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { LoginPrompt } from './login-prompt'
import { RequestForm } from './request-form'

function SubmitRequestForm() {
  const { displayName, login } = useRenownAuth()
  const { data: drives } = useUserDrives()

  return (
    <AuthGuard loginFallback={<LoginPrompt onLogin={login} />}>
      <RequestForm defaultName={displayName ?? ''} defaultTeamName={drives?.[0]?.driveName ?? ''} />
    </AuthGuard>
  )
}

export { SubmitRequestForm }
