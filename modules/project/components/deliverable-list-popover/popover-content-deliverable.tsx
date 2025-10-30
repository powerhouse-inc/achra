'use client'
import { ArrowUpRight } from 'lucide-react'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
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
        {keyResults.map((keyResult) => (
          <li key={keyResult.id}>
            <div className="flex items-start gap-2">
              <span className="bg-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm/5.5 font-medium">{keyResult.title}</span>
                  <ArrowUpRight className="size-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-foreground/50 text-xs/4.5 font-medium">
                    {keyResult.url}
                  </span>
                  <CopyButton value={keyResult.url}>
                    <CopyTrigger>
                      <CopyAnimatedIcon className="size-3" />
                    </CopyTrigger>
                  </CopyButton>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
