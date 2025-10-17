import { Avatar, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import type { TeamStatus } from '@/modules/shared/types/types'
import { useProfile } from './use-profile'

export interface ProfileProps {
  name: string
  shortCode: string
  status: TeamStatus
  image: string
  className?: string
}

export default function Profile({ name, shortCode, status, image, className }: ProfileProps) {
  const { statusBadgeStyles } = useProfile()
  return (
    <div className={cn('flex items-center gap-1 xl:gap-2', className)}>
      <Avatar className="size-8">
        <AvatarImage src={image} alt={name || 'Wallet'} />
      </Avatar>
      <div className="flex flex-col">
        <p className="text-foreground/30 line-clamp-1 w-full text-sm/5.5 font-semibold">
          {shortCode} <span className="text-foreground">{name}</span>
        </p>
        <Badge variant="default" className={cn(statusBadgeStyles[status], 'px-3 leading-4.5')}>
          {status.toUpperCase()}
        </Badge>
      </div>
    </div>
  )
}
