'use client'

import { useSignedMutation } from '@achra/sdk/react'
import { useQueryClient } from '@tanstack/react-query'
import type { EnsureRolesResult } from '@achra/sdk'

interface BecomeAnOperatorInput {
  /** The builder's display name, so the offering drive is named consistently. */
  name?: string
}

/**
 * Promotes an existing builder to an operator.
 *
 * Idempotent + role-aware: `ensure(['operator'])` detects the already-present
 * builder workspace and skips it — it creates ONLY the service-offering drive
 * and flips `isOperator` on the existing builder profile. No builder duplicate.
 *
 * On success it invalidates the drives lists (so the new offering drive shows
 * up) and the builder profile (so `isOperator` flips and this banner hides).
 */
function useBecomeAnOperator() {
  const queryClient = useQueryClient()

  return useSignedMutation<BecomeAnOperatorInput, EnsureRolesResult>({
    mutationFn: async ({ name }, { signer, address, client }) =>
      client.workspaces.ensure(['operator'], { signer, address, name }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrives'] })
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrivesSuspense'] })
      void queryClient.invalidateQueries({ queryKey: ['BuilderProfile'] })
    },
  })
}

export { useBecomeAnOperator }
export type { BecomeAnOperatorInput }
