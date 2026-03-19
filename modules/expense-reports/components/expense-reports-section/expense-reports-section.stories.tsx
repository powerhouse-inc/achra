import { http, HttpResponse } from 'msw'
import { mockBudgetStatementsDetails } from '@/modules/expense-reports/mocks'
import { withReactServerComponentDecorator } from '@/modules/shared/config/rsc-decorator'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ExpenseReportsSection } from './expense-reports-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/ExpenseReportsSection',
  component: ExpenseReportsSection,
  decorators: [withReactServerComponentDecorator, withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    teamId: {
      control: 'text',
      description: 'Team ID for fetching budget statements',
    },
    month: {
      control: 'date',
      description: 'Month to display budget statements for',
    },
    builderLabel: {
      control: 'text',
      description: 'Display label for the builder',
    },
  },
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse-dashboard/budget-statements',
      },
    },
  },
} satisfies Meta<typeof ExpenseReportsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    teamId: 'team-mock-id',
    month: new Date('2024-03-01'),
    builderLabel: 'Powerhouse',
  },
  parameters: {
    msw: {
      handlers: [
        http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, async ({ request }) => {
          const body = (await request.json()) as { query?: string }
          if (body.query?.includes('BudgetStatementsDetails')) {
            return HttpResponse.json({ data: mockBudgetStatementsDetails })
          }
          return HttpResponse.json({ data: {} })
        }),
      ],
    },
  },
}
