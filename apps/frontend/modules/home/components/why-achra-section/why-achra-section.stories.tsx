import { WhyAchraSection } from './why-achra-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/WhyAchraSection',
  component: WhyAchraSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WhyAchraSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
