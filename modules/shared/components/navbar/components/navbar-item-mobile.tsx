import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../ui/navigation-menu'
import { type NavItem } from '../types'

interface NavbarItemMobileProps {
  activeItem?: NavItem
  navItems: NavItem[]
  pathname: string
}

function NavbarItemMobile({ activeItem, navItems, pathname }: NavbarItemMobileProps) {
  const clickOnlyTriggerProps = {
    onPointerMove: (event: React.PointerEvent) => event.preventDefault(),
    onPointerEnter: (event: React.PointerEvent) => event.preventDefault(),
    onPointerLeave: (event: React.PointerEvent) => event.preventDefault(),
  }
  return (
    <div className="flex items-center lg:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="border-border text-secondary-foreground w-37.5 justify-between rounded-lg border text-sm"
              {...clickOnlyTriggerProps}
            >
              {activeItem ? activeItem.label : 'Home'}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-50 gap-1 p-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'hover:bg-accent hover:text-foreground/50 focus:bg-accent focus:text-accent-foreground text-foreground block rounded-md p-3 text-sm leading-none no-underline transition-colors outline-none select-none',
                          pathname === item.href && 'text-primary hover:text-primary',
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default NavbarItemMobile
