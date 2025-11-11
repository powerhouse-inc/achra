import type { ScopeOfWork_Roadmap } from '@/modules/__generated__/graphql/switchboard-generated'
import { Header } from './components/header'

interface RoadmapSectionProps {
  roadmap: ScopeOfWork_Roadmap
}
export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <Header title={roadmap.title} description={roadmap.description} id={roadmap.id} />
    </div>
  )
}
