import Link from 'next/link'
import type { NavbarLink } from '@/modules/shared/config/navbar-config'
import { isActive } from '@/modules/shared/lib/navbar-utils'
import { cn } from '@/modules/shared/lib/utils'
import { DropdownMenuItem } from '../../ui/dropdown-menu'

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

MobileNavItem.displayName = 'MobileNavItem'

export { MobileNavItem }
