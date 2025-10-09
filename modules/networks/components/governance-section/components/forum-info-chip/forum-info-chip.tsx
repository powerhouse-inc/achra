import Image from 'next/image'

interface ForumInfoChipProps {
  value: string | number
  type: 'likes' | 'replies' | 'date'
  popular?: boolean
}

function ForumInfoChip({ value, type, popular = false }: ForumInfoChipProps) {
  return (
    <div className="outline-border flex w-full items-center gap-2 overflow-hidden rounded-lg pr-2 outline md:min-w-20 lg:min-w-[110px]">
      <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center p-2">
        {type === 'likes' && (
          <div className="relative size-4">
            <Image src="/networks/governance/like.svg" alt="fire" fill className="absolute" />
          </div>
        )}
        {type === 'replies' && (
          <div className="relative size-4">
            <Image src="/networks/governance/messages.svg" alt="reply" fill className="absolute" />
          </div>
        )}
        {type === 'date' && (
          <div className="relative size-4">
            <Image src="/networks/governance/clock.svg" alt="date" fill className="absolute" />
          </div>
        )}
      </div>
      <span>{value}</span>
      {popular && (
        <div className="relative ml-auto size-4">
          <Image src="/networks/governance/fire.svg" alt="fire" fill className="absolute" />
        </div>
      )}
    </div>
  )
}

export default ForumInfoChip
