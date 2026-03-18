import { Footer } from './footer'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Footer> = {
  title: 'Shared/Components/Footer',
  component: Footer,
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
