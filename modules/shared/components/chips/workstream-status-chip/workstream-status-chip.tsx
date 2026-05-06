import { useMemo } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

interface WorkstreamStatusChipProps {
  status: WorkstreamStatus
}

function WorkstreamStatusChip({ status }: WorkstreamStatusChipProps) {
  const { label, color } = useMemo(() => {
    switch (status) {
      case WorkstreamStatus.RfpDraft:
        return {
          label: 'RFP Draft',
          color: 'gray',
        }
      case WorkstreamStatus.PreworkRfc:
        return {
          label: 'Prework RFC',
          color: 'gray',
        }
      case WorkstreamStatus.RfpCancelled:
        return {
          label: 'RFP Cancelled',
          color: 'red',
        }
      case WorkstreamStatus.OpenForProposals:
        return {
          label: 'Open for proposals',
          color: 'blue',
        }
      case WorkstreamStatus.ProposalSubmitted:
        return {
          label: 'Proposal submitted',
          color: 'blue',
        }
      case WorkstreamStatus.Awarded:
        return {
          label: 'Awarded',
          color: 'blue',
        }
      case WorkstreamStatus.InProgress:
        return {
          label: 'In progress',
          color: 'blue',
        }
      case WorkstreamStatus.Finished:
        return {
          label: 'Finished',
          color: 'green',
        }
      case WorkstreamStatus.NotAwarded:
        return {
          label: 'Not Awarded',
          color: 'red',
        }
      default:
        return {
          label: status,
          color: 'gray',
        }
    }
  }, [status])

  return (
    <GenericChip variant="filled" color={color}>
      {label}
    </GenericChip>
  )
}

export { WorkstreamStatusChip }
