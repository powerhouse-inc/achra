import { ArrowRight } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType, type TeamCategory } from '@/modules/shared/types/types'
import BadgeGroup from '../badge-group/badge-group'
import CategoryBadge from '../category-badge/category-badge'
import ItemProfile from '../profile/profile'
import RoleBadge from '../role-badge/role-badge'
import ScopeBadge from '../scope-badge/scope-badge'

export interface LargeItemProps {
  team: Team
  profileUpdateDate: string
  className?: string
}

export default function LargeItem({ team, className, profileUpdateDate }: LargeItemProps) {
  return (
    <div
      className={cn(
        'bg-popover hover:bg-accent grid w-full grid-cols-[1fr_15%_1fr_13%_auto] items-center gap-x-15 rounded-xl px-2 py-3 shadow-xs xl:gap-x-22 xl:px-4 2xl:gap-x-25',
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
          team.scopes.length > 1 ? (
            <BadgeGroup items={team.scopes} />
          ) : team.scopes.length === 0 ? null : (
            <ScopeBadge key={team.scopes[0].id} scope={team.scopes[0]} size="large" />
          )
        ) : team.category.length > 2 ? (
          <BadgeGroup items={team.category as TeamCategory[]} />
        ) : team.category.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {team.category.map((category) => (
              <CategoryBadge key={category} category={category as TeamCategory} />
            ))}
          </div>
        )}
      </div>
      <RoleBadge type={team.type} />
      <div className="flex flex-col">
        <span className="text-foreground text-sm/5.5 font-semibold">Profile Updated</span>
        <span className="text-foreground/50 text-sm/5.5 font-semibold">{profileUpdateDate}</span>
      </div>
      <Button variant="outline" size="icon">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
