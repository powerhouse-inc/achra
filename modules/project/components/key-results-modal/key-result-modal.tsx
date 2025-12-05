import { ExternalLink } from 'lucide-react'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultStatusChip } from '../key-result-status/key-result-status'

interface KeyResultModalProps {
  keyResult: ScopeOfWork_KeyResult
}

export function KeyResultModal({ keyResult }: KeyResultModalProps) {
  const hasLink = Boolean(keyResult.link && keyResult.link !== '')

  return (
    <>
      <span
        className={cn(
          'h-1.5 w-1.5 shrink-0 rounded-full',
          hasLink ? 'bg-foreground' : 'bg-foreground/50',
        )}
      />
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            'flex items-center text-sm/5.5',
            hasLink ? 'text-foreground' : 'text-foreground/50',
          )}
        >
          {keyResult.title}
        </span>
      </div>
      {hasLink ? <ExternalLink className="h-3.5 w-3.5" /> : <KeyResultStatusChip />}
    </>
  )
}
