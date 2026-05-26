'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useGetBuilderDrivesQuery } from '@/modules/__generated__/graphql/switchboard-generated'

function useHasDrive() {
  const auth = useRenownAuth()
  const address = auth.address
  const enabled = auth.status === 'authorized' && Boolean(address)

  return useGetBuilderDrivesQuery(
    { filter: { ethereumAddress: address ?? '' } },
    {
      enabled,
      staleTime: 30_000,
      select: (data) => data.getBuilderDrives.length > 0,
    },
  )
}

export { useHasDrive }
