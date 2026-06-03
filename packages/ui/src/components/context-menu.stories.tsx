import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@achra/ui/context-menu'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{ padding: 24, border: '1px dashed', borderRadius: 8 }}>Right click me</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Options</ContextMenuLabel>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
