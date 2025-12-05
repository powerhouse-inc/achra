import Link from 'next/link'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { DeliverableKeyResultState } from './deliverable-key-result-state'
import type { Route } from 'next'

interface KeyResultItemProps {
  keyResult: ScopeOfWork_KeyResult
  hasLink: boolean
}

export function KeyResultItem({ keyResult, hasLink }: KeyResultItemProps) {
  return (
    <li key={keyResult.id}>
      <div className="flex flex-col">
        {hasLink ? (
          <Link
            href={keyResult.link as Route}
            target="_blank"
            className="group flex items-start gap-2"
          >
            <DeliverableKeyResultState keyResult={keyResult} />
          </Link>
        ) : (
          <div className="group flex items-start gap-2">
            <DeliverableKeyResultState keyResult={keyResult} />
          </div>
        )}

        {hasLink && (
          <div className="flex items-center gap-1 pl-4">
            <span className="text-foreground/50 max-w-68 truncate text-xs/4.5 font-medium">
              {keyResult.link}
            </span>
            <CopyButton value={keyResult.link}>
              <CopyTrigger>
                <CopyAnimatedIcon className="size-3" />
              </CopyTrigger>
            </CopyButton>
          </div>
        )}
      </div>
    </li>
  )
}
