import { Suspense } from 'react'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import { SectionTitle } from '../../../shared/components/section-title'
import {
  ExecutiveProposals,
  ExecutiveProposalsListSkeleton,
} from './components/executive-proposals'
import { ExternalLinks } from './components/external-links/external-links'
import ForumOverview from './components/forum-overview/forum-overview'

export function GovernanceSection() {
  return (
    <section
      className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Governance)}
    >
      <div className="flex flex-col">
        <SectionTitle title="Governance" hash="governance" />
        <span className="text-foreground/50 text-sm/5.5 font-semibold xl:text-base/6">
          The Powerhouse Network is build upon the Foundational Governance Document named Atlas.
          Explore this document for yourself through the Atlas Explorer.
        </span>
      </div>
      <ExternalLinks />

      <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the executive proposals. Please try again later.">
        <Suspense fallback={<ExecutiveProposalsListSkeleton />}>
          <ExecutiveProposals />
        </Suspense>
      </ErrorBoundaryWithPresets>

      <ForumOverview />
    </section>
  )
}
