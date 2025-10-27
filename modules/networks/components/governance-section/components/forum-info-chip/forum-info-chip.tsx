'use client'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import ClockIcon from '@/public/networks/governance/clock.svg'
import FireIcon from '@/public/networks/governance/fire.svg'
import LikeIcon from '@/public/networks/governance/like.svg'
import MessagesIcon from '@/public/networks/governance/messages.svg'
import type { MeasureChipParams } from '../forum-list/forum-list'
interface ForumInfoChipProps {
  value: string | number
  type: 'likes' | 'replies' | 'date'
  popular?: boolean
  onMeasureChip?: (params: MeasureChipParams) => void
}

function ForumInfoChip({ value, type, popular = false, onMeasureChip }: ForumInfoChipProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const largeScreen = useMediaQuery({ from: 'md' })

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const width = rootRef.current.offsetWidth
    onMeasureChip?.({ type, width })
  }, [value, type, popular, onMeasureChip])

  const widthVar = useMemo(
    () => (largeScreen ? `var(--chip-width-${type}, auto)` : '100%'),
    [type, largeScreen],
  )

  return (
    <div
      ref={rootRef}
      style={{ width: widthVar }}
      className="border-border flex items-center gap-2 overflow-hidden rounded-lg border pr-2 md:min-w-20 lg:min-w-[110px]"
    >
      <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center p-2">
        {type === 'likes' && <LikeIcon className="size-4" />}
        {type === 'replies' && <MessagesIcon className="size-4" />}
        {type === 'date' && <ClockIcon className="size-4" />}
      </div>
      <span>{value}</span>
      {popular && (
        <div className="ml-auto">
          <FireIcon className="size-4" />
        </div>
      )}
    </div>
  )
}

export default ForumInfoChip
