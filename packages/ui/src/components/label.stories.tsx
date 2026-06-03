import { Label } from '@achra/ui/label'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Label' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
