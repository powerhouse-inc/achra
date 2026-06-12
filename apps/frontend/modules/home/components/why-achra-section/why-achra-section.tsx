import { cn } from '@achra/ui/lib/utils'
import Image from 'next/image'

import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { DecorationDots } from '@/modules/home/components/decoration-dots'
import { SectionHeading } from '@/modules/home/components/section-heading'
import Sparkles from '@/public/home/why-achra/sparkles.svg'
import { GradientFlow } from '@/shared/components/gradient-flow'
import { InternalLink } from '@/shared/components/internal-link'
import type { Route } from 'next'
import type { ReactNode } from 'react'

const PANEL_CLASS =
  'relative overflow-hidden rounded-3xl border border-black/6 bg-card shadow-lg lg:sticky lg:min-h-[24rem] lg:[&>div:last-child]:h-full lg:[&>div:last-child]:items-center'

interface PanelEntryProps {
  title?: string
  children: ReactNode
  footer?: ReactNode
  icon?: ReactNode
}

function PanelEntry({ title, children, footer, icon }: PanelEntryProps) {
  return (
    <div className="relative z-1 flex flex-col gap-5 p-8 sm:p-10 lg:p-14">
      {icon}
      {title && (
        <h3 className="text-foreground text-2xl font-bold tracking-tight xl:text-3xl">{title}</h3>
      )}
      <div className="text-foreground/80 max-w-prose text-base leading-relaxed xl:text-lg">
        {children}
      </div>
      {footer}
    </div>
  )
}

/**
 * The six value props as three full-width panels that stack over each other
 * while scrolling (CSS sticky with stepped offsets — no scroll hijacking).
 */
function WhyAchraSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" aria-labelledby="why-achra-heading">
      <div className="container">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <SectionHeading id="why-achra-heading" title="Why Achra" highlight="Achra" />
          <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
            Run your entire network organization through Achra
          </AnimatedSubtitle>
        </header>

        <div className="flex flex-col gap-6 lg:gap-0">
          {/* 1 — visibility + governance */}
          <div className="lg:h-[62vh]">
            <article className={cn(PANEL_CLASS, 'lg:top-28')}>
              <DecorationDots
                rows={6}
                columns={10}
                dotSize={3}
                gap={14}
                fade={{ direction: 'bottom-right', from: 0, to: 0.4 }}
                className="text-primary pointer-events-none absolute top-8 right-10 opacity-60"
              />
              <div className="lg:divide-border grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
                <PanelEntry title="Regain visibility">
                  Transparency by default with structured RFPs, milestones, and audit trails so
                  builders discover opportunities and operators see exactly where their services are
                  needed.
                </PanelEntry>
                <PanelEntry title="Network Governance">
                  Codify rules, approvals, and execution with Atlas. Operate securely with logged
                  decisions, scoped permissions, and auditable changes.
                </PanelEntry>
              </div>
            </article>
          </div>

          {/* 2 — payments + AI on a live gradient wash */}
          <div className="lg:h-[62vh]">
            <article className={cn(PANEL_CLASS, 'lg:top-32')}>
              <GradientFlow preset="valueFlow" className="absolute inset-0" />
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <PanelEntry title="Global Payments at Scale">
                  Enable milestone-based payouts with stablecoins. Built-in collection and automated
                  tax reporting (e.g., 1099/W-9) lets your network scale globally without the
                  compliance chaos.
                </PanelEntry>
                <PanelEntry
                  title="AI-Ready Infrastructure"
                  icon={<Sparkles className="absolute top-6 right-6 size-9" aria-hidden />}
                >
                  Our operational patterns are structured to automate the busywork and make
                  data/flows accessible where AI agents can be first-class participants, not
                  afterthoughts.
                </PanelEntry>
              </div>
            </article>
          </div>

          {/* 3 — workflows + use cases CTA */}
          <div className="lg:h-[62vh]">
            <article className={cn(PANEL_CLASS, 'lg:top-36')}>
              <GradientFlow preset="useCases" animated={false} className="absolute inset-0" />
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <PanelEntry title="Best-Practice Workflows">
                  Launch faster with standardized templates and workflows designed for distributed
                  teams from posting an RFP to tracking deliverables and releasing payouts.
                </PanelEntry>
                <PanelEntry
                  footer={
                    <InternalLink
                      variant="link"
                      href={'/cases' as Route}
                      className="w-fit pl-0! text-base"
                    >
                      View Use Cases
                    </InternalLink>
                  }
                >
                  <div className="flex flex-col gap-6">
                    <div className="relative h-[130px] w-[245px] overflow-hidden">
                      <Image
                        src="/home/why-achra/workflows.webp"
                        alt="Workflow templates: connected steps from RFP to payouts"
                        fill
                        unoptimized // optimizing it makes it blurry
                        className="object-cover object-center"
                        priority={false}
                        sizes="245px"
                      />
                    </div>
                    <p>Learn more about how Achra supercharges organisations</p>
                  </div>
                </PanelEntry>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyAchraSection }
