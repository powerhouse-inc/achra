import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType } from '@/modules/shared/types/types'
import { ProfileUpdatedDate, ProfileUpdatedDateSkeleton } from '../../../profile-updated-date'
import CategoryBadge from '../category-badge/category-badge'
import CategoryBadgeGroup from '../category-badge-group/category-badge-group'
import ItemProfile from '../profile/profile'
import RoleBadge from '../role-badge/role-badge'
import ScopeBadgeGroup from '../scope-badge-group/scope-badge-group'

export interface LargeItemProps {
  team: Team
  className?: string
}

export default function LargeItem({ team, className }: LargeItemProps) {
  return (
    <div
      className={cn(
        'bg-popover hover:bg-accent grid w-full grid-cols-[25%_17%_17%_14%_auto] items-center justify-between rounded-xl px-2 py-3 shadow-xs hover:shadow-sm',
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
          team.scopes.length > 2 ? (
            <ScopeBadgeGroup items={team.scopes} />
          ) : team.scopes.length === 0 ? null : (
            <div className="flex flex-col gap-1">
              {team.scopes.map((scope) => (
                <BuildersScopesChip key={scope.id} scope={scope} size="large" />
              ))}
            </div>
          )
        ) : team.categories.length > 2 ? (
          <CategoryBadgeGroup items={team.categories} />
        ) : team.categories.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {team.categories.map((category) => (
              <CategoryBadge key={category} category={category} />
            ))}
          </div>
        )}
      </div>
      <RoleBadge type={team.type} />
      <div className="flex flex-col">
        <span className="text-foreground text-sm/5.5 font-semibold">Profile Updated</span>
        <Suspense fallback={<ProfileUpdatedDateSkeleton />}>
          <ProfileUpdatedDate
            className="text-foreground/50 text-sm/5.5 font-semibold"
            team={team}
          />
        </Suspense>
      </div>
      <Button variant="outline" size="icon" aria-label="View builder team details">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
