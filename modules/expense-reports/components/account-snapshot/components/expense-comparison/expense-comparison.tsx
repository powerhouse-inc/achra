import { SectionHeader } from '../section-header'
import { ExpenseComparisonDesktop } from './expense-comparison-desktop'
import { ExpenseComparisonMobile } from './expense-comparison-mobile'
import type { ExpenseComparisonLineItem } from '../../types'

interface ExpenseComparisonProps {
  lineItems: ExpenseComparisonLineItem[]
}

function ExpenseComparison({ lineItems }: ExpenseComparisonProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-4">
      <SectionHeader
        title="Reported Expenses Comparison"
        subtitle="Reported actuals compared to expense and revenue transactions."
        tooltip={
          'Understand the differences between reported and net transactions. Easily spot variations \
            and improve financial tracking for comprehensive expense  and revenue analysis.'
        }
        level="h2"
      />

      <div className="md:hidden">
        <ExpenseComparisonMobile lineItems={lineItems} />
      </div>
      <div className="hidden md:block">
        <ExpenseComparisonDesktop lineItems={lineItems} />
      </div>
    </div>
  )
}

export { ExpenseComparison }
