'use client'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import NavbarItemMobile from './components/navbar-item-mobile'
import NavbarItemsDesk from './components/navbar-items-desk'
import NavbarRightSide from './components/navbar-right-side'
import { NavbarBrand } from './components/navbar-brand'
import { getNavbarConfig } from './navbar-config'

function Navbar() {
  const pathname = usePathname()
  const isLoggedIn = false
  const user = {
    username: 'John Doe',
    avatar: 'https://github.com/shadcn.png',
  }
  const handleLoginClick = () => {}

  const config = useMemo(() => getNavbarConfig(pathname), [pathname])
  const { isotype: Isotype, logotype: Logotype, navItems } = config

  const isNetworksPage = pathname === '/networks'
  const activeItem = navItems.find((item) => pathname === item.href)

  return (
    <header className="bg-muted/30 sticky top-0 z-50 container mx-auto flex items-center justify-center rounded-3xl backdrop-blur-[7.5px] md:top-1.5 md:p-2.5">
      <div className="bg-popover flex flex-1 items-center justify-between rounded-2xl pr-4 md:pr-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <NavbarBrand
              isNetworksPage={isNetworksPage}
              isotypeLogo={Isotype}
              logotype={Logotype}
            />
            <NavbarItemMobile activeItem={activeItem} navItems={navItems} pathname={pathname} />
          </div>

          <NavbarItemsDesk navItems={navItems} pathname={pathname} />

          <NavbarRightSide isLoggedIn={isLoggedIn} user={user} onLoginClick={handleLoginClick} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
