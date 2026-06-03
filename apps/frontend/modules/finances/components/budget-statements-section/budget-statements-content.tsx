'use client'

import { Button } from '@achra/ui/button'
import { cn } from '@achra/ui/lib/utils'
import type {
  BudgetStatement,
  MetricWithoutBudget,
  SortOptionValue,
} from '@/modules/finances/types'
import { useInfiniteArray } from '@/modules/shared/hooks/use-infinite-array'
import { BudgetStatementsItem } from './budget-statement-item/budget-statement-item'

interface BudgetStatementsContentProps {
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
  budgetStatements: BudgetStatement[]
  asSectionContent?: boolean
}

function BudgetStatementsContent({
  budgetMetric,
  sortOption,
  budgetStatements,
  asSectionContent = false,
}: Readonly<BudgetStatementsContentProps>) {
  const { visibleItems, hasMore, loadMore } = useInfiniteArray(budgetStatements, {
    firstPageSize: 10,
    pageSize: 10,
    enabled: true,
  })

  return (
    <div className={cn('flex h-fit flex-col', hasMore && 'gap-6')}>
      <BudgetStatementsItem
        budgetStatements={visibleItems}
        budgetMetric={budgetMetric}
        sortOption={sortOption}
        asSectionContent={asSectionContent}
      />
      {hasMore && (
        <Button variant="outline" size="lg" className="w-58 self-center md:mt-0" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  )
}

export { BudgetStatementsContent }
