import { Suspense } from 'react'
import { AchraNav } from './components/achra-nav'
import { NetworkBrand } from './components/network-brand'
import { NetworksNav, NetworksNavSkeleton } from './components/networks-nav'
import { ThemeToggle, ThemeToggleOption } from './components/theme-toggle'
import { UserButton, UserOption } from './components/user-button'
import * as NavbarPrimitives from './primitives'

function Navbar() {
  return (
    <NavbarPrimitives.Root>
      <NavbarPrimitives.BrandArea>
        <NavbarPrimitives.AchraBrand />
        <NetworkBrand />

        <Suspense fallback={<NavbarPrimitives.MobileNavSkeleton />}>
          <NavbarPrimitives.MobileNav />
        </Suspense>
      </NavbarPrimitives.BrandArea>

      <AchraNav />
      <Suspense fallback={<NetworksNavSkeleton />}>
        <NetworksNav />
      </Suspense>

      <NavbarPrimitives.ActionsArea>
        <NavbarPrimitives.ActionWithOptions className="flex md:hidden">
          <UserOption />
          <NavbarPrimitives.ActionOptionSeparator />
          <ThemeToggleOption />
        </NavbarPrimitives.ActionWithOptions>

        <NavbarPrimitives.ActionsGroup className="hidden md:flex">
          <ThemeToggle />
          <NavbarPrimitives.ActionSeparator />
          <UserButton />
        </NavbarPrimitives.ActionsGroup>
      </NavbarPrimitives.ActionsArea>
    </NavbarPrimitives.Root>
  )
}

export { Navbar }
