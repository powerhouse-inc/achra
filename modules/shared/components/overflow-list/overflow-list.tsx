import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react'
import {
  useMeasure,
  useMount,
  usePrevious,
  useShallowCompareEffect,
  useUpdateEffect,
} from 'react-use'
import { cn } from '@/modules/shared/lib/utils'
import { Skeleton } from '../ui/skeleton'

type CollapseDirection = 'start' | 'end'
type OverflowDirection = 'none' | 'grow' | 'shrink'

export interface OverflowListProps<T> {
  items: T[]
  itemRenderer: (item: T, index: number) => React.ReactElement
  overflowRenderer: (items: T[]) => React.ReactElement
  skeletonRenderer?: (items: T[]) => React.ReactElement
  minVisibleItems?: number
  onOverflow?: (items: T[]) => void
  collapseFrom?: CollapseDirection
  className?: string
  tagName?: keyof JSX.IntrinsicElements
  alwaysRenderOverflow?: boolean
}

interface OverflowListState<T> {
  visible: T[]
  overflow: T[]
  lastOverflowCount: number
  overflowDirection: OverflowDirection
}

export function OverflowList<T>({
  items,
  skeletonRenderer,
  collapseFrom = 'end',
  minVisibleItems = 0,
  tagName = 'div',
  className = '',
  alwaysRenderOverflow = false,
  overflowRenderer,
  itemRenderer,
}: OverflowListProps<T>) {
  const [isMounted, setIsMounted] = useState(false)
  const [state, setState] = useState<OverflowListState<T>>({
    visible: items,
    overflow: [],
    lastOverflowCount: 0,
    overflowDirection: 'none',
  })

  const spacer = useRef<HTMLDivElement>(null)

  // Re-run when state changes
  useShallowCompareEffect(() => {
    repartition(false)
  }, [state, isMounted])

  // Run once on mount
  useMount(() => {
    setIsMounted(true)
  })

  // Reset when items change
  useUpdateEffect(() => {
    setState(() => ({
      overflowDirection: 'none',
      lastOverflowCount: 0,
      overflow: [],
      visible: items,
    }))
  }, [items])

  const maybeOverflow =
    state.overflow.length === 0 && !alwaysRenderOverflow ? null : overflowRenderer(state.overflow)

  const repartition = useCallback(
    (growing: boolean) => {
      if (!spacer.current) return

      if (growing) {
        // Content is expanding: reset overflow
        setState((state) => ({
          overflowDirection: 'grow',
          lastOverflowCount:
            state.overflowDirection === 'none' ? state.overflow.length : state.lastOverflowCount,
          overflow: [],
          visible: items,
        }))
      } else if (spacer.current.getBoundingClientRect().width < 0.9) {
        // Content is shrinking: move items into overflow
        setState((state) => {
          if (state.visible.length <= minVisibleItems) {
            return state
          }

          const collapseFromStart = collapseFrom === 'start'
          const visible = state.visible.slice()
          const next = collapseFromStart ? visible.shift() : visible.pop()

          if (!next) return state

          const overflow = collapseFromStart ? [...state.overflow, next] : [next, ...state.overflow]

          return {
            ...state,
            overflowDirection:
              state.overflowDirection === 'none' ? 'shrink' : state.overflowDirection,
            overflow,
            visible,
          }
        })
      } else {
        // Neither growing nor shrinking: reset overflow direction
        setState((prev) => ({
          ...prev,
          overflowDirection: 'none',
        }))
      }
    },
    [collapseFrom, minVisibleItems, items],
  )

  const [ref, { width }] = useMeasure<HTMLElement>()
  const previousWidth = usePrevious(width)

  useEffect(() => {
    if (!previousWidth) return
    repartition(width > previousWidth)
  }, [width, previousWidth, repartition])

  // Render skeleton while mounting to avoid layout shift, flickering and potential elements overflowing
  if (!isMounted) {
    return (
      <div className="relative flex w-full overflow-hidden">
        {typeof skeletonRenderer === 'function' ? (
          skeletonRenderer(items)
        ) : (
          <Skeleton className="w-full min-w-1/2 self-stretch" />
        )}
        <div className="invisible flex">
          {items.map((item, index) => {
            return itemRenderer(item, index)
          })}
        </div>
      </div>
    )
  }

  return React.createElement(
    tagName,
    {
      ref,
      className: cn('flex w-full min-w-0 gap-2 flex-nowrap overflow-hidden', className),
    },
    collapseFrom === 'start' ? maybeOverflow : null,
    state.visible.map(itemRenderer),
    collapseFrom === 'end' ? maybeOverflow : null,
    React.createElement('div', { style: { flexShrink: 1, width: 1 }, ref: spacer }),
  )
}
