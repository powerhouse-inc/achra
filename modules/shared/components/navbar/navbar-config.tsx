import AchraIsotype from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import PowerhouseLogo from '@/modules/shared/components/svgs/powerhouse-isotype.svg'
import PowerhouseLogotype from '@/modules/shared/components/svgs/powerhouse-logotype.svg'
import SkyIsotype from '@/modules/shared/components/svgs/sky-isotype.svg'
import SkyLogotype from '@/modules/shared/components/svgs/sky-logotype.svg'
import { cn } from '../../lib/utils'
import type { NavbarConfig } from './types'
import type { RouteWithDynamicPages } from '../../types/routes'

function isItemActive(
  currentPath: string,
  pathToCheck: string | RegExp | Array<string | RegExp>,
): boolean {
  const match = (pattern: string | RegExp): boolean => {
    if (typeof pattern === 'string') {
      return currentPath === pattern
    }
    if (pattern instanceof RegExp) {
      return pattern.test(currentPath)
    }
    return false
  }

  if (Array.isArray(pathToCheck)) {
    return pathToCheck.some((pattern) => match(pattern))
  }
  return match(pathToCheck)
}

const ACHRA_CONFIG: NavbarConfig = {
  isotype: AchraIsotype,
  logotype: undefined,
  navItems: [
    {
      label: 'Networks',
      href: '/networks',
      isActive: (currentPath) => isItemActive(currentPath, '/networks'),
    },
    {
      label: 'Workstreams',
      href: '/workstreams',
      isActive: (currentPath) => isItemActive(currentPath, '/workstreams'),
    },
    {
      label: 'Roadmaps',
      href: '/network/powerhouse/roadmaps',
      isActive: (currentPath) => isItemActive(currentPath, '/network/powerhouse/roadmaps'),
    },
    {
      label: 'Services',
      href: '/services',
      isActive: (currentPath) => isItemActive(currentPath, '/services'),
    },
  ],
  authComponent: 'loginButton',
}

const LOGOS_MAP: Record<
  string,
  {
    isotype: React.ComponentType<React.SVGProps<SVGSVGElement>>
    logotype: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }
> = {
  sky: {
    isotype: SkyIsotype,
    logotype: SkyLogotype,
  },
  powerhouse: {
    isotype: PowerhouseLogo,
    logotype: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
      <PowerhouseLogotype {...props} className={cn(className, 'w-44')} />
    ),
  },
}

const createNetworkNavbarConfig = (network: string): NavbarConfig => {
  return {
    isotype: LOGOS_MAP[network].isotype, // TODO: add fallback logo
    logotype: LOGOS_MAP[network].logotype,
    logoHref: `/network/${network}` as RouteWithDynamicPages,
    navItems: [
      {
        label: 'Contribute',
        href: `/network/${network}/workstreams` as RouteWithDynamicPages,
        isActive: (currentPath) =>
          currentPath.startsWith(`/network/${network}/workstream`) ||
          currentPath.startsWith(`/network/${network}/rfp`),
      },
      {
        label: 'Roadmap',
        href: `/network/${network}/roadmaps` as RouteWithDynamicPages,
        isActive: (currentPath) =>
          isItemActive(currentPath, [
            `/network/${network}/roadmaps`,
            /\/network\/[a-z]+\/roadmap(s)?\/.+/,
          ]),
      },
      {
        label: 'Finances',
        href: `/network/${network}/finances` as RouteWithDynamicPages,
        isActive: (currentPath) => isItemActive(currentPath, `/network/${network}/finances`),
      },
      {
        label: 'Builders',
        href: `/network/${network}/builders` as RouteWithDynamicPages,
        isActive: (currentPath) => isItemActive(currentPath, `/network/${network}/builders`),
      },
      {
        label: 'Governance',
        href: 'https://governance.achra.network',
        isExternal: true,
      },
    ],
    authComponent: 'loginButton',
  }
}

export const isNetworkPathOrSubpath = (pathname: string) => {
  return /^\/network\/.+$/.test(pathname)
}

export const getNavbarConfig = (pathname: string): NavbarConfig => {
  const path = pathname
  if (isNetworkPathOrSubpath(path)) {
    const slug = path.split('/')[2]
    return createNetworkNavbarConfig(slug)
  }

  return ACHRA_CONFIG
}
