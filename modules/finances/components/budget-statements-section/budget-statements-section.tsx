'use client'
import { parseAsStringEnum, useQueryState } from 'nuqs'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { METRIC_OPTIONS } from '../../types'
import { FinancesSections } from '../config/const'
import useBudgetStamentFilters from './budget-stament-filters/useBudgetStamentFilters'
import BudgetStatementsContent from './budget-statements-content'
import BudgetStatementsTitle from './budget-statements-title'

export default function BudgetStatementsSection() {
  const RANGE = 'Jan - Dec 2023'
  const [budgetMetric, setBudgetMetric] = useQueryState(
    'budgetMetric',
    parseAsStringEnum(
      Object.values(METRIC_OPTIONS).filter((m) => m !== METRIC_OPTIONS.Budget),
    ).withDefault(METRIC_OPTIONS.Actuals),
  )
  const { metricSort } = useBudgetStamentFilters()
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
      <BudgetStatementsContent budgetMetric={budgetMetric} sortOption={metricSort} />
    </section>
  )
}
