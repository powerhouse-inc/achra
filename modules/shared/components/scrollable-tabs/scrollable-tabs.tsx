'use client'

import {
  type ComponentProps,
  type ComponentRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { cn } from '@/shared/lib/utils'

import { Tabs, TabsList } from '../ui/tabs'

interface ScrollableTabsContextValue {
  setShowStartIndicator: (value: boolean) => void
  setShowEndIndicator: (value: boolean) => void
}

const ScrollableTabsContext = createContext<ScrollableTabsContextValue | null>(null)

function useScrollableTabsContext(component: string) {
  const context = useContext(ScrollableTabsContext)

  if (!context) {
    throw new Error(`${component} must be used within ScrollableTabs`)
  }

  return context
}

interface ScrollableTabsRootProps extends ComponentProps<typeof Tabs> {
  startIndicatorClassName?: string
  endIndicatorClassName?: string
}

const baseIndicatorClasses =
  'from-background pointer-events-none absolute top-0 z-10 h-10.5 w-16 to-transparent md:hidden'

function ScrollableTabsRoot({
  className,
  children,
  startIndicatorClassName,
  endIndicatorClassName,
  ...props
}: ScrollableTabsRootProps) {
  const [showStartIndicator, setShowStartIndicator] = useState(false)
  const [showEndIndicator, setShowEndIndicator] = useState(false)

  const contextValue = useMemo(() => {
    return {
      setShowStartIndicator,
      setShowEndIndicator,
    }
  }, [setShowStartIndicator, setShowEndIndicator])

  return (
    <ScrollableTabsContext.Provider value={contextValue}>
      <Tabs {...props} className={cn('relative overflow-hidden', className)}>
        {showStartIndicator && (
          <div
            aria-hidden="true"
            className={cn(
              `${baseIndicatorClasses} left-0 rounded-l-md bg-linear-to-r`,
              startIndicatorClassName,
            )}
          />
        )}
        {showEndIndicator && (
          <div
            aria-hidden="true"
            className={cn(
              `${baseIndicatorClasses} right-0 rounded-r-md bg-linear-to-l`,
              endIndicatorClassName,
            )}
          />
        )}
        {children}
      </Tabs>
    </ScrollableTabsContext.Provider>
  )
}

type ScrollableTabsListProps = ComponentProps<typeof TabsList>

const ScrollableTabsList = forwardRef<ComponentRef<typeof TabsList>, ScrollableTabsListProps>(
  ({ className, ...props }, forwardedRef) => {
    const { setShowStartIndicator, setShowEndIndicator } =
      useScrollableTabsContext('ScrollableTabs.List')
    const localRef = useRef<ComponentRef<typeof TabsList> | null>(null)

    const updateIndicators = useCallback(() => {
      const element = localRef.current

      if (!element) {
        return
      }

      const { scrollLeft, scrollWidth, clientWidth } = element

      setShowStartIndicator(scrollLeft > 0)
      setShowEndIndicator(scrollLeft + clientWidth < scrollWidth - 1)
    }, [setShowEndIndicator, setShowStartIndicator])

    useEffect(() => {
      updateIndicators()
    }, [updateIndicators])

    useEffect(() => {
      const element = localRef.current

      if (!element) {
        return
      }

      element.addEventListener('scroll', updateIndicators, { passive: true })
      window.addEventListener('resize', updateIndicators)

      return () => {
        element.removeEventListener('scroll', updateIndicators)
        window.removeEventListener('resize', updateIndicators)
      }
    }, [updateIndicators])

    const setRefs = useCallback(
      (node: ComponentRef<typeof TabsList> | null) => {
        localRef.current = node

        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef],
    )

    return (
      <TabsList
        ref={setRefs}
        {...props}
        className={cn(
          'no-scrollbar h-10 w-full max-w-fit justify-start overflow-x-auto rounded-md p-1',
          className,
        )}
      />
    )
  },
)

ScrollableTabsList.displayName = 'ScrollableTabsList'

const ScrollableTabs = Object.assign(ScrollableTabsRoot, {
  List: ScrollableTabsList,
})

export { ScrollableTabs, ScrollableTabsList, ScrollableTabsRoot }
