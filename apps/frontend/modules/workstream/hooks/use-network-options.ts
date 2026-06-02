import { useMemo } from 'react'
import { useAllNetworksQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import type { Option } from '@/modules/shared/components/form/multiselect'

function useNetworkOptions() {
  const { data: allNetworks, isLoading: isLoadingAllNetworks } = useAllNetworksQuery()

  const options = useMemo(() => {
    return (allNetworks?.allNetworks.map(
      (network) =>
        ({
          value: network.network?.slug ?? '',
          label: network.network?.name ?? network.network?.slug ?? 'Unknown',
          group: 'Networks',
        }) satisfies Option,
    ) ?? []) as Option[]
  }, [allNetworks])

  return { options, isLoadingAllNetworks }
}

export { useNetworkOptions }
