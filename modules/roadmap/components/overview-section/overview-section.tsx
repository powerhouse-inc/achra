import { SectionTitle } from '../section-title'
import { Timeline } from '../timeline'
// TODO: replace with real data from API
import { milestones } from './mocked-data'

export default function OverviewSection() {
  return (
    <div className="mt-6">
      <SectionTitle
        title="Milestones Roadmap Overview"
        tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
      />

      <div className="mt-6">
        <Timeline milestones={milestones} />
      </div>
    </div>
  )
}
