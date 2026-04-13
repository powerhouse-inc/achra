import { mockDeliverables } from '@/modules/project/mocks'
import { DeliverablesCard } from './deliverables-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/DeliverablesCard',
  component: DeliverablesCard,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    deliverables: {
      description: 'List of deliverables to display (list on mobile, table on desktop)',
    },
  },
} satisfies Meta<typeof DeliverablesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <DeliverablesCard {...args} />,
  args: {
    deliverables: mockDeliverables,
  },
}
