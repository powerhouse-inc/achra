'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { AuthGuard } from '@/modules/shared/components/auth-guard'
import { LoginPrompt } from './login-prompt'
import { RequestForm } from './request-form'

function SubmitRequestForm() {
  const { address, login } = useRenownAuth()

  return (
    <AuthGuard loginFallback={<LoginPrompt onLogin={login} />}>
      <RequestForm ethereumAddress={address ?? ''} />
    </AuthGuard>
  )
}

export { SubmitRequestForm }
