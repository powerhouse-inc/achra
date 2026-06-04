'use client'

import { isOperatorDriveName } from '@achra/sdk'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useGetBuilderDrivesQuery } from '@/modules/__generated__/graphql/switchboard-generated'

function useUserDrives() {
  const auth = useRenownAuth()
  const address = auth.address
  const enabled = auth.status === 'authorized' && Boolean(address)

  return useGetBuilderDrivesQuery(
    { filter: { ethereumAddress: address ?? '' } },
    {
      enabled,
      staleTime: 30_000,
      // Sort operator/service-offering drives last so the team-admin drive leads
      // the navbar and "My Drives" list. Builder-drive consumers (profile
      // resolution, the purchase workspace) no longer rely on order — they match
      // the profile-bearing drive explicitly by `builderProfileId` — but a stable,
      // predictable order still reads better in the lists. Stable sort preserves
      // intra-group order.
      select: (data) =>
        [...data.getBuilderDrives].sort(
          (a, b) =>
            Number(isOperatorDriveName(a.driveName)) - Number(isOperatorDriveName(b.driveName)),
        ),
    },
  )
}

export { useUserDrives }
