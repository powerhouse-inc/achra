import { mockProjectDeliverables } from '@/modules/project/mocks'
import { KeyResultsMetricCard } from './key-results-metric-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/KeyResultsMetricCard',
  component: KeyResultsMetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KeyResultsMetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    completed: 2,
    total: 3,
    deliverables: mockProjectDeliverables,
  },
}

export const AllComplete: Story = {
  args: {
    completed: 3,
    total: 3,
    deliverables: mockProjectDeliverables,
  },
}
