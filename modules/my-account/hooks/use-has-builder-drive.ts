'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useGetBuilderDrivesQuery } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Returns true if the user owns a builder (team-admin) drive,
 * indicating onboarding is complete. Only drives with `builderProfileId` count.
 */
function useHasBuilderDrive() {
  const auth = useRenownAuth()
  const address = auth.address
  const enabled = auth.status === 'authorized' && Boolean(address)

  return useGetBuilderDrivesQuery(
    { filter: { ethereumAddress: address ?? '' } },
    {
      enabled,
      staleTime: 30_000,
      select: (data) => data.getBuilderDrives.some((drive) => Boolean(drive.builderProfileId)),
    },
  )
}

export { useHasBuilderDrive }
