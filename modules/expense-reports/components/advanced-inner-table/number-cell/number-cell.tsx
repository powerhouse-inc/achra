import { formatNumber } from '@/modules/expense-reports/lib/strings'
import { cn } from '@/modules/shared/lib/utils'
import type { RowType } from '../types'

interface NumberCellProps {
  value: number
  bold?: boolean
  className?: string
  isIncome?: boolean
  rowType?: RowType
}

export function NumberCell({
  value,
  bold,
  className,
  isIncome = false,
  rowType = 'normal',
}: NumberCellProps) {
  const negative = value < 0
  const isTotal = rowType === 'total'

  const color = negative
    ? isIncome
      ? 'text-green-500'
      : 'text-red-700'
    : isTotal
      ? 'text-gray-900'
      : 'text-gray-500'

  return (
    <div
      className={cn(
        'py-2.5 text-sm/4.5 md:px-4 md:py-2 lg:text-base/6',
        bold ? 'font-bold' : 'font-semibold',
        color,
        className,
      )}
    >
      {formatNumber(value)}
    </div>
  )
}
