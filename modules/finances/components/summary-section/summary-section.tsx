'use client'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { BUDGETS } from '../../mocks'
import { MOCK_BUDGETS_ANALYTICS } from '../../mocks/analytics'
import { getBudgetsByCodePath, getCodePathFromParams, getLevelOfDetail } from '../../utils'
import { BudgetUtilizationCard } from './budget-utilization-card'
import { DoughnutChart } from './doughnut-chart'
import { MobileChart } from './doughnut-chart/mobile-chart'
import { FilterTabs } from './filter-tabs'
import { useCardChartOverview } from './useCardChartOverview'

interface SummarySectionProps {
  financeSlug?: string[]
}

export function SummarySection({ financeSlug }: SummarySectionProps) {
  const codePath = getCodePathFromParams(financeSlug)
  const budgets = getBudgetsByCodePath(codePath, BUDGETS)
  const levelNumber = getLevelOfDetail(codePath)

  const cardOverViewSectionData = useCardChartOverview(
    budgets,
    MOCK_BUDGETS_ANALYTICS,
    levelNumber.levelOfDetail,
    BUDGETS,
    codePath,
  )

  return (
    <div
      data-slot="main-content-section"
      className="flex min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:gap-6 xl:gap-8"
    >
      <div className="min-w-0 lg:w-[31.75%] lg:shrink-0">
        <BudgetUtilizationCard
          paymentsOnChain={cardOverViewSectionData.paymentsOnChain}
          budgetCap={cardOverViewSectionData.budgetCap}
        />
      </div>

      <Card
        data-slot="card-container"
        className={cn('flex w-full flex-col gap-0 p-0', 'bg-popover border-none md:flex-row')}
      >
        <div data-slot="content" className="md:flex md:w-[29%]">
          <FilterTabs
            selectedMetric={cardOverViewSectionData.selectedMetric}
            onChangeTab={cardOverViewSectionData.handleSelectedMetric}
          />
        </div>

        <div data-slot="chart-container" className="hidden pt-4 pr-6 pb-4 md:flex md:w-[71%]">
          <DoughnutChart
            seriesData={cardOverViewSectionData.doughnutSeriesData}
            selectedMetric={cardOverViewSectionData.selectedMetric}
            changeAlignment={cardOverViewSectionData.changeAlignment}
            showSwiper={cardOverViewSectionData.showSwiper}
            numberSliderPerLevel={cardOverViewSectionData.numberSliderPerLevel}
          />
        </div>
        <div data-slot="mobile-chart" className="md:hidden">
          <MobileChart seriesData={cardOverViewSectionData.doughnutSeriesData} />
        </div>
      </Card>
    </div>
  )
}
