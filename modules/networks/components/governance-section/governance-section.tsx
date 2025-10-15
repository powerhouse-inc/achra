import { Suspense } from 'react'
import { SectionTitle } from '../section-title'
import { ErrorBoundary } from './components/error-boundary/error-boundary'
import { ExecutiveProposals } from './components/executive-proposals/executive-proposals'
import { ExternalLinks } from './components/external-links/external-links'
import ForumOverview from './components/forum-overview/forum-overview'

export function GovernanceSection() {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <SectionTitle title="Governance" hash="governance" />
        <span className="text-foreground/50 text-base/6 font-semibold">
          The Powerhouse Network is build upon the Foundational Governance Document named Atlas.
          Explore this document for yourself through the Atlas Explorer.
        </span>
      </div>
      <ExternalLinks />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ExecutiveProposals />
        </Suspense>
      </ErrorBoundary>
      <ForumOverview />
    </section>
  )
}
