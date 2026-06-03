import { useMemo } from 'react'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'
import { useNetworkOptions } from '@/modules/workstream/hooks/use-network-options'

interface NetworkSelectProps {
  networks: string[]
  setNetworks: (networks: string[]) => Promise<URLSearchParams>
  className?: string
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

export { NetworkSelect }
export type { NetworkSelectProps }
