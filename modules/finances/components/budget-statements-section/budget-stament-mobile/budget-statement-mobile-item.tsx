import { ArrowRight } from 'lucide-react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { LabeledValue } from '../labeled-value'
import { getAmountByMetric, getMetricLabel } from '../utils'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from '../type'

export interface BudgetStatementMobileItemProps {
  builder: BudgetStatementExpenseReport
  selectedMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStatementMobileItem({
  builder,
  selectedMetric,

  className,
}: Readonly<BudgetStatementMobileItemProps>) {
  const reportMonth = builder.month
    ? DateTime.fromFormat(builder.month, 'yyyy-LL-dd').toFormat('LLL yyyy')
    : 'No date'

  const amount = getAmountByMetric(selectedMetric, builder)
  const metricLabel = getMetricLabel(selectedMetric)

  return (
    <Link href={`/network/powerhouse/builders/${builder.id}`} key={builder.id}>
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
              name={builder.name}
              code={builder.code}
              isCoreUnit={true}
              icon={true}
              status={builder.status}
            />
          </div>

          <LabeledValue
            label="Reporting Month"
            value={reportMonth}
            className="hidden md:flex lg:hidden"
          />
          <LabeledValue
            label={metricLabel}
            value={`${usLocalizedNumber(amount ?? 0)} USD`}
            className="hidden min-w-30 md:flex lg:hidden"
          />
          <div className="hidden flex-col gap-1.5 text-sm md:flex lg:hidden">
            <span className="text-muted-foreground/60 font-medium">Status:</span>
            <BuildersStatusChip status={builder.status} />
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

          <LabeledValue label={metricLabel} value={`${usLocalizedNumber(amount ?? 0)} USD`} />
        </CardContent>

        <Separator className="-mt-1 md:mt-2" />
        <CardFooter className="bg-background w-full overflow-x-hidden rounded-b-xl px-4 py-1">
          <LastModified lastModified={builder.lastModified} isMobile />
        </CardFooter>
      </Card>
    </Link>
  )
}
