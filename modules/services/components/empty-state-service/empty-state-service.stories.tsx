import { EmptyStateService } from './empty-state-service'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/EmptyStateService',
  component: EmptyStateService,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the empty state',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
  },
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
