'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { AuthGuardLoadingFallback } from './auth-guard-loading-fallback'
import { AuthGuardLoginFallback } from './auth-guard-login-fallback'
import type { ReactNode } from 'react'

const DEFAULT_LOADING_FALLBACK = <AuthGuardLoadingFallback />
const DEFAULT_LOGIN_FALLBACK = <AuthGuardLoginFallback />

interface AuthGuardProps {
  /** Content rendered only once the user is authenticated. */
  children: ReactNode
  /** Shown while auth state is still resolving. Defaults to a centered spinner. */
  loadingFallback?: ReactNode
  /** Shown when the user is settled-unauthenticated. Defaults to a sign-in card. */
  loginFallback?: ReactNode
}

function AuthGuard({
  children,
  loadingFallback = DEFAULT_LOADING_FALLBACK,
  loginFallback = DEFAULT_LOGIN_FALLBACK,
}: AuthGuardProps): ReactNode {
  const { status, address } = useRenownAuth()

  // `undefined`/`loading`/`checking` are transient pre-resolution states. They
  // advance on their own, so showing the login fallback during them would flash
  // a "sign in" card at an already-authenticated user on every refresh — the
  // exact failure this guard exists to prevent. `initial`/`not-authorized` are
  // settled unauthenticated states.
  const isResolving = status === undefined || status === 'loading' || status === 'checking'
  const isAuthenticated = status === 'authorized' && Boolean(address)

  if (isResolving) return loadingFallback
  if (!isAuthenticated) return loginFallback
  return children
}

export { AuthGuard }
export type { AuthGuardProps }
