'use client'

import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'
import { useIsMobile } from '@/modules/shared/hooks/use-mobile'
import { cn } from '@/modules/shared/lib/utils'
import ExpandableButtonItem from './expandable-button-item'
import MaybeScrollableList from './maybe-scrollable-list'
import type { DeliverableViewMode } from '../../deliverable-card/deliverable-card'

interface KeyResultsProps {
  keyResults: ScopeOfWork_KeyResult[]
  viewMode: DeliverableViewMode
  expanded: boolean
  handleToggleExpand: () => void
  maxKeyResultsOnRow: number
}

export default function KeyResults({
  keyResults,
  viewMode,
  expanded,
  handleToggleExpand,
  maxKeyResultsOnRow,
}: KeyResultsProps) {
  const isEmpty = keyResults.length === 0
  const isMobile = useIsMobile()

  const results = useMemo(() => {
    if (viewMode === 'compacted') {
      return expanded ? keyResults : keyResults.slice(0, keyResults.length > 4 ? 3 : 4)
    }

    return keyResults
  }, [expanded, keyResults, viewMode])

  const componentHeight = useMemo(() => {
    let height: number | 'auto' = 'auto'
    // padding bottom + title + gap
    const NON_VARIABLE_HEIGHTS = 8 + 22 + 8

    // calculate the height of the key results based on which card
    // on the row has more items
    if (viewMode === 'detailed') {
      if (maxKeyResultsOnRow > 0) {
        const items = Math.min(6, maxKeyResultsOnRow)
        // items * its height + gap between items
        height = NON_VARIABLE_HEIGHTS + items * 18 + (items - 1) * 8
      }
    } else {
      // compacted:
      if (!expanded) {
        if (maxKeyResultsOnRow === 0) {
          // all on the row are empty
          height = 'auto'
        } else if (maxKeyResultsOnRow <= 4) {
          const items = Math.min(4, maxKeyResultsOnRow)
          height = NON_VARIABLE_HEIGHTS + items * 18 + (items - 1) * 8
        } else {
          // more than 4 so we have at least one card with the expand button
          height = NON_VARIABLE_HEIGHTS + 70 + 26
        }
      }
    }

    return height
  }, [expanded, maxKeyResultsOnRow, viewMode])

  return (
    <div
      className="mt-4 flex w-full flex-col gap-2 overflow-hidden rounded-lg border px-2 pt-1 pb-2"
      style={!isMobile ? { height: componentHeight } : undefined}
    >
      <div className="m-0 text-xs/4.5 font-medium">
        {isMobile && isEmpty ? 'No Key Results' : 'Key Results'}
      </div>
      {((isMobile && !isEmpty) || !isMobile) && (
        <MaybeScrollableList
          scrollable={!isMobile && (viewMode === 'detailed' || expanded) && keyResults.length > 6}
        >
          {isEmpty ? (
            <div className="flex h-full items-center justify-center self-stretch md:pb-2">
              <span className="px-4 italic">No Key Results</span>
            </div>
          ) : (
            <>
              {results.map((keyResult) => (
                <li className="flex items-center" key={keyResult.id}>
                  {keyResult.link ? (
                    <a
                      href={keyResult.link}
                      target="_blank"
                      className={cn(
                        'group/link text-foreground relative flex max-w-full items-center gap-1.5 truncate pl-5.5 text-sm/4.5 font-medium',
                        'before:bg-foreground before:absolute before:top-1.5 before:left-2 before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-[""]',
                      )}
                    >
                      <div className="max-w-full truncate group-hover/link:underline">
                        {keyResult.title}
                      </div>
                      <ArrowUpRight className="text-foreground size-4 min-w-4" />
                    </a>
                  ) : (
                    <div
                      className={cn(
                        'relative flex max-w-full gap-1.5 pl-6 text-sm font-medium',
                        'before:bg-foreground before:absolute before:top-1.5 before:left-2 before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-[""]',
                      )}
                    >
                      <span className="truncate">{keyResult.title}</span>
                      <div
                        className="ml-2 rounded-md bg-slate-50 px-2 py-0 text-xs leading-[18px] font-medium"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Todo
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </>
          )}
        </MaybeScrollableList>
      )}
      {viewMode === 'compacted' && keyResults.length > 4 && (
        <ExpandableButtonItem expanded={expanded} handleToggleExpand={handleToggleExpand} />
      )}
    </div>
  )
}
