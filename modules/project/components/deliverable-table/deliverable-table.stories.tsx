import { mockDeliverables } from '@/modules/project/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { DeliverableTable } from './deliverable-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/DeliverableTable',
  component: DeliverableTable,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DeliverableTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    deliverables: mockDeliverables,
  },
}

export const SingleDeliverable: Story = {
  args: {
    deliverables: [mockDeliverables[0]],
  },
}
