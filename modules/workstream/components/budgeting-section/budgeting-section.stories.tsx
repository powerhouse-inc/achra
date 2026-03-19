import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { BudgetingSection } from './budgeting-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/BudgetingSection',
  component: BudgetingSection,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/sky/workstream/finance-team',
      },
    },
  },
  args: {
    params: Promise.resolve({ slug: 'sky', workstreamSlug: 'finance-team' }),
  },
} satisfies Meta<typeof BudgetingSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
