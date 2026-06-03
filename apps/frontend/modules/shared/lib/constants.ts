import type { SocialMedia } from '@/modules/shared/components/links-popover'
import type { FooterLlmKey } from '@/modules/shared/types/common-enums'

// Application environment constants

/**
 * Application environment
 */
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

/**
 * Fast refresh interval for UseQuery to refetch data every X interval
 */
export const FAST_REFRESH_INTERVAL = 5000 // 5 seconds

/**
 * Base URL for the application
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://achra.com'

/**
 * URL for the Operational Hub
 */
export const OPERATIONAL_HUB_URL = 'https://www.operationalhub.io/contact'

/**
 * Network homepage sections IDs for hash navigation
 */
export enum NetworkHomepageSections {
  Proposals = 'proposals',
  Roadmap = 'roadmap',
  Finances = 'finances',
  Wallets = 'wallets',
  Builders = 'builders',
  Governance = 'governance',
}

export enum NetworkDashboardSections {
  Builders = 'builders',
  Finances = 'finances',
}

/**
 * Scroll margin classes for sections, taking in consideration the navbar height
 */
export const SCROLL_MT_CLASSES = 'scroll-mt-22 sm:scroll-mt-28'

/**
 * Configurable threshold: percentage from top of viewport (0-100)
 * to activate the section.
 *
 * @default 20
 */
export const DEFAULT_SECTION_ACTIVATION_THRESHOLD = 20

/**
 * Delay before scrolling to the section.
 *
 * @default 500
 */
export const SECTION_SCROLL_RESTORATION_DELAY = 500

/**
 * Additional buffer time to ensure smooth scroll completes before re-enabling hash updates
 *
 * @default 400
 */
export const SMOOTH_SCROLL_BUFFER = 400

// Breadcrumb constants

export const MAX_ALLOWED_WIDTH = 300
export const MAX_SEGMENT_WIDTH_MOBILE_DEFAULT = 100
export const THREE_DOTS_WIDTH = 60

// Links popover constants

export const SOCIAL_MEDIA_TYPES: SocialMedia[] = [
  'website',
  'forum',
  'discord',
  'x',
  'github',
  'youtube',
]

// Footer constants

export const FOOTER_LINK_SECTIONS = {
  products: {
    title: 'Products',
    links: [
      { label: 'Explore Achra', href: '/' },
      { label: 'Explore Vetra', href: 'https://vetra.io' },
      { label: 'Use Cases', href: '/cases' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About us', href: 'https://powerhouse.io' },
      { label: 'Academy', href: 'https://academy.vetra.io' },
    ],
  },
} as const

export const FOOTER_LLM_KEYS: readonly FooterLlmKey[] = ['chatgpt', 'claude', 'grok']

export const FOOTER_LLM_CONVERSATIONS: Record<
  FooterLlmKey,
  Array<{ label: string; href: string }>
> = {
  chatgpt: [
    {
      label: 'What Is Achra?',
      href: 'https://chatgpt.com/share/696e8ea2-5390-8003-8bdb-c08e815452cf',
    },
    {
      label: 'Achra Operational Hub',
      href: 'https://chatgpt.com/share/6970f495-b9ec-800d-aac5-7c433607681c',
    },
    {
      label: 'Achra and Automation',
      href: 'https://chatgpt.com/share/6970f4c8-2c28-800d-a658-6195737ebbfa',
    },
  ],
  claude: [
    {
      label: 'Tell me about Achra',
      href: 'https://claude.ai/share/74821bd7-23e7-4fc3-939e-65fda30d5bea',
    },
    {
      label: 'The Future of Work',
      href: 'https://claude.ai/share/d193b0fa-0759-4c24-bf5a-d499b9e3458f',
    },
    {
      label: 'Operational Hub Structure',
      href: 'https://claude.ai/share/d0cf7eb1-6753-4556-928b-6e4525769f17',
    },
  ],
  grok: [
    {
      label: 'Tell me About Achra',
      href: 'https://x.com/i/grok/share/eeeb0028d4de4406a2491233ba0813a1',
    },
    {
      label: 'Achra Benefits',
      href: 'https://x.com/i/grok/share/af97077264dc430a9eadef0b8d94e237',
    },
    {
      label: 'Operational Hub Benefits',
      href: 'https://x.com/i/grok/share/64cb0afcd8f545eb9744cfb092d0cccc',
    },
  ],
}

export const FOOTER_LLM_LABELS: Record<FooterLlmKey, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  grok: 'Grok',
}
