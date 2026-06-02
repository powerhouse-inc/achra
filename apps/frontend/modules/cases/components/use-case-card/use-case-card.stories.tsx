import { Currency, ShieldUser, Vote } from 'lucide-react'
import { UseCaseCard } from './use-case-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Cases/Components/UseCaseCard',
  component: UseCaseCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UseCaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    useCase: {
      title: 'Distributed Organizations',
      tags: ['Network Organizations', 'Open Source'],
      description:
        'Global networks coordinate teams, grants, and programs across time zones and jurisdictions.',
      note: 'Achra grew out of work with Sky and runs there today. The same platform supports other distributed teams.',
      benefits: [
        {
          icon: Currency,
          text: 'Coordinate governance, funding, and operations through shared workflows.',
        },
        {
          icon: Vote,
          text: 'Align contributors and sub-organizations under one transparent structure.',
        },
        {
          icon: ShieldUser,
          text: 'Scale participation while maintaining clarity and compliance.',
        },
      ],
    },
  },
}

export const WithoutNote: Story = {
  args: {
    useCase: {
      title: 'Open Source Projects and Collectives',
      tags: ['Open Source', 'Public Goods'],
      description:
        'Open-source communities fund maintainers and long-term work in public view. Achra maps issues and releases to budgets and milestones.',
      benefits: [
        {
          icon: Currency,
          text: 'Manage budgets, payments, and contributors in one public ledger.',
        },
        {
          icon: Vote,
          text: 'Fund long-term maintenance without privatizing the codebase.',
        },
      ],
    },
  },
}
