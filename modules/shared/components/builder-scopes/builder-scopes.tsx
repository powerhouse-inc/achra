import type { BuilderScope } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersScopesChip from '@/modules/shared/components/chips/builders-scopes-chip/builders-scopes-chip'
import ScopeBadgeGroup from './components/scope-badge-group/scope-badge-group'

interface BuilderScopesProps {
  scopes: BuilderScope[]
  isMobile?: boolean
}

export default function BuilderScopes({ scopes, isMobile }: BuilderScopesProps) {
  return (
    <div className="w-fit">
      {isMobile ? (
        <div className="flex gap-1">
          {scopes.map((scope) => (
            <BuildersScopesChip key={scope} scope={scope} size="small" />
          ))}
        </div>
      ) : scopes.length > 2 ? (
        <ScopeBadgeGroup scopes={scopes} />
      ) : scopes.length === 0 ? null : (
        <div className="flex flex-col gap-1">
          {scopes.map((scope) => (
            <BuildersScopesChip key={scope} scope={scope} />
          ))}
        </div>
      )}
    </div>
  )
}
