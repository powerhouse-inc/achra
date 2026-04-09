import { useEffect, useRef } from 'react'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { useBuildersFiltersContext } from '../../../builders-filters/builders-filters-context'
import type SimpleBar from 'simplebar-react'

interface UseBuildersListProps {
  builders: BuilderProfileState[]
  asSectionContent?: boolean
}

export function useBuildersList({ builders, asSectionContent = false }: UseBuildersListProps) {
  const { isResetPending, isSkillsPending } = useBuildersFiltersContext()

  const simpleBarRef = useRef<React.ComponentRef<typeof SimpleBar>>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)
  const itemsWrapperRef = useRef<HTMLDivElement>(null)

  const isLargeMobile = useMediaQuery({ from: 'sm', to: 'md' })
  const isTablet = useMediaQuery({ from: 'md' })

  useEffect(() => {
    if (!asSectionContent) return

    const simpleBarEl = simpleBarRef.current?.el
    const cardContentEl = cardContentRef.current
    const itemsWrapperEl = itemsWrapperRef.current

    if (!simpleBarEl || !cardContentEl || !itemsWrapperEl) return

    const teamsCount = builders.length

    let config: { maxHeight: string; maxItems: number } | null = null
    if (isTablet) {
      config = { maxHeight: '722px', maxItems: 7 }
    } else if (isLargeMobile) {
      config = { maxHeight: '1058px', maxItems: 7 }
    }

    if (!config) {
      simpleBarEl.style.maxHeight = ''
      cardContentEl.style.paddingRight = ''
      return
    }

    if (teamsCount > config.maxItems) {
      simpleBarEl.style.maxHeight = config.maxHeight
      cardContentEl.style.paddingRight = '4px'
      itemsWrapperEl.style.paddingRight = '12px'
    }
  }, [isTablet, isLargeMobile, builders.length, asSectionContent])

  return {
    simpleBarRef,
    cardContentRef,
    itemsWrapperRef,
    isResetPending,
    isSkillsPending,
  }
}
