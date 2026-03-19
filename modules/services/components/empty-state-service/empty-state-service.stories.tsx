import EmptyStateService from './empty-state-service'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/EmptyStateService',
  component: EmptyStateService,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EmptyStateService>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No services found',
    description: 'There are no services available for this combination of filters',
  },
}

export const CustomMessage: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your search or filter criteria to find services',
  },
}
