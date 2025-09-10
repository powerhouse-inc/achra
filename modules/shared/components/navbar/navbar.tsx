'use client'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { NavbarBrand } from './components/navbar-brand'
import NavbarItemMobile from './components/navbar-item-mobile'
import NavbarItemsDesk from './components/navbar-items-desk'
import NavbarRightSide from './components/navbar-right-side'
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
  const { isotype: Isotype, logotype: Logotype, logotypeClassName, logoHref, navItems } = config

  const isNetworksPage = pathname === '/networks'
  const activeItem = navItems.find((item) => pathname === item.href)

  return (
    <div className="bg-muted/30 sticky top-0 z-150 mx-auto rounded-3xl px-0 py-0 shadow-lg backdrop-blur-[7.5px] md:mx-6 md:px-2.5 md:py-2.5 md:shadow-none">
      <header className="flex items-center justify-center">
        <div className="bg-popover flex flex-1 items-center justify-between rounded-none pr-4 sm:rounded-2xl md:pr-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <NavbarBrand
                isNetworksPage={isNetworksPage}
                isotypeLogo={Isotype}
                logotype={Logotype}
                logotypeClassName={logotypeClassName}
                logoHref={logoHref}
              />
              <NavbarItemMobile activeItem={activeItem} navItems={navItems} pathname={pathname} />
            </div>

            <NavbarItemsDesk navItems={navItems} pathname={pathname} />

            <NavbarRightSide isLoggedIn={isLoggedIn} user={user} onLoginClick={handleLoginClick} />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
