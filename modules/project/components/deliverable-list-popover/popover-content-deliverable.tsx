'use client'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultItem } from './key-result-item'

interface PopoverContentDeliverableProps {
  title: string
  code: string
  keyResults: ScopeOfWork_KeyResult[]
  count?: number
  className?: string
}

function PopoverContentDeliverable({
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

      <ul className="flex flex-col gap-2 pl-6">
        {keyResults.length > 0 ? (
          keyResults.map((keyResult) => {
            const hasLink = Boolean(keyResult.link && keyResult.link !== '')
            return <KeyResultItem key={keyResult.id} keyResult={keyResult} hasLink={hasLink} />
          })
        ) : (
          <li>
            <div className="flex flex-col">
              <span className="text-foreground/30 text-sm/5.5 font-semibold">No Key Results</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export { PopoverContentDeliverable }
