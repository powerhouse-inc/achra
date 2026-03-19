import { baseOperator, onHoldOperator } from '@/modules/services/mocks/operator-card'
import { OperatorCard } from './index'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { Route } from 'next'

const meta = {
  title: 'Modules/Services/Components/Operator Card',
  component: OperatorCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/services/operators',
      },
    },
  },
  args: {
    operator: baseOperator,
    onSelectOperator: (operatorId: string) => {
      console.log(`Configure services for: ${operatorId}`)
    },
  },
} satisfies Meta<typeof OperatorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMoreInfo: Story = {
  args: {
    showMoreInfo: true,
    moreInfoHref: '/services/operators/PHID-BLD-operator-001' as Route,
  },
}

export const ConfigureWithHref: Story = {
  args: {
    configureServicesHref: '/service-purchase?operator=PHID-BLD-operator-001' as Route,
    onSelectOperator: undefined,
    showMoreInfo: true,
  },
}

export const OnHoldOperator: Story = {
  args: {
    operator: onHoldOperator,
    showMoreInfo: true,
  },
}
