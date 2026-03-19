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
  argTypes: {
    completed: {
      control: 'number',
      description: 'Number of completed key results',
    },
    total: {
      control: 'number',
      description: 'Total number of key results',
    },
    deliverables: {
      description: 'List of deliverables containing key results',
    },
  },
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
