import { useMemo } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import type { ScopeChipSizeVariant } from '@/modules/shared/components/chips/builders-scopes-chip'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'

interface UseCompactItemProps {
  builder: Builder
}

export function useCompactItem({ builder }: UseCompactItemProps) {
  const isDesktop = useMediaQuery({ from: 'lg' })
  const isMobile = useMediaQuery({ to: 'sm' })

  const scopeSizeVariant: ScopeChipSizeVariant = useMemo(() => {
    if (isMobile) return 'small'
    if (!isDesktop && builder.scopes.length > 1) return 'small'
    return 'large'
  }, [isDesktop, isMobile, builder])

  return {
    scopeSizeVariant,
  }
}
