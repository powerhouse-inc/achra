'use client'

import { InfoIcon } from 'lucide-react'
import type { ExpenseComparisonLineItem } from '@/modules/expense-reports/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'

interface ExpenseComparisonMobileProps {
  lineItems: ExpenseComparisonLineItem[]
  hasOffChainData: boolean
}

function ExpenseComparisonLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground/30 text-base/6 font-semibold">{children}</span>
}

function ExpenseComparisonValue({
  children,
  isTotals = false,
}: {
  children: React.ReactNode
  isTotals: boolean
}) {
  return (
    <span
      className={cn('text-foreground/50 text-sm/5.5 font-semibold', isTotals && 'text-foreground')}
    >
      {children}
    </span>
  )
}

function ExpenseComparisonContent({
  item,
  hasOffChainData,
  isTotals = false,
}: {
  item: ExpenseComparisonLineItem
  hasOffChainData: boolean
  isTotals: boolean
}) {
  return (
    <div className="px-4 pb-4">
      {/* Reported Actuals */}
      <div className="flex items-center justify-between py-2">
        <ExpenseComparisonLabel>Reported Actuals</ExpenseComparisonLabel>
        <ExpenseComparisonValue isTotals={isTotals}>
          {usLocalizedNumber(item.reportedActuals, 2)} USD
        </ExpenseComparisonValue>
      </div>

      {/* Net Expense Transactions Header */}
      {hasOffChainData && (
        <div className="text-foreground pb-2 text-center text-sm/5.5 font-semibold">
          Net Expense Transactions
        </div>
      )}

      <div className="-mx-2 flex flex-col gap-1 rounded-lg border p-2">
        {/* On-chain only */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1">
            <ExpenseComparisonLabel>
              {hasOffChainData ? 'On-chain only' : 'Net Exp Transactions'}
            </ExpenseComparisonLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="text-foreground/30 size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-70">
                Net expense transactions from on-chain data only.
              </TooltipContent>
            </Tooltip>
          </div>
          <ExpenseComparisonValue isTotals={isTotals}>
            {usLocalizedNumber(item.onChainOnly, 2)} USD
          </ExpenseComparisonValue>
        </div>

        <div className="-mx-2">
          <Separator className="border-accent border" />
        </div>

        {/* On-chain Difference */}
        <div className="flex items-center justify-between py-1">
          <ExpenseComparisonLabel>Difference</ExpenseComparisonLabel>
          <ExpenseComparisonValue isTotals={isTotals}>
            {usLocalizedNumber(item.onChainDifference, 2)}%
          </ExpenseComparisonValue>
        </div>

        {/* Off-chain Section */}
        {hasOffChainData && item.offChainIncluded !== undefined && (
          <>
            <div className="-mx-2">
              <Separator />
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1">
                <ExpenseComparisonLabel>Including off-chain</ExpenseComparisonLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="text-foreground/30 size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start" className="max-w-70">
                    Net expense transactions including both on-chain and off-chain data.
                  </TooltipContent>
                </Tooltip>
              </div>
              <ExpenseComparisonValue isTotals={isTotals}>
                {usLocalizedNumber(item.offChainIncluded, 2)} USD
              </ExpenseComparisonValue>
            </div>

            <div className="-mx-2">
              <Separator className="border-accent border" />
            </div>

            <div className="flex items-center justify-between py-1">
              <ExpenseComparisonLabel>Difference</ExpenseComparisonLabel>
              <ExpenseComparisonValue isTotals={isTotals}>
                {item.offChainDifference !== undefined
                  ? `${usLocalizedNumber(item.offChainDifference, 2)}%`
                  : '-'}
              </ExpenseComparisonValue>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ExpenseComparisonMobile({ lineItems, hasOffChainData }: ExpenseComparisonMobileProps) {
  if (!lineItems.length) return null

  const [firstItem, ...restItems] = lineItems

  return (
    <div className="space-y-2">
      {/* First Item - Always Expanded */}
      <Card className="gap-2 border-none py-2">
        <CardContent className="px-0">
          <div className="px-4 text-sm/5.5 font-semibold">
            {firstItem.isTotals ? '3 Month Totals' : firstItem.month}
          </div>

          <ExpenseComparisonContent
            item={firstItem}
            hasOffChainData={hasOffChainData}
            isTotals={firstItem.isTotals ?? false}
          />
        </CardContent>
      </Card>

      {/* Remaining Items - Accordion */}
      {restItems.length > 0 && (
        <Accordion type="multiple" className="space-y-2">
          {restItems.map((item, index) => {
            const id = item.isTotals ? `totals-${index}` : item.month

            return (
              <AccordionItem key={id} value={id} className="bg-popover rounded-lg shadow-xl">
                <AccordionTrigger className="[&>svg]:text-foreground px-4 py-4 text-sm font-semibold hover:no-underline">
                  {item.isTotals ? '3 Month Totals' : item.month}
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <ExpenseComparisonContent
                    item={item}
                    hasOffChainData={hasOffChainData}
                    isTotals={item.isTotals ?? false}
                  />
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </div>
  )
}

export { ExpenseComparisonMobile }
