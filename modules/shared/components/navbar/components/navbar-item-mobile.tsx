import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { type NavItem } from '../types'

interface NavbarItemMobileProps {
  activeItem?: NavItem
  navItems: NavItem[]
  pathname: string
}

function NavbarItemMobile({ activeItem, navItems, pathname }: NavbarItemMobileProps) {
  return (
    <div className="flex items-center lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'group border-border text-secondary-foreground flex w-37.5 items-center justify-between rounded-lg border px-3 py-2 text-sm',
          )}
        >
          {activeItem ? activeItem.label : 'Home'}
          <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-170 w-50 p-2">
          <ul className="gap-1 p-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <DropdownMenuItem
                  asChild
                  className={cn(
                    'cursor-pointer p-0',
                    // Styles for hover and focus
                    'hover:bg-accent focus:text-accent-foreground',
                    // Conditional text logic
                    pathname === item.href
                      ? 'text-primary hover:text-primary'
                      : 'text-foreground hover:text-foreground/50',
                  )}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      // Base styles
                      'block rounded-md p-3 text-sm leading-none no-underline transition-colors outline-none select-none',
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              </li>
            ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NavbarItemMobile
