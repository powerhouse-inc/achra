import { SectionTitle } from './section-title'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    hash: { control: 'text' },
  },
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Section Title',
    hash: 'section-title',
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Financial Overview and Budget Statements',
    hash: 'financial-overview',
  },
}
