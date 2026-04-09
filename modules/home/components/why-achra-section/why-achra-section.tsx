import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import {
  WhyAchraAccentCard,
  WhyAchraCtaCard,
  WhyAchraTextCard,
  WhyAchraWorkflowCard,
} from './why-achra-bento-card'
import type { Route } from 'next'

function WhyAchraSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" aria-labelledby="why-achra-heading">
      <div className="container">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="why-achra-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Why Achra
          </h2>
          <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
            Run your entire network organization through Achra
          </AnimatedSubtitle>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <WhyAchraTextCard
              className="sm:flex-1"
              title="Regain visibility"
              description="Transparency by default with structured RFPs, milestones, and audit trails so builders discover opportunities and operators see exactly where their services are needed."
            />
            <WhyAchraTextCard
              className="sm:flex-1 lg:flex-none"
              title="Network Governance"
              description="Codify rules, approvals, and execution with Atlas. Operate securely with logged decisions, scoped permissions, and auditable changes."
            />
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <WhyAchraAccentCard
              className="sm:flex-1 lg:flex-none"
              accent="payments"
              title="Global Payments at Scale"
              description="Enable milestone-based payouts with stablecoins. Built-in collection and automated tax reporting (e.g., 1099/W-9) lets your network scale globally without the compliance chaos."
            />
            <WhyAchraAccentCard
              className="sm:flex-1"
              accent="ai"
              title="AI-Ready Infrastructure"
              description="Our operational patterns are structured to automate the busywork and make data/flows accessible where AI agents can be first-class participants, not afterthoughts."
            />
          </div>

          <div className="flex flex-col gap-6 sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:flex lg:flex-col lg:gap-8">
            <WhyAchraCtaCard
              description="Learn more about how Achra supercharges organisations"
              href={'/cases' as Route}
              linkLabel="View Use Cases"
            />
            <WhyAchraWorkflowCard
              className="lg:flex-1"
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
