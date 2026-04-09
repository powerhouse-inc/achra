import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { DeliverablesEmpty } from './deliverables-empty'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/DeliverablesEmpty',
  component: DeliverablesEmpty,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DeliverablesEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
