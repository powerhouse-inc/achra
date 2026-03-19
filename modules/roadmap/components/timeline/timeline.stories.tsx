import { mockedMilestones } from '@/modules/roadmap/mocks'
import Timeline from './timeline'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  argTypes: {
    milestones: {
      control: false,
      description: 'Array of milestones to display in the timeline',
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
    milestones: mockedMilestones,
  },
}
