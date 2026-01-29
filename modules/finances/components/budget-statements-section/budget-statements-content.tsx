'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { useInfiniteArray } from '@/modules/shared/hooks/use-infinite-array'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import type { SortOptionValue } from './budget-stament-filters/popover-filter-content'
import type { BudgetStatement, MetricWithoutBudget } from './type'

interface BudgetStatementsContentProps {
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
  budgetStatements: BudgetStatement[]
}

export default function BudgetStatementsContent({
  budgetMetric,
  sortOption,
  budgetStatements,
}: Readonly<BudgetStatementsContentProps>) {
  const { visibleItems, hasMore, loadMore } = useInfiniteArray(budgetStatements, {
    firstPageSize: 10,
    pageSize: 10,
    enabled: true,
  })

  return (
    <div className="flex h-fit flex-col gap-6">
      <BudgetStatementsItem
        builders={visibleItems}
        budgetMetric={budgetMetric}
        sortOption={sortOption}
      />
      {hasMore && (
        <Button variant="outline" size="lg" className="w-58 self-center md:mt-0" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  )
}
