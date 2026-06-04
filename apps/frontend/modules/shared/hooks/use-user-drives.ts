'use client'

import { useClient } from '@achra/sdk/react'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useQuery } from '@tanstack/react-query'

/**
 * The current user's drives, fetched through the SDK (`client.workspaces.list`,
 * which owns the `getBuilderDrives` query and sorts operator/service-offering
 * drives last). This hook is a thin React Query wrapper: it owns caching and
 * auth-gating; the SDK owns the query + shape.
 *
 * Query key stays `['GetBuilderDrives', …]` so the post-mutation invalidations
 * in the onboarding / purchase hooks keep matching.
 */
function useUserDrives() {
  const client = useClient()
  const auth = useRenownAuth()
  const address = auth.address
  const enabled = auth.status === 'authorized' && Boolean(address)

  return useQuery({
    queryKey: ['GetBuilderDrives', address ?? ''],
    queryFn: async () => client.workspaces.list({ address: address ?? '' }),
    enabled,
    staleTime: 30_000,
  })
}

export { useUserDrives }
