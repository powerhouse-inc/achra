import { SectionTitle } from '../section-title'
import { Timeline } from '../timeline'
// TODO: replace with real data from API
import { milestones } from './mocked-data'

export default function OverviewSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="Milestones Roadmap Overview"
        tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
      />

      <Timeline milestones={milestones} />
    </div>
  )
}
