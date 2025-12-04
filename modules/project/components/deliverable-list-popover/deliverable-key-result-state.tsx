import { ArrowUpRight } from 'lucide-react'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { KeyResultStatusChip } from '../key-result-status/key-result-status'

interface DeliverableKeyResultStateProps {
  keyResult: ScopeOfWork_KeyResult
}

export function DeliverableKeyResultState({ keyResult }: DeliverableKeyResultStateProps) {
  const hasLink = Boolean(keyResult.link && keyResult.link !== '')

  return (
    <>
      <span className="bg-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-foreground max-w-68 truncate text-sm/5.5 font-medium">
            {keyResult.title}
          </span>
          {hasLink ? <ArrowUpRight className="size-4" /> : <KeyResultStatusChip />}
        </div>
      </div>
    </>
  )
}
