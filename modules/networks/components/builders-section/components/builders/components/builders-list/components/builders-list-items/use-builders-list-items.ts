import { useEffect, useRef } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import type SimpleBar from 'simplebar-react'

interface UseBuildersListItemsProps {
  builders: Builder[]
}

export const useBuildersListItems = ({ builders }: UseBuildersListItemsProps) => {
  const simpleBarRef = useRef<React.ComponentRef<typeof SimpleBar>>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)
  const itemsWrapperRef = useRef<HTMLDivElement>(null)

  const isLargeMobile = useMediaQuery({ from: 'sm', to: 'md' })
  const isTablet = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesktop = useMediaQuery({ from: 'lg' })

  useEffect(() => {
    const simpleBarEl = simpleBarRef.current?.el
    const cardContentEl = cardContentRef.current
    const itemsWrapperEl = itemsWrapperRef.current

    if (!simpleBarEl || !cardContentEl || !itemsWrapperEl) return

    const teamsCount = builders.length

    let config: { maxHeight: string; maxItems: number } | null = null
    if (isLargeMobile) {
      config = { maxHeight: '840px', maxItems: 6 }
    } else if (isTablet) {
      config = { maxHeight: '708px', maxItems: 8 }
    } else if (isDesktop) {
      config = { maxHeight: '610px', maxItems: 7 }
    }

    if (!config) {
      simpleBarEl.style.maxHeight = ''
      cardContentEl.style.paddingRight = ''
      itemsWrapperEl.style.paddingRight = ''
      return
    }

    if (teamsCount > config.maxItems) {
      simpleBarEl.style.maxHeight = config.maxHeight
      cardContentEl.style.paddingRight = '4px'
      itemsWrapperEl.style.paddingRight = '12px'
    }
  }, [isLargeMobile, isTablet, isDesktop, builders.length])

  return { simpleBarRef, cardContentRef, itemsWrapperRef }
}
