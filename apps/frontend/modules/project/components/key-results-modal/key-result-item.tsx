import Link from 'next/link'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-button'
import { KeyResultModal } from './key-result-modal'
import type { Route } from 'next'

interface KeyResultItemProps {
  keyResult: ScopeOfWork_KeyResult
}

function KeyResultItem({ keyResult }: KeyResultItemProps) {
  const hasLink = Boolean(keyResult.link && keyResult.link !== '')

  return (
    <li className="border-muted mb-0! flex flex-wrap items-center justify-between gap-x-2 border-b px-2 pb-2 last:border-b-0 sm:flex-nowrap sm:gap-2">
      {hasLink ? (
        <Link href={keyResult.link as Route} target="_blank" className="flex items-center gap-1">
          <KeyResultModal keyResult={keyResult} />
        </Link>
      ) : (
        <div className="flex items-center gap-1">
          <KeyResultModal keyResult={keyResult} />
        </div>
      )}

      {hasLink && (
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

export { KeyResultItem }
