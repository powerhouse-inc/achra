import { HelpCircle } from 'lucide-react'
import { faqData } from '../../mocks/faqs'
import { FaqSection } from './faq'
import { FaqItem } from './faq-item'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof FaqSection> = {
  title: 'Modules/Services/Components/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FaqSection>

export const Default: Story = {
  args: {
    faqFields: faqData,
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Frequently Asked Questions',
    faqFields: faqData,
  },
}

export const SingleItem: StoryObj<typeof FaqItem> = {
  render: () => (
    <div className="max-w-sm">
      <FaqItem
        icon={HelpCircle}
        question="Why do I need an Operational Hub?"
        answer="An Operational Hub offers a streamlined approach to handling legal, compliance, and operational tasks, promoting efficiency."
      />
    </div>
  ),
}
