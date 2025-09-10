import { MilestoneDetailsCard } from '../milestone-details-card'
import { SectionTitle } from '../section-title'
import { mockedMilestone1, mockedMilestone2, mockedMilestone3 } from './mocked-data'

export default function DetailsSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="flex flex-col gap-8">
        <MilestoneDetailsCard milestone={mockedMilestone1} />
        <MilestoneDetailsCard milestone={mockedMilestone2} />
        <MilestoneDetailsCard milestone={mockedMilestone3} />
      </div>
    </div>
  )
}
