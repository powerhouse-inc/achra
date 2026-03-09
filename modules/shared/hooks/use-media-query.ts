import { useMediaQuery as useMediaQueryTsHook } from 'usehooks-ts'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number

type UseMediaQueryOptions =
  | { from: Breakpoint }
  | { to: Breakpoint }
  | { from: Breakpoint; to: Breakpoint }

const BREAKPOINT_MAP: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function getBreakpoint(breakpoint: Breakpoint | number): number {
  return typeof breakpoint === 'number' ? breakpoint : BREAKPOINT_MAP[breakpoint]
}

function getQuery(options: UseMediaQueryOptions): string {
  if ('from' in options && !('to' in options)) {
    const breakpoint = getBreakpoint(options.from)
    return `(min-width: ${breakpoint}px)`
  }
  if ('to' in options && !('from' in options)) {
    const breakpoint = getBreakpoint(options.to)
    return `(max-width: ${breakpoint}px)`
  }
  if ('from' in options && 'to' in options) {
    const fromBreakpoint = getBreakpoint(options.from)
    const toBreakpoint = getBreakpoint(options.to)
    return `(min-width: ${fromBreakpoint}px) and (max-width: ${toBreakpoint}px)`
  }

  throw new Error('Invalid options for getQuery')
}

/**
 * This hook provides a convenient way to use media queries with predefined breakpoints.
 *
 * This hook wraps the `useMediaQuery` from `usehooks-ts` and provides a more developer-friendly
 * API using semantic breakpoint names instead of raw pixel values.
 *
 * @param options - The media query options to match against
 * @param options.from - Match screens from this breakpoint and up (min-width)
 * @param options.to - Match screens up to this breakpoint (max-width)
 * @param options.from & options.to - Match screens within this range (min-width and max-width)
 *
 * @returns A boolean indicating whether the current screen size matches the specified media query
 *
 * @example
 * ```tsx
 * // Match screens from medium and up
 * const isDesktop = useMediaQuery({ from: 'md' })
 *
 * // Match screens up to large
 * const isMobile = useMediaQuery({ to: 'md' })
 *
 * // Match screens between small and large
 * const isTablet = useMediaQuery({ from: 'sm', to: 'lg' })
 * ```
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery({ to: 'md' })
 *   const isDesktop = useMediaQuery({ from: 'lg' })
 *
 *   return (
 *     <div>
 *       {isMobile && <MobileLayout />}
 *       {isDesktop && <DesktopLayout />}
 *     </div>
 *   )
 * }
 * ```
 */
export const useMediaQuery = (options: UseMediaQueryOptions) => {
  // Use a stable initial value across SSR and first client render to avoid hydration mismatches
  return useMediaQueryTsHook(getQuery(options), {
    defaultValue: false,
    initializeWithValue: false,
  })
}
