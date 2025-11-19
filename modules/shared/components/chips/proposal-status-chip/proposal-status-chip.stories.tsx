import { ProposalStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProposalStatusChip } from './proposal-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * ProposalStatusChip Component
 *
 * A status chip component that displays proposal statuses with color-coded visual indicators.
 * Each status is automatically mapped to a specific color:
 * - Draft: Blue
 * - Submitted: Orange
 * - Accepted: Green
 * - Rejected: Red
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { ProposalStatusChip } from '@/modules/shared/components/chips/proposal-status-chip'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <ProposalStatusChip status={ProposalStatus.Draft} />
 * <ProposalStatusChip status={ProposalStatus.Submitted} />
 * <ProposalStatusChip status={ProposalStatus.Accepted} />
 * <ProposalStatusChip status={ProposalStatus.Rejected} />
 * ```
 */

const meta = {
  title: 'Shared/Components/Chips/ProposalStatusChip',
  component: ProposalStatusChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(ProposalStatus),
      description: 'The status of the proposal',
    },
  },
} satisfies Meta<typeof ProposalStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: ProposalStatus.Draft,
  },
}

export const AllStatuses: Story = {
  args: {
    status: ProposalStatus.Draft,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <ProposalStatusChip status={ProposalStatus.Draft} />
        <ProposalStatusChip status={ProposalStatus.Submitted} />
        <ProposalStatusChip status={ProposalStatus.Accepted} />
        <ProposalStatusChip status={ProposalStatus.Rejected} />
      </div>
    </div>
  ),
}
