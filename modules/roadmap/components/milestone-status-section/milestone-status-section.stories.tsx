import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
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
      options: Object.values(ScopeOfWork_DeliverableSetStatus),
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
    status: ScopeOfWork_DeliverableSetStatus.InProgress,
    progress: 60,
  },
}

export const Finished: Story = {
  args: {
    status: ScopeOfWork_DeliverableSetStatus.Finished,
    progress: 100,
  },
}

export const Todo: Story = {
  args: {
    status: ScopeOfWork_DeliverableSetStatus.Todo,
    progress: 0,
  },
}

export const NoStatus: Story = {
  args: {
    progress: 45,
  },
}
