import { mockedMilestones } from '@/modules/roadmap/mocks'
import Timeline from './timeline'
import type { RoadmapDetails_Milestone } from '../../types'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1312px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestones: mockedMilestones as unknown as RoadmapDetails_Milestone[],
  },
}
