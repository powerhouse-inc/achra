import { useMemo } from 'react'
import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

interface BuildersStatusChipProps {
  status: BuilderStatus
}

export default function BuildersStatusChip({ status }: BuildersStatusChipProps) {
  const { label, color } = useMemo(() => {
    switch (status) {
      case BuilderStatus.Active:
        return {
          label: 'Active',
          color: 'blue',
        }
      case BuilderStatus.Inactive:
        return {
          label: 'Inactive',
          color: 'yellow',
        }
      case BuilderStatus.OnHold:
        return {
          label: 'On Hold',
          color: 'red',
        }
      case BuilderStatus.Completed:
        return {
          label: 'Completed',
          color: 'green',
        }
      case BuilderStatus.Archived:
        return {
          label: 'Archived',
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
