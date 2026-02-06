import type { BuilderStatus, Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { Avatar, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'
import { BuildersStatusChip } from '../chips/builders-status-chip'

export interface BuilderProfileProps {
  name: Maybe<string> | undefined
  code: Maybe<string> | undefined
  status: Maybe<BuilderStatus> | undefined
  image: string
  className?: string
}

export default function BuilderProfile({
  name,
  code,
  status,
  image,
  className,
}: BuilderProfileProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar className="size-8">
        <AvatarImage src={image} alt={name ?? 'Wallet'} />
      </Avatar>
      <div className="flex flex-col">
        <p className="text-foreground/30 line-clamp-1 w-full text-sm/5.5 font-semibold">
          {code?.toUpperCase()} <span className="text-foreground">{name}</span>
        </p>
        <BuildersStatusChip status={status} />
      </div>
    </div>
  )
}
