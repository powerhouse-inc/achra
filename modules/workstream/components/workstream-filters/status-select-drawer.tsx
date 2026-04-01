import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { statusOptions, type StatusSelectProps } from './status-select'

function StatusSelectDrawer({ statuses, setStatuses }: StatusSelectProps) {
  const handleChange = (values: string[]) => {
    void setStatuses(values as Parameters<StatusSelectProps['setStatuses']>[0])
  }

  return (
    <DrawerSelect
      value={statuses}
      onChange={handleChange}
      label="Statuses"
      options={statusOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { StatusSelectDrawer }
