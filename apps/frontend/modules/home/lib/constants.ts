import type { BuildNetworkFeatureColumn } from '@/modules/home/types'
import ff from '@/shared/lib/feature-flags'

/** Enable the floating "ships on waves" animation on build-network collage layers. */
export const ENABLE_COLLAGE_FLOAT_ANIMATION: boolean = true

export const BUILD_NETWORK_V2_BLUE_CTA_CLASS =
  'h-10 rounded-md border-0 bg-[rgb(5,130,255)] px-5 text-sm font-medium text-white shadow-none hover:bg-[rgb(5,130,255)]/90'

export const BUILD_NETWORK_V2_VIOLET_CTA_CLASS =
  'h-10 rounded-md border-0 bg-primary px-5 text-sm font-medium text-white shadow-none hover:bg-primary/90'

export const BUILD_NETWORK_V2_PINK_CTA_CLASS =
  'h-10 rounded-md border-0 bg-[rgb(221,80,216)] px-5 text-sm font-medium text-white shadow-none hover:bg-[rgb(221,80,216)]/90'

export const BUILD_NETWORK_V2_FEATURES: BuildNetworkFeatureColumn[] = [
  {
    variant: 'organizations',
    title: 'For Organizations',
    description:
      'Set clear objectives for your network organization. Receive structured proposals from the best contributor teams to deliver on your roadmap.',
    cta: { label: 'View networks', href: '/networks', tone: 'blue' },
  },
  {
    variant: 'builders',
    title: 'For Builders',
    description:
      'Discover active projects and roadmaps from leading network organizations. Focus on building with built-in operational support.',
    cta: { label: 'Browse workstreams', href: '/workstreams', tone: 'violet' },
    enabled: ff.workstreams.WORKSTREAMS_ENABLED,
  },
  {
    variant: 'operators',
    title: 'For Operators',
    description:
      'Access a catalog of services and operational support to launch, manage, and grow your networked organization.',
    cta: { label: 'Service catalog', href: '/services', tone: 'pink' },
  },
]
