import { BudgetUtilizationCard } from './butget-utilization-card'

export function SummarySection() {
  return (
    <div
      data-slot="main-content-section"
      className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-8"
    >
      <div className="lg:col-span-1">
        <BudgetUtilizationCard paymentsOnChain={500000} budgetCap={1000000} />
      </div>
      <div className="border-input flex items-center justify-center border lg:col-span-2">
        <div className="text-center">Donut Chart</div>
      </div>
    </div>
  )
}
