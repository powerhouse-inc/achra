import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/shared/lib/utils'
import type { RouteWithDynamicPages } from '@/shared/types/routes'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import SectionTitle from '../../../shared/components/section-title/section-title'
import ProposalsSwiper from './components/proposals-swiper/proposals-swiper'

export interface Proposal {
  id: string
  title: string
  budget: string
  submissionDeadline: string
  detailsHref: RouteWithDynamicPages
}

export interface ProposalsSectionProps {
  proposals: Proposal[]
  className?: string
}

export function ProposalsSection({ proposals, className }: ProposalsSectionProps) {
  return (
    <section
      className={cn(
        `flex w-full flex-col gap-6 ${proposals.length === 0 ? 'hidden' : ''}`,
        SCROLL_MT_CLASSES,
        className,
      )}
      id={encodeSectionId(NetworkHomepageSections.Proposals)}
    >
      <div className="flex flex-col">
        <SectionTitle title="Proposals" hash="proposals" />
        <span className="text-foreground/50 text-base/6 font-semibold">
          {`Powerhouse has ${proposals.length} active ${proposals.length === 1 ? 'Request' : 'Requests'} for Proposal`}
        </span>
      </div>
      <ProposalsSwiper proposals={proposals} />
    </section>
  )
}
