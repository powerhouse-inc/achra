import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { cn } from '@/modules/shared/lib/utils'

interface NetworkSelectProps {
  network: string
  setNetwork: (network: string) => Promise<URLSearchParams>
  className?: string
}

function NetworkSelect({ network, setNetwork, className }: NetworkSelectProps) {
  return (
    <Select value={network} onValueChange={(value) => void setNetwork(value)}>
      <SelectTrigger className={cn('bg-background dark:bg-background', className)}>
        <SelectValue placeholder="Network" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Networks</SelectItem>
        <SelectItem value="sky">Sky</SelectItem>
        <SelectItem value="powerhouse">Powerhouse</SelectItem>
        <SelectItem value="spark">Spark</SelectItem>
      </SelectContent>
    </Select>
  )
}

function NetworkSelectDrawer({ network, setNetwork }: NetworkSelectProps) {
  return (
    <DrawerSelect
      value={network}
      onChange={(value) => void setNetwork(value)}
      label="Network"
      options={[
        { label: 'All Networks', value: 'all' },
        { label: 'Sky', value: 'sky' },
        { label: 'Powerhouse', value: 'powerhouse' },
        { label: 'Spark', value: 'spark' },
      ]}
    />
  )
}

export { NetworkSelect, NetworkSelectDrawer }
