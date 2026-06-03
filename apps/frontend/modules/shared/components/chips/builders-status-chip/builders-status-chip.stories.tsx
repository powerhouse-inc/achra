import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersStatusChip } from './builders-status-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
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
} satisfies Meta<typeof BuildersStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Progress: Story = {
  args: {
    status: BuilderStatus.Active,
  },
}

export const AllStatuses: Story = {
  args: {
    status: BuilderStatus.Active, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersStatusChip status={BuilderStatus.Active} />
        <BuildersStatusChip status={BuilderStatus.Archived} />
        <BuildersStatusChip status={BuilderStatus.Completed} />
        <BuildersStatusChip status={BuilderStatus.Inactive} />
        <BuildersStatusChip status={BuilderStatus.OnHold} />
      </div>
    </div>
  ),
}
