import { useMemo } from 'react'
import { OperatorChipEnum } from '@/modules/operator-profile/types'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'

interface OperatorChipProps {
  opc: OperatorChipEnum
}

function OperatorChip({ opc }: OperatorChipProps) {
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

export { OperatorChip }
