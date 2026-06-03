import { Sow_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneStatusSection } from './milestone-status-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneStatusSection',
  component: MilestoneStatusSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(Sow_DeliverableSetStatus),
      description: 'Deliverable set status',
    },
    progress: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Progress percentage (0-100)',
    },
  },
} satisfies Meta<typeof MilestoneStatusSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: Sow_DeliverableSetStatus.InProgress,
    progress: 60,
  },
}

export const Finished: Story = {
  args: {
    status: Sow_DeliverableSetStatus.Finished,
    progress: 100,
  },
}

export const Todo: Story = {
  args: {
    status: Sow_DeliverableSetStatus.Todo,
    progress: 0,
  },
}

export const NoStatus: Story = {
  args: {
    progress: 45,
  },
}
