import { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableStatusChip from './deliverable-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Chips/DeliverableStatusChip',
  component: DeliverableStatusChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(ScopeOfWork_DeliverableStatus),
      description: 'The status of the deliverable',
    },
  },
} satisfies Meta<typeof DeliverableStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: ScopeOfWork_DeliverableStatus.InProgress,
  },
}

export const AllStatuses: Story = {
  args: {
    status: ScopeOfWork_DeliverableStatus.InProgress, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Todo} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.InProgress} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Delivered} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Draft} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Blocked} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Canceled} />
        <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.WontDo} />
      </div>
    </div>
  ),
}
