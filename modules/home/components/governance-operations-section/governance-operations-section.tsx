import { GovernanceFeatureRow } from './governance-feature-row'

function GovernanceOperationsSection() {
  return (
    <section
      className="w-full bg-[rgb(250,249,247)] px-6 py-16 sm:px-10 sm:py-20"
      aria-labelledby="governance-operations-heading"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 lg:gap-20">
        <header className="mx-auto flex max-w-[550px] flex-col gap-6 text-center">
          <h2
            id="governance-operations-heading"
            className="text-3xl font-semibold tracking-tight text-balance text-[#1a1a1a] sm:text-4xl"
          >
            Governance &amp; Operations
          </h2>
          <p className="text-base leading-relaxed text-pretty text-[#666666] sm:text-lg">
            Move beyond outsourcing and unlock full autonomy. Run your entire network organization
            through Achra.
          </p>
        </header>

        <div className="flex flex-col gap-14 lg:gap-[71px]">
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
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">
                      Programmable governance
                    </span>{' '}
                    automates approvals and payouts.
                  </>
                ),
              },
              {
                id: 'proposals-voting',
                content: (
                  <>
                    Supports{' '}
                    <span className="font-medium text-[rgb(10,10,10)]">proposals, voting,</span> and{' '}
                    <span className="font-medium text-[rgb(10,10,10)]">rules.</span>
                  </>
                ),
              },
              {
                id: 'scoped-authority',
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">Scoped authority</span>{' '}
                    enables safe, limited delegation.
                  </>
                ),
              },
              {
                id: 'logged-auditable',
                content: (
                  <>
                    Actions are{' '}
                    <span className="font-medium text-[rgb(10,10,10)]">logged and auditable.</span>
                  </>
                ),
              },
              {
                id: 'atlas-workflows',
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">Atlas</span> turns contracts
                    into{' '}
                    <span className="font-medium text-[rgb(10,10,10)]">
                      self-running workflows.
                    </span>
                  </>
                ),
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
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">Legal Ops</span> handles
                    setup, contracts, and IP protection.
                  </>
                ),
              },
              {
                id: 'finance-ops',
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">Finance Ops</span> automates
                    budgets, payouts, and reporting.
                  </>
                ),
              },
              {
                id: 'people-ops',
                content: (
                  <>
                    <span className="font-medium text-[rgb(10,10,10)]">People Ops</span> streamlines
                    hiring and onboarding.
                  </>
                ),
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
            bulletClassName="font-light"
            bulletItems={[
              {
                id: 'core-tools',
                content: 'Operate with confidence with core tools for any team size.',
              },
              {
                id: 'runway-balance',
                content: 'Manage your runway track balance, income, and burn in real time.',
              },
              {
                id: 'support-services',
                content: 'Support services connect to essential marketplace tools.',
              },
              {
                id: 'unified-control',
                content: 'Unified control manage all operations from one place.',
              },
              {
                id: 'scalable-setup',
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
