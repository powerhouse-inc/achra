import { DeliverableStatus } from '@/modules/roadmap/components/milestone-details-card/types'
import DeliverableStatusChip from './deliverable-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof DeliverableStatusChip> = {
  title: 'Shared/Components/Chips/DeliverableStatusChip',
  component: DeliverableStatusChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(DeliverableStatus),
      description: 'The status of the deliverable',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Todo: Story = {
  args: {
    status: DeliverableStatus.TODO,
  },
}

export const InProgress: Story = {
  args: {
    status: DeliverableStatus.IN_PROGRESS,
  },
}

export const Delivered: Story = {
  args: {
    status: DeliverableStatus.DELIVERED,
  },
}

export const Draft: Story = {
  args: {
    status: DeliverableStatus.DRAFT,
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <DeliverableStatusChip status={DeliverableStatus.TODO} />
        <DeliverableStatusChip status={DeliverableStatus.IN_PROGRESS} />
        <DeliverableStatusChip status={DeliverableStatus.DELIVERED} />
        <DeliverableStatusChip status={DeliverableStatus.DRAFT} />
      </div>
    </div>
  ),
}
