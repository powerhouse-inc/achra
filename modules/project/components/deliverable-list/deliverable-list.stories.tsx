import React from 'react'
import { mockDeliverables } from '../../mock/deliverable'
import { DeliverablesCard } from '../deliverables-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Project/Components/DeliverablesCard',
  component: DeliverablesCard,
} satisfies Meta<typeof DeliverablesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => <DeliverablesCard {...args} />,
  args: {
    deliverables: mockDeliverables,
  },
}
