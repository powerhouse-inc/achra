import ClockIcon from '@/public/networks/governance/clock.svg'
import FireIcon from '@/public/networks/governance/fire.svg'
import LikeIcon from '@/public/networks/governance/like.svg'
import MessagesIcon from '@/public/networks/governance/messages.svg'
interface ForumInfoChipProps {
  value: string | number
  type: 'likes' | 'replies' | 'date'
  popular?: boolean
}

function ForumInfoChip({ value, type, popular = false }: ForumInfoChipProps) {
  return (
    <div className="outline-border flex w-full items-center gap-2 overflow-hidden rounded-lg pr-2 outline md:min-w-20 lg:min-w-[110px]">
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
