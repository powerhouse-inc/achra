import { useMemo } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import type { Team } from '@/modules/shared/types/team'
import type { ScopeSizeVariant } from '../scope-badge/use-scope-badge'

interface UseCompactItemProps {
  team: Team
}

export function useCompactItem({ team }: UseCompactItemProps) {
  const isDesktop = useMediaQuery({ from: 'lg' })

  const scopeSizeVariant: ScopeSizeVariant = useMemo(() => {
    if (!isDesktop && team.scopes.length > 1) return 'small'
    return 'large'
  }, [isDesktop, team])

  return {
    scopeSizeVariant,
  }
}
