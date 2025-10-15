import { ArrowRight } from 'lucide-react'
import { Avatar, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { useBuilderTeamItem } from '../builder-teams-item/use-builder-team-item'

export interface CompactItemProps {
  team: Team
  className?: string
}

export default function CompactItem({ team, className }: CompactItemProps) {
  const statusBadgeStyles = useBuilderTeamItem()
  return (
    <div className={cn('bg-popover w-full rounded-xl p-2 pb-1 shadow-xs', className)}>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="size-8">
            <AvatarImage src={team.image} alt={team.name || 'Wallet'} />
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-foreground/30 text-sm/5.5 font-semibold">{team.shortCode}</span>
              <span className="text-foreground text-sm/5.5 font-semibold">{team.name}</span>
            </div>
            <Badge
              variant="default"
              className={cn(statusBadgeStyles[team.status], 'px-3 leading-4.5')}
            >
              {team.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
