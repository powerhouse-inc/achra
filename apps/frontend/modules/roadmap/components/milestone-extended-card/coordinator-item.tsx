import { Avatar, AvatarFallback } from '@achra/ui/avatar'
import { cn } from '@achra/ui/lib/utils'
import { UserRound } from 'lucide-react'

interface CoordinatorItemProps {
  name: string
  className?: string
}

function CoordinatorItem({ name, className }: CoordinatorItemProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-1', className)}>
      <Avatar className="size-6 flex-shrink-0">
        <AvatarFallback className="bg-border">
          <UserRound className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="truncate text-sm/5.5 font-semibold">{name}</div>
    </div>
  )
}

export { CoordinatorItem }
