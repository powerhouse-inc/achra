import {
  WhyAchraAccentCard,
  WhyAchraCtaCard,
  WhyAchraTextCard,
  WhyAchraWorkflowCard,
} from './why-achra-bento-card'
import type { Route } from 'next'

function WhyAchraSection() {
  return (
    <section className="w-full py-14 sm:py-16 lg:py-20" aria-labelledby="why-achra-heading">
      <div className="container">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="why-achra-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Why Achra
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty sm:text-lg">
            Run your entire network organization through Achra
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-6">
          <div className="flex flex-col gap-6">
            <WhyAchraTextCard
              title="Regain visibility"
              description="Transparency by default with structured RFPs, milestones, and audit trails so builders discover opportunities and operators see exactly where their services are needed."
            />
            <WhyAchraTextCard
              title="Network Governance"
              description="Codify rules, approvals, and execution with Atlas. Operate securely with logged decisions, scoped permissions, and auditable changes."
            />
          </div>

          <div className="flex flex-col gap-6">
            <WhyAchraAccentCard
              accent="payments"
              title="Global Payments at Scale"
              description="Enable milestone-based payouts with stablecoins. Built-in collection and automated tax reporting (e.g., 1099/W-9) lets your network scale globally without the compliance chaos."
            />
            <WhyAchraAccentCard
              accent="ai"
              title="AI-Ready Infrastructure"
              description="Our operational patterns are structured to automate the busywork and make data/flows accessible where AI agents can be first-class participants, not afterthoughts."
            />
          </div>

          <div className="flex flex-col gap-6">
            <WhyAchraCtaCard
              description="Learn more about how Achra supercharges organisations"
              href={'/cases' as Route}
              linkLabel="View Use Cases"
            />
            <WhyAchraWorkflowCard
              title="Best-Practice Workflows"
              description="Launch faster with standardized templates and workflows designed for distributed teams from posting an RFP to tracking deliverables and releasing payouts."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyAchraSection }
