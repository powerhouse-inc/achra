'use client'

import { useMemo } from 'react'
import { ProposalStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

interface ProposalStatusChipProps {
  status: ProposalStatus
}

function ProposalStatusChip({ status }: ProposalStatusChipProps) {
  const color = useMemo(() => {
    switch (status) {
      case ProposalStatus.Draft:
        return 'blue'
      case ProposalStatus.Submitted:
        return 'orange'
      case ProposalStatus.Accepted:
        return 'green'
      case ProposalStatus.Rejected:
        return 'red'
    }
  }, [status])

  return (
    <GenericChip variant="filled" color={color}>
      {status}
    </GenericChip>
  )
}

export { ProposalStatusChip }
