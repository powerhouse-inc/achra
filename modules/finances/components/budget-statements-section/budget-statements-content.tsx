import { Button } from '@/modules/shared/components/ui/button'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import { mockBudgetStatements } from './mock/budget-stament-mock'
import type { MetricWithoutBudget } from './type'

interface BudgetStatementsContentProps {
  budgetMetric: MetricWithoutBudget
}

export default function BudgetStatementsContent({
  budgetMetric,
}: Readonly<BudgetStatementsContentProps>) {
  return (
    <div className="flex h-fit flex-col gap-6">
      <BudgetStatementsItem builders={mockBudgetStatements} budgetMetric={budgetMetric} />
      <Button variant="outline" size="lg" className="w-58 self-center md:mt-0">
        Load More
      </Button>
    </div>
  )
}
