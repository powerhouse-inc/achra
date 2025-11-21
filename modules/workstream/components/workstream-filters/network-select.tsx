import { useMemo } from 'react'
import { useAllNetworksQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface NetworkSelectProps {
  networks: string[]
  setNetworks: (networks: string[]) => Promise<URLSearchParams>
  className?: string
}

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

function NetworkSelect({ networks, setNetworks, className }: NetworkSelectProps) {
  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value)
    void setNetworks(values)
  }

  const { options, isLoadingAllNetworks } = useNetworkOptions()

  const selectedOptions = useMemo(
    () => options.filter((option) => networks.includes(option.value)),
    [networks, options],
  )

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Networks"
      placeholder="All Networks"
      className={cn('bg-background dark:bg-background')}
      disabled={isLoadingAllNetworks}
      commandProps={{
        className,
      }}
    />
  )
}

function NetworkSelectDrawer({ networks, setNetworks }: NetworkSelectProps) {
  const handleChange = (values: string[]) => {
    void setNetworks(values)
  }

  const { options } = useNetworkOptions()

  return (
    <DrawerSelect
      value={networks}
      onChange={handleChange}
      label="Networks"
      options={options}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { NetworkSelect, NetworkSelectDrawer }
