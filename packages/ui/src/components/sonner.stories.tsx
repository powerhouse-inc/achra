import { Button } from '@achra/ui/button'
import { Toaster } from '@achra/ui/sonner'
import React from 'react'
import { toast } from 'sonner'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div>
      <Button onClick={() => toast('Hello!')}>Toast</Button>
      <Toaster />
    </div>
  ),
}
