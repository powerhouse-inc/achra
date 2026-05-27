import { Briefcase, type LucideIcon, Network, ShoppingBag } from 'lucide-react'

export const PERSONA_IDS = ['operator', 'builder', 'organization'] as const

export type PersonaId = (typeof PERSONA_IDS)[number]

export interface PersonaOption {
  id: PersonaId
  title: string
  description: string
  meta: string
  icon: LucideIcon
  iconClassName: string
  disabled?: boolean
  disabledLabel?: string
}

export const PERSONAS: readonly PersonaOption[] = [
  {
    id: 'builder',
    title: 'Subscribe to a service',
    description:
      'Browse provider offerings — software, legal, ops, infrastructure. Subscribe in stablecoin. Cancel or export anytime.',
    meta: 'Builder workspace',
    icon: ShoppingBag,
    iconClassName: 'bg-gradient-to-br from-chart-2 to-chart-1 text-white',
  },
  {
    id: 'operator',
    title: 'Publish a service',
    description:
      'Hosted product, legal retainer, accounting, governance ops — publish any recurring offering. Subscribers buy directly from you in stablecoin.',
    meta: 'Operator workspace',
    icon: Briefcase,
    iconClassName:
      'bg-gradient-to-br from-primary to-purple text-primary-foreground shadow-primary',
  },
  {
    id: 'organization',
    title: 'Run a network',
    description:
      'Post projects and RFPs, manage milestone payouts. Returning after subscription rails ship.',
    meta: 'Coming soon',
    icon: Network,
    iconClassName: 'bg-muted text-muted-foreground',
    disabled: true,
    disabledLabel: 'Coming soon',
  },
] as const
