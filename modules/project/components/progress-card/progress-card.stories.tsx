import React from 'react'

import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProgressCard } from './progress-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Project/Components/ProgressCard',
  component: ProgressCard,
} satisfies Meta<typeof ProgressCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => <ProgressCard {...args} />,
  args: {
    progress: 50,
    status: ScopeOfWork_DeliverableSetStatus.Todo,
  },
}
