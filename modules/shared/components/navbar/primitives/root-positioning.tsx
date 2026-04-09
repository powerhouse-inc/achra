'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/modules/shared/lib/utils'

export interface RootPositioningProps {
  children: React.ReactNode
  /** Routes where the navbar should have a blur background effect */
  routesWithBlurBackground: string[]
  /** Routes where the navbar outer shell should be fully transparent (exact match) */
  routesWithTransparentBackground: string[]
}

/**
 * Fixed outer shell for navbar layout. Shows bg-background by default;
 * transparent on configured routes; backdrop blur on blur routes.
 */
function RootPositioning({
  children,
  routesWithBlurBackground,
  routesWithTransparentBackground,
}: RootPositioningProps) {
  const pathname = usePathname()
  const hasBlurBackground = routesWithBlurBackground.some((route) => pathname.startsWith(route))
  const isTransparent = routesWithTransparentBackground.includes(pathname)

  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-160 h-18 w-full p-0 sm:h-27.5 sm:pb-3',
        hasBlurBackground ? 'sm:backdrop-blur-2xl' : !isTransparent && 'sm:bg-background',
      )}
    >
      {children}
    </div>
  )
}
RootPositioning.displayName = 'NavbarRootPositioning'

export { RootPositioning }
