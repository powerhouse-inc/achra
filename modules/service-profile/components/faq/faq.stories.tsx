import { faqData } from '@/modules/service-profile/mocks'
import { FaqSection } from './faq'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServiceProfile/Components/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading text',
    },
    faqFields: {
      description: 'FAQ items to display',
    },
  },
} satisfies Meta<typeof FaqSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    faqFields: faqData,
  },
}
