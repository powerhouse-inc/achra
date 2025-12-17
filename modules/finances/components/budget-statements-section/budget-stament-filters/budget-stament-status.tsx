import { useMemo } from 'react'
import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface BuilderStatusProps {
  status: BuilderStatus[]
  setStatus: (scopes: BuilderStatus[]) => Promise<URLSearchParams>
  className?: string
}

const statusOptions: Option[] = [
  {
    value: BuilderStatus.Active,
    label: <BuildersStatusChip status={BuilderStatus.Active} />,
    group: 'Status',
  },
  {
    value: BuilderStatus.Archived,
    label: <BuildersStatusChip status={BuilderStatus.Archived} />,
    group: 'Status',
  },
  {
    value: BuilderStatus.Completed,
    label: <BuildersStatusChip status={BuilderStatus.Completed} />,
    group: 'Status',
  },
  {
    value: BuilderStatus.Inactive,
    label: <BuildersStatusChip status={BuilderStatus.Inactive} />,
    group: 'Status',
  },
  {
    value: BuilderStatus.OnHold,
    label: <BuildersStatusChip status={BuilderStatus.OnHold} />,
    group: 'Status',
  },
]

function StatusSelectBudget({ status, setStatus, className }: Readonly<BuilderStatusProps>) {
  const selectedOptions = useMemo(
    () => statusOptions.filter((option) => status.includes(option.value as BuilderStatus)),
    [status],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as BuilderStatus)
    void setStatus(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={statusOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Status"
      placeholder="Status"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function StatusSelectDrawer({ status, setStatus }: Readonly<BuilderStatusProps>) {
  const handleChange = (values: string[]) => {
    void setStatus(values as BuilderStatus[])
  }

  return (
    <DrawerSelect
      value={status}
      onChange={handleChange}
      label="Scopes"
      options={statusOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { StatusSelectBudget, StatusSelectDrawer }
