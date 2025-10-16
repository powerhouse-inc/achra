import { ArrowRight } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType, type TeamCategory } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'
import ItemProfile from '../profile/profile'
import RoleBadge from '../role-badge/role-badge'
import ItemScope from '../scope-badge/scope-badge'
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
        'bg-popover flex w-full flex-col gap-2 rounded-xl p-2 pb-1 shadow-xs',
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
        <Button variant="outline" size="icon">
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <Separator className="sm:hidden" />
      <div className="flex justify-between sm:mt-2">
        {team.type === ResourceType.EcosystemActor ? (
          <>
            <div className="flex gap-1">
              {team.scopes.map((scope) => (
                <ItemScope key={scope.id} scope={scope} size={scopeSizeVariant} />
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
    </div>
  )
}
