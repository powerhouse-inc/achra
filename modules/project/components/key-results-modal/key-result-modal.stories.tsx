import { mockKeyResultWithLink, mockKeyResultWithoutLink } from '@/modules/project/mocks'
import { KeyResultModal } from './key-result-modal'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/KeyResultModal',
  component: KeyResultModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    keyResult: {
      description: 'Key result to display (title, link, id)',
    },
  },
} satisfies Meta<typeof KeyResultModal>

export default meta
type Story = StoryObj<typeof meta>

export const WithLink: Story = {
  args: {
    keyResult: mockKeyResultWithLink,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <KeyResultModal keyResult={args.keyResult} />
    </div>
  ),
}

export const WithoutLink: Story = {
  args: {
    keyResult: mockKeyResultWithoutLink,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <KeyResultModal keyResult={args.keyResult} />
    </div>
  ),
}
