import { cn } from '@/modules/shared/lib/utils'
import { SectionTitle } from '../section-title'

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
    </section>
  )
}
