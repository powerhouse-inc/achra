import {
  BadgeDollarSign,
  BrainCog,
  Compass,
  Earth,
  FileCodeCorner,
  Handshake,
  Network,
  Scale,
  ShieldUser,
  SquareKanban,
  Users,
  Vote,
} from 'lucide-react'

import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { GovernanceFeatureRow } from './governance-feature-row'

function GovernanceOperationsSection() {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24"
      aria-labelledby="governance-operations-heading"
    >
      <div className="container flex flex-col gap-8 lg:gap-20">
        <header className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2
            id="governance-operations-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Governance &amp; Operations
          </h2>
          <AnimatedSubtitle className="text-foreground/80 text-base leading-relaxed text-pretty sm:text-lg">
            Move beyond outsourcing and unlock full autonomy. Run your entire network organization
            through Achra.
          </AnimatedSubtitle>
        </header>

        <div className="flex flex-col gap-14 lg:gap-18">
          <GovernanceFeatureRow
            imageSrc="/home/governance-operations/governance-executable.png"
            imageAlt="Achra governance flows connecting approvals, voting, and automated payouts"
            imageWidth={3018}
            imageHeight={1704}
            imagePosition="left"
            labelStart="Achra"
            labelEnd="Makes Governance Executable"
            description="Achra integrates with the governance system of your choice and transforms approvals and rules into workflows, payouts, and verifiable records so organizations can move with clarity and confidence."
            bulletItems={[
              {
                id: 'programmable-governance',
                icon: BrainCog,
                content: 'Programmable governance automates approvals and payouts.',
              },
              {
                id: 'proposals-voting',
                icon: Vote,
                content: 'Supports proposals, voting, and rules.',
              },
              {
                id: 'scoped-authority',
                icon: ShieldUser,
                content: 'Scoped authority enables safe, limited delegation.',
              },
              {
                id: 'logged-auditable',
                icon: FileCodeCorner,
                content: 'Actions are logged and auditable.',
              },
              {
                id: 'atlas-workflows',
                icon: Earth,
                content: 'Atlas turns contracts into self-running workflows.',
              },
            ]}
          />

          <GovernanceFeatureRow
            imageSrc="/home/governance-operations/scalable-operations.png"
            imageAlt="Operational marketplace connecting legal, finance, and people ops for network organizations"
            imageWidth={1808}
            imageHeight={1046}
            imagePosition="right"
            labelStart="Scalable"
            labelEnd="Operations for Network Orgs"
            description="Every network has its own unique set of operational needs: legal, finance, people and more. Achra brings them all into one connected marketplace, so networks can scale without chaos."
            bulletItems={[
              {
                id: 'legal-ops',
                icon: Scale,
                content: 'Legal Ops handles setup, contracts, and IP protection.',
              },
              {
                id: 'finance-ops',
                icon: BadgeDollarSign,
                content: 'Finance Ops automates budgets, payouts, and reporting.',
              },
              {
                id: 'people-ops',
                icon: Users,
                content: 'People Ops streamlines hiring and onboarding.',
              },
            ]}
          />

          <GovernanceFeatureRow
            imageSrc="/home/governance-operations/integrated-team.png"
            imageAlt="Achra control center for teams to manage runway, services, and operations"
            imageWidth={2762}
            imageHeight={1426}
            imagePosition="left"
            labelStart="Integrated"
            labelEnd="Team Management"
            description="Whether you're an individual contributor, a dev shop, or a larger network participant, Achra gives you a dedicated control center to run your work, connect services, and manage operations in one place."
            bulletItems={[
              {
                id: 'core-tools',
                icon: Scale,
                content: 'Operate with confidence with core tools for any team size.',
              },
              {
                id: 'runway-balance',
                icon: SquareKanban,
                content: 'Manage your runway track balance, income, and burn in real time.',
              },
              {
                id: 'support-services',
                icon: Handshake,
                content: 'Support services connect to essential marketplace tools.',
              },
              {
                id: 'unified-control',
                icon: Network,
                content: 'Unified control manage all operations from one place.',
              },
              {
                id: 'scalable-setup',
                icon: Compass,
                content: 'Scalable setup built for individuals, teams, and networks alike.',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export { GovernanceOperationsSection }
