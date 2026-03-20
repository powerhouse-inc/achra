'use client'

import { CheckCircle2, CheckIcon, Circle } from 'lucide-react'
import type { CumulativeType } from '@/modules/finances/lib/expenses-metric-chart-search-params'
import { cn } from '@/shared/lib/utils'
import { CUMULATIVE_OPTIONS } from './cumulative-options'

interface ExpensesMetricCumulativeDrawerProps {
  isCumulative: boolean
  cumulativeType: CumulativeType
  onToggleCumulative: () => void
  onChangeCumulativeType: (value: CumulativeType) => void
}

function ExpensesMetricCumulativeDrawer({
  isCumulative,
  cumulativeType,
  onToggleCumulative,
  onChangeCumulativeType,
}: Readonly<ExpensesMetricCumulativeDrawerProps>) {
  return (
    <div className="bg-popover flex flex-col rounded-md border py-1">
      <button
        type="button"
        className="flex items-center justify-between px-8 py-3 text-left text-sm/5.5 font-semibold"
        onClick={onToggleCumulative}
      >
        <span>Cumulative</span>
        <span
          aria-hidden="true"
          className={cn(
            'border-input dark:bg-input/30 flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs',
            isCumulative && 'border-primary bg-primary text-primary-foreground',
          )}
        >
          {isCumulative && <CheckIcon className="size-3.5" />}
        </span>
      </button>

      <div className="border-border border-t px-2 pt-2 pb-1">
        <div className="flex flex-col gap-2">
          {CUMULATIVE_OPTIONS.map((option) => {
            const isActive = isCumulative && cumulativeType === option.value

            return (
              <button
                key={option.value}
                type="button"
                disabled={!isCumulative}
                className={cn(
                  'flex items-start gap-3 rounded-md border p-3 text-left transition-colors',
                  isCumulative
                    ? 'hover:bg-accent/40 cursor-pointer'
                    : 'cursor-not-allowed opacity-50',
                  isActive && 'bg-accent border-primary/20',
                )}
                onClick={() => {
                  onChangeCumulativeType(option.value)
                }}
              >
                <div className="text-primary mt-0.5">
                  {isActive ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-sm font-semibold">{option.label}</span>
                  <span className="text-muted-foreground text-xs leading-5">
                    {option.description}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { ExpensesMetricCumulativeDrawer }
