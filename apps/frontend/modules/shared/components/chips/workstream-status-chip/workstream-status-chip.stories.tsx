import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { WorkstreamStatusChip } from './workstream-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Chips/WorkstreamStatusChip',
  component: WorkstreamStatusChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(WorkstreamStatus),
      description: 'The status of the workstream',
    },
  },
} satisfies Meta<typeof WorkstreamStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: WorkstreamStatus.InProgress,
  },
}

export const AllStatuses: Story = {
  args: {
    status: WorkstreamStatus.InProgress, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <WorkstreamStatusChip status={WorkstreamStatus.RfpDraft} />
        <WorkstreamStatusChip status={WorkstreamStatus.PreworkRfc} />
        <WorkstreamStatusChip status={WorkstreamStatus.RfpCancelled} />
        <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
        <WorkstreamStatusChip status={WorkstreamStatus.ProposalSubmitted} />
        <WorkstreamStatusChip status={WorkstreamStatus.Awarded} />
        <WorkstreamStatusChip status={WorkstreamStatus.InProgress} />
        <WorkstreamStatusChip status={WorkstreamStatus.Finished} />
        <WorkstreamStatusChip status={WorkstreamStatus.NotAwarded} />
      </div>
    </div>
  ),
}
