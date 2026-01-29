import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import type { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import { Button } from '@/modules/shared/components/ui/button'
import { TableCell, TableRow } from '@/modules/shared/components/ui/table'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import BudgetStatementsStatus from '../budget-staments-status/budget-statments-status'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { formatReportingMonth, getAmountByMetric } from '../utils'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStamentTableItemProps {
  builder: BudgetStatement
  budgetMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStamentTableItem({
  builder,
  budgetMetric,
  className,
}: Readonly<BudgetStamentTableItemProps>) {
  const reportMonth = formatReportingMonth(builder.month)
  const reportMonthTrimmed = reportMonth.replaceAll(/\s+/g, '')
  const amount = useMemo(() => getAmountByMetric(budgetMetric, builder), [budgetMetric, builder])
  const builderNameForNavigation = builder.owner.name.toLocaleLowerCase()

  return (
    <TableRow
      className={cn(
        'flex h-15.5! w-full cursor-pointer items-center justify-between rounded-none! border-b-0! shadow-sm!',
        className,
      )}
    >
      <TableCell className="flex h-full w-[27%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${builder.owner.code}`}
          className="flex h-full w-full items-center pl-4 xl:pl-3 2xl:pl-3.5"
        >
          <ContributorProfileInfo
            name={builder.owner.name}
            code={builder.owner.code}
            isCoreUnit={true}
            icon={true}
          />
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">{reportMonth}</div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0! text-right lg:pl-4.5! xl:pl-6!">
        <Link
          href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">
            {usLocalizedNumber(amount)} USD
          </div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[14%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <BudgetStatementsStatus status={builder.status as ExpenseReport_ExpenseReportStatus} />
        </Link>
      </TableCell>

      <TableCell className="inline-block h-full w-[19%] p-0! text-right lg:pl-1!">
        <Link
          href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <span className="text-foreground text-sm/5.5 font-semibold">
            <LastModified lastModified={builder.lastModifiedAtUtcIso} />
          </span>
        </Link>
      </TableCell>
      <TableCell className="inline-flex h-full w-[10%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builderNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="group/link flex h-full w-full items-center justify-end pr-4"
        >
          <Button variant="outline" asChild className="pointer-events-none">
            <div>
              <span className="hidden lg:block">View</span>
              <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
            </div>
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}
