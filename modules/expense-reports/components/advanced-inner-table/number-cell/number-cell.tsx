import { formatNumber } from '@/modules/expense-reports/lib/strings'
import { cn } from '@/modules/shared/lib/utils'
import type { RowType } from '../types'

interface NumberCellProps {
  value: number
  className?: string
  isIncome?: boolean
  rowType?: RowType
}

export function NumberCell({
  value,
  className,
  isIncome = false,
  rowType = 'normal',
}: NumberCellProps) {
  const negative = value < 0
  const isTotal = rowType === 'total'

  const color = negative
    ? isIncome
      ? isTotal
        ? 'text-status-success'
        : 'text-status-success/30'
      : isTotal
        ? 'text-destructive'
        : 'text-destructive/30'
    : isTotal
      ? 'text-foreground'
      : 'text-foreground/50'

  return (
    <div className={cn('px-4 py-2 text-base/6 font-semibold', color, className)}>
      {formatNumber(value)}
    </div>
  )
}
