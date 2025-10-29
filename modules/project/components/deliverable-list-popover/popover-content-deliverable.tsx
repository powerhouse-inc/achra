'use client'
import { ArrowUpRight, CopyIcon } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { KeyResult } from '../../types'

interface PopoverContentDeliverableProps {
  title: string
  code: string
  keyResults: KeyResult[]
  count?: number
  className?: string
}

export function PopoverContentDeliverable({
  title,
  code,
  keyResults,
  className,
}: PopoverContentDeliverableProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex gap-1">
        <span className="text-foreground/30 flex text-sm/5.5 font-semibold">{code}</span>
        <span className="text-sm/5.5 font-semibold">{title}</span>
      </div>
      <ul className="flex flex-col gap-4 pl-6">
        {keyResults.map((keyResults) => (
          <li key={keyResults.id}>
            <div className="flex items-start gap-2">
              <span className="bg-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm/5.5 font-medium">
                    {keyResults.title}
                  </span>
                  <ArrowUpRight className="size-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground/50 text-xs/4.5 font-medium">
                    {keyResults.url}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="text-foreground/50 hover:text-foreground &>svg:px-0 h-fit py-0 has-[>svg]:px-0 has-[>svg]:py-0"
                    title="Copy URL"
                  >
                    <CopyIcon className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
