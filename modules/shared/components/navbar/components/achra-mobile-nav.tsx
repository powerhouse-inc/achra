'use client'

import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { ACHRA_NAVBAR_LINKS } from '@/modules/shared/config/navbar-config'
import { cn } from '@/modules/shared/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { isActive } from '../utils'
import { MobileNavItem } from './mobile-nav-item'

/**
 * Mobile navigation dropdown for Achra pages
 */
function AchraMobileNav() {
  const pathname = usePathname()

  const activeLinkLabel = useMemo(() => {
    return (
      ACHRA_NAVBAR_LINKS.find((link) => isActive(pathname, link.activeWhen ?? link.href))?.label ??
      'Home'
    )
  }, [pathname])

  return (
    <div className="flex items-center lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Navigation menu - Current: ${activeLinkLabel}`}
          className={cn(
            'group border-border text-secondary-foreground flex h-9 w-37.5 items-center justify-between rounded-lg border px-3 py-2 text-sm',
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
          {ACHRA_NAVBAR_LINKS.map((link) => (
            <MobileNavItem key={link.href} link={link} pathname={pathname} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
AchraMobileNav.displayName = 'AchraMobileNav'

export { AchraMobileNav }
