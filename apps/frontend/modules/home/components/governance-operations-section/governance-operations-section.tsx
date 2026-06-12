import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { SectionHeading } from '@/modules/home/components/section-heading'
import { Reveal } from '@/shared/components/reveal'
import { GovernanceFeatureRow } from './governance-feature-row'
import { GOVERNANCE_ROWS } from './governance-rows'
import { GovernanceScrollytelling } from './governance-scrollytelling'

// Rendered twice (pinned panel on desktop, normal flow on mobile) — only the
// desktop copy carries the id the section's aria-labelledby points to.
function GovernanceHeader({ withId = false }: { withId?: boolean }) {
  return (
    <header className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
      <SectionHeading
        id={withId ? 'governance-operations-heading' : undefined}
        title="Governance & Operations"
        highlight="Governance"
      />
      <AnimatedSubtitle className="text-foreground/80 text-base leading-relaxed text-pretty sm:text-lg">
        Move beyond outsourcing and unlock full autonomy.
        <br /> Run your entire network organization through Achra.
      </AnimatedSubtitle>
    </header>
  )
}

function GovernanceOperationsSection() {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-0"
      aria-labelledby="governance-operations-heading"
    >
      <div className="container">
        {/* pinned scroll story on desktop — the header pins with it */}
        <div className="hidden lg:block">
          <GovernanceScrollytelling header={<GovernanceHeader withId />} />
        </div>

        {/* stacked rows below lg */}
        <div className="flex flex-col gap-8 lg:hidden">
          <GovernanceHeader />
          <div className="flex flex-col gap-14">
            {GOVERNANCE_ROWS.map((row, index) => (
              <Reveal key={row.id} delay={0.05}>
                <GovernanceFeatureRow
                  imageSrc={row.imageSrc}
                  imageAlt={row.imageAlt}
                  imageWidth={row.imageWidth}
                  imageHeight={row.imageHeight}
                  imagePosition={index % 2 === 1 ? 'right' : 'left'}
                  labelStart={row.labelStart}
                  labelEnd={row.labelEnd}
                  description={row.description}
                  bulletItems={row.bulletItems}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { GovernanceOperationsSection }
