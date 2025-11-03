import Link from 'next/link'
import type { RouteWithDynamicPages } from '@/modules/shared/types/routes'
import type { Team } from '@/modules/shared/types/team'
import { ResourceType } from '@/modules/shared/types/types'
import CompactItem from './components/compact-item/compact-item'
import LargeItem from './components/large-item/large-item'

export interface BuilderTeamsItemProps {
  team: Team
}

export function BuilderTeamsItem({ team }: BuilderTeamsItemProps) {
  const isEcosystemActor = team.type === ResourceType.EcosystemActor

  const href = (
    isEcosystemActor
      ? `/network/powerhouse/builders/ecosystem-actors/${team.code}`
      : `/network/powerhouse/builders/core-units/${team.shortCode}`
  ) as RouteWithDynamicPages

  return (
    <Link href={href}>
      <CompactItem className="min-h-33 lg:hidden" team={team} />
      <LargeItem className="hidden min-h-19.5 lg:grid" team={team} />
    </Link>
  )
}
