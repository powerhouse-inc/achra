import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface NetworkSelectProps {
  networks: string[]
  setNetworks: (networks: string[]) => Promise<URLSearchParams>
  className?: string
}

const networkOptions: Option[] = [
  { value: 'sky', label: 'Sky' },
  { value: 'powerhouse', label: 'Powerhouse' },
  { value: 'spark', label: 'Spark' },
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
      placeholder="Networks"
      className={cn('bg-background dark:bg-background', className)}
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
    />
  )
}

export { NetworkSelect, NetworkSelectDrawer }
