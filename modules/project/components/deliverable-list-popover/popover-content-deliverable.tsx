'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultStatusChip } from '../key-result-status/key-result-status'
import type { Route } from 'next'

interface PopoverContentDeliverableProps {
  title: string
  code: string
  keyResults: ScopeOfWork_KeyResult[]
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

      <ul className="flex flex-col gap-2 pl-6">
        {keyResults.length > 0 ? (
          keyResults.map((keyResult) => {
            const hasLink = Boolean(keyResult.link && keyResult.link !== '')

            const containerClassName = 'flex items-start gap-2 group'

            const innerContent = (
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

            return (
              <li key={keyResult.id}>
                <div className="flex flex-col">
                  {hasLink ? (
                    <Link
                      href={keyResult.link as Route}
                      target="_blank"
                      className={containerClassName}
                    >
                      {innerContent}
                    </Link>
                  ) : (
                    <div className={containerClassName}>{innerContent}</div>
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
