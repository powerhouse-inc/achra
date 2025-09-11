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
    <div className="fixed top-0 right-0 left-0 z-160 flex h-24 w-full justify-center pb-2 md:backdrop-blur-[7.5px]">
      <div className="bg-muted/30 fixed top-0 right-0 left-0 z-150 rounded-3xl p-0 shadow-lg md:mx-6 md:p-2.5 md:shadow-none xl:mx-auto xl:max-w-[1200px] 2xl:mx-14 2xl:max-w-none">
        <header className="bg-popover flex flex-1 items-center justify-between rounded-none pr-4 md:rounded-2xl">
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
        </header>
      </div>
    </div>
  )
}

export default Navbar
