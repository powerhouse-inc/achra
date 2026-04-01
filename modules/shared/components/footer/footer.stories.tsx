import { Footer } from './footer'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
