import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { cn } from '@/modules/shared/lib/utils'

interface StatusSelectProps {
  status: WorkstreamStatus
  setStatus: (value: WorkstreamStatus) => Promise<URLSearchParams>
  className?: string
}

function StatusSelect({ status, setStatus, className }: StatusSelectProps) {
  return (
    <Select
      value={status}
      onValueChange={(value) => {
        void setStatus(value as WorkstreamStatus)
      }}
    >
      <SelectTrigger className={cn('bg-background dark:bg-background', className)}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value={WorkstreamStatus.RfpDraft}>
            <WorkstreamStatusChip status={WorkstreamStatus.RfpDraft} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.PreworkRfc}>
            <WorkstreamStatusChip status={WorkstreamStatus.PreworkRfc} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.RfpCancelled}>
            <WorkstreamStatusChip status={WorkstreamStatus.RfpCancelled} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.OpenForProposals}>
            <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.ProposalSubmitted}>
            <WorkstreamStatusChip status={WorkstreamStatus.ProposalSubmitted} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.Awarded}>
            <WorkstreamStatusChip status={WorkstreamStatus.Awarded} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.InProgress}>
            <WorkstreamStatusChip status={WorkstreamStatus.InProgress} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.Finished}>
            <WorkstreamStatusChip status={WorkstreamStatus.Finished} />
          </SelectItem>
          <SelectItem value={WorkstreamStatus.NotAwarded}>
            <WorkstreamStatusChip status={WorkstreamStatus.NotAwarded} />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function StatusSelectDrawer({ status, setStatus }: StatusSelectProps) {
  return (
    <DrawerSelect
      value={status}
      onChange={(value) => void setStatus(value)}
      label="Status"
      options={[
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.RfpDraft} />,
          value: WorkstreamStatus.RfpDraft,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.PreworkRfc} />,
          value: WorkstreamStatus.PreworkRfc,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.RfpCancelled} />,
          value: WorkstreamStatus.RfpCancelled,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />,
          value: WorkstreamStatus.OpenForProposals,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.ProposalSubmitted} />,
          value: WorkstreamStatus.ProposalSubmitted,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.Awarded} />,
          value: WorkstreamStatus.Awarded,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.InProgress} />,
          value: WorkstreamStatus.InProgress,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.Finished} />,
          value: WorkstreamStatus.Finished,
        },
        {
          label: <WorkstreamStatusChip status={WorkstreamStatus.NotAwarded} />,
          value: WorkstreamStatus.NotAwarded,
        },
      ]}
    />
  )
}

export { StatusSelect, StatusSelectDrawer }
