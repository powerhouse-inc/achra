'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import {
  ACHRA_NAVBAR_LINKS,
  buildNetworkNavbarLinks,
  type NavbarLink,
} from '@/modules/shared/config/navbar-config'
import { cn } from '@/modules/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { useNavbarProvider } from '../primitives/root-provider'
import { isActive } from '../utils'

/**
 * Mobile navigation dropdown component
 * Displays navigation links in a compact dropdown menu for mobile devices
 * Automatically switches between Achra and network-specific links
 */
function MobileNav() {
  const { isANetworkPage, networkSlug } = useNavbarProvider()
  const pathname = usePathname()

  const links = useMemo(() => {
    if (isANetworkPage) {
      return buildNetworkNavbarLinks(networkSlug!)
    }
    return ACHRA_NAVBAR_LINKS
  }, [isANetworkPage, networkSlug])

  const activeLinkLabel = useMemo(() => {
    return links.find((link) => isActive(pathname, link.activeWhen ?? link.href))?.label ?? 'Home'
  }, [links, pathname])

  return (
    <div className="flex items-center lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Navigation menu - Current: ${activeLinkLabel}`}
          className={cn(
            'group border-border text-secondary-foreground flex w-37.5 items-center justify-between rounded-lg border px-3 py-2 text-sm',
            // focus
            'focus:visible:ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none',
          )}
        >
          {activeLinkLabel}
          <ChevronDown
            className="relative top-0.25 ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-170 w-50 p-2">
          {links.map((link) => (
            <MobileNavItem key={link.href} link={link} pathname={pathname} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
MobileNav.displayName = 'MobileNav'

/**
 * Individual mobile navigation item
 * Consolidates item rendering logic (DRY principle)
 */
function MobileNavItem({ link, pathname }: { link: NavbarLink; pathname: string }) {
  const isItemActive = isActive(pathname, link.activeWhen ?? link.href)

  return (
    <DropdownMenuItem asChild className="p-2">
      <Link
        href={link.href}
        className={cn(
          'block w-full rounded-sm p-3 text-sm leading-none no-underline transition-colors outline-none select-none',
          isItemActive
            ? 'text-primary hover:bg-accent hover:text-primary! font-semibold'
            : 'text-foreground hover:bg-accent hover:text-foreground!/50',
        )}
        aria-current={isItemActive ? 'page' : undefined}
      >
        {link.label}
      </Link>
    </DropdownMenuItem>
  )
}

export { MobileNav }
