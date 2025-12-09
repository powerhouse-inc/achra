import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { BudgetMetricCard } from '@/modules/project/components/budget-metric-card'
import { KeyResultsMetricCard } from '@/modules/project/components/key-results-metric-card'
import { StatusMetricCard } from '@/modules/project/components/status-metric-card'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'

function ProjectCard() {
  return (
    <Card className="gap-4 p-3">
      <CardHeader className="flex items-end justify-between p-0">
        <div className="flex items-baseline gap-1">
          <div className="text-2xl leading-[120%] font-bold">Front-end Development</div>
          <div className="text-foreground/50 text-base/6 font-semibold uppercase">PRJ-1</div>
        </div>

        <InternalLink href="/">View Project</InternalLink>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <p>
          Lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean dui. Enim
          eu venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi lacus libero purus.
          Sed faucibus fringilla aliquet ac bibendum lorem sed amet. Convallis.
        </p>

        <div className="flex flex-col gap-4 lg:flex-row">
          <BudgetMetricCard value={0} unit="DAI" />
          <StatusMetricCard status={ScopeOfWork_DeliverableSetStatus.Draft} progress={50} />
          <KeyResultsMetricCard completed={0} total={0} deliverables={[]} />
        </div>
      </CardContent>
    </Card>
  )
}

export { ProjectCard }
