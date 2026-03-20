import { mockKeyResultsMixedLinks, mockKeyResultsWithLinks } from '@/modules/project/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { PopoverContentDeliverable } from './popover-content-deliverable'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/PopoverContentDeliverable',
  component: PopoverContentDeliverable,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the deliverable',
    },
    code: {
      control: 'text',
      description: 'Deliverable code',
    },
    keyResults: {
      description: 'List of key results to display',
    },
  },
} satisfies Meta<typeof PopoverContentDeliverable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'RWA Portfolio Dashboard',
    code: 'D1',
    keyResults: mockKeyResultsWithLinks,
  },
}

export const NoKeyResults: Story = {
  args: {
    title: 'RWA Portfolio Dashboard',
    code: 'D2',
    keyResults: [],
  },
}

export const WithLink: Story = {
  args: {
    title: 'Expense Dashboard',
    code: 'D3',
    keyResults: mockKeyResultsMixedLinks,
  },
}
