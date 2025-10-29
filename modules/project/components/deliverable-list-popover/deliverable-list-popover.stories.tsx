import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { DeliverableListPopover } from './deliverable-list-popover'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Project/Components/DeliverableListPopover',
  component: DeliverableListPopover,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DeliverableListPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Deliverable List',
    code: 'DEL',
    count: 2,
    keyResults: [
      {
        id: '1',
        title: 'RWA Portfolio conceptuual wireframes ',
        url: 'RWA Portfolio conceptuual wireframes ',
        status: true,
      },
      {
        id: '2',
        title: 'Technical demo of RWA Portfolio - Feb 21',
        url: 'www.celestia-portfolio.com',
        status: true,
      },
    ],
  },
}
