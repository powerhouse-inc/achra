import { useEffect, useRef } from 'react'
import type { BudgetStatement } from '@/modules/finances/types'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import type SimpleBar from 'simplebar-react'

interface UseBudgetStatementListProps {
  budgetStatements: BudgetStatement[]
  asSectionContent?: boolean
}

export function useBudgetStatementList({
  budgetStatements,
  asSectionContent = false,
}: UseBudgetStatementListProps) {
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

    const teamsCount = budgetStatements.length

    let config: { maxHeight: string; maxItems: number } | null = null
    if (isTablet) {
      config = { maxHeight: '798px', maxItems: 7 }
    } else if (isLargeMobile) {
      config = { maxHeight: '1078px', maxItems: 7 }
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
  }, [isTablet, isLargeMobile, budgetStatements.length, asSectionContent])

  return {
    simpleBarRef,
    cardContentRef,
    itemsWrapperRef,
  }
}
