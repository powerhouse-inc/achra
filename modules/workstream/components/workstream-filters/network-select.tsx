import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface NetworkSelectProps {
  networks: string[]
  setNetworks: (networks: string[]) => Promise<URLSearchParams>
  className?: string
}

const networkOptions: Option[] = [
  { value: 'sky', label: 'Sky', group: 'Networks' },
  { value: 'powerhouse', label: 'Powerhouse', group: 'Networks' },
  { value: 'spark', label: 'Spark', group: 'Networks' },
]

function NetworkSelect({ networks, setNetworks, className }: NetworkSelectProps) {
  const selectedOptions = networkOptions.filter((option) => networks.includes(option.value))

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value)
    void setNetworks(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={networkOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Networks"
      placeholder="All Networks"
      className={cn('bg-background dark:bg-background')}
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

  return (
    <DrawerSelect
      value={networks}
      onChange={handleChange}
      label="Networks"
      options={networkOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="All Networks"
    />
  )
}

export { NetworkSelect, NetworkSelectDrawer }
