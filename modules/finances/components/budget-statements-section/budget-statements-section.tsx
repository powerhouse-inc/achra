'use client'
import { useQueryState } from 'nuqs'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { FinancesSections } from '../config/const'
import BudgetStatementsContent from './budget-statements-content'
import BudgetStatementsTitle from './budget-statements-title'

export default function BudgetStatementsSection() {
  const RANGE = 'Jan - Dec 2023'
  const [budgetMetric, setBudgetMetric] = useQueryState('budgetMetric')
  return (
    <section
      className={cn('flex w-full flex-col gap-4', SCROLL_MT_CLASSES)}
      id={encodeSectionId(FinancesSections.BudgetStatements)}
    >
      <BudgetStatementsTitle
        range={RANGE.toUpperCase()}
        hash="budget-statements"
        setBudgetMetric={setBudgetMetric}
      />
      <BudgetStatementsContent budgetMetric={budgetMetric ?? 'Actuals'} />
    </section>
  )
}
