'use client'
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

function ForumInfoChip({ value, type, popular = false }: ForumInfoChipProps) {
  return (
    <div className="border-border flex w-full items-center gap-1 overflow-hidden rounded-lg border pr-2 lg:gap-2">
      <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center p-2">
        {type === 'likes' && <LikeIcon className="size-4" />}
        {type === 'replies' && <MessagesIcon className="size-4" />}
        {type === 'date' && <ClockIcon className="size-4" />}
      </div>
      <span>{value}</span>
      {popular && <FireIcon className="size-4" />}
    </div>
  )
}

export { ForumInfoChip }
