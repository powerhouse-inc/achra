import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'
import CategoryBadgeGroup from '../category-badge-group/category-badge-group'
import ScopeBadgeGroup from '../scope-badge-group/scope-badge-group'

interface DomainProps {
  team: Team
}

export default function Domain({ team }: DomainProps) {
  return (
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
  )
}
