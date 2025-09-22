import { ArrowRight, UserCheck } from 'lucide-react'
import {
  ScopeOfWork_DeliverableSetStatus,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import ProposalCardOutline from './proposal-card-outline'

export default function WorkstreamCard() {
  return (
    <Card className="p-0">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>breadcrumbs</div>
          <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
        </div>

        <div>stats</div>

        <div>markdown</div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b px-4 pt-4 pb-6">
        {/* Initial Proposal header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold">Initial Proposal</div>
              <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
            </div>

            <div className="text-foreground/50 flex items-center gap-2">
              <span>by</span>
              <UserCheck className="size-6" />
              <span>Powerhouse RGH Team</span>
            </div>
          </div>
          <Button variant="outline">
            View Proposal <ArrowRight />
          </Button>
        </div>

        {/* stat cards */}
        <div className="flex gap-6">
          <ProposalCardOutline title="Roadmap">
            <div className="flex gap-2 text-center">
              <div className="flex flex-1 flex-col">
                <div className="text-3xl font-bold">5</div>
                <div className="text-foreground/50">Milestones</div>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="text-3xl font-bold">37</div>
                <div className="text-foreground/50">Deliverables</div>
              </div>
            </div>
          </ProposalCardOutline>
          <ProposalCardOutline title="Budget Estimate" className="pb-6">
            <div className="flex h-full gap-2 text-center">
              <div className="flex flex-1 items-end justify-center gap-2">
                <div className="text-3xl font-bold">18.2</div>
                <div className="text-foreground/50 text-left leading-4 uppercase">
                  <div>K</div>
                  <div>USD</div>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-center gap-2">
                <div className="text-3xl font-bold">4.0</div>
                <div className="text-foreground/50 text-left leading-4 uppercase">
                  <div>K</div>
                  <div>POWTS</div>
                </div>
              </div>
            </div>
          </ProposalCardOutline>
          <ProposalCardOutline title="Payment Terms" className="gap-8">
            <div className="flex flex-wrap justify-between gap-2 gap-y-3 px-6 text-center text-sm/5.5 uppercase [&>div]:flex-1 [&>div]:whitespace-nowrap">
              <div>Retainer</div>
              <div>Monthly</div>
              <div>Cost & Materials</div>
            </div>
          </ProposalCardOutline>
        </div>

        <Separator />
      </div>

      <div>footer</div>
    </Card>
  )
}
