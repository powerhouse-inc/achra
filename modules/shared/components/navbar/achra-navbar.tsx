import { Suspense } from 'react'
import { AchraNav } from './components/achra-nav'
import { NavbarActions } from './components/navbar-actions'
import * as NavbarPrimitives from './primitives'

function AchraNavbar() {
  return (
    <NavbarPrimitives.Root>
      <NavbarPrimitives.BrandArea>
        <NavbarPrimitives.AchraBrand />

        <Suspense fallback={<NavbarPrimitives.MobileNavSkeleton />}>
          <NavbarPrimitives.AchraMobileNav />
        </Suspense>
      </NavbarPrimitives.BrandArea>

      <AchraNav />

      <NavbarActions />
    </NavbarPrimitives.Root>
  )
}

export { AchraNavbar }
