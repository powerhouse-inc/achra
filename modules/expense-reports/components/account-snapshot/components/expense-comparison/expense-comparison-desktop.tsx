import { InfoIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import type { ExpenseComparisonLineItem } from '../../types'

interface ExpenseComparisonDesktopProps {
  lineItems: ExpenseComparisonLineItem[]
}

function ExpenseComparisonDesktop({ lineItems }: ExpenseComparisonDesktopProps) {
  const hasOffChain = lineItems.some((item) => item.offChainIncluded !== undefined)
  const firstMonthIndex = lineItems.findIndex((item) => !item.isTotals)

  return (
    <Table variant="default" className="bg-popover w-full border-collapse rounded-xl shadow-lg">
      <TableHeader className="lg:[&_th]:p-4! lg:[&_th]:text-base/6">
        <TableRow className="border-b hover:bg-transparent">
          <TableHead
            colSpan={2}
            rowSpan={hasOffChain ? 2 : 1}
            className="align-center text-foreground/30 border-r py-3 text-right text-base/6"
          >
            Reported Actuals
          </TableHead>
          {hasOffChain ? (
            <TableHead colSpan={4} className="py-3 text-center">
              Net Expense Transactions
            </TableHead>
          ) : (
            <>
              <TableHead className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>Net Expense Transactions</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="text-foreground/50 size-4" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="end" className="max-w-70">
                      On-Chain view offers valuable insights into On-Chain dynamics, but excludes
                      external (off-chain) transactions.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead className="text-foreground/30 py-3 text-right text-base/6">
                Difference
              </TableHead>
            </>
          )}
        </TableRow>
        {hasOffChain && (
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="py-3 text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-foreground/30 text-base/6">On-chain only</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="text-foreground/30 size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="max-w-64">
                    On-Chain view offers valuable insights into On-Chain dynamics, but excludes
                    external (off-chain) transactions.
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead className="text-foreground/30 border-r py-3 text-right text-base/6">
              <span className="hidden lg:inline">Difference</span>
              <span className="lg:hidden">Diff</span>
            </TableHead>
            <TableHead className="py-3 text-right">
              <div className="flex items-center justify-end gap-1">
                <div className="text-foreground/30 text-base/6">
                  <span className="hidden lg:inline">Including off-chain</span>
                  <span className="lg:hidden">Inc. off-chain</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="text-foreground/30 size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="max-w-60">
                    Enhance financial tracking and expense analysis by including off-chain
                    transactions.
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead className="text-foreground/30 py-3 text-right text-base/6">
              <span className="hidden lg:inline">Difference</span>
              <span className="lg:hidden">Diff</span>
            </TableHead>
          </TableRow>
        )}
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-b">
        {lineItems.map((item, index) => {
          const isFirstMonth = !item.isTotals && index === firstMonthIndex
          const isTotals = item.isTotals

          return (
            <TableRow
              key={isTotals ? 'totals' : item.month}
              className={cn(
                '**:data-[type="value"]:text-foreground/50 border-b [&_td]:text-sm/5.5 [&_td]:font-semibold lg:[&_td]:p-4 lg:[&_td]:text-base/6',
                isFirstMonth && 'bg-accent',
                isTotals && 'font-semibold',
                !isTotals && !lineItems[index + 1]?.isTotals && 'border-b-transparent',
              )}
            >
              <TableCell className={cn('text-foregound border-r py-3', !isTotals && 'uppercase')}>
                {isTotals ? 'Totals' : item.month}
              </TableCell>
              <TableCell
                data-type={isTotals ? 'totals' : 'value'}
                className={cn('border-r py-3 text-right', isTotals && 'font-semibold')}
              >
                {usLocalizedNumber(item.reportedActuals, 2)} USD
              </TableCell>
              {hasOffChain ? (
                <>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {usLocalizedNumber(item.onChainOnly, 2)} USD
                  </TableCell>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('border-r py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {usLocalizedNumber(item.onChainDifference, 2)}%
                  </TableCell>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {item.offChainIncluded !== undefined
                      ? `${usLocalizedNumber(item.offChainIncluded, 2)} USD`
                      : `${usLocalizedNumber(item.onChainOnly, 2)} USD`}
                  </TableCell>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {item.offChainDifference !== undefined
                      ? `${usLocalizedNumber(item.offChainDifference, 2)}%`
                      : `${usLocalizedNumber(item.onChainDifference, 2)}%`}
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {usLocalizedNumber(item.onChainOnly, 2)} USD
                  </TableCell>
                  <TableCell
                    data-type={isTotals ? 'totals' : 'value'}
                    className={cn('py-3 text-right', isTotals && 'font-semibold')}
                  >
                    {usLocalizedNumber(item.onChainDifference, 2)}%
                  </TableCell>
                </>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { ExpenseComparisonDesktop }
