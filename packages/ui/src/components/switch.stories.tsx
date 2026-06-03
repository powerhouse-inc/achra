import { Switch } from '@achra/ui/switch'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { id: 'sw' },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
