import { Link } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shared/components/ui/popover'
import { cn } from '@/modules/shared/lib/utils'
import { PopoverContentDeliverable } from './popover-content-deliverable'
import type { KeyResult } from '../../types'

interface DeliverableListPopoverProps {
  title: string
  code: string
  keyResults: KeyResult[]
  count?: number
  className?: string
}

export function DeliverableListPopover({
  title,
  keyResults,
  count,
  code,
  className,
}: DeliverableListPopoverProps) {
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
          className="border-input bg-popover w-98 rounded-2xl border px-4 shadow-md"
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
