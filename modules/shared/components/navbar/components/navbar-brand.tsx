import Link from 'next/link'
import AchraLogo from '@/modules/shared/components/svgs/achra-logo.svg'
import AchraIsotype from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import { cn } from '@/modules/shared/lib/utils'
import React from 'react'
import { HOME_URL } from '../const'
import { NAVBAR_CONFIGS } from '../navbar-config'

interface NavbarBrandProps {
  isNetworksPage: boolean
  isotypeLogo?: React.ElementType
  logotype?: React.ElementType
}

export function NavbarBrand({
  isNetworksPage,
  isotypeLogo: IsotypeLogo,
  logotype: Logotype,
}: NavbarBrandProps) {
  const MainLogoComponent = isNetworksPage ? AchraIsotype : AchraLogo
  const showIsotype = !isNetworksPage && IsotypeLogo && Logotype
  const logoContainerClasses = cn(
    'text-border flex items-center justify-center overflow-hidden py-4.5',
    {
      'rounded-l-2xl border-r bg-primary/5 border-border px-4 md:px-6': !isNetworksPage,
      'pl-6': isNetworksPage,
    },
  )

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className={logoContainerClasses}>
        <a
          href={HOME_URL}
          target="_blank"
          className="cursor-pointer"
          rel="noopener noreferrer"
          aria-label="Achra homepage"
        >
          <MainLogoComponent className={cn('h-9', isNetworksPage ? 'text-primary w-42' : 'w-9')} />
        </a>
      </div>
      {showIsotype && (
        <Link href={NAVBAR_CONFIGS['/networks'].navItems[0].href} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <IsotypeLogo className="h-8 w-8" />
            <Logotype className="hidden h-8 w-16 md:flex" />
          </div>
        </Link>
      )}
    </div>
  )
}
