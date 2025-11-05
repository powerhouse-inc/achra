import { Suspense } from 'react'
import { ACHRA_NAVBAR_LINKS } from '../../../config/navbar-config'
import * as NavbarPrimitives from '../primitives'

/**
 * Primary navigation links for Achra platform
 */
function AchraNav({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <NavbarPrimitives.Nav data-nav="achra" {...props}>
      {ACHRA_NAVBAR_LINKS.map((link) => (
        <Suspense fallback={<NavbarPrimitives.NavItemSkeleton />} key={link.href}>
          <NavbarPrimitives.NavItem href={link.href}>{link.label}</NavbarPrimitives.NavItem>
        </Suspense>
      ))}
    </NavbarPrimitives.Nav>
  )
}
AchraNav.displayName = 'AchraNav'

export { AchraNav }
