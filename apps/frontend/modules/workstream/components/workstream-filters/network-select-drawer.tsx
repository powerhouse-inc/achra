import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { useNetworkOptions } from '@/modules/workstream/hooks/use-network-options'
import type { NetworkSelectProps } from './network-select'

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

export { NetworkSelectDrawer }
