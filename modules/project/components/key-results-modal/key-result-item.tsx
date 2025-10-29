import { Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultStatusChip } from '../key-result-status/key-result-status'
import type { KeyResult } from '../../types'
import type { Route } from 'next'

interface KeyResultItemProps {
  keyResult: KeyResult
}

export function KeyResultItem({ keyResult }: KeyResultItemProps) {
  return (
    <li className="border-muted mb-0! flex items-center justify-between gap-2 border-b px-2 pb-2 last:border-b-0">
      <div className="flex items-center gap-1">
        <span
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full',
            keyResult.status ? 'bg-foreground' : 'bg-foreground/50',
          )}
        />
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'flex items-center text-sm/5.5',
              keyResult.status ? 'text-foreground' : 'text-foreground/50',
            )}
          >
            {keyResult.title}
          </span>
        </div>
        {keyResult.status ? (
          <Link
            href={`https://${keyResult.url}` as Route}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <KeyResultStatusChip />
        )}
      </div>
      {keyResult.status && (
        <div className="flex items-center gap-2 sm:w-30 md:w-48 lg:w-64">
          <span className="text-muted-foreground w-full truncate text-end text-sm">
            {keyResult.url}
          </span>
          <Button variant="ghost" size="iconXxs">
            <Copy />
          </Button>
        </div>
      )}
    </li>
  )
}
