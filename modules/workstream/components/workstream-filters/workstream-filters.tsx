'use client'

import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import SearchInput from '@/modules/shared/components/search-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import useWorkstreamFilters from './useWorkstreamFilters'

export default function WorkstreamFilters() {
  const { search, status, network, setSearch, setStatus, setNetwork } = useWorkstreamFilters()

  return (
    <div className="flex items-center gap-6">
      <SearchInput value={search} onChange={(value) => void setSearch(value)} />

      <Select
        value={status}
        onValueChange={(value) => {
          void setStatus(value as WorkstreamStatus)
        }}
      >
        <SelectTrigger className="min-w-64 xl:min-w-75">
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

      <Select value={network} onValueChange={(value) => void setNetwork(value)}>
        <SelectTrigger className="min-w-46 xl:min-w-75">
          <SelectValue placeholder="Network" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Networks</SelectItem>
          <SelectItem value="sky">Sky</SelectItem>
          <SelectItem value="powerhouse">Powerhouse</SelectItem>
          <SelectItem value="spark">Spark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
