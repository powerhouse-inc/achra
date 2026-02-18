import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import type { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import { Button } from '@/modules/shared/components/ui/button'
import { TableCell, TableRow } from '@/modules/shared/components/ui/table'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import BudgetStatementsStatus from '../budget-staments-status/budget-statments-status'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { formatReportingMonth, getAmountByMetric } from '../utils'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStamentTableItemProps {
  budgetStatement: BudgetStatement
  budgetMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStamentTableItem({
  budgetStatement,
  budgetMetric,
  className,
}: Readonly<BudgetStamentTableItemProps>) {
  const reportMonth = formatReportingMonth(budgetStatement.month)
  const reportMonthTrimmed = reportMonth.replaceAll(/\s+/g, '')
  const amount = useMemo(
    () => getAmountByMetric(budgetMetric, budgetStatement),
    [budgetMetric, budgetStatement],
  )
  const ownerNameForNavigation = budgetStatement.owner.name.toLocaleLowerCase()

  return (
    <TableRow className={className}>
      <TableCell className="flex h-full w-[27%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center pl-4"
        >
          <ContributorProfileInfo
            name={budgetStatement.owner.name}
            code={budgetStatement.owner.code}
            logo={budgetStatement.owner.logo}
            isCoreUnit={true}
            icon={true}
          />
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[17%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">{reportMonth}</div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">
            {usLocalizedNumber(amount)} USD
          </div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[14%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <BudgetStatementsStatus
            status={budgetStatement.status as ExpenseReport_ExpenseReportStatus}
          />
        </Link>
      </TableCell>

      <TableCell className="inline-block h-full flex-1 p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
          className="flex h-full w-full items-center justify-start"
        >
          <span className="text-foreground text-sm/5.5 font-semibold">
            <LastModified lastModified={budgetStatement.lastModifiedAtUtcIso} />
          </span>
        </Link>
      </TableCell>
      <TableCell className="inline-flex h-full w-fit p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${ownerNameForNavigation}/budget-statements?viewMonth=${reportMonthTrimmed}`}
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
