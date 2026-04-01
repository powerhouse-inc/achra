'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/modules/shared/lib/utils'

export interface RootPositioningProps {
  children: React.ReactNode
  /** Routes where the navbar should have a blur background effect */
  routesWithBlurBackground: string[]
}

/**
 * Handles navbar positioning and conditional blur background
 */
function RootPositioning({ children, routesWithBlurBackground }: RootPositioningProps) {
  const pathname = usePathname()
  const hasBlurBackground = routesWithBlurBackground.some((route) => pathname.startsWith(route))

  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-160 h-18 w-full p-0 sm:h-27.5 sm:pb-3',
        hasBlurBackground ? 'sm:backdrop-blur-2xl' : 'sm:bg-background',
      )}
    >
      {children}
    </div>
  )
}
RootPositioning.displayName = 'NavbarRootPositioning'

export { RootPositioning }
