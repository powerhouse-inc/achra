import { http, HttpResponse } from 'msw'
import { mockedWorkstreamDetailsQuery } from '@/modules/workstream/mocks'
import { BudgetingSection } from './budgeting-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/BudgetingSection',
  component: BudgetingSection,
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
  argTypes: {
    params: {
      description: 'Promise resolving to network and workstream slugs from route params',
    },
  },
} satisfies Meta<typeof BudgetingSection>

export default meta
type Story = StoryObj<typeof meta>

const graphqlHandler = () => HttpResponse.json({ data: mockedWorkstreamDetailsQuery })

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, graphqlHandler)],
    },
  },
}
