'use client'
import { ArrowUpDown } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import type { BudgetStatement, MetricWithoutBudget } from '@/modules/finances/types'
import { SortEnum } from '@/modules/networks/types'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'
import { cn } from '@/modules/shared/lib/utils'
import { useBudgetStatementTable } from '../budget-statement-item/use-budget-statement-table'
import { BudgetStatementTableItem } from './budget-statement-table-item'
export interface BudgetStatementTableProps {
  budgetStatements: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  className?: string
  asSectionContent?: boolean
}

export function BudgetStatementTable({
  budgetStatements,
  budgetMetric,
  className,
  asSectionContent = false,
}: Readonly<BudgetStatementTableProps>) {
  const {
    headersSort,
    sortedBudgetStatements,
    proccesedBudgetStatementsTableColumns,
    handleSortClickHeader,
    simpleBarRef,
    cardContentRef,
    itemsWrapperRef,
  } = useBudgetStatementTable({
    budgetStatements,
    budgetMetric,
    asSectionContent,
  })

  return (
    <div className={cn('w-full', className)}>
      <Table
        variant="pills"
        className={cn('[&_table]:block [&_table]:w-full', asSectionContent && 'px-2')}
      >
        <TableHeader className={cn('mb-2 inline-block w-full', !asSectionContent && 'border-b-0!')}>
          <TableRow
            className={cn(
              !asSectionContent &&
                'bg-accent! flex h-fit w-full justify-between rounded-none! rounded-tl-xl! rounded-tr-xl! border-none! py-4 shadow-sm! outline-none! xl:py-4 2xl:py-4',
              asSectionContent && 'flex h-fit w-full border-b-0! py-4',
            )}
          >
            {proccesedBudgetStatementsTableColumns.map((column, index) => (
              <TableHead
                key={column.accessorKey}
                className={cn(
                  'inline-block h-fit p-0!',
                  column.isNumeric && 'text-right',
                  index === 0 && 'w-[27%] pl-4!',
                  index === 1 && 'w-[17%]',
                  index === 2 && 'w-[15%]',
                  index === 3 && 'w-[14%]',
                  index === 4 && 'flex-1',
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
      </Table>

      <div ref={cardContentRef}>
        <SimpleBar
          ref={simpleBarRef}
          className={cn(!asSectionContent && '-mx-2 px-2 pb-3')}
          autoHide={false}
        >
          <div ref={itemsWrapperRef} className={cn(asSectionContent && 'px-2 pb-2')}>
            <Table variant="pills" className="[&_table]:block [&_table]:w-full">
              <TableBody className="flex flex-col gap-2">
                {sortedBudgetStatements.map((budgetStatement) => (
                  <BudgetStatementTableItem
                    key={budgetStatement.id}
                    budgetStatement={budgetStatement}
                    budgetMetric={budgetMetric}
                    className={cn(
                      'flex h-15.5! w-full cursor-pointer items-center border-b-0!',
                      !asSectionContent &&
                        'justify-between rounded-none! shadow-sm! last:rounded-b-xl!',
                    )}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
