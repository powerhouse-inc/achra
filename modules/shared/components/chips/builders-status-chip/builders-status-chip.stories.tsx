import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersStatusChip from './builders-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof BuildersStatusChip> = {
  title: 'Shared/Components/Chips/BuildersStatusChip',
  component: BuildersStatusChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(BuilderStatus),
      description: 'The status of the builder',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Progress: Story = {
  args: {
    status: BuilderStatus.Active,
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersStatusChip status={BuilderStatus.Active} />
        <BuildersStatusChip status={BuilderStatus.Inactive} />
        <BuildersStatusChip status={BuilderStatus.OnHold} />
        <BuildersStatusChip status={BuilderStatus.Completed} />
        <BuildersStatusChip status={BuilderStatus.Archived} />
      </div>
    </div>
  ),
}
