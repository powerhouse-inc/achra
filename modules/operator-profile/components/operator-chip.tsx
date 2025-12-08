import { useMemo } from 'react'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
// import { TeamRole } from '@/modules/shared/types'
import { OperatorChipEnum } from '../types'

interface OperatorChipProps {
  opc: OperatorChipEnum
}

export default function OperatorChip({ opc }: OperatorChipProps) {
  const { label, color } = useMemo(() => {
    switch (opc) {
      case OperatorChipEnum.Accountable:
        return {
          label: 'Accountable',
          color: 'orange',
        }
      case OperatorChipEnum.Budgeting:
        return {
          label: 'Budgeting',
          color: 'blue',
        }
      case OperatorChipEnum.Forecasting:
        return {
          label: 'Forecasting',
          color: 'red',
        }
    }
  }, [opc])

  return (
    <GenericChip variant="underline" color={color}>
      {label}
    </GenericChip>
  )
}
