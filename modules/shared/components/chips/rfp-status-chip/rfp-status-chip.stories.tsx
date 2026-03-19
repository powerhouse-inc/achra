import { RfpStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { RfpStatusChip } from './rfp-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Chips/RfpStatusChip',
  component: RfpStatusChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(RfpStatus),
      description: 'The status of the RFP',
    },
  },
} satisfies Meta<typeof RfpStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: RfpStatus.OpenForProposals,
  },
}

export const AllStatuses: Story = {
  args: {
    status: RfpStatus.OpenForProposals, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <RfpStatusChip status={RfpStatus.Draft} />
        <RfpStatusChip status={RfpStatus.RequestForCommments} />
        <RfpStatusChip status={RfpStatus.Canceled} />
        <RfpStatusChip status={RfpStatus.OpenForProposals} />
        <RfpStatusChip status={RfpStatus.Awarded} />
        <RfpStatusChip status={RfpStatus.NotAwarded} />
        <RfpStatusChip status={RfpStatus.Closed} />
      </div>
    </div>
  ),
}
