import { useMemo } from 'react'
import { TeamStatus } from '@/modules/shared/types/types'
import { GenericChip } from '../generic-chip/generic-chip'

interface BuildersStatusChipProps {
  status: TeamStatus
}

export default function BuildersStatusChip({ status }: BuildersStatusChipProps) {
  const { label, color } = useMemo(() => {
    switch (status) {
      case TeamStatus.Progress:
        return {
          label: 'Progress',
          color: 'blue',
        }
      case TeamStatus['To Do']:
        return {
          label: 'To Do',
          color: 'yellow',
        }
      case TeamStatus.Canceled:
        return {
          label: 'Canceled',
          color: 'red',
        }
      case TeamStatus.Accepted:
        return {
          label: 'Accepted',
          color: 'green',
        }
      case TeamStatus.Obsolete:
        return {
          label: 'Obsolete',
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
