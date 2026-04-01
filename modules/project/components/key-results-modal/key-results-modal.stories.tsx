import { mockDeliverables } from '@/modules/project/mocks'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { KeyResultsModal } from './key-results-modal'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/KeyResultsModal',
  component: KeyResultsModal,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/project',
        query: {
          search: '',
          statuses: [],
        },
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when the modal is closed',
    },
    deliverables: {
      description: 'List of deliverables to display in the modal',
    },
  },
} satisfies Meta<typeof KeyResultsModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    deliverables: mockDeliverables,
  },
}
