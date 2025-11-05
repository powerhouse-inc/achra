import { Suspense } from 'react'
import { NavbarActions } from './components/navbar-actions'
import { NetworkBrand } from './components/network-brand'
import { NetworksNav, NetworksNavSkeleton } from './components/networks-nav'
import * as NavbarPrimitives from './primitives'

function NetworkNavbar() {
  return (
    <NavbarPrimitives.Root>
      <NavbarPrimitives.BrandArea>
        <NetworkBrand />

        <Suspense fallback={<NavbarPrimitives.MobileNavSkeleton />}>
          <NavbarPrimitives.NetworkMobileNav />
        </Suspense>
      </NavbarPrimitives.BrandArea>

      <Suspense fallback={<NetworksNavSkeleton />}>
        <NetworksNav />
      </Suspense>

      <NavbarActions />
    </NavbarPrimitives.Root>
  )
}

export { NetworkNavbar }
