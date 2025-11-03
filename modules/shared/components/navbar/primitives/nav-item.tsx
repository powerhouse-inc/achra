'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/modules/shared/lib/utils'
import type { RouteWithDynamicPages } from '@/modules/shared/types/routes'
import { Skeleton } from '../../ui/skeleton'
import { type ActiveWhen, isActive } from '../utils'

export interface NavItemProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: RouteWithDynamicPages
  children: React.ReactNode
  activeWhen?: ActiveWhen
}

function NavItem({ children, className, href, activeWhen, ...props }: NavItemProps) {
  const pathname = usePathname()
  const isItemActive = isActive(pathname, activeWhen ?? (typeof href === 'string' ? href : ''))

  return (
    <Link
      href={href}
      className={cn(
        'text-foreground hover:text-foreground/50 flex items-center gap-1 text-base font-semibold',
        isItemActive && 'text-primary hover:text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
NavItem.displayName = 'NavbarNavItem'

function NavItemSkeleton() {
  return <Skeleton className="h-6 w-16" />
}

export { NavItem, NavItemSkeleton }
