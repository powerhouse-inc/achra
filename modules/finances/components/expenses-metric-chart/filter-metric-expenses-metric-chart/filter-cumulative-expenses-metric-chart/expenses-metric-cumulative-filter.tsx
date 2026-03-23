'use client'

import { CheckCircle2, CheckIcon, ChevronDown, Circle } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CumulativeType } from '@/modules/finances/lib/expenses-metric-chart-search-params'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { cn } from '@/shared/lib/utils'
import { CUMULATIVE_OPTIONS } from './cumulative-options'

interface ExpensesMetricCumulativeFilterProps {
  isCumulative: boolean
  cumulativeType: CumulativeType
  onToggleCumulative: () => void
  onChangeCumulativeType: (value: CumulativeType) => void
}

function ExpensesMetricCumulativeFilter({
  isCumulative,
  cumulativeType,
  onToggleCumulative,
  onChangeCumulativeType,
}: Readonly<ExpensesMetricCumulativeFilterProps>) {
  const [isOpen, setIsOpen] = useState(false)

  const buttonLabel = useMemo(() => {
    if (!isCumulative) {
      return 'Cumulative'
    }

    return cumulativeType === 'relative' ? 'Relative Cumulative' : 'Absolute Cumulative'
  }, [cumulativeType, isCumulative])

  return (
    <Popover
      open={isCumulative ? isOpen : false}
      onOpenChange={(open) => {
        setIsOpen(isCumulative ? open : false)
      }}
    >
      <div className="bg-background flex h-9 items-center overflow-hidden rounded-lg border">
        <button
          type="button"
          className="flex h-full items-center gap-2 px-3 text-sm font-semibold"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false)
            }
            onToggleCumulative()
          }}
        >
          <span
            aria-hidden="true"
            className={cn(
              'border-input dark:bg-input/30 flex size-4 shrink-0 items-center justify-center rounded-sm border shadow-xs',
              isCumulative && 'border-primary bg-primary text-primary-foreground',
            )}
          >
            {isCumulative && <CheckIcon className="size-2.5" />}
          </span>
        </button>

        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={!isCumulative}
            className={cn(
              'flex h-full items-center gap-2 border-l px-3 text-sm font-semibold transition-colors',
              isCumulative
                ? 'text-foreground hover:bg-accent/40 cursor-pointer'
                : 'text-muted-foreground cursor-not-allowed',
            )}
          >
            <span className="hidden xl:inline">{buttonLabel}</span>
            <span className="xl:hidden">
              {isCumulative
                ? cumulativeType === 'relative'
                  ? 'Relative'
                  : 'Absolute'
                : 'Cumulative'}
            </span>
            <ChevronDown className={cn('size-4 transition-transform', isOpen && 'rotate-180')} />
          </button>
        </PopoverTrigger>
      </div>

      <PopoverContent align="end" className="w-88 max-w-[calc(100vw-2rem)] p-2">
        <div className="flex flex-col gap-2">
          {CUMULATIVE_OPTIONS.map((option) => {
            const isActive = cumulativeType === option.value

            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'hover:bg-accent/40 flex items-start gap-3 rounded-md border p-3 text-left transition-colors',
                  isActive && 'bg-accent border-primary/20',
                )}
                onClick={() => {
                  onChangeCumulativeType(option.value)
                  setIsOpen(false)
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
      </PopoverContent>
    </Popover>
  )
}

export { ExpensesMetricCumulativeFilter }
