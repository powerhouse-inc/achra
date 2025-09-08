import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { type NavItem } from '../types'

interface NavbarCenterProps {
  navItems: NavItem[]
  pathname: string
  activeItem?: NavItem
}

function NavbarItemsDesk({ navItems, pathname }: NavbarCenterProps) {
  const numberOfItems = navItems.length > 3 ? 4 : 12

  return (
    <nav className={cn('hidden items-center gap-2 lg:flex', `lg:gap-${numberOfItems} xl:gap-12`)}>
      {navItems.map((item) => {
        return (
          <div key={item.label} className="flex items-center gap-1">
            <Link
              href={item.href}
              target={item.isExternal ? '_blank' : '_self'}
              className={cn(
                'text-foreground hover:text-primary flex items-center gap-1 text-base font-semibold',
                pathname === item.href && 'text-primary',
              )}
            >
              {item.label}
            </Link>
            {item.isExternal && <ExternalLink className="h-4 w-4" />}
          </div>
        )
      })}
    </nav>
  )
}

export default NavbarItemsDesk
