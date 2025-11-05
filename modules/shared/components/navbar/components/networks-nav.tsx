'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { buildNetworkNavbarLinks } from '../../../config/navbar-config'
import * as NavbarPrimitives from '../primitives'

/**
 * Network-specific navigation links
 */
function NetworksNav({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { slug: networkSlug } = useParams()
  const networkLinks = useMemo(
    () => buildNetworkNavbarLinks(networkSlug?.toString() ?? ''),
    [networkSlug],
  )

  return (
    <NavbarPrimitives.Nav data-nav="network" {...props}>
      {networkLinks.map((link) => (
        <NavbarPrimitives.NavItem key={link.href} href={link.href} activeWhen={link.activeWhen}>
          {link.label}{' '}
          {link.isExternal && <ExternalLinkIcon className="size-4" aria-label="External link" />}
        </NavbarPrimitives.NavItem>
      ))}
    </NavbarPrimitives.Nav>
  )
}
NetworksNav.displayName = 'NetworksNav'

/**
 * Skeleton for networks navigation
 */
function NetworksNavSkeleton() {
  return (
    <NavbarPrimitives.Nav data-nav="network">
      <NavbarPrimitives.NavItemSkeleton />
      <NavbarPrimitives.NavItemSkeleton />
      <NavbarPrimitives.NavItemSkeleton />
      <NavbarPrimitives.NavItemSkeleton />
    </NavbarPrimitives.Nav>
  )
}
NetworksNavSkeleton.displayName = 'NetworksNavSkeleton'

export { NetworksNav, NetworksNavSkeleton }
