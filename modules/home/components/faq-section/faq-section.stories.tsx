import { FaqSection } from './faq-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FaqSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
