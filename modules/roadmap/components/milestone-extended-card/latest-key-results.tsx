import { ArrowUpRight } from 'lucide-react'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/shared/lib/utils'

interface LatestKeyResultsProps {
  keyResults: ScopeOfWork_KeyResult[]
}

export default function LatestKeyResults({ keyResults }: LatestKeyResultsProps) {
  return (
    <div className="milestone-latest-key-results bg-popover flex flex-col gap-2 rounded-xl border p-2">
      <div className="text-card-foreground text-xs/4.5 font-medium">Latest Key Results</div>
      {keyResults.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <span className="text-sm/5.5 font-medium italic">No Key Results</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-2 p-0">
          {keyResults.map((keyResult) => (
            <li className="flex items-center" key={keyResult.id}>
              {keyResult.link ? (
                <a
                  href={keyResult.link}
                  target="_blank"
                  className={cn(
                    'group/link relative flex max-w-full items-center gap-1 truncate pl-3.5 text-sm/5.5 font-medium',
                    'before:bg-foreground before:absolute before:top-2 before:left-0 before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-[""]',
                  )}
                >
                  <div className="max-w-full truncate group-hover/link:underline">
                    {keyResult.title}
                  </div>
                  <ArrowUpRight className="text-foreground size-4 min-h-4 min-w-4" />
                </a>
              ) : (
                <div
                  className={cn(
                    'relative flex max-w-full gap-1 pl-3.5 text-sm/5.5 font-medium',
                    'before:bg-foreground/50 before:absolute before:top-2 before:left-0 before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-[""]',
                  )}
                >
                  <span className="text-foreground/50 truncate">{keyResult.title}</span>
                  <div className="bg-muted text-muted-foreground min-w-12.5 rounded-md px-1.5 py-0.5 text-xs/4.5 font-medium uppercase">
                    TO DO
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
