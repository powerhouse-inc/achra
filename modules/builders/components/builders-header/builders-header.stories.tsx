import { BuildersHeader } from './builders-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Builders/Components/BuildersHeader',
  component: BuildersHeader,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BuildersHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
