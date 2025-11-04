import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { KeyResultsModal } from './key-results-modal'
import type { Meta, StoryObj } from '@storybook/nextjs'

const withNuqsAdapter = (Story: React.ComponentType) => (
  <NuqsAdapter>
    <Story />
  </NuqsAdapter>
)

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
} satisfies Meta<typeof KeyResultsModal>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}
