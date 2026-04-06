import type { ReactNode } from 'react'

type OrgLink = {
  name: string
  url: string
}

type UseCase = {
  title: string
  tags: string[]
  description: ReactNode
  note?: string
  benefits: string[]
}

const useCasesData: UseCase[] = [
  {
    title: 'Distributed Organizations',
    tags: ['Network Organizations', 'Open Source'],
    description: (
      <>
        Global networks like <OrgAnchor href="https://arbitrum.io">Arbitrum</OrgAnchor> and{' '}
        <OrgAnchor href="https://sky.money">Sky</OrgAnchor> coordinate teams, grants, and programs
        across time zones and jurisdictions.
      </>
    ),
    note: 'Achra grew out of work with Sky and runs there today. The same platform supports other distributed teams.',
    benefits: [
      'Coordinate governance, funding, and operations through shared workflows.',
      'Align contributors and sub-organizations under one transparent structure.',
      'Scale participation while maintaining clarity and compliance.',
    ],
  },
  {
    title: 'Open Source Projects and Collectives',
    tags: ['Open Source', 'Public Goods'],
    description: (
      <>
        Open-source communities using{' '}
        <OrgAnchor href="https://opencollective.com">Open Collective</OrgAnchor> and{' '}
        <OrgAnchor href="https://drips.network">Drips</OrgAnchor> fund maintainers and long-term
        work in public view. Achra maps issues and releases to budgets and milestones, automates
        payouts, and aligns roadmaps across maintainers and sponsors.
      </>
    ),
    benefits: [
      'Manage budgets, payments, and contributors in one public ledger.',
      'Fund long-term maintenance without privatizing the codebase.',
      'Operate across multiple teams and jurisdictions with clear governance.',
    ],
  },
  {
    title: 'Governments and Political Orgs',
    tags: ['Network States', 'Public Goods'],
    description: (
      <>
        New civic networks like <OrgAnchor href="https://volteuropa.org">Volt</OrgAnchor> and
        experiments like <OrgAnchor href="https://thenetworkstate.com">The Network State</OrgAnchor>{' '}
        aim for transparent, participatory governance. Achra helps them budget programs, disburse
        funds, manage roles and vendors, publish records, and track outcomes.
      </>
    ),
    benefits: [
      'Manage treasuries, initiatives, and elections in open view.',
      'Coordinate cross-border funding and policy through accountable workflows.',
      'Enable citizens or members to engage directly in decision-making.',
    ],
  },
  {
    title: 'Creator Economy and Cultural Projects',
    tags: ['Community Organizations', 'Public Goods'],
    description: (
      <>
        Creators and cultural projects sustain their practice through patronage and community
        funding. Platforms like <OrgAnchor href="https://zora.co">Zora</OrgAnchor> and{' '}
        <OrgAnchor href="https://patreon.com">Patreon</OrgAnchor> let communities back artists in
        public view. Achra lets teams work together with shared ownership in a single transparent
        workflow, from planning through payment.
      </>
    ),
    benefits: [
      'Pool funding and revenue transparently across members and projects.',
      'Automate rights, payments, and profit-sharing within one platform.',
      'Build community-led creative networks that sustain themselves over time.',
    ],
  },
  {
    title: 'Social Impact Organizations',
    tags: ['Community Organizations'],
    description: (
      <>
        Purpose-driven groups like <OrgAnchor href="https://mossy.earth">Mossy Earth</OrgAnchor> and{' '}
        <OrgAnchor href="https://givedirectly.org">GiveDirectly</OrgAnchor> use open reporting to
        align mission with accountability. Achra ties donations, budgets, supply-chain data, and
        outcome tracking into one system so supporters can see where money goes and what it
        achieves.
      </>
    ),
    benefits: [
      'Track supply chains, donations, and outcomes in real time.',
      'Share transparent data with customers and supporters.',
      'Reinforce trust and community ownership in every transaction.',
    ],
  },
  {
    title: 'Alternative Organizations',
    tags: ['Community Organizations', 'Public Goods'],
    description: (
      <>
        Groups like <OrgAnchor href="https://buurtzorg.com">Buurtzorg</OrgAnchor>,{' '}
        <OrgAnchor href="https://patagonia.com">Patagonia</OrgAnchor>, and{' '}
        <OrgAnchor href="https://mondragon-corporation.com">Mondragón</OrgAnchor> prove that shared
        ownership can scale. Achra supports this model by tying proposals, budgets, payouts, and
        documentation into one clear system so members coordinate decisions and money with full
        transparency.
      </>
    ),
    benefits: [
      'Coordinate proposals, decisions, and outcomes transparently across members.',
      'Manage shared finances and documentation in one clear system.',
      'Stay decentralized while maintaining the benefits of a unified organization.',
    ],
  },
]

function OrgAnchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-foreground/80 font-medium underline underline-offset-2"
    >
      {children}
    </a>
  )
}

export { useCasesData }
export type { UseCase }
