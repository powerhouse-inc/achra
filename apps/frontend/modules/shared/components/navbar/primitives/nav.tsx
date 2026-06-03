import { cn } from '@/modules/shared/lib/utils'

export interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

/**
 * Navigation container for navbar items (desktop only)
 */
function Nav({ children, className, ...props }: NavProps) {
  const hasManyItems = Array.isArray(children) && children.length > 3

  return (
    <nav
      className={cn(
        'hidden items-center gap-2 lg:flex xl:gap-12',
        {
          'lg:gap-6': hasManyItems,
          'lg:gap-12': !hasManyItems,
        },
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  )
}
Nav.displayName = 'NavbarNav'

export { Nav }
