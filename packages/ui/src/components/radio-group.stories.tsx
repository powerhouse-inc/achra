import { Label } from '@achra/ui/label'
import { RadioGroup, RadioGroupItem } from '@achra/ui/radio-group'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <RadioGroupItem value="1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <RadioGroupItem value="2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
}
