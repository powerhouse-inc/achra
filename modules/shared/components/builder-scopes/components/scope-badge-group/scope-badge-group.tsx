import type { BuilderScope } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersScopesChip from '@/modules/shared/components/chips/builders-scopes-chip/builders-scopes-chip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/modules/shared/components/ui/hover-card'

export interface ScopeBadgeGroupProps {
  scopes: BuilderScope[]
}

export default function ScopeBadgeGroup({ scopes }: ScopeBadgeGroupProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="grid grid-cols-2 gap-1">
          {scopes.map((scope: BuilderScope) => (
            <BuildersScopesChip key={scope} scope={scope} size="medium" />
          ))}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit p-2" align="start">
        <div className="flex flex-col gap-1">
          {scopes.map((scope) => (
            <BuildersScopesChip key={scope} scope={scope} size="large" />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
