import { BuildersCategoryChip } from '@/modules/shared/components/chips/builders-category-chip'
import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType } from '@/modules/shared/types/types'
import CategoryBadgeGroup from './components/category-badge-group/category-badge-group'
import ScopeBadgeGroup from './components/scope-badge-group/scope-badge-group'

interface BuilderDomainProps {
  team: Team
  domain?: 'scope' | 'category'
  isMobile?: boolean
}

export default function BuilderDomain({ team, domain, isMobile }: BuilderDomainProps) {
  const shouldRenderScopes = team.type === ResourceType.EcosystemActor || domain === 'scope'
  const shouldRenderCategories =
    (domain === 'category' || domain === undefined) && team.type !== ResourceType.EcosystemActor

  return (
    <div className="w-fit">
      {shouldRenderScopes ? (
        isMobile ? (
          <div className="flex gap-1">
            {team.scopes.map((scope) => (
              <BuildersScopesChip key={scope.id} scope={scope.name} size="small" />
            ))}
          </div>
        ) : team.scopes.length > 2 ? (
          <ScopeBadgeGroup items={team.scopes} />
        ) : team.scopes.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {team.scopes.map((scope) => (
              <BuildersScopesChip key={scope.id} scope={scope.name} size="large" />
            ))}
          </div>
        )
      ) : shouldRenderCategories ? (
        team.categories.length > 2 ? (
          <CategoryBadgeGroup items={team.categories} />
        ) : team.categories.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {team.categories.map((category) => (
              <BuildersCategoryChip key={category} category={category} />
            ))}
          </div>
        )
      ) : null}
    </div>
  )
}
