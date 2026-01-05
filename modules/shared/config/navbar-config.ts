import ff from '../lib/feature-flags'
import type { RouteWithDynamicPages } from '../types/routes'

/**
 * Represents a navigation link in the navbar
 */
export interface NavbarLink {
  label: string
  href: RouteWithDynamicPages
  isExternal?: boolean
  activeWhen?: string | string[]
}

/**
 * Main Achra navigation links (shown when not on a network page)
 */
export const ACHRA_NAVBAR_LINKS: NavbarLink[] = [
  {
    label: 'Networks',
    href: '/networks',
  },
  ...(ff.WORKSTREAMS_ENABLED
    ? [
        {
          label: 'Workstreams',
          href: '/workstreams',
        } satisfies NavbarLink,
      ]
    : []),
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Use Cases',
    href: '/cases',
  },
]

/**
 * Routes where the navbar background should have blur effect
 */
export const NAVBAR_BLUR_BACKGROUND_ROUTES: string[] = ['/networks']

/**
 * Builds navigation links for a specific network
 *
 * @param network - The network slug
 * @returns Array of navigation links for the network
 */
export function buildNetworkNavbarLinks(network: string): NavbarLink[] {
  return [
    ...(ff.WORKSTREAMS_ENABLED
      ? [
          {
            label: 'Contribute',
            href: `/network/${network}/workstreams` as RouteWithDynamicPages,
            activeWhen: /\/network\/[a-z]+\/workstreams?(\/.*)?/.source,
          },
        ]
      : []),
    {
      label: 'Roadmaps',
      href: `/network/${network}/roadmaps` as RouteWithDynamicPages,
      activeWhen: /\/network\/[a-z]+\/roadmaps?(\/.*)?/.source,
    },
    {
      label: 'Finances',
      href: `/network/${network}/finances` as RouteWithDynamicPages,
      activeWhen: /\/network\/[a-z]+\/finances?(\/.*)?/.source,
    },
    {
      label: 'Builders',
      href: `/network/${network}/builders` as RouteWithDynamicPages,
      activeWhen: /\/network\/[a-z]+\/builders?(\/.*)?/.source,
    },
    {
      label: 'Governance',
      href: 'https://governance.achra.network',
      isExternal: true,
    },
  ]
}
