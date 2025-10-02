import { cn } from '@/modules/shared/lib/utils'
import { SectionTitle } from '../section-title'
import { ExternalLink } from './components/external-link/external-link'

export interface GovernanceSectionProps {
  className?: string
}

export function GovernanceSection({ className }: GovernanceSectionProps) {
  return (
    <section className={cn('flex w-full flex-col gap-6', className)}>
      <div className="flex flex-col">
        <SectionTitle title="Governance" hash="governance" />
        <span className="text-foreground/50 text-base/6 font-semibold">
          The Powerhouse Network is build upon the Foundational Governance Document named Atlas.
          Explore this document for yourself through the Atlas Explorer.
        </span>
      </div>
      <div className="align-center flex flex-col gap-4 sm:flex-row md:gap-6">
        <ExternalLink
          href="https://sky-atlas.powerhouse.io/"
          imageSrc="/networks/logos/atlas.png"
          name="Powerhouse Atlas"
          description="Launch Atlas Explorer"
        />
        <ExternalLink
          href="https://vote.sky.money/"
          imageSrc="/networks/logos/sky-vote.png"
          name="Sky Vote"
          description="Launch Sky Vote"
        />
      </div>
    </section>
  )
}
