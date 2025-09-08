import PowerhouseLogo from '@/modules/shared/components/svgs/powerhouse.svg'
import SkyIsotype from '@/modules/shared/components/svgs/sky-isotype.svg'
import SkyLogotype from '@/modules/shared/components/svgs/sky-logotype.svg'
import AchraIsotype from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import type { NavbarConfig } from './types'

export const NAVBAR_CONFIGS: Record<string, NavbarConfig> = {
  '/sky': {
    isotype: SkyIsotype,
    logotype: SkyLogotype,
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
    isotype: SkyIsotype,
    logotype: SkyLogotype,
    navItems: [
      { label: 'Contributors', href: '/network/sky/contributors' },
      { label: 'Roadmap', href: '/network/sky/roadmap' },
      { label: 'Finances', href: '/network/sky/finances' },
      { label: 'Builders', href: '/network/sky/builders' },
      { label: 'Governance', href: 'https://governance.achra.network', isExternal: true },
    ],
    authComponent: 'loginButton',
  },
  '/networks': {
    isotype: AchraIsotype,
    logotype: undefined,
    navItems: [
      { label: 'Networks', href: '/networks' },
      { label: 'Roadmaps', href: '/network/sky/roadmap' },
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
