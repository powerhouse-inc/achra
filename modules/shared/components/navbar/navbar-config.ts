import AchraIsotype from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import PowerhouseLogo from '@/modules/shared/components/svgs/powerhouse-isotype.svg'
import PowerhouseLogotype from '@/modules/shared/components/svgs/powerhouse-logotype.svg'
import SkyIsotype from '@/modules/shared/components/svgs/sky-isotype.svg'
import SkyLogotype from '@/modules/shared/components/svgs/sky-logotype.svg'
import type { NavbarConfig } from './types'

export const NAVBAR_CONFIGS: Record<string, NavbarConfig> = {
  '/sky': {
    isotype: SkyIsotype,
    logotype: SkyLogotype,
    logoHref: '/network/sky',
    navItems: [
      { label: 'Contributors', href: '/network/sky/contributors' },
      { label: 'Roadmap', href: '/network/sky/roadmap' },
      { label: 'Finances', href: '/network/sky/finances' },
      { label: 'Builders', href: '/network/sky/builders' },
      { label: 'Governance', href: 'https://governance.achra.network', isExternal: true },
    ],
    authComponent: 'loginButton',
  },
  '/powerhouse': {
    isotype: PowerhouseLogo,
    logotype: PowerhouseLogotype,
    logotypeClassName: 'w-44',
    logoHref: '/network/powerhouse',
    navItems: [
      { label: 'Contributors', href: '/network/powerhouse/contributors' },
      { label: 'Roadmap', href: '/network/powerhouse/roadmap' },
      { label: 'Finances', href: '/network/powerhouse/finances' },
      { label: 'Builders', href: '/network/powerhouse/builders' },
      { label: 'Governance', href: 'https://governance.achra.network', isExternal: true },
    ],
    authComponent: 'loginButton',
  },
  '/networks': {
    isotype: AchraIsotype,
    logotype: undefined,
    logoHref: '/networks',
    navItems: [
      { label: 'Networks', href: '/networks' },
      { label: 'Roadmaps', href: '/network/powerhouse/roadmap' },
      { label: 'Services', href: '/services' },
    ],
    authComponent: 'loginButton',
  },
}

export const getNavbarConfig = (pathname: string | null): NavbarConfig => {
  const path = pathname || '/networks'
  if (path.startsWith('/networks')) {
    return NAVBAR_CONFIGS['/networks']
  }
  if (path.startsWith('/network/powerhouse')) {
    return NAVBAR_CONFIGS['/powerhouse']
  }
  if (path.startsWith('/network/sky')) {
    return NAVBAR_CONFIGS['/sky']
  }
  // default to sky config for unknown network paths
  return NAVBAR_CONFIGS['/sky']
}
