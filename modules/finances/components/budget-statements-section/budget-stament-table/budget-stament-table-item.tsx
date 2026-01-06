import { ArrowRight } from 'lucide-react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { useMemo } from 'react'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { TableCell, TableRow } from '@/modules/shared/components/ui/table'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'
import { getAmountByMetric } from '../utils'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from '../type'

export interface BudgetStamentTableItemProps {
  builder: BudgetStatementExpenseReport
  budgetMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStamentTableItem({
  builder,
  budgetMetric,
  className,
}: Readonly<BudgetStamentTableItemProps>) {
  const reportMonth = builder.month
    ? DateTime.fromFormat(builder.month, 'yyyy-LL-dd').toFormat('LLL yyyy')
    : 'No date'

  const amount = useMemo(() => getAmountByMetric(budgetMetric, builder), [budgetMetric, builder])

  return (
    <TableRow
      className={cn(
        'flex h-15.5! w-full cursor-pointer items-center justify-between rounded-none! border-b-0!',
        className,
      )}
    >
      <TableCell className="flex h-full w-[27%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center pl-4 xl:pl-3 2xl:pl-3.5"
        >
          <ContributorProfileInfo
            name={builder.name}
            code={builder.code}
            isCoreUnit={true}
            icon={true}
            status={builder.status}
          />
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">{reportMonth}</div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0! text-right lg:pl-4.5! xl:pl-6!">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">
            {usLocalizedNumber(amount ?? 0)} USD
          </div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[14%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start"
        >
          <BuildersStatusChip status={builder.status} />
        </Link>
      </TableCell>

      <TableCell className="inline-block h-full w-[19%] p-0! text-right lg:pl-1!">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start"
        >
          <span className="text-foreground text-sm/5.5 font-semibold">
            <LastModified lastModified={builder.lastModified} />
          </span>
        </Link>
      </TableCell>
      <TableCell className="inline-flex h-full w-[10%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
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
