import SimpleBar from 'simplebar-react'
import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementMobileItem } from './budget-statement-mobile-item'
import { useBudgetStatementList } from './use-budget-statement-list'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

interface BudgetStatementListMobileProps {
  budgetStatements: BudgetStatement[]
  selectedMetric: MetricWithoutBudget
  className?: string
  asSectionContent?: boolean
}

export function BudgetStatementListMobile({
  budgetStatements,
  selectedMetric,
  asSectionContent = false,
  className,
}: Readonly<BudgetStatementListMobileProps>) {
  const { simpleBarRef, cardContentRef, itemsWrapperRef } = useBudgetStatementList({
    budgetStatements,
    asSectionContent,
  })
  return (
    <div ref={cardContentRef} className={className}>
      <SimpleBar
        ref={simpleBarRef}
        className={cn('-mt-2 pt-2', !asSectionContent && '-mx-2 px-2 pb-2')}
        autoHide={false}
      >
        <div
          ref={itemsWrapperRef}
          className={cn('flex w-full flex-col gap-2', asSectionContent && 'px-2 pb-2')}
        >
          {budgetStatements.map((budgetStatement) => (
            <BudgetStatementMobileItem
              key={budgetStatement.id}
              budgetStatement={budgetStatement}
              selectedMetric={selectedMetric}
            />
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
