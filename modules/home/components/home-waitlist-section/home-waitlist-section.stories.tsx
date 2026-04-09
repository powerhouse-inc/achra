import { HomeWaitlistSection } from './home-waitlist-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/HomeWaitlistSection',
  component: HomeWaitlistSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomeWaitlistSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
