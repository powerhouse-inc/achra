import type { QuarterCardProps } from '@/modules/finances/types'
import { percentageRespectTo } from '@/modules/finances/utils'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Card } from '@/shared/components/ui/card'
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@/shared/lib/humanization'
import { cn } from '@/shared/lib/utils'
import { MetricDisplay } from './horizontal-budgetbar'
import { HorizontalBudgetBar } from './horizontal-budgetbar/horizontal-budget-bar'
import { LegendItem } from './horizontal-budgetbar/legend-item'

export function BudgetUtilizationCard({ paymentsOnChain, budgetCap }: QuarterCardProps) {
  const humanizedActuals = threeDigitsPrecisionHumanization(paymentsOnChain)
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(budgetCap)
  const percent = percentageRespectTo(paymentsOnChain, budgetCap)

  const isRightPartZero = budgetCap === 0

  const percentDisplay =
    budgetCap === 0
      ? '-- '
      : percent === 0
        ? 0
        : percent < 0.1
          ? '<0.1'
          : percent < 1
            ? usLocalizedNumber(percent, 2)
            : usLocalizedNumber(percent, 1)

  return (
    <Card data-slot="budget-utilization-card" className="flex w-full flex-col gap-0 px-8 py-4">
      <div className="flex flex-row justify-center gap-2">
        <MetricDisplay
          amount={humanizedActuals.value}
          currency="USD"
          unit={humanizedActuals.suffix}
        />
        <div
          data-slot="divider-actuals-budget-cap"
          className={cn('text-3xl leading-normal font-semibold', 'lining-nums tabular-nums')}
        >
          /
        </div>
        <MetricDisplay
          amount={humanizedBudgetCap.value}
          currency="USD"
          unit={humanizedBudgetCap.suffix}
        />
      </div>

      <div
        data-slot="description"
        className="text-foreground/50 mt-0.25 text-center text-xs/4.5 font-medium"
      >
        MakerDAO Total Budget
      </div>
      <Separator className="my-2.5" orientation="horizontal" />

      <div
        data-slot="percent"
        className={cn(
          'text-center text-xl leading-[120%] font-bold',
          isRightPartZero ? 'text-muted-foreground' : 'text-foreground',
        )}
      >
        {percentDisplay}%
      </div>

      <div data-slot="bar-wrapper" className="mt-1 mb-1 flex items-center gap-2">
        <HorizontalBudgetBar actuals={paymentsOnChain} prediction={0} budgetCap={budgetCap} />
      </div>

      <div data-slot="legend" className="flex justify-between pl-px md:mt-px 2xl:mt-0">
        <LegendItem color="bg-status-success" className="hidden xl:block">
          Net Expenses On-chain
        </LegendItem>
        <LegendItem color="bg-status-success" className="block xl:hidden">
          Net Exp On-chain
        </LegendItem>

        <LegendItem color="bg-destructive">Budget Cap</LegendItem>
      </div>
    </Card>
  )
}
