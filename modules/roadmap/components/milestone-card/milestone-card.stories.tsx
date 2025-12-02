import { mockedMilestones } from '@/modules/roadmap/mocks'
import MilestoneCard from './milestone-card'
import type { RoadmapDetails_Milestone } from '../../types'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneCard',
  component: MilestoneCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MilestoneCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: mockedMilestones[0] as RoadmapDetails_Milestone,
    className: 'max-w-76',
  },
}
