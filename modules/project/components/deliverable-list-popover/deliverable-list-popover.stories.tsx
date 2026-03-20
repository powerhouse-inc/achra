import { mockKeyResults } from '@/modules/project/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { DeliverableListPopover } from './deliverable-list-popover'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/DeliverableListPopover',
  component: DeliverableListPopover,
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
    count: {
      control: 'number',
      description: 'Number of key results (displayed on trigger)',
    },
    keyResults: {
      description: 'List of key results to display in the popover',
    },
  },
} satisfies Meta<typeof DeliverableListPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Deliverable List',
    code: 'DEL',
    count: 2,
    keyResults: mockKeyResults,
  },
}
