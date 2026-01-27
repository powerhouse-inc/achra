import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { LabeledValue } from '../labeled-value'
import { formatReportingMonth, getAmountByMetric, getMetricLabel } from '../utils'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStatementMobileItemProps {
  builder: BudgetStatement
  selectedMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStatementMobileItem({
  builder,
  selectedMetric,

  className,
}: Readonly<BudgetStatementMobileItemProps>) {
  const reportMonth = formatReportingMonth(builder.month)
  const amount = getAmountByMetric(selectedMetric, builder)
  const metricLabel = getMetricLabel(selectedMetric)
  const builderNameForNavigation = builder.owner.name.toLocaleLowerCase()
  const reportMonthTrimmed = reportMonth.replaceAll(/\s+/g, '')
  return (
    <Link
      href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
      key={builder.id}
    >
      <Card
        className={cn(
          'bg-background gap:0 flex w-full flex-col rounded-xl p-0 shadow-sm transition-all hover:shadow-sm',
          'gap-0',
          className,
        )}
      >
        <CardHeader className="flex items-start justify-between px-4 pt-4 pb-2 md:pt-2">
          <div className="flex flex-col">
            <div className="text-foreground/30 hidden text-sm/5.5 font-semibold md:flex lg:hidden">
              Ecosystem Actor
            </div>

            <ContributorProfileInfo
              name={builder.owner.name}
              code={builder.owner.code}
              isCoreUnit={true}
              icon={true}
            />
          </div>

          <LabeledValue
            label="Reporting Month"
            value={reportMonth}
            className="hidden md:flex lg:hidden"
          />
          <LabeledValue
            label={metricLabel}
            value={`${usLocalizedNumber(amount)} USD`}
            className="hidden min-w-30 md:flex lg:hidden"
          />
          <div className="hidden flex-col gap-1.5 text-sm md:flex lg:hidden">
            <span className="text-muted-foreground/60 font-medium">Status:</span>
            {/* TODO: Add status chip when API provides status field */}
            <span className="text-muted-foreground">-</span>
            {/* <BuildersStatusChip status={builder.status} /> */}
          </div>

          <Button variant="outline" size="icon" aria-label="View builder team details">
            <ArrowRight className="size-4" />
          </Button>
        </CardHeader>

        <div className="px-4 md:hidden">
          <Separator className="my-2" />
        </div>

        <CardContent className="mb-2 flex items-center justify-between px-10 md:hidden">
          <LabeledValue label="Reporting Month" value={reportMonth} />

          <LabeledValue label={metricLabel} value={`${usLocalizedNumber(amount)} USD`} />
        </CardContent>

        <Separator className="-mt-1 md:mt-2" />
        <CardFooter className="bg-background w-full overflow-x-hidden rounded-b-xl px-4 py-1">
          {/* TODO: Add last modified when API provides the field */}
          <span className="text-muted-foreground text-sm">-</span>
          {/* <LastModified lastModified={builder.lastModified} isMobile /> */}
        </CardFooter>
      </Card>
    </Link>
  )
}
