/**
 * Media query for sm breakpoint (640px) — used for sticky header root margin and breakpoint change listener
 */
export const STICKY_HEADER_SM_BREAKPOINT = '(min-width: 640px)'

/**
 * Returns the root margin for the sticky sentinel IntersectionObserver.
 * Matches sticky top values: top-18 (72px) on mobile, sm:top-27.5 (110px) on desktop.
 */
export function getStickyRootMargin(isSm: boolean): string {
  const topPx = isSm ? 110 : 72
  return `-${topPx}px 0px 0px 0px`
}

/**
 * Creates an IntersectionObserver that reports when the sentinel element
 * leaves the viewport (i.e. when the sticky header becomes "stuck").
 */
export function createStickyObserver(
  sentinel: Element,
  onStuckChange: (isStuck: boolean) => void,
): IntersectionObserver {
  const isSm = window.matchMedia(STICKY_HEADER_SM_BREAKPOINT).matches
  const observer = new IntersectionObserver(
    ([entry]) => {
      onStuckChange(!entry.isIntersecting)
    },
    {
      threshold: 0,
      rootMargin: getStickyRootMargin(isSm),
    },
  )
  observer.observe(sentinel)
  return observer
}
