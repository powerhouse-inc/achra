import type { Team } from '@/modules/shared/types/team'
import { BudgetStatementMobileItem } from './budget-statement-mobile-item'
import type { AnalyticMetric } from '../../summary-section/filter-tabs'

interface BudgetStatementListMobileProps {
  builders: Team[]
  selectedMetric: AnalyticMetric
  className?: string
}

export function BudgetStatementListMobile({
  builders,
  selectedMetric,
  className,
}: BudgetStatementListMobileProps) {
  return (
    <>
      {builders.map((builder) => (
        <BudgetStatementMobileItem
          key={builder.id}
          builder={builder}
          selectedMetric={selectedMetric}
          className={className}
        />
      ))}
    </>
  )
}
