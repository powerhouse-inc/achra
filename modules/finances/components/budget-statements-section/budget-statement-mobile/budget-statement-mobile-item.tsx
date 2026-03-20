import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import type { BudgetStatement, MetricWithoutBudget } from '@/modules/finances/types'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { slugify } from '@/modules/shared/lib/slug'
import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementsStatus } from '../budget-statements-status/budget-statements-status'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { LabeledValue } from '../labeled-value'
import { formatReportingMonth, getAmountByMetric, getMetricLabel } from '../lib/utils'

export interface BudgetStatementMobileItemProps {
  budgetStatement: BudgetStatement
  selectedMetric: MetricWithoutBudget
}

export function BudgetStatementMobileItem({
  budgetStatement,
  selectedMetric,
}: Readonly<BudgetStatementMobileItemProps>) {
  const reportMonth = formatReportingMonth(budgetStatement.month)
  const amount = getAmountByMetric(selectedMetric, budgetStatement)
  const metricLabel = getMetricLabel(selectedMetric)
  const ownerNameForNavigation = slugify(budgetStatement.owner.name.toLocaleLowerCase())
  const reportMonthTrimmed = reportMonth.replaceAll(/\s+/g, '')
  return (
    <Link
      href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
      key={budgetStatement.id}
    >
      <Card
        className={cn(
          'bg-background gap:0 flex w-full flex-col rounded-xl p-0 shadow-sm transition-all hover:shadow-sm',
          'gap-0',
        )}
      >
        <CardHeader className="flex items-start justify-between px-4 pt-4 pb-2 md:pt-2">
          <div className="flex flex-col">
            <div className="text-foreground/30 hidden text-sm/5.5 font-semibold md:flex lg:hidden">
              Ecosystem Actor
            </div>

            <ContributorProfileInfo
              name={budgetStatement.owner.name}
              code={budgetStatement.owner.code}
              isCoreUnit={true}
              logoUrl={budgetStatement.owner.logo}
              status={budgetStatement.status as ExpenseReport_ExpenseReportStatus}
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
            <BudgetStatementsStatus
              status={budgetStatement.status as ExpenseReport_ExpenseReportStatus}
            />
          </div>

          <Button variant="outline" size="icon" aria-label="View builder team details">
            <ArrowRight className="size-4" />
          </Button>
        </CardHeader>

        <div className="px-4 md:hidden">
          <Separator className="my-2" />
        </div>

        <CardContent className="mb-2 flex items-center justify-between px-4 md:hidden">
          <LabeledValue label="Reporting Month" value={reportMonth} />

          <LabeledValue label={metricLabel} value={`${usLocalizedNumber(amount)} USD`} />
        </CardContent>

        <Separator className="-mt-1 md:mt-2" />
        <CardFooter className="bg-background w-full overflow-x-hidden rounded-b-xl px-4 py-1">
          <LastModified lastModified={budgetStatement.lastModifiedAtUtcIso} isMobile />
        </CardFooter>
      </Card>
    </Link>
  )
}
