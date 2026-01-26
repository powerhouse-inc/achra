import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementMobileItem } from './budget-statement-mobile-item'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

interface BudgetStatementListMobileProps {
  builders: BudgetStatement[]
  selectedMetric: MetricWithoutBudget
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
