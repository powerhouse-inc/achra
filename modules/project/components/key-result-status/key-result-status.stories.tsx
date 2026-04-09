import { KeyResultStatusChip } from './key-result-status'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/KeyResultStatusChip',
  component: KeyResultStatusChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof KeyResultStatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
