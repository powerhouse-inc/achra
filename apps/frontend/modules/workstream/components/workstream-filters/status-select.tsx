import { useMemo } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { WorkstreamStatusChip } from '@/modules/shared/components/chips/workstream-status-chip'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface StatusSelectProps {
  statuses: WorkstreamStatus[]
  setStatuses: (statuses: WorkstreamStatus[]) => Promise<URLSearchParams>
  className?: string
}

const statusOptions: Option[] = [
  {
    value: WorkstreamStatus.RfpDraft,
    label: <WorkstreamStatusChip status={WorkstreamStatus.RfpDraft} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.PreworkRfc,
    label: <WorkstreamStatusChip status={WorkstreamStatus.PreworkRfc} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.RfpCancelled,
    label: <WorkstreamStatusChip status={WorkstreamStatus.RfpCancelled} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.OpenForProposals,
    label: <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.ProposalSubmitted,
    label: <WorkstreamStatusChip status={WorkstreamStatus.ProposalSubmitted} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.Awarded,
    label: <WorkstreamStatusChip status={WorkstreamStatus.Awarded} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.InProgress,
    label: <WorkstreamStatusChip status={WorkstreamStatus.InProgress} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.Finished,
    label: <WorkstreamStatusChip status={WorkstreamStatus.Finished} />,
    group: 'Statuses',
  },
  {
    value: WorkstreamStatus.NotAwarded,
    label: <WorkstreamStatusChip status={WorkstreamStatus.NotAwarded} />,
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
      customItemRenderer={(option) => (
        <WorkstreamStatusChip status={option.value as WorkstreamStatus} />
      )}
    />
  )
}

export { StatusSelect, statusOptions }
export type { StatusSelectProps }
