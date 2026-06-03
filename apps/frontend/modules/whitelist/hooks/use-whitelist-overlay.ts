import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { OMIT_WHITELIST_OVERLAY_FROM_ROUTES } from '@/modules/whitelist/lib/constants'
import ff from '@/shared/lib/feature-flags'

/**
 * Hook to determine whether the whitelist overlay should be shown based on the current pathname
 * @returns Whether the whitelist overlay should be shown
 */
function useWhitelistOverlay() {
  const pathname = usePathname()
  const shouldShow = useMemo(
    () => !OMIT_WHITELIST_OVERLAY_FROM_ROUTES.includes(pathname) && ff.WHITELIST_OVERLAY_ENABLED,
    [pathname],
  )

  return shouldShow
}

export { useWhitelistOverlay }
