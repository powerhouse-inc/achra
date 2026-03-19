import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ExpandableSection } from './expandable-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/ExpandableSection',
  component: ExpandableSection,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section header text',
    },
    description: {
      control: 'text',
      description: 'Markdown content shown when expanded',
    },
  },
  decorators: [withPortalFontStyles],
  args: {
    title: 'What is included in this service?',
    description:
      'This service includes a full legal and operational setup for your open-source builder team, including registered address, legal document templates, and monthly accounting.',
  },
} satisfies Meta<typeof ExpandableSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongDescription: Story = {
  args: {
    title: 'Legal & Compliance Details',
    description:
      '## Overview\n\nThis package covers everything you need to operate legally in Switzerland:\n\n- **Registered address** in Zug\n- **Swiss association** entity formation\n- **Legal document templates** for contracts and agreements\n\n## Ongoing Support\n\nOnce formed, our team handles all annual filings, tax preparation, and reporting obligations on your behalf.',
  },
}
