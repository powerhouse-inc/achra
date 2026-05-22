'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useQuery } from '@tanstack/react-query'

// Mocked check: real implementation will look up the user's Connect drive.
async function fetchHasDrive(): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return false
}

function useHasDrive() {
  const auth = useRenownAuth()
  const address = auth.address

  return useQuery({
    queryKey: ['has-drive', address ?? null],
    queryFn: fetchHasDrive,
    enabled: auth.status === 'authorized' && Boolean(address),
    staleTime: 30_000,
  })
}

export { useHasDrive }
