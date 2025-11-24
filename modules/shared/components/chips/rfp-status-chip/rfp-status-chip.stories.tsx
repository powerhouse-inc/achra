import { RfpStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { RfpStatusChip } from './rfp-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof RfpStatusChip> = {
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
}

export default meta
type Story = StoryObj<typeof meta>

export const RfpDraft: Story = {
  args: {
    status: RfpStatus.Draft,
  },
}

export const RequestForComments: Story = {
  args: {
    status: RfpStatus.RequestForCommments,
  },
}

export const RfpCancelled: Story = {
  args: {
    status: RfpStatus.Canceled,
  },
}

export const OpenForProposals: Story = {
  args: {
    status: RfpStatus.OpenForProposals,
  },
}

export const ProposalSubmitted: Story = {
  args: {
    status: RfpStatus.Awarded,
  },
}

export const Awarded: Story = {
  args: {
    status: RfpStatus.NotAwarded,
  },
}

export const Closed: Story = {
  args: {
    status: RfpStatus.Closed,
  },
}

export const AllStatuses: Story = {
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
