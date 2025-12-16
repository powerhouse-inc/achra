import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementMobileItem } from './budget-statement-mobile-item'
import type { AnalyticMetric } from '../../summary-section/filter-tabs'

interface BudgetStatementListMobileProps {
  builders: Builder[]
  selectedMetric: AnalyticMetric
  className?: string
}

export function BudgetStatementListMobile({
  builders,
  selectedMetric,
  className,
}: Readonly<BudgetStatementListMobileProps>) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {builders.map((builder) => (
        <BudgetStatementMobileItem
          key={builder.id}
          builder={builder}
          selectedMetric={selectedMetric}
          className={className}
        />
      ))}
    </div>
  )
}
