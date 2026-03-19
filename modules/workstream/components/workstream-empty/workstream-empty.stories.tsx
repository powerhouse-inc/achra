import { WorkstreamEmpty } from './workstream-empty'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamEmpty',
  component: WorkstreamEmpty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasActiveFilters: { control: 'boolean' },
  },
} satisfies Meta<typeof WorkstreamEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasActiveFilters: false,
  },
}

export const Filtered: Story = {
  args: {
    hasActiveFilters: true,
  },
}
