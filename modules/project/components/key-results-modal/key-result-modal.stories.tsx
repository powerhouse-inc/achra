import { KeyResultModal } from './key-result-modal'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/KeyResultModal',
  component: KeyResultModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KeyResultModal>

export default meta
type Story = StoryObj<typeof meta>

export const WithLink: Story = {
  args: {
    keyResult: {
      __typename: 'ScopeOfWork_KeyResult',
      id: 'kr1',
      title: 'Market research report completed',
      link: 'https://example.com/report',
    },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <KeyResultModal keyResult={args.keyResult} />
    </div>
  ),
}

export const WithoutLink: Story = {
  args: {
    keyResult: {
      __typename: 'ScopeOfWork_KeyResult',
      id: 'kr2',
      title: 'Analysis in progress',
      link: '',
    },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <KeyResultModal keyResult={args.keyResult} />
    </div>
  ),
}
