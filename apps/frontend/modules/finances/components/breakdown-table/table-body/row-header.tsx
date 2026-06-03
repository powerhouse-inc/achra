import type { AnalyticGranularity } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'

interface RowHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  granularity: AnalyticGranularity
  isHeader: boolean
  isUncategorized: boolean
  children: React.ReactNode
}

function RowHeader({
  granularity,
  isHeader: _isHeader,
  isUncategorized,
  className,
  children,
  ...props
}: RowHeaderProps) {
  const isQuarterly = granularity === 'quarterly'
  const isAnnual = granularity === 'annual'
  const isMonthly = granularity === 'monthly'
  const isSemiAnnual = granularity === 'semiAnnual'

  return (
    <th
      scope="row"
      className={cn(
        'border-border text-foreground relative w-full border-r py-4 text-xs',
        'overflow-wrap-anywhere wrap-break-word',
        isUncategorized && 'italic',
        // Widths by granularity - aligned with table-header first column
        isMonthly && ['w-[195px] px-2 py-4 pl-8 text-sm', '3xl:min-w-[230px]', '2xl:truncate'],
        isQuarterly && [
          'w-[145px] p-4 pr-2 text-sm',
          'lg:w-[148px] lg:pl-2',
          'xl:w-[220px] xl:px-8',
          '2xl:w-[260px] 2xl:px-8 2xl:pr-2',
          '3xl:w-[228px] 3xl:px-4',
        ],
        isAnnual && [
          'w-[78px] px-2 py-4 text-xs',
          'md:w-[140px] md:p-4 md:px-2 md:text-base',
          'xl:w-[190px] xl:px-8 xl:py-4',
          '2xl:w-[170px] 2xl:truncate',
          '3xl:w-[195px]',
        ],
        isSemiAnnual && ['w-[85px] px-2 py-4 pl-2', 'md:w-[150px] md:px-4 md:text-sm'],
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export { RowHeader }
