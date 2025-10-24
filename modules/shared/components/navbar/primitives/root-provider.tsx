'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext } from 'react'
import { cn } from '@/modules/shared/lib/utils'

/**
 * Context type for navbar root provider
 * Shares navbar state across all navbar components
 */
export interface NavbarRootContextType {
  /** Whether the current page is an Achra root page (not a network page) */
  isAnAchraRootPage: boolean
  /** Whether the current page is a network-specific page */
  isANetworkPage: boolean
  /** The current network slug if on a network page */
  networkSlug?: string
}

const RootContext = createContext<NavbarRootContextType>({
  isAnAchraRootPage: false,
  isANetworkPage: false,
  networkSlug: undefined,
})

/**
 * Provides navbar context and handles conditional rendering
 * Automatically shows/hides Achra vs Network branding based on route
 */
function RootProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isANetworkPage = /^\/network\/.+$/.test(pathname)
  const networkSlug = isANetworkPage ? pathname.split('/')[2] : undefined

  return (
    <RootContext.Provider
      value={{ isAnAchraRootPage: !isANetworkPage, isANetworkPage, networkSlug }}
    >
      <div
        className={cn(
          {
            '**:data-[brand="achra"]:hidden **:data-[brand="network"]:flex': isANetworkPage,
            'lg:**:data-[nav="achra"]:hidden lg:**:data-[nav="network"]:flex': isANetworkPage,
          },
          {
            '**:data-[brand="achra"]:flex **:data-[brand="network"]:hidden': !isANetworkPage,
            'lg:**:data-[nav="achra"]:flex lg:**:data-[nav="network"]:hidden': !isANetworkPage,
          },
        )}
      >
        {children}
      </div>
    </RootContext.Provider>
  )
}
RootProvider.displayName = 'NavbarRootProvider'

/**
 * Hook to access navbar context
 * Provides information about current page type and network
 *
 * @returns Navbar context with page and network information
 */
function useNavbarProvider() {
  return useContext(RootContext)
}

export { RootProvider, useNavbarProvider }
