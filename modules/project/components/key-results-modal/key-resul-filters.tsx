import { useMemo } from 'react'
import { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface StatusSelectProps {
  statuses: ScopeOfWork_DeliverableStatus[]
  setStatuses: (statuses: ScopeOfWork_DeliverableStatus[]) => Promise<URLSearchParams>
  className?: string
}

const statusOptions: Option[] = [
  {
    value: ScopeOfWork_DeliverableStatus.Draft,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Draft} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.InProgress,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.InProgress} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.Canceled,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Canceled} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.Delivered,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Delivered} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.Todo,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Todo} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.WontDo,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.WontDo} />,
    group: 'Statuses',
  },
  {
    value: ScopeOfWork_DeliverableStatus.Blocked,
    label: <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Blocked} />,
    group: 'Statuses',
  },
]

function StatusSelectDeliverable({ statuses, setStatuses, className }: StatusSelectProps) {
  const selectedOptions = useMemo(
    () =>
      statusOptions.filter((option) =>
        statuses.includes(option.value as ScopeOfWork_DeliverableStatus),
      ),
    [statuses],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as ScopeOfWork_DeliverableStatus)
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
      className={cn('bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option) => (
        <DeliverableStatusChip status={option.value as ScopeOfWork_DeliverableStatus} />
      )}
    />
  )
}

export { StatusSelectDeliverable }
