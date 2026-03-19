import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { StatusMetricCard } from './status-metric-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/StatusMetricCard',
  component: StatusMetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(ScopeOfWork_DeliverableSetStatus),
      description: 'Status of the deliverable set',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress percentage (0-100)',
    },
  },
} satisfies Meta<typeof StatusMetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: ScopeOfWork_DeliverableSetStatus.InProgress,
    progress: 65,
  },
}

export const Complete: Story = {
  args: {
    status: ScopeOfWork_DeliverableSetStatus.Finished,
    progress: 100,
  },
}

export const Draft: Story = {
  args: {
    status: ScopeOfWork_DeliverableSetStatus.Draft,
    progress: 0,
  },
}
