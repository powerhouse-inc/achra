import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType, type TeamCategory } from '@/modules/shared/types/types'
import { ProfileUpdatedDate, ProfileUpdatedDateSkeleton } from '../../../profile-updated-date'
import CategoryBadge from '../category-badge/category-badge'
import ItemProfile from '../profile/profile'
import RoleBadge from '../role-badge/role-badge'
import { useCompactItem } from './use-compact-item'

export interface CompactItemProps {
  team: Team
  className?: string
}

export default function CompactItem({ team, className }: CompactItemProps) {
  const { scopeSizeVariant } = useCompactItem({ team })
  return (
    <div
      className={cn(
        'bg-popover relative flex w-full flex-col gap-2 overflow-x-hidden rounded-xl p-2 pb-1 shadow-xs',
        className,
      )}
    >
      <div className="flex justify-between">
        <ItemProfile
          name={team.name}
          shortCode={team.shortCode}
          status={team.status}
          image={team.image}
        />
        <Button variant="outline" size="icon" aria-label="View builder team details">
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <Separator className="sm:hidden" />
      <div className="flex justify-between sm:mt-2">
        {team.type === ResourceType.EcosystemActor ? (
          <>
            <div className="flex gap-1">
              {team.scopes.slice(0, 2).map((scope) => (
                <BuildersScopesChip key={scope.id} scope={scope} size={scopeSizeVariant} />
              ))}
            </div>
            <RoleBadge type={team.type} />
          </>
        ) : (
          <>
            <div className="flex gap-1">
              {team.category.map((category) => (
                <CategoryBadge key={category} category={category as TeamCategory} />
              ))}
            </div>
            <RoleBadge type={team.type} />
          </>
        )}
      </div>
      <div className="bg-background border-border absolute bottom-0 left-0 flex h-7.5 w-full items-center justify-between border-t px-4">
        <span className="text-foreground text-xs/4.5 font-medium">Profile Updated</span>
        <Suspense fallback={<ProfileUpdatedDateSkeleton />}>
          <ProfileUpdatedDate
            className="text-foreground/50 text-sm/5.5 font-semibold"
            team={team}
          />
        </Suspense>
      </div>
    </div>
  )
}
