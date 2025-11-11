import { useMemo } from 'react'
import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface StatusSelectProps {
  statuses: ScopeOfWork_DeliverableSetStatus[]
  setStatuses: (statuses: ScopeOfWork_DeliverableSetStatus[]) => Promise<URLSearchParams>
  className?: string
}

const statusOptions: Option[] = [
  {
    value: ScopeOfWork_DeliverableSetStatus.Draft,
    label: <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableSetStatus.InProgress,
    label: <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.InProgress} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableSetStatus.Finished,
    label: <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Finished} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableSetStatus.Canceled,
    label: <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Canceled} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableSetStatus.Todo,
    label: <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Todo} />,
    group: 'Statuses',
  },
]

function StatusSelect({ statuses, setStatuses, className }: StatusSelectProps) {
  const selectedOptions = useMemo(
    () =>
      statusOptions.filter((option) =>
        statuses.includes(option.value as ScopeOfWork_DeliverableSetStatus),
      ),
    [statuses],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as ScopeOfWork_DeliverableSetStatus)
    void setStatuses(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={statusOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Statuses"
      placeholder="All Statuses"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option) => (
        <DeliverableSetStatusChip status={option.value as ScopeOfWork_DeliverableSetStatus} />
      )}
    />
  )
}

function StatusSelectDrawer({ statuses, setStatuses }: StatusSelectProps) {
  const handleChange = (values: string[]) => {
    void setStatuses(values as ScopeOfWork_DeliverableSetStatus[])
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

export { StatusSelect, StatusSelectDrawer }
