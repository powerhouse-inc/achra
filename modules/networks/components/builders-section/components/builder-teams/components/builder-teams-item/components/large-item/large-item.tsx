import { ArrowRight } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType, type TeamCategory } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'
import ItemProfile from '../profile/profile'
import RoleBadge from '../role-badge/role-badge'
import ItemScope from '../scope-badge/scope-badge'

export interface LargeItemProps {
  team: Team
  className?: string
}

export default function LargeItem({ team, className }: LargeItemProps) {
  return (
    <div
      className={cn(
        'bg-popover grid w-full grid-cols-[1fr_1fr_1fr_1fr_auto] items-center rounded-xl px-2 py-3 shadow-xs xl:px-4',
        className,
      )}
    >
      <ItemProfile
        name={team.name}
        shortCode={team.shortCode}
        status={team.status}
        image={team.image}
      />
      <div className="flex justify-between">
        {team.type === ResourceType.EcosystemActor ? (
          <div className="flex flex-col gap-1">
            {team.scopes.map((scope) => (
              <ItemScope key={scope.id} scope={scope} size="large" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {team.category.map((category) => (
              <CategoryBadge key={category} category={category as TeamCategory} />
            ))}
          </div>
        )}
      </div>
      <RoleBadge type={team.type} />
      <div />
      <Button variant="outline" size="icon">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
