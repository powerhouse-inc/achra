import { cn } from '@achra/ui/lib/utils'
import {
  BrainCircuit,
  Coins,
  type LucideIcon,
  ScanSearch,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import Image from 'next/image'

import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { DecorationDots } from '@/modules/home/components/decoration-dots'
import { SectionHeading } from '@/modules/home/components/section-heading'
import Sparkles from '@/public/home/why-achra/sparkles.svg'
import { CardAurora } from '@/shared/components/card-aurora'
import { GradientFlow } from '@/shared/components/gradient-flow'
import { InternalLink } from '@/shared/components/internal-link'
import { Reveal } from '@/shared/components/reveal'
import type { Route } from 'next'

const tileClass =
  'relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl bg-card p-8 shadow-xs ring-1 ring-black/6 transition-shadow duration-300 hover:shadow-md lg:p-10'

function TileIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="bg-primary/10 flex size-11 shrink-0 items-center justify-center rounded-xl">
      <Icon className="text-primary size-5.5" aria-hidden />
    </div>
  )
}

function TileHeader({ icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <TileIcon icon={icon} />
      <h3 className="text-foreground text-xl font-semibold tracking-tight xl:text-2xl">
        {children}
      </h3>
    </div>
  )
}

function TileCopy({ children }: { children: string }) {
  return <p className="text-foreground/80 max-w-prose text-base leading-relaxed">{children}</p>
}

function WhyAchraSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" aria-labelledby="why-achra-heading">
      <div className="container">
        <Reveal>
          <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
            <SectionHeading id="why-achra-heading" title="Why Achra" highlight="Achra" />
            <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
              Run your entire network organization through Achra
            </AnimatedSubtitle>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {/* visibility */}
          <Reveal className="flex lg:col-span-7">
            <article className={tileClass}>
              <DecorationDots
                rows={5}
                columns={9}
                dotSize={3}
                gap={14}
                fade={{ direction: 'bottom-left', from: 0, to: 0.35 }}
                className="text-primary pointer-events-none absolute top-3 right-3 opacity-60"
              />
              <TileHeader icon={ScanSearch}>Regain visibility</TileHeader>
              <TileCopy>
                Transparency by default with structured RFPs, milestones, and audit trails so
                builders discover opportunities and operators see exactly where their services are
                needed.
              </TileCopy>
            </article>
          </Reveal>

          {/* governance */}
          <Reveal delay={0.08} className="flex lg:col-span-5">
            <article className={tileClass}>
              <TileHeader icon={ShieldCheck}>Network Governance</TileHeader>
              <TileCopy>
                Codify rules, approvals, and execution with Atlas. Operate securely with logged
                decisions, scoped permissions, and auditable changes.
              </TileCopy>
            </article>
          </Reveal>

          {/* payments — animated violet/pink bloom */}
          <Reveal delay={0.05} className="flex lg:col-span-5">
            <article className={tileClass}>
              <GradientFlow preset="payments" className="absolute inset-0" />
              <div className="relative z-1 flex flex-col gap-4">
                <TileHeader icon={Coins}>Global Payments at Scale</TileHeader>
                <TileCopy>
                  Enable milestone-based payouts with stablecoins. Built-in collection and automated
                  tax reporting (e.g., 1099/W-9) lets your network scale globally without the
                  compliance chaos.
                </TileCopy>
              </div>
            </article>
          </Reveal>

          {/* AI — animated blue/violet glow */}
          <Reveal delay={0.12} className="flex lg:col-span-7">
            <article className={tileClass}>
              <GradientFlow preset="ai" className="absolute inset-0" />
              <Sparkles
                className="pointer-events-none absolute top-6 right-6 z-1 size-9"
                aria-hidden
              />
              <div className="relative z-1 flex flex-col gap-4">
                <TileHeader icon={BrainCircuit}>AI-Ready Infrastructure</TileHeader>
                <TileCopy>
                  Our operational patterns are structured to automate the busywork and make
                  data/flows accessible where AI agents can be first-class participants, not
                  afterthoughts.
                </TileCopy>
              </div>
            </article>
          </Reveal>

          {/* workflows — illustration on top, copy below; soft mask melts the
              image's own background into the card */}
          <Reveal delay={0.05} className="flex lg:col-span-7">
            <article className={cn(tileClass, 'lg:flex-row lg:items-center lg:gap-10')}>
              {/* illustration: on top when stacked, beside the copy when wide */}
              <div className="relative h-[140px] w-[260px] shrink-0 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,black_55%,transparent_98%)] lg:order-last">
                <Image
                  src="/home/why-achra/workflows.webp"
                  alt="Workflow templates: connected steps from RFP to payouts"
                  fill
                  unoptimized // optimizing it makes it blurry
                  className="object-cover object-center"
                  priority={false}
                  sizes="260px"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-4">
                <TileHeader icon={Workflow}>Best-Practice Workflows</TileHeader>
                <TileCopy>
                  Launch faster with standardized templates and workflows designed for distributed
                  teams from posting an RFP to tracking deliverables and releasing payouts.
                </TileCopy>
              </div>
            </article>
          </Reveal>

          {/* use-cases CTA — living silk accent */}
          <Reveal delay={0.12} className="flex lg:col-span-5">
            <article className={cn(tileClass, 'justify-center')}>
              {/* softened so the silk reads as a wash behind the CTA copy */}
              <CardAurora className="absolute inset-0 opacity-55" />
              <div className="relative z-1 flex flex-col items-center gap-4 text-center">
                <p className="text-foreground max-w-[18rem] text-base leading-relaxed font-medium">
                  Learn more about how Achra supercharges organisations
                </p>
                <InternalLink variant="link" href={'/cases' as Route} className="text-base">
                  View Use Cases
                </InternalLink>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export { WhyAchraSection }
