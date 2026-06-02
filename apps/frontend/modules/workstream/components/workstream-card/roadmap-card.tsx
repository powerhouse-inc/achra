import { ProposalCardOutline } from './proposal-card-outline'

interface RoadmapCardProps {
  milestones: number
  deliverables: number
}

function RoadmapCard({ milestones, deliverables }: RoadmapCardProps) {
  return (
    <ProposalCardOutline title="Roadmap">
      <div className="flex gap-2 text-center">
        <div className="flex flex-1 flex-col">
          <div className="text-3xl font-bold">{milestones}</div>
          <div className="text-foreground/50">Milestones</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-3xl font-bold">{deliverables}</div>
          <div className="text-foreground/50">Deliverables</div>
        </div>
      </div>
    </ProposalCardOutline>
  )
}

export { RoadmapCard }
