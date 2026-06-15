'use client'

import { cn } from '@achra/ui/lib/utils'
import { Skeleton } from '@achra/ui/skeleton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ActiveWhen, isActive } from '@/modules/shared/lib/navbar-utils'
import type { RouteWithDynamicPages } from '@/modules/shared/types/routes'

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
      // Don't speculatively prefetch the heavy app routes (network/services
      // dashboards pull in the reactor SDK + document registry). On the
      // marketing shell that prefetch saturates a throttled connection for no
      // benefit; the route is fetched on hover/click instead. Overridable via props.
      prefetch={false}
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
