import { KeyResultStatus } from '../../types'
import { KeyResultStatusChip } from './key-result-status'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Project/Components/KeyResultStatusChip',
  component: KeyResultStatusChip,
} satisfies Meta<typeof KeyResultStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const CANCELED: Story = {
  args: {
    status: KeyResultStatus.CANCELED,
    size: 'sm',
  },
}
export const BLOCKED: Story = {
  args: {
    status: KeyResultStatus.BLOCKED,
    size: 'sm',
  },
}

export const DELIVERED: Story = {
  args: {
    status: KeyResultStatus.DELIVERED,
    size: 'sm',
  },
}

export const DRAFT: Story = {
  args: {
    status: KeyResultStatus.DRAFT,
    size: 'sm',
  },
}

export const IN_PROGRESS: Story = {
  args: {
    status: KeyResultStatus.IN_PROGRESS,
    size: 'sm',
  },
}

export const TODO: Story = {
  args: {
    status: KeyResultStatus.TODO,
    size: 'sm',
  },
}

export const WONT_DO: Story = {
  args: {
    status: KeyResultStatus.WONT_DO,
    size: 'sm',
  },
}
