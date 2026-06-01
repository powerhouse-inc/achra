'use client'

import { useRenown, useRenownAuth } from '@powerhousedao/reactor-browser'
import type { ISigner } from 'document-model'

export type AuthState =
  | { status: 'authenticated'; address: string; signer: ISigner }
  | { status: 'unauthenticated' }
  | { status: 'pending' }

/**
 * Source of truth for "is the user signed in and able to sign actions?".
 *
 * The discriminated union forces consumers to handle `pending` explicitly,
 * which fixes the historical bug where `authorized` was checked but the
 * signer hadn't hydrated yet.
 */
export function useAuth(): AuthState {
  const renown = useRenown()
  const auth = useRenownAuth()

  if (auth.status === 'loading' || auth.status === 'checking') {
    return { status: 'pending' }
  }

  if (auth.status !== 'authorized' || !auth.address) {
    return { status: 'unauthenticated' }
  }

  const signer = (renown?.signer as ISigner | null | undefined) ?? null
  if (!signer) {
    return { status: 'pending' }
  }

  return {
    status: 'authenticated',
    address: auth.address,
    signer,
  }
}

/** Convenience boolean — true only when the user can sign actions right now. */
export function useIsAuthenticated(): boolean {
  return useAuth().status === 'authenticated'
}
