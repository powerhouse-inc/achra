import { mockedMilestones } from '@/modules/roadmap/mocks'
import Timeline from './timeline'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestones: mockedMilestones,
  },
}
