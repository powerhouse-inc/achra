'use client'
import { Button } from '@achra/ui/button'
import { cn } from '@achra/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@achra/ui/popover'
import { Link } from 'lucide-react'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { PopoverContentDeliverable } from './popover-content-deliverable'

interface DeliverableListPopoverProps {
  title: string
  code: string
  keyResults: ScopeOfWork_KeyResult[]
  count?: number
  className?: string
}

function DeliverableListPopover({
  title,
  keyResults,
  count,
  code,
  className,
}: Readonly<DeliverableListPopoverProps>) {
  return (
    <div className={cn('max-w-fit', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="bg-secondary hover:bg-secondary/80 flex items-center gap-2 rounded-md px-3 py-2"
          >
            <Link className="text-foreground h-6 w-6" />
            {count && <span className="text-sm/5.5 font-semibold">{count}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-input bg-popover w-98 rounded-2xl border px-4 pr-10 shadow-md"
        >
          <PopoverContentDeliverable
            title={title}
            className={className}
            code={code}
            keyResults={keyResults}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DeliverableListPopover }
