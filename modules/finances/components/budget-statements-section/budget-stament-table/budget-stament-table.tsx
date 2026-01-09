'use client'
import { ArrowUpDown } from 'lucide-react'
import { SortEnum } from '@/modules/networks/components/wallets-section/components/wallets-card/components/wallets-table/use-wallets-table'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'
import { cn } from '@/modules/shared/lib/utils'
import { useBudgetStamentTable } from '../budget-stament-item/useBudgetStamentTable'
import { BudgetStamentTableItem } from './budget-stament-table-item'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from '../type'

export interface BudgetStamentTableProps {
  builders: BudgetStatementExpenseReport[]
  budgetMetric: MetricWithoutBudget
  className?: string
}

export function BudgetStamentTable({
  builders,
  budgetMetric,
  className,
}: Readonly<BudgetStamentTableProps>) {
  const {
    headersSort,
    sortedBuilders,
    proccesedBudgetStatementsTableColumns,
    handleSortClickHeader,
  } = useBudgetStamentTable({
    builders,
    budgetMetric,
  })

  return (
    <Table variant="pills" className={cn('w-full border-none!', className)}>
      <TableHeader className="mb-2 inline-block w-full border-b-0!">
        <TableRow className="bg-accent! flex h-fit w-full justify-between rounded-none! rounded-tl-xl! rounded-tr-xl! border-none! px-2 py-4 shadow-sm! outline-none! xl:p-4 xl:pl-3 2xl:p-4">
          {proccesedBudgetStatementsTableColumns.map((column, index) => (
            <TableHead
              key={column.accessorKey}
              className={cn(
                'inline-block h-fit p-0!',
                column.isNumeric && 'text-right',
                index === 0 && 'w-[27%]',
                index === 1 && 'w-[17%]',
                index === 2 && 'w-[15%] lg:pl-3!',
                index === 3 && 'w-[15%]',
                index === 4 && 'w-[19%]',
              )}
            >
              <Button
                variant="ghost"
                aria-label={`Sort ${column.header} column`}
                onClick={() => {
                  handleSortClickHeader(index)
                }}
                className={cn(
                  '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:stroke-foreground! h-fit p-0! font-semibold hover:bg-transparent lg:text-base/6 dark:hover:bg-transparent',
                  headersSort[index] === SortEnum.Asc &&
                    '[&_path:nth-child(3)]:stroke-foreground [&_path:nth-child(4)]:stroke-foreground hover:[&_path:nth-child(3)]:stroke-foreground/50 hover:[&_path:nth-child(4)]:stroke-foreground/50 hover:[&_path:nth-child(1)]:stroke-foreground/30 hover:[&_path:nth-child(2)]:stroke-foreground/30',
                  headersSort[index] === SortEnum.Desc &&
                    '[&_path:nth-child(1)]:stroke-foreground [&_path:nth-child(2)]:stroke-foreground hover:[&_path:nth-child(1)]:stroke-foreground/50 hover:[&_path:nth-child(2)]:stroke-foreground/50 hover:[&_path:nth-child(3)]:stroke-foreground/30 hover:[&_path:nth-child(4)]:stroke-foreground/30',
                )}
              >
                {column.header}
                {column.hasSort && <ArrowUpDown className="size-4" />}
              </Button>
            </TableHead>
          ))}
          <TableHead className="h-fit w-[10%] p-0! text-right" />
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col gap-2">
        {sortedBuilders.map((builder) => (
          <BudgetStamentTableItem
            key={builder.id}
            builder={builder}
            budgetMetric={budgetMetric}
            className="last:rounded-b-xl!"
          />
        ))}
      </TableBody>
    </Table>
  )
}
