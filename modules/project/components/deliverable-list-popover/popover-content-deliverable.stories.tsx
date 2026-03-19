import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { PopoverContentDeliverable } from './popover-content-deliverable'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/PopoverContentDeliverable',
  component: PopoverContentDeliverable,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PopoverContentDeliverable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'RWA Portfolio Dashboard',
    code: 'D1',
    keyResults: [
      {
        id: 'kr1',
        title: 'RWA Portfolio conceptual wireframes',
        link: 'www.examplelink.com',
      },
      {
        id: 'kr2',
        title: 'Technical demo of RWA Portfolio - Feb 21',
        link: 'www.celestia-portfolio.com',
      },
    ],
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
    keyResults: [
      {
        id: 'kr3',
        title: 'Expense Dashboard deployment v0.33.0',
        link: 'https://expenses.example.com',
      },
      {
        id: 'kr4',
        title: 'Source code on Powerhouse Github repo',
        link: '',
      },
    ],
  },
}
