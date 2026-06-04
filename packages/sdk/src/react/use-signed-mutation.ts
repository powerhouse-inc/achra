'use client'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { ISigner } from 'document-model'
import type { PowerhouseClient } from '../client/create-client'
import { SDKError } from '../errors'
import { useAuth } from './use-auth'
import { useClient } from './client-context'

export interface SignedContext {
  address: string
  signer: ISigner
  /** The SDK client, so `mutationFn` can call `client.workspaces.*` etc. */
  client: PowerhouseClient
}

export interface UseSignedMutationOptions<TInput, TResult> {
  /**
   * Body of the mutation. Called with a guaranteed-non-null `{ address,
   * signer }` context. Anything thrown inside this function bubbles up to
   * the caller untouched — the SDK does not classify or wrap reactor /
   * network / app errors.
   */
  mutationFn: (input: TInput, ctx: SignedContext) => Promise<TResult>
  onSuccess?: (result: TResult, input: TInput) => void
  onError?: (error: Error, input: TInput) => void
}

/**
 * Wraps `useMutation` with one piece of policy: the mutation is gated on
 * `useAuth().status === 'authenticated'` before `mutationFn` is invoked.
 *
 * If the user is not authenticated when `mutate()` is called, the hook
 * throws an `SDKError` BEFORE entering `mutationFn`. Discriminate with
 * `isSDKError(error)` in the caller:
 *
 * ```ts
 * const { error, mutate } = useSignedMutation({ mutationFn })
 * if (isSDKError(error) && error.code === 'not-authenticated') ...
 * ```
 *
 * The hook does NOT toast, redirect, log, or invalidate queries. App-side
 * policy is wired via the caller's `onSuccess` / `onError` callbacks or
 * by reading the returned mutation state.
 */
export function useSignedMutation<TInput, TResult>(
  options: UseSignedMutationOptions<TInput, TResult>,
): UseMutationResult<TResult, Error, TInput> {
  const auth = useAuth()
  const client = useClient()

  return useMutation<TResult, Error, TInput>({
    mutationFn: async (input) => {
      if (auth.status === 'unauthenticated') {
        throw new SDKError('not-authenticated', 'You must be signed in to perform this action.')
      }
      if (auth.status === 'pending') {
        throw new SDKError(
          'signer-not-ready',
          'Your wallet is still initializing. Please try again in a moment.',
        )
      }
      return options.mutationFn(input, { address: auth.address, signer: auth.signer, client })
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  })
}
