import { Button } from '../ui/button'
import { HoverPopover, HoverPopoverContent, HoverPopoverTrigger } from './hover-popover'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/HoverPopover',
  component: HoverPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <HoverPopover {...args}>
      <HoverPopoverTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </HoverPopoverTrigger>
      <HoverPopoverContent className="w-64">
        <div className="space-y-1">
          <p className="text-sm font-medium">Hover Popover</p>
          <p className="text-muted-foreground text-sm">
            Keep your cursor over the trigger or popover to keep it open.
          </p>
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  ),
}

export const WithActions: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <HoverPopover {...args}>
      <HoverPopoverTrigger asChild>
        <Button variant="outline">Hover for actions</Button>
      </HoverPopoverTrigger>
      <HoverPopoverContent className="w-60">
        <div className="space-y-2">
          <p className="text-sm font-medium">Quick actions</p>
          <div className="space-y-1">
            <Button size="sm" variant="secondary" className="w-full">
              View details
            </Button>
            <Button size="sm" variant="secondary" className="w-full">
              Copy link
            </Button>
          </div>
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  ),
}
