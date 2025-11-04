import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultStatusChip } from '../key-result-status/key-result-status'
import type { Route } from 'next'

interface KeyResultItemProps {
  keyResult: ScopeOfWork_KeyResult
}

export function KeyResultItem({ keyResult }: KeyResultItemProps) {
  // TODO: Improve this logic when the api is implemented
  const isKeyResultTodo = keyResult.link

  return (
    <li className="border-muted mb-0! flex flex-wrap items-center justify-between gap-x-2 border-b px-2 pb-2 last:border-b-0 sm:flex-nowrap sm:gap-2">
      <Link href={keyResult.link as Route} target="_blank" className="flex items-center gap-1">
        <span
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full',
            isKeyResultTodo ? 'bg-foreground' : 'bg-foreground/50',
          )}
        />
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'flex items-center text-sm/5.5',
              isKeyResultTodo ? 'text-foreground' : 'text-foreground/50',
            )}
          >
            {keyResult.title}
          </span>
        </div>
        {isKeyResultTodo ? <ExternalLink className="h-3.5 w-3.5" /> : <KeyResultStatusChip />}
      </Link>
      {isKeyResultTodo && (
        <div className="flex items-center gap-2 sm:w-30 md:w-48 lg:w-64">
          <span className="text-muted-foreground w-full truncate text-end text-sm">
            {keyResult.link}
          </span>
          <CopyButton value={keyResult.link}>
            <CopyTrigger>
              <CopyAnimatedIcon className="size-4" />
            </CopyTrigger>
          </CopyButton>
        </div>
      )}
    </li>
  )
}
