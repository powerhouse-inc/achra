import { useMemo } from 'react'
import { RfpStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

interface RfpStatusChipProps {
  status: RfpStatus
}

export function RfpStatusChip({ status }: RfpStatusChipProps) {
  const { label, color } = useMemo(() => {
    switch (status) {
      case RfpStatus.Draft:
        return {
          label: 'RFP Draft',
          color: 'gray',
        }
      case RfpStatus.RequestForCommments:
        return {
          label: 'Request for comments',
          color: 'gray',
        }
      case RfpStatus.Canceled:
        return {
          label: 'RFP Cancelled',
          color: 'red',
        }
      case RfpStatus.OpenForProposals:
        return {
          label: 'Open for proposals',
          color: 'blue',
        }
      case RfpStatus.Awarded:
        return {
          label: 'Awarded',
          color: 'blue',
        }
      case RfpStatus.NotAwarded:
        return {
          label: 'Not Awarded',
          color: 'red',
        }
      case RfpStatus.Closed:
        return {
          label: 'Closed',
          color: 'gray',
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
