import { useMemo } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface StatusSelectProps {
  statuses: WorkstreamStatus[]
  setStatuses: (statuses: WorkstreamStatus[]) => Promise<URLSearchParams>
  className?: string
}

// TODO: Check with the designer the colors for the rest of the statuses

const statusOptions: Option[] = [
  {
    value: WorkstreamStatus.RfpDraft,
    label: (
      <GenericChip variant="filled" color="blue">
        DRAFT
      </GenericChip>
    ),
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.InProgress,
    label: (
      <GenericChip variant="filled" color="blue">
        IN PROGRESS
      </GenericChip>
    ),
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.Finished,
    label: (
      <GenericChip variant="filled" color="green">
        FINISHED
      </GenericChip>
    ),
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.RfpCancelled,
    label: (
      <GenericChip variant="filled" color="red">
        CANCELLED
      </GenericChip>
    ),
    group: 'Statuses',
  },
]

function StatusSelect({ statuses, setStatuses, className }: StatusSelectProps) {
  const selectedOptions = useMemo(
    () => statusOptions.filter((option) => statuses.includes(option.value as WorkstreamStatus)),
    [statuses],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as WorkstreamStatus)
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
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function StatusSelectDrawer({ statuses, setStatuses }: StatusSelectProps) {
  const handleChange = (values: string[]) => {
    void setStatuses(values as WorkstreamStatus[])
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
