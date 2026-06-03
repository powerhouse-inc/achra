import { Button } from '@achra/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@achra/ui/collapsible'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent style={{ marginTop: 8 }}>Hidden content</CollapsibleContent>
    </Collapsible>
  ),
}
