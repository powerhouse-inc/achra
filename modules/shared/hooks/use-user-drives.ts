'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useGetBuilderDrivesQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { isOperatorDriveName } from '@/modules/sdk'

function useUserDrives() {
  const auth = useRenownAuth()
  const address = auth.address
  const enabled = auth.status === 'authorized' && Boolean(address)

  return useGetBuilderDrivesQuery(
    { filter: { ethereumAddress: address ?? '' } },
    {
      enabled,
      staleTime: 30_000,
      // The primary builder (team-admin) drive must come first: several
      // consumers take `data[0]` as "the user's builder drive" (profile
      // resolution, the purchase workspace). Operator/service-offering drives
      // sort after it. Order within each group is preserved (stable sort).
      select: (data) =>
        [...data.getBuilderDrives].sort(
          (a, b) =>
            Number(isOperatorDriveName(a.driveName)) - Number(isOperatorDriveName(b.driveName)),
        ),
    },
  )
}

export { useUserDrives }
