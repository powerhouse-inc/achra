import { TeamStatus } from '@/modules/shared/types/types'
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
      options: Object.values(TeamStatus),
      description: 'The status of the builder',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Progress: Story = {
  args: {
    status: TeamStatus.Progress,
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersStatusChip status={TeamStatus.Progress} />
        <BuildersStatusChip status={TeamStatus['To Do']} />
        <BuildersStatusChip status={TeamStatus.Canceled} />
        <BuildersStatusChip status={TeamStatus.Accepted} />
        <BuildersStatusChip status={TeamStatus.Obsolete} />
      </div>
    </div>
  ),
}
