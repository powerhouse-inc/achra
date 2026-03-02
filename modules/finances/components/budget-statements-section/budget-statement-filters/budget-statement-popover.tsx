'use client'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Popover, PopoverTrigger } from '@/modules/shared/components/ui/popover'
import { cn } from '@/modules/shared/lib/utils'
import { type SortOptionValue, SortPopoverContent } from './popover-filter-content'

interface BudgetStatementPopoverProps {
  className?: string
  metric: SortOptionValue
  handleOnMetricSelect: (value: SortOptionValue) => void
  open?: boolean
  setOpen: (open: boolean) => void
}

export function BudgetStatementPopover({
  className,
  metric,
  handleOnMetricSelect,
  open,
  setOpen,
}: Readonly<BudgetStatementPopoverProps>) {
  return (
    <div className={cn('max-w-fit', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:stroke-foreground! h-fit p-0! font-semibold hover:bg-transparent lg:text-base/6 dark:hover:bg-transparent',

              '[&_path:nth-child(3)]:stroke-foreground [&_path:nth-child(4)]:stroke-foreground hover:[&_path:nth-child(3)]:stroke-foreground/50 hover:[&_path:nth-child(4)]:stroke-foreground/50 hover:[&_path:nth-child(1)]:stroke-foreground/30 hover:[&_path:nth-child(2)]:stroke-foreground/30',

              '[&_path:nth-child(1)]:stroke-foreground [&_path:nth-child(2)]:stroke-foreground hover:[&_path:nth-child(1)]:stroke-foreground/50 hover:[&_path:nth-child(2)]:stroke-foreground/50 hover:[&_path:nth-child(3)]:stroke-foreground/30 hover:[&_path:nth-child(4)]:stroke-foreground/30',
              'h-full px-4 py-2',
            )}
          >
            <ArrowUpDown className="size-4.5" />
          </Button>
        </PopoverTrigger>
        <SortPopoverContent metric={metric} handleOnMetricSelect={handleOnMetricSelect} />
      </Popover>
    </div>
  )
}
